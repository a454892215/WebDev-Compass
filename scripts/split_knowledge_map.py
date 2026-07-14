#!/usr/bin/env python3
"""Split KNOWLEDGE_MAP.md into numbered part files by learning layer."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAP = ROOT / "KNOWLEDGE_MAP.md"
OUT_DIR = ROOT / "knowledge-map"

PARTS = [
    {
        "file": "01-foundation-stages-0-2.md",
        "title": "阶段 0–2：基础层",
        "subtitle": "环境与心智模型 · Web 基础三件套 · JavaScript 与浏览器",
        "stages": (0, 2),
        "start": "## 阶段 0：环境与心智模型",
        "end": "## 阶段 3：工程化与 TypeScript",
    },
    {
        "file": "02-engineering-stages-3-5.md",
        "title": "阶段 3–5：工程层",
        "subtitle": "工程化与 TypeScript · 框架与状态管理 · 全栈协作与认证",
        "stages": (3, 5),
        "start": "## 阶段 3：工程化与 TypeScript",
        "end": "## 阶段 6：性能、安全与可访问性",
    },
    {
        "file": "03-application-stages-6-7.md",
        "title": "阶段 6–7：应用层",
        "subtitle": "性能、安全与可访问性 · 部署运维与 SSR 入门",
        "stages": (6, 7),
        "start": "## 阶段 6：性能、安全与可访问性",
        "end": "## 阶段 8：前端架构与系统设计",
    },
    {
        "file": "04-architecture-stages-8-11.md",
        "title": "阶段 8–11：架构层",
        "subtitle": "架构设计 · 深度性能 · 安全合规 · 可观测性与运维",
        "stages": (8, 11),
        "start": "## 阶段 8：前端架构与系统设计",
        "end": "## 阶段 12：测试策略与设计系统",
    },
    {
        "file": "05-platform-stages-12-14.md",
        "title": "阶段 12–14：平台层",
        "subtitle": "测试与设计系统 · 平台化工程 · BFF / Node / Edge",
        "stages": (12, 14),
        "start": "## 阶段 12：测试策略与设计系统",
        "end": "## 阶段 15：项目整合、治理与工程管理",
    },
    {
        "file": "06-delivery-stages-15-appendix.md",
        "title": "阶段 15：项目整合与附录",
        "subtitle": "项目整合与工程管理 · 索引 · 里程碑 · 资源规划",
        "stages": (15, 15),
        "start": "## 阶段 15：项目整合、治理与工程管理",
        "end": None,
    },
]


def extract(content: str, start: str, end: str | None) -> str:
    s = content.index(start)
    if end:
        e = content.index(end, s)
        return content[s:e].strip()
    return content[s:].strip()


def part_nav(i: int, parts: list) -> str:
    links = ["[← 返回总览](../KNOWLEDGE_MAP.md)"]
    if i > 0:
        links.insert(0, f"[← {parts[i-1]['file'].replace('.md','')}](./{parts[i-1]['file']})")
    if i < len(parts) - 1:
        links.append(f"[下一部分 →](./{parts[i+1]['file']})")
    return " · ".join(links)


def part_header(part: dict, i: int) -> str:
    a, b = part["stages"]
    stage_label = f"阶段 {a}" if a == b else f"阶段 {a}–{b}"
    return f"""# {part['title']}

> {part['subtitle']}  
> {part_nav(i, PARTS)}

---

"""


def build_index(header: str, parts_meta: list[tuple]) -> str:
    nav_rows = "\n".join(
        f"| {i+1} | [{p['title']}](./knowledge-map/{p['file']}) | 阶段 {p['stages'][0]}–{p['stages'][1]} | {lines} 行 |"
        for i, (p, lines) in enumerate(parts_meta)
    )
    # header already contains title, intro, 如何使用, 学习层级与路线总览
    return f"""{header}

---

## 分册目录

| 序号 | 分册 | 涵盖阶段 | 篇幅 |
| --- | --- | --- | --- |
{nav_rows}

---

**下一步**：从 [01-foundation-stages-0-2](./knowledge-map/01-foundation-stages-0-2.md) 的 [阶段 0](./knowledge-map/01-foundation-stages-0-2.md#阶段-0环境与心智模型) 开始。
"""


def main() -> None:
    content = MAP.read_text(encoding="utf-8")
    header_end = content.index("## 阶段 0")
    header = content[:header_end].strip()

    OUT_DIR.mkdir(exist_ok=True)
    parts_meta: list[tuple] = []

    for i, part in enumerate(PARTS):
        body = extract(content, part["start"], part["end"])
        file_content = part_header(part, i) + body + "\n"
        out_path = OUT_DIR / part["file"]
        out_path.write_text(file_content, encoding="utf-8")
        parts_meta.append((part, len(file_content.splitlines())))
        print(f"Wrote {out_path.name}: {len(file_content.splitlines())} lines")

    index = build_index(header, parts_meta)
    MAP.write_text(index + "\n", encoding="utf-8")
    print(f"Wrote KNOWLEDGE_MAP.md index: {len(index.splitlines())} lines")


if __name__ == "__main__":
    main()
