
<template>
  <Codemirror
    :merge="true"
    v-model:value="code"
    :options="cmOption"
    border
    placeholder="测试 placeholder"
    :height="200"
    @change="change"
  />
</template>

<script lang="ts">
import Codemirror, { createTitle } from "../packages/index.js";
console.log(createTitle);

// base style
import "codemirror/lib/codemirror.css";
import "codemirror/mode/css/css.js";

// language
import "codemirror/mode/vue/vue.js";
// language
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";

// merge css
import "codemirror/addon/merge/merge.css";
// merge js
import "codemirror/addon/merge/merge.js";
import dedent from "dedent";

import { ref, defineComponent, watch } from "vue";
export default defineComponent({
  name: "codemirror-example-merge-view",
  title: "Mode: text/html & merge view",
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`<head>
    <title>vue-codemirror | Homepage | Surmon's projects</title>
<meta data-n-head="ssr" charset="utf-8">`);
    const orig2 = ref(`<head>
    <title>test title</title>
<meta data-n-head="ssr" charset="utf-8">`);

    // watch(code, (val) => console.log(val), { deep: true });
    return {
      change(val: string, e: object) {
        // console.log(val);
        // console.log(e);
        console.log(code.value);
      },
      code,
      cmOption: {
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
<style lang="less" scoped>
.example {
  display: flex;
  height: 100%;

  .codemirror,
  .pre {
    width: 50%;
    height: 100%;
    margin: 0;
    overflow: auto;
  }

  .pre {
    display: block;
    padding: 1rem;
    font-size: 12px;
    line-height: 1.6;
    word-break: break-all;
    word-wrap: break-word;
  }
}
</style>