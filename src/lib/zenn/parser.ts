import {Feed} from '../../types'

export type ParsedZennPost = {
  title: string;
  url: string;
  created_at: string;
  username: string;
  profile_url: string;
  tags?: string[];
  user: {
    name: string | null;
  },
}
const _getZennAuthoerDataFromUrl = (url: string): {
  username: string;
  profileUrl: string;
} => {
  const path = url.replace(/https:\/\/zenn.dev\//, '')
  const username = path.slice(0, Math.max(0, path.indexOf('/')))
  return {
    username,
    profileUrl: `${url.slice(0, Math.max(0, url.indexOf(username)))}${username}`,
  }
}

export const parseZennPosts = (posts: Feed[]):Array<ParsedZennPost> => {
  return posts.map(post => {
    const {
      username,
      profileUrl,
    } = _getZennAuthoerDataFromUrl(post.link)
    return {
      title: post.title,
      url: post.link,
      created_at: post.isoDate,
      username,
      profile_url: profileUrl,
      user: {
        name: post.creator || post['dc:creator'],
      },
    }
  })
}
