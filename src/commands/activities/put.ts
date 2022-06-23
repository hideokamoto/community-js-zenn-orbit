import {Command, Flags} from '@oclif/core'
import {Orbit} from '../../lib/api/orbit'
import {ContentActivity} from '../../lib/api/orbit/activities'
import {PutMemberRequest} from '../../lib/api/orbit/members'
import {ParsedZennPost, parseZennPosts} from '../../lib/zenn/parser'
import {listZennPostsByTag} from '../../lib/zenn/tag'
import '../../lib/env'

export type OrbitMemberWithZennUsername = {
  [username: string]: null | {
    id: string;
    slug: string;
  }
}
export default class ActivitiesPut extends Command {
  private isDebug = false;
  static description = 'Put contenct creation activity to Orbit'

  static examples = [
    'orbit-zenn activities put <keyword>: Put contenct creation activity to Orbit',
    'orbit-zenn activities put <keyword> -w orbit-workspace-name -a obw_xxx : Put contenct creation activity to Orbit',
  ]

  static flags = {
    debug: Flags.boolean({char: 'd', description: 'Show process log', default: false}),
    'api-key': Flags.string({
      char: 'a',
      description: 'Orbit API key',
      default: process.env.ORBIT_API_KEY as string,
    }),
    'workspace-name': Flags.string({
      char: 'w',
      description: 'Orbit workspace name',
      default: process.env.ORBIT_WS_NAME as string,
    }),
    'update-member-data': Flags.boolean({
      char: 'U',
      description: 'Update Orbit member data using Zenn profile',
      default: false,
    }),
  }

  static args = [{
    name: 'keyword',
    required: true,
    description: 'Search keyword',
  }]

  private async getOrbitClient() {
    const {flags: {'api-key': apiKey, 'workspace-name': wsName}} = await this.parse(ActivitiesPut)
    return new Orbit({
      workspaceName: wsName,
      apiKey: apiKey,
    })
  }

  public async run(): Promise<void> {
    const {flags: {debug}, args: {keyword}} = await this.parse(ActivitiesPut)
    this.isDebug = debug

    const response = await listZennPostsByTag(keyword)
    const posts = parseZennPosts(response)
    const orbitMembers = await this._listOrbitMemberByPosts(posts)

    const results: {
      [username: string]: Array<{
        stauts: 'put_activity' | 'create_new_member' | 'skip' | 'error',
        message?: string;
        url?: string;
        created_at?: string;
      }>
    } = {}
    for await (const post of posts) {
      if (!results[post.username]) results[post.username] = []
      try {
        if (debug) console.log({username: post.username})
        const orbitMember = orbitMembers[post.username]
        if (debug) console.log({orbitMember})
        if (orbitMember) {
          await this._putMemberActivity(orbitMember.slug, post)
          results[post.username].push({
            stauts: 'put_activity',
            url: post.url,
            created_at: post.created_at,
          })
        } else {
          await this._putNewMemberActivity(post)
          results[post.username].push({
            stauts: 'create_new_member',
            url: post.url,
            created_at: post.created_at,
          })
        }
      } catch (error) {
        if ((error as any).response.status !== 422) {
          if (debug) console.log(error)
          results[post.username].push({
            stauts: 'error',
            message: `${(error as Error).name}: ${(error as Error).message}`,
            url: post.url,
            created_at: post.created_at,
          })
          throw error
        }

        results[post.username].push({
          stauts: 'skip',
          url: post.url,
          created_at: post.created_at,
        })

        console.log(error)
      }
    }

    this.log(JSON.stringify(results))
  }

  private async _putMemberActivity(orbitMemberSlug: string, post: ParsedZennPost) {
    const contentActivity: ContentActivity = {
      activity_type: 'content',
      url: post.url,
      occurred_at: post.created_at,
    }
    const OrbitClient = await this.getOrbitClient()
    const putActivityResult = await OrbitClient.activities.putContentActivity(orbitMemberSlug, contentActivity)
    if (this.isDebug) console.log(putActivityResult)
  }

  private async _putNewMemberActivity(post: ParsedZennPost) {
    const contentActivity: ContentActivity = {
      activity_type: 'content',
      url: post.url,
      occurred_at: post.created_at,
    }
    const user = post.user
    const memberProps: PutMemberRequest['member'] = {
      name: user.name || post.username,
      teammate: false,
    }
    if (this.isDebug) console.log({user, memberProps})
    const OrbitClient = await this.getOrbitClient()
    const putActivityResult = await OrbitClient.activities.putActivityWithMemberData({
      activity: {
        ...contentActivity,
        member: memberProps,
      },
      identity: {
        source: 'Zenn',
        source_host: 'zenn.dev',
        username: post.username,
        url: post.profile_url,
      },
    })
    if (this.isDebug) console.log(putActivityResult)
  }

  private async _listOrbitMemberByPosts(posts: ParsedZennPost[]): Promise<OrbitMemberWithZennUsername> {
    const authorNames = new Set(posts.map(post => post.username))
    const orbitMembers: OrbitMemberWithZennUsername = {}

    for await (const authorName of authorNames) {
      try {
        const OrbitClient = await this.getOrbitClient()
        const member = await OrbitClient.members.searchBySource('Zenn', authorName)
        if (member) {
          orbitMembers[authorName] = {
            id: member.data.id,
            slug: member.data.attributes.slug,
          }
        }
      } catch (error) {
        console.log({
          message: (error as Error).message,
        })
        orbitMembers[authorName] = null
      }
    }

    return orbitMembers
  }
}
