# 阶段15.5逐点质量审查

2026-11-25。六点理论、操作卡、练习及综合任务定义已交叉核对；主统一生成tasks稳定锚点。前置阶段6/12，先消息/方向/时间模型，再范围流程和具体交互。

| 点 | 已核对的机制、示例与变体 |
| --- | --- |
| 15.5.1 | ICU真实复数/select与other、动态import允许表、只读消息/请求语言分离；lab只有一组catalog语义消息，完整多namespace为新增；Vue I18n默认语法不冒充ICU。变体新增checkout并测试失败重试/缺key。 |
| 15.5.2 | html dir与lang分开、body英文/段落阿拉伯语、border-inline-start实际RTL右侧6px，bdi隔离、仅方向箭头镜像；变体加入邮箱/金额，不整页反转。 |
| 15.5.3 | 瞬间/墙上时间/纯日期分开；Intl显式zone真实DST缺口/重复小时测试；dayjs utc依赖仅官方对照。变体要求契约而非给无offset数据强加Z。 |
| 15.5.4 | AA含A+AA及整页/流程；axe局部结果不能声明全站；VPAT模板生成ACR不是认证。评估清单/ACR式备注为学习者任务，未做用户/读屏不填Supports。 |
| 15.5.5 | skip到可聚焦标题、SPA标题/focus/status/back实际；无全页trap；路径滚动模型限制明确，同路由per-entry恢复为新增。已读主app/pages源码，向主提示skip顺序/目标及announcer不等于focus。 |
| 15.5.6 | 实际三城editable listbox-combobox键盘/活动后代和原生dialog聚焦/关闭返回；DatePicker APG仅观察，指出示例非可直接生产认证。变体异步晚到/返回点删除，不声称已有。 |

## 修正与验证

真实Node三单元与两个Chrome视口流程通过，所选axe标签零违规，详情见runtime JSON。首次dialog测试错误假设单个内部按钮Tab不能进入浏览器chrome；按MWG原生dialog允许浏览器界面焦点的正文，改验证内部两个控件间Tab，保留原生行为。axe运行要求显式BrowserContext，已改创建/释放路径。英语控件/阿拉伯语段落语言标记已修正；HTML返回链接指向确实由实验server提供的README。方向切换只改变dir，主语言仍为en，不把方向变更误记成已翻译页面；此改动后两浏览器流程再通过。动态catalog/details路由使用明确4574回环地址（离线文件检查无法解析服务端路由），实际浏览器导航再次通过。

操作卡与理论中的字段、文件名和测试结果一致。Node库、浏览器DOM和官方观察分别标明；主Nuxt尚未自动集成国际化/该lab，不编造生产部署、真机/读屏或学习者试学。主阶段验收须再检查综合tasks映射与索引，不能以本分组完成代替全阶段通过。
