import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { authorize } from "./core.mjs";
export function createLab() {
  const sessions = new Map(),
    origin = "http://127.0.0.1:4523",
    resources = new Map([
      [
        "note-a",
        {
          id: "note-a",
          owner: "alice",
          tenant: "t1",
          text: "公开合成Alice资料",
        },
      ],
      [
        "note-b",
        { id: "note-b", owner: "bob", tenant: "t1", text: "公开合成Bob资料" },
      ],
      [
        "note-c",
        {
          id: "note-c",
          owner: "alice",
          tenant: "t2",
          text: "公开合成另一tenant资料",
        },
      ],
    ]);
  function current(req) {
    const id = req.headers.cookie
      ?.split(";")
      .map((x) => x.trim())
      .find((x) => x.startsWith("stage10-auth="))
      ?.slice("stage10-auth=".length);
    const value = sessions.get(id);
    if (value && value.expires > Date.now()) return value;
    if (id) sessions.delete(id);
    return null;
  }
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, origin);
    const path = url.pathname;
    res.setHeader("cache-control", "private, no-store");
    res.setHeader("x-content-type-options", "nosniff");
    res.setHeader("referrer-policy", "no-referrer");
    res.setHeader(
      "content-security-policy",
      "default-src 'self';script-src 'self';object-src 'none';base-uri 'none';frame-ancestors 'none';form-action 'self'",
    );
    const json = (status, value) => {
      res.writeHead(status, { "content-type": "application/json" });
      res.end(JSON.stringify(value));
    };
    try {
      if (req.method === "POST" && path === "/session") {
        if (req.headers.origin !== origin)
          return json(403, { error: "Origin rejected" });
        for (const [key, value] of sessions)
          if (value.expires <= Date.now()) sessions.delete(key);
        if (sessions.size >= 32) return json(429, { error: "Capacity" });
        const id = randomBytes(32).toString("base64url");
        sessions.set(id, {
          id: "alice",
          tenant: "t1",
          roles: ["reader"],
          expires: Date.now() + 60000,
        });
        res.setHeader(
          "set-cookie",
          `stage10-auth=${id};HttpOnly;SameSite=Strict;Path=/;Max-Age=60`,
        );
        return json(201, {
          demo: true,
          note: "Public fixture issuance,not real authentication",
        });
      }
      if (req.method === "POST" && path === "/logout") {
        if (req.headers.origin !== origin)
          return json(403, { error: "Origin rejected" });
        const cookie = req.headers.cookie?.match(
          /(?:^|;\s*)stage10-auth=([^;]+)/,
        )?.[1];
        if (cookie) sessions.delete(cookie);
        res.setHeader(
          "set-cookie",
          "stage10-auth=;HttpOnly;SameSite=Strict;Path=/;Max-Age=0",
        );
        res.writeHead(204);
        return res.end();
      }
      if (req.method === "GET" && path === "/api/me") {
        const subject = current(req);
        return subject
          ? json(200, { name: "Alice fixture", demo: true })
          : json(401, { error: "No demo session" });
      }
      if (["GET", "DELETE"].includes(req.method) && path === "/api/note") {
        if (req.method === "DELETE" && req.headers.origin !== origin)
          return json(403, { error: "Origin rejected" });
        const subject = current(req);
        if (!subject) return json(401, { error: "No demo session" });
        const resource = resources.get(url.searchParams.get("id") || "note-a");
        if (!resource) return json(404, { error: "Not found" });
        const action = req.method === "DELETE" ? "delete" : "read";
        return authorize(subject, resource, action)
          ? json(200, { id: resource.id, text: resource.text })
          : json(403, { error: "Denied" });
      }
      if (
        req.method === "GET" &&
        (path === "/" || path === "/app.mjs" || path === "/README.md")
      ) {
        const file = path === "/" ? "index.html" : path.slice(1);
        const data = await readFile(new URL(file, import.meta.url));
        res.writeHead(200, {
          "content-type": path.endsWith(".mjs")
            ? "text/javascript; charset=utf-8"
            : path.endsWith(".md")
              ? "text/plain; charset=utf-8"
              : "text/html; charset=utf-8",
        });
        return res.end(data);
      }
      json(404, { error: "Not found" });
    } catch {
      json(500, { error: "Lab failure" });
    }
  });
  return { server, clear: () => sessions.clear() };
}
