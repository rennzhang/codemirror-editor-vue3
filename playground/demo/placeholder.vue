<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    :height="200"
    :placeholder="cmPlaceholder"
    @ready="onReady"
  />
  {{ code }}
</template>
<script lang="ts">
import { ref } from "vue";
import type { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";

// language
import "codemirror/mode/javascript/javascript.js";

import "codemirror/addon/display/placeholder";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref("");
    const cmPlaceholder = ref("test placeholder");

    const cmOptions: EditorConfiguration = {
      mode: "javascript",
    };

    cmPlaceholder.value += "1 ";

    setInterval(() => {
      cmPlaceholder.value += "1 ";
      console.log(cmPlaceholder.value);
    }, 2000);
    // onUnmounted(() => {
    //   clearInterval(timer);
    // });

    return {
      code,
      cmOptions,
      cmPlaceholder,
      onReady(cm: Editor) {
        // console.log(" cm", cm.pl);
        console.log(cm.getValue());
      },
    };
  },
});
</script>
