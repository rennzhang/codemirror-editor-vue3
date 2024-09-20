# merge 模式

::: tip

组件内部已经引入 merge 模式相关依赖，只需要引入需要使用的语言模式和样式文件即可。

:::

## 说明

merge 模式需要配合[diff-match-patch](https://github.com/JackuB/diff-match-patch)插件使用（压缩后只占用 6.3k），为了更好
的开箱即用，安装`codemirror-editor-vue3`时会自动引入该依赖

<component v-if="dynamicComponent" :is="dynamicComponent"></component>

<script >
import { shallowRef } from "vue"
export default {
  data() {
    return {
      dynamicComponent: null
    }
  },

  mounted() {
    import('../../../demo/mergeDemo.vue').then((module) => {
      this.dynamicComponent = shallowRef(module.default)
    })
  }
}
</script>

:::details 点击查看代码

```vue
<template>
  <Codemirror merge :options="cmOptions" :height="400" @change="onChange" />
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import { MergeView } from "codemirror/addon/merge/merge";
import type { Editor } from "codemirror";

import Codemirror from "codemirror-editor-vue3";

import "codemirror/mode/htmlmixed/htmlmixed.js";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`<head>
  <title>codemirror-editor-vue</title>
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
      cmOptions: reactive({
        value: code,
        origLeft: null,
        orig: orig2,
        connect: "align",
        mode: "text/html",
        lineNumbers: true,
        collapseIdentical: false,
        highlightDifferences: true,
      }),
    };
  },
});
</script>
```

:::
