# CSS 离线对照实验

[返回示例目录](../../README.md) · [理论与练习索引](../../../1-notes/01-web-fundamentals/1.2-css/README.md)

从仓库根目录启动静态服务后打开本目录。41 个入口共享实验外壳，每页CSS与规则不同；切换后可读取实际computed style。没有外部字体、CDN或分析请求。

| 序号     | 实验                                                                           |
| -------- | ------------------------------------------------------------------------------ |
| 1.2.1.1  | [CSS 的三种引入方式与来源顺序](./1.2.1.1.style-demo.html)                      |
| 1.2.1.2  | [选择器、状态伪类与伪元素](./1.2.1.2.hover-demo.html)                          |
| 1.2.1.3  | [特异性：比较 ID、类与元素权重](./1.2.1.3.specificity-demo.html)               |
| 1.2.1.4  | [继承与 inherit、initial、unset、revert](./1.2.1.4.inherit-demo.html)          |
| 1.2.1.5  | [CSS 自定义属性与 var 回退](./1.2.1.5.name-demo.html)                          |
| 1.2.1.6  | [完整层叠：来源、重要性、层与权重](./1.2.1.6.cascade-layers-demo.html)         |
| 1.2.2.1  | [盒模型与 border-box 尺寸](./1.2.2.1.item-1-2-2-1-demo.html)                   |
| 1.2.2.2  | [display：外部参与方式与内部布局](./1.2.2.2.item-1-2-2-2-demo.html)            |
| 1.2.2.3  | [position：正常流、包含块与粘性定位](./1.2.2.3.item-1-2-2-3-demo.html)         |
| 1.2.2.4  | [Flexbox：轴、收缩、换行与对齐](./1.2.2.4.flexbox-demo.html)                   |
| 1.2.2.5  | [Grid：二维轨道、fr 与 minmax](./1.2.2.5.grid-demo.html)                       |
| 1.2.2.6  | [float 与 clear：维护旧布局和文字环绕](./1.2.2.6.item-1-2-2-6-demo.html)       |
| 1.2.2.7  | [多列排版与内容分段](./1.2.2.7.item-1-2-2-7-demo.html)                         |
| 1.2.2.8  | [正常流、BFC 与外边距折叠](./1.2.2.8.normal-flow-formatting-context-demo.html) |
| 1.2.2.9  | [层叠上下文与 z-index](./1.2.2.9.stacking-context-demo.html)                   |
| 1.2.2.10 | [内在尺寸、最小约束与媒体比例](./1.2.2.10.intrinsic-sizing-demo.html)          |
| 1.2.3.1  | [颜色语法、透明度与可读性](./1.2.3.1.hex-rgb-rgba-hsl-hsla-demo.html)          |
| 1.2.3.2  | [字体、行高与文字间距](./1.2.3.2.font-family-demo.html)                        |
| 1.2.3.3  | [@font-face、字体回退与加载策略](./1.2.3.3.font-face-demo.html)                |
| 1.2.3.4  | [文本对齐、换行、截断与内容保留](./1.2.3.4.text-align-demo.html)               |
| 1.2.3.5  | [背景图、尺寸、位置与重复](./1.2.3.5.background-color-demo.html)               |
| 1.2.3.6  | [边框、圆角与阴影的布局边界](./1.2.3.6.border-demo.html)                       |
| 1.2.3.7  | [overflow、滚动容器与可达性](./1.2.3.7.overflow-demo.html)                     |
| 1.2.4.1  | [媒体查询与内容驱动的断点](./1.2.4.1.item-1-2-4-1-demo.html)                   |
| 1.2.4.2  | [viewport、CSS 像素与浏览器缩放](./1.2.4.2.viewport-demo.html)                 |
| 1.2.4.3  | [rem、em、百分比和视口单位](./1.2.4.3.rem-demo.html)                           |
| 1.2.4.4  | [响应式图片：布局、资源选择与构图](./1.2.4.4.max-width-100-demo.html)          |
| 1.2.4.5  | [容器查询：组件根据可用空间变化](./1.2.4.5.item-1-2-4-5-demo.html)             |
| 1.2.4.6  | [把移动布局经验迁移到 CSS](./1.2.4.6.css-flex-grid-flutter-row-demo.html)      |
| 1.2.4.7  | [移动视口、safe-area 与软键盘](./1.2.4.7.mobile-viewport-safe-area-demo.html)  |
| 1.2.5.1  | [transition：在状态变化之间插值](./1.2.5.1.transition-demo.html)               |
| 1.2.5.2  | [keyframes 与 animation 生命周期](./1.2.5.2.keyframes-demo.html)               |
| 1.2.5.3  | [transform：视觉变化与布局尺寸](./1.2.5.3.transform-demo.html)                 |
| 1.2.5.4  | [cursor、user-select 与 pointer-events](./1.2.5.4.cursor-demo.html)            |
| 1.2.5.5  | [动画性能：测量布局、绘制与合成](./1.2.5.5.transform-demo.html)                |
| 1.2.5.6  | [用户动效偏好与不同输入方式](./1.2.5.6.motion-input-preferences-demo.html)     |
| 1.2.6.1  | [BEM 命名：识别结构与状态](./1.2.6.1.bem-demo.html)                            |
| 1.2.6.2  | [CSS Modules：构建时类名映射](./1.2.6.2.css-modules-demo.html)                 |
| 1.2.6.3  | [Sass/SCSS：构建变量、嵌套与混入](./1.2.6.3.sass-scss-demo.html)               |
| 1.2.6.4  | [原子化 CSS 与 Tailwind 的构建边界](./1.2.6.4.css-tailwind-css-demo.html)      |
| 1.2.6.5  | [现代选择器、流动尺寸与逻辑属性](./1.2.6.5.is-demo.html)                       |

qa-cases.json提供实际样式断言，integration-cases.json提供逐点综合任务。过渡等待约240ms；reduced-motion、Tab焦点、媒体源和容器宽度还需专项观察。Sass/Modules/Tailwind的源码与构建边界见[说明](./assets/source/README.md)，不伪称静态浏览器能够编译。

CSS Modules、Sass与Tailwind的[真实构建实践](../../../4-practice/01-web-fundamentals/toolchain/README.md)已提供独立项目，静态fixture与真实编译各自标明。

1.2.5.5先选路径，再点击“移动／复位”采集等幅往返；不要把实现路径切换当作性能样本。[本轮专项证据](../../../../docs/audits/stage-1-css-runtime.json)只证明移动和减少动效行为，不提供性能排名。

公共lab.css的全局border-box仅为小型对照页统一外壳；不把它作为大型组件库或Web Components的通用重置建议。真实工程按层和组件边界选择重置范围。
