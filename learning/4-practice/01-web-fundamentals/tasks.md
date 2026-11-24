# 阶段 1 综合任务覆盖

[项目说明](./README.md) · [运行项目](./index.html)

以下是学习者需要独立完成的扩展、解释或排错任务。参考项目不强塞所有语言/工具特性；能说明不采用某种能力的理由也属于正确取舍。每项有独立验收，未勾选不表示没有提供资料。

<a id="p-1-1-1-1"></a>

## 1.1.1.1 综合任务

在项目副本核对文档模式、title与h1，将资源目录改成自己的课程目录，保留#filters和#results的可访问结构。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.1.1.doctype-html.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.1.1.doctype-html-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.1.1.doctype-html.md)

- [ ] document.compatMode 为 CSS1Compat，characterSet 为 UTF-8。
- [ ] 浏览器标签标题与页面 h1 各自表达用途，能说明它们为什么不是同一节点。
- [ ] 窄视口可读且没有 user-scalable=no 或 maximum-scale 限制。

<a id="p-1-1-1-2"></a>

## 1.1.1.2 综合任务

为综合目录新增“学习帮助”aside与可辨认nav，保持一个main，并用原有skip链接跨过导航进入主内容。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.1.2.header.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.1.2.header-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.1.2.header.md)

- [ ] 页面只有一个可见 main，多个 nav 的用途可区分。
- [ ] 按 Tab/Enter 可跳过重复导航进入主内容。
- [ ] 移除 CSS 后，内容顺序仍可理解。

<a id="p-1-1-1-3"></a>

## 1.1.1.3 综合任务

审查综合页h1、筛选h2和卡片h3层级；新增一段含strong/em的使用说明，改字号后仍保留层级。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.1.3.h1.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.1.3.h1-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.1.3.h1.md)

- [ ] 仅浏览标题即可判断内容层级。
- [ ] 调整 CSS 字号后，标题语义和文档顺序仍保持不变。
- [ ] 能给出 strong 与 em 的不同使用理由，而非都解释为加粗。

<a id="p-1-1-1-4"></a>

## 1.1.1.4 综合任务

保留#cards的ul/li集合；在静态资料旁新增ol学习步骤和dl术语，将顺序任务与资源集合分开。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.1.4.ul.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.1.4.ul-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.1.4.ul.md)

- [ ] 能够解释三种列表的选择依据。
- [ ] li 的父容器正确，dt 与 dd 的含义对应。
- [ ] 隐藏列表样式后，DOM 仍表达集合与顺序。

<a id="p-1-1-1-5"></a>

## 1.1.1.5 综合任务

为#static-catalog增加页内目录链接及一个有效同仓库详情入口，检查刷新、后退与复制链接，动作仍用button。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.1.5.a-href.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.1.5.a-href-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.1.5.a-href.md)

- [ ] 点击锚点后 URL 的 hash 正确，浏览器后退可恢复地址状态。
- [ ] 链接具备可理解的名称，带 href 的 a 与动作 button 用途明确。
- [ ] 能说明当前相对路径以哪个文档地址为基准。

<a id="p-1-1-1-6"></a>

## 1.1.1.6 综合任务

在项目副本新增课程封面figure/picture，使用已有本地SVG并保留相应尺寸与alt；阻断图片后课程说明仍可读。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.1.6.img.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.1.6.img-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.1.6.img.md)

- [ ] 图片加载前预留比例，窄视口不发生整页水平溢出。
- [ ] 禁用或阻断图片后仍能理解主要信息。
- [ ] 首屏关键图不误用 lazy，媒体不自动有声播放。

<a id="p-1-1-1-7"></a>

## 1.1.1.7 综合任务

为目录新增按主题统计数量的table，带caption和行列头；窄屏只允许统计表局部滚动，保留原卡片列表语义。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.1.7.table.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.1.7.table-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.1.7.table.md)

- [ ] caption 说明主题与单位，表头使用正确 scope。
- [ ] 页面整体不因表格过宽而横向溢出。
- [ ] 能按行头和列头解释一个数据单元格。

<a id="p-1-1-1-8"></a>

## 1.1.1.8 综合任务

审查综合目录title、viewport与module入口；在项目副本增加准确description，说明type=module与经典defer差异。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.1.8.meta.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.1.8.meta-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.1.8.meta.md)

- [ ] 脚本可以查询按钮并注册监听，没有依赖 DOM 过早访问。
- [ ] title、h1 和 meta description 的职责可分别解释。
- [ ] viewport 保留用户缩放，页面无远程字体或分析上报依赖。

<a id="p-1-1-2-1"></a>

## 1.1.2.1 综合任务

在#filters增加同name的多选演示控件，先记录FormData.getAll结果，再决定如何扩展只读API查询参数；不要把纯本地收藏开关冒充服务端字段。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.2.1.form.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.2.1.form-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.2.1.form.md)

- [ ] 每个可见输入有标签，协议字段有 name。
- [ ] 未选 checkbox 不出现，重复键可用 getAll 读取。
- [ ] 无效邮箱/越界数量被阻止，密码不显示在输出中。

<a id="p-1-1-2-2"></a>

## 1.1.2.2 综合任务

在项目副本为#filters增加“学习偏好”fieldset/legend及textarea备注；辅助预填按钮不得触发查询，请求提交仍由原按钮确认。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.2.2.textarea-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md)

- [ ] label 点击能够关联对应控件。
- [ ] 辅助按钮不会触发表单提交，提交按钮会执行验证。
- [ ] radio 组有可理解的组名，select option 的提交值与可见文案可区分。

<a id="p-1-1-2-3"></a>

## 1.1.2.3 综合任务

在项目副本为关键词添加有说明的pattern约束，并增加只读演示编号和禁用内部字段；记录FormData与原生验证的不同结果。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.2.3.required.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.2.3.required-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.2.3.required.md)

