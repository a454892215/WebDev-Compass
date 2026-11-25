import { readLimitedBody } from '../utils/body'
import { requireWrite, requireUser } from '../utils/auth'
export default defineEventHandler(async (event) => {
  requireWrite(event, false)
  requireUser(event)
  const type = getHeader(event, 'content-type') ?? ''
  if (!type.startsWith('multipart/form-data;'))
    throw createError({ statusCode: 415, statusMessage: 'Multipart required' })
  const body = await readLimitedBody(event, 16 * 1024)
  let form: FormData
  try {
    form = await new Request('http://127.0.0.1/upload-fixture', {
      method: 'POST',
      headers: { 'Content-Type': type },
      body: Uint8Array.from(body),
    }).formData()
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Malformed multipart body' })
  }
  const file = form.get('file')
  if (
    !(file instanceof File) ||
    form.getAll('file').length !== 1 ||
    [...form.keys()].some((k) => k !== 'file')
  )
    throw createError({ statusCode: 400, statusMessage: 'One file required' })
  if (file.size > 4096)
    throw createError({ statusCode: 413, statusMessage: 'File too large' })
  if (file.type !== 'text/plain')
    throw createError({ statusCode: 415, statusMessage: 'Text file required' })
  const bytes = new Uint8Array(await file.arrayBuffer())
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(bytes)
  } catch {
    throw createError({ statusCode: 415, statusMessage: 'Valid UTF-8 required' })
  }
  return {
    fileName: file.name.split(/[\\/]/).pop()?.slice(0, 80) ?? 'file.txt',
    bytes: file.size,
    saved: false,
  }
})
