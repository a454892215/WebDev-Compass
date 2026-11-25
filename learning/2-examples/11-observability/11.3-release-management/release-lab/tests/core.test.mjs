import { test } from "node:test";
import assert from "node:assert/strict";
import {
  bucket,
  evaluate,
  baseline,
  subjects,
  assign,
  createLedger,
} from "../core.mjs";
import { rollbackDrill } from "../rollback.mjs";
test("stable cohorts, 0/100, monotonic rollout, regions and kill precedence", () => {
  for (const subject of subjects) {
    const context = { subject, region: "CN" };
    assert.equal(bucket(subject, "reader-v1"), bucket(subject, "reader-v1"));
    assert.equal(evaluate({ ...baseline, percent: 0 }, context).enabled, false);
    assert.equal(
      evaluate({ ...baseline, percent: 100 }, context).enabled,
      true,
    );
    assert.equal(
      evaluate(
        { ...baseline, percent: 100, kill: true, allow: [subject] },
        context,
      ).enabled,
      false,
    );
    assert.equal(
      evaluate({ ...baseline, percent: 100 }, { ...context, region: "NO" })
        .enabled,
      false,
    );
    assert.equal(
      evaluate({ ...baseline, percent: 0, allow: [subject] }, context).enabled,
      true,
    );
    let previous = false;
    for (let p = 0; p <= 100; p++) {
      const value = evaluate({ ...baseline, percent: p }, context).enabled;
      assert.ok(!previous || value);
      previous = value;
    }
  }
});
test("missing context and invalid or unavailable config fail closed", () => {
  for (const percent of [-1, 101, NaN, 25.5, "25"])
    assert.equal(
      evaluate({ ...baseline, percent }, { subject: subjects[0], region: "CN" })
        .enabled,
      false,
    );
  assert.equal(
    evaluate(null, { subject: subjects[0], region: "CN" }).enabled,
    false,
  );
  assert.equal(evaluate(baseline, {}).enabled, false);
  assert.equal(
    evaluate(
      { ...baseline, regions: null },
      { subject: subjects[0], region: "CN" },
    ).enabled,
    false,
  );
  assert.throws(() => bucket("", "x"));
});
test("experiment assignment not exposure; visible event idempotent; conversion requires matching exposure", () => {
  const ledger = createLedger(),
    subject = subjects[0],
    variant = assign(subject);
  assert.deepEqual(ledger.snapshot(), {
    exposed: 0,
    converted: 0,
    experiment: "cta-experiment-v1",
  });
  assert.equal(ledger.event(subject, variant, "conversion"), false);
  assert.equal(
    ledger.event(subject, variant === "A" ? "B" : "A", "exposure"),
    false,
  );
  assert.equal(ledger.event(subject, variant, "exposure"), true);
  assert.equal(ledger.event(subject, variant, "exposure"), true);
  assert.equal(ledger.event(subject, variant, "conversion"), true);
  assert.equal(ledger.event(subject, variant, "conversion"), true);
  assert.equal(ledger.snapshot().exposed, 1);
  assert.equal(ledger.snapshot().converted, 1);
  ledger.clear();
  assert.equal(ledger.snapshot().exposed, 0);
});
test("local manifest rollback retains both hash assets and restores readable stable version", async () => {
  const result = await rollbackDrill();
  assert.equal(result.initial, "stable");
  assert.equal(result.candidate, "candidate");
  assert.equal(result.restored, "stable");
  assert.equal(result.oldAssetRetained, true);
  assert.equal(result.newAssetRetained, true);
  assert.equal(result.restoredAssetReadable, true);
});
