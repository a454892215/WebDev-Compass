export interface Task { id: string; title: string; done: boolean }
export function titleOf(task: Task): string { return task.title; }
