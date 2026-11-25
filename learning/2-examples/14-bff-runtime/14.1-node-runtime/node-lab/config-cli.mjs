import { readConfig, publicConfig } from './config.mjs'
console.log(JSON.stringify(publicConfig(readConfig(process.env))))
