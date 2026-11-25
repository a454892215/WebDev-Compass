#!/usr/bin/env python3
"""Audit local Markdown navigation and count authored knowledge notes.

This is a repository-specific Markdown subset checker, not a CommonMark renderer.
Fenced/inline code is ignored. Missing notes on unchecked map rows are planned;
all other missing local files or fragments fail. Checkbox state is learner state,
not editorial completion. Only knowledge-map volumes define canonical points.
"""
from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from dataclasses import dataclass
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

SKIP_DIRS = {'.git', 'node_modules', '.pnpm-store', 'coverage', 'test-results', 'playwright-report', '.nyc_output', '.vite', '.turbo', '.nuxt', '.output', '__pycache__', '.cache', 'artifacts'}
INLINE_CODE = re.compile(r'(`+)(?!`)(.*?)\1(?!`)', re.DOTALL)
LINK = re.compile(r'!?\[(?:\\.|[^\]\\])*\]\(\s*(<[^>]*>|(?:\\.|[^()\s]|\([^()]*\))+)(?:\s+[\"\'][^\"\']*[\"\'])?\s*\)')
CHECKBOX = re.compile(r'^\s*-\s+\[([ xX])\]\s+')
POINT = re.compile(r'^(\d+(?:\.\d+){2,3})\.')


@dataclass(frozen=True)
class LocalLink:
    line: int
    target: str
    unchecked: bool
    checkbox: bool = False


def visible_lines(text: str):
    """Yield non-fenced lines, retaining numbers for actionable reports."""
    fence = None
    for number, line in enumerate(text.splitlines(), 1):
        marker = re.match(r'^ {0,3}(`{3,}|~{3,})(.*)$', line)
        if fence:
            if marker and marker[1][0] == fence[0] and len(marker[1]) >= len(fence) and not marker[2].strip():
                fence = None
            continue
        if marker:
            fence = marker[1]
            continue
        yield number, line


def links_in(text: str):
    for number, original in visible_lines(text):
        line = INLINE_CODE.sub(lambda m: ' ' * len(m[0]), original)
        checkbox = CHECKBOX.match(line)
        unchecked = bool(checkbox and checkbox[1] == ' ')
        for match in LINK.finditer(line):
            target = match[1]
            if target.startswith('<'):
                target = target[1:-1]
            target = re.sub(r'\\([()\[\] ])', r'\1', target)
            yield LocalLink(number, html.unescape(target), unchecked, bool(checkbox))


def slugify(heading: str) -> str:
    # GitHub-style slugs for the headings used in this repository.
    heading = INLINE_CODE.sub(lambda m: html.escape(m[2]), heading)
    heading = re.sub(r'<[^>]+>', '', heading)
    heading = re.sub(r'\[([^]]+)\]\([^)]*\)', r'\1', heading)
    heading = html.unescape(heading).lower().strip()
    heading = re.sub(r'[^\w\-\s]', '', heading)
    return re.sub(r'\s', '-', heading)


