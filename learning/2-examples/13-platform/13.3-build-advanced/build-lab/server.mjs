import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
export async function startServer(root = resolve("."), port = 4553) {
  const dir = resolve(root, "dist/app");
  const server = createServer(async (req, res) => {
    let url, decoded;
    try {
      url = new URL(req.url, "http://127.0.0.1");
      decoded = decodeURIComponent(url.pathname);
    } catch {
      res.writeHead(400).end("Invalid URL");
      return;
    }
    const path =
      url.pathname === "/README.md"
        ? resolve(root, "README.md")
        : resolve(dir, "." + (url.pathname === "/" ? "/index.html" : decoded));
    if (path !== resolve(root, "README.md") && !path.startsWith(dir + "/")) {
      res.writeHead(403).end();
      return;
    }
    try {
      res.setHeader(
        "content-type",
        {
          ".html": "text/html",
          ".js": "application/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".md": "text/plain",
        }[extname(path)] || "application/octet-stream",
      );
      res.setHeader("x-content-type-options", "nosniff");
      res.end(await readFile(path));
    } catch {
      res.writeHead(404).end("Not found");
    }
  });
  await new Promise((accept, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", accept);
  });
  return server;
}
