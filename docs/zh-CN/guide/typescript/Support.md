# Typescript Support
## 前置工作

- 确保你的项目支持 ts
- 推荐安装 [volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) 获取更好的模板提示
- 安装依赖 [@types/codemirror](https://www.npmjs.com/package/@types/codemirror)

::: code-group
```bash [npm]
npm install @types/codemirror -D
```
```bash [yarn]
yarn add @types/codemirror
```
```bash [pnpm]
pnpm i @types/codemirror -D
```
:::


## 案例

```vue
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    @change="onChange"
    @ready="onReady"
    @focus="onFocus"
  >
  </Codemirror>
</template>

<script lang="ts">
import { ref } from "vue";
import Codemirror from "codemirror-editor-vue3";

// @types/codemirror
import type { Editor, EditorConfiguration } from "codemirror";

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
      onFocus(cm: Editor, event: FocusEvent) {
        console.log("onFocus", cm, event);
        cm.getDoc().on("beforeChange", (instance: Doc, obj: EditorChange) => {
          console.log("beforeChange", instance, obj);
        });
      },
    };
  },
});
</script>
```
