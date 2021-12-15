<template>
  <button @click="isShow = !isShow">change show</button>
  <div v-if="isShow">hahah</div>
  <div v-else>
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      border
      placeholder="test placeholder"
      :height="100"
      @change="change"
      @ready="onReady"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Codemirror from "../packages/index";
// import Codemirror from "../dist/codemirror-editor-vue3.es.js";

// language
import "codemirror/mode/javascript/javascript.js";

// theme
import "codemirror/theme/dracula.css";

const isShow = ref(false);
const code = ref("\n\n\n\n\n\n\n\n\n\n123");
const cmOptions = {
  mode: "text/javascript", // Language mode
  theme: "dracula", // Theme
  lineNumbers: true, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 2, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
};

const change = (msg, cm) => {
  console.log(cm);
  console.log(code.value);
  console.log("onChange");
  const scrollInfo = cm.getScrollInfo();
  cm.scrollTo(scrollInfo.left, scrollInfo.height);
};

const onReady = (cm) => {
  console.log("onReady", cm);
  const scrollInfo = cm.getScrollInfo();
  cm.scrollTo(scrollInfo.left, scrollInfo.top);
};

setInterval(() => {
  code.value += "test \n";
}, 2000);

onMounted(() => {});
</script>
<style lang="less" scoped></style>