- [ ] 默认收集只读字段而不收集禁用字段。
- [ ] readonly 不参与原生约束验证，仍需服务端校验其可信性。
- [ ] disabled="false" 仍禁用的原因能够解释；移除属性或设属性为false后恢复。

<a id="p-1-1-2-4"></a>

## 1.1.2.4 综合任务

记录综合页GET筛选请求的URL；在副本设计一个不发送数据的投稿表单编码预览，比较multipart与JSON，禁止向只读API伪造写入。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.2.4.application-x-www-form-urlencoded.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.2.4.application-x-www-form-urlencoded-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.2.4.application-x-www-form-urlencoded.md)

- [ ] 不真的发送凭据或用户数据，预览说明清楚。
- [ ] 能说明原生 form 不提供 application/json enctype。
- [ ] 能解释重复键、File 和 submitter 在手工 FormData 中的处理。

<a id="p-1-1-2-5"></a>

## 1.1.2.5 综合任务

在目录副本新增两次输入练习邮箱的本地偏好表单，原生email校验后再比较一致性，错误修复后原有查询功能仍可用。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.2.5.item-1-1-2-5.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.2.5.item-1-1-2-5-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.2.5.item-1-1-2-5.md)

- [ ] 不一致时不进入成功状态，aria-invalid 与文字错误同步。
- [ ] 修改任一关联字段后，自定义错误不会永久阻塞提交。
- [ ] 成功后清除错误，不把每次输入都作为打断式公告。

<a id="p-1-1-3-1"></a>

## 1.1.3.1 综合任务

为目录增加按主题统计的Canvas概览和等价文本表；列表筛选后同步更新两者，模拟getContext返回null时文本仍更新。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.3.1.canvas.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.3.1.canvas-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.3.1.canvas.md)

- [ ] 图形与文字显示同一百分比。
- [ ] 缓冲区像素与CSS尺寸职责可解释，窄屏不整页溢出。
- [ ] 禁用2D上下文后仍能读取并更新文字数据。

<a id="p-1-1-3-2"></a>

## 1.1.3.2 综合任务

在目录副本用内联SVG显示已收藏比例，同时更新可见文本与desc；主题切换保持对比，图标装饰与信息图名称分开。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.3.2.svg.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.3.2.svg-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.3.2.svg.md)

- [ ] 改变容器宽度时图形仍保持合理比例。
- [ ] 图形、可见百分比与描述同步。
- [ ] 信息图有可访问名称，装饰图不重复制造无意义朗读。

<a id="p-1-1-3-3"></a>

## 1.1.3.3 综合任务

在独立分支把两张资源卡片改为原生Custom Element+template/slot，对比普通DOM版本；保留light DOM正文并记录是否值得在当前项目采用。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.3.3.template.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.3.3.template-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.3.3.template.md)

- [ ] 模板本身不直接显示，插入克隆后才出现。
- [ ] 命名/默认slot分配符合预期，缺失时显示后备内容。
- [ ] 实例不依赖重复的全局id，能解释Shadow DOM不是安全沙箱。

<a id="p-1-1-3-4"></a>

## 1.1.3.4 综合任务

为目录增加原生details帮助和清空本页收藏的确认dialog；取消或Esc不得清空，关闭后焦点返回触发按钮，并说明进度与收藏比例测量差异。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.3.4.details.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.3.4.details-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.3.4.details.md)

- [ ] 键盘可展开折叠，模态打开后背景不可操作。
- [ ] Esc或取消关闭后焦点回到触发按钮。
- [ ] progress、meter和可见数值同步，方法缺失时给明确回退。

<a id="p-1-1-3-5"></a>

## 1.1.3.5 综合任务

审查收藏按钮data-resource-id与委托逻辑，在副本加入公开data-click-count并显式转数值；DOM改ID不得被解释为后端授权。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.3.5.data.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.3.5.data-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.3.5.data.md)

- [ ] 三次点击得到3，而不是字符串拼接。
- [ ] dataset值类型仍为string，界面输出通过textContent。
- [ ] 能解释修改DOM不能获得真实权限，敏感数据不放data属性。

<a id="p-1-1-3-6"></a>

## 1.1.3.6 综合任务

为静态课程详情页添加与正文一致的title/description及JSON-LD，再从目录普通链接访问；记录源码可读性和上线后的抓取核对步骤，不声称本地已收录。

[原理](../../1-notes/01-web-fundamentals/1.1-html/1.1.3.6.seo.md) · [示例](../../2-examples/01-web-fundamentals/1.1-html/1.1.3.6.seo-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.1-html/1.1.3.6.seo.md)

- [ ] JSON-LD可以解析，作者/标题与可见正文一致。
- [ ] 不虚构评价或正式域名，不把SSR等同于排名保证。
- [ ] 明确本地运行不能证明收录或富媒体资格。

<a id="p-1-2-1-1"></a>

## 1.2.1.1 综合任务

先在项目副本的 header 添加临时 style="color:tomato" 并观察，再移除内联声明，用 styles.css 的类规则连接 --accent，保持 #theme 两种主题行为。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.1.1.style.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.1.1.style-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.1.1.style.md)

- [ ] 移除内联声明后计算颜色仍来自 --accent。
- [ ] 说明外部表和内嵌style处于同一作者来源，不能只按引入位置判断优先级。

<a id="p-1-2-1-2"></a>

## 1.2.1.2 综合任务

为 .cards > li 中的收藏按钮定义正常、disabled 与 :focus-visible 状态；用属性/伪类避免误匹配正文链接。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.1.2.hover.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.1.2.hover-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.1.2.hover.md)

- [ ] 点击收藏后文案仍由业务逻辑决定，CSS只表现状态。
- [ ] Tab可见焦点；装饰伪元素不承担唯一按钮名称。

