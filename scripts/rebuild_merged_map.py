#!/usr/bin/env python3
"""Rebuild merged KNOWLEDGE_MAP from stage 0-7 base + senior stages 8-15."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

INDEX_TAIL = """## 知识点索引（按领域）

便于按需查阅，将全部阶段内容按技术领域重新归类：

| 领域 | 涵盖阶段 | 关键知识点 |
| --- | --- | --- |
| HTML | 1 | 语义化、表单、SEO 基础 |
| CSS | 1、4、12 | 布局、响应式、动画、Tailwind、Design Token |
| JavaScript | 1、2 | 语法、异步、DOM、事件循环、原型链 |
| 浏览器 | 0、2 | 渲染原理、缓存、存储、DevTools |
| 网络 | 0、5、14 | HTTP、REST、WebSocket、CORS、GraphQL |
| TypeScript | 3 | 类型系统、泛型、工程配置 |
| 工程化 | 3、13 | 包管理、Vite/Webpack、Monorepo、发布治理 |
| React | 4、8、14 | Hooks、路由、状态管理、RSC、Next.js |
| Vue | 4 | 组合式 API、Pinia、Vue Router、Nuxt |
| 架构 | 8 | FSD、微前端、BFF、渲染选型、RFC |
| 认证安全 | 5、6、10 | JWT、Session、XSS、CSRF、CSP、合规 |
| 性能 | 6、9 | Core Web Vitals、RUM、性能预算、Streaming SSR |
| 可访问性 | 6、12、15 | WCAG、ARIA、键盘导航、生产级 a11y |
| 测试 | 3、12 | 单元/E2E、契约测试、视觉回归 |
| 可观测性 | 11 | Sentry、Feature Flag、灰度、On-call |
| 设计系统 | 4、12 | 组件库、Storybook、Token 流水线 |
| 部署运维 | 7、11 | 静态托管、Nginx、CI/CD、Docker、K8s |
| BFF / 运行时 | 14 | Node、Edge、SSR 深入 |
| 领导力 | 7、15 | Review、迁移、带人、i18n 生产级 |

---

## 推荐学习顺序与里程碑

### 里程碑 1：能写静态页面（阶段 0–1，约 2–4 周）

- 产出：一个响应式个人介绍页或产品落地页（纯 HTML/CSS）

### 里程碑 2：能写交互式页面（阶段 1–2，约 2–4 周）

- 产出：Todo 应用、天气查询等小项目（原生 JS + Fetch）

### 里程碑 3：能使用现代工具链（阶段 3，约 1–2 周）

- 产出：用 Vite + TypeScript 重构之前的项目

### 里程碑 4：能开发 SPA 应用（阶段 4–5，约 4–8 周）

- 产出：带登录、列表、表单的完整管理后台或电商前台（React 或 Vue）

### 里程碑 5：生产就绪（阶段 6–7，约 2–4 周）

- 产出：对里程碑 4 的项目做性能优化、安全加固、部署上线

### 里程碑 6：能输出架构方案（阶段 8，约 2–4 周）

- 产出：一份完整 **技术 RFC**（含渲染选型 + 模块划分 + 风险）

### 里程碑 7：能治理生产质量（阶段 9–11，约 4–6 周）

- 产出：接入 **Sentry + Web Vitals + 性能预算 CI + CSP 草案 + 灰度流程**

### 里程碑 8：能建设团队平台（阶段 12–13，约 4–6 周）

- 产出：**Storybook + Design Token** 流水线；或 **Monorepo** 模板仓库

### 里程碑 9：高级 Web 工程师综合达标（阶段 14–15，约 4–8 周）

- 产出：实现 **BFF 原型** + 主导一次 **模块迁移** + 完成 **Onboarding 文档**

---

## 与移动端经验的加速路径

若你已有 **React Native** 经验，可优先学习：

1. 阶段 1 的 **HTML/CSS**（RN 中较弱的部分）
2. 阶段 2 的 **浏览器原理与 DOM**（RN 无 DOM）
3. 阶段 5 的 **Cookie/CORS/Session**（RN 跨域场景不同）
4. 阶段 6 的 **SEO、a11y、Core Web Vitals**
5. 阶段 7、11 的 **部署、Nginx 与生产运维**
6. 阶段 8–15 的 **架构、监控、平台化**（RN 工程化差异大）

若你已有 **Flutter** 经验，需重点关注：

1. **JavaScript/TypeScript** 整个生态（与 Dart 差异）
2. **HTML 语义化与 CSS 布局**（无 Widget 系统）
3. **浏览器 DevTools** 调试（替代 Flutter DevTools 的部分能力）
4. **npm 生态与 Web 构建工具链**
5. 阶段 8–15 的 **架构治理与 BFF/Edge** 能力

若你已有 **Android** 经验，需重点关注：

1. **CSS 与响应式布局**（无 XML Layout）
2. **JavaScript 异步模型与前端框架**
3. **浏览器安全模型**（Web 特有风险）
4. **前端工程化**（与 Gradle 不同的工具链）
5. 阶段 13 的 **Monorepo**（≈ Gradle 多 Module）

---

## 配套资源规划（本项目目录建议）

```
WebDev_Compass/
├── README.md
├── KNOWLEDGE_MAP.md          # 本文件：Web 工程师知识地图（阶段 0–15）
├── notes/                    # 笔记：{阶段文件夹}/{小节文件夹}/{序号}.{slug}.md
├── examples/                 # 示例：与 notes 同路径规则，扩展名为 .html/.ts 等
└── projects/                 # 完整工程示例（待补充）
```

### 文件命名规范

| 类型 | 路径示例 |
| --- | --- |
| 笔记 | `notes/00-environment/0.1-what-is-web-app/0.1.1.client-server-model.md` |
| 示例 | `examples/00-environment/0.1-what-is-web-app/0.1.1.request-response-demo.html` |
| 小节索引 | `notes/00-environment/0.1-what-is-web-app/README.md` |

---

## 版本记录

| 版本 | 日期 | 说明 |
| --- | --- | --- |
| 1.0 | 2026-07-09 | 初始版本 |
| 2.0 | 2026-07-13 | 融合至阶段 15，目标调整为高级 Web 工程师 |
| 2.1 | 2026-07-13 | 全量知识点四级序号，笔记/示例路径与序号对齐 |

---

**下一步**：从 [阶段 0](#阶段-0环境与心智模型) 开始，点击知识点链接阅读 `notes/` 笔记并运行 `examples/` 示例。
"""


def main() -> None:
    import subprocess

    mid = subprocess.check_output(
        ["git", "show", "HEAD:KNOWLEDGE_MAP.md"], cwd=ROOT, text=True
    )
    senior_stages = (ROOT / "scripts" / "data" / "senior_stages.md").read_text(encoding="utf-8")

    stages_0_7 = mid[mid.index("## 阶段 0") : mid.index("## 知识点索引（按领域）")].strip()

    header = (ROOT / "scripts" / "map_header.md").read_text(encoding="utf-8")
    content = header + "\n" + stages_0_7 + "\n\n---\n\n" + senior_stages + "\n\n---\n\n" + INDEX_TAIL
    (ROOT / "KNOWLEDGE_MAP.md").write_text(content, encoding="utf-8")
    print("Merged map written:", len(content.splitlines()), "lines")


if __name__ == "__main__":
    main()
