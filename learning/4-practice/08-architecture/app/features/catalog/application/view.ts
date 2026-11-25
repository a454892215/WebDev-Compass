import type { Workspace } from '~~/shared/contracts/workspace'
import { filterCourses } from '../domain/filter'
export function catalogueView(workspace: Workspace, query: string) {
  return {
    items: filterCourses(workspace.courses, query),
    completed: workspace.completed,
    warning: workspace.warnings.join('；'),
  }
}
