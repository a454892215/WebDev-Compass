"""Regression tests for navigation parsing and planned-content boundaries."""
import importlib.util
from contextlib import redirect_stdout, redirect_stderr
from io import StringIO
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

    def test_pnpm_cache_documents_are_not_course_content(self):
        self.write('README.md', '# Root')
        for folder in ['.pnpm-store', 'coverage', 'test-results', 'playwright-report', '.nyc_output', '.vite', '.turbo']:
            self.write(f'{folder}/vendor/README.md', '[generated link](missing.md)')
        self.assertEqual(module.audit(self.root)['errors'], [])

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
        self.write('knowledge-map/01-test.md', '- [ ] [1.1.1 Future](../learning/1-notes/01-topic/1.1.1.future.md)\n')
        r = module.audit(self.root)
        self.assertEqual((r['planned_notes'], r['knowledge_points'], len(r['errors'])), (1, 1, 0))
        self.write('knowledge-map/01-test.md', '- [ ] [1.1.1 Future](./learning/1-notes/01-topic/1.1.1.future.md)\n')
        self.assertEqual(len(module.audit(self.root)['errors']), 1)

    def test_checked_future_note_and_body_links_fail(self):
        self.write('knowledge-map/01-test.md', '- [x] [1.1.1 Missing](../learning/1-notes/01-topic/1.1.1.missing.md)\n')
        self.write('README.md', '[Missing](learning/1-notes/01-topic/1.1.1.missing.md)\n')
        r = module.audit(self.root)
        self.assertEqual(len(r['errors']), 2)
        self.assertEqual(r['planned_notes'], 0)

    def test_repeat_links_count_one_knowledge_point_and_do_not_mark_learner(self):
        self.write('learning/1-notes/01-topic/1.1.1.present.md', '# Existing\n')
        self.write('knowledge-map/01-test.md', '- [ ] [1.1.1](../learning/1-notes/01-topic/1.1.1.present.md) [extra](../learning/1-notes/01-topic/1.1.1.present.md)\n')
        r = module.audit(self.root)
        self.assertEqual((r['knowledge_points'], r['authored_points']), (1, 1))
        self.assertEqual(r['stages'][1]['checked'], 0)
        self.write('knowledge-map/01-test.md', '- [ ] [1.1.1](../learning/1-notes/01-topic/1.1.1.present.md)\n[chapter reference](../learning/1-notes/01-topic/1.1.1.present.md)\n')
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
        self.write('scripts/data/senior_stages.md', '- [ ] [8.1.1](./learning/1-notes/08-topic/8.1.1.future.md)\n')
        self.write('knowledge-map/04-test.md', '- [ ] [8.1.1](../learning/1-notes/08-topic/8.1.1.future.md)\n')
        r = module.audit(self.root)
        self.assertEqual((r['knowledge_points'], r['planned_notes'], len(r['errors'])), (1, 1, 0))

    def test_completion_table_updates_from_files_not_learner_checks(self):
        self.write('knowledge-map/01-test.md', '## 阶段 1：HTML\n- [ ] [1.1.1](../learning/1-notes/01-topic/1.1.1.one.md)\n- [ ] [1.1.2](../learning/1-notes/01-topic/1.1.2.two.md)\n## 阶段 2：浏览器\n- [ ] [2.1.1](../learning/1-notes/02-topic/2.1.1.three.md)\n')
        self.write('learning/1-notes/01-topic/1.1.1.one.md', '# One\n')
        first = module.completion_table(self.root, module.audit(self.root))
        self.assertIn('| 1 | HTML | 2 | 1 | 1 | 50.0% |', first)
        self.assertIn('| 2 | 浏览器 | 1 | 0 | 1 | 0% |', first)
        self.assertIn('**33.3%**', first)
        self.write('learning/1-notes/01-topic/1.1.2.two.md', '# Two\n')
        second = module.completion_table(self.root, module.audit(self.root))
        self.assertIn('| 1 | HTML | 2 | 2 | 0 | 100% |', second)
        self.assertIn('**66.7%**', second)

    def test_completion_table_empty_stage_has_no_division_by_zero(self):
        self.write('knowledge-map/01-test.md', '## 阶段 0：空阶段\n')
        table = module.completion_table(self.root, module.audit(self.root))
        self.assertIn('| 0 | 空阶段 | 0 | 0 | 0 | — |', table)
        self.assertIn('| **合计** | | **0** | **0** | **0** | **—** |', table)

    def test_table_cli_reports_broken_links_instead_of_silent_success(self):
        self.write('README.md', '[Broken](missing.md)\n')
        stdout, stderr = StringIO(), StringIO()
        with redirect_stdout(stdout), redirect_stderr(stderr):
            code = module.main(['--root', str(self.root), '--table'])
        self.assertEqual(code, 1)
        self.assertIn('| 阶段 | 主题 |', stdout.getvalue())
        self.assertIn('missing file: missing.md', stderr.getvalue())


if __name__ == '__main__':
    unittest.main()
