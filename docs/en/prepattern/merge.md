# Merge Mode

::: tip
merge pattern-related dependencies are already introduced within the component; you only need to import the language pattern and style files that you need to use.
:::

## introduce
The merge mode works with the [diff-match-patch](https://github.com/JackuB/diff-match-patch) plug-in(Only 6.3k after compression), For better out-of-the-box, this dependency is automatically introduced when you install 'codemirror-editor-vue3'.

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
    import('../../views/demo/mergeDemo.vue').then((module) => {
      this.dynamicComponent = shallowRef(module.default)
    })
  }
}
</script>

:::details Click to view the code
```vue 
<template>
  <Codemirror
    merge
    :options="cmOptions"
    :height="400"
    @change="onChange"
  />
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import { MergeView } from "codemirror/addon/merge/merge";
import { Editor, EditorSelectionChange } from "codemirror";

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