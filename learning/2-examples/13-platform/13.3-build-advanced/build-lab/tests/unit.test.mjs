import { test } from "node:test";
import assert from "node:assert/strict";
import { cacheKey } from "../cache.mjs";
import { buildInfoPlugin } from "../plugin.mjs";
import { sumPositive } from "../library/dist/index.mjs";
test("cache includes declared source and public config", () => {
  const a = cacheKey([["source", "a"]], "v1");
  assert.notEqual(a, cacheKey([["source", "b"]], "v1"));
  assert.notEqual(a, cacheKey([["source", "a"]], "v2"));
  assert.equal(a, cacheKey([["source", "a"]], "v1"));
});
test("virtual module owns exact public id and emits JSON safely", () => {
  const p = buildInfoPlugin("fixture");
  assert.equal(p.resolveId("other"), undefined);
  assert.equal(p.resolveId("virtual:build-info"), "\0virtual:build-info");
  assert.match(p.load("\0virtual:build-info"), /fixture/);
  assert.throws(() => buildInfoPlugin("SECRET=<unsafe>"), /rejected/);
});
test("real emitted ESM behavior rejects invalid inputs", () => {
  assert.equal(sumPositive(2, 3), 5);
  for (const value of [-1, NaN, Infinity])
    assert.throws(() => sumPositive(value, 1), RangeError);
});
