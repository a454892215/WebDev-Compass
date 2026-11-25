import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import {
  requestContext,
  execute,
  persisted,
  operationHash,
  newCache,
  writeViewer,
  viewerQuery,
  ExpiringStoreModel,
  toViewerDto,
  backoff,
  replay,
  encodeSse,
} from "./lab.mjs";

test("GraphQL resolves three authors: unbatched 3 calls, request loader 1 batch in input order", async () => {
  const raw = requestContext("A", false),
    batched = requestContext("A");
  const [a, b] = await Promise.all([execute(raw), execute(batched)]);
  assert.equal(a.errors, undefined);
  assert.equal(b.errors, undefined);
  assert.deepEqual(a.data, b.data);
  assert.equal(raw.stats.calls, 3);
  assert.equal(batched.stats.calls, 1);
  assert.deepEqual(batched.stats.keys, [["1", "2"]]);
  assert.deepEqual(
    b.data.posts.map((p) => p.author.name),
    ["A-person-1", "A-person-2", "A-person-1"],
  );
});
test("concurrent request contexts never share tenant data or loader cache", async () => {
  const a = requestContext("A"),
    b = requestContext("B");
  const [ra, rb] = await Promise.all([execute(a), execute(b)]);
  assert.equal(ra.data.posts[0].author.name, "A-person-1");
  assert.equal(rb.data.posts[0].author.name, "B-person-1");
  assert.equal(a.stats.calls, 1);
  assert.equal(b.stats.calls, 1);
  assert.throws(() => requestContext("C"), /FORBIDDEN/);
});
test("persisted query allowlist rejects unknown hashes, does not accept arbitrary query text", () => {
  assert.ok(persisted(operationHash).includes("posts"));
  assert.throws(() => persisted("0".repeat(64)), /UNKNOWN_OPERATION/);
});
test("actual Apollo normalized cache: distinct SSR instances; extract/restore then clear logout", () => {
  const a = newCache(),
    b = newCache();
  writeViewer(a, "A");
  writeViewer(b, "B");
  assert.equal(a.readQuery({ query: viewerQuery }).viewer.name, "A-private");
  assert.equal(b.readQuery({ query: viewerQuery }).viewer.name, "B-private");
  assert.ok(JSON.stringify(a.extract()).includes("A-private"));
  assert.ok(!JSON.stringify(a.extract()).includes("B-private"));
  const browser = newCache().restore(a.extract());
  assert.equal(
    browser.readQuery({ query: viewerQuery }).viewer.name,
    "A-private",
  );
  browser.restore({});
  assert.equal(browser.readQuery({ query: viewerQuery }), null);
});
test("single process Redis role model: session expiry/revoke, atomic-window intent and tenant key", () => {
  const store = new ExpiringStoreModel();
  store.set("session:opaque-A", { tenant: "A" }, 10, 100);
  assert.equal(store.get("session:opaque-A", 109).tenant, "A");
  assert.equal(store.get("session:opaque-A", 110), undefined);
  store.set("session:opaque-B", {}, 20, 100);
  store.delete("session:opaque-B");
  assert.equal(store.get("session:opaque-B", 101), undefined);
  assert.equal(store.allow("rate:A:user1", 2, 1000, 0), true);
  assert.equal(store.allow("rate:A:user1", 2, 1000, 1), true);
  assert.equal(store.allow("rate:A:user1", 2, 1000, 2), false);
  assert.equal(store.allow("rate:B:user1", 2, 1000, 2), true);
  assert.equal(store.allow("rate:A:user1", 2, 1000, 1000), true);
});
test("migration boundary: additive nullable field must be backfilled before strict DTO", () => {
  assert.throws(
    () => toViewerDto({ id: 1, displayName: null }),
    /NOT_BACKFILLED/,
  );
  assert.deepEqual(
    toViewerDto({ id: 1, displayName: "Ada", passwordHash: "never-expose" }),
    { id: "1", name: "Ada" },
  );
});
test("full jitter bounded retry, replay cursor and tenant filtering", () => {
  assert.equal(
    backoff(0, () => 0.5),
    250,
  );
  assert.equal(
    backoff(30, () => 0.5),
    15000,
  );
  assert.equal(
    backoff(2, () => 0),
    0,
  );
  assert.throws(() => backoff(-1), /INVALID/);
  assert.deepEqual(
    replay("A", 1).map((e) => e.id),
    [3],
  );
  assert.deepEqual(
    replay("B", 0).map((e) => e.id),
    [2],
  );
  assert.throws(() => replay("A", NaN), /INVALID_CURSOR/);
});
test("actual loopback SSE headers/framing, Last-Event-ID replay, socket close cleanup", async () => {
  let closedResolve;
  const closed = new Promise((resolve) => {
    closedResolve = resolve;
  });
  const server = createServer((req, res) => {
    res.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-store",
    });
    res.write(": heartbeat\n\n");
    for (const event of replay("A", Number(req.headers["last-event-id"] ?? 0)))
      res.write(encodeSse(event));
    const heartbeat = setInterval(() => res.write(": heartbeat\n\n"), 25);
    res.on("close", () => {
      clearInterval(heartbeat);
      closedResolve();
    });
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const controller = new AbortController();
  try {
    const response = await fetch("http://127.0.0.1:" + server.address().port, {
      headers: { "Last-Event-ID": "1" },
      signal: controller.signal,
    });
    assert.match(response.headers.get("content-type"), /event-stream/);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    while (!text.includes("A-two")) {
      const { value, done } = await reader.read();
      assert.equal(done, false);
      text += decoder.decode(value, { stream: true });
    }
    assert.match(text, /: heartbeat\n\n/);
    assert.match(text, /id: 3\nevent: update\ndata:/);
    assert.ok(!text.includes("A-one"));
    assert.ok(!text.includes("B-one"));
    await reader.cancel();
    controller.abort();
    await Promise.race([
      closed,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("socket not closed")), 2000).unref(),
      ),
    ]);
  } finally {
    controller.abort();
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});
