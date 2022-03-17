### merge 模式

::: tip
组件内部已经引入 merge 模式相关依赖，只需要引入需要使用的语言模式和样式文件即可。
:::

#### 说明

merge 模式需要配合[diff-match-patch](https://github.com/JackuB/diff-match-patch)插件使用（压缩后只占用 6.3k），安装`codemirror-editor-vue3`时会自动引入该依赖

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
    import('../views/demo/mergeDemo.vue').then((module) => {
      this.dynamicComponent = shallowRef(module.default)
    })
  }
}
</script>

```vue merge-mode-demo
<template>
  <demo-preview
    v-bind="{ ...$attrs, ...$props }"
    title="Merge Mode："
    name="merge-mode-demo"
  >
    <Codemirror
      v-if="isMounted"
      :merge="true"
      :options="cmOptions"
      :height="400"
      class="cm-component"
      @change="onChange"
    />
  </demo-preview>
</template>

<script>
import { ref, defineComponent, onMounted, reactive } from "vue";

import Codemirror from "codemirror-editor-vue3";

import "codemirror/mode/htmlmixed/htmlmixed.js";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const isMounted = ref(false);
    const code = ref(`<head>
  <title>codemirror-editor-vue</title>
  <meta data-n-head="ssr" charset="utf-8">
</head>`);
    const orig2 = ref(`<head>
  <title>test title</title>
  <meta data-n-head="ssr" charset="utf-8">
</head>`);
    onMounted(() => {
      isMounted.value = true;
    });
    return {
      isMounted,
      onChange(val, cminstance) {
        console.log(val);
        console.log(cminstance);
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
