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
 def test_vite_entry_resolves_existing_default_public_assets(self):
  self.write('learning/vite/vite.config.ts','export default {}')
  self.write('learning/vite/index.html','<img src="./banner.svg"><a href="./offline/">offline</a>')
  self.write('learning/vite/public/banner.svg','<svg/>');self.write('learning/vite/public/offline/index.html','<h1>Offline</h1>')
  self.assertEqual(audit(self.root)['errors'],[])
 def test_public_fallback_does_not_mask_missing_config_or_parent_traversal(self):
  self.write('learning/plain/index.html','<img src="./banner.svg">');self.write('learning/plain/public/banner.svg','<svg/>')
  self.write('learning/vite/vite.config.ts','export default {}');self.write('learning/vite/index.html','<img src="../escape.svg"><img src="missing.svg">')
  self.write('learning/vite/escape.svg','<svg/>');self.write('learning/vite/public/keep.txt','asset')
  self.assertEqual(len(audit(self.root)['errors']),3)
 def test_vite_public_symlink_cannot_escape_its_project(self):
  self.write('learning/vite/vite.config.ts','export default {}');self.write('learning/vite/index.html','<img src="banner.svg">')
  self.write('external/banner.svg','<svg/>');(self.root/'learning/vite/public').symlink_to(self.root/'external',target_is_directory=True)
  self.assertEqual(len(audit(self.root)['errors']),1)
if __name__=='__main__':unittest.main()
