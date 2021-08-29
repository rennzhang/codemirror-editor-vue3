### 介绍

  该插件基于 [Codemirror](http://codemirror.net/)，仅支持 vue3 中使用。除了 codemirror 所支持的模式，本插件还支持自定义日志模式。

完整文档请查看[codemirror-editor-vue3-docs](https://renncheung.github.io/codemirror-editor-vue3/index.html)

### 安装
```npm
npm install codemirror-editor-vue3
```
### 全局安装
`main.js:` 

```js
import { createApp } from 'vue'
import App from './App.vue'
import Codemirror from "codemirror-editor-vue3";
// plugin-style
import "codemirror-editor-vue3/dist/style.css";
let app = createApp(App)
app.use(Codemirror)
app.mount('#app')
```

### 组件中使用
```vue
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="测试 placeholder"
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
        mode: 'text/javascript', // 语言模式
        theme: 'default', // 主题
        lineNumbers: true, // 显示行号
        smartIndent: true, // 智能缩进
        indentUnit: 2, // 智能缩进单位为4个空格长度
        foldGutter: true, // 启用行槽中的代码折叠
        styleActiveLine: true, // 显示选中行的样式
      }
    };
   } ,
};
</script>
```

### 其他说明
考虑插件需要引入以下基础样式（codemirror 官方样式），插件内部已经引入，不需要在使用时重复引入以下样式：

```js
// base style
import "codemirror/lib/codemirror.css";
import "codemirror/mode/css/css.js";
```