import { readdir, readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
export async function measureAssets(directory, limits) {
  if (
    !limits ||
    ![limits.raw, limits.gzip].every((v) => Number.isFinite(v) && v > 0)
  )
    throw new TypeError("Positive finite budget required");
  async function walk(dir) {
    return (
      await Promise.all(
        (await readdir(dir, { withFileTypes: true })).map(async (e) =>
          e.isDirectory() ? walk(resolve(dir, e.name)) : [resolve(dir, e.name)],
        ),
      )
    ).flat();
  }
  const files = (await walk(resolve(directory))).filter((f) =>
    [".js", ".css"].includes(extname(f)),
  );
  if (!files.length)
    throw new Error("No JS/CSS assets;empty report is not success");
  const rows = await Promise.all(
    files.map(async (file) => {
      const bytes = await readFile(file);
      return { file, raw: bytes.length, gzip: gzipSync(bytes).length };
    }),
  );
  rows.sort((a, b) => b.raw - a.raw);
  const total = rows.reduce(
    (a, r) => ({ raw: a.raw + r.raw, gzip: a.gzip + r.gzip }),
    { raw: 0, gzip: 0 },
  );
  return {
    rows,
    total,
    limits,
    passed: total.raw <= limits.raw && total.gzip <= limits.gzip,
    scope:
      "sum of every JS/CSS artifact, not initial-route transfer, Brotli or CPU/hydration cost",
  };
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const result = await measureAssets(process.argv[2], {
      raw: Number(process.argv[3]),
      gzip: Number(process.argv[4]),
    });
    console.log(JSON.stringify(result, null, 2));
    if (!result.passed) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
