import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
export async function bundleStats(folder) {
  const files = (await readdir(join(folder, "assets"))).filter((x) =>
    /\.(js|css)$/.test(x),
  );
  if (!files.length) throw new Error("No JS/CSS build artifacts");
  let raw = 0,
    gzip = 0;
  for (const name of files) {
    const bytes = await readFile(join(folder, "assets", name));
    raw += bytes.length;
    gzip += gzipSync(bytes).length;
  }
  return { files: files.length, raw, gzip };
}
export function checkBudget(stats, budget) {
  if (
    !Number.isFinite(budget.raw) ||
    !Number.isFinite(budget.gzip) ||
    budget.raw <= 0 ||
    budget.gzip <= 0
  )
    throw new Error("Invalid budget");
  if (stats.raw > budget.raw || stats.gzip > budget.gzip)
    throw new Error("Bundle budget exceeded");
}
export function delta(before, after) {
  return { raw: after.raw - before.raw, gzip: after.gzip - before.gzip };
}
