# 3.3 TypeScript类型与工程边界

前置：阶段1/2的JS、模块、对象、异步和数据边界，以及3.1包管理。顺序为用途→基础类型→对象/联合→泛型与守卫→函数/类→模块与配置；Vue桥接可延后到阶段4前回读。

本组使用真实tsc6.0.3，Node26，Vue3.5.46。选择6.0.3是为与本轮typescript-eslint支持范围兼容，不把latest当唯一正确版本。

- [3.3.1 TypeScript解决什么问题与类型擦除](./3.3.1.typescript-ide.md)
- [3.3.2 基础类型、unknown、元组与enum](./3.3.2.string.md)
- [3.3.3 interface与type：结构契约和声明合并](./3.3.3.interface.md)
- [3.3.4 联合、交叉与可辨识状态](./3.3.4.item-3-3-4.md)
- [3.3.5 泛型约束与常用工具类型](./3.3.5.extends.md)
- [3.3.6 断言、类型守卫与unknown数据入口](./3.3.6.typeof.md)
- [3.3.7 函数参数、返回值与回调契约](./3.3.7.item-3-3-7.md)
- [3.3.8 类修饰符、readonly与#private的边界](./3.3.8.public.md)
- [3.3.9 ES模块、type-only import与声明文件](./3.3.9..d.ts.md)
- [3.3.10 strict、target、module与paths](./3.3.10.tsconfig.json.md)
- [3.3.11 Vue Props、事件与composable类型预告](./3.3.11.react-vue-ts-props.md)
- [3.3.12 TypeScript、Dart与Kotlin：可迁移经验和边界](./3.3.12.typescript-dart-kotlin.md)

## 运行和验收

[真实编译实验包](../../../2-examples/03-engineering/3.3-typescript/README.md) · [独立练习目录](../../../3-exercises/03-engineering/3.3-typescript/README.md)

每点先预测，再用编译器和运行器分别核对；错误被拒绝也是必要证据。通过不等于学习者已独立掌握。
