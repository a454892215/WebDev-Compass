import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const base = new URL("./", import.meta.url);
export async function startServer(port) {
  const server = createServer(async (req, res) => {
    const pathname = new URL(req.url, "http://localhost").pathname;
    const known = {
      "/": "index.html",
      "/catalog.html": "index.html",
      "/reports.html": "index.html",
      "/child.html": "child.html",
      "/app.mjs": "app.mjs",
      "/logic.mjs": "logic.mjs",
      "/style.css": "style.css",
      "/README.md": "README.md",
    };
    const file = known[pathname];
    const documentRoute = !pathname.includes(".");
    const target = file || (documentRoute ? "index.html" : null);
    if (!target) {
      res.writeHead(404).end("Not found");
      return;
    }
    const ext = target.split(".").pop();
    const type = {
      html: "text/html; charset=utf-8",
      mjs: "text/javascript; charset=utf-8",
      css: "text/css; charset=utf-8",
      md: "text/plain; charset=utf-8",
    }[ext];
    try {
      res.writeHead(file ? 200 : 404, {
        "content-type": type,
        "cache-control": "no-store",
      });
      res.end(await readFile(new URL(target, base)));
    } catch {
      res.writeHead(500).end("Unavailable");
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
  return server;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const a = await startServer(4513);
  const b = await startServer(4516);
  const close = () => {
    a.close();
    b.close();
  };
  process.on("SIGTERM", close);
  process.on("SIGINT", close);
}
