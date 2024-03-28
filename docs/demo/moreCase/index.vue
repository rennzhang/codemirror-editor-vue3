<template>
  <div> Basic Demo</div>
  <Example
    :schema="{
      raw: jsDemoRaw,
      comp: jsDemo,
      describe: 'javascript 模式下可展示 json 数据',
      lang: 'javascript',
    }"
  />
</template>

<script lang="ts" setup>
import { describe } from "node:test";
import Example from "./components/Example.vue";
import jsDemo from "./cases/js.vue";
import jsDemoRaw from "./cases/js.vue?raw";

</script>

<style scoped lang="less"></style>
