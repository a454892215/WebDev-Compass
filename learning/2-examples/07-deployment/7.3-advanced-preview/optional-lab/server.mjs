import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, extname, sep } from "node:path";
const root = resolve(fileURLToPath(new URL(".", import.meta.url)));
const types = {
  ".md": "text/plain; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};
export function startServer(port = 4509) {
  const server = createServer(async (req, res) => {
    const path = new URL(req.url, "http://localhost").pathname;
    let decoded;
    try {
      decoded = decodeURIComponent(path);
    } catch {
      res.writeHead(400);
      res.end();
      return;
    }
    const target = resolve(
      root,
      "." + (decoded === "/" ? "/index.html" : decoded),
    );
    if (!target.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    try {
      const body = await readFile(target);
      res.writeHead(200, {
        "Content-Type": types[extname(target)] || "application/octet-stream",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await startServer();
  console.log("http://127.0.0.1:4509");
}
