# Typescript Support
## Prepare

- Make sure your project supports Typescript
- It is recommended to install [volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) for better template prompts
- Installation dependency [@types/codemirror](https://www.npmjs.com/package/@types/codemirror)

::: code-group
```bash [npm]
npm install @types/codemirror@5.x -D
```
```bash [yarn]
yarn add @types/codemirror@5.x
```
```bash [pnpm]
pnpm i @types/codemirror@5.x -D
```
:::


## Case

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

// language
import "codemirror/mode/javascript/javascript.js";

// @types/codemirror
import type { Editor, EditorConfiguration } from "codemirror";

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
