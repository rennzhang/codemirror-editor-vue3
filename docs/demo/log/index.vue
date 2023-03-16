<template>
  <Codemirror v-model:value="code" :options="cmOptions" border :height="400" />
</template>

<script>
  import { ref, defineComponent } from "vue"
  import Codemirror, { createLinkMark, createLogMark, createTitle } from "../../../packages/index"

  export default defineComponent({
    components: { Codemirror },
    setup() {
      const code = ref(`完整日志下载地址：${createLinkMark({
        href: "/logDownload",
        download: "",
        target: "_blank"
      })}
${createTitle("可以标记每一行日志的输出类型")}
${createLogMark("2021-08-26 15:07:09: job is success", "info")}
${createLogMark("2021-08-26 15:07:09: job is success", "warning")}
${createLogMark("2021-08-26 15:07:09: job is error", "error")}

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
        mode: "log",
        theme: "default"
      }
      return {
        Codemirror,
        createLinkMark,
        createLogMark,
        createTitle,
        ref,
        code,
        cmOptions
      }
    }
  })
</script>
