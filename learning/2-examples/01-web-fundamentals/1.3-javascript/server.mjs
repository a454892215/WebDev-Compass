// 教学专用：仓库静态资源 + 本地 POST JSON 回显；不连接外部服务器。
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, extname, sep } from "node:path";
const root = fileURLToPath(new URL("../../../../", import.meta.url));
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".mjs": "text/javascript",
  ".js": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
};
function json(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(value));
}
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    if (url.pathname === "/api/js-echo") {
      if (request.method !== "POST") {
        json(response, 405, { error: "仅允许 POST" });
        return;
      }
      if (!request.headers["content-type"]?.startsWith("application/json")) {
        json(response, 415, { error: "需要 application/json" });
        return;
      }
      const chunks = [];
      let bytes = 0;
      for await (const chunk of request) {
        bytes += chunk.length;
        if (bytes > 4096) {
          json(response, 413, { error: "正文超过 4096 字节" });
          return;
        }
        chunks.push(chunk);
      }
      let value;
      try {
        value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      } catch {
        json(response, 400, { error: "无效 JSON" });
        return;
      }
      if (
        !value ||
        typeof value.title !== "string" ||
        !value.title.trim() ||
        value.title.length > 100
      ) {
        json(response, 422, { error: "title 必须是 1–100 字的非空字符串" });
        return;
      }
      json(response, 200, { received: { title: value.title } });
      return;
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      json(response, 405, { error: "仅允许 GET/HEAD" });
      return;
    }
    const decoded = decodeURIComponent(url.pathname);
    const path = resolve(
      root,
      "." + decoded + (decoded.endsWith("/") ? "index.html" : ""),
    );
    // 仅开放教材静态资源，不暴露 .git、凭据或任意磁盘路径。
    if (
      !path.startsWith(resolve(root) + sep) ||
      decoded.split("/").some((part) => part.startsWith(".")) ||
      !mime[extname(path)]
    ) {
      json(response, 403, { error: "禁止访问" });
      return;
    }
    const body = await readFile(path);
    response.writeHead(200, {
      "Content-Type": mime[extname(path)],
      "Cache-Control": "no-store",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    json(response, error.code === "ENOENT" ? 404 : 400, {
      error: error.code === "ENOENT" ? "未找到资源" : "请求无效",
    });
  }
});
server.listen(Number(process.env.PORT ?? 4174), "127.0.0.1", () =>
  console.log(`本地教学服务 http://127.0.0.1:${server.address().port}`),
);
