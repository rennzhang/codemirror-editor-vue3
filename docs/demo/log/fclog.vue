<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    :height="400"
  />
</template>

<script>
import { ref, defineComponent } from "vue";
import Codemirror, { createLinkMark, createLog, createTitle } from "../../../packages/index";

export default defineComponent({
  components: { Codemirror },
  setup() {
    const code = ref(`完整日志下载地址：${createLinkMark({
      href: "/logDownload",
      download: "",
      target: "_blank",
    })}

${createTitle("带有时间节点和输出类型的日志")}
${createLog("info content", "info")}
${createLog("warning content", "warning")}
${createLog("error content", "error")}
`);
    const cmOptions = {
      mode: "fclog",
    };
    return {
      ref,
      code,
      cmOptions,
    };
  },
});
</script>