<a id="p-1-2-1-3"></a>

## 1.2.1.3 综合任务

给 .hint 制造一条更具体的冲突规则，再在不新增ID或!important的条件下消除对 #status 的意外覆盖。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.1.3.specificity.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.1.3.specificity-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.1.3.specificity.md)

- [ ] 写出两条选择器的三组特异性。
- [ ] 用DevTools找获胜声明，证明修复没有影响其他 .hint。

<a id="p-1-2-1-4"></a>

## 1.2.1.4 综合任务

让 .cards 的说明文字通过继承获得 --text，比较局部 color:inherit 与 initial 的计算结果。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.1.4.inherit.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.1.4.inherit-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.1.4.inherit.md)

- [ ] 深浅主题文字都可读。
- [ ] 解释初始值不等于父元素颜色，不能用all:unset破坏按钮。

<a id="p-1-2-1-5"></a>

## 1.2.1.5 综合任务

为 #theme 增加一个 --muted-text 语义token，并仅用于 .hint 和卡片说明。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.1.5.name.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.1.5.name-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.1.5.name.md)

- [ ] 切换主题时说明文字更新而非写死色值。
- [ ] 局部token覆盖不会改变按钮和链接的 --accent。

<a id="p-1-2-1-6"></a>

## 1.2.1.6 综合任务

把综合页主题、组件与工具样式按明确 @layer 顺序组织，单独制作一次!important层序反转对照后移除冲突。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.1.6.cascade-layers.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.1.6.cascade-layers-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.1.6.cascade-layers.md)

- [ ] 普通层与important层序分别能解释。
- [ ] 最终页不依赖全局!important争抢状态。

<a id="p-1-2-2-1"></a>

## 1.2.2.1 综合任务

检查 #q、select 和 .cards > li 的border-box计量，增加内边距仍保持窄屏不溢出。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.2.1.item-1-2-2-1.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.2.1.item-1-2-2-1-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.2.1.item-1-2-2-1.md)

- [ ] 390px下页面没有整页横向滚动。
- [ ] 能根据width/padding/border预测目标外边框宽度。

<a id="p-1-2-2-2"></a>

## 1.2.2.2 综合任务

用 .actions 对照block与flex布局，并临时以display:none隐藏重试按钮观察布局和焦点变化。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.2.2.item-1-2-2-2.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.2.2.item-1-2-2-2-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.2.2.item-1-2-2-2.md)

- [ ] 恢复后查询/取消/重试都可达。
- [ ] 解释none与opacity:0在布局与交互上的差别。

<a id="p-1-2-2-3"></a>

## 1.2.2.3 综合任务

将查询区标题做为局部滚动容器中的sticky元素，明确inset及滚动祖先，再评估是否保留。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.2.3.item-1-2-2-3.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.2.3.item-1-2-2-3-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.2.3.item-1-2-2-3.md)

- [ ] 记录包含块/滚动祖先和sticky阈值。
- [ ] 页面内容不被覆盖；键盘聚焦输入框时仍可见。

<a id="p-1-2-2-4"></a>

## 1.2.2.4 综合任务

调整 .actions 的flex-wrap、gap和对齐，使长按钮名称与只看收藏选项在窄屏自然换行。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.2.4.flexbox.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.2.4.flexbox-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.2.4.flexbox.md)

- [ ] 不使用order改变键盘顺序。
- [ ] 390px和中间宽度均完整显示操作。

<a id="p-1-2-2-5"></a>

## 1.2.2.5 综合任务

调整 .cards 的Grid轨道，从两列目标改为auto-fit与可收缩minmax，比较内容驱动的列数。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.2.5.grid.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.2.5.grid-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.2.5.grid.md)

- [ ] 长标题不撑破轨道。
- [ ] 宽窄视口均按DOM顺序阅读与聚焦。

<a id="p-1-2-2-6"></a>

## 1.2.2.6 综合任务

在综合页静态资料说明中做一张可选文字环绕插图对照，用flow-root包含浮动；不将主布局改成float。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.2.6.item-1-2-2-6.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.2.6.item-1-2-2-6-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.2.6.item-1-2-2-6.md)

- [ ] 浮动子元素不越过父容器边界。
- [ ] 说明这种用途与 .cards 的Grid职责不同。

<a id="p-1-2-2-7"></a>

## 1.2.2.7 综合任务

为 #static-catalog 的长说明做双列正文实验，窄屏恢复单列，比较是否比列表更易读。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.2.7.item-1-2-2-7.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.2.7.item-1-2-2-7-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.2.7.item-1-2-2-7.md)

- [ ] 列宽与源阅读顺序可解释。
- [ ] 表单 .fields 不使用多列排版制造焦点跳跃。

<a id="p-1-2-2-8"></a>

## 1.2.2.8 综合任务

比较综合页section内首段margin的正常流行为与flow-root边界；移除不必要固定高度。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.2.8.normal-flow-formatting-context.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.2.8.normal-flow-formatting-context-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.2.8.normal-flow-formatting-context.md)

- [ ] 解释实际发生/未发生折叠的条件。
- [ ] 卡片内容增多时父容器随内容增长。

<a id="p-1-2-2-9"></a>

## 1.2.2.9 综合任务

为 .cards > li 增加一个定位标签并建立冲突上下文，定位z-index很大仍被遮挡的原因。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.2.9.stacking-context.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.2.9.stacking-context-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.2.9.stacking-context.md)

- [ ] 找出真正创建上下文的祖先。
- [ ] 修复时不影响正文焦点轮廓，也不以任意巨大数字遮盖全页。

<a id="p-1-2-2-10"></a>

## 1.2.2.10 综合任务

给接口fixture增加超长无空格标题，验证 .fields > div 与 .cards > li 的min-inline-size和换行策略。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.2.10.intrinsic-sizing.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.2.10.intrinsic-sizing-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.2.10.intrinsic-sizing.md)

