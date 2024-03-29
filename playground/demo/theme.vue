<template>
  <div>
    darcula theme:
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      border
      :height="200"
    />
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import type { EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";

// language
import "codemirror/mode/javascript/javascript.js";

// theme
import "codemirror/theme/darcula.css";

// console.dir();

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref("const obj = {}");

    const cmOptions: EditorConfiguration = {
      mode: "javascript",
      theme: "darcula",
    };

    return {
      code,
      cmOptions,
    };
  },
});
</script>
