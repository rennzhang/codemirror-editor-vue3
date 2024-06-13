# 语言模式

> 通过配置可支持多种语言模式，[点击查看 codemirror5 所有已支持的语言](https://codemirror.net/5/mode/index.html)

## 查看案例

> 可以点击以下链接查看对应语言案例

- [javascript](/zh-CN/example?lang=javascript)
- [json](/zh-CN/example?lang=json)
- [css](/zh-CN/example?lang=css)
- [html](/zh-CN/example?lang=html)
- [apl](/zh-CN/example?lang=apl)
- [yaml](/zh-CN/example?lang=yaml)

更多案例陆续添加中，也可以参考下面的配置方法实现更多语言模式

## 语言配置

在 options 中设置 `mode`，并引入对应的语言包即可，通过配置可支持多种语言模式，
[点击查看 codemirror5 所有已支持的语言](https://codemirror.net/5/mode/index.html)

```vue {8,19}
<template>
  <Codemirror v-model:value="code" :options="cmOptions" border ref="cmRef" height="400" width="600" @change="onChange">
  </Codemirror>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Codemirror from "codemirror-editor-vue3";
import "codemirror/mode/javascript/javascript.js";
const code = ref(
  `var i = 0;
for (; i < 9; i++) {
    console.log(i);
    // more statements
}`
);

const cmRef = ref();
const cmOptions = {
  mode: "text/javascript",
};
const onChange = (val, cm) => {
  console.log(val);
  console.log(cm.getValue());
};

onUnmounted(() => {
  cmRef.value?.destroy();
});
</script>
```
