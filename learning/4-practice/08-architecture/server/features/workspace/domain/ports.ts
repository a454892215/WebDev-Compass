import type { Scope } from '~~/shared/contracts/workspace'
export interface WorkspacePorts {
  readCourses: (scope: Scope) => Promise<unknown>
  readProgress: (scope: Scope) => Promise<unknown>
}
