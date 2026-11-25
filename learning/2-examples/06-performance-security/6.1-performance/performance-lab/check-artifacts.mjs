import { readFile, readdir } from "node:fs/promises";
import assert from "node:assert/strict";
const files = await readdir("dist/assets");
const js = files.filter((f) => f.endsWith(".js"));
assert.ok(js.length >= 3);
const texts = await Promise.all(
  js.map((f) => readFile(`dist/assets/${f}`, "utf8")),
);
assert.ok(!texts.some((t) => t.includes("UNUSED_STAGE6_EXPORT_SENTINEL")));
const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
assert.ok(Object.values(manifest).some((e) => e.isDynamicEntry));
console.log(
  JSON.stringify({
    dynamicEntry: true,
    unusedExportRemoved: true,
    jsAssets: js.length,
  }),
);
