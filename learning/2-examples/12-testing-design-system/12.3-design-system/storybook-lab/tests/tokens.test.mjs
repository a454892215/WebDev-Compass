import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildTokens } from "../tokens/build.mjs";
import { requiredBump, migrateVariant } from "../policy.mjs";
test("real token alias and typed outputs", { timeout: 10000 }, async () => {
  const css = await readFile("dist/tokens/tokens.css", "utf8"),
    declarations = await readFile("dist/tokens/tokens.d.ts", "utf8");
  assert.match(css, /--color-action: #1d4ed8/);
  assert.match(css, /--spacing-control: 0.75rem/);
  assert.match(css, /--shadow-card:/);
  assert.match(declarations, /export const ColorAction: string/);
});
test("real unresolved alias is a rejected build", async () => {
  const dir = await mkdtemp(join(tmpdir(), "stage12-token-"));
  try {
    const src = join(dir, "bad.json");
    await writeFile(
      src,
      JSON.stringify({
        color: { broken: { type: "color", value: "{missing.alias}" } },
      }),
    );
    await assert.rejects(buildTokens(src, dir + "/out/"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
test("semver choices and explicit value migration are not universal codemod", () => {
  assert.equal(requiredBump({ removed: true, added: true }), "major");
  assert.equal(requiredBump({ added: true }), "minor");
  assert.equal(requiredBump({ fix: true }), "patch");
  assert.deepEqual(migrateVariant("solid"), {
    variant: "primary",
    warning: "solid removed in v2; review contrast",
  });
  assert.equal(migrateVariant("custom").variant, "custom");
});
