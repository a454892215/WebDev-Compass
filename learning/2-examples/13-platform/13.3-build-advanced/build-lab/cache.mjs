import { createHash } from "node:crypto";
import {
  readFile,
  writeFile,
  mkdir,
  readdir,
  copyFile,
  rm,
} from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { build, version as viteVersion } from "vite";
import { buildInfoPlugin } from "./plugin.mjs";
export function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}
export function cacheKey(inputs, label) {
  return digest(
    JSON.stringify({
      inputs,
      label,
      node: process.version,
      vite: viteVersion,
      platform: process.platform,
      arch: process.arch,
    }),
  );
}
async function walk(dir, prefix = "") {
  const result = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const name = prefix + item.name;
    if (item.isDirectory())
      result.push(...(await walk(join(dir, item.name), name + "/")));
    else if (item.isFile()) result.push(name);
  }
  return result.sort();
}
export async function cachedBuild({
  root,
  cacheDir,
  outDir,
  label = "build-lab-v1",
}) {
  const names = [
    "app.ts",
    "style.css",
    "index.html",
    "plugin.mjs",
    "vite.config.mjs",
    "cache.mjs",
    "package.json",
    "pnpm-lock.yaml",
  ];
  const inputs = await Promise.all(
    names.map(async (name) => [name, digest(await readFile(join(root, name)))]),
  );
  const key = cacheKey(inputs, label),
    entry = join(cacheDir, key),
    manifestPath = join(entry, "manifest.json");
  const start = performance.now();
  try {
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    if (!Array.isArray(manifest.files) || !manifest.files.length)
      throw new Error("Invalid cache manifest");
    for (const file of manifest.files) {
      if (
        typeof file.name !== "string" ||
        file.name.startsWith("/") ||
        resolve(entry, "files", file.name) !==
          join(resolve(entry, "files"), file.name) ||
        file.name.split("/").includes("..")
      )
        throw new Error("Unsafe cache path");
      if (digest(await readFile(join(entry, "files", file.name))) !== file.hash)
        throw new Error("Cache corruption");
    }
    await rm(outDir, { recursive: true, force: true });
    for (const file of manifest.files) {
      const destination = join(outDir, file.name);
      await mkdir(join(destination, ".."), { recursive: true });
      await copyFile(join(entry, "files", file.name), destination);
    }
    return {
      key,
      hit: true,
      durationMs: performance.now() - start,
      files: manifest.files.length,
    };
  } catch {
    /* Missing, invalid or corrupt cache is a miss; source build stays authoritative. */
  }
  await build({
    root,
    configFile: false,
    logLevel: "silent",
    base: "./",
    plugins: [buildInfoPlugin(label)],
    build: { outDir, emptyOutDir: true, manifest: true },
  });
  const files = await Promise.all(
    (await walk(outDir)).map(async (name) => ({
      name,
      hash: digest(await readFile(join(outDir, name))),
    })),
  );
  await rm(entry, { recursive: true, force: true });
  for (const file of files) {
    const destination = join(entry, "files", file.name);
    await mkdir(join(destination, ".."), { recursive: true });
    await copyFile(join(outDir, file.name), destination);
  }
  await writeFile(manifestPath, JSON.stringify({ files }));
  return {
    key,
    hit: false,
    durationMs: performance.now() - start,
    files: files.length,
  };
}
