<template>
  <demo-preview
    v-bind="{ ...$attrs, ...$props }"
    title="Merge Mode："
    name="merge-mode-demo"
  >
    <Codemirror
      :merge="true"
      :options="cmOptions"
      :height="400"
      @change="onChange"
      class="cm-component"
    />
  </demo-preview>
</template>

<script lang="ts">
import Codemirror from "../../../packages/index.js";

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

