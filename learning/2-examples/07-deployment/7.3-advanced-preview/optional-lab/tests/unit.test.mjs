import test from "node:test";
import assert from "node:assert/strict";
import { wasmAdd, addBytes, validateSchema, validSeries } from "../logic.mjs";
test("real WASM module exports add with i32 semantics", async () => {
  assert.equal(WebAssembly.validate(addBytes), true);
  assert.equal(await wasmAdd(7, 5), 12);
  assert.equal(await wasmAdd(-7, 5), -2);
  assert.equal(await wasmAdd(2147483647, 1), -2147483648);
  await assert.rejects(
    () => WebAssembly.instantiate(addBytes.slice(0, -1)),
    WebAssembly.CompileError,
  );
});
test("schema whitelist rejects executable/unknown/oversize nodes", () => {
  assert.deepEqual(
    validateSchema({
      version: 1,
      nodes: [{ kind: "text", text: "<img src=x onerror=alert(1)>" }],
    }),
    [{ kind: "text", text: "<img src=x onerror=alert(1)>" }],
  );
  for (const value of [
    { version: 2, nodes: [] },
    { version: 1, nodes: [{ kind: "script", text: "x" }] },
    { version: 1, nodes: [{ kind: "text", text: "x", onclick: "x" }] },
    { version: 1, nodes: [{ kind: "text", text: "x".repeat(201) }] },
    { version: 1, nodes: [], execute: "x" },
  ])
    assert.throws(() => validateSchema(value), TypeError);
});
test("chart rejects non-finite and out-of-range data", () => {
  assert.deepEqual(validSeries([{ label: "构建", value: 30 }]), [
    { label: "构建", value: 30 },
  ]);
  for (const value of [NaN, Infinity, -1, 101, "3"])
    assert.throws(() => validSeries([{ label: "x", value }]), TypeError);
});
