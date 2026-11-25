import { build } from "vite";
import { spawnSync } from "node:child_process";
import { copyFile } from "node:fs/promises";
await build();
await build({ configFile: "library/vite.config.mjs" });
const tsc = spawnSync(
  "node",
  ["node_modules/typescript/bin/tsc", "-p", "library/tsconfig.json"],
  { stdio: "inherit" },
);
if (tsc.status !== 0) process.exit(tsc.status || 1);
await copyFile("library/dist/index.d.ts", "library/dist/index.d.cts");
