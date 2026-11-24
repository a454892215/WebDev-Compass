import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TaskSchema } from './schema'
export function FormDemo() {
  const [saved, setSaved] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ title: string }>({ defaultValues: { title: '' } })
  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        const result = TaskSchema.parse(data)
        setSaved(result.title)
      })}
    >
      <label htmlFor="rhf-title">任务标题</label>
      <input
        id="rhf-title"
        aria-describedby="rhf-error"
        aria-invalid={Boolean(errors.title)}
        {...register('title', {
          validate: (value) => {
            const result = TaskSchema.safeParse({ title: value })
            return (
              result.success || result.error.issues[0]?.message || '输入错误'
            )
          },
        })}
      />
      <p id="rhf-error" role="status">
        {errors.title?.message}
      </p>
      <button type="submit" disabled={isSubmitting}>
        保存标题
      </button>
      <p>已保存 {saved || '无'}</p>
    </form>
  )
}
