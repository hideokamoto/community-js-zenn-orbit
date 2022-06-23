/**
 * API Path definitions
 */
export const ORBIT_API_PATH = 'https://app.orbit.love/api/v1' as const
export type OrbitAPIPath = `${typeof ORBIT_API_PATH}/${AvailableAPIPath}`
export type AvailableAPIPath = `${string}/${APIPathWithWorkspaceSlug}` | WorkspacesAPIPath
export type APIPathWithWorkspaceSlug = MembersAPIPath | ActivityAPIPath | ActivityTypeAPIPath | UserAPIPath | NotesAPIPath | OrganizationsAPIPath | ReportsAPIPath | DestinationsAPIPath
export type MembersAPIPath =
| 'members/find'
| `members/${string}`
| `members/${string}/identities`
| 'members'
| `organizations/${string}/members`
export type ActivityTypeAPIPath = 'activity_types'
export type ActivityAPIPath =
| 'activities'
| `activities/${string}`
| `members/${string}/activities`
| `members/${string}/activities/${string}`
| `organizations/${string}/activities`
export type UserAPIPath = 'user'
export type NotesAPIPath =
| `members/${string}/notes`
| `members/${string}/notes/${string}`
export type OrganizationsAPIPath = 'organizations' | `organizations/${string}`
export type ReportsAPIPath = 'reports'
export type DestinationsAPIPath = 'webhooks' | `webhooks/${string}`
export type WorkspacesAPIPath = 'workspaces' | `workspaces/${string}`

/**
 * Identity definitions
 */
export const ORBIT_PREDEFINED_SOURCE_NAMES = ['twitter', 'discord', 'linkedin', 'github', 'email', 'discourse', 'devto'] as const
export type DefinedSourceNames = typeof ORBIT_PREDEFINED_SOURCE_NAMES[number]
export const isDefinedSourceName = (name: string): name is DefinedSourceNames => {
  return (ORBIT_PREDEFINED_SOURCE_NAMES as any).includes(name)
}
