import { readFile, writeFile, mkdtemp, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { tmpdir } from "node:os";
import assert from "node:assert/strict";
const nuxt = fileURLToPath(
  new URL("../../../4-practice/04-frameworks/", import.meta.url),
);
const config = fileURLToPath(
  new URL("./contracts/tsconfig.json", import.meta.url),
);
const compiler = join(nuxt, "node_modules/.bin/vue-tsc");
const positive = spawnSync(compiler, ["-p", config, "--noEmit"], {
  encoding: "utf8",
});
assert.equal(positive.status, 0, positive.stdout + positive.stderr);
const directory = await mkdtemp(join(tmpdir(), "compass-nuxt-contract-"));
try {
  const source = await readFile(
    new URL("./contracts/async-data.contract.ts", import.meta.url),
    "utf8",
  );
  const bad = join(directory, "bad.ts");
  await writeFile(bad, source.replace("signal: abortSignal", "signal: 123"));
  const rejectedConfig = join(directory, "tsconfig.json");
  await writeFile(
    rejectedConfig,
    JSON.stringify({
      extends: config,
      include: [bad, join(nuxt, ".nuxt/nuxt.d.ts")],
      exclude: [],
    }),
  );
  const rejected = spawnSync(compiler, ["-p", rejectedConfig, "--noEmit"], {
    encoding: "utf8",
  });
  assert.notEqual(
    rejected.status,
    0,
    "Bad numeric signal was unexpectedly accepted",
  );
  assert.match(
    rejected.stdout + rejected.stderr,
    /TS2322/,
    rejected.stdout + rejected.stderr,
  );
  console.log(
    "Nuxt4 useAsyncData contract: positive accepted; numeric signal rejected by actual vue-tsc (TS2322). Runtime cancellation is not claimed.",
  );
} finally {
  await rm(directory, { recursive: true, force: true });
}
