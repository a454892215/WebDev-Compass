# 0.3.7 REST API 迷你示例

对应笔记：[0.3.7 RESTful API](../../../notes/00-environment/0.3-network-basics/0.3.7.restful-api.md)

零依赖 Node.js HTTP 服务，实现内存中的 `users` 资源 CRUD。

## 运行

```bash
cd examples/00-environment/0.3-network-basics/0.3.7.rest-api-demo
node server.js
```

浏览器打开提示的地址（默认 `http://127.0.0.1:3787`），或另开终端：

```bash
curl http://127.0.0.1:3787/api/users
curl -X POST http://127.0.0.1:3787/api/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ada","email":"ada@example.com"}'
```

## 接口约定

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/users` | 列表 |
| GET | `/api/users/:id` | 详情 |
| POST | `/api/users` | 创建 → `201` |
| PATCH | `/api/users/:id` | 部分更新 |
| DELETE | `/api/users/:id` | 删除 → `204` |

## 观察要点

1. DevTools Network：Method、Status、Request Payload、JSON 响应结构
2. 故意访问不存在的 id → `404` + 统一错误体
3. POST 缺字段 → `400`
4. 对比笔记中的 REST 约定表
