/* eslint-disable camelcase */
export type Feed = {
  title: string;
  link: string;
  'dc:creator': string;
  pubDate: string;
  isoDate: string;
  content: string;
  creator: string;
};
export type ZennFeed = {
  items: Array<Feed>;
  title: string;
  description: string;
  generator: string;
  link: string;
  language: string;
  lastBuildDate: string;
};

export type QiitaPost = {
    rendered_body: string;
    body: string;
    coediting: boolean;
    comments_count: number;
    created_at: string;
    group: null | unknown;
    id: string;
    likes_count: number;
    private: boolean;
    reactions_count: number;

    title: string;
    url: string;
    tags: Array<{
      name: string;
      versions: string[];
    }>;
    updated_at: string;
    user: {
      description: string;
      facebook_id: string;
      followees_count: number;
      followers_count: number;
      github_login_name: null | string;
      id: string;
      items_count: number;
      linkedin_id: string;
      location: string;
      name: string;
      organization: string;
      parmanent_id: number;
      profile_image_url: string;
      team_only: boolean;
      twitter_screen_name: string;
      website_url: string;
    };
  };
