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
import Codemirror from "codemirror-editor-vue3";

import "codemirror/mode/htmlmixed/htmlmixed.js";

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
