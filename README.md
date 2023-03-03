[![GitHub stars](https://img.shields.io/github/stars/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3/stargazers)
[![npm downloads](https://img.shields.io/npm/dt/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3)
[![GitHub issues](https://img.shields.io/github/issues/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3/issues)
[![GitHub forks](https://img.shields.io/github/forks/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3)
[![license](https://img.shields.io/github/license/RennCheung/codemirror-editor-vue3)](https://github.com/RennCheung/codemirror-editor-vue3)

### Introduction

The codemirror component of vue3. This component is developed based on [Codemirror 5](http://codemirror.net/5/) and only vue3 is supported. 

In addition to the officially supported modes, the log output presentation mode is added, out of the box, but not necessarily suitable for all scenarios.

For complete documentation and more cases, please check [codemirror-editor-vue3 docs](https://renncheung.github.io/codemirror-editor-vue3/en/guide/getting-started).(Currently only Chinese version, English version is under planning)

### Install

```bash
npm install codemirror-editor-vue3 codemirror@5.6.0 -S
```

```bash
yarn add codemirror-editor-vue3 codemirror@5.6.0
```

```bash
pnpm i codemirror-editor-vue3 codemirror@5.6.0 -S
```

### Register global component

> **Do not recommend global registration components**, which will result in the type of prompt on the template that cannot be properly obtained.

`main.js:`

```js
import { createApp } from "vue";
import App from "./App.vue";
import { GlobalCmComponent } from "codemirror-editor-vue3";

const app = createApp(App);
app.use(GlobalCmComponent);
app.mount("#app");
```

custom component name:

```js
app.use(GlobalCmComponent, { componentName: "customName" });
```

### Use in components

```vue
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="test placeholder"
    :height="200"
    @change="change"
  />
</template>

<script>
import Codemirror from "codemirror-editor-vue3";

// placeholder
import "codemirror/addon/display/placeholder.js";

// language
import "codemirror/mode/javascript/javascript.js";
// placeholder
import "codemirror/addon/display/placeholder.js";
// theme
import "codemirror/theme/dracula.css";

import { ref } from "vue";
export default {
  components: { Codemirror },
  setup() {
    const code = ref(`
var i = 0;
for (; i < 9; i++) {
  console.log(i);
  // more statements
}`);

    return {
      code,
      cmOptions: {
        mode: "text/javascript", // Language mode
        theme: "dracula", // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      },
    };
  },
};
</script>
```
