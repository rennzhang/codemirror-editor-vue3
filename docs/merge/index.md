### merge 模式

::: tip
组件内部已经引入 merge 模式相关依赖，只需要引入需要使用的语言模式和样式文件即可
:::

#### 说明
merge 模式需要配合[diff-match-patch](https://github.com/JackuB/diff-match-patch)插件使用（压缩后只占用6.3k），安装`codemirror-editor-vue3`时会自动引入该依赖

<component v-if="dynamicComponent" :is="dynamicComponent"></component>

<script >
export default {
  data() {
    return {
      dynamicComponent: null
    }
  },

  mounted() {
    import('../views/demo/merge.vue').then((module) => {
      this.dynamicComponent = module.default
    })
  }
}
</script>

```vue merge-mode-demo
<template>
  <Codemirror
    :merge="true"
    :options="cmOptions"
    :height="300"
    @change="onChange"
    class="cm-component"
  />
</template>

<script lang="ts">
import Codemirror from "codemirror-editor-vue3";
import "codemirror-editor-vue3/dist/style.css";

import "codemirror/mode/htmlmixed/htmlmixed.js";

import { ref, defineComponent } from "vue";

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
      change(val: string, instance: object) {
        console.log(val);
        console.log(instance);
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
    };
  },
});
</script>
```

  