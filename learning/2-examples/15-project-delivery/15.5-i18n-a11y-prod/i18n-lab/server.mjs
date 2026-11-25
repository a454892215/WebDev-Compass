import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
const root = new URL(".", import.meta.url);
export function startServer(port = 4574) {
  const server = createServer(async (req, res) => {
    const path = new URL(req.url, "http://127.0.0.1").pathname;
    const files = {
      "/": "index.html",
      "/catalog": "index.html",
      "/details": "index.html",
      "/index.html": "index.html",
      "/style.css": "style.css",
      "/ui.mjs": "ui.mjs",
      "/README.md": "README.md",
    };
    const name = files[path];
    if (!name) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    try {
      res.setHeader(
        "content-type",
        name.endsWith(".css")
          ? "text/css"
          : name.endsWith(".mjs")
            ? "text/javascript"
            : name.endsWith(".html")
              ? "text/html; charset=utf-8"
              : "text/plain; charset=utf-8",
      );
      res.setHeader("cache-control", "no-store");
      res.setHeader("x-content-type-options", "nosniff");
      res.end(await readFile(new URL(name, root)));
    } catch {
      res.writeHead(500);
      res.end("Local resource unavailable");
    }
  });
  server.listen(port, "127.0.0.1");
  return server;
}
if (import.meta.url === new URL(process.argv[1], "file:").href) {
  const server = startServer();
  console.log("http://127.0.0.1:4574");
  for (const signal of ["SIGINT", "SIGTERM"])
    process.on(signal, () => server.close());
}
