
<template>
  <div class="container">
    <Codemirror
      v-model:value="code"
      :options="cmOption"
      border
      placeholder="测试 placeholder"
      :height="200"
      @change="change"
    />
  </div>
</template>

<script lang="ts">
import Codemirror, {
  createTitle,
  createLinkMark,
  createLogMark,
  createLog,
} from "../packages/index.js";
console.log(createTitle);

// base style
import "codemirror/lib/codemirror.css";
import "codemirror/mode/css/css.js";

// language
import "codemirror/mode/vue/vue.js";
// language
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";

// merge css
import "codemirror/addon/merge/merge.css";
// merge js
import "codemirror/addon/merge/merge.js";
import dedent from "dedent";

import { ref, defineComponent, watch } from "vue";
export default defineComponent({
  name: "codemirror-example-merge-view",
  title: "Mode: text/html & merge view",
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`完整日志下载地址：${createLinkMark({
      href: "/logDownload",
      download: "",
      target: "_blank",
    })}
====================基本日志====================
${createLogMark("2021-08-26 15:07:09: job is success", "info")}
${createLogMark("2021-08-26 15:07:09: job is success", "warning")}
${createLogMark("2021-08-26 15:07:09: job is error", "error")}

DataStreamMain start
java.lang.NullPointerException
at
at java.util.Properties.load0(Properties.java:353)
====================带有时间节点====================
${createLog("info", "info")}
${createLog(
  `at com.zhiweicloud.dataprocess.util.common.PropertiesUtil.getStringByKey(PropertiesUtil.at com.zhiweicloud.dataprocess.util.common.PropertiesUtil.getStringByKey(PropertiesUtil.at com.zhiweicloud.dataprocess.util.common.PropertiesUtil.getStringByKey(PropertiesUtil.`,
  "error"
)}
${createLog("warning", "warning")}
${createLinkMark({ href: "/logDownload", download: "", target: "_blank" })}

${createLogMark("2021-08-26 15:07:09: job is success", "info")}
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
 `);
    const orig2 = ref(`<head>
    <title>test title</title>
<meta data-n-head="ssr" charset="utf-8">`);

    // watch(code, (val) => console.log(val), { deep: true });
    return {
      change(val: string, e: object) {
        // console.log(val);
        // console.log(e);
        console.log(code.value);
      },
      code,
      cmOption: {
        value: code.value,
        origLeft: null,
        orig: orig2,
        connect: "align",
        mode: "log",
        lineNumbers: true,
        lineWrapping: true,
        collapseIdentical: false,
        highlightDifferences: true,
      },
    };
  },
});
</script>
<style lang="less" scoped>
.container {
}
.example {
  display: flex;
  height: 100%;

  .codemirror,
  .pre {
    width: 50%;
    height: 100%;
    margin: 0;
    overflow: auto;
  }

  .pre {
    display: block;
    padding: 1rem;
    font-size: 12px;
    line-height: 1.6;
    word-break: break-all;
    word-wrap: break-word;
  }
}
</style>