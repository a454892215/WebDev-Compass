const blocked = (source) =>
  typeof source === 'string' &&
  (/^@demo\/app(?:\/|$)/.test(source) ||
    /^(?:\.\.\/)+apps(?:\/|$)/.test(source))
export default {
  meta: {
    type: 'problem',
    schema: [],
    messages: {
      forbidden: 'Domain code must not import application entry "{{source}}".'
    }
  },
  create(context) {
    function check(node, source) {
      if (blocked(source))
        context.report({ node, messageId: 'forbidden', data: { source } })
    }
    return {
      ImportDeclaration(node) {
        check(node, node.source.value)
      },
      ExportNamedDeclaration(node) {
        if (node.source) check(node, node.source.value)
      },
      ExportAllDeclaration(node) {
        check(node, node.source.value)
      },
      ImportExpression(node) {
        if (node.source.type === 'Literal') check(node, node.source.value)
      }
    }
  }
}
