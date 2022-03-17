<!-- <template>
  <button @click="isShow = !isShow">change show</button>
  <div v-if="isShow">hahah</div>
  <div v-else>
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      border
      placeholder="test placeholder"
      :height="cmHeight"
      :width="cmWidth"
      keep-cursor-in-end
      @change="change"
      @ready="onReady"
      @input="onInput"
    />
  </div>
</template>
<script lang="ts">
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "@/index";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/dracula.css";

export default defineComponent({
  components: { Codemirror },
  setup() {
    // import Codemirror from "../dist/codemirror-editor-vue3.es.js";

    // language

    // theme
    const cmHeight = ref(100);
    const cmWidth = ref(null);
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

    // onMounted(() => {});
    return {
      isShow,
      code,
      cmOptions,
      cmHeight,
      cmWidth,
      change,
      onReady,
      onInput(val: string) {
        console.log("onInput", val);
      },
    };
  },
});
</script>
<style lang="less" scoped></style> -->
<!-- <template>
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
import Codemirror from "@/index";
import "codemirror/mode/htmlmixed/htmlmixed.js";

// console.log(MergeView);

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
</script> -->
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    :height="200"
    @ready="onReady"
    @change="onChange"
  >
  </Codemirror>
</template>

<script lang="ts">
import { ref } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "@/index";

// language
import "codemirror/mode/javascript/javascript.js";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`const ary = []`);
    const cminstance = ref<Editor>();

    const cmOptions: EditorConfiguration = {
      mode: "javascript",
    };

    const onReady = (cm: Editor) => {
      cminstance.value = cm;
      cminstance.value?.focus();
    };

    const onChange = (value: string, cm: Editor) => {
      cminstance.value = cm;
      cminstance.value?.focus();
    };

    return {
      code,
      cmOptions,
      onReady,
      onChange,
    };
  },
});
</script>