- [ ] 内容完整可获得，不靠全页overflow:hidden。
- [ ] 记录自动最小尺寸与minmax轨道的不同职责。

<a id="p-1-2-3-1"></a>

## 1.2.3.1 综合任务

为 --accent 和 --focus 写出等值HEX/RGB/HSL表达，并分别检查深浅主题文字/背景对比。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.3.1.hex-rgb-rgba-hsl-hsla.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.3.1.hex-rgb-rgba-hsl-hsla-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.3.1.hex-rgb-rgba-hsl-hsla.md)

- [ ] 颜色换语法不改变语义状态。
- [ ] 错误/收藏不只依赖红绿差异，仍有文字反馈。

<a id="p-1-2-3-2"></a>

## 1.2.3.2 综合任务

调整综合页h1/h2/h3和正文的字号、无单位行高与最大阅读宽度，用长标题复验。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.3.2.font-family.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.3.2.font-family-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.3.2.font-family.md)

- [ ] 缩放与长文案时不固定高度裁字。
- [ ] 解释字号和行高的继承参照。

<a id="p-1-2-3-3"></a>

## 1.2.3.3 综合任务

为综合页设计一套系统字体回退方案；如选用自有WOFF2，再在独立资源实验验证font-display和失败回退。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.3.3.font-face.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.3.3.font-face-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.3.3.font-face.md)

- [ ] 不为演示下载未授权字体。
- [ ] 区分声明了font-family与真正下载/使用成功；没有字体资产时如实记录。

<a id="p-1-2-3-4"></a>

## 1.2.3.4 综合任务

比较 .cards h3 的自然换行与单行省略，为资源长名称提供可访问的完整内容路径。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.3.4.text-align.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.3.4.text-align-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.3.4.text-align.md)

- [ ] 完整名称未从DOM或数据中删除。
- [ ] 触控用户不依赖hover title才能读全。

<a id="p-1-2-3-5"></a>

## 1.2.3.5 综合任务

为综合页header添加可选装饰背景，比较contain/cover；页面标题和用途保留真实文字。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.3.5.background-color.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.3.5.background-color-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.3.5.background-color.md)

- [ ] 关闭背景图片仍理解页面。
- [ ] 裁切不丢失业务信息，也不把关键说明只写进背景。

<a id="p-1-2-3-6"></a>

## 1.2.3.6 综合任务

统一section、.cards > li和按钮的边框/圆角，验证阴影不参与间距并检查焦点轮廓。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.3.6.border.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.3.6.border-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.3.6.border.md)

- [ ] 盒尺寸与邻居间距不因阴影误判。
- [ ] 不为圆角把可聚焦内容的outline裁掉。

<a id="p-1-2-3-7"></a>

## 1.2.3.7 综合任务

给综合页增加一块可选长接口示例代码，让它局部滚动而非引起整页溢出。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.3.7.overflow.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.3.7.overflow-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.3.7.overflow.md)

- [ ] 滚动区有名称与Tab入口。
- [ ] 长代码可达，正文不因全局overflow:hidden被裁。

<a id="p-1-2-4-1"></a>

## 1.2.4.1 综合任务

连续改变 .fields 和 .cards 的可用宽度，基于标题/输入框失效位置选择断点而非设备型号。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.4.1.item-1-2-4-1.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.4.1.item-1-2-4-1-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.4.1.item-1-2-4-1.md)

- [ ] 至少记录一处中间宽度结果。
- [ ] 鼠标/触控能力不只按视口宽度推断。

<a id="p-1-2-4-2"></a>

## 1.2.4.2 综合任务

核对综合页viewport元信息，使用浏览器缩放和设备模拟观察 #q 与卡片尺寸，保留用户缩放。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.4.2.viewport.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.4.2.viewport-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.4.2.viewport.md)

- [ ] 未设置user-scalable=no或maximum-scale=1。
- [ ] 区分CSS像素、DPR和可见视口，不声称模拟即真机。

<a id="p-1-2-4-3"></a>

## 1.2.4.3 综合任务

用rem统一section内间距，以em定义按钮内部间距，修改根字号观察两者变化。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.4.3.rem.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.4.3.rem-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.4.3.rem.md)

- [ ] 说明每个单位相对谁。
- [ ] 文字放大后按钮不裁字，不能只把rem按固定16px换算。

<a id="p-1-2-4-4"></a>

## 1.2.4.4 综合任务

在 .cards > li 中加入一张本地可选信息图，提供alt、尺寸和窄/宽构图候选。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.4.4.max-width-100.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.4.4.max-width-100-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.4.4.max-width-100.md)

- [ ] currentSrc和显示尺寸分别验证。
- [ ] 关图仍有含义，cover不得裁关键图表内容。

<a id="p-1-2-4-5"></a>

## 1.2.4.5 综合任务

让一个资源卡片根据自身容器而不是整页宽度改变封面/正文排列，对照窄侧栏与宽列表。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.4.5.item-1-2-4-5.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.4.5.item-1-2-4-5-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.4.5.item-1-2-4-5.md)

- [ ] 祖先声明inline-size容器而非错误地查询自身。
- [ ] 基础布局可用，不支持查询时有合理回退。

<a id="p-1-2-4-6"></a>

## 1.2.4.6 综合任务

将 .fields/.actions/.cards 分别映射到熟悉的Row/Wrap/Grid思维，再写出CSS不等价之处。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.4.6.css-flex-grid-flutter-row.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.4.6.css-flex-grid-flutter-row-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.4.6.css-flex-grid-flutter-row.md)

- [ ] 实际解释一个min-inline-size或正常流差异。
- [ ] 不改DOM源顺序来追求视觉排列。

<a id="p-1-2-4-7"></a>

