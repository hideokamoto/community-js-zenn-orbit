import {OrbitActivities} from './activities'
import {OrbitAPIClient, OrbitAPIClientProps} from './api-client'
import {OrbitMembers} from './members'
import '../../env'
export class Orbit {
  public readonly workspace_name: string;
  public readonly members: OrbitMembers;
  public readonly activities: OrbitActivities;
  constructor(config: OrbitAPIClientProps) {
    const client = new OrbitAPIClient(config)
    this.workspace_name = config.workspaceName
    this.members = new OrbitMembers(client)
    this.activities = new OrbitActivities(client)
  }
}
