#!/usr/bin/env python3
"""Check local HTML resource/navigation URLs in learning; does not fetch the web."""
from __future__ import annotations
import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urlsplit
from check_knowledge import anchors_in, SKIP_DIRS

class References(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.references=[]
        self.ids=set()
        self.base=None
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if attrs.get('id'):self.ids.add(attrs['id'])
        if tag=='base' and 'href' in attrs:self.base=attrs['href']
        for name in ('href','src','poster'):
            if name in attrs and tag!='base':self.references.append((self.getpos()[0],name,attrs[name]))
        # Teaching fixtures use ordinary URL candidates. Data URLs may contain
        # commas, so leave data srcsets to browser validation rather than split.
        if 'srcset' in attrs and 'data:' not in attrs['srcset']:
            for candidate in attrs['srcset'].split(','):
                fields=candidate.strip().split()
                if fields:self.references.append((self.getpos()[0],'srcset',fields[0]))
    handle_startendtag=handle_starttag

def vite_public_target(source, path):
    """Resolve an existing default publicDir asset only for a Vite root entry.

    Custom publicDir/base settings still require explicit build/browser review.
    Never use this fallback to hide parent traversal or a symlink out of project.
    """
    relative=Path(path)
    if source.name!='index.html' or not path or relative.is_absolute() or '..' in relative.parts:return None
    if not any((source.parent/f'vite.config.{suffix}').is_file() for suffix in ('js','ts','mjs','mts','cjs','cts')):return None
    public=(source.parent/'public').resolve()
    if not public.is_relative_to(source.parent.resolve()):return None
    candidate=(public/relative).resolve()
    return candidate if candidate.is_relative_to(public) and candidate.exists() else None

def audit(root):
    root=Path(root).resolve();errors=[];count=0;files=0
    for source in sorted((root/'learning').rglob('*.html')):
        if any(part in SKIP_DIRS|{'dist','build'} for part in source.relative_to(root).parts):continue
        files+=1;parser=References();parser.feed(source.read_text(encoding='utf-8'))
        if parser.base is not None:
            errors.append({'file':str(source.relative_to(root)),'reason':'base href needs explicit browser review; unsupported by offline checker'})
            continue
        for line,attribute,raw in parser.references:
            parsed=urlsplit(raw)
            if parsed.scheme or parsed.netloc:continue
            count+=1;path=unquote(parsed.path)
            target=(root/path.lstrip('/') if path.startswith('/') else source.parent/path).resolve() if path else source
            try:target.relative_to(root)
            except ValueError:
                reason='path escapes repository'
            else:
                reason=None
                if not target.exists():target=vite_public_target(source,path) or target
                if not target.exists():reason='missing target'
                elif parsed.fragment and target.suffix in {'.md','.html','.svg'} and unquote(parsed.fragment) not in anchors_in(target):reason='missing anchor'
            if reason:errors.append({'file':str(source.relative_to(root)),'line':line,'attribute':attribute,'target':raw,'reason':reason})
    return {'html_files':files,'local_references':count,'errors':errors,'scope':'Static HTML href/src/poster/plain srcset only; dynamic JS/CSS URLs and external availability require separate checks.'}

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--root',type=Path,default=Path(__file__).resolve().parent.parent);p.add_argument('--json',action='store_true');a=p.parse_args();result=audit(a.root)
    if a.json:print(json.dumps(result,ensure_ascii=False,indent=2))
    else:
        print(f"HTML resources: {result['html_files']} pages, {result['local_references']} local references, {len(result['errors'])} errors")
        for e in result['errors']:print(e)
    return bool(result['errors'])
if __name__=='__main__':raise SystemExit(main())
