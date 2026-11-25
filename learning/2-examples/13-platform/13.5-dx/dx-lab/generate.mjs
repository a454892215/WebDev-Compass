import { mkdir, realpath, writeFile, rm } from 'node:fs/promises'
import { join, relative, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'
export async function generate(root, name) {
  if (typeof name !== 'string' || !/^[a-z][a-z0-9-]{0,39}$/.test(name))
    throw new Error('Invalid project name')
  const realRoot = await realpath(root)
  const target = join(realRoot, name)
  const rel = relative(realRoot, target)
  if (rel.startsWith('..') || isAbsolute(rel))
    throw new Error('Path escaped root')
  await mkdir(target)
  try {
    await writeFile(
      join(target, 'package.json'),
      JSON.stringify({ name, private: true, type: 'module' }, null, 2) + '\n',
      { flag: 'wx' }
    )
    await writeFile(
      join(target, 'index.js'),
      'export const projectName = ' + JSON.stringify(name) + '\n',
      { flag: 'wx' }
    )
    return target
  } catch (error) {
    await rm(target, { recursive: true, force: true })
    throw error
  }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    console.log(await generate(process.argv[2], process.argv[3]))
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
