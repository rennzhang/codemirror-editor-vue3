# Log mode

Based on the log modes derived from services, there are common log modes and custom log modes, as follows:

## Simple log mode(`mode: "log"`)

> By default, words that start with a capital letter are shown in red

<component v-if="log" :is="log"></component>

::: details Click to view the code

```vue
<template>
  <Codemirror v-model:value="code" :options="cmOptions" border :height="400" />
</template>

<script>
  import { ref, defineComponent } from "vue"
  import Codemirror, { createLinkMark, createLogMark, createTitle } from "codemirror-editor-vue3"

  export default defineComponent({
    components: { Codemirror },
    setup() {
      const code = ref(`Complete log download address: ${createLinkMark({
        href: "/logDownload",
        download: "",
        target: "_blank"
      })}
${createTitle("You can mark the output type of each log row")}
${createLogMark("2021-08-26 15:07:09: job is success", "info")}
${createLogMark("2021-08-26 15:07:09: job is success", "warning")}
${createLogMark("2021-08-26 15:07:09: job is error", "error")}

====================Engine log====================

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
        code,
        cmOptions
      }
    }
  })
</script>
```

:::

## Custom log mode(`mode: "fclog"`)

<component v-if="fcLog" :is="fcLog"></component>

::: details Click to view the code

```vue
<template>
  <Codemirror v-model:value="code" :options="cmOptions" border :height="400" />
  <a href=""></a>
</template>

<script>
  import { ref, defineComponent } from "vue"
  import Codemirror, {
    createLinkMark,
    createLogMark,
    createLog,
    createTitle
  } from "codemirror-editor-vue3"

  export default defineComponent({
    components: { Codemirror },
    setup() {
      const code = ref(`Complete log download address: ${createLinkMark({
        href: "/logDownload",
        download: "",
        target: "_blank"
      })}

${createTitle("Logs with time nodes and output types")}
${createLog("info content", "info")}
${createLog("warning content", "warning")}
${createLog("error content", "error")}
`)
      const cmOptions = {
        mode: "fclog",
        theme: "default"
      }
      return {
        code,
        cmOptions
      }
    }
  })
</script>
```

:::

## Log mode method description

| name | description | params | case |
| --- | :-: | :-- | :-: |
| `createLinkMark` | Create a clickable link (a tag), such as download the complete logs | support all a tag attributes, such as: `{ href: "/target-link", download: "", target: "_blank" }` | ![](../img/createMarkLink.jpg) |
| `createLogMark` | Flags the output type of the log | (text: string, type: `'info' \| 'warning' \| 'error'`) => void | ![](../img/info.jpg)![](../img/warning.jpg)![](../img/error.jpg) |
| `getLogMark` | Gets the text of the current tag and returns an array of nodes | `(value: string) => [{start: number, end: number ,node: HTMLElement}]` | - |
| `createTitle` | Create a title | `(value: string, symbolLength?: number = 15, symbol?:string = "=") => string` | ![](../img/createTitle.jpg) |
| `createLog` | **Only used in fclog mode**, create log text with time and type | (text: string, type: `'info' \| 'warning' \| 'error'`) => void | ![](../img/info.jpg)![](../img/warning-time.jpg)![](../img/error-time.jpg) |

<script>
import { shallowRef } from "vue"

export default {
  data() {
    return {
      log: null,
      fcLog:null
    }
  },

  mounted() {
    import('../demo/log/index.vue').then((module) => {
      this.log = shallowRef(module.default)
    })
    import('../demo/log/fclog.vue').then((module) => {
      this.fcLog = shallowRef(module.default)
    })
  }
}
</script>
