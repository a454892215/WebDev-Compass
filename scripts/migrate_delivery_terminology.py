#!/usr/bin/env python3
"""Rename knowledge-map files to English and replace leadership wording."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KM = ROOT / "knowledge-map"

FILE_RENAMES = {
    "01-foundation-stages-0-2.md": "01-foundation-stages-0-2.md",
    "02-engineering-stages-3-5.md": "02-engineering-stages-3-5.md",
    "03-application-stages-6-7.md": "03-application-stages-6-7.md",
    "04-architecture-stages-8-11.md": "04-architecture-stages-8-11.md",
    "05-platform-stages-12-14.md": "05-platform-stages-12-14.md",
    "06-delivery-stages-15-appendix.md": "06-delivery-stages-15-appendix.md",
}

TEXT_REPLACEMENTS = [
    ("## 阶段 15：项目整合、治理与工程管理", "## 阶段 15：项目整合、治理与工程管理"),
    ("项目整合、治理与工程管理", "项目整合、治理与工程管理"),
    ("项目整合、治理与交付", "项目整合、治理与交付"),
    ("项目整合与工程管理", "项目整合与工程管理"),
    ("### 15.3 工程管理与团队协作", "### 15.3 工程管理与团队协作"),
    (
        "**任务拆分与协作分工**：Story 分解、联调节奏、模块 Owner",
        "**任务拆分与协作分工**：Story 分解、联调节奏、模块 Owner",
    ),
    (
        "**前端能力评估维度**：用于排期、Review 与模块分工（工程视角，非招聘）",
        "**前端能力评估维度**：用于排期、Review 与模块分工（工程视角，非招聘）",
    ),
    ("15-project-delivery", "15-project-delivery"),
    ("15.3-team-collaboration", "15.3-team-collaboration"),
    ("15.3.1.task-collaboration.md", "15.3.1.task-collaboration.md"),
    ("15.3.4.skill-assessment.md", "15.3.4.skill-assessment.md"),
    ("| 领导  | 15  | 项目整合、治理与交付              | 主导遗留迁移、带人与跨团队技术决策                  |",
     "| 交付  | 15  | 项目整合与工程管理              | 主导遗留迁移、跨团队整合与项目治理                  |"),
    ("| 领导 | 15 | 项目整合、治理与交付 | 主导遗留迁移、带人与跨团队技术决策 |",
     "| 交付 | 15 | 项目整合与工程管理 | 主导遗留迁移、跨团队整合与项目治理 |"),
    ("| 项目整合       | 7、15    | Review、迁移、协作治理、i18n 生产级                |",
     "| 项目整合       | 7、15    | Review、迁移、协作治理、i18n 生产级                |"),
    ("| 项目整合 | 7、15 | Review、迁移、协作治理、i18n 生产级 |",
     "| 项目整合 | 7、15 | Review、迁移、协作治理、i18n 生产级 |"),
    ("subgraph delivery [交付层 阶段15]", "subgraph delivery [交付层 阶段15]"),
    ("S15[项目整合与工程管理]", "S15[项目整合与治理]"),
    ("# 阶段 15：项目整合与附录", "# 阶段 15：项目整合与附录"),
    ("阶段 15：项目整合与附录", "阶段 15：项目整合与附录"),
    ("06 项目整合与附录", "06 项目整合与附录"),
    ("| 项目交付 |", "| 项目交付 |"),
    ("能输出 **迁移与整合方案文档**，协调跨团队评审与落地",
     "能输出 **迁移与整合方案文档**，协调跨团队评审与落地"),
    ("主导一次 **模块迁移整合** + 完成 **项目 Onboarding 文档**",
     "主导一次 **模块迁移整合** + 完成 **项目 Onboarding 文档**"),
    ("15: \"15-project-delivery\"", "15: \"15-project-delivery\""),
    ("06-delivery-stages-15-appendix.md", "06-delivery-stages-15-appendix.md"),
    ("01-foundation-stages-0-2.md", "01-foundation-stages-0-2.md"),
    ("02-engineering-stages-3-5.md", "02-engineering-stages-3-5.md"),
    ("03-application-stages-6-7.md", "03-application-stages-6-7.md"),
    ("04-architecture-stages-8-11.md", "04-architecture-stages-8-11.md"),
    ("05-platform-stages-12-14.md", "05-platform-stages-12-14.md"),
    ("01-foundation", "01-foundation"),
    ("阶段 15", "阶段 15"),
]

SCAN_DIRS = [
    ROOT,
    ROOT / "knowledge-map",
    ROOT / "notes",
    ROOT / "scripts",
]


def apply_replacements(text: str) -> str:
    for old, new in TEXT_REPLACEMENTS:
        text = text.replace(old, new)
    return text


def update_file(path: Path) -> bool:
    if not path.is_file() or path.suffix not in {".md", ".py"}:
        return False
    original = path.read_text(encoding="utf-8")
    updated = apply_replacements(original)
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


def main() -> None:
    # rename files first (old names in content still get replaced after)
    for old, new in FILE_RENAMES.items():
        src = KM / old
        dst = KM / new
        if src.exists():
            src.rename(dst)
            print(f"Renamed: {old} -> {new}")

    changed = 0
    for base in SCAN_DIRS:
        for path in base.rglob("*"):
            if path.is_file() and update_file(path):
                changed += 1
                print(f"Updated: {path.relative_to(ROOT)}")

    print(f"Done. {changed} files updated.")


if __name__ == "__main__":
    main()
