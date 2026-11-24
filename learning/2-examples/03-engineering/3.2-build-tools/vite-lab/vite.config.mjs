import{defineConfig}from'vite';
import{fileURLToPath}from'node:url';
export default defineConfig({resolve:{alias:{'@lab':fileURLToPath(new URL('./src',import.meta.url))}},build:{sourcemap:true,minify:true}});
