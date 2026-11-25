import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { decodeSummary, canReserve, safeRetry } from "../core.mjs";
import { createLabServer } from "../server.mjs";
test("consumer decoder rejects a provider breaking field type and status assumptions", () => {
  assert.deepEqual(
    decodeSummary({
      id: "x",
      title: "Fixture",
      remaining: 3,
      additive: "safe",
    }),
    { id: "x", title: "Fixture", remaining: 3 },
  );
  for (const value of [
    null,
    [],
    { id: "x", title: "Fixture", remaining: "3" },
    { id: "x", title: "Fixture" },
    { id: "x", title: "Fixture", remaining: -1 },
  ])
    assert.throws(() => decodeSummary(value));
});
test("real local provider response satisfies consumer contract", async () => {
  const server = createLabServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    const response = await fetch(
      "http://127.0.0.1:" + server.address().port + "/summary",
    );
    assert.equal(response.status, 200);
    assert.equal(decodeSummary(await response.json()).remaining, 3);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
test("controlled manual mutation exposes weak tests without calling it Stryker", () => {
  assert.equal(canReserve(1), true);
  assert.equal(canReserve(0), false);
  const mutant = (n) => Number.isInteger(n) && n >= 0;
  const weak = (fn) => assert.equal(fn(1), true);
  const strong = (fn) => {
    assert.equal(fn(1), true);
    assert.equal(fn(0), false);
  };
  weak(canReserve);
  weak(mutant);
  strong(canReserve);
  assert.throws(() => strong(mutant), { name: "AssertionError" });
});
test("bounded retry classifies known transient vs deterministic application fault", () => {
  assert.equal(safeRetry({ name: "TimeoutError" }), true);
  assert.equal(safeRetry({ name: "AssertionError" }), false);
});
