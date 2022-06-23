import * as Parser from 'rss-parser'
import {Feed, ZennFeed} from '../../types'

export const listZennPostsByTag = async (tag: string): Promise<Feed[]> => {
  const parser = new Parser()
  try {
    const result = await parser.parseURL(
      `https://zenn.dev/topics/${tag}/feed`,
    )
    return (result as any as ZennFeed).items
  } catch (error) {
    console.log(error)
    throw error
  }
}
