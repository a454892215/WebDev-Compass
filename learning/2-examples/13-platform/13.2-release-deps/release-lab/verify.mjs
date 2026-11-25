import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  rm,
  realpath,
  readdir,
} from "node:fs/promises";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
const root = resolve("."),
  directory = await mkdtemp(join(tmpdir(), "stage13-release-"));
const store = join(root, ".pnpm-store"),
  cli = join(root, "node_modules/.bin/changeset");
function call(command, args, cwd = directory) {
  const r = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    timeout: 30000,
    env: { ...process.env, CI: "true" },
  });
  if (r.error)
    throw new Error(r.error.message + "\n" + r.stdout + "\n" + r.stderr);
  return r;
}
function pass(command, args, cwd = directory) {
  const r = call(command, args, cwd);
  assert.equal(r.status, 0, r.stdout + "\n" + r.stderr);
  return r.stdout;
}
async function json(path, value) {
  await writeFile(path, JSON.stringify(value, null, 2) + "\n");
}
const install = ["install", "--offline", "--ignore-scripts"];
try {
  await mkdir(join(directory, "packages/core"), { recursive: true });
  await mkdir(join(directory, "packages/widget"), { recursive: true });
  await mkdir(join(directory, "packages/host"), { recursive: true });
  await json(join(directory, "package.json"), {
    name: "release-fixture",
    private: true,
    packageManager: "pnpm@11.4.0",
  });
  await writeFile(
    join(directory, "pnpm-workspace.yaml"),
    "packages:\n  - packages/*\nstoreDir: " + JSON.stringify(store) + "\n",
  );
  await json(join(directory, "packages/core/package.json"), {
    name: "@release-fixture/core",
    version: "1.0.0",
    type: "module",
    files: ["index.js"],
    exports: "./index.js",
  });
  await writeFile(
    join(directory, "packages/core/index.js"),
    "export const schemaVersion=1;\n",
  );
  await json(join(directory, "packages/widget/package.json"), {
    name: "@release-fixture/widget",
    version: "1.0.0",
    type: "module",
    files: ["index.js"],
    exports: "./index.js",
    dependencies: { "@release-fixture/core": "workspace:^" },
  });
  await writeFile(
    join(directory, "packages/widget/index.js"),
    "import {schemaVersion} from '@release-fixture/core'; export function supportsCurrentSchema(){return schemaVersion>0;}\n",
  );
  await json(join(directory, "packages/host/package.json"), {
    name: "@release-fixture/host",
    private: true,
    dependencies: { "@release-fixture/widget": "workspace:*" },
  });
  pass("pnpm", install);
  pass("pnpm", [...install, "--frozen-lockfile"]);
  const baselineLock = await readFile(
    join(directory, "pnpm-lock.yaml"),
    "utf8",
  );
  const host = JSON.parse(
    await readFile(join(directory, "packages/host/package.json"), "utf8"),
  );
  host.dependencies["@release-fixture/widget"] = "workspace:^";
  await json(join(directory, "packages/host/package.json"), host);
  const stale = call("pnpm", [...install, "--frozen-lockfile"]);
  assert.notEqual(stale.status, 0);
  assert.match(
    stale.stdout + stale.stderr,
    /OUTDATED_LOCKFILE|outdated.*lockfile/i,
  );
  host.dependencies["@release-fixture/widget"] = "workspace:*";
  await json(join(directory, "packages/host/package.json"), host);
  pass("pnpm", [...install, "--frozen-lockfile"]);
  assert.equal(
    await readFile(join(directory, "pnpm-lock.yaml"), "utf8"),
    baselineLock,
  );
  const publicContract = () =>
    pass(process.execPath, [
      "--input-type=module",
      "-e",
      "import {supportsCurrentSchema} from './packages/widget/index.js';process.stdout.write(String(supportsCurrentSchema()));",
    ]).trim();
  assert.equal(publicContract(), "true");
  const cliRequire = createRequire(
    await realpath(join(root, "node_modules/@changesets/cli/package.json")),
  );
  const { defaultWrittenConfig } = await import(
    pathToFileURL(cliRequire.resolve("@changesets/config")).href
  );
  await mkdir(join(directory, ".changeset"));
  await json(join(directory, ".changeset/config.json"), {
    ...defaultWrittenConfig,
    commit: false,
    changelog: "@changesets/cli/changelog",
    baseBranch: "main",
  });
  await writeFile(
    join(directory, "packages/core/index.js"),
    "export const schemaVersion=2;\n",
  );
  await writeFile(
    join(directory, ".changeset/core-major.md"),
    '---\n"@release-fixture/core": major\n---\n\n教学fixture改变公开schema版本，需要消费者迁移。\n',
  );
  pass(cli, ["version"]);
  const core = JSON.parse(
    await readFile(join(directory, "packages/core/package.json"), "utf8"),
  );
  const widget = JSON.parse(
    await readFile(join(directory, "packages/widget/package.json"), "utf8"),
  );
  assert.equal(core.version, "2.0.0");
  assert.equal(widget.version, "1.0.1");
  assert.equal(publicContract(), "true");
  const change = await readFile(
    join(directory, "packages/widget/CHANGELOG.md"),
    "utf8",
  );
  assert.ok(change.includes("1.0.1") && change.includes("2.0.0"));
  const packed = join(directory, "packed");
  await mkdir(packed);
  pass(
    "pnpm",
    ["pack", "--pack-destination", packed],
    join(directory, "packages/widget"),
  );
  const archives = (await readdir(packed)).filter((x) => x.endsWith(".tgz"));
  assert.equal(archives.length, 1);
  const packedManifest = JSON.parse(
    pass("tar", ["-xOf", join(packed, archives[0]), "package/package.json"]),
  );
  assert.equal(packedManifest.dependencies["@release-fixture/core"], "^2.0.0");
  assert.equal(widget.dependencies["@release-fixture/core"], "workspace:^");
  // A controlled incompatible override demonstrates resolution, not upgrade safety.
  const catalogRoot = join(directory, "catalog-fixture");
  await mkdir(catalogRoot);
  await json(join(catalogRoot, "package.json"), {
    name: "catalog-override-fixture",
    private: true,
    packageManager: "pnpm@11.4.0",
    dependencies: { semver: "catalog:" },
  });
  const yaml =
    "packages:\n  - .\nstoreDir: " +
    JSON.stringify(store) +
    "\ncatalog:\n  semver: 6.3.2\n";
  await writeFile(join(catalogRoot, "pnpm-workspace.yaml"), yaml);
  pass("pnpm", [...install, "--no-frozen-lockfile"], catalogRoot);
  const resolveVersion = () =>
    pass(
      process.execPath,
      ["-e", "process.stdout.write(require('semver/package.json').version)"],
      catalogRoot,
    ).trim();
  assert.equal(resolveVersion(), "6.3.2");
  await json(join(catalogRoot, "package.json"), {
    name: "catalog-override-fixture",
    private: true,
    packageManager: "pnpm@11.4.0",
    dependencies: { semver: "6.3.2" },
  });
  await writeFile(
    join(catalogRoot, "pnpm-workspace.yaml"),
    yaml + "overrides:\n  semver: 7.8.6\n",
  );
  pass("pnpm", [...install, "--no-frozen-lockfile"], catalogRoot);
  assert.equal(resolveVersion(), "7.8.6");
  pass("pnpm", [...install, "--frozen-lockfile"], catalogRoot);
  console.log(
    JSON.stringify(
      {
        changesets: {
          core: "1.0.0 -> 2.0.0",
          dependentWidget: "1.0.0 -> 1.0.1",
          changelog: true,
          dependentPublicContractStable: true,
        },
        pack: { source: "workspace:^", archive: "^2.0.0" },
        lock: {
          frozen: true,
          staleManifestRejected: true,
          restoredLockUnchanged: true,
        },
        catalogOverride: {
          catalogResolved: "6.3.2",
          overrideResolved: "7.8.6",
          note: "catalog and ordinary dependency override isolated; deliberately incompatible major, no compatibility claim",
        },
        published: false,
        remoteBot: false,
        temporaryCleaned: true,
      },
      null,
      2,
    ),
  );
} finally {
  await rm(directory, { recursive: true, force: true });
}
