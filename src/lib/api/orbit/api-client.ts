import axios, {AxiosResponse} from 'axios'
import {APIPathWithWorkspaceSlug} from './types'

export type OrbitAPIClientProps = {
    apiKey: string;
    workspaceName: string;
  }
export class OrbitAPIClient {
    private readonly _api_key: string;
    public readonly workspace_name: string;
    constructor(config: OrbitAPIClientProps) {
      this._api_key = config.apiKey
      this.workspace_name = config.workspaceName
    }

    public async fetchOrbitAPI<Response = any, Body = any>(path: APIPathWithWorkspaceSlug, method: 'POST' | 'GET' | 'PUT' | 'DELETE', body?: Body): Promise<AxiosResponse<Response>> {
      const url = ['https://app.orbit.love/api/v1', this.workspace_name, path.replace(/\/\//, '/')]
      .filter(Boolean)
      .join('/')
      return axios({
        url,
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._api_key}`,
        },
        data: body,
      })
    }
}
