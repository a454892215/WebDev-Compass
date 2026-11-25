import test from "node:test";
import assert from "node:assert/strict";
import {
  parseMessage,
  createRegistry,
  parseFields,
  listTitles,
} from "../logic.mjs";
test("versioned message rejects unknown and bad shape", () => {
  assert.equal(
    parseMessage({ v: 1, type: "course:selected", slug: "vue" }).slug,
    "vue",
  );
  for (const value of [
    { v: 2, type: "course:selected", slug: "vue" },
    { v: 1, type: "course:selected", slug: "<img>" },
    { v: 1, type: "course:selected", slug: "vue", token: "secret" },
  ])
    assert.throws(() => parseMessage(value));
});
test("registry allowlist and idempotent cleanup", () => {
  const registry = createRegistry();
  let clean = 0;
  registry.register("counter", 1, () => () => clean++);
  assert.throws(() => registry.register("counter", 1, () => () => {}));
  assert.throws(() => registry.mount("missing", {}));
  const dispose = registry.mount("counter", {});
  dispose();
  dispose();
  assert.equal(clean, 1);
});
test("bounded schema and application port", async () => {
  assert.equal(parseFields([{ id: "title", label: "标题" }]).length, 1);
  assert.throws(() =>
    parseFields([{ id: "title", label: "Title", onClick: "eval" }]),
  );
  assert.throws(() => parseFields(Array(6).fill({ id: "x", label: "x" })));
  for (const fields of [
    [{ label: "Title" }],
    [{ id: null, label: "Title" }],
    [{ id: "x", label: " " }],
    [
      { id: "x", label: "A" },
      { id: "x", label: "B" },
    ],
  ])
    assert.throws(() => parseFields(fields));
  assert.deepEqual(
    await listTitles({
      list: async () => [{ title: "Vue", internal: "not returned" }],
    }),
    ["Vue"],
  );
  await assert.rejects(() => listTitles({ list: async () => [{ wrong: 1 }] }));
});
