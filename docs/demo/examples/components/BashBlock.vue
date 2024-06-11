<template>
  <div class="vp-code-group vp-adaptive-theme">
    <div class="tabs">
      <input id="tab-JFiS9vo" type="radio" name="group-Qis5R" checked /><label for="tab-JFiS9vo" @click="type = 'npm'"
        >npm</label
      ><input id="tab-NQHnuSp" type="radio" name="group-Qis5R" /><label for="tab-NQHnuSp" @click="type = 'yarn'"
        >yarn</label
      ><input id="tab-S4PgNg6" type="radio" name="group-Qis5R" /><label for="tab-S4PgNg6" @click="type = 'pnpm'"
        >pnpm</label
      >
    </div>
    <div class="blocks">
      <div class="language-bash vp-adaptive-theme active">
        <button title="Copy Code" class="copy" />
        <span class="lang">bash</span>
        <div class="shiki shiki-themes github-light github-dark vp-code py-5 px-20px text-14px">
          <span class="line">
            <span style="--shiki-light: #6f42c1; --shiki-dark: #b392f0" class="mr-8px">{{ type }} </span>
            <span style="--shiki-light: #032f62; --shiki-dark: #9ecbff" class="mr-8px">
              {{ typeCommadnMap[type] }}
            </span>
            <span
              v-for="(item, index) in props.deps"
              :key="index"
              class="mr-8px"
              style="--shiki-light: #032f62; --shiki-dark: #9ecbff"
            >
              {{ item }}</span
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const props = defineProps<{
  deps: string[]
}>()

const typeCommadnMap = {
  npm: "install",
  yarn: "add",
  pnpm: "add"
}
const type = ref<keyof typeof typeCommadnMap>("npm")
</script>

<style scoped lang="less">
.line span {
  white-space: pre;
  font-family: var(--vp-font-family-mono);
}
</style>
