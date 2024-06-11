<template>
  <div style="width: 100%; ">
    <Example></Example>
  </div>
</template>

<script lang="ts" setup>
import { provide } from "vue"
import Example from "./examples/Interactive/index.vue"

provide("height", 280)
</script>
