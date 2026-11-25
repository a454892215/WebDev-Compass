"""Quality records cannot pass with omissions, unresolved issues or stale sources."""
from pathlib import Path
import json,sys,unittest
sys.path.insert(0,str(Path(__file__).parents[1]))
import test_learning_delivery as delivery_tests
from check_stage_acceptance import audit,fingerprint,RULES
class AcceptanceTests(unittest.TestCase):
 setUp=delivery_tests.DeliveryTests.setUp
 tearDown=delivery_tests.DeliveryTests.tearDown
 write=delivery_tests.DeliveryTests.write
 fixture=delivery_tests.DeliveryTests.fixture
 def record(self):
  self.fixture();self.write('docs/AUTHORING.md','# Rules version 1')
  self.write('docs/review.md','# Review\nReviewed actual content and runtime limits.')
  self.write('docs/points.json',json.dumps([{'id':'1.1.1','result':'passed','evidence':'Mechanism, independent reproduction and task linkage reviewed.'}]))
  data={'schemaVersion':1,'ruleVersion':1,'stage':1,'status':'passed','reviewedAt':'2026-11-24','sourceFingerprint':fingerprint(self.root,1),'criteria':[{'id':r,'status':'passed','summary':'Reviewed required scope','evidence':['docs/review.md']} for r in sorted(RULES)],'pointReviews':['docs/points.json'],'findings':[],'verification':['docs/review.md']};self.save_record(data);return data
 def save_record(self,data):self.write('docs/stages/stage-1-acceptance.json',json.dumps(data))
 def test_complete_record_passes(self):self.record();self.assertEqual(audit(self.root,1)['errors'],[])
 def test_stale_source_invalidates_review(self):
  self.record();self.write('learning/2-examples/01/one.html','<h1>Changed behavior</h1>');self.assertTrue(any('source changed' in e for e in audit(self.root,1)['errors']))
 def test_missing_point_review_fails(self):
  self.record();self.write('docs/points.json','[]');self.assertTrue(any('coverage' in e for e in audit(self.root,1)['errors']))
 def test_unresolved_finding_blocks_pass(self):
  d=self.record();d['findings']=[{'id':'CORS','status':'open','blocking':True}];self.save_record(d);self.assertTrue(any('unresolved finding' in e for e in audit(self.root,1)['errors']))
 def test_missing_criterion_fails(self):
  d=self.record();d['criteria'].pop();self.save_record(d);self.assertTrue(any('R01-R09' in e for e in audit(self.root,1)['errors']))
 def test_missing_evidence_file_fails(self):
  self.record();(self.root/'docs/review.md').unlink();self.assertTrue(any('missing/empty evidence' in e for e in audit(self.root,1)['errors']))
 def test_shared_asset_change_invalidates_review(self):
  self.record();self.write('learning/2-examples/01/assets/shared.mjs','export const changed=true');self.assertTrue(any('source changed' in e for e in audit(self.root,1)['errors']))
 def test_generated_pnpm_cache_does_not_stale_review(self):
  self.record()
  for folder in ['.pnpm-store','coverage','test-results','playwright-report','.nyc_output','.vite','.turbo']:
   self.write(f'learning/2-examples/01/{folder}/generated.json','generated output')
   self.assertEqual(audit(self.root,1)['errors'],[])
 def test_rule_change_invalidates_review(self):
  self.record();self.write('docs/AUTHORING.md','# Revised rules');self.assertTrue(any('source changed' in e for e in audit(self.root,1)['errors']))
 def test_open_point_issue_blocks_pass(self):
  self.record();self.write('docs/points.json',json.dumps([{'id':'1.1.1','result':'passed','evidence':'Review recorded','openIssues':['Wrong CORS claim']}]))
  self.assertTrue(any('unresolved required' in e for e in audit(self.root,1)['errors']))
 def test_duplicate_point_review_blocks_pass(self):
  self.record();row={'id':'1.1.1','result':'passed','evidence':'Review recorded'};self.write('docs/points.json',json.dumps([row,row]));self.assertTrue(any('duplicate point' in e for e in audit(self.root,1)['errors']))
if __name__=='__main__':unittest.main()
