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

### merge 模式下

在 merge 模式下需要转换一下类型。（`p.s.: 如果有更合适的方法可以提 pr`）

```vue
<template>
  <Codemirror
    merge
    :options="cmOptions"
    :height="300"
    class="cm-component"
    @change="onChange"
    @ready="onReady"
  />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { MergeView } from "codemirror/addon/merge/merge";
import { Editor } from "codemirror";
import Codemirror from "@/index";
import "codemirror/mode/htmlmixed/htmlmixed.js";

// console.log(MergeView);

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`<head>
  <title>codemirror-editor-vue3</title>
  <meta data-n-head="ssr" charset="utf-8">
</head>`);
    const orig2 = ref(`<head>
  <title>test title</title>
  <meta data-n-head="ssr" charset="utf-8">
</head>`);
    return {
      onChange(val: string, cm: any) {
        console.log(val);
        const cmMerge = cm as MergeView;
        const cminstance: Editor = cmMerge.editor();
        console.log(cminstance.getValue());
      },
      cmOptions: {
        value: code.value,
        origLeft: null,
        orig: orig2,
        connect: "align",
        mode: "text/html",
        lineNumbers: true,
        collapseIdentical: false,
        highlightDifferences: true,
      },
      onReady(cm: any) {
        const cmMerge = cm as MergeView;
        const cminstance: Editor = cmMerge.editor();
        console.log(cminstance.getValue());
      },
    };
  },
});
</script>
```
