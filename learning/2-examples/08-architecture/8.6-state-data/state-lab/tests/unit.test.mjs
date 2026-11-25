import { test } from "node:test";
import assert from "node:assert/strict";
import { OptimisticValue, scopedKey, staleResult, project } from "../logic.mjs";
test("query keys include owner and exact query", () => {
  assert.notEqual(scopedKey("alice", "x"), scopedKey("bob", "x"));
  assert.notEqual(scopedKey("alice", "x"), scopedKey("alice", "y"));
  assert.throws(() => scopedKey("bad"));
});
test("old failure cannot undo newer success and new failure returns confirmed value", () => {
  const s = new OptimisticValue("alice", 0);
  const old = s.begin(1),
    newer = s.begin(2);
  s.accept(newer, { value: 2, revision: 2 });
  assert.equal(s.reject(old), false);
  assert.equal(s.value, 2);
  const newest = s.begin(3);
  s.reject(newest, "409 conflict");
  assert.equal(s.value, 2);
  assert.equal(s.error, "409 conflict");
});
test("old owner response and old confirmed revision cannot overwrite new state", () => {
  const s = new OptimisticValue("alice");
  const old = s.begin(9);
  s.switchScope("bob", 4);
  assert.equal(s.accept(old, { value: 9, revision: 7 }), false);
  assert.equal(s.reject(old), false);
  assert.equal(s.value, 4);
  const a = s.begin(6),
    b = s.begin(7);
  s.accept(b, { value: 7, revision: 3 });
  s.accept(a, { value: 6, revision: 2 });
  assert.equal(s.confirmed, 7);
  assert.equal(s.value, 7);
});
test("stale errors preserve real prior data, projection rejects unknown events", () => {
  assert.deepEqual(staleResult({ data: "old" }, { ok: false }), {
    data: "old",
    stale: true,
    error: "刷新失败，现有内容可能过期",
  });
  assert.equal(
    staleResult({ data: "old" }, { ok: true, data: "new" }).data,
    "new",
  );
  assert.equal(
    project([
      { type: "added", amount: 2 },
      { type: "added", amount: 3 },
    ]),
    5,
  );
  assert.throws(() => project([{ type: "unknown" }]));
});
