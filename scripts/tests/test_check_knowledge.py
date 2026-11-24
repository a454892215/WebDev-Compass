"""Regression tests for navigation parsing and planned-content boundaries."""
import importlib.util
from pathlib import Path
import sys
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location('check_knowledge', Path(__file__).parents[1] / 'check_knowledge.py')
module = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = module
SPEC.loader.exec_module(module)


class KnowledgeAuditTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)

    def tearDown(self):
        self.temp.cleanup()

    def write(self, name, content):
        p = self.root / name
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(content, encoding='utf-8')
        return p

    def test_code_does_not_create_false_links(self):
        text = '''`[not a link](missing.md)`
```md
[also ignored](missing.md)
```
~~~html
[ignored too](missing.md)
~~~
[actual `label`](real.md)
'''
        self.assertEqual([(x.line, x.target) for x in module.links_in(text)], [(8, 'real.md')])

    def test_unchecked_future_note_is_planned_but_wrong_parent_is_error(self):
        self.write('knowledge-map/01-test.md', '- [ ] [1.1.1 Future](../notes/01-topic/1.1.1.future.md)\n')
        r = module.audit(self.root)
        self.assertEqual((r['planned_notes'], r['knowledge_points'], len(r['errors'])), (1, 1, 0))
        self.write('knowledge-map/01-test.md', '- [ ] [1.1.1 Future](./notes/01-topic/1.1.1.future.md)\n')
        self.assertEqual(len(module.audit(self.root)['errors']), 1)

    def test_checked_future_note_and_body_links_fail(self):
        self.write('knowledge-map/01-test.md', '- [x] [1.1.1 Missing](../notes/01-topic/1.1.1.missing.md)\n')
        self.write('README.md', '[Missing](notes/01-topic/1.1.1.missing.md)\n')
        r = module.audit(self.root)
        self.assertEqual(len(r['errors']), 2)
        self.assertEqual(r['planned_notes'], 0)

    def test_repeat_links_count_one_knowledge_point_and_do_not_mark_learner(self):
        self.write('notes/01-topic/1.1.1.present.md', '# Existing\n')
        self.write('knowledge-map/01-test.md', '- [ ] [1.1.1](../notes/01-topic/1.1.1.present.md) [extra](../notes/01-topic/1.1.1.present.md)\n')
        r = module.audit(self.root)
        self.assertEqual((r['knowledge_points'], r['authored_points']), (1, 1))
        self.assertEqual(r['stages'][1]['checked'], 0)
        self.write('knowledge-map/01-test.md', '- [ ] [1.1.1](../notes/01-topic/1.1.1.present.md)\n[chapter reference](../notes/01-topic/1.1.1.present.md)\n')
        self.assertEqual(module.audit(self.root)['stages'][1]['checked'], 0)

    def test_same_document_unicode_and_duplicate_heading_anchors(self):
        self.write('README.md', '# 中文标题\n## 示例\n## 示例\n[one](#中文标题) [two](#示例-1)\n[bad](#not-here)\n')
        r = module.audit(self.root)
        self.assertEqual(len(r['errors']), 1)
        self.assertEqual(r['errors'][0]['reason'], 'missing anchor')

    def test_angle_path_spaces_balanced_parentheses_and_line_suffix(self):
        target = self.write('my doc(1).md', '# Here\n')
        self.write('README.md', f'[space](<my doc(1).md#here>) [absolute](<{target}:12>)\n')
        self.assertEqual(module.audit(self.root)['errors'], [])
        self.write('other(1).md', '# Also\n')
        self.assertEqual([x.target for x in module.links_in('[nested](other(1).md)')], ['other(1).md'])

    def test_code_element_in_heading_has_text_slug_not_html_semantics(self):
        self.write('README.md', '# `<dialog>` 与 **焦点**\n[works](#dialog-与-焦点)\n`<span id="fake">`\n[bad](#fake)\n')
        r = module.audit(self.root)
        self.assertEqual(len(r['errors']), 1)
        self.assertEqual(r['errors'][0]['target'], '#fake')

    def test_html_element_id_is_checked(self):
        self.write('demo.html', '<main id="content"><h1>Hello</h1></main>')
        self.write('README.md', '[works](demo.html#content) [fails](demo.html#missing)\n')
        r = module.audit(self.root)
        self.assertEqual(len(r['errors']), 1)
        self.assertEqual(r['errors'][0]['target'], 'demo.html#missing')

    def test_generator_inputs_resolve_at_output_root_without_double_counting(self):
        self.write('README.md', '# Read me\n')
        self.write('scripts/map_header.md', '[root](./README.md)\n')
        self.write('scripts/data/senior_stages.md', '- [ ] [8.1.1](./notes/08-topic/8.1.1.future.md)\n')
        self.write('knowledge-map/04-test.md', '- [ ] [8.1.1](../notes/08-topic/8.1.1.future.md)\n')
        r = module.audit(self.root)
        self.assertEqual((r['knowledge_points'], r['planned_notes'], len(r['errors'])), (1, 1, 0))


if __name__ == '__main__':
    unittest.main()
