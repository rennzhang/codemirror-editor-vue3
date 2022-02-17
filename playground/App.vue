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
      keep-cursor-in-end
      @change="change"
      @ready="onReady"
      @input="onInput"
    />
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import { codemirror } from "@/index";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/dracula.css";

export default defineComponent({
  components: { Codemirror: codemirror },
  setup() {
    // import Codemirror from "../dist/codemirror-editor-vue3.es.js";

    // language

    // theme

    const isShow = ref(false);
    const code = ref("123");
    const cmOptions: EditorConfiguration = {
      mode: "text/javascript", // Language mode
      theme: "dracula", // Theme
      lineNumbers: true, // Show line number
      smartIndent: true, // Smart indent
      indentUnit: 2, // The smart indent unit is 2 spaces in length
    };

    const change = (msg: string, cm: Editor) => {
      console.log(cm);
      console.log(code.value);
      console.log("onChange");
      const scrollInfo = cm.getScrollInfo();
      cm.scrollTo(scrollInfo.left, scrollInfo.height);
    };

    const onReady = (cm: Editor) => {
      console.log("onReady", cm);

      const scrollInfo = cm.getScrollInfo();
      cm.scrollTo(scrollInfo.left, scrollInfo.top);
    };

    // setInterval(() => {
    //   code.value += "test \n";
    // }, 2000);

    onMounted(() => {});
    return {
      isShow,
      code,
      cmOptions,
      change,
      onReady,
      onInput(val: string) {
        console.log("onInput", val);
      },
    };
  },
});
</script>
<style lang="less" scoped></style>
