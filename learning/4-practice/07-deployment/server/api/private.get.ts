export default defineEventHandler((event) => {
  setResponseHeader(event, 'cache-control', 'private, no-store')
  const id = getCookie(event, 'stage7-demo')
  if (id !== 'alice' && id !== 'bob')
    throw createError({ statusCode: 401, statusMessage: 'Demo identity missing' })
  return {
    name: id === 'alice' ? 'Alice fixture' : 'Bob fixture',
    notice: '公开合成资料，无真实个人信息',
  }
})
