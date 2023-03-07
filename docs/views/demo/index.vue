<template>
  <Codemirror
    v-if="isMounted"
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="测试 placeholder"
    :height="200"
    class="cm-component"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Editor } from "codemirror";
import Codemirror from "../../../packages/index";

// language
import "codemirror/mode/javascript/javascript.js";

// theme
// import "codemirror/theme/dracula.css"

const isMounted = ref(false);

const code = ref(`var i = 0;
for (; i < 9; i++) {
    console.log(i);
    // more statements
}
`);

const onChange = (val: string, cm: Editor) => {
  console.log(val, cm);
};

const cmOptions = {
  mode: "text/javascript",
  theme: "default",
};
onMounted(() => {
  isMounted.value = true;
});
</script>
