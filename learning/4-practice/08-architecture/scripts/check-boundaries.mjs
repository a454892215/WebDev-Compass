import ts from 'typescript'
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { resolve, posix, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
export function importsOf(text, vue = false) {
  const snippets = vue
    ? [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((x) => x[1])
    : [text]
  const imports = []
  const errors = []
  for (const source of snippets) {
    const ast = ts.createSourceFile('source.ts', source, ts.ScriptTarget.Latest, true)
    function visit(node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier
      ) {
        if (ts.isStringLiteral(node.moduleSpecifier))
          imports.push(node.moduleSpecifier.text)
        else errors.push('nonliteral module')
      }
      if (
        ts.isCallExpression(node) &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(node.expression) && node.expression.text === 'require'))
      ) {
        const arg = node.arguments[0]
        if (arg && ts.isStringLiteral(arg)) imports.push(arg.text)
        else errors.push('nonliteral dynamic import/require requires explicit review')
      }
      ts.forEachChild(node, visit)
    }
    visit(ast)
  }
  return { imports, errors }
}
function core(path) {
  return (
    path.startsWith('shared/') ||
    path.includes('/domain/') ||
    path.includes('/application/')
  )
}
export function graphErrors(edges) {
  const errors = []
  for (const [from, to] of edges) {
    if (
      (from.startsWith('app/') || from.startsWith('shared/')) &&
      to.startsWith('server/')
    )
      errors.push(`${from}: browser/shared must not import server: ${to}`)
    if (from.startsWith('shared/') && !to.startsWith('shared/'))
      errors.push(`${from}: shared must remain independent: ${to}`)
    if (
      core(from) &&
      !to.startsWith('shared/') &&
      !to.includes('/domain/') &&
      !to.includes('/application/')
    )
      errors.push(`${from}: core depends on outer/framework: ${to}`)
    if (from.includes('/domain/') && to.includes('/application/'))
      errors.push(`${from}: domain must not depend on application: ${to}`)
  }
  const adjacency = new Map()
  for (const [a, b] of edges) {
    const rows = adjacency.get(a) || []
    rows.push(b)
    adjacency.set(a, rows)
  }
  const visited = new Set(),
    stack = new Set()
  function visit(node) {
    if (stack.has(node)) {
      errors.push(`cycle through ${node}`)
      return
    }
    if (visited.has(node)) return
    stack.add(node)
    for (const next of adjacency.get(node) || []) visit(next)
    stack.delete(node)
    visited.add(node)
  }
  for (const node of adjacency.keys()) visit(node)
  return [...new Set(errors)]
}
export function audit(root) {
  const edges = [],
    errors = []
  function files(dir) {
    if (!existsSync(dir)) return []
    return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory()
        ? files(resolve(dir, e.name))
        : /\.(ts|vue)$/.test(e.name)
          ? [resolve(dir, e.name)]
          : [],
    )
  }
  for (const file of ['app', 'server', 'shared'].flatMap((dir) =>
    files(resolve(root, dir)),
  )) {
    const from = relative(root, file).split('\\').join('/')
    const parsed = importsOf(readFileSync(file, 'utf8'), file.endsWith('.vue'))
    errors.push(...parsed.errors.map((e) => `${from}: ${e}`))
    for (const spec of parsed.imports) {
      let path
      if (spec.startsWith('~~/')) path = spec.slice(3)
      else if (spec.startsWith('~/')) path = 'app/' + spec.slice(2)
      else if (spec.startsWith('.'))
        path = posix.normalize(posix.join(posix.dirname(from), spec))
      else {
        if (core(from)) errors.push(`${from}: core external/framework dependency ${spec}`)
        continue
      }
      const target = [path, path + '.ts', path + '.vue', path + '/index.ts'].find(
        (p) => existsSync(resolve(root, p)) && statSync(resolve(root, p)).isFile(),
      )
      if (!target) errors.push(`${from}: unresolved local module ${spec}`)
      else edges.push([from, target])
    }
  }
  return { edges, errors: [...errors, ...graphErrors(edges)] }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = audit(process.cwd())
  for (const error of result.errors) console.error(error)
  console.log(
    `Architecture boundaries: ${result.edges.length} explicit local edges; ${result.errors.length} errors`,
  )
  if (result.errors.length) process.exitCode = 1
}
