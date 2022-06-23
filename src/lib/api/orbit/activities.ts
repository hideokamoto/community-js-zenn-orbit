import {OrbitAPIClient} from './api-client'
import {PutMemberRequest} from './members'

export type ContentActivity = {
  url: string;
  occurred_at: string;
  activity_type: 'content',
}
export type CustomActivity = {
  title: string;
  description?: string;
  link?: string;
  link_text?: string;
  weight?: string;
  activity_type?: string;
  activity_type_key?: string;
  key?: string;
  occurred_at?: string;
  properties?: {
      [key: string]: string;
  }
}

type PutActivityRequest = {
  activity: CustomActivity | ContentActivity
}

type PutActivityWithUpdatingMemberData = {
  activity: PutActivityRequest['activity'] & {
      member: PutMemberRequest['member'];
  }
  identity: {
    /**
     * @deprecated
     */
    name?: string;
    source: 'Zenn';
    source_host: 'zenn.dev',
    username: string;
    url: string;
    /**
     * @deprecated
     */
    email?: string;
    /**
     * @deprecated
     */
    uid?: string;

}
}

export class OrbitActivities {
  private readonly _client: OrbitAPIClient;
  constructor(client: OrbitAPIClient) {
    this._client = client
  }

  public async putActivityWithMemberData(request: PutActivityWithUpdatingMemberData): Promise<any> {
    const result = await this._client.fetchOrbitAPI('activities', 'POST', request)
    return result.data
  }

  public async putActivity(memberSlug: string, request: CustomActivity | ContentActivity): Promise<any> {
    const result = await this._client.fetchOrbitAPI(`members/${memberSlug}/activities`, 'POST', request)
    return result.data
  }

  /**
   * Alias of putActivity
   *
   * @param memberId {string}
   * @param request {ContentActivity}
   * @return any
   */
  public async putContentActivity(memberId: string, request: ContentActivity): Promise<any> {
    return this.putActivity(memberId, request)
  }

  /**
   * Alias of putActivity
   *
   * @param memberId {string}
   * @param request {CustomActivity}
   * @return any
   */
  public async putCustomActivity(memberId: string, request: CustomActivity): Promise<any> {
    return this.putActivity(memberId, request)
  }
}
