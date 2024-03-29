<template>
  <div class="example">
    <div class="example-showcase">
      <div class="w-full  mb-5">
        <div class=" mb-2">
          Theme: <span class="font-bold">{{ isDark?'dracula':'default' }}</span>
        </div>
        <div class=" mb-2">
          Lang: <span class="font-bold">{{ props.schema.lang }}</span>
        </div>
        <div class="font-bold">
          {{ props.schema.describe }}
        </div>
      </div>
      <component
        :is="props.schema.comp"
        ref="demoRef"
      />
    </div>
    <div class="example-action">
      <IconCopy
        v-if="!copied"
        style="margin-right: 6px"
        @click="copy(props.schema.raw)"
      />
      <span
        v-else
        style="font-size: 12px;margin-right: 6px"
      >Copied!</span>
      <IconCode @click="showCode = !showCode" />
    </div>
    <div
      :style="`height: ${showCode?'auto':'0'};`"
      class="example-source"
    >
      <VCodeBlock
        :code="props.schema.raw"
        highlightjs
        lang="html"
        :theme="theme"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref, defineProps, computed, watch,
} from "vue";
import { useClipboard } from "@vueuse/core";
import VCodeBlock from "@wdns/vue-code-block";
import { useData } from "vitepress";

import IconCopy from "./IconCopy.vue";
import IconCode from "./IconCode.vue";

// theme
import "codemirror/theme/dracula.css";

const props = defineProps<{
  schema: {
    describe?: string;
    lang: string;
    raw: string;
    comp: any
  },
}>();

const { isDark } = useData();

const showCode = ref(false);

const { copy, copied } = useClipboard();

const theme = ref("github");

const demoRef = ref<any>(null);

watch(() => [isDark, demoRef], ([val, cmRef]) => {
  if (!cmRef.value) return;
  cmRef.value?.setTheme(val.value ? "dracula" : "default");
  theme.value = val.value ? "github-dark" : "github";
}, { immediate: true, deep: true });

</script>

<style lang="less">
.example {
  border: 1px solid #e8e8e8;
  border-radius: 4px;

  .example-showcase {
    padding: 1.5rem;
    padding-top: .5rem;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .example-action {
    padding: 0.5rem;
    display: flex;
    justify-content: flex-end;
  }
}
.example-source {
  overflow: hidden;
  transition: height 0.3s;
  position: relative;
}
.icon-box {
  position: relative;
  cursor: pointer;
  padding: 2px;

  .tooltips {
    position: absolute;
    top: -38px;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 10px;
    background-color: #333;
    color: #fff;
    white-space: nowrap;
    font-size: 13px;
    border-radius: 4px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
}
</style>
