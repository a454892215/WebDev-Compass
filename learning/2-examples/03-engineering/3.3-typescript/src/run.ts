import { purpose, basics, aliases, unions, generics, narrowing, functions, classes, modules, config, vue, mobileBoundary } from './experiments.js';
const experiments = [purpose, basics, aliases, unions, generics, narrowing, functions, classes, modules, config, vue, mobileBoundary];
for (const [index, run] of experiments.entries()) console.log(JSON.stringify({ id: `3.3.${index + 1}`, result: run() }));