class ElementIDs(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key == 'id' or (tag == 'a' and key == 'name'):
                if value:
                    self.ids.add(value)


def anchors_in(path: Path) -> set[str]:
    text = path.read_text(encoding='utf-8')
    parser = ElementIDs()
    parser.feed(text if path.suffix.lower() in {'.html', '.htm'} else '\n'.join(INLINE_CODE.sub('', line) for _, line in visible_lines(text)))
    anchors = set(parser.ids)
    seen = Counter()
    if path.suffix.lower() == '.md':
        for _, line in visible_lines(text):
            match = re.match(r'^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$', line)
            if not match:
                continue
            slug = slugify(match[1])
            index = seen[slug]
            anchors.add(f'{slug}-{index}' if index else slug)
            seen[slug] += 1
    return anchors


def documents(root: Path):
    # rglob does not follow directory symlinks. Exclude generated/dependency files.
    return sorted(p for p in root.rglob('*.md') if not any(part in SKIP_DIRS for part in p.relative_to(root).parts))


def is_map(path: Path, root: Path) -> bool:
    return path.parent == root / 'knowledge-map' and bool(re.match(r'^\d\d-', path.name))


def resolve_link(source: Path, target: str, root: Path):
    parsed = urlsplit(target)
    if parsed.scheme or parsed.netloc:
        return None
    # The generator header is an authoring input emitted at repository root.
    templates = {root / 'scripts/map_header.md', root / 'scripts/data/senior_stages.md'}
    base = root if source in templates else source.parent
    raw_path = unquote(parsed.path)
    # Codex local file links use /absolute/file.md:line (not a URI fragment).
    if re.search(r':\d+$', raw_path):
        raw_path = re.sub(r':\d+$', '', raw_path)
    path = Path(raw_path) if raw_path else source
    if parsed.path and not path.is_absolute():
        path = base / path
    return path.resolve(), unquote(parsed.fragment)


def audit(root: Path) -> dict:
    root = root.resolve()
    errors = []
    planned = set()
    points = {}
    checked_targets = set()
    local_count = 0
    sources = documents(root)
    for source in sources:
        text = source.read_text(encoding='utf-8')
        source_map = is_map(source, root)
        planned_context = source_map or source == root / 'scripts/data/senior_stages.md'
        for link in links_in(text):
            try:
                resolved = resolve_link(source, link.target, root)
            except ValueError as exc:
                errors.append({'file': str(source.relative_to(root)), 'line': link.line, 'target': link.target, 'reason': f'invalid URL: {exc}'})
                continue
            if resolved is None:
                continue
            local_count += 1
            target, fragment = resolved
            try:
                relative = target.relative_to(root)
            except ValueError:
                relative = None
            note = bool(relative and relative.parts[:2] == ('learning', '1-notes') and target.suffix == '.md' and POINT.match(target.name))
            if source_map and note and link.checkbox:
                number = POINT.match(target.name)[1]
                points.setdefault(str(relative), {'id': number, 'stage': int(number.split('.')[0]), 'exists': target.is_file()})
                if not link.unchecked:
                    checked_targets.add(str(relative))
            if not target.exists():
                if planned_context and link.unchecked and note:
                    planned.add(str(relative))
                    continue
                errors.append({'file': str(source.relative_to(root)), 'line': link.line, 'target': link.target, 'reason': 'missing file'})
            elif fragment:
                anchor_target = target / 'README.md' if target.is_dir() else target
                if anchor_target.suffix.lower() in {'.md', '.html', '.htm'}:
                    if not anchor_target.exists() or fragment not in anchors_in(anchor_target):
                        errors.append({'file': str(source.relative_to(root)), 'line': link.line, 'target': link.target, 'reason': 'missing anchor'})
    stages = defaultdict(lambda: {'points': 0, 'authored': 0, 'checked': 0})
    for path, point in points.items():
        row = stages[point['stage']]
        row['points'] += 1
        row['authored'] += point['exists']
        row['checked'] += path in checked_targets
    note_files = [p for p in (root / 'learning' / '1-notes').rglob('*.md') if POINT.match(p.name)] if (root / 'learning' / '1-notes').exists() else []
    return {
        'documents': len(sources), 'local_links': local_count,
        'knowledge_points': len(points), 'authored_points': sum(p['exists'] for p in points.values()),
        'note_files': len(note_files), 'planned_notes': len(planned),
        'stages': dict(sorted(stages.items())), 'errors': errors,
        'scope': 'Local Markdown links and fragments only; no external URL availability or factual/content-quality proof. Inline/fenced code ignored; generator input links resolve at output root. Reference-style links, Setext headings and arbitrary CommonMark extensions are not implemented.',
    }


def completion_table(root: Path, result: dict) -> str:
    """Render editorial coverage, independently of learner checkbox state."""
    titles = {}
    for source in sorted((root / 'knowledge-map').glob('*.md')):
        for _, line in visible_lines(source.read_text(encoding='utf-8')):
            match = re.match(r'^## 阶段 (\d+)[：:]\s*(.+?)\s*$', line)
            if match:
                titles[int(match[1])] = match[2].replace('|', r'\|')

    def percentage(authored, total):
        if not total:
            return '—'
        if authored == 0:
            return '0%'
        if authored == total:
            return '100%'
        return f'{authored / total:.1%}'

    rows = [
        '| 阶段 | 主题 | 知识点 | 已编写 | 待编写 | 正文完成度 |',
        '|---|---|---:|---:|---:|---:|',
    ]
    stages = {int(stage): counts for stage, counts in result['stages'].items()}
    for stage in sorted(set(titles) | set(stages)):
        counts = stages.get(stage, {'points': 0, 'authored': 0})
        total, authored = counts['points'], counts['authored']
        rows.append(f"| {stage} | {titles.get(stage, '未命名阶段')} | {total} | {authored} | {total - authored} | {percentage(authored, total)} |")
    total, authored = result['knowledge_points'], result['authored_points']
    rows.append(f'| **合计** | | **{total}** | **{authored}** | **{total - authored}** | **{percentage(authored, total)}** |')
    return '\n'.join(rows)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument('--report', action='store_true', help='Print stage coverage separately from learner checkboxes')
    output = parser.add_mutually_exclusive_group()
    output.add_argument('--json', action='store_true', help='Emit machine-readable results')
    output.add_argument('--table', action='store_true', help='Print the Markdown stage completion table from current files')
    parser.add_argument('--max-errors', type=int, default=30)
    args = parser.parse_args(argv)
    result = audit(args.root)
    if args.table:
        print(completion_table(args.root, result))
        for error in result['errors']:
            print(f"{error['file']}:{error['line']}: {error['reason']}: {error['target']}", file=sys.stderr)
    elif args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(f"Markdown {result['documents']} | local links {result['local_links']} | planned notes {result['planned_notes']} | errors {len(result['errors'])}")
        if args.report:
            print('stage | points | authored notes | learner checked')
            for stage, row in result['stages'].items():
                print(f"{stage:>5} | {row['points']:>6} | {row['authored']:>14} | {row['checked']:>15}")
            print(f"Authored/map: {result['authored_points']}/{result['knowledge_points']}; note files: {result['note_files']}")
            print('Checkboxes record learner progress; authored notes do not prove mastery or full content QA.')
        for error in result['errors'][:max(0, args.max_errors)]:
            print(f"{error['file']}:{error['line']}: {error['reason']}: {error['target']}")
        if len(result['errors']) > args.max_errors:
            print('More errors omitted; use --json or --max-errors.')
    return 1 if result['errors'] else 0


if __name__ == '__main__':
    sys.exit(main())
