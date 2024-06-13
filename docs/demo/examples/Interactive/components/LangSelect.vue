<template>
  <el-form-item label="Lang:" class="mr-4">
    <ElSelect v-model="store.lang" placeholder="Select" style="width: 240px" size="small" filterable>
      <el-option
        v-for="item in langOptions"
        :disabled="item.disabled"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        @click="onLangChange(item)"
      >
        <span v-if="item.value === 'langConfig'" class="font-800">
          {{ item.label }}
        </span>
        <span v-else>
          {{ item.label }}
        </span>
      </el-option>
    </ElSelect>
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import "codemirror/mode/apl/apl.js";
import { ElSelect, ElOption, ElFormItem } from "element-plus";
import { LangOption } from "../types";
import { LANG_OPTIONS } from "../config/langOptions";
const value = ref("javascript");
import { useStore } from "../store";
const langOptions = computed(() => {
  // LANG_OPTIONS
  if (window.location.href.includes("example")) {
    return LANG_OPTIONS.filter((item) => item.value !== "langConfig");
  } else {
    return LANG_OPTIONS.filter((item) => item.value !== "moreLang");
  }
});

const store = useStore();

const onLangChange = (opt: LangOption) => {
  if (opt.value === "langConfig") {
    window.location.href = `${window.location.href}guide/lang`;
    return;
  }
  store.lang = opt.value;
  store.langPath = opt.langPath;
  store.code = opt.code;
};
</script>

<style scoped lang="less"></style>
