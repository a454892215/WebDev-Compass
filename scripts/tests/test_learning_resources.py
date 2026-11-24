"""Regression for migration links missed by the Markdown-only checker."""
from pathlib import Path
import sys,tempfile,unittest
sys.path.insert(0,str(Path(__file__).parents[1]))
from check_learning_resources import audit
class ResourceTests(unittest.TestCase):
 def setUp(self):self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)
 def tearDown(self):self.tmp.cleanup()
 def write(self,p,text):
  f=self.root/p;f.parent.mkdir(parents=True,exist_ok=True);f.write_text(text)
 def test_migration_return_link_is_checked(self):
  self.write('learning/2-examples/01/group/a.html','<a href="../../../learning/1-notes/a.md">笔记</a>');self.assertEqual(len(audit(self.root)['errors']),1)
 def test_script_src_and_image_candidates_are_checked(self):
  self.write('learning/a.html','<script src="missing.mjs"></script><img srcset="one.svg 1x, two.svg 2x">');self.assertEqual(len(audit(self.root)['errors']),3)
 def test_anchor_and_query_are_resolved(self):
  self.write('learning/a.html','<h1 id="target">标题</h1><a href="?q=x#target">跳转</a><a href="#absent">坏锚点</a>');self.assertEqual(len(audit(self.root)['errors']),1)
 def test_external_and_inline_script_text_are_not_local_links(self):
  self.write('learning/a.html','<a href="https://example.com">外链</a><script>const x=\'<img src="not-a-real-tag">\'</script>');self.assertEqual(audit(self.root)['errors'],[])
 def test_valid_sibling_and_root_paths_pass(self):
  self.write('learning/a.html','<a href="../README.md">根</a><script src="/learning/a.mjs"></script>');self.write('README.md','# root');self.write('learning/a.mjs','export {}');self.assertEqual(audit(self.root)['errors'],[])
if __name__=='__main__':unittest.main()
