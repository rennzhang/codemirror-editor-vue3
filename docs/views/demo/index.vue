<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="测试 placeholder"
    :height="200"
    @change="onChange"
    class="cm-component"
  />
</template>

<script setup>
import { Codemirror } from "../../../packages/index.js";
// base style
// import "codemirror/lib/codemirror.css";
// import "codemirror/mode/css/css.js";

// language
import "codemirror/mode/javascript/javascript.js";

// theme
// import "codemirror/theme/dracula.css"

import { ref } from "vue"
const code = ref(`var i = 0;
for (; i < 9; i++) {
    console.log(i);
    // more statements
}
`)

const onChange = (val, instance) => {
  console.log(val)
}

const cmOptions = {
  mode: 'text/javascript',
  //   theme: 'dracula'
  theme: 'default'
}
</script>

  
