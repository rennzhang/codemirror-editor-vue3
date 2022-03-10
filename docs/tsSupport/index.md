## 前置工作

- 确保你的项目支持 ts
- 推荐安装 [volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) 获取更好的模板提示
- 安装依赖 [@types/codemirror](https://www.npmjs.com/package/@types/codemirror)

## Demo

```vue
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    @change="onChange"
    @ready="onReady"
  >
  </Codemirror>
</template>

<script lang="ts">
import { ref } from "vue";
import Codemirror from "codemirror-editor-vue3";

// @types/codemirror
import { Editor, EditorConfiguration } from "codemirror";

// language
import "codemirror/mode/javascript/javascript.js";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const cminstance = ref<Editor>();
    const code = ref(`const ary = []`);

    const cmOptions: EditorConfiguration = {
      mode: "javascript",
      lineWrapping: true,
    };

    return {
      code,
      cmOptions,
      onReady(cm: Editor) {
        cminstance.value = cm;
      },
      onChange(value: string, cm: Editor) {
        console.log(value, cm);
      },
    };
  },
});
</script>
```
