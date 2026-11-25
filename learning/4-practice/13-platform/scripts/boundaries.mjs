import { readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname, relative, isAbsolute } from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'
export function importProblems(text, file, coreRoot, allowed = []) {
  const source = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )
  const errors = []
  function check(spec) {
    if (spec.startsWith('.')) {
      const target = resolve(dirname(file), spec),
        rel = relative(coreRoot, target)
      if (rel === '..' || rel.startsWith('../') || isAbsolute(rel))
        errors.push('Cross-package relative import: ' + spec)
    } else if (!allowed.some((name) => spec === name || spec.startsWith(name + '/')))
      errors.push('Undeclared core dependency: ' + spec)
  }
  function walk(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    )
      check(node.moduleSpecifier.text)
    if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === 'require'))
    ) {
      if (node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0]))
        check(node.arguments[0].text)
      else errors.push('Core requires static module specifiers')
    }
    ts.forEachChild(node, walk)
  }
  walk(source)
  if (source.parseDiagnostics.length) errors.push('Core TypeScript syntax failed')
  return errors
}
export function checkBoundaries(root) {
  const core = resolve(root, 'packages/core'),
    src = resolve(core, 'src')
  const manifest = JSON.parse(readFileSync(resolve(core, 'package.json'), 'utf8'))
  const allowed = Object.keys(manifest.dependencies || {})
  const errors = []
  for (const name of readdirSync(src, { recursive: true }).filter((x) =>
    x.endsWith('.ts'),
  )) {
    const file = resolve(src, name)
    errors.push(
      ...importProblems(readFileSync(file, 'utf8'), file, core, allowed).map(
        (e) => name + ': ' + e,
      ),
    )
  }
  return errors
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const errors = checkBoundaries(resolve(process.argv[2] || '.'))
  console.log('Core boundary errors: ' + errors.length)
  for (const error of errors) console.error(error)
  process.exitCode = errors.length ? 1 : 0
}
