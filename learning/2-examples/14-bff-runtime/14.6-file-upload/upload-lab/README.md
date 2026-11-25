# 上传任务与限时能力实验

Node 26.0.0，无依赖。仓库根运行：

~~~sh
node --test learning/2-examples/14-bff-runtime/14.6-file-upload/upload-lab/upload.test.mjs
~~~

阅读顺序：digest → UploadStore → uploadMissing → LocalGrants → tests。11项测试覆盖异步并发、断点、幂等冲突、所有权、逐片/整体摘要、限额/取消、粗类型门槛、隔离状态和限时能力。测试文件构造的PNG头+文本是合成字节，不是真实可解码图片。

owner由可信服务端身份边界提供；这里alice/bob是测试输入，尚无HTTP会话。Map/Buffer仅作单进程小文件存储；上传限1MiB，生产大文件需流式I/O、持久化和跨实例一致性。uploadMissing等待全部在途工作结束后再报告错误，后续恢复先list确认，避免遗留写入与恢复重叠。

LocalGrants只演示HMAC保护的限时能力范围，不是AWS SigV4/OSS签名，没有云请求。它不声称一次性使用，真实对象覆盖/撤权/临时凭据过期/CORS需官方接入验证。scan只处理可信结果状态模型，没有病毒识别器或回调认证，不允许生产客户端自报clean。

已发现并修复：Node Buffer.from(hex)会忽略非法尾字符，原token+'x'可能解码同一签名；现先强制64位小写hex再做timingSafeEqual，已有失败回归。完整签名校验并不意味着模型可直接上线。

[分片观察](../14.6.1.item-14-6-1-demo.md) · [预签名观察](../14.6.2.url-demo.md) · [安全观察](../14.6.3.item-14-6-3-demo.md)
