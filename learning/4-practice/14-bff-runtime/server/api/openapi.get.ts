import { dashboardSchema } from '../../shared/contracts'
export default defineEventHandler(() => ({
  openapi: '3.1.1',
  info: { title: 'Local fixture BFF dashboard', version: '1.0.0' },
  paths: {
    '/api/dashboard': {
      get: {
        summary: '合成用户聚合，只描述该接口',
        security: [{ session: [] }],
        parameters: [
          {
            name: 'mode',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['ok', 'optional-fail', 'timeout', 'invalid', 'denied'],
            },
          },
        ],
        responses: {
          '200': {
            description: '用户及可降级推荐',
            content: { 'application/json': { schema: dashboardSchema } },
          },
          '400': { description: '无效查询' },
          '401': { description: '无有效会话' },
          '429': { description: '本进程限流' },
          '502': { description: '上游失败或无效数据' },
          '504': { description: '上游超时' },
          '500': { description: '契约校验失败' },
        },
      },
    },
  },
  components: {
    securitySchemes: { session: { type: 'apiKey', in: 'cookie', name: 'demo_session' } },
  },
}))
