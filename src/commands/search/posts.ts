import {Command, Flags} from '@oclif/core'
import * as Table from 'cli-table3'
import * as dayjs from 'dayjs'
import {parseZennPosts} from '../../lib/zenn/parser'
import {listZennPostsByTag} from '../../lib/zenn/tag'

export default class SearchPosts extends Command {
  static description = 'search Zenn posts'

  static examples = [
    'orbit-zenn search posts zenn : search by tag',
    'orbit-zenn search posts zenn -f table : search by tag (table style)',
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
  }

  static args = [{
    name: 'keyword',
    required: true,
    description: 'Search keyword',
  }]

  public async run(): Promise<void> {
    const {args: {keyword}, flags: {target, format}} = await this.parse(SearchPosts)
    const response = target === 'tag' ? await listZennPostsByTag(keyword) : []
    const posts = parseZennPosts(response)
    if (format === 'json') {
      this.log(JSON.stringify({
        target,
        keyword,
        posts,
      }))
      return
    }

    if (format === 'table') {
      this.log(`Search Target: ${target}`)
      this.log(`Search Word: ${keyword}`)
      for (const post of posts) {
        const table = new Table()
        table.push({
          title: post.title,
        }, {
          user: post.username,
        }, {
          created_at: dayjs(post.created_at).format('YYYY/MM/DD HH:mm:ss'),
        })
        this.log(table.toString())
      }
    }
  }
}
