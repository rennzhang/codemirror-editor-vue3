<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    :height="300"
    width="90%"
    class="cm-component"
    :border="true"
    @ready="onReady"
  />
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";
import { JSHINT } from "jshint";
// language json or js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint.js";

window.JSHINT = JSHINT;

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

const cmOptions: EditorConfiguration = reactive({
  mode: "javascript",
  lineNumbers: true,
  lineWiseCopyCut: true,
  // 是否在编辑器侧边栏中显示代码提示
  // Whether to display code hints in the editor sidebar
  gutters: ["CodeMirror-lint-markers"],
  lint: true,
});

const cminstance = ref<Editor | null>(null);
const onReady = (cm: Editor) => {
  cminstance.value = cm;
  console.log(cm.getValue());
};

defineExpose({
  setTheme: (theme: string) => {
    cminstance.value?.setOption("theme", theme);
  },
});
</script>
<style lang="less" scoped>
.cm-component {
  font-family: monospace;
}
</style>
