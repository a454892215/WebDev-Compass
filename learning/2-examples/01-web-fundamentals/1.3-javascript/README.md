# JavaScript 基础实验

[返回阶段示例](../../README.md) · [JavaScript 章节](../../../1-notes/01-web-fundamentals/1.3-javascript/README.md)

从仓库根目录运行 `python3 -m http.server 4173 --bind 127.0.0.1`，通过HTTP访问实验。共享外壳用ES Module加载；不要用file URL的失败判断语言支持。

每页先点“运行本节实验”，事件/DOM主题再按页内控件操作。语言错误以捕获输出呈现，网络只访问本目录fixture。模块/顶层await是真实模块；fetch/XHR演示HTTP状态与JSON解析差异，非生产服务。

| 编号     | 实验                                                             | 笔记                                                                                                      |
| -------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1.3.1.1  | [运行](./1.3.1.1.var-demo.html)                                  | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.1.var.md)                                  |
| 1.3.1.2  | [运行](./1.3.1.2.string-number-boolean-null-undefined-demo.html) | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.2.string-number-boolean-null-undefined.md) |
| 1.3.1.3  | [运行](./1.3.1.3.typeof-demo.html)                               | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.3.typeof.md)                               |
| 1.3.1.4  | [运行](./1.3.1.4.number-demo.html)                               | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.4.number.md)                               |
| 1.3.1.5  | [运行](./1.3.1.5.item-1-3-1-5-demo.html)                         | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.5.item-1-3-1-5.md)                         |
| 1.3.1.6  | [运行](./1.3.1.6.if-else-demo.html)                              | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.6.if-else.md)                              |
| 1.3.1.7  | [运行](./1.3.1.7.for-demo.html)                                  | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.7.for.md)                                  |
| 1.3.1.8  | [运行](./1.3.1.8.this-demo.html)                                 | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.8.this.md)                                 |
| 1.3.1.9  | [运行](./1.3.1.9.item-1-3-1-9-demo.html)                         | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.9.item-1-3-1-9.md)                         |
| 1.3.1.10 | [运行](./1.3.1.10.closure-demo.html)                             | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.10.closure.md)                             |
| 1.3.1.11 | [运行](./1.3.1.11.map-demo.html)                                 | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)                                 |
| 1.3.1.12 | [运行](./1.3.1.12....-demo.html)                                 | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.12.....md)                                 |
| 1.3.1.13 | [运行](./1.3.1.13.slice-demo.html)                               | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.13.slice.md)                               |
| 1.3.1.14 | [运行](./1.3.1.14.js-dart-kotlin-swift-vs-demo.html)             | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.1.14.js-dart-kotlin-swift-vs.md)             |
| 1.3.2.1  | [运行](./1.3.2.1.class-demo.html)                                | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.1.class.md)                                |
| 1.3.2.2  | [运行](./1.3.2.2.import-demo.html)                               | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.2.import.md)                               |
| 1.3.2.3  | [运行](./1.3.2.3.then-demo.html)                                 | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.3.then.md)                                 |
| 1.3.2.4  | [运行](./1.3.2.4.async-demo.html)                                | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.4.async.md)                                |
| 1.3.2.5  | [运行](./1.3.2.5.item-1-3-2-5-demo.html)                         | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.5.item-1-3-2-5.md)                         |
| 1.3.2.6  | [运行](./1.3.2.6.map-demo.html)                                  | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.6.map.md)                                  |
| 1.3.2.7  | [运行](./1.3.2.7.item-1-3-2-7-demo.html)                         | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.7.item-1-3-2-7.md)                         |
| 1.3.2.8  | [运行](./1.3.2.8.await-demo.html)                                | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.2.8.await.md)                                |
| 1.3.3.1  | [运行](./1.3.3.1.dom-document-element-node-text-demo.html)       | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.1.dom-document-element-node-text.md)       |
| 1.3.3.2  | [运行](./1.3.3.2.getelementbyid-demo.html)                       | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.2.getelementbyid.md)                       |
| 1.3.3.3  | [运行](./1.3.3.3.createelement-demo.html)                        | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.3.createelement.md)                        |
| 1.3.3.4  | [运行](./1.3.3.4.setattribute-demo.html)                         | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.4.setattribute.md)                         |
| 1.3.3.5  | [运行](./1.3.3.5.textcontent-demo.html)                          | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.5.textcontent.md)                          |
| 1.3.3.6  | [运行](./1.3.3.6.offsetwidth-height-demo.html)                   | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.6.offsetwidth-height.md)                   |
| 1.3.3.7  | [运行](./1.3.3.7.dom-widget-flutter-rn-demo.html)                | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.3.7.dom-widget-flutter-rn.md)                |
| 1.3.4.1  | [运行](./1.3.4.1.addeventlistener-demo.html)                     | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.1.addeventlistener.md)                     |
| 1.3.4.2  | [运行](./1.3.4.2.item-1-3-4-2-demo.html)                         | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.2.item-1-3-4-2.md)                         |
| 1.3.4.3  | [运行](./1.3.4.3.event.target-demo.html)                         | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.3.event.target.md)                         |
| 1.3.4.4  | [运行](./1.3.4.4.preventdefault-demo.html)                       | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.4.preventdefault.md)                       |
| 1.3.4.5  | [运行](./1.3.4.5.click-demo.html)                                | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)                                |
| 1.3.4.6  | [运行](./1.3.4.6.event-delegation-demo.html)                     | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.6.event-delegation.md)                     |
| 1.3.4.7  | [运行](./1.3.4.7.customevent-demo.html)                          | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.4.7.customevent.md)                          |
| 1.3.5.1  | [运行](./1.3.5.1.item-1-3-5-1-demo.html)                         | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.1.item-1-3-5-1.md)                         |
| 1.3.5.2  | [运行](./1.3.5.2.xmlhttprequest-demo.html)                       | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.2.xmlhttprequest.md)                       |
| 1.3.5.3  | [运行](./1.3.5.3.fetch-api-demo.html)                            | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.3.fetch-api.md)                            |
| 1.3.5.4  | [运行](./1.3.5.4.try-catch-finally-demo.html)                    | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.4.try-catch-finally.md)                    |
| 1.3.5.5  | [运行](./1.3.5.5.settimeout-demo.html)                           | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.5.settimeout.md)                           |
| 1.3.5.6  | [运行](./1.3.5.6.json.parse-demo.html)                           | [笔记](../../../1-notes/01-web-fundamentals/1.3-javascript/1.3.5.6.json.parse.md)                           |

qa-cases.json给出各页独立操作和结果断言，供后台浏览器验证。移动视口通过不等于真机或Safari/WebView通过；无屏幕阅读器或真实后端验收承诺。

## POST 本地服务

静态服务适用于全部 42 个默认实验。要运行 Fetch 页额外的 POST 按钮，从仓库根目录运行：

```sh
node learning/2-examples/01-web-fundamentals/1.3-javascript/server.mjs
```

打开 `http://127.0.0.1:4174/learning/2-examples/01-web-fundamentals/1.3-javascript/1.3.5.3.fetch-api-demo.html`，先运行本节，再点 POST。应显示 `POST回显: 练习标题`。静态服务器不实现该 API，按钮会明确提示 HTTP 错误；不把它视为 Fetch API 失效。

该零依赖服务只绑定回环地址、限制请求体长度、校验 JSON 与 title 类型，不写入文件；仅用于教学，不是生产后端。Ctrl+C 退出。若端口冲突可设置 `PORT=4175`。
