<template>
  <el-form-item label="Lang:" class="mr-4">
    <ElSelect v-model="value" placeholder="Select" style="width: 240px" size="small" filterable>
      <el-option v-for="item in LANG_OPTIONS" :key="item.value" :label="item.label" :value="item.value"
        @click.native="onLangChange(item)" />
    </ElSelect>
  </el-form-item>

</template>

<script lang="ts" setup>
import { ref, } from "vue";
import "codemirror/mode/apl/apl.js";
import { ElSelect, ElOption, ElFormItem } from "element-plus";
import { LangOption } from "../types"
import { LANG_OPTIONS } from "../config/langOptions";
const value = ref("javascript");
import { useStore } from "../store";

const store = useStore();


const onLangChange = (opt: LangOption) => {
  store.lang = opt.value
  store.langPath = opt.langPath
  store.code = opt.code
};

</script>

<style scoped lang="less"></style>
