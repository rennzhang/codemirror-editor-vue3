[![GitHub stars](https://img.shields.io/github/stars/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3/stargazers)
[![npm downloads](https://img.shields.io/npm/dt/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3)
[![GitHub issues](https://img.shields.io/github/issues/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3/issues)
[![GitHub forks](https://img.shields.io/github/forks/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3)
[![license](https://img.shields.io/github/license/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3)

## Introduction

The codemirror component of vue3. This component is developed based on [Codemirror 5](http://codemirror.net/5/) and only vue3 is supported.

In addition to the officially supported modes, the log output presentation mode is added, out of the box, but not necessarily suitable for all scenarios.

## Install

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

::: details Typescript Support

If your project requires Typescript support, you will also need to install the type dependency.

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

## Register global component

::: warning
It is not recommended to register components globally. This will cause the type prompt on the template to not be retrieved correctly.
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

The global registered component name is Codemirror or you can customize a component name, for example:

::: code-group

```js [main.js]
// ....
app.use(InstallCodemirro, { componentName: "customName" }); // [!code ++]
```

:::

---

## Use in components

::: code-group

```vue [index.vue]
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="test placeholder"
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
        mode: "text/javascript", // language mode
        theme: "default", // theme
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
import type { Editor, EditorConfiguration } from "codemirror";

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

const cmOptions: EditorConfiguration = {
  mode: "text/javascript", // language mode
  theme: "default", // theme
};

const onChange = (val: string, cm: Editor) => {
  console.log(val);
  console.log(cm.getValue());
};
</script>
```

:::

Example:

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
