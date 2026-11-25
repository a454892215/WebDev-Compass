import { writeFile } from 'node:fs/promises'
const label = process.env.COMPASS_LABEL || 'local'
if (!/^[a-z0-9-]{1,20}$/.test(label)) throw new Error('Invalid synthetic build label')
await writeFile(
  new URL('./dist/build-info.json', import.meta.url),
  JSON.stringify({ label }) + '\n',
)
