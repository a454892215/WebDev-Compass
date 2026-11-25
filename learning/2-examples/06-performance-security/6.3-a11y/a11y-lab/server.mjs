import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
export function start() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const path = new URL(req.url, "http://localhost").pathname;
      const file = {
        "/": "index.html",
        "/bad.html": "bad.html",
        "/cover.svg": "cover.svg",
        "/style.css": "style.css",
        "/main.js": "main.js",
      }[path];
      if (!file) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      try {
        const data = await readFile(root + file);
        res.setHeader(
          "Content-Type",
          file.endsWith(".html")
            ? "text/html;charset=utf-8"
            : file.endsWith(".css")
              ? "text/css"
              : file.endsWith(".svg")
                ? "image/svg+xml"
                : "text/javascript",
        );
        res.end(data);
      } catch {
        res.writeHead(500);
        res.end("fixture error");
      }
    });
    server.listen(4505, "127.0.0.1", () => resolve(server));
  });
}
