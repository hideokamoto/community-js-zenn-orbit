import {AxiosError} from 'axios'
import {OrbitAPIClient} from './api-client'
import {isDefinedSourceName} from './types'

export type PutMemberRequest = {
    member: {
      bio?: string;
      birthday?: string;
      company?: string;
      title?: string;
      location?: string;
      name: string;
      pronouns?: string;
      shipping_address?: string;
      slug?: string;
      tags_to_add?: string;
      tags?: string;
      tshirt?: string;
      teammate: boolean;
      url?: string;
      github?: string;
      twitter?: string;
      email?: string;
      linkedin?: string;
      devto?: string;
    }
}

export type OrbitMemberDetail = {
  data: {
    id: string;
    type: 'member',
    attributes: {
      languages: string[];
      topics: string[];
      twitter_followers: number;
      github_followers: number;
      discord: string;
      linkedin: string;
      devto: string;
      email: string;
      discourse: string;
      github: string;
      twitter: string;
      love: string;
      orbit_level: string;
      id: string;
      created: boolean;
      orbit_url: string;
      url: string;
      merged_at: string;
      updated_at: string;
      tshirts: string;
      teammate: boolean;
      tags: string[];
      tag_list: string[];
      source: string;
      slug: string;
      shipping_address: string;
      reach: number;
      pronous: string;
      name: string;
      location: string;
      last_activity_occurred_at: string;
      first_activity_occurred_at: string;
      deleted_at: string;
      created_at: string;
      title: string;
      company: string;
      birthday: string;
      bio: string;
      avatar_url: string;
      activities_score: number;
      activities_count: number;
    },
    relationships: {
      identities: {
        data: Array<unknown>
      }
    }
  };
  included: Array<{
    id: string;
    type: string;
    attributes: {
      uid: string;
      email: string | null;
      username: string | null;
      name: string | null;
      source: string;
      source_host: string | null;
    }
  }>
}
export class OrbitMembers {
  private readonly _client: OrbitAPIClient;
  constructor(client: OrbitAPIClient) {
    this._client = client
  }

  public async putMember(request: PutMemberRequest): Promise<any> {
    const result = await this._client.fetchOrbitAPI('members', 'POST', request)
    return result.data
  }

  public async updateMember(memberSlug: string, request: Partial<PutMemberRequest['member']>):Promise<void> {
    const result = await this._client.fetchOrbitAPI(`members/${memberSlug}`, 'POST', request)
    console.log(result)
  }

  public async searchBySource(source: string, username: string): Promise<OrbitMemberDetail> {
    const querystrings = [
      `source=${source}`,
    ]
    if (isDefinedSourceName(source)) {
      querystrings.push(`username=${username}`)
    } else {
      querystrings.push(`uid=${username}`)
    }

    try {
      const result = await this._client.fetchOrbitAPI<OrbitMemberDetail>(`members/find?${querystrings.join('&')}`, 'GET')
      return result.data
    } catch (error) {
      if (!Object.prototype.hasOwnProperty.call(error, 'response')) {
        throw error
      }

      const axiosError = error as AxiosError

      if (axiosError.response && axiosError.response.data && (axiosError.response.data as any).errors) {
        throw new Error((axiosError.response.data as any).errors)
      }

      console.error(axiosError)

      throw new Error('Unknown API Error')
    }
  }
}
