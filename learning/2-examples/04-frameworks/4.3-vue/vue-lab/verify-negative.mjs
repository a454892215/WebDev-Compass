import { spawnSync } from "node:child_process";
import { writeFileSync, unlinkSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
const fixture = new URL("./src/__contract_negative__.vue", import.meta.url);
if (existsSync(fixture))
  throw new Error("Refusing to overwrite existing negative fixture");
try {
  writeFileSync(
    fixture,
    `<script setup lang="ts">
import ReadingCard from './components/ReadingCard.vue'
const badItem = { id: 7, title: 'wrong id', done: false }
const emit = defineEmits<{ toggle: [id: string] }>()
emit('toggle', 123)
</script>
<template><ReadingCard :item="badItem" :draft="123" /></template>\n`,
  );
  const result = spawnSync(
    process.platform === "win32" ? "pnpm.cmd" : "pnpm",
    ["exec", "vue-tsc", "--noEmit"],
    { cwd: root, encoding: "utf8", timeout: 20000 },
  );
  const output = result.stdout + result.stderr;
  const diagnostics = (output.match(/error TS(?:2322|2345)/g) || []).length;
  if (result.status === 0 || diagnostics < 3)
    throw new Error(
      `Expected three real contract errors; exit=${result.status}\n${output}`,
    );
  console.log(
    JSON.stringify({
      check: "SFC Props/model/event negative contracts",
      status: "passed",
      compilerExit: result.status,
      diagnostics,
    }),
  );
} finally {
  unlinkSync(fixture);
}
