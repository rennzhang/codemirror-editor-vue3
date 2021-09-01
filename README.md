### Introduction

The plug-in is based on [Codemirror](http://codemirror.net/) and only supports vue3. In addition to the modes supported by codemirror, this plugin also supports custom log modes.

For complete documentation and more cases, please check [codemirror-editor-vue3-docs](https://renncheung.github.io/codemirror-editor-vue3/index.html).(Currently only Chinese version, English version is under planning)
### Install

```
npm install codemirror-editor-vue3 -S
yarn add codemirror-editor-vue3
```
### Use in the global
`main.js:` 

```js
import { createApp } from 'vue'
import App from './App.vue'
import Codemirror from "codemirror-editor-vue3";
// plugin-style
import "codemirror-editor-vue3/dist/style.css";

const app = createApp(App)
app.use(Codemirror)
app.mount('#app')
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

// plugin-style
import "codemirror-editor-vue3/dist/style.css";

// language
import "codemirror/mode/javascript/javascript.js";

// theme
import "codemirror/theme/dracula.css"

import { ref } from "vue"
export default {
  components: { Codemirror },
  setup() {
    const code = ref(`
var i = 0;
for (; i < 9; i++) {
  console.log(i);
  // more statements
}`)

    return {
      code,
      cmOptions:{
        mode: 'text/javascript', // Language mode
        theme: 'dracula', // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      }
    };
   } ,
};
</script>
```

### Other instructions
The codemirror basic style has been introduced inside the `codemirror-editor-vue3` plugin, and there is no need to repeatedly introduce the following styles when using:

```js
// base style
import "codemirror/lib/codemirror.css";
import "codemirror/mode/css/css.js";
```