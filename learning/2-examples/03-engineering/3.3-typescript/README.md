# 3.3 TypeScript真实编译实验

本包覆盖12个知识点，使用真实TypeScript编译器，不用网页模拟诊断。前置是JS/ESM与3.1包管理；Vue例仅作类型桥接，不要求先学完整Vue。

```bash
# 仓库根目录
cd learning/2-examples/03-engineering/3.3-typescript
pnpm install --frozen-lockfile
pnpm check
```

固定TypeScript6.0.3、Vue3.5.46、pnpm11.4.0；Node要求24.15+的24主线或26+，本轮为26.0.0。TS版本与本轮typescript-eslint范围兼容，不直接取latest。首次安装需要访问公共npm注册表；锁文件固定解析结果。没有全局安装，也不修改宿主项目依赖。

`typecheck`执行tsc --noEmit；`build`由tsc生成JS与声明到忽略的dist；verify.mjs运行12正例、12编译反例、有效/过期expect-error、路径别名不重写与输出边界，共27项。编译与运行都通过才完成，不把转译成功等同类型安全。临时反例验证后删除。

正例核心集中在src/experiments.ts的12个不同函数，src/run.ts只执行并打印真实返回值；模块和.d.ts实验另有文件。逐点入口如下：

- [3.3.1 TypeScript解决什么问题与类型擦除](./3.3.1.typescript-ide-demo.md)
- [3.3.2 基础类型、unknown、元组与enum](./3.3.2.string-demo.md)
- [3.3.3 interface与type：结构契约和声明合并](./3.3.3.interface-demo.md)
- [3.3.4 联合、交叉与可辨识状态](./3.3.4.item-3-3-4-demo.md)
- [3.3.5 泛型约束与常用工具类型](./3.3.5.extends-demo.md)
- [3.3.6 断言、类型守卫与unknown数据入口](./3.3.6.typeof-demo.md)
- [3.3.7 函数参数、返回值与回调契约](./3.3.7.item-3-3-7-demo.md)
- [3.3.8 类修饰符、readonly与#private的边界](./3.3.8.public-demo.md)
- [3.3.9 ES模块、type-only import与声明文件](./3.3.9..d.ts-demo.md)
- [3.3.10 strict、target、module与paths](./3.3.10.tsconfig.json-demo.md)
- [3.3.11 Vue Props、事件与composable类型预告](./3.3.11.react-vue-ts-props-demo.md)
- [3.3.12 TypeScript、Dart与Kotlin：可迁移经验和边界](./3.3.12.typescript-dart-kotlin-demo.md)

[理论目录](../../../1-notes/03-engineering/3.3-typescript/README.md) · [独立练习](../../../3-exercises/03-engineering/3.3-typescript/README.md)

Vue只验证defineComponent契约、VNode与composable返回值，没有DOM挂载；真实组件测试在3.5、完整框架学习在阶段4。本实验也不声称运行过Dart/Kotlin或真实浏览器兼容矩阵。
