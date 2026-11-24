export const scenarios = {
  "1.3.1.1": async ({ lab, log, signal, sleep }) => {
    const profile = { name: "Ada" };
    profile.name = "Lin";
    log("const 属性", profile.name);
    let attempts = 0;
    attempts += 1;
    log("let 计数", attempts);
    try {
      log(later);
      let later = 1;
    } catch (error) {
      log("TDZ", error.name);
    }
    var hoisted;
    log("var 初始化值", hoisted);
  },
  "1.3.1.2": async ({ lab, log, signal, sleep }) => {
    let value = 1;
    log("首次类型", typeof value);
    value = "1";
    log("再次类型", typeof value);
    const source = { count: 1 };
    const alias = source;
    alias.count = 2;
    log("共享属性", source.count);
    const change = (item) => {
      item = { count: 99 };
      return item;
    };
    change(source);
    log("重绑参数后", source.count);
    log("大整数", 9007199254740993n);
    log("null typeof", typeof null);
  },
  "1.3.1.3": async ({ lab, log, signal, sleep }) => {
    for (const value of [null, [], {}, () => {}]) log("typeof", typeof value);
    log("是数组", Array.isArray([]));
    log("Date 标签", Object.prototype.toString.call(new Date()));
    const fake = { [Symbol.toStringTag]: "Date" };
    log("可伪造标签", Object.prototype.toString.call(fake));
  },
  "1.3.1.4": async ({ lab, log, signal, sleep }) => {
    const raw = lab.querySelector("#raw").value.trim();
    log("字符串拼接", raw + 1);
    log('Boolean("false")', Boolean("false"));
    if (raw === "") {
      log("校验", "空输入");
      return;
    }
    const number = Number(raw);
    log("转换结果", Number.isFinite(number) ? number + 1 : "不是有限数");
  },
  "1.3.1.5": async ({ lab, log, signal, sleep }) => {
    const count = 0;
    log("或默认值", count || 10);
    log("空合并默认值", count ?? 10);
    const user = null;
    log("显示名称", user?.profile?.name ?? "访客");
    log("严格相等", 2 === "2");
    log("NaN判断", Number.isNaN(NaN));
  },
  "1.3.1.6": async ({ lab, log, signal, sleep }) => {
    const state = lab.querySelector("#state").value;
    function text(value) {
      switch (value) {
        case "loading":
          return "加载中";
        case "error":
          return "请重试";
        default:
          return "就绪";
      }
    }
    log("界面状态", text(state));
    log("空列表", 0 > 0 ? "有数据" : "暂无数据");
  },
  "1.3.1.7": async ({ lab, log, signal, sleep }) => {
    const list = ["A", "B"];
    const keys = [];
    for (const key in list) keys.push(key + ":" + typeof key);
    log("for in", keys);
    const values = [];
    for (const value of list) values.push(value);
    log("for of", values);
    const own = Object.create({ inherited: true });
    own.count = 2;
    log("自有键", Object.keys(own));
  },
  "1.3.1.8": async ({ lab, log, signal, sleep }) => {
    const counter = {
      count: 2,
      read() {
        return this.count;
      },
    };
    log("方法调用", counter.read());
    const detached = counter.read;
    try {
      detached();
    } catch (error) {
      log("提取后", error.name);
    }
    log("bind后", detached.bind(counter)());
    const add = (a, b) => a + b;
    log("箭头返回", add(2, 3));
  },
  "1.3.1.9": async ({ lab, log, signal, sleep }) => {
    const theme = "light";
    function preview() {
      const theme = "dark";
      return () => theme;
    }
    const read = preview();
    log("闭包读局部", read());
    log("外层保持", theme);
    {
      let scoped = "block";
      log("块内", scoped);
    }
    try {
      log(scoped);
    } catch (error) {
      log("块外访问", error.name);
    }
  },
  "1.3.1.10": async ({ lab, log, signal, sleep }) => {
    function createCounter() {
      let count = 0;
      return () => ++count;
    }
    const a = createCounter(),
      b = createCounter();
    log("A第一次", a());
    log("A第二次", a());
    log("B第一次", b());
    let shared = 1;
    const read = () => shared;
    shared = 3;
    log("读取当前绑定", read());
  },
  "1.3.1.11": async ({ lab, log, signal, sleep }) => {
    const prices = [10, 20, 5];
    log(
      "map翻倍",
      prices.map((v) => v * 2),
    );
    log(
      "filter",
      prices.filter((v) => v >= 10),
    );
    log(
      "find",
      prices.find((v) => v < 10),
    );
    log(
      "some",
      prices.some((v) => v > 15),
    );
    log(
      "every",
      prices.every((v) => v > 0),
    );
    log(
      "sum",
      prices.reduce((a, v) => a + v, 0),
    );
    log(
      "空数组总和",
      [].reduce((a, v) => a + v, 0),
    );
  },
  "1.3.1.12": async ({ lab, log, signal, sleep }) => {
    const source = { name: "Ada", prefs: { theme: "light" } };
    const copy = { ...source, active: true };
    copy.prefs.theme = "dark";
    const { name: displayName } = source;
    log("重命名解构", displayName);
    log("浅拷贝共享", source.prefs.theme);
    const independent = { ...source, prefs: { ...source.prefs } };
    independent.prefs.theme = "blue";
    log("独立副本", independent.prefs.theme);
    log("原对象", source.prefs.theme);
  },
  "1.3.1.13": async ({ lab, log, signal, sleep }) => {
    const text = "A😀";
    log("UTF16长度", text.length);
    log("码点数量", [...text].length);
    log("替换全部", "a-a".replaceAll("a", "b"));
    log("拆分", "  Vue,Nuxt  ".trim().split(","));
    log("模板", `Hello ${"Web"}`);
  },
  "1.3.1.14": async ({ lab, log, signal, sleep }) => {
    const raw = { quantity: "2" };
    const quantity = Number(raw.quantity);
    log("原始字段类型", typeof raw.quantity);
    log("数值相加", quantity + 1);
    log("字符串相加", raw.quantity + 1);
    log("JSON缺失值", JSON.stringify({ missing: undefined, empty: null }));
  },
  "1.3.2.1": async ({ lab, log, signal, sleep }) => {
    class Counter {
      #value = 0;
      increment() {
        return ++this.#value;
      }
      static description() {
        return "计数器";
      }
    }
    class NamedCounter extends Counter {
      constructor(name) {
        super();
        this.name = name;
      }
      describe() {
        return this.name + ":" + this.increment();
      }
    }
    const a = new Counter(),
      b = new Counter();
    log("A两次", [a.increment(), a.increment()]);
    log("B一次", b.increment());
    log("静态方法", Counter.description());
    log("子类", new NamedCounter("课堂").describe());
  },
  "1.3.2.2": async ({ lab, log, signal, sleep }) => {
    const {
      default: label,
      double,
      counter,
      increment,
    } = await import("./math.mjs");
    log("默认导出", label);
    log("命名函数", double(4));
    const module = await import("./math.mjs");
    increment();
    log("实时绑定", module.counter);
  },
  "1.3.2.3": async ({ lab, log, signal, sleep }) => {
    log("顺序", "同步开始");
    const chain = new Promise((resolve) => setTimeout(() => resolve(2), 25))
      .then((value) => {
        log("then结果", value * 3);
        return value * 3;
      })
      .then(() => {
        throw new Error("预期失败");
      })
      .catch((error) => {
        log("catch", error.message);
        return 9;
      })
      .finally(() => log("finally", "清理"));
    log("顺序", "同步结束");
    log("最终结果", await chain);
  },
  "1.3.2.4": async ({ lab, log, signal, sleep }) => {
    const order = [];
    async function task(name, ms) {
      order.push(name + "开始");
      await sleep(ms);
      order.push(name + "结束");
      return name;
    }
    const a = task("A", 30),
      b = task("B", 10);
    log("启动顺序", order.slice());
    log("聚合结果", await Promise.all([a, b]));
    log("完成顺序", order);
  },
  "1.3.2.5": async ({ lab, log, signal, sleep }) => {
    function* range(limit) {
      for (let value = 0; value < limit; value++) yield value;
      return "done";
    }
    const iterator = range(2);
    log("第一项", iterator.next());
    log("第二项", iterator.next());
    log("结束", iterator.next());
    log("新序列", [...range(3)]);
    log("已消费序列", [...iterator]);
  },
  "1.3.2.6": async ({ lab, log, signal, sleep }) => {
    const key = { id: 1 };
    const map = new Map([[key, "metadata"]]);
    log("同一个键", map.get(key));
    log("新对象键", map.get({ id: 1 }));
    log("去重", [...new Set([1, 1, 2])]);
    const weak = new WeakMap([[key, true]]);
    log("弱键存在", weak.has(key));
    try {
      weak.set("key", true);
    } catch (error) {
      log("字符串键", error.name);
    }
  },
  "1.3.2.7": async ({ lab, log, signal, sleep }) => {
    const options = { retries: 0, title: "" };
    options.retries ??= 3;
    options.title ||= "未命名";
    log("配置", options);
    let ready = false;
    ready &&= true;
    log("条件赋值", ready);
    const user = null;
    log("安全读取", user?.name ?? "访客");
  },
  "1.3.2.8": async ({ lab, log, signal, sleep }) => {
    log("模块导入", "开始");
    const module = await import("./ready.mjs");
    log("顶层await结果", module.ready);
    log("导入完成后值", module.label);
  },
  "1.3.3.1": async ({ lab, log, signal, sleep }) => {
    const p = document.createElement("p"),
      strong = document.createElement("strong");
    strong.textContent = "加粗";
    p.append("正文", strong);
    lab.querySelector("#tree").replaceChildren(p);
    log("元素子节点数", p.children.length);
    log("全部子节点数", p.childNodes.length);
    log("首节点类型", p.firstChild.nodeType);
    log("文档节点类型", document.nodeType);
  },
  "1.3.3.2": async ({ lab, log, signal, sleep }) => {
    const root = lab.querySelector("#items");
    root.replaceChildren();
    for (const text of ["A", "B"]) {
      const li = document.createElement("li");
      li.className = "item";
      li.textContent = text;
      root.append(li);
    }
    const snapshot = root.querySelectorAll(".item"),
      live = root.getElementsByClassName("item");
    const added = document.createElement("li");
    added.className = "item";
    added.textContent = "C";
    root.append(added);
    log("静态集合", snapshot.length);
    log("实时集合", live.length);
    log("缺失节点", root.querySelector("#missing"));
  },
  "1.3.3.3": async ({ lab, log, signal, sleep }) => {
    const root = lab.querySelector("#items");
    root.replaceChildren();
    const a = document.createElement("li");
    a.textContent = "A";
    const b = document.createElement("li");
    b.textContent = "B";
    root.append(a);
    root.insertBefore(b, a);
    log(
      "插入后顺序",
      [...root.children].map((e) => e.textContent),
    );
    root.append(b);
    log(
      "移动后顺序",
      [...root.children].map((e) => e.textContent),
    );
    b.remove();
    log("移除后数量", root.children.length);
  },
  "1.3.3.4": async ({ lab, log, signal, sleep }) => {
    const button = lab.querySelector("#state-button");
    button.classList.toggle("active");
    const active = button.classList.contains("active");
    button.setAttribute("aria-pressed", String(active));
    button.dataset.count = String(Number(button.dataset.count || 0) + 1);
    log("状态类", active);
    log("ARIA状态", button.getAttribute("aria-pressed"));
    log("dataset类型", typeof button.dataset.count);
    const input = lab.querySelector("#property-input");
    input.value = "运行期值";
    log("实时value", input.value);
    log("初始attribute", input.getAttribute("value"));
  },
  "1.3.3.5": async ({ lab, log, signal, sleep }) => {
    const raw = lab.querySelector("#raw-text").value;
    const safe = lab.querySelector("#safe-output");
    safe.textContent = raw;
    const trusted = lab.querySelector("#trusted-output");
    trusted.replaceChildren();
    const strong = document.createElement("strong");
    strong.textContent = "固定可信结构";
    trusted.append(strong);
    log("安全输出文本", safe.textContent);
    log("输入创建strong数量", safe.querySelectorAll("strong").length);
    log("可信结构strong数量", trusted.querySelectorAll("strong").length);
  },
  "1.3.3.6": async ({ lab, log, signal, sleep }) => {
    const box = lab.querySelector("#measure");
    const rect = box.getBoundingClientRect();
    log("offsetWidth", box.offsetWidth);
    log("clientWidth", box.clientWidth);
    log("rectWidth", Math.round(rect.width));
    log("border-box", "布局200，内区190，缩放后160");
  },
  "1.3.3.7": async ({ lab, log, signal, sleep }) => {
    let count = 0;
    const output = lab.querySelector("#count");
    const render = () => {
      output.textContent = String(count);
    };
    render();
    count += 1;
    log("仅模型改变", count);
    log("DOM仍为", output.textContent);
    render();
    log("render后DOM", output.textContent);
  },
  "1.3.4.1": async ({ lab, log, signal, sleep }) => {
    let count = 0;
    const button = lab.querySelector("#trigger");
    const controller = new AbortController();
    signal.addEventListener("abort", () => controller.abort(), { once: true });
    button.addEventListener(
      "click",
      () => {
        count += 1;
        log("触发次数", count);
      },
      { signal: controller.signal },
    );
    lab.querySelector("#remove").addEventListener(
      "click",
      () => {
        controller.abort();
        log("监听状态", "已解除");
      },
      { signal },
    );
    log("监听状态", "已注册");
  },
  "1.3.4.2": async ({ lab, log, signal, sleep }) => {
    const outer = lab.querySelector("#outer"),
      inner = lab.querySelector("#inner");
    outer.addEventListener("click", () => log("阶段", "outer捕获"), {
      capture: true,
      signal,
    });
    inner.addEventListener(
      "click",
      (event) => log("阶段", "inner目标 " + event.eventPhase),
      { signal },
    );
    outer.addEventListener("click", () => log("阶段", "outer冒泡"), { signal });
    log("准备", "点击内层按钮");
  },
  "1.3.4.3": async ({ lab, log, signal, sleep }) => {
    lab.querySelector("#container").addEventListener(
      "click",
      (event) => {
        log("target", event.target.tagName);
        log("currentTarget", event.currentTarget.id);
      },
      { signal },
    );
    log("准备", "点击按钮内文字");
  },
  "1.3.4.4": async ({ lab, log, signal, sleep }) => {
    const box = lab.querySelector("#event-box");
    box.addEventListener("click", () => log("父容器", "收到点击"), { signal });
    lab.querySelector("#stop").addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
        log("停止传播", "已调用");
      },
      { signal },
    );
    lab.querySelector("#local-form").addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        log("默认提交已取消", event.defaultPrevented);
      },
      { signal },
    );
    log("准备", "提交表单或点停止冒泡");
  },
  "1.3.4.5": async ({ lab, log, signal, sleep }) => {
    const field = lab.querySelector("#message");
    for (const type of ["input", "change", "focus", "blur", "keydown"])
      field.addEventListener(
        type,
        (event) =>
          log("事件", type + (type === "input" ? " " + field.value : "")),
        { signal },
      );
    lab.querySelector("#event-form").addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        log("事件", "submit已取消");
      },
      { signal },
    );
    log("准备", "输入、离焦与提交");
  },
  "1.3.4.6": async ({ lab, log, signal, sleep }) => {
    const list = lab.querySelector("#list");
    list.replaceChildren();
    let count = 0;
    function add() {
      const li = document.createElement("li"),
        button = document.createElement("button");
      button.type = "button";
      button.dataset.action = "remove";
      button.textContent = "删除条目 " + ++count;
      li.append(button);
      list.append(li);
    }
    add();
    lab.querySelector("#add").addEventListener(
      "click",
      () => {
        add();
        log("新增后数量", list.children.length);
      },
      { signal },
    );
    list.addEventListener(
      "click",
      (event) => {
        if (!(event.target instanceof Element)) return;
        const button = event.target.closest('button[data-action="remove"]');
        if (!button || !list.contains(button)) return;
        button.closest("li")?.remove();
        log("删除后数量", list.children.length);
      },
      { signal },
    );
    log("初始数量", list.children.length);
  },
  "1.3.4.7": async ({ lab, log, signal, sleep }) => {
    const parent = lab.querySelector("#custom-parent"),
      child = lab.querySelector("#custom-child");
    parent.addEventListener(
      "lesson:completed",
      (event) => log("收到detail", event.detail),
      { signal },
    );
    lab.querySelector("#send").addEventListener(
      "click",
      () => {
        log("分发顺序", "之前");
        child.dispatchEvent(
          new CustomEvent("lesson:completed", {
            bubbles: true,
            detail: { lessonId: "js", progress: 100 },
          }),
        );
        log("分发顺序", "之后");
      },
      { signal },
    );
    log("准备", "发送自定义事件");
  },
  "1.3.5.1": async ({ lab, log, signal, sleep }) => {
    log("开始", "同步");
    [1].map((value) => {
      log("map回调", "同步 " + value);
      return value;
    });
    const value = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const error = null;
        if (error) {
          reject(error);
          return;
        }
        resolve({ name: "Ada" });
      }, 20);
    });
    log("定时回调结果", value.name);
  },
  "1.3.5.2": async ({ lab, log, signal, sleep }) => {
    const response = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", new URL("./fixtures/users.json", import.meta.url));
      xhr.timeout = 3000;
      xhr.onload = () =>
        resolve({ status: xhr.status, text: xhr.responseText });
      xhr.onerror = () => reject(new Error("XHR网络失败"));
      xhr.ontimeout = () => reject(new Error("XHR超时"));
      xhr.onabort = () => reject(new DOMException("已取消", "AbortError"));
      signal.addEventListener("abort", () => xhr.abort(), { once: true });
      xhr.send();
    });
    log("XHR状态", response.status);
    if (response.status < 200 || response.status >= 300)
      throw new Error("HTTP " + response.status);
    log("XHR用户", JSON.parse(response.text).users[0].name);
  },
  "1.3.5.3": async ({ lab, log, signal, sleep }) => {
    async function read(path) {
      const response = await fetch(
        new URL("./fixtures/" + path, import.meta.url),
        { signal },
      );
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    }
    try {
      const value = await read("users.json");
      if (!Array.isArray(value.users)) throw new Error("结构无效");
      log("成功用户", value.users[0].name);
    } catch (error) {
      log("成功路径异常", error.name);
    }
    try {
      await read("missing.json");
    } catch (error) {
      log("HTTP分支", error.message);
    }
    try {
      await read("invalid.txt");
    } catch (error) {
      log("解析分支", error.name);
    }
    const cancelled = new AbortController();
    cancelled.abort();
    try {
      await fetch(new URL("./fixtures/users.json", import.meta.url), {
        signal: cancelled.signal,
      });
    } catch (error) {
      log("取消分支", error.name);
    }
    lab.querySelector("#post").addEventListener(
      "click",
      async () => {
        try {
          const response = await fetch("/api/js-echo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "练习标题" }),
            signal,
          });
          if (!response.ok)
            throw new Error(
              "HTTP " + response.status + "：请启动章节 Node 服务",
            );
          const value = await response.json();
          log("POST回显", value.received.title);
        } catch (error) {
          log("POST未完成", error.message);
        }
      },
      { signal },
    );
  },
  "1.3.5.4": async ({ lab, log, signal, sleep }) => {
    let loading = true;
    log("开始loading", loading);
    try {
      await Promise.reject(new TypeError("字段格式不正确"));
    } catch (error) {
      log("错误类型", error.name);
      log("安全提示", "请检查输入");
    } finally {
      loading = false;
      log("结束loading", loading);
    }
  },
  "1.3.5.5": async ({ lab, log, signal, sleep }) => {
    log("顺序", "同步");
    await new Promise((resolve) =>
      setTimeout(() => {
        log("顺序", "timeout");
        resolve();
      }, 0),
    );
    await new Promise((resolve) => {
      let count = 0;
      const timer = setInterval(() => {
        count += 1;
        log("interval次数", count);
        if (count === 3) {
          clearInterval(timer);
          resolve();
        }
      }, 15);
      signal.addEventListener(
        "abort",
        () => {
          clearInterval(timer);
          resolve();
        },
        { once: true },
      );
    });
    await new Promise((resolve) => {
      const frame = requestAnimationFrame(() => {
        log("rAF", "已执行");
        resolve();
      });
      signal.addEventListener(
        "abort",
        () => {
          cancelAnimationFrame(frame);
          resolve();
        },
        { once: true },
      );
    });
    log("清理", "interval已停止");
  },
  "1.3.5.6": async ({ lab, log, signal, sleep }) => {
    const value = JSON.parse('{"quantity":2}');
    log("字段校验", Number.isInteger(value.quantity));
    log("缺失与空", JSON.stringify({ missing: undefined, empty: null }));
    log("数组undefined", JSON.stringify([undefined]));
    try {
      JSON.parse("{bad}");
    } catch (error) {
      log("无效JSON", error.name);
    }
    try {
      JSON.stringify(1n);
    } catch (error) {
      log("BigInt默认编码", error.name);
    }
  },
};
