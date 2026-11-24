import { z } from 'zod'
export const TaskSchema = z.object({
  title: z.string().trim().min(1, '请输入标题').max(30, '标题最长30字符'),
})
