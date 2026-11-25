module.exports = function transform(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)
  root
    .find(j.ImportDeclaration, { source: { value: '@demo/core' } })
    .forEach((importPath) => {
      if (importPath.node.importKind === 'type') return
      importPath.node.specifiers = (importPath.node.specifiers || []).map(
        (specifier) => {
          if (
            specifier.type !== 'ImportSpecifier' ||
            specifier.importKind === 'type' ||
            specifier.imported.name !== 'oldTitle'
          )
            return specifier
          const local = specifier.local?.name || 'oldTitle'
          // Replace the whole specifier, not its shared shorthand ranges.
          const replacement = j.importSpecifier(
            j.identifier('newTitle'),
            j.identifier(local)
          )
          replacement.comments = specifier.comments
          return replacement
        }
      )
    })
  return root.toSource({ quote: 'single' })
}
module.exports.parser = 'tsx'
