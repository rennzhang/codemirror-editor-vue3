<template>
  <el-form-item label="Theme:" class="mr-4">
    <el-select v-model="store.theme" placeholder="unit" class="min-w-80px max-w-120px" size="small" filterable>
      <el-option
        v-for="item in THEME_OPTIONS"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        @click="onThemeSelect(item)"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="width:" class="mr-4">
    <el-input
      v-model="widthCount"
      placeholder="Please input"
      class="input-with-select min-w-100px !w-100px"
      size="small"
    >
      <template #append>
        <el-select v-model="widthUnit" placeholder="unit" style="width: 60px" size="small">
          <el-option v-for="item in widthUnitOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </template>
    </el-input>
  </el-form-item>

  <el-form-item label="height:" class="mr-4">
    <el-input
      v-model="heightCount"
      placeholder="Please input"
      class="input-with-select min-w-100px !w-100px"
      size="small"
    >
      <template #append>
        <el-select v-model="heightUnit" placeholder="unit" style="width: 60px" size="small">
          <el-option v-for="item in widthUnitOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </template>
    </el-input>
  </el-form-item>
  <el-form-item label="fontSize:" class="mr-4 !w-140px">
    <el-input
      v-model="store.fontSize"
      placeholder="Please input"
      class="input-with-select min-w-40px max-w-60px"
      size="small"
    />
  </el-form-item>
  <el-form-item label="lineHeight:" class="mr-4">
    <el-input
      v-model="store.lineHeight"
      placeholder="Please input"
      class="input-with-select min-w-40px max-w-60px"
      size="small"
    />
  </el-form-item>
  <el-form-item label="bordered:">
    <el-checkbox v-model="store.border" class="min-w-40px" size="small" />
  </el-form-item>
  <el-form-item label="readonly:">
    <el-checkbox v-model="store.readOnly" class="min-w-40px" size="small" />
  </el-form-item>
</template>

<script lang="ts" setup>
import { ElSelect, ElOption, ElFormItem, ElCheckbox } from "element-plus";

import { ref, watch, inject } from "vue";
import { useStore } from "../store";
import { ThemeOption } from "../types";
import { THEME_OPTIONS } from "../config/themeOptions";
import "../config/theme";

const provideHeight = inject<number>("height");

const store = useStore();
const widthCount = ref(100);
const heightCount = ref(provideHeight || 400);
const widthUnit = ref("%");
const heightUnit = ref("px");

const onThemeSelect = (opt: ThemeOption) => {
  store.themePath = opt.filePath;
};

watch([widthCount, widthUnit], () => {
  store.width = `${widthCount.value}${widthUnit.value}`;
});

watch(
  [heightCount, heightUnit],
  () => {
    store.height = `${heightCount.value}${heightUnit.value}`;
  },
  {
    immediate: true,
  }
);

// 浏览器支持的所有宽度单位
const widthUnitOptions = [
  { label: "%", value: "%" },
  { label: "px", value: "px" },
  { label: "rem", value: "rem" },
  { label: "em", value: "em" },
  { label: "vw", value: "vw" },
  { label: "vh", value: "vh" },
];
</script>
<style lang="less">
.el-form-item {
  margin-bottom: 0;
}
</style>
