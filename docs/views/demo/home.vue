<template>
  <div style="width: 60%; margin-left: 20vw">
    <Codemirror v-model:value="code" :options="cmOptions" border :height="300">
    </Codemirror>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Codemirror from "../../../packages/index";
import type { EditorConfiguration } from "codemirror";

// language
import "codemirror/mode/javascript/javascript.js";

const code = ref(
  `var arr = [3, 10, 6, 2];
for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
            var num = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = num;
        }
    }
}
console.log(arr)`
);

const cmOptions: EditorConfiguration = {
  mode: "text/javascript",
};
</script>
