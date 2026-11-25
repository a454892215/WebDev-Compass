import { test } from "node:test";
import assert from "node:assert/strict";
import {
  prefixHeights,
  indexAt,
  visibleRange,
  preserveAnchor,
  queueIdle,
} from "../logic.mjs";
test("variable height window and stable prefix anchor", () => {
  const old = prefixHeights([32, 40, 48, 56]);
  assert.equal(indexAt(old, 75), 2);
  assert.deepEqual(visibleRange(old, 75, 30), { start: 0, end: 4 });
  const next = prefixHeights([52, 40, 48, 56]);
  assert.equal(preserveAnchor(old, next, 75), 95);
  assert.throws(() => prefixHeights([NaN]));
});
test("fallback idle callback is cancellable and bounded semantic, not a real idle deadline", async () => {
  let ran = false;
  const cancel = queueIdle(() => (ran = true), { forceFallback: true });
  cancel();
  await new Promise((r) => setTimeout(r, 30));
  assert.equal(ran, false);
  const result = await new Promise((r) =>
    queueIdle(r, { forceFallback: true }),
  );
  assert.equal(result.didTimeout, true);
  assert.equal(result.timeRemaining(), 0);
});

import { TaskPool } from "../pool.mjs";
test("pool rejects invalid/postMessage failures and ignores old worker errors", async () => {
  const original = globalThis.Worker;
  const workers = [];
  globalThis.Worker = class {
    constructor() {
      workers.push(this);
    }
    postMessage() {
      if (this.fail) throw new Error("DataCloneError");
    }
    terminate() {
      this.stopped = true;
    }
  };
  try {
    const pool = new TaskPool();
    await assert.rejects(pool.submit(new ArrayBuffer(3)), /Invalid buffer/);
    const first = pool.submit(new ArrayBuffer(4)).catch((e) => e.message);
    const old = workers[0];
    pool.cancelAll();
    assert.equal(await first, "Cancelled");
    const fresh = pool.submit(new ArrayBuffer(4));
    old.onerror();
    assert.equal(workers[1].stopped, undefined);
    workers[1].onmessage({ data: { id: 2, sum: 5 } });
    assert.equal(await fresh, 5);
    workers[1].fail = true;
    await assert.rejects(pool.submit(new ArrayBuffer(4)), /DataCloneError/);
    assert.equal(pool.active, null);
    pool.dispose();
  } finally {
    globalThis.Worker = original;
  }
});
