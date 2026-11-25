import ts from 'typescript'
// Exact import migration. Keep the local binding so aliases and references remain valid.
export function migrate(source) {
  const file = ts.createSourceFile(
    'input.mjs',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  )
  if (file.parseDiagnostics.length) throw new Error('invalid-source')
  let changed = false
  const result = ts.transform(file, [
    (ctx) => (root) => {
      const visit = (node) => {
        if (
          ts.isImportDeclaration(node) &&
          ts.isStringLiteral(node.moduleSpecifier) &&
          node.moduleSpecifier.text === './legacy-money.mjs' &&
          node.importClause?.namedBindings &&
          ts.isNamedImports(node.importClause.namedBindings)
        ) {
          const bindings = node.importClause.namedBindings
          const elements = bindings.elements.map((spec) => {
            const imported = (spec.propertyName ?? spec.name).text
            if (imported !== 'formatPrice') return spec
            changed = true
            return ts.factory.updateImportSpecifier(
              spec,
              spec.isTypeOnly,
              ts.factory.createIdentifier('formatMoney'),
              spec.name,
            )
          })
          if (elements.some((x, i) => x !== bindings.elements[i])) {
            // Mixed imports need a separate declaration: don't accidentally move unrelated exports.
            if (
              elements.some(
                (_, i) =>
                  (bindings.elements[i].propertyName ?? bindings.elements[i].name)
                    .text !== 'formatPrice',
              )
            )
              throw new Error('mixed-import-needs-review')
            const clause = ts.factory.updateImportClause(
              node.importClause,
              node.importClause.isTypeOnly,
              node.importClause.name,
              ts.factory.updateNamedImports(bindings, elements),
            )
            if (node.importClause.name) throw new Error('default-import-needs-review')
            return ts.factory.updateImportDeclaration(
              node,
              node.modifiers,
              clause,
              ts.factory.createStringLiteral('./money.mjs'),
              node.attributes,
            )
          }
        }
        return ts.visitEachChild(node, visit, ctx)
      }
      return ts.visitNode(root, visit)
    },
  ])
  try {
    return changed ? ts.createPrinter().printFile(result.transformed[0]) : source
  } finally {
    result.dispose()
  }
}