## 1.2.4.7 综合任务

在综合页 #q 获取焦点时检查内容和操作区可达，若增加固定底栏则处理safe-area与动态视口。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.4.7.mobile-viewport-safe-area.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.4.7.mobile-viewport-safe-area-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.4.7.mobile-viewport-safe-area.md)

- [ ] 记录是否真正做过目标手机键盘测试。
- [ ] 模拟视口中的0安全区不能作为删除安全区代码的依据。

<a id="p-1-2-5-1"></a>

## 1.2.5.1 综合任务

为综合页 #theme 的视觉状态切换增加短而明确的颜色过渡，避免transition:all。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.5.1.transition.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.5.1.transition-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.5.1.transition.md)

- [ ] 只列出实际需要过渡的属性。
- [ ] reduce-motion下状态即时可理解。

<a id="p-1-2-5-2"></a>

## 1.2.5.2 综合任务

为 #status 增加一次性、可关闭的请求结果淡入，加载/错误文字本身不依赖动画。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.5.2.keyframes.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.5.2.keyframes-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.5.2.keyframes.md)

- [ ] 没有无限闪烁且不把动画结束当接口完成。
- [ ] 取消或失败状态有真实文本，偏好reduce时保留结果。

<a id="p-1-2-5-3"></a>

## 1.2.5.3 综合任务

给一张 .cards > li 添加可选轻微transform对照，检查其视觉变化不重新占据正常流位置。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.5.3.transform.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.5.3.transform-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.5.3.transform.md)

- [ ] 变换不遮挡相邻按钮或焦点。
- [ ] 能解释transform创建上下文的副作用。

<a id="p-1-2-5-4"></a>

## 1.2.5.4 综合任务

核对 #cancel 的disabled状态与cursor显示，证明pointer-events:none不能代替禁用。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.5.4.cursor.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.5.4.cursor-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.5.4.cursor.md)

- [ ] 键盘、鼠标对同一按钮状态一致。
- [ ] 正文与错误说明保持可选择复制。

<a id="p-1-2-5-5"></a>

## 1.2.5.5 综合任务

录制综合页一个卡片状态变化的Performance对照，比较布局属性变化与transform/opacity实现。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.5.5.transform.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.5.5.transform-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.5.5.transform.md)

- [ ] 只报告实际录制结果，不虚构FPS。
- [ ] 移除没有证据支持的永久will-change。

<a id="p-1-2-5-6"></a>

## 1.2.5.6 综合任务

在综合页模拟prefers-reduced-motion并用Tab操作 #theme/#q/查询按钮，检查状态与焦点。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.5.6.motion-input-preferences.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.5.6.motion-input-preferences-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.5.6.motion-input-preferences.md)

- [ ] 减少动效后结果、错误与收藏仍明确。
- [ ] 不把hover作为触控用户获得信息的唯一方式。

<a id="p-1-2-6-1"></a>

## 1.2.6.1 综合任务

给 .cards 组件列出block/element/modifier命名映射，评估是否需要BEM，不强制重写整个项目。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.6.1.bem.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.6.1.bem-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.6.1.bem.md)

- [ ] 证明类名约定不会建立浏览器隔离。
- [ ] 状态来源仍只有一份，不用多套class/data重复存业务状态。

<a id="p-1-2-6-2"></a>

## 1.2.6.2 综合任务

工具链部分使用[真实构建项目](./toolchain/README.md)，不要把静态编译结果的切换当作编译器验证。

把一张综合资源卡片抽到独立Vite CSS Modules练习，验证classes映射；综合页可先保留原生CSS。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.6.2.css-modules.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.6.2.css-modules-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.6.2.css-modules.md)

- [ ] 记录真正构建后的类名与组件引用。
- [ ] 静态fixture只解释结果，未构建不能标工具链通过。

<a id="p-1-2-6-3"></a>

## 1.2.6.3 综合任务

工具链部分使用[真实构建项目](./toolchain/README.md)，不要把静态编译结果的切换当作编译器验证。

在独立临时工具链把卡片token与mixin写成SCSS并编译，再比较是否有必要给综合页引入Sass。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.6.3.sass-scss.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.6.3.sass-scss-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.6.3.sass-scss.md)

- [ ] 保留源码、编译器版本、产物和退出码。
- [ ] 不把SCSS直接link给浏览器，不将构建变量当运行期主题token。

<a id="p-1-2-6-4"></a>

## 1.2.6.4 综合任务

工具链部分使用[真实构建项目](./toolchain/README.md)，不要把静态编译结果的切换当作编译器验证。

把综合页一组按钮样式分别用语义类和小型自有工具类实现，说明取舍；真正Tailwind构建另行验证。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.6.4.css-tailwind-css.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.6.4.css-tailwind-css-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.6.4.css-tailwind-css.md)

- [ ] 自有lesson-*工具类不冒充Tailwind完整输出。
- [ ] 模板中完整类候选可被所选工具检测，动态拼接风险有说明。

<a id="p-1-2-6-5"></a>

## 1.2.6.5 综合任务

把综合页section与卡片间距整理为逻辑属性，用dir=rtl和长文案检查；默认样式用:where降低权重。

[原理](../../1-notes/01-web-fundamentals/1.2-css/1.2.6.5.is.md) · [示例](../../2-examples/01-web-fundamentals/1.2-css/1.2.6.5.is-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.2-css/1.2.6.5.is.md)

- [ ] 只翻转应随书写方向变化的边，不机械替换所有物理方向。
- [ ] 解释:is与:where的特异性差异及clamp参照。

<a id="p-1-3-1-1"></a>

## 1.3.1.1 综合任务

为综合项目区分固定绑定const与可变状态let，分别解释favoriteIds这个Set和resources数组的更新方式。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.1.var.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.1.var-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.1.var.md)

