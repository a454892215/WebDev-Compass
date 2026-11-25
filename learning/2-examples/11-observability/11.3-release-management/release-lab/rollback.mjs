import {
  mkdtemp,
  mkdir,
  writeFile,
  rename,
  readFile,
  readdir,
  rm,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
export async function rollbackDrill() {
  const root = await mkdtemp(join(tmpdir(), "compass-release-"));
  try {
    await mkdir(join(root, "assets"));
    const releases = [];
    for (const name of ["stable", "candidate"]) {
      const content = "console.log(" + JSON.stringify(name) + ")";
      const file =
        createHash("sha256").update(content).digest("hex").slice(0, 16) + ".js";
      await writeFile(join(root, "assets", file), content);
      await writeFile(
        join(root, name + ".json"),
        JSON.stringify({ release: name, script: file }),
      );
      releases.push(file);
    }
    async function activate(name) {
      const manifest = await readFile(join(root, name + ".json"), "utf8");
      await writeFile(join(root, "current.next"), manifest);
      // Same-directory rename models an atomic manifest pointer swap on this filesystem.
      await rename(join(root, "current.next"), join(root, "current.json"));
      return JSON.parse(await readFile(join(root, "current.json"), "utf8"));
    }
    const initial = await activate("stable"),
      candidate = await activate("candidate");
    const restored = await activate("stable");
    const kept = await readdir(join(root, "assets"));
    return {
      initial: initial.release,
      candidate: candidate.release,
      restored: restored.release,
      oldAssetRetained: kept.includes(releases[0]),
      newAssetRetained: kept.includes(releases[1]),
      restoredAssetReadable: (
        await readFile(join(root, "assets", restored.script), "utf8")
      ).includes("stable"),
      cleanup: "temporary directory removed in finally",
    };
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}
if (import.meta.url === new URL(process.argv[1], "file:").href)
  console.log(JSON.stringify(await rollbackDrill(), null, 2));
