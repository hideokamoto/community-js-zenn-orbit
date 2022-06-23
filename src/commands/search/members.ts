import {Command, Flags} from '@oclif/core'
import * as Table from 'cli-table3'
import * as dayjs from 'dayjs'
import {Orbit} from '../../lib/api/orbit'
import '../../lib/env'

export default class SearchMembers extends Command {
  static description = 'Search Orbit member by the username each source.'

  static examples = [
    'orbit-zenn search members username -t twitter : search username from Twitter source',
    'orbit-zenn search members username -t Custom : search username from custom source',
    'orbit-zenn search members username -t Custom -f table : Show result as a table',
    'orbit-zenn search members username -t Custom -w orbit-workspace-name -a obw_xxx',
  ]

  static flags = {
    format: Flags.enum({
      char: 'f',
      default: 'json',
      options: ['json', 'table'],
    }),
    target: Flags.string({
      char: 't',
      default: 'tag',
    }),
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
  }

  static args = [{
    name: 'keyword',
    required: true,
    description: 'Search keyword',
  }]

  private async getOrbitClient() {
    const {flags: {'api-key': apiKey, 'workspace-name': wsName}} = await this.parse(SearchMembers)
    return new Orbit({
      workspaceName: wsName,
      apiKey: apiKey,
    })
  }

  public async run(): Promise<void> {
    const {args: {keyword}, flags: {target, format}} = await this.parse(SearchMembers)

    const OrbitClient = await this.getOrbitClient()
    const member = await OrbitClient.members.searchBySource(target, keyword)
    if (format === 'json') {
      this.log(JSON.stringify(member))
      return
    }

    if (format === 'table') {
      const profileTable = new Table({head: ['Profiles', 'Name', 'location', 'Orbit score', 'Created at']})
      profileTable.push({
        ' ': [member.data.attributes.name, member.data.attributes.location, `Level: ${member.data.attributes.orbit_level}`, `${dayjs(member.data.attributes.created_at).format('YYYY/MM/DD')}`],
      }, {
        Languages: [member.data.attributes.languages.join(', ')],
      })
      this.log(profileTable.toString())

      const identities: {
        [sourceName: string]: string[]
      } = {}

      for (const identity of member.included) {
        const username = identity.attributes.username || identity.attributes.uid
        if (identities[identity.attributes.source]) {
          identities[identity.attributes.source].push(username)
        } else {
          identities[identity.attributes.source] = [username]
        }
      }

      const identityTable = new Table({head: ['Identities']})
      for (const identitySource of Object.entries(identities)) {
        identityTable.push({
          [identitySource[0]]: identitySource[1],
        })
      }

      this.log(identityTable.toString())
    }
  }
}
