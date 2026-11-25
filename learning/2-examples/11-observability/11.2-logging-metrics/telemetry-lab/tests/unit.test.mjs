import test from "node:test";
import assert from "node:assert/strict";
import {
  safeLog,
  createHistogram,
  percentile,
  evaluateSlo,
  alertPair,
  replayDecision,
} from "../core.mjs";
import { createTelemetry } from "../otel.mjs";

test("structured allowlist omits secrets; pseudonym is not anonymity", () => {
  const row = safeLog(
    {
      level: "info",
      route: "catalog",
      outcome: "ok",
      traceId: "1".repeat(32),
      userId: "fixture@example.invalid",
      authorization: "Bearer secret",
      url: "/?token=secret",
    },
    "server-only-fixture-key",
  );
  const text = JSON.stringify(row);
  assert.equal(row.subject.length, 16);
  assert.ok(
    !text.includes("example") &&
      !text.includes("secret") &&
      !text.includes("token"),
  );
  assert.throws(() =>
    safeLog(
      {
        level: "info",
        route: "/users/alice",
        outcome: "ok",
        traceId: "1".repeat(32),
      },
      "key",
    ),
  );
});
test("cumulative histogram, nearest-rank p75 and invalid observations", () => {
  const h = createHistogram();
  for (const value of [80, 180, 600, 1200]) h.observe(value);
  assert.deepEqual(h.snapshot(), {
    unit: "ms",
    count: 4,
    sum: 2060,
    buckets: [
      { le: 100, count: 1 },
      { le: 300, count: 2 },
      { le: 1000, count: 3 },
    ],
    infinity: 4,
  });
  assert.equal(percentile([80, 180, 600, 1200]), 600);
  assert.equal(percentile([]), null);
  assert.throws(() => h.observe(NaN));
});
test("SLO low sample/zero request unknown; dual windows and burn rate", () => {
  assert.equal(evaluateSlo({ good: 0, total: 0 }).state, "insufficient-data");
  const bad = evaluateSlo({ good: 9800, total: 10000 });
  assert.ok(Math.abs(bad.burnRate - 20) < 1e-8);
  const quiet = evaluateSlo({ good: 9999, total: 10000 });
  assert.equal(alertPair(bad, bad), "page");
  assert.equal(alertPair(bad, quiet), "quiet");
  assert.equal(
    alertPair(bad, evaluateSlo({ good: 1, total: 1 })),
    "insufficient-data",
  );
  assert.throws(() => evaluateSlo({ good: 3, total: 2 }));
});
test("replay gate defaults deny independent of masking", () => {
  assert.equal(
    replayDecision({
      consent: true,
      page: "catalog",
      vendorReady: true,
      sensitive: false,
    }),
    true,
  );
  for (const value of [
    {},
    { consent: false, page: "catalog", vendorReady: true, sensitive: false },
    { consent: true, page: "checkout", vendorReady: true, sensitive: false },
    { consent: true, page: "catalog", vendorReady: true, sensitive: true },
  ])
    assert.equal(replayDecision(value), false);
});
test("real OTel parent extraction, invalid reset, async isolation and metric SDK", async () => {
  const t = createTelemetry();
  try {
    const remote = "a".repeat(32),
      remote2 = "b".repeat(32),
      parent = "c".repeat(16);
    const [a, b] = await Promise.all([
      t.work({ traceparent: "00-" + remote + "-" + parent + "-01" }, 12),
      t.work({ traceparent: "00-" + remote2 + "-" + parent + "-01" }, 1),
    ]);
    assert.equal(a.traceId, remote);
    assert.equal(b.traceId, remote2);
    const invalid = await t.work({
      traceparent: "00-" + "0".repeat(32) + "-" + parent + "-01",
    });
    assert.notEqual(invalid.traceId, "0".repeat(32));
    t.recordDuration(80);
    t.recordDuration(600);
    const snapshot = await t.snapshot();
    const root = snapshot.spans.find((s) => s.spanId === a.spanId),
      child = snapshot.spans.find((s) => s.spanId === a.childSpanId);
    assert.equal(root.parentSpanId, parent);
    assert.equal(child.parentSpanId, a.spanId);
    assert.equal(child.traceId, remote);
    const counts = snapshot.metrics.find((m) => m.name === "lab.requests");
    assert.equal(counts.dataPoints[0].value, 3);
    const hist = snapshot.metrics.find(
      (m) => m.name === "lab.request.duration",
    );
    assert.equal(hist.unit, "ms");
    assert.equal(hist.dataPoints[0].value.count, 2);
    assert.equal(hist.dataPoints[0].value.sum, 680);
  } finally {
    await t.close();
  }
});
