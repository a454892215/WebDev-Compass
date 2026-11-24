import { readFile, readdir } from "node:fs/promises";
import assert from "node:assert/strict";
const assets = new URL("./dist/assets/", import.meta.url);
const names = await readdir(assets);
const css = (
  await Promise.all(
    names
      .filter((n) => n.endsWith(".css"))
      .map((n) => readFile(new URL(n, assets), "utf8")),
  )
).join("\n");
const js = (
  await Promise.all(
    names
      .filter((n) => n.endsWith(".js"))
      .map((n) => readFile(new URL(n, assets), "utf8")),
  )
).join("\n");
const classes = new Set(css.match(/\._card_[a-zA-Z0-9_]+/g) ?? []);
assert.equal(
  classes.size,
  2,
  "CSS Modules must emit distinct card class names",
);
assert.match(js, /_card_/, "JS must reference generated module classes");
assert.match(
  css,
  /\.sass-card\{[^}]*padding:24px/,
  "Sass function must compile to 24px",
);
assert.match(
  css,
  /\.sass-card strong\{color:#064(?:;|})/,
  "Sass nested selector and token must compile",
);
assert.match(css, /\.grid\{display:grid/, "Tailwind grid utility must exist");
assert.match(
  css,
  /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/,
  "Responsive Tailwind two-column utility must exist",
);
assert.ok(
  !css.includes("$accent") && !css.includes("@use"),
  "Sass source syntax must not leak",
);
console.log(
  JSON.stringify(
    {
      result: "PASS",
      modules: [...classes],
      sassPadding: "24px",
      tailwind: ["grid", "sm:grid-cols-2"],
      files: names,
    },
    null,
    2,
  ),
);
