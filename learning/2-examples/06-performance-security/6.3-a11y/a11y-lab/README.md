# 无障碍局部证据实验

固定axe-core4.14.1、Playwright1.65.1，Node26/pnpm11.4。先在本目录运行pnpm install --frozen-lockfile，再pnpm verify。

verify.mjs使用本包固定的Playwright工具和本机Google Chrome；可通过PLAYWRIGHT_MODULE与CHROME_PATH指向其他已准备的对应工具。实验只服务127.0.0.1:4505，结束在finally关闭服务和浏览器，不修改浏览器安全配置。

覆盖：正确页面axe WCAG标签扫描，Tab跳过导航、表单错误名称/描述/焦点和修正、dialog打开/Tab/Escape/还焦、390/1440按钮与reduce模式、320CSSpx及根字号200%重排检查；bad.html用于证明缺名称/alt/label会被真实检测；另按WCAG sRGB公式核验实际不透明CSS色值与白底的对比度，合计5组。

bad.html是明确受控失败样本，不是可交付UI。根字号放大只是局部文字缩放测试，不声称完成浏览器zoom UI或正式WCAG符合；DOM/角色检查不是实际屏幕阅读器。真实读屏、残障用户参与、多浏览器和真机另验。报告在docs/audits/stage-6-a11y-lab-runtime.json。
