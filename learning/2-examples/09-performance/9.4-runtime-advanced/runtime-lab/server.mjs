import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, dirname, extname } from "node:path";
const root = dirname(fileURLToPath(import.meta.url));
const allowed = new Set([
  "index.html",
  "style.css",
  "app.mjs",
  "logic.mjs",
  "pool.mjs",
  "worker.mjs",
  "README.md",
]);
export function startServer(port = 4520) {
  const server = createServer(async (req, res) => {
    const path = new URL(req.url, "http://localhost").pathname;
    const file = path === "/" ? "index.html" : path.slice(1);
    if (!allowed.has(file)) {
      res.writeHead(404).end();
      return;
    }
    try {
      const data = await readFile(resolve(root, file));
      res.writeHead(200, {
        "content-type": {
          ".html": "text/html; charset=utf-8",
          ".mjs": "text/javascript; charset=utf-8",
          ".css": "text/css; charset=utf-8",
          ".md": "text/plain; charset=utf-8",
        }[extname(file)],
        "cache-control": "no-store",
      });
      res.end(data);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await startServer();
