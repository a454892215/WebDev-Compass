# GraphQL / gRPC-Web 协议观察（选修）

类型：**本地请求/响应样本和官方协议观察清单**。没有安装GraphQL执行器、protoc、gRPC服务或Envoy，不称端到端运行通过。HTTP/JSON真实实验在[http-lab](../../5.1-http-client/http-lab/README.md)。

## GraphQL

1. 打开query.graphql，将$id与请求JSON的variables.id对照，说明operationName、query、variables各自作用。GraphQL不是把任意JS对象交给数据库。
2. 阅读response.json：HTTP传输成功不代表每个字段成功，data与errors可以同现。指出path指向哪一字段、该字段为什么为null，解释页面如何显示局部失败。
3. 按[GraphQL HTTP官方说明](https://graphql.org/learn/serving-over-http/)检查Content-Type/Accept、GET查询与POST操作、执行错误与请求错误的区别。不预设所有GraphQL失败都返回HTTP200，也不把REST的401/403规则机械抹掉。
4. 在有真实目标服务时再观察Network的状态、变量、字段权限和查询成本；本轮不携带凭据访问外网服务。

## gRPC-Web

1. 打开resources.proto，区分字段编号与字段名；记录为何不能把已有字段编号改作不同含义。
2. 按[gRPC-Web基础教程](https://grpc.io/docs/platforms/web/basics/)追踪proto→生成客户端→浏览器调用→代理→后端路径。浏览器fetch不直接暴露原生gRPC所需全部HTTP/2细节，不能把生成代码当后端实现。
3. 按[官方协议差异](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md)比较application/grpc-web+proto与grpc-web-text、消息帧和响应尾部状态。观察grpc-status/metadata时同时检查跨域响应头暴露与代理配置；HTTP200不自动等于RPC OK。
4. 查目标客户端版本支持的unary/streaming类型、取消与deadline，不把原生gRPC双向流能力全部套给浏览器。完整代理、TLS、认证和生成代码编译是后续专项，未由本样本证明。

核对日期：2026-11-25。样本不是真实服务响应，错误消息是无秘密fixture。
