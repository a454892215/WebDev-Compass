import test from "node:test";
import assert from "node:assert/strict";
import { createMessages, instantParts } from "./messages.mjs";
test("15.5.1 actual ICU plural/select with explicit locale allowlist", async () => {
  const format = createMessages();
  assert.equal(await format("en", "count", { count: 0 }), "No files");
  assert.equal(await format("en", "count", { count: 1 }), "1 file");
  assert.equal(await format("en", "count", { count: 3 }), "3 files");
  assert.equal(await format("ar", "count", { count: 2 }), "ملفان");
  assert.equal(
    await format("en", "greeting", { role: "unknown", name: "Ada" }),
    "Member: Ada",
  );
  assert.equal(
    await format("en", "person", { gender: "female" }),
    "She uploaded a file",
  );
  assert.equal(
    await format("en", "person", { gender: "unknown" }),
    "They uploaded a file",
  );
  await assert.rejects(
    format("../../private", "count", { count: 1 }),
    /unsupported/,
  );
  await assert.rejects(format("en", "missing", {}), /missing/);
});
test("15.5.1 independent formatter instances/concurrent locales", async () => {
  const a = createMessages(),
    b = createMessages();
  assert.deepEqual(
    await Promise.all([
      a("en", "count", { count: 2 }),
      b("ar", "count", { count: 2 }),
    ]),
    ["2 files", "ملفان"],
  );
});
test("15.5.3 one instant, different zone; DST gap and repeated hour", () => {
  const before = instantParts("2026-03-08T06:30:00Z", "America/New_York");
  const after = instantParts("2026-03-08T07:30:00Z", "America/New_York");
  assert.equal(before.hour, "01");
  assert.equal(after.hour, "03");
  const first = instantParts("2026-11-01T05:30:00Z", "America/New_York"),
    second = instantParts("2026-11-01T06:30:00Z", "America/New_York");
  assert.deepEqual(first, second);
  assert.equal(instantParts("2026-03-08T07:30:00Z", "UTC").hour, "07");
  assert.throws(
    () => instantParts("2026-03-08T02:30:00", "UTC"),
    /offset-required/,
  );
  assert.throws(() => instantParts("garbageZ", "UTC"), /invalid-instant/);
  assert.throws(
    () => instantParts("2026-03-08T07:30:00Z", "Fake/Zone"),
    RangeError,
  );
});
