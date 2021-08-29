<template>
  <demo-preview v-bind="{ ...$attrs, ...$props }" name="log-mode-demo">
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      border
      :height="400"
    />
  </demo-preview>
</template>

<script setup>
import Codemirror, { createLinkMark, createLogMark, createTitle } from "../../../../packages/index.js";
import { ref } from "vue"

const code = ref(`完整日志下载地址：${createLinkMark({ href: "/logDownload", download: "", target: "_blank" })}
${createTitle("基本日志")}
${createLogMark("2021-08-26 15:07:09: job is success", "info")}
${createLogMark("2021-08-26 15:07:09: job is success", "warning")}
${createLogMark("2021-08-26 15:07:09: job is error", "error")}
${createTitle("带有时间节点")}
${createLinkMark({ href: "/logDownload", download: "", target: "_blank" })}

====================引擎日志==================== 

DataStreamMain start
java.lang.NullPointerException
at
at java.util.Properties.load0(Properties.java:353)
at java.util.Properties.load(Properties.java:341)
at com.zhiweicloud.dataprocess.util.common.PropertiesUtil.getStringByKey(PropertiesUtil.
at com.zhiweicloud.dataprocess.engine.FlinkEngine.readFlinkEngineConfig(FlinkEngine.
at com.zhiweicloud.dataprocess.engine.FlinkEngine.buildFlinkStream(FlinkEngine.
at com.zhiweicloud.dataprocess.engine.FlinkEngine.startFlinkEngine(FlinkEngine.
at com.zhiweicloud.dataprocess.DataStreamMain.main(DataStreamMain.
 `)
const cmOptions = {
  mode: 'log',
  theme: 'default'
}
</script>

  
