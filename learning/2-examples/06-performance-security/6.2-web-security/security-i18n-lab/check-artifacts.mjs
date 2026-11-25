import { readFile, readdir } from "node:fs/promises";
import { strict as assert } from "node:assert";
const files = await readdir("dist/assets");
const js = files.filter((f) => f.endsWith(".js"));
const maps = files.filter((f) => f.endsWith(".map"));
assert.ok(maps.length > 0);
let exposed = false;
for (const f of [...js, ...maps]) {
  const text = await readFile(`dist/assets/${f}`, "utf8");
  assert.ok(!text.includes("DO_NOT_BUNDLE_FAKE_SECRET"));
  if (f.endsWith(".js")) assert.ok(!text.includes("sourceMappingURL="));
  if (f.endsWith(".map") && text.includes("SOURCE_ONLY_PUBLIC_DEMO"))
    exposed = true;
}
assert.ok(exposed);
console.log(
  JSON.stringify(
    {
      passed: 2,
      hiddenMapStillContainsPublicSourceComment: true,
      privateCanaryNotInAssets: true,
      scope: "artifact scan, not proof there are no other secrets",
    },
    null,
    2,
  ),
);
