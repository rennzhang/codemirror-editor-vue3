<template>
  <Example :raw="jsTemp">
    <template #config>
      <div class="flex w-full mb-3 flex-wrap">
        <div class="w-full flex flex-wrap">
          <LayoutConfig />
        </div>
        <hr class="w-full" />
        <div>
          <LangSelect />
        </div>
      </div>
    </template>
    <CodemirrorDemo />
  </Example>
</template>

<script lang="ts" setup>
import Example from "./components/Example.vue";
import CodemirrorDemo from "./demo.vue";
import TemplateRaw from "./template.pug?raw";
import LangSelect from "./components/LangSelect.vue";
import LayoutConfig from "./components/Layout.vue";
import { ref, watch } from "vue";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/checkbox/style/css";
import "element-plus/es/components/form/style/css";
import "element-plus/theme-chalk/dark/css-vars.css";

import { useStore } from "./store";

const store = useStore();
const jsTemp = ref(TemplateRaw.toString());

watch(
  () => store,
  (val, oldVal) => {
    const temp = TemplateRaw;
    console.log(" watch store", val, oldVal, val.themePath?.length);

    const transHeight = typeof val.height == "string" ? val.height : val.height + "";
    jsTemp.value = temp
      .replace("%code%", val.code)
      .replace("%theme%", val.theme)
      .replace("%lang%", val.lang == "json" ? "javascript" : val.lang)
      .replace("%width%", val.width)
      .replace("%height%", val.height)
      .replace("%border%", val.border + "")
      .replace("%readOnly%", val.readOnly + "")
      .replace("%langPath%", `import "${val.langPath}"`)
      .replace("%themePath%", val.themePath?.length ? `// theme \nimport "${val.themePath}"` : "");

    console.log(" jsTemp", jsTemp.value, val.code);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style scoped lang="less">
:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
