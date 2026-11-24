#!/usr/bin/env python3
"""Validate four-part delivery for every authored knowledge point.

Planned notes may remain missing. Once a mapped note exists, a stage manifest must
connect it to a real example, an exercise with acceptance/debug/reference sections,
and a task in a shared integrated project. This proves structure, not mastery.
"""
from __future__ import annotations
import argparse
import json
from pathlib import Path
import re
import sys
from urllib.parse import urlsplit, unquote
from check_knowledge import links_in, resolve_link, anchors_in, POINT

PARTS = {'theory':'1-notes','example':'2-examples','exercise':'3-exercises','practice':'4-practice'}
EXERCISE_HEADINGS = ['## 动手任务','## 验收标准','## 排错任务','## 参考要点']


def inventory(root):
    points = {}
    for source in sorted((root/'knowledge-map').glob('0*.md')):
        for link in links_in(source.read_text(encoding='utf-8')):
            if not link.checkbox:
                continue
            resolved = resolve_link(source, link.target, root)
            if not resolved:
                continue
            path, _ = resolved
            try: rel = path.relative_to(root)
            except ValueError: continue
            if not POINT.match(path.name):
                continue
            if rel.parts[:2] != ('learning','1-notes'):
                raise ValueError(f'knowledge point must use learning/1-notes: {rel}')
            identifier = POINT.match(path.name)[1]
            if identifier in points:
                if points[identifier] != path: raise ValueError(f'duplicate ID: {identifier}')
            points[identifier] = path
    return points


def local_file(root, raw, part):
    if not isinstance(raw,str) or not raw.strip(): raise ValueError('missing path')
    parsed=urlsplit(raw)
    if parsed.scheme or parsed.netloc or parsed.query: raise ValueError('must be a local path without query')
    path=Path(unquote(parsed.path))
    if path.is_absolute(): raise ValueError('must be repository-relative')
    actual=(root/path).resolve()
    try: rel=actual.relative_to(root)
    except ValueError: raise ValueError('path escapes repository')
    if rel.parts[:2] != ('learning',PARTS[part]): raise ValueError(f'expected learning/{PARTS[part]}')
    if not actual.is_file(): raise ValueError('missing file')
    if parsed.fragment and parsed.fragment not in anchors_in(actual): raise ValueError('missing anchor')
    if actual.stat().st_size == 0: raise ValueError('empty file')
    return actual,unquote(parsed.fragment)


def audit(root, stage=None):
    root=root.resolve(); errors=[]; passed=[]
    try: points=inventory(root)
    except ValueError as exc:return {'authored':0,'passed':0,'errors':[str(exc)],'points':[]}
    authored={key:path for key,path in points.items() if path.is_file() and (stage is None or int(key.split('.')[0])==stage)}
    manifests={}
    for number in sorted({int(key.split('.')[0]) for key in authored}):
        file=root/'docs/stages'/f'stage-{number}.json'
        try:
            data=json.loads(file.read_text(encoding='utf-8'))
            if data.get('schemaVersion')!=1 or data.get('stage')!=number or not isinstance(data.get('points'),list):raise ValueError('invalid schema/stage/points')
            project,_=local_file(root,data.get('project'),'practice')
            if project.suffix not in {'.html','.mjs','.js','.ts'}:raise ValueError('project must have a runnable code entry')
            entries={}
            for row in data['points']:
                identifier=row.get('id')
                if identifier in entries:raise ValueError(f'duplicate manifest ID: {identifier}')
                if identifier not in points or int(identifier.split('.')[0])!=number:raise ValueError(f'unknown/mismatched ID: {identifier}')
                entries[identifier]=row
            manifests[number]=entries
        except (OSError,ValueError,TypeError,AttributeError) as exc:errors.append(f'stage {number}: {exc}')
    for identifier,expected_note in authored.items():
        row=manifests.get(int(identifier.split('.')[0]),{}).get(identifier)
        if not row:
            errors.append(f'{identifier}: missing four-part manifest entry');continue
        try:
            resolved={part:local_file(root,row.get(part),part) for part in PARTS}
            theory=resolved['theory'][0]
            if theory!=expected_note:raise ValueError('theory path does not match knowledge map')
            text=theory.read_text(encoding='utf-8')
            if identifier not in text.splitlines()[0] or len(text)<300:raise ValueError('theory title/content is incomplete')
            exercise=resolved['exercise'][0].read_text(encoding='utf-8')
            if any(heading not in exercise for heading in EXERCISE_HEADINGS):raise ValueError('exercise lacks task/acceptance/debug/reference section')
            if len(re.findall(r'^- \[[ xX]\]',exercise,re.M))<2:raise ValueError('exercise needs at least two acceptance checks')
            if identifier not in exercise.splitlines()[0]:raise ValueError('exercise title must identify the point')
            if not resolved['practice'][1]:raise ValueError('practice must link a specific task anchor')
            practice,fragment=resolved['practice']
            content=practice.read_text(encoding='utf-8')
            marker=f'id="{fragment}"'
            start=content.find(marker)
            if start<0:raise ValueError('practice task requires an explicit stable anchor')
            section=content[start:].split('<a id=',1)[0]
            if identifier not in section or len(re.findall(r'^- \[[ xX]\]',section,re.M))<2:raise ValueError('practice task lacks ID or acceptance checks')
            passed.append(identifier)
        except (OSError,ValueError,TypeError) as exc:errors.append(f'{identifier}: {exc}')
    return {'authored':len(authored),'passed':len(passed),'errors':errors,'points':passed,'scope':'Structural four-part coverage only; does not prove correctness, learner completion, browser or production readiness.'}


def main(argv=None):
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--root',type=Path,default=Path(__file__).resolve().parent.parent)
    p.add_argument('--stage',type=int)
    p.add_argument('--json',action='store_true')
    args=p.parse_args(argv);result=audit(args.root,args.stage)
    if args.json:print(json.dumps(result,ensure_ascii=False,indent=2))
    else:
        print(f"Four-part delivery: {result['passed']}/{result['authored']} authored points; errors {len(result['errors'])}")
        for message in result['errors']:print(message)
        print(result['scope'])
    return 1 if result['errors'] else 0

if __name__=='__main__':sys.exit(main())
