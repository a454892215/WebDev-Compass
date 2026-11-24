// 阅读示例：在独立Webpack项目中才使用；本Vite项目不执行这个配置。
const path = require('node:path');
module.exports = {mode:'production',entry:'./src/main.js',output:{path:path.resolve(__dirname,'dist'),filename:'app.js'}};
