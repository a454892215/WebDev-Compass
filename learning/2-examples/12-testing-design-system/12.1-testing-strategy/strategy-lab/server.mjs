import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
export function createLabServer() {
  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    res.setHeader("cache-control", "no-store");
    if (url.pathname === "/summary") {
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          id: "catalog-fixture",
          title: "Synthetic catalog",
          remaining: 3,
        }),
      );
      return;
    }
    if (url.pathname === "/session") {
      const user = url.searchParams.get("user");
      if ((user === "a" || user === "b") && req.method === "POST") {
        res.setHeader(
          "set-cookie",
          "fixture=" + user + "; HttpOnly; SameSite=Lax; Path=/",
        );
        res.end("set");
        return;
      }
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          fixture:
            /fixture=([ab])/.exec(req.headers.cookie || "")?.[1] || "guest",
        }),
      );
      return;
    }
    if (url.pathname === "/README.md") {
      res.setHeader("content-type", "text/plain; charset=utf-8");
      res.end(await readFile(new URL("./README.md", import.meta.url)));
      return;
    }
    if (url.pathname !== "/" && url.pathname !== "/card") {
      res.statusCode = 404;
      res.end("not found");
      return;
    }
    res.setHeader("content-type", "text/html; charset=utf-8");
    res.end(
      '<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Strategy fixture</title><style>body{margin:24px;background:#fff;color:#17212b;font:16px Arial,sans-serif}article{box-sizing:border-box;width:280px;padding:20px;border:2px solid #17212b;border-radius:8px}h1{font-size:22px;margin:0 0 12px}button{font:inherit;background:#174e8c;color:#fff;border:0;border-radius:4px;padding:10px 16px}' +
        (url.searchParams.get("variant") === "changed"
          ? "article{padding:36px}"
          : "") +
        '</style><main><article id="card"><h1>Synthetic catalog</h1><p>3 places remaining</p><button id="reserve" type="button">Reserve a place</button></article><p id="result" role="status"></p><script>document.querySelector("#reserve").addEventListener("click",()=>{setTimeout(()=>{document.querySelector("#result").textContent="Reserved fixture"},80)})</script><p><a href="/README.md">Lab instructions</a></p></main></html>',
    );
  });
}
if (import.meta.url === new URL(process.argv[1], "file:").href) {
  const server = createLabServer();
  server.listen(4542, "127.0.0.1", () => console.log("strategy-lab 4542"));
  for (const signal of ["SIGINT", "SIGTERM"])
    process.once(signal, () => server.close(() => process.exit(0)));
}
