import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { checkBudget, bundleStats, delta } from "../budget.mjs";
import { labels } from "../labels.mjs";
test("budget includes exact boundary, rejects invalid threshold and increased build", () => {
  assert.doesNotThrow(() =>
    checkBudget({ raw: 100, gzip: 50 }, { raw: 100, gzip: 50 }),
  );
  assert.throws(
    () => checkBudget({ raw: 101, gzip: 50 }, { raw: 100, gzip: 50 }),
    /exceeded/,
  );
  assert.throws(
    () => checkBudget({ raw: 10, gzip: 5 }, { raw: NaN, gzip: 0 }),
    /Invalid/,
  );
  assert.deepEqual(delta({ raw: 100, gzip: 50 }, { raw: 101, gzip: 40 }), {
    raw: 1,
    gzip: -10,
  });
});
test("missing artifacts are a failure, never an empty passing budget", async () => {
  const folder = await mkdtemp(join(tmpdir(), "stage12-budget-unit-"));
  try {
    await assert.rejects(bundleStats(folder));
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});
test("pseudo expansion and RTL are separate language fixtures", () => {
  assert.equal(labels.pseudo.dir, "ltr");
  assert.equal(labels.ar.dir, "rtl");
  assert.ok(
    labels.pseudo.description.length > labels.zh.description.length * 3,
  );
  assert.ok(labels.ar.description.length > 100);
});
