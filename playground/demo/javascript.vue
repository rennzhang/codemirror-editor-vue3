<template>
  <div>
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      border
      :height="200"
      :width="400"
    />
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import type { EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";
// import 'codemirror/addon/fold/foldgutter.css'
// import 'codemirror/addon/fold/foldcode.js'
// import 'codemirror/addon/fold/foldgutter.js'
// import 'codemirror/addon/fold/brace-fold.js'

// language
import "codemirror/mode/javascript/javascript.js";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}`);

    const cmOptions: EditorConfiguration = {
      mode: "application/typescript",
      lineWiseCopyCut: true,
    };

    return {
      code,
      cmOptions,
    };
  },
});
</script>