- [ ] 列出至少两个固定绑定和两个变化状态。
- [ ] 说明const不冻结资源对象或收藏Set。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-2"></a>

## 1.3.1.2 综合任务

核对API项目id、数量、收藏状态的运行期类型，区分引用共享与值复制。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.2.string-number-boolean-null-undefined.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.2.string-number-boolean-null-undefined-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.2.string-number-boolean-null-undefined.md)

- [ ] 记录当前API字符串id、字符串搜索词与布尔收藏状态的实际类型，再加入数字id变体验证协议。
- [ ] 指出一次共享对象修改可能影响原列表的位置。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-3"></a>

## 1.3.1.3 综合任务

为综合项目接口解码器增加数组、null、普通对象与字段类型检查。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.3.typeof.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.3.typeof-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.3.typeof.md)

- [ ] null或对象代替列表时给明确错误。
- [ ] 不能只靠instanceof业务类验证JSON。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-4"></a>

## 1.3.1.4 综合任务

在项目副本新增可选页码/数量参数，再校验文本，区分空串、0和无效数字；参考项目尚无分页功能。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.4.number.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.4.number-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.4.number.md)

- [ ] 空页码有明确默认策略，abc被拒绝。
- [ ] 不因字符串加法把2+1变成21。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-5"></a>

## 1.3.1.5 综合任务

在项目副本新增分页配置和可选描述，再设计默认值策略，保留业务认可的0/false；不要假定已有分页。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.5.item-1-3-1-5.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.5.item-1-3-1-5-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.5.item-1-3-1-5.md)

- [ ] 对0、null、undefined分别说明处理结果。
- [ ] 默认值不会掩盖协议错误。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-6"></a>

## 1.3.1.6 综合任务

把综合项目loading/empty/error/success转换为互斥界面状态。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.6.if-else.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.6.if-else-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.6.if-else.md)

- [ ] 每个状态有清楚反馈且不会同时显示冲突面板。
- [ ] 未知状态有安全的降级分支。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-7"></a>

## 1.3.1.7 综合任务

为综合项目列表处理选择合适遍历方式，并解释为何不for...in数组值。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.7.for.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.7.for-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.7.for.md)

- [ ] 索引和值不混用。
- [ ] 如有异步批量操作，明确串行或并发选择。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-8"></a>

## 1.3.1.8 综合任务

抽出综合项目筛选函数，明确参数、返回值及是否依赖this。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.8.this.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.8.this-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.8.this.md)

- [ ] 纯筛选可脱离组件调用并测试。
- [ ] 对象方法传作回调不会因接收者丢失而报错。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-9"></a>

## 1.3.1.9 综合任务

将综合项目临时变量限制在函数或模块中，避免无关全局共享。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.9.item-1-3-1-9.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.9.item-1-3-1-9-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.9.item-1-3-1-9.md)

- [ ] 能指出一个局部遮蔽与一个模块边界。
- [ ] 不依赖window自动产生的元素ID变量。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-10"></a>

## 1.3.1.10 综合任务

用工厂闭包为两个独立列表建立独立筛选/计数环境。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.10.closure.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.10.closure-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.10.closure.md)

- [ ] 两个实例状态互不影响。
- [ ] 说明闭包引用DOM和订阅时的清理责任。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-11"></a>

## 1.3.1.11 综合任务

用filter/find/some/reduce实现综合项目筛选、详情查找和统计。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.11.map-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)

- [ ] 空列表统计有初始值。
- [ ] 不为获得新数组而意外修改领域对象。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-12"></a>

## 1.3.1.12 综合任务

在项目副本引入含嵌套字段的筛选配置并执行更新，验证浅展开不会自动隔离嵌套对象。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.12.....md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.12....-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.12.....md)

- [ ] 更新前后的对象共享关系可解释。
- [ ] 不把任意外部键无约束合并到配置。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-13"></a>

## 1.3.1.13 综合任务

处理综合项目搜索词和长文本展示，区分正规化、截断与安全输出。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.13.slice.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.13.slice-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.13.slice.md)

- [ ] 中文和emoji搜索不因简单索引切割而损坏。
- [ ] 所有搜索输入经textContent展示。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-1-14"></a>

## 1.3.1.14 综合任务

审查综合项目从移动端经验迁移时的三个JS/Web差异。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.14.js-dart-kotlin-swift-vs.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.14.js-dart-kotlin-swift-vs-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.1.14.js-dart-kotlin-swift-vs.md)

- [ ] 举出动态类型、对象共享及页面生命周期的具体代码位置。
- [ ] 说明未来TS也不替代运行期解码。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-2-1"></a>

## 1.3.2.1 综合任务

比较综合项目状态用class还是模块/组合函数组织的成本，给出小型重构方案。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.1.class.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.1.class-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.2.1.class.md)

- [ ] 解释实例状态、静态工具与私有字段的归属。
- [ ] 不为使用class而重写已经清楚的纯函数。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-2-2"></a>

## 1.3.2.2 综合任务

把综合项目数据请求与UI渲染拆为真实ESM模块。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.2.import.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.2.import-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.2.2.import.md)

- [ ] 导出契约清楚且没有跨模块改只读导入绑定。
- [ ] 通过HTTP观察正确的模块URL与加载行为。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-2-3"></a>

## 1.3.2.3 综合任务

在练习分支把一次load流程改写为Promise链，返回调用方可检查的结果，并安排catch提示和finally恢复；参考实现使用async/await。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.3.then.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.3.then-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.2.3.then.md)

- [ ] 错误可被调用方观察。
- [ ] 请求结束后loading恢复且无未处理拒绝。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-2-4"></a>

## 1.3.2.4 综合任务

在项目副本新增第二个本地只读数据源，再并发读取两个独立数据源，决定失败时整页失败还是部分显示。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.4.async.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.4.async-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.2.4.async.md)

