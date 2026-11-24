"""Meaningful failure cases for the four-part authored-content gate."""
import importlib.util
from pathlib import Path
import sys
import tempfile
import unittest
sys.path.insert(0,str(Path(__file__).parents[1]))
from check_learning_delivery import audit

class DeliveryTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)
    def tearDown(self):self.tmp.cleanup()
    def write(self,path,content):
        p=self.root/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(content);return p
    def fixture(self):
        import json
        self.write('knowledge-map/01-test.md','## 阶段 1：基础\n- [ ] [1.1.1](../learning/1-notes/01/1.1.1.one.md)\n')
        self.write('learning/1-notes/01/1.1.1.one.md','# 1.1.1 原理\n\n'+('具体机制、限制和实验。'*40))
        self.write('learning/2-examples/01/one.html','<!doctype html><h1>Example</h1>')
        self.write('learning/3-exercises/01/1.1.1.one.md','# 1.1.1 练习\n\n## 动手任务\n修改实际程序。\n## 验收标准\n- [ ] 结果匹配。\n- [ ] 错误可解释。\n## 排错任务\n复现故障。\n## 参考要点\n给出取舍。\n')
        self.write('learning/4-practice/01/index.html','<!doctype html><h1>Project</h1>')
        self.write('learning/4-practice/01/tasks.md','<a id="p-1-1-1"></a>\n## 1.1.1 综合任务\n- [ ] 实现。\n- [ ] 验证。\n')
        data={'schemaVersion':1,'stage':1,'project':'learning/4-practice/01/index.html','points':[{'id':'1.1.1','theory':'learning/1-notes/01/1.1.1.one.md','example':'learning/2-examples/01/one.html','exercise':'learning/3-exercises/01/1.1.1.one.md','practice':'learning/4-practice/01/tasks.md#p-1-1-1'}]}
        self.write('docs/stages/stage-1.json',json.dumps(data));return data
    def save(self,data):
        import json
        self.write('docs/stages/stage-1.json',json.dumps(data))
    def test_complete_unchecked_authored_point_passes(self):
        self.fixture();r=audit(self.root);self.assertEqual((r['authored'],r['passed'],r['errors']),(1,1,[]))
    def test_planned_note_is_not_falsely_required(self):
        self.write('knowledge-map/01-test.md','- [ ] [1.1.1](../learning/1-notes/01/1.1.1.one.md)\n')
        self.assertEqual(audit(self.root)['errors'],[])
    def test_wrong_map_directory_cannot_silently_skip_point(self):
        self.write('knowledge-map/01-test.md','- [ ] [1.1.1](../notes/01/1.1.1.one.md)\n')
        self.assertTrue(any('learning/1-notes' in e for e in audit(self.root)['errors']))
    def test_authored_point_without_manifest_fails(self):
        self.fixture();(self.root/'docs/stages/stage-1.json').unlink()
        self.assertTrue(any('missing four-part' in e for e in audit(self.root)['errors']))
    def test_reference_to_wrong_part_fails(self):
        data=self.fixture();data['points'][0]['exercise']=data['points'][0]['theory'];self.save(data)
        self.assertTrue(any('3-exercises' in e for e in audit(self.root)['errors']))
    def test_missing_practice_anchor_fails(self):
        data=self.fixture();data['points'][0]['practice']='learning/4-practice/01/tasks.md#missing';self.save(data)
        self.assertTrue(any('missing anchor' in e for e in audit(self.root)['errors']))
    def test_empty_acceptance_is_not_delivery(self):
        self.fixture();self.write('learning/3-exercises/01/1.1.1.one.md','# 1.1.1\n## 动手任务\n## 验收标准\n## 排错任务\n## 参考要点\n')
        self.assertTrue(any('acceptance' in e for e in audit(self.root)['errors']))
    def test_duplicate_manifest_id_fails(self):
        data=self.fixture();data['points'].append(dict(data['points'][0]));self.save(data)
        self.assertTrue(any('duplicate manifest' in e for e in audit(self.root)['errors']))
    def test_path_escape_fails(self):
        data=self.fixture();data['points'][0]['example']='../outside.html';self.save(data)
        self.assertTrue(any('escapes' in e for e in audit(self.root)['errors']))
    def test_wrong_theory_mapping_fails(self):
        data=self.fixture();self.write('learning/1-notes/01/another.md','# Other\n'+('x'*400));data['points'][0]['theory']='learning/1-notes/01/another.md';self.save(data)
        self.assertTrue(any('does not match' in e for e in audit(self.root)['errors']))

if __name__=='__main__':unittest.main()
