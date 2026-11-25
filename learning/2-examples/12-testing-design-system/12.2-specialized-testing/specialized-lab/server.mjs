import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
const root = resolve(fileURLToPath(new URL("./dist/", import.meta.url)));
export function startServer(port = 4543) {
  const server = createServer(async (req, res) => {
    try {
      const pathname = new URL(req.url, "http://127.0.0.1").pathname;
      if (pathname === "/README.md") {
        res.setHeader("content-type", "text/plain; charset=utf-8");
        res.end(await readFile(new URL("./README.md", import.meta.url)));
        return;
      }
      if (pathname === "/../README.md") {
        res.statusCode = 404;
        res.end();
        return;
      }
      const path = resolve(
        root,
        "." + (pathname === "/" ? "/index.html" : pathname),
      );
      if (path !== root && !path.startsWith(root + "/")) {
        res.statusCode = 403;
        res.end();
        return;
      }
      const type = path.endsWith(".js")
        ? "text/javascript"
        : path.endsWith(".css")
          ? "text/css"
          : path.endsWith(".html")
            ? "text/html"
            : "application/octet-stream";
      res.setHeader("content-type", type + "; charset=utf-8");
      res.setHeader("cache-control", "no-store");
      res.end(await readFile(path));
    } catch {
      res.statusCode = 404;
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
  console.log("http://127.0.0.1:4543");
}
