import StyleDictionary from "style-dictionary";
export async function buildTokens(
  source = "tokens/source.json",
  destination = "dist/tokens/",
) {
  const sd = new StyleDictionary({
    source: [source],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: destination,
        files: [{ destination: "tokens.css", format: "css/variables" }],
      },
      js: {
        transformGroup: "js",
        buildPath: destination,
        files: [
          { destination: "tokens.js", format: "javascript/es6" },
          { destination: "tokens.d.ts", format: "typescript/es6-declarations" },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}
if (
  process.argv[1] &&
  import.meta.url === new URL(process.argv[1], "file:").href
)
  await buildTokens();
