# CodeMirror Static properties

Sometimes we need to use some of the static properties provided by the CodeMirror object itself, such as printing the default properties of CodeMirror. All properties can be found in the official [documentation](https://codemirror.net/5/doc/manual.html#api_static)

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


