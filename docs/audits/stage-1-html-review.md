# 阶段 1 HTML 逐点质量复核

日期：2026-11-24。总则版本1，覆盖19点的理论、HTML/脚本、独立练习及综合任务。审查先读MWG HTML与Forms正文。未将文件存在视为语义正确。

## 发现并修正

- 11个HTML内部返回笔记href在learning迁移后多了一层learning，Markdown检查未发现；修正并由新增HTML资源检查覆盖。
- 前8篇理论缺独立来源核对日期；本轮补日期与验证范围说明。
- 自定义验证最小片段缺可见label；补关联标签。
- 列表练习暗示浏览器必然修复列表外li；改为比较实际DOM，明确不保证自动补ul。
- HTML脚本型练习存在先修跳跃；阶段/章节索引明确原生结构先学、DOM/类/事件后再完成图形与原生组件。
- 综合任务原先大量重复单点练习名称；19项全部改成资源目录项目中的具体扩展/审查任务，区分已有代码和学习者新增。

## 逐点依据

| 编号 | 理论与示例核对 | 练习及衔接核对 |
| --- | --- | --- |
| 1.1.1.1 | doctype、语言、编码与viewport职责区分准确；实验读取compatMode/characterSet。 | 独立文档与移除doctype实验可观察，保留缩放。 |
| 1.1.1.2 | 语义与布局分离，article内header不重复页面banner，跳转链接目标有效。 | 区域划分、去CSS和Tab跳转标准具体。 |
| 1.1.1.3 | 标题层级与strong/em含义明确，样式切换不改DOM标签。 | span替换标题的反例可通过可访问性树比较。 |
| 1.1.1.4 | ul/ol/dl分别表示集合、顺序、名称描述；读取直接子项计数。 | 修正li越界排错描述，不保证浏览器自动补列表。 |
| 1.1.1.5 | URL基地址、hash不发送与原生链接行为准确，解析输出使用textContent。 | 相对地址与Network排错明确；URL脚本实现安排在1.3后。 |
| 1.1.1.6 | picture构图、本地WAV与用户视频选择边界真实，不声称字幕全验收。 | 图片比例、alt和失败后内容可读标准明确。 |
| 1.1.1.7 | caption/scope及可命名局部滚动准确，二维数据不当布局。 | 表头丢失反例与窄屏不整页溢出可核对。 |
| 1.1.1.8 | defer/async/module与元数据职责区分，真实外部defer文件在解析后绑定。 | 移除defer复现过早DOM访问有具体步骤。 |
| 1.1.2.1 | id/name、重复键、未选checkbox与password安全边界准确，实际FormData保留entries。 | 独立表单数据集与Object.fromEntries丢键排错匹配。 |
| 1.1.2.2 | label/legend、textarea.value和辅助button类型明确。 | 辅助按钮与真正提交的行为可独立比较。 |
| 1.1.2.3 | readonly不参与原生约束验证且仍提交，disabled不参与数据集。 | readonly/disabled与inputmode非校验排错覆盖关键边界。 |
| 1.1.2.4 | GET/POST、multipart boundary与手工JSON分开；演示仅预览不发真实请求。 | 编码预览、File/重复键和submitter处理明确。 |
| 1.1.2.5 | 原生约束先于submit，跨字段自定义错误清除路径成立。 | 最小片段补可见label；练习覆盖错误恢复与永久customValidity故障。 |
| 1.1.3.1 | DPR缓冲区与CSS尺寸区分，缺2D时文字更新在返回前。 | 无绘图上下文的文字回退和排错可复现。 |
| 1.1.3.2 | viewBox、信息图名称/描述与第三方SVG信任边界明确。 | rect和desc不同步反例可核验。 |
| 1.1.3.3 | 惰性模板、克隆、Shadow DOM slot分配和非安全边界准确。 | 补先学DOM/类再实现的前置；两实例与slot后备可验证。 |
| 1.1.3.4 | showModal与open/show分开，浏览器焦点管理及progress/meter区分。 | Esc、焦点返回及非模态反例具体。 |
| 1.1.3.5 | dataset公开可改且字符串；委托检查Element/closest与范围。 | 字符串拼接故障、数字转换与权限边界明确。 |
| 1.1.3.6 | 静态JSON-LD与可见事实一致，不把本地运行/SSR当收录保证。 | headline错配排错与上线后验证分开。 |

## 运行证据及边界

交互代码未改；复用同日上一任务[HTML38项视口检查](../stages/webdev-stage1-html.json)与[综合项目记录](../stages/webdev-stage1-browser.json)，原浏览器Chrome158、宽1440/390。导航URL修复由本轮HTML离线检查复验。未重跑全量浏览器，不把历史结果表述为本轮重新运行；媒体真实视频/字幕、屏幕阅读器与SEO收录仍不在原生基础实验的验证承诺中。

19项逐点结论见[机器记录](./stage-1-html-points.json)。这些记录是AI技术/教学审阅与代码运行证据，不代表学习者实际完成19项练习。
