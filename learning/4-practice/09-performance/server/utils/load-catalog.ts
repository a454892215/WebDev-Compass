import type { Catalogue, Mode } from '../../shared/catalog'
export interface Sources {
  courses: () => Promise<Catalogue['courses']>
  summary: () => Promise<string>
}
export async function loadCatalogue(mode: Mode, sources: Sources): Promise<Catalogue> {
  const started = performance.now()
  let courses, summary
  if (mode === 'parallel') {
    ;[courses, summary] = await Promise.all([sources.courses(), sources.summary()])
  } else {
    courses = await sources.courses()
    summary = await sources.summary()
  }
  return { mode, courses, summary, durationMs: performance.now() - started }
}
export function localSources(): Sources {
  const pause = () => new Promise<void>((resolve) => setTimeout(resolve, 30))
  return {
    async courses() {
      await pause()
      return [
        { slug: 'vue', title: 'Vue组件性能' },
        { slug: 'nuxt', title: 'Nuxt首屏与水合' },
      ]
    },
    async summary() {
      await pause()
      return '公开合成数据：两个独立30ms等待，非真实数据库与网络。'
    },
  }
}
