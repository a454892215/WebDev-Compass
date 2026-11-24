#!/usr/bin/env python3
"""Validate stage quality attestations and evidence freshness, not prose semantics."""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path
from urllib.parse import urlsplit,unquote
from check_knowledge import anchors_in,SKIP_DIRS
from check_learning_delivery import audit as delivery_audit,inventory

RULES={f'R{i:02}' for i in range(1,10)}
SKIP=SKIP_DIRS|{'dist','build','out'}

def fingerprint(root,stage):
    root=Path(root).resolve();manifest=root/'docs/stages'/f'stage-{stage}.json'
    data=json.loads(manifest.read_text());files={manifest,root/'docs/AUTHORING.md'};folders=set()
    for row in data['points']:
        for part in ('theory','example','exercise','practice'):
            path=Path(urlsplit(row[part]).path)
            # Each part's stage folder includes shared assets and indexes.
            folder=(root/Path(*path.parts[:3])).resolve()
            if not folder.is_relative_to(root):raise ValueError('fingerprint source escapes repository')
            folders.add(folder)
    project=(root/Path(data['project'])).resolve()
    if not project.is_relative_to(root):raise ValueError('fingerprint project escapes repository')
    folders.add(project.parent)
    for folder in folders:
        for p in folder.rglob('*'):
            if not p.is_file() or any(x in SKIP for x in p.relative_to(root).parts):continue
            if p.is_symlink():continue
            files.add(p)
    digest=hashlib.sha256()
    for p in sorted(files):
        rel=p.relative_to(root).as_posix();digest.update(rel.encode());digest.update(b'\0');digest.update(p.read_bytes());digest.update(b'\0')
    return digest.hexdigest()

def evidence_file(root,raw):
    if not isinstance(raw,str):raise ValueError('evidence path must be text')
    parsed=urlsplit(raw)
    if parsed.scheme or parsed.netloc or parsed.query:raise ValueError('evidence must be repository-relative')
    path=(root/unquote(parsed.path)).resolve()
    try:path.relative_to(root)
    except ValueError:raise ValueError('evidence escapes repository')
    if not path.is_file() or not path.stat().st_size:raise ValueError(f'missing/empty evidence: {raw}')
    if parsed.fragment and unquote(parsed.fragment) not in anchors_in(path):raise ValueError(f'missing evidence anchor: {raw}')
    return path

def audit(root,stage):
    root=Path(root).resolve();errors=[];expected=set()
    try:
        expected={i for i in inventory(root) if int(i.split('.')[0])==stage}
        if not expected:raise ValueError('unknown or empty stage')
        delivery=delivery_audit(root,stage)
        if delivery['errors']:errors.extend(delivery['errors'])
        if delivery['authored']!=len(expected):errors.append('stage is only partially authored')
        record=json.loads((root/'docs/stages'/f'stage-{stage}-acceptance.json').read_text())
        if record.get('schemaVersion')!=1 or record.get('ruleVersion')!=1 or record.get('stage')!=stage:raise ValueError('invalid schema/rule version/stage')
        if record.get('status')!='passed':errors.append('stage is not accepted')
        if not record.get('reviewedAt'):errors.append('missing review date')
        if record.get('sourceFingerprint')!=fingerprint(root,stage):errors.append('source changed since review; refresh affected review and evidence')
        criteria=record.get('criteria',[])
        if len(criteria)!=9 or {x.get('id') for x in criteria}!=RULES:errors.append('R01-R09 must each appear once')
        for rule in criteria:
            if rule.get('status')!='passed' or not rule.get('summary','').strip():errors.append(f"{rule.get('id')}: missing passed review/summary")
            if not rule.get('evidence'):errors.append(f"{rule.get('id')}: missing evidence")
            for ref in rule.get('evidence',[]):evidence_file(root,ref)
        reviewed={}
        for ref in record.get('pointReviews',[]):
            data=json.loads(evidence_file(root,ref).read_text())
            rows=data if isinstance(data,list) else data['points']
            for row in rows:
                identifier=row.get('id')
                if identifier in reviewed:errors.append(f'duplicate point review: {identifier}')
                reviewed[identifier]=row
                if row.get('result')!='passed' or not row.get('evidence'):errors.append(f'{identifier}: no passed substantive review')
                if row.get('openIssues'):errors.append(f'{identifier}: unresolved required issues')
        if set(reviewed)!=expected:errors.append(f'point review coverage differs: missing {sorted(expected-set(reviewed))}; extra {sorted(set(reviewed)-expected)}')
        for item in record.get('findings',[]):
            if item.get('blocking',True) and item.get('status')!='closed':errors.append(f"unresolved finding: {item.get('id')}")
        for ref in record.get('verification',[]):evidence_file(root,ref)
        if not record.get('verification'):errors.append('missing verification evidence')
    except (OSError,ValueError,KeyError,TypeError,AttributeError) as exc:errors.append(str(exc))
    return {'stage':stage,'points':len(expected),'status':'failed' if errors else 'passed','errors':errors,'scope':'Checks completeness and freshness of recorded reviews; does not independently certify technical correctness or learner mastery.'}

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--root',type=Path,default=Path(__file__).resolve().parent.parent)
    p.add_argument('--stage',type=int,action='append',required=True)
    p.add_argument('--json',action='store_true')
    p.add_argument('--fingerprint',action='store_true',help='Print source digest only; does not refresh or accept a review')
    a=p.parse_args()
    if a.fingerprint:
        try:
            result={str(stage):fingerprint(a.root,stage) for stage in a.stage}
        except (OSError,ValueError,KeyError,TypeError) as exc:
            print(f'Fingerprint failed: {exc}');return True
        print(json.dumps(result,ensure_ascii=False,indent=2));return False
    results=[audit(a.root,s) for s in a.stage]
    if a.json:print(json.dumps(results,ensure_ascii=False,indent=2))
    else:
        for r in results:
            print(f"Stage {r['stage']}: {r['status']} ({r['points']} point reviews required)")
            for e in r['errors']:print('  '+e)
        print('Recorded review gate only; not an automatic semantic or mastery assessment.')
    return any(r['errors'] for r in results)
if __name__=='__main__':raise SystemExit(main())
