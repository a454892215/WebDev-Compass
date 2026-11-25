import { test } from "node:test";
import assert from "node:assert/strict";
import { createEventPolicy, breadcrumbPolicy, priority } from "../policy.mjs";
test("event allowlist removes private data and source query; local quota is bounded", () => {
  const policy = createEventPolicy(1);
  const clean = policy({
    event_id: "fixture",
    user: { email: "private" },
    request: { url: "private" },
    extra: { token: "private" },
    exception: {
      values: [
        {
          value: "private",
          stacktrace: {
            frames: [
              {
                filename: "http://localhost/a.js?token=private#secret",
                lineno: 3,
                vars: { token: "private" },
              },
            ],
          },
        },
      ],
    },
  });
  assert.equal(
    clean.exception.values[0].stacktrace.frames[0].filename,
    "http://localhost/a.js",
  );
  assert.equal(JSON.stringify(clean).includes("private"), false);
  assert.equal(policy({}), null);
});
test("expected cancellation and unknown breadcrumbs are dropped", () => {
  assert.equal(
    createEventPolicy()({}, { originalException: { name: "AbortError" } }),
    null,
  );
  assert.equal(
    breadcrumbPolicy({ category: "ui.input", message: "email" }),
    null,
  );
  assert.equal(
    breadcrumbPolicy({ category: "ui.action", message: "private typed text" }),
    null,
  );
  assert.deepEqual(
    breadcrumbPolicy({
      category: "ui.action",
      message: "open-panel",
      data: { private: true },
    }),
    { category: "ui.action", message: "open-panel", level: "info" },
  );
});
test("severity policy uses impact not exception name; invalid denominator fails", () => {
  assert.equal(
    priority({ criticalJourney: true, affectedRatio: 0.7, recoverable: false }),
    "P0",
  );
  assert.equal(
    priority({
      criticalJourney: true,
      affectedRatio: 0.02,
      recoverable: false,
    }),
    "P1",
  );
  assert.equal(
    priority({
      criticalJourney: false,
      affectedRatio: 0.1,
      recoverable: false,
    }),
    "P2",
  );
  assert.equal(
    priority({ criticalJourney: false, affectedRatio: 1, recoverable: true }),
    "P3",
  );
  assert.throws(() => priority({ affectedRatio: NaN }));
});
