import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { safeLog, eventBody } from "../logic.mjs";
test("allowlisted minimal log drops query, unknown path details and PII fields", () => {
  const log = safeLog({
    url: "/optional-event?token=synthetic-private",
    status: 204,
    kind: "opened",
    email: "person@example.invalid",
    authorization: "synthetic-private",
  });
  assert.deepEqual(log, {
    route: "/optional-event",
    status: 204,
    kind: "opened",
  });
  assert.equal(
    safeLog({ url: "/person/person@example.invalid", status: 404 }).route,
    "other",
  );
  assert.equal(JSON.stringify(log).includes("synthetic-private"), false);
});
test("event schema rejects unrelated identifiers/PII", () => {
  assert.deepEqual(eventBody({ kind: "opened" }), { kind: "opened" });
  assert.throws(() =>
    eventBody({ kind: "opened", email: "person@example.invalid" }),
  );
  assert.throws(() => eventBody(Object.create({ kind: "opened" })));
});
test("real client build omits server canary while hidden sourcemap remains public data", async () => {
  const names = await readdir("dist/assets");
  const js = names.filter((n) => n.endsWith(".js"));
  assert.ok(js.length);
  const maps = names.filter((n) => n.endsWith(".map"));
  assert.ok(maps.length);
  const code = (
    await Promise.all(js.map((n) => readFile("dist/assets/" + n, "utf8")))
  ).join("");
  assert.ok(code.includes("PUBLIC_LABEL"));
  assert.ok(!code.includes("STAGE10_SERVER_ONLY_CANARY"));
  assert.ok(!code.includes("sourceMappingURL"));
  const mapText = (
    await Promise.all(maps.map((n) => readFile("dist/assets/" + n, "utf8")))
  ).join("");
  assert.ok(mapText.includes("STAGE10_SOURCE_COMMENT"));
  assert.ok(!mapText.includes("STAGE10_SERVER_ONLY_CANARY"));
});
