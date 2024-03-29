<template>
  <div class="min-w-80vw py-4 px-8">
    <h3 class="mb-4 text-2xl text-gray-400">
      👇👇👇 Click to view the example 👇👇👇
    </h3>
    <div
      v-for="(item, index) in routes"
      :key="index"
      class="mr-3 mb-3 text-blue-500 inline-block"
      :class="{ active: route.name == item.name }"
    >
      <router-link :to="item.path">
        <span>{{ item.name }}</span>
      </router-link>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { routes } from "./router/index";

const route = useRoute();
</script>
<style lang="less">
  #app {
    margin: 0 auto;
    padding: 2rem;
    font-weight: normal;
    width: 90vw;
    font-size: 14px;
  }
  .router-link-exact-active {
    span {
      text-decoration: underline;
    }
    &::before {
      content: "🌰";
      margin-right: 4px;
    }
  }
</style>
