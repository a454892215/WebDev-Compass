// Official-configuration reading exercise only; PM2 is not installed/run by this lab.
module.exports = { apps: [{ name: 'bff', script: '.output/server/index.mjs',
  exec_mode: 'cluster', instances: 2, kill_timeout: 5000,
  env: { NODE_ENV: 'production' },
}] }
