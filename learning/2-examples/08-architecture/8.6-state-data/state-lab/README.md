# 状态、并发与离线草稿实验

Node26、pnpm11.4，Chrome默认macOS路径（CHROME_PATH可覆盖）。本目录执行：

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm verify
pnpm serve
```

4515仅loopback；verify启动/关闭临时服务、Chrome与专有IndexedDB，结果存忽略的artifacts。serve为手动观察，结束Ctrl-C。合成alice/bob只是公开作用域选择，非认证，无真实用户或凭据。

logic.mjs先看scope key，再看epoch/revision/最新操作保护。4项Node测试通过受控结果验证旧失败不回滚新成功、旧scope不回写、新失败回到确认值；这不是实际多用户网络同时编辑性能测试。server /api/value另有真正expectedRevision校验，过期写409且值不变。

页面使用真实IndexedDB：等待事务complete才报告保存；草稿按scope分开，刷新恢复。队列按[scope,id]持久化，同一次页面中重复加入相同内容复用id；显式重试逐项发本地/api/sync，仅收到匹配ack才删除。服务端在本进程按scope+id去重，异内容复用id409。服务重启会失去去重记录，不能把内存表当生产持久幂等；跨设备/多标签一致性另需协议。浏览器IndexedDB也可能因配额、隐私模式、清理或驱逐而丢失，不称永久安全存储。

verify使用真实浏览器setOffline使HTTP失败，确认队列保留，恢复后显式重试。没有Service Worker/App Shell离线缓存，断网直接刷新页面可能无法打开；这里是“已打开页面的离线草稿与出站队列”，不是完整离线PWA。未注册Background Sync，不把navigator.onLine当服务健康。当前队列无后台自动同步/指数退避，生产需按业务设置上限、过期与用户取消。

“模拟刷新失败/成功”只给staleResult输入可控结果，数据保留与错误标示真实DOM可见，但不假称真实HTTP SWR。CRDT/Yjs/Automerge未安装；project只是有限事件数组的纯投影，不是完整CQRS/事件溯源系统。真实scope切换请求隔离在Nuxt主项目另验。
