import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
export function createLab() {
  const root = resolve("dist");
  return createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      const file = resolve(
        root,
        "." + (pathname === "/" ? "/index.html" : pathname),
      );
      if (!file.startsWith(root + sep)) {
        res.writeHead(400);
        res.end();
        return;
      }
      const body = await readFile(file);
      res.writeHead(200, {
        "content-type":
          extname(file) === ".html"
            ? "text/html; charset=utf-8"
            : extname(file) === ".js"
              ? "text/javascript"
              : "application/json",
        "cache-control": "no-store",
      });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
}
