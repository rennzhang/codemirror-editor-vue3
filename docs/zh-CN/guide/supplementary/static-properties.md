# CodeMirror Static properties

有时候我们需要使用 `CodeMirror` 对象本身提供的一些`静态属性`，例如打印 CodeMirror 的默认属性，更多属性请查阅[官方文档](https://codemirror.net/5/doc/manual.html#api_static)

```vue
<template>
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      border
    >
    </Codemirror>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import "codemirror/mode/javascript/javascript.js";
import Codemirror, { CodeMirror } from "codemirror-editor-vue3"; // [!code focus]
// or// [!code focus]
import _CodeMirror from "codemirror";// [!code focus]

const code = ref(
`const name = "peter"
console.log(name);`
);

const cmOptions: EditorConfiguration = {
  mode: "text/javascript",
};

console.log(CodeMirror.defaults); // [!code focus]
console.log(_CodeMirror.defaults); // [!code focus]
</script>
```


