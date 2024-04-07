<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    :height="300"
    width="80%"
    class="cm-component"
    :border="true"
    @ready="onReady"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";
// language
// import "codemirror/mode/javascript/javascript.js";
// // import "codemirror/mode/clike/clike.js";
// import "codemirror/addon/lint/javascript-lint";
// import "codemirror/addon/lint/lint.css";
// import "codemirror/addon/lint/lint.js";
// import "codemirror/addon/lint/json-lint";

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

const props = defineProps<{
  lang: string;
}>();

watch(() => props.lang, (lang) => {
  import("codemirror/mode/clike/clike.js");
  console.log(lang);
}, {
  immediate: true,
});
const cmOptions:EditorConfiguration = reactive({
  mode: props.lang,
  // mode: "application/json",
  lineNumbers: true,
  lineWiseCopyCut: true,
  // gutters: ["CodeMirror-lint-markers"],
});
console.log(" cmOptions", cmOptions);

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
