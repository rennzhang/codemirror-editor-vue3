<template>
  <div>Basic Demo</div>
  <Example
    :schema="{
      raw: jsDemoRaw,
      comp: jsDemo,
      describe: 'javascript 模式下可展示 json 数据',
      lang: 'javascript'
    }"
  />
</template>

<script lang="ts" setup>
import Example from "./components/Example.vue"
import jsDemo from "./lang/js.vue"
import jsDemoRaw from "./lang/js.vue?raw"
</script>

<style scoped lang="less"></style>
