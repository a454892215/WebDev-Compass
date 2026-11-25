import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { audit, graphErrors, importsOf } from '../../scripts/check-boundaries.mjs'
describe('architecture guard', () => {
  it('resolves a directory alias to its index and detects its cycle', () => {
    const root = mkdtempSync(join(tmpdir(), 'stage8-boundary-'))
    try {
      mkdirSync(join(root, 'app/pages'), { recursive: true })
      mkdirSync(join(root, 'app/features/catalog'), { recursive: true })
      writeFileSync(join(root, 'app/pages/a.ts'), "import '~/features/catalog'")
      writeFileSync(join(root, 'app/features/catalog/index.ts'), "import '../../pages/a'")
      const result = audit(root)
      expect(result.edges).toContainEqual([
        'app/pages/a.ts',
        'app/features/catalog/index.ts',
      ])
      expect(result.errors.some((x) => x.includes('cycle'))).toBe(true)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
  it('rejects server access, outer dependency and cycles', () => {
    expect(graphErrors([['app/a.ts', 'server/private.ts']])).not.toEqual([])
    expect(graphErrors([['app/x/domain/a.ts', 'app/x/infra/b.ts']])).not.toEqual([])
    expect(
      graphErrors([
        ['app/a.ts', 'app/b.ts'],
        ['app/b.ts', 'app/a.ts'],
      ]),
    ).not.toEqual([])
  })
  it('finds static, reexport and literal dynamic imports, flags computed loader', () => {
    const data = importsOf(
      `import type {X} from './a';export {y} from './b';const z=import('./c');import(variable)`,
    )
    expect(data.imports).toEqual(['./a', './b', './c'])
    expect(data.errors).toHaveLength(1)
  })
  it('extracts Vue script and permits inward pure edges', () => {
    expect(
      importsOf(
        '<template>text</template><script setup lang="ts">import x from "./x"</script>',
        true,
      ).imports,
    ).toEqual(['./x'])
    expect(
      graphErrors([
        ['app/x/application/a.ts', 'app/x/domain/a.ts'],
        ['server/x/infra/a.ts', 'server/x/domain/a.ts'],
      ]),
    ).toEqual([])
  })
  it('audits real project aliases and directions', () => {
    expect(audit(process.cwd()).errors).toEqual([])
  })
})
