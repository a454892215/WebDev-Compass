export function bearerFromHeader(value) {
  if (typeof value !== 'string') throw new Error('missing Authorization')
  const match = /^Bearer ([A-Za-z0-9\-._~+/]+=*)$/i.exec(value)
  if (!match) throw new Error('malformed Authorization')
  return match[1]
}
// One coordinator belongs to one client session/application, not the Node process.
export function createRefreshCoordinator() {
  let epoch = 0
  let pending
  return {
    logout() {
      epoch += 1
      pending = undefined
    },
    refresh(loader) {
      if (pending) return pending
      const start = epoch
      const operation = Promise.resolve()
        .then(loader)
        .then((value) => {
          if (epoch !== start) throw new Error('session changed')
          return value
        })
      pending = operation
      operation
        .finally(() => {
          if (pending === operation) pending = undefined
        })
        .catch(() => {})
      return operation
    },
  }
}
export function mayReadDocument(user, document) {
  return user.role === 'admin' || (user.role === 'reader' && user.id === document.ownerId)
}
