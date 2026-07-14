#!/usr/bin/env python3
"""Apply hierarchical numbering to knowledge-map part files."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAP_DIR = ROOT / "knowledge-map"

STAGE_FOLDERS = {
    0: "00-environment",
    1: "01-web-fundamentals",
    2: "02-javascript-browser",
    3: "03-engineering",
    4: "04-frameworks",
    5: "05-fullstack-auth",
    6: "06-performance-security",
    7: "07-deployment",
    8: "08-architecture",
    9: "09-performance",
    10: "10-security",
    11: "11-observability",
    12: "12-testing-design-system",
    13: "13-platform",
    14: "14-bff-runtime",
    15: "15-project-delivery",
}

SECTION_SLUG_OVERRIDES = {
    "0.1": "0.1-what-is-web-app",
    "0.2": "0.2-dev-environment",
    "0.3": "0.3-network-basics",
    "1.1": "1.1-html",
    "1.2": "1.2-css",
    "1.3": "1.3-javascript",
    "2.1": "2.1-js-advanced",
    "2.2": "2.2-browser-internals",
    "2.3": "2.3-browser-storage",
    "2.4": "2.4-web-apis",
    "3.1": "3.1-package-management",
    "3.2": "3.2-build-tools",
    "3.3": "3.3-typescript",
    "3.4": "3.4-code-quality",
    "3.5": "3.5-testing-basics",
    "4.1": "4.1-framework-concepts",
    "4.2": "4.2-react",
    "4.3": "4.3-vue",
    "4.4": "4.4-css-ui",
    "5.1": "5.1-http-client",
    "5.2": "5.2-auth",
    "5.3": "5.3-cors",
    "5.4": "5.4-data-protocols",
    "5.5": "5.5-realtime",
    "6.1": "6.1-performance",
    "6.2": "6.2-web-security",
    "6.3": "6.3-a11y",
    "6.4": "6.4-i18n",
    "6.5": "6.5-seo",
    "7.1": "7.1-build-deploy",
    "7.2": "7.2-ssr",
    "7.3": "7.3-advanced-preview",
    "7.4": "7.4-soft-skills",
    "8.1": "8.1-architecture-docs",
    "8.2": "8.2-app-architecture",
    "8.3": "8.3-rendering",
    "8.4": "8.4-micro-frontends",
    "8.5": "8.5-bff",
    "8.6": "8.6-state-data",
    "9.1": "9.1-performance-metrics",
    "9.2": "9.2-performance-budget",
    "9.3": "9.3-loading-advanced",
    "9.4": "9.4-runtime-advanced",
    "9.5": "9.5-ssr-streaming",
    "10.1": "10.1-security-baseline",
    "10.2": "10.2-vulnerabilities",
    "10.3": "10.3-auth-advanced",
    "10.4": "10.4-supply-chain",
    "10.5": "10.5-privacy-compliance",
    "11.1": "11.1-error-monitoring",
    "11.2": "11.2-logging-metrics",
    "11.3": "11.3-release-management",
    "11.4": "11.4-infra",
    "12.1": "12.1-testing-strategy",
    "12.2": "12.2-specialized-testing",
    "12.3": "12.3-design-system",
    "12.4": "12.4-component-library",
    "13.1": "13.1-monorepo",
    "13.2": "13.2-release-deps",
    "13.3": "13.3-build-advanced",
    "13.4": "13.4-browser-compat",
    "13.5": "13.5-dx",
    "14.1": "14.1-node-runtime",
    "14.2": "14.2-bff-impl",
    "14.3": "14.3-ssr-runtime",
    "14.4": "14.4-edge-runtime",
    "14.5": "14.5-data-layer",
    "14.6": "14.6-file-upload",
    "15.1": "15.1-tech-decisions",
    "15.2": "15.2-code-review",
    "15.3": "15.3-team-collaboration",
    "15.4": "15.4-legacy-migration",
    "15.5": "15.5-i18n-a11y-prod",
    "15.6": "15.6-web-platform-advanced",
}

ITEM_SLUG_OVERRIDES = {
    "0.1.1": "client-server-model",
    "0.1.2": "browser-role",
    "0.1.3": "spa-vs-mpa",
    "0.1.4": "same-origin-policy",
    "0.1.5": "mobile-comparison",
}


def section_slug(section_id: str, title: str) -> str:
    if section_id in SECTION_SLUG_OVERRIDES:
        return SECTION_SLUG_OVERRIDES[section_id]
    ascii_bits = re.findall(r"[A-Za-z0-9]+", title)
    if ascii_bits:
        return f"{section_id}-" + "-".join(x.lower() for x in ascii_bits[:4])
    return f"{section_id}-section"


def slugify_item(text: str, item_id: str) -> str:
    if item_id in ITEM_SLUG_OVERRIDES:
        return ITEM_SLUG_OVERRIDES[item_id]

    cleaned = text.strip()
    cleaned = re.sub(r"^\[([^\]]+)\]\([^)]+\)", r"\1", cleaned)
    cleaned = re.sub(r"^理解\s+", "", cleaned)

    bold = re.search(r"\*\*([^*]+)\*\*", cleaned)
    if bold:
        cleaned = bold.group(1)

    codes = re.findall(r"`([^`]+)`", cleaned)
    if codes:
        base = re.sub(r"[^a-zA-Z0-9.+#-]+", "-", codes[0]).strip("-").lower()
        if base:
            return base[:48]

    words = re.findall(r"[A-Za-z][A-Za-z0-9+.#-]*", cleaned)
    if words:
        return "-".join(w.lower() for w in words[:5])[:48]

    return f"item-{item_id.replace('.', '-')}"


def note_path(stage: int, section_id: str, section_title: str, item_id: str, item_text: str) -> str:
    folder = STAGE_FOLDERS[stage]
    sec_slug = section_slug(section_id, section_title)
    slug = slugify_item(item_text, item_id)
    return f"./notes/{folder}/{sec_slug}/{item_id}.{slug}.md"


def extract_label(body: str) -> str:
    """Get human-readable label from checkbox body, removing old links/numbers."""
    body = body.strip()
    body = re.sub(r"^理解\s+", "", body)
    while re.search(r"\[([^\]]+)\]\([^)]+\)", body):
        body = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", body)
    body = re.sub(r"^\d+(?:\.\d+)*\.?\s*", "", body)
    body = re.sub(r"^\*\*(\d+\.\s*)", "**", body)
    body = re.sub(r"^(📱 移动端对照：)(\d+\.\s*)", r"\1", body)
    return body.strip()


def format_link_label(item_id: str, label: str) -> str:
    label = label.strip()
    if label.startswith("📱"):
        return f"{item_id} {label}"
    return f"{item_id} {label}"


def is_capability_section(title: str) -> bool:
    return "能力锚点" in title


def process_map(content: str) -> tuple[str, int]:
    lines = content.splitlines()
    out: list[str] = []

    stage: int | None = None
    section_id: str | None = None
    section_title: str | None = None
    subsection_idx = 0
    item_idx = 0
    in_capability = False
    count = 0

    stage_re = re.compile(r"^## 阶段 (\d+)[：:]")
    section_re = re.compile(r"^### (\d+\.\d+)\s+(.+)$")
    subsection_re = re.compile(r"^#### (.+)$")
    checkbox_re = re.compile(r"^(- \[ \] )(.+)$")

    for line in lines:
        if m := stage_re.match(line):
            stage = int(m.group(1))
            subsection_idx = 0
            item_idx = 0
            in_capability = False
            out.append(line)
            continue

        if m := section_re.match(line):
            section_id = m.group(1)
            section_title = m.group(2).strip()
            subsection_idx = 0
            item_idx = 0
            in_capability = is_capability_section(section_title)
            out.append(line)
            continue

        m_sub = subsection_re.match(line)
        if m_sub and section_id and not in_capability:
            raw = m_sub.group(1).strip()
            if re.match(r"^\d+(?:\.\d+)+\s+", raw):
                parts = raw.split(" ", 1)
                subsection_idx = int(parts[0].split(".")[-1])
                title = parts[1] if len(parts) > 1 else raw
            else:
                subsection_idx += 1
                title = raw
            item_idx = 0
            out.append(f"#### {section_id}.{subsection_idx} {title}")
            continue

        if m := checkbox_re.match(line):
            if stage is None or not section_id or not section_title or in_capability:
                out.append(line)
                continue

            prefix, body = m.groups()
            label = extract_label(body)

            if subsection_idx > 0:
                item_idx += 1
                item_id = f"{section_id}.{subsection_idx}.{item_idx}"
            else:
                item_idx += 1
                item_id = f"{section_id}.{item_idx}"

            path = note_path(stage, section_id, section_title, item_id, label)
            link_label = format_link_label(item_id, label)
            out.append(f"{prefix}[{link_label}]({path})")
            count += 1
            continue

        out.append(line)

    return "\n".join(out) + "\n", count


def main() -> None:
    total = 0
    for part_file in sorted(MAP_DIR.glob("*.md")):
        content = part_file.read_text(encoding="utf-8")
        # skip part header before first stage
        stage_idx = content.find("## 阶段 ")
        if stage_idx == -1:
            continue
        header = content[:stage_idx]
        body = content[stage_idx:]
        new_body, count = process_map(body)
        part_file.write_text(header + new_body, encoding="utf-8")
        total += count
        print(f"Numbered {count} items in {part_file.name}")
    print(f"Total: {total} knowledge points")


if __name__ == "__main__":
    main()