- [ ] 解释并发任务启动和等待顺序。
- [ ] 不声称Promise.all会自动取消其余请求。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-2-5"></a>

## 1.3.2.5 综合任务

评估目录若增加分页是否需要生成器，给出适用性分析和小序列实现；当前参考项目没有分页。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.5.item-1-3-2-5.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.5.item-1-3-2-5-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.2.5.item-1-3-2-5.md)

- [ ] 明确生成器是按需取值，不是后台线程。
- [ ] 允许结论为无需生成器，并有理由。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-2-6"></a>

## 1.3.2.6 综合任务

为综合项目收藏去重选择Set，为按id查找选择Map，评估WeakMap是否需要。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.6.map.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.6.map-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.2.6.map.md)

- [ ] 对象身份、字符串id和序列化策略明确。
- [ ] 不写依赖GC时机的验收。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-2-7"></a>

## 1.3.2.7 综合任务

检查综合项目默认设置中的||、??与逻辑赋值，保护合法空值策略。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.7.item-1-3-2-7.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.7.item-1-3-2-7-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.2.7.item-1-3-2-7.md)

- [ ] 0、false、空串分别按业务规则处理。
- [ ] 可选链不被当作数据校验。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-2-8"></a>

## 1.3.2.8 综合任务

评估综合项目初始化是否适合顶层await，对关键路径和失败回退做说明。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.8.await.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.8.await-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.2.8.await.md)

- [ ] 能演示真实依赖模块等待。
- [ ] 不为每个请求强行引入顶层await。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-3-1"></a>

## 1.3.3.1 综合任务

用DevTools审查综合项目列表中的Element/Text与实际渲染结构。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.1.dom-document-element-node-text.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.1.dom-document-element-node-text-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.3.1.dom-document-element-node-text.md)

- [ ] 能解释children与childNodes差异。
- [ ] 没有用firstChild盲目假定标签节点。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-3-2"></a>

## 1.3.3.2 综合任务

限制综合项目选择器到当前区域，并检查缺失节点和动态节点集合。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.2.getelementbyid.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.2.getelementbyid-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.3.2.getelementbyid.md)

- [ ] 查询不到时有清楚诊断。
- [ ] 动态追加后静态集合的行为可解释。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-3-3"></a>

## 1.3.3.3 综合任务

为综合项目新增一条列表项，完成安全创建、插入与移除。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.3.createelement.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.3.createelement-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.3.3.createelement.md)

- [ ] 输入不经innerHTML执行。
- [ ] 能解释append现有节点是移动而非复制。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-3-4"></a>

## 1.3.3.4 综合任务

同步综合项目收藏按钮的class、aria-pressed与数据属性。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.4.setattribute.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.4.setattribute-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.3.4.setattribute.md)

- [ ] 外观与可访问状态一致。
- [ ] data-*仅放公开标识，不放机密或唯一业务状态。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-3-5"></a>

## 1.3.3.5 综合任务

让综合项目安全显示恶意形状的标题或错误文本。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.5.textcontent.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.5.textcontent-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.3.5.textcontent.md)

- [ ] 包含尖括号的输入以文本显示。
- [ ] DOM没有由该输入创建脚本或事件属性。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-3-6"></a>

## 1.3.3.6 综合任务

测量综合项目卡片和滚动区域，定位窄屏溢出。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.6.offsetwidth-height.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.6.offsetwidth-height-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.3.6.offsetwidth-height.md)

- [ ] 明确offset/client/rect各自用途。
- [ ] 不在循环里反复交错布局读写。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-3-7"></a>

## 1.3.3.7 综合任务

分析综合项目手动render与声明式UI的职责；Vue模板仅作后续预告，不要求本阶段先掌握Vue实现。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.7.dom-widget-flutter-rn.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.7.dom-widget-flutter-rn-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.3.7.dom-widget-flutter-rn.md)

- [ ] 模型和DOM能保持一致。
- [ ] 第三方DOM控制限定在适配边界。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-4-1"></a>

## 1.3.4.1 综合任务

给综合项目视图装配统一的事件订阅与清理入口。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.1.addeventlistener.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.1.addeventlistener-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.4.1.addeventlistener.md)

- [ ] 重复装配不叠加监听。
- [ ] 销毁后旧监听不能再修改界面。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-4-2"></a>

## 1.3.4.2 综合任务

跟踪综合项目卡片与收藏按钮的传播路径，解释事件阶段。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.2.item-1-3-4-2.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.2.item-1-3-4-2-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.4.2.item-1-3-4-2.md)

- [ ] 能复现捕获/目标/冒泡顺序。
- [ ] 不依赖不必要的全局事件拦截。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-4-3"></a>

## 1.3.4.3 综合任务

先在练习副本给收藏按钮加入span或图标，再比较图标、按钮和列表空白处点击的target与动作识别；必要时修复定位。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.3.event.target.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.3.event.target-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.4.3.event.target.md)

- [ ] 点击图标和按钮都命中同一动作。
- [ ] 使用currentTarget或有边界的closest。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-4-4"></a>

## 1.3.4.4 综合任务

为综合项目搜索表单取消默认导航，保留键盘提交与父层事件协作。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.4.preventdefault.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.4.preventdefault-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.4.4.preventdefault.md)

- [ ] 提交不会意外刷新页面。
- [ ] 说明preventDefault与stopPropagation的不同。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-4-5"></a>

## 1.3.4.5 综合任务

完善综合项目搜索输入、Enter提交及焦点事件，考虑中文输入法。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.5.click-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)

- [ ] input/change/submit职责清楚。
- [ ] 不只用keydown拼接文本，组合输入期间策略明确。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-4-6"></a>

## 1.3.4.6 综合任务

