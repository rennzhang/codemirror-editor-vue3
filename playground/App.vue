<template>
  <div class="py-4 px-8">
    <h3 class="text-2xl mb-2">点击查看 Demo</h3>
    <div
      v-for="(item, index) in routes"
      :key="index"
      class="inline-block mr-3 text-blue-600 mb-3"
      :class="{ active: route.name == item.name }"
    >
      <router-link :to="item.path"
        ><span>{{ item.name }}</span></router-link
      >
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { routes } from "./router/index";

const route = useRoute();
</script>
<style lang="less">
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
