[![GitHub stars](https://img.shields.io/github/stars/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3/stargazers)
[![npm downloads](https://img.shields.io/npm/dt/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3)
[![GitHub issues](https://img.shields.io/github/issues/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3/issues)
[![GitHub forks](https://img.shields.io/github/forks/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3)
[![license](https://img.shields.io/github/license/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3)

## 简介

Codemirror 的 vue3 组件。 基于 [Codemirror 5](http://codemirror.net/5/)开发，仅支持 vue3.

除了 Codemirror 官方支持的模式外，还增加了开箱即用的日志输出模式，但不一定适用于所有场景。

## 安装

::: code-group

```bash [npm]
npm install codemirror-editor-vue3 codemirror@5.x -S
```

```bash [yarn]
yarn add codemirror-editor-vue3 codemirror@5.x
```

```bash [pnpm]
pnpm i codemirror-editor-vue3 codemirror@5.x -S
```

:::

::: details 使用 Typescript

如果你的项目需要支持 Typescript，那还需要安装对应的类型包.

::: code-group

```bash [npm]
npm install @types/codemirror@5.60.5 -D
```

```bash [yarn]
yarn add @types/codemirror@5.60.5
```

```bash [pnpm]
pnpm i @types/codemirror@5.60.5 -D
```

:::

## 注册全局组件

::: warning 提示
不建议全局注册组件，这会导致无法正确获取模板上的类型提示。
:::

::: code-group

```js [main.js]
import { createApp } from "vue";
import App from "./App.vue";
import { InstallCodemirro } from "codemirror-editor-vue3"; // [!code ++]

const app = createApp(App);
app.use(InstallCodemirro); // [!code ++]
app.mount("#app");
```

:::

全局注册组件名称是`Codemirror`，也可以自定义一个组件名称，例如：

::: code-group

```js [main.js]
// ....
app.use(InstallCodemirro, { componentName: "customName" }); // [!code ++]
```

:::

---

## 在组件中使用

::: code-group

```vue [index.vue]
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="测试 placeholder"
    :height="200"
    @change="onChange"
  />
</template>

<script>
import Codemirror from "codemirror-editor-vue3";

// placeholder
import "codemirror/addon/display/placeholder.js";
// language
import "codemirror/mode/javascript/javascript.js";

import { ref } from "vue";
export default {
  components: { Codemirror },
  setup() {
    const code = ref(`var i = 0;
for (; i < 9; i++) {
    console.log(i);
    // more statements
};`);

    return {
      code,
      cmOptions: {
        mode: "text/javascript", // 语言模式
        theme: "default", // 主题
      },
      onChange(val, cm) {},
    };
  },
};
</script>
```

```vue [index.vue(ts setup)]
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="测试 placeholder"
    :height="200"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import Codemirror from "codemirror-editor-vue3";

// placeholder
import "codemirror/addon/display/placeholder.js";
// language
import "codemirror/mode/javascript/javascript.js";

import { ref } from "vue";
const code = ref(`var i = 0;
for (; i < 9; i++) {
    console.log(i);
    // more statements
};`);

const cmOptions = {
  mode: "text/javascript", // 语言模式
  theme: "default", // 主题
};

const onChange = (val: string, cm: Editor) => {
  console.log(val);
  console.log(cm.getValue());
};
</script>
```

:::

例如:

<component v-if="dynamicComponent" :is="dynamicComponent"></component>

<script >
import {shallowRef} from "vue"
export default {
  data() {
    return {
      dynamicComponent: null
    }
  },

  mounted() {
    import('../../views/demo/index.vue').then((module) => {
      this.dynamicComponent = shallowRef(module.default)
    })
  }
}
</script>
