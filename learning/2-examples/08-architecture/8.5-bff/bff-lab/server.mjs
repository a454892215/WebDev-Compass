import { createServer } from "node:http";
import { once } from "node:events";
export function mapCatalog(raw) {
  if (
    !raw ||
    typeof raw !== "object" ||
    !Array.isArray(raw.items) ||
    raw.items.length > 100
  )
    throw new TypeError("Bad catalogue");
  return raw.items.map((row) => {
    if (
      !row ||
      typeof row.course_id !== "string" ||
      !/^[a-z]{1,20}$/.test(row.course_id) ||
      typeof row.display_name !== "string" ||
      row.display_name.length > 100 ||
      !(
        row.updated_at === null ||
        (typeof row.updated_at === "string" &&
          /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/.test(row.updated_at) &&
          Number.isFinite(Date.parse(row.updated_at)) &&
          new Date(row.updated_at).toISOString().replace(".000Z", "Z") ===
            row.updated_at)
      )
    )
      throw new TypeError("Bad course");
    return {
      id: row.course_id,
      title: row.display_name,
      updatedAt: row.updated_at,
    };
  });
}
export async function startLab(port = 4514) {
  const stats = { cancelled: 0, requests: 0 };
  const upstream = createServer((req, res) => {
    stats.requests++;
    const url = new URL(req.url, "http://localhost");
    const scenario = url.searchParams.get("scenario");
    const optional = url.pathname === "/progress";
    const delay =
      (scenario === "slow-optional" && optional) ||
      (scenario === "slow-required" && !optional)
        ? 600
        : 5;
    let finished = false;
    const timer = setTimeout(() => {
      finished = true;
      res.setHeader("content-type", "application/json");
      if (optional) res.end(JSON.stringify({ completed: 3 }));
      else
        res.end(
          JSON.stringify({
            items: [
              {
                course_id: "vue",
                display_name:
                  url.searchParams.get("scope") === "bob"
                    ? "Bob course"
                    : "Alice course",
                updated_at: null,
                internal_note: "synthetic-server-only",
              },
            ],
            ...(scenario === "bad-required"
              ? {
                  items: [
                    {
                      course_id: 42,
                      display_name: "invalid",
                      updated_at: null,
                    },
                  ],
                }
              : {}),
          }),
        );
    }, delay);
    res.on("close", () => {
      clearTimeout(timer);
      if (!finished) stats.cancelled++;
    });
  });
  upstream.listen(0, "127.0.0.1");
  await once(upstream, "listening");
  const upstreamOrigin = `http://127.0.0.1:${upstream.address().port}`;
  const bff = createServer(async (req, res) => {
    res.setHeader("content-type", "application/json");
    res.setHeader("cache-control", "private, no-store");
    const reply = (status, data) => {
      res.writeHead(status);
      res.end(JSON.stringify(data));
    };
    if (req.method !== "GET") {
      res.setHeader("allow", "GET");
      reply(405, { error: "METHOD" });
      return;
    }
    const url = new URL(req.url, "http://localhost");
    if (!["/api/v1/workspace", "/api/v2/workspace"].includes(url.pathname)) {
      reply(404, { error: "NOT_FOUND" });
      return;
    }
    const scope = url.searchParams.get("scope") || "alice";
    const scenario = url.searchParams.get("scenario") || "ok";
    if (
      !["alice", "bob"].includes(scope) ||
      !["ok", "slow-optional", "slow-required", "bad-required"].includes(
        scenario,
      ) ||
      [...url.searchParams.keys()].some(
        (k) => !["scope", "scenario"].includes(k),
      )
    ) {
      reply(400, { error: "INPUT" });
      return;
    }
    const controller = new AbortController();
    const deadline = setTimeout(
      () => controller.abort(new Error("Deadline")),
      80,
    );
    const disconnect = () => {
      if (!res.writableEnded)
        controller.abort(new Error("Client disconnected"));
    };
    res.on("close", disconnect);
    const read = async (path) => {
      const response = await fetch(
        `${upstreamOrigin}${path}?${new URLSearchParams({ scope, scenario })}`,
        { signal: controller.signal, redirect: "error" },
      );
      if (!response.ok) throw new Error("Upstream status");
      return response.json();
    };
    try {
      const [required, optional] = await Promise.allSettled([
        read("/catalog").then(mapCatalog),
        read("/progress").then((raw) => {
          if (!Number.isInteger(raw.completed) || raw.completed < 0)
            throw new TypeError("Bad progress");
          return raw.completed;
        }),
      ]);
      if (res.destroyed) return;
      if (required.status === "rejected") {
        reply(controller.signal.aborted ? 504 : 502, {
          error: controller.signal.aborted ? "DEADLINE" : "UPSTREAM_REQUIRED",
        });
        return;
      }
      const body = {
        items: required.value,
        progress: optional.status === "fulfilled" ? optional.value : null,
        status: optional.status === "fulfilled" ? "complete" : "degraded",
        warnings:
          optional.status === "fulfilled" ? [] : ["PROGRESS_UNAVAILABLE"],
      };
      if (url.pathname.includes("/v1/")) {
        res.setHeader(
          "deprecation",
          `@${Date.parse("2026-11-25T00:00:00Z") / 1000}`,
        );
        res.setHeader("sunset", new Date("2027-11-25T00:00:00Z").toUTCString());
        res.setHeader("link", '</api/v2/workspace>; rel="successor-version"');
        reply(200, body);
      } else reply(200, { ...body, meta: { schemaVersion: 2 } });
    } finally {
      clearTimeout(deadline);
      res.off("close", disconnect);
    }
  });
  bff.listen(port, "127.0.0.1");
  await once(bff, "listening");
  return {
    origin: `http://127.0.0.1:${bff.address().port}`,
    stats,
    close: async () => {
      bff.closeAllConnections();
      upstream.closeAllConnections();
      await Promise.all([
        new Promise((r) => bff.close(r)),
        new Promise((r) => upstream.close(r)),
      ]);
    },
  };
}
if (process.argv[1]?.endsWith("/server.mjs")) {
  const lab = await startLab();
  console.log(`Local fixture BFF: ${lab.origin}`);
  for (const signal of ["SIGTERM", "SIGINT"])
    process.once(signal, async () => {
      await lab.close();
      process.exit();
    });
}
