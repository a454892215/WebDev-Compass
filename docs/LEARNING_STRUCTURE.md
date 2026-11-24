# 四部分学习资料结构规范

所有阶段使用同一结构；框架主线为 Vue 3 + Nuxt，React 为选修。

```text
learning/
├── 1-notes/       # 理论知识／原理笔记
├── 2-examples/    # 代码与实践示例
├── 3-exercises/   # 独立练习与验收
└── 4-practice/    # 综合实践项目与任务
```

各部分内部使用相同阶段目录（如 `01-web-fundamentals/`），知识点沿用地图唯一编号。`framework-guide/` 保留在根目录，维护通用框架搭建、工程规范与交接；它不能替代知识点理论部分。

| 部分 | 必须包含 | 验收依据 |
| --- | --- | --- |
| 理论 | 机制、场景、代码、误区、移动开发对照与来源 | 对应知识地图编号；人工技术审查 |
| 示例 | 可观察机制的代码或标明类型的实际观察清单 | 运行步骤、预期现象与适用边界 |
| 独立练习 | 动手任务、验收标准、排错任务、参考要点 | 至少两项具体可核验标准，先独立实现再对照 |
| 综合实践 | 共享项目、逐知识点任务与稳定锚点 | 每项至少两项标准，保存自己的修改和证据 |

每个**已编写**知识点必须具备四部分。多个点可共享项目或示例，但综合任务必须具体对应编号，不要求每个点各造一个项目。阶段 0 可复用阶段 1 综合项目，并关联本阶段观察任务。未来未编写的 458 项保持规划，不用空文件充数。

## 脚本契约

`docs/stages/stage-N.json` 记录 `schemaVersion: 1`、阶段号 `stage`、可运行的 `project` 和 `points` 数组。每项包含 `id`、`theory`、`example`、`exercise`、`practice` 五个字段；四个路径分别落在四个目录内，`practice` 指向逐知识点稳定锚点。

```bash
python3 scripts/check_knowledge.py --report
python3 scripts/check_learning_delivery.py
python3 scripts/check_learning_delivery.py --stage 1
python3 -m unittest discover -s scripts/tests -v
```

检查器强制文件、编号、映射、锚点和练习/综合任务标准存在。来源正确性、代码行为、练习难度和学习者是否掌握不能靠存在性检查证明，必须另外审查和运行。新增正文必须同时维护契约；预留章节不算交付。

[返回学习入口](../learning/README.md) · [编写规范](./AUTHORING.md)

HTML 资源及导航另用 `python3 scripts/check_learning_resources.py` 检查；阶段质量验收遵循[总则](./AUTHORING.md)，通过逐点审查与验收门禁后单独记录。
