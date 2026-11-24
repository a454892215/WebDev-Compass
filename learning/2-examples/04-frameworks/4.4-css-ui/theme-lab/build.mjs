import { mkdir, copyFile, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";
await mkdir(new URL("./dist/", import.meta.url), { recursive: true });
const result = spawnSync(
  "pnpm",
  [
    "exec",
    "tailwindcss",
    "-i",
    "src/theme.css",
    "-o",
    "dist/theme.css",
    "--minify",
  ],
  { stdio: "inherit" },
);
if (result.status !== 0) process.exit(result.status ?? 1);
for (const file of ["index.html", "theme.js", "info.svg"])
  await copyFile(
    new URL(`./src/${file}`, import.meta.url),
    new URL(`./dist/${file}`, import.meta.url),
  );
const css = await readFile(
  new URL("./dist/theme.css", import.meta.url),
  "utf8",
);
for (const marker of [
  ".grid{",
  ".md\\:grid-cols-2{",
  "--color-brand:",
  "data-theme=dark",
  "prefers-color-scheme:dark",
])
  assert.ok(css.includes(marker), `Missing built CSS ${marker}`);
assert.ok(
  !css.includes('@import "tailwindcss"'),
  "Tailwind import was not compiled",
);
console.log(
  "CSS build verified: real utilities, breakpoint, tokens and dark scheme",
);
