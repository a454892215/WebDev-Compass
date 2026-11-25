import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createBuffer, safeMetric, percentile75 } from "../telemetry.mjs";
import { measureAssets } from "../budget.mjs";
test("safe metric drops URLs/DOM and copies only finite numeric attribution", () => {
  const row = safeMetric({
    name: "INP",
    id: "v6-test",
    value: 96,
    url: "https://secret/?token=private",
    entries: [{ target: "private" }],
    attribution: {
      interactionTarget: "private",
      inputDelay: 3,
      processingDuration: 90,
      presentationDelay: 3,
    },
  });
  assert.equal(JSON.stringify(row).includes("private"), false);
  assert.equal(row.parts.inputDelay, 3);
  assert.equal(safeMetric({ name: "LCP", id: "x", value: NaN }), null);
});
test("bounded sampled dedup keeps latest value without mutation", () => {
  const b = createBuffer({ limit: 1 });
  assert.equal(b.add({ name: "LCP", id: "x", value: 2 }), true);
  assert.equal(b.add({ name: "LCP", id: "x", value: 2 }), false);
  assert.equal(b.add({ name: "INP", id: "y", value: 3 }), false);
  assert.equal(b.add({ name: "LCP", id: "x", value: 4 }), true);
  const s = b.snapshot();
  s[0].value = 999;
  assert.equal(b.snapshot()[0].value, 4);
  assert.equal(
    createBuffer({ sampled: false }).add({ name: "LCP", id: "x", value: 1 }),
    false,
  );
});
test("synthetic percentile requires samples and is not RUM proof", () => {
  assert.equal(percentile75([1, 2, 3, 4]), 3);
  assert.throws(() => percentile75([]));
  assert.throws(() => percentile75([NaN]));
});
test("real Vite artifact passes declared budget and forced CLI/missing/empty fail", async () => {
  const report = await measureAssets("dist", { raw: 100000, gzip: 50000 });
  assert.ok(
    report.rows.length > 0 &&
      report.total.raw > 0 &&
      report.total.gzip > 0 &&
      report.passed,
  );
  const failed = spawnSync(process.execPath, ["budget.mjs", "dist", "1", "1"]);
  assert.equal(failed.status, 1);
  assert.equal(
    spawnSync(process.execPath, [
      "budget.mjs",
      "missing-directory",
      "100",
      "100",
    ]).status,
    1,
  );
  const folder = await mkdtemp(join(tmpdir(), "stage9-budget-"));
  try {
    await mkdir(join(folder, "empty"));
    await assert.rejects(
      measureAssets(join(folder, "empty"), { raw: 1, gzip: 1 }),
      /No JS/,
    );
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
  await assert.rejects(measureAssets("dist", { raw: -1, gzip: 1 }), /Positive/);
});
