import { defineConfig } from 'vite'
import type { ViteDevServer } from 'vite'
import { fileURLToPath } from 'node:url'
function installMissingFixture(server: Pick<ViteDevServer, 'middlewares'>) {
  server.middlewares.use((request, response, next) => {
    if (request.url?.split('?')[0] !== '/fixtures/missing.json') {
      next()
      return
    }
    response.statusCode = 404
    response.setHeader('Content-Type', 'application/json')
    response.end('{"error":"teaching fixture missing"}')
  })
}
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@domain': fileURLToPath(new URL('./src/domain', import.meta.url)),
    },
  },
  plugins: [
    {
      name: 'local-missing-fixture',
      configureServer: installMissingFixture,
      configurePreviewServer: installMissingFixture,
    },
  ],
  build: { target: 'es2022', sourcemap: 'hidden', manifest: true },
})
