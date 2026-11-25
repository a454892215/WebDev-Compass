import test from "node:test";
import assert from "node:assert/strict";
import { startLab, mapCatalog } from "./server.mjs";
test("strict DTO mapping removes internal fields; null and invalid shape differ", () => {
  assert.deepEqual(
    mapCatalog({
      items: [
        {
          course_id: "vue",
          display_name: "Vue",
          updated_at: null,
          internal_note: "never send",
        },
      ],
    }),
    [{ id: "vue", title: "Vue", updatedAt: null }],
  );
  assert.throws(() =>
    mapCatalog({
      items: [{ course_id: "vue", display_name: 9, updated_at: null }],
    }),
  );
  assert.throws(() =>
    mapCatalog({
      items: [
        { course_id: "vue", display_name: "Vue", updated_at: "not-a-date" },
      ],
    }),
  );
  assert.throws(() =>
    mapCatalog({
      items: [
        {
          course_id: "vue",
          display_name: "Vue",
          updated_at: "2026-02-30T00:00:00Z",
        },
      ],
    }),
  );
});
test("real HTTP aggregation, scope separation, degradation/deadline, versions and fixed target", async () => {
  const lab = await startLab();
  try {
    const read = async (path) => {
      const response = await fetch(lab.origin + path, {
        signal: AbortSignal.timeout(2000),
      });
      return { response, body: await response.json() };
    };
    const a = await read("/api/v1/workspace?scope=alice");
    assert.equal(a.response.status, 200);
    assert.equal(a.body.items[0].title, "Alice course");
    assert.equal(a.body.status, "complete");
    assert.equal(a.body.progress, 3);
    assert.match(a.response.headers.get("cache-control"), /no-store/);
    assert.match(a.response.headers.get("deprecation"), /^@\d+$/);
    assert.ok(Number.isFinite(Date.parse(a.response.headers.get("sunset"))));
    assert.match(a.response.headers.get("link"), /successor-version/);
    assert.ok(!JSON.stringify(a.body).includes("internal_note"));
    const pair = await Promise.all(
      ["alice", "bob", "alice", "bob"].map((scope) =>
        read("/api/v2/workspace?scope=" + scope),
      ),
    );
    assert.deepEqual(
      pair.map((x) => x.body.items[0].title),
      ["Alice course", "Bob course", "Alice course", "Bob course"],
    );
    assert.ok(pair.every((x) => x.body.meta.schemaVersion === 2));
    const partial = await read("/api/v2/workspace?scenario=slow-optional");
    assert.equal(partial.response.status, 200);
    assert.equal(partial.body.status, "degraded");
    assert.equal(partial.body.progress, null);
    assert.deepEqual(partial.body.warnings, ["PROGRESS_UNAVAILABLE"]);
    const timeout = await read("/api/v2/workspace?scenario=slow-required");
    assert.equal(timeout.response.status, 504);
    assert.equal(timeout.body.error, "DEADLINE");
    const malformed = await read("/api/v2/workspace?scenario=bad-required");
    assert.equal(malformed.response.status, 502);
    assert.equal(malformed.body.error, "UPSTREAM_REQUIRED");
    const before = lab.stats.requests;
    assert.equal(
      (await read("/api/v1/workspace?url=https://example.com")).response.status,
      400,
    );
    assert.equal(lab.stats.requests, before);
    assert.equal(
      (await read("/api/v1/workspace?scope=unknown")).response.status,
      400,
    );
    assert.equal(
      (await fetch(lab.origin + "/api/v1/workspace", { method: "POST" }))
        .status,
      405,
    );
    // Give the upstream close event a bounded event-loop turn, not a timing performance claim.
    await new Promise((r) => setTimeout(r, 20));
    assert.ok(lab.stats.cancelled >= 2);
  } finally {
    await lab.close();
  }
});
