<template>
  <h1>Code Lint</h1>
  <div class="mb-3 mt-5">
    <a
      v-for="(item, index) in schemas"
      :key="index"
      class="mr-3 cursor-pointer"
      @click="current = index"
    >
      <span v-if="index == current">👉🏻</span>
      {{ item.lang }} Lint
    </a>
  </div>
  <Example :schema="currentSchema" />
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, computed } from "vue";
import Example from "../components/Example.vue";
import JsLintDemoRaw from "./jsLint.vue?raw";
import jsonLintRaw from "./jsonLint.vue?raw";

const current = ref(1);
const schemas = [
  {
    raw: JsLintDemoRaw,
    comp: defineAsyncComponent(() => import("./jsLint.vue")),
    describe: "校验 js 代码, 在任意位置输入字符尝试校验功能",
    lang: "javascript",
  },
  {
    raw: jsonLintRaw,
    comp: defineAsyncComponent(() => import("./jsonLint.vue")),
    describe: "校验 json 数据, 在任意位置输入字符尝试校验功能",
    lang: "application/json",
  },
];

const currentSchema = computed(() => schemas[current.value]);
</script>

<style scoped lang="less"></style>
