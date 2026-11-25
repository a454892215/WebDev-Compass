export function buildInfoPlugin(label = "build-lab-v1") {
  if (!/^[a-z0-9-]{1,24}$/.test(label))
    throw new Error("Public build label rejected");
  const id = "virtual:build-info",
    resolved = "\0" + id;
  return {
    name: "compass-build-info",
    resolveId(source) {
      if (source === id) return resolved;
    },
    load(source) {
      if (source === resolved)
        return "export const info = " + JSON.stringify({ label, schema: 1 });
    },
    generateBundle(_options, bundle) {
      this.emitFile({
        type: "asset",
        fileName: "build-audit.json",
        source: JSON.stringify({
          schema: 1,
          label,
          files: Object.keys(bundle).sort(),
        }),
      });
    },
  };
}
