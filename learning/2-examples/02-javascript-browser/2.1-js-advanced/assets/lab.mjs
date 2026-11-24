import {runExperiment} from './experiments.mjs';
const button = document.querySelector('#run');
button.addEventListener('click', async () => {
  const status = document.querySelector('#status'), output = document.querySelector('#output');
  button.disabled = true;
  status.textContent = '正在执行，请等待真实结果。';
  document.body.dataset.error = 'false';
  try {
    const value = await runExperiment(document.body.dataset.lesson);
    output.textContent = JSON.stringify(value,null,2);
    output.dataset.state = 'success';
    status.textContent = '实验完成。请比较预测与实际，并解释原因。';
  } catch (error) {
    document.body.dataset.error = 'true';
    output.dataset.state = 'error';
    output.textContent = error instanceof Error ? error.message : String(error);
    status.textContent = '实验未成功，请核对环境与错误。';
  } finally { button.disabled = false; }
});