给综合项目动态列表使用受限事件委托。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.6.event-delegation.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.6.event-delegation-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.4.6.event-delegation.md)

- [ ] 新增项目无需额外绑定也可操作。
- [ ] 点击空白区域和未知动作不会误操作。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-4-7"></a>

## 1.3.4.7 综合任务

评估综合项目跨区域刷新是否需要CustomEvent，并定义detail契约。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.7.customevent.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.7.customevent-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.4.7.customevent.md)

- [ ] 事件名称、传播和detail字段明确。
- [ ] 允许直接函数调用更合适时不引入事件总线。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-5-1"></a>

## 1.3.5.1 综合任务

审查综合项目请求、转换和渲染边界；另构造两步本地回调实验并用命名函数或Promise重构，不假定现有项目有回调地狱。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.1.item-1-3-5-1.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.1.item-1-3-5-1-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.5.1.item-1-3-5-1.md)

- [ ] 成功与失败路径都可追踪。
- [ ] 不把同步回调误认为后台异步。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-5-2"></a>

## 1.3.5.2 综合任务

分析综合项目若接入旧XHR接口的适配边界。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.2.xmlhttprequest.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.2.xmlhttprequest-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.5.2.xmlhttprequest.md)

- [ ] load中检查status，能取消并区分超时。
- [ ] 不为新代码默认重写为XHR。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-5-3"></a>

## 1.3.5.3 综合任务

实现综合项目Fetch加载，覆盖HTTP错误、解析失败、取消和迟到响应。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.3.fetch-api.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.3.fetch-api-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.5.3.fetch-api.md)

- [ ] 非2xx状态（现有503或新增404分支）与坏JSON得到不同诊断。
- [ ] 快速切换筛选条件时旧响应不能覆盖新条件。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-5-4"></a>

## 1.3.5.4 综合任务

为综合项目异步操作统一恢复loading与安全提示。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.4.try-catch-finally.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.4.try-catch-finally-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.5.4.try-catch-finally.md)

- [ ] 成功、失败、取消后均无悬挂loading。
- [ ] 用户提示不暴露原始凭据或敏感堆栈。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-5-5"></a>

## 1.3.5.5 综合任务

在项目副本新增可取消的延迟搜索或定时刷新，另可选加入动画帧；实现销毁清理，不假定参考项目已有这些计时器。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.5.settimeout.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.5.settimeout-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.5.5.settimeout.md)

- [ ] 离开视图后无继续更新。
- [ ] 不以精确毫秒作为后台页面正确性依据。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-3-5-6"></a>

## 1.3.5.6 综合任务

校验综合项目接口JSON，并为当前仅在内存的收藏设计可选持久化格式；明确这是新增设计，不声称现有项目已存储。

[原理](../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.6.json.parse.md) · [示例](../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.6.json.parse-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.3-javascript/1.3.5.6.json.parse.md)

- [ ] 坏JSON与合法但结构不符的数据都被处理。
- [ ] 不把JSON往返用作所有对象的深复制。
- [ ] 能不用逐行提示说明原因，并在一个变体输入上重复验证。

<a id="p-1-4-1"></a>

## 1.4.1 综合任务

在学习资源目录综合实践中应用：为课程目录选择能力并写出回退

[原理](../../1-notes/01-web-fundamentals/1.4-quality-basics/1.4.1.standards-baseline.md) · [示例](../../2-examples/01-web-fundamentals/1.4-quality-basics/1.4.1.standards-baseline-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.4-quality-basics/1.4.1.standards-baseline.md)

- [ ] 能够区分规范、语法支持、项目矩阵与行为验证。
- [ ] 关闭增强后仍可阅读与导航。
- [ ] 不以CSS.supports=true推导所有环境通过。

<a id="p-1-4-2"></a>

## 1.4.2 综合任务

在学习资源目录综合实践中应用：只用键盘完成带错误恢复的预览

[原理](../../1-notes/01-web-fundamentals/1.4-quality-basics/1.4.2.accessibility-foundations.md) · [示例](../../2-examples/01-web-fundamentals/1.4-quality-basics/1.4.2.accessibility-foundations-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.4-quality-basics/1.4.2.accessibility-foundations.md)

- [ ] 标签、可访问名称、错误关联和焦点都可解释。
- [ ] 错误不只靠颜色，输入后错误状态同步清除。
- [ ] 明确自动化扫描不等于全量WCAG验收。

<a id="p-1-4-3"></a>

## 1.4.3 综合任务

在学习资源目录综合实践中应用：为目录列表补齐设计稿没有的状态

[原理](../../1-notes/01-web-fundamentals/1.4-quality-basics/1.4.3.design-interaction-states.md) · [示例](../../2-examples/01-web-fundamentals/1.4-quality-basics/1.4.3.design-interaction-states-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.4-quality-basics/1.4.3.design-interaction-states.md)

- [ ] 状态文案、内容、按钮与aria-busy一致。
- [ ] 重试能恢复，不丢主要说明或用户当前操作位置。
- [ ] 能够解释桌面与手机可共享状态契约但采用不同UI。

<a id="p-1-4-4"></a>

## 1.4.4 综合任务

在学习资源目录综合实践中应用：验证脚本缺失、取消和故障恢复

[原理](../../1-notes/01-web-fundamentals/1.4-quality-basics/1.4.4.progressive-enhancement.md) · [示例](../../2-examples/01-web-fundamentals/1.4-quality-basics/1.4.4.progressive-enhancement-demo.html) · [独立练习](../../3-exercises/01-web-fundamentals/1.4-quality-basics/1.4.4.progressive-enhancement.md)

- [ ] 无JS时仍可读关键内容且不给出无效增强按钮。
- [ ] 取消不会被迟到结果覆盖，故障有可理解恢复路径。
- [ ] 不会上传或存储真实个人数据，写请求重试先考虑幂等。
