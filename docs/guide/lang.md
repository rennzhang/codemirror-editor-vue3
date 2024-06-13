# Language Modes

> Multiple language modes can be supported through
> configuration,[Click to view all supported languages in codemirror5](https://codemirror.net/5/mode/index.html)

## View the case

> You can click on the following link to view corresponding language cases

- [javascript](/example?lang=javascript)
- [json](/example?lang=json)
- [css](/example?lang=css)
- [html](/example?lang=html)
- [apl](/example?lang=apl)
- [yaml](/example?lang=yaml)

More cases are gradually being added, and you can also refer to the following configuration methods to achieve more
language modes.

## Language Configuration

Just set `mode` in options and introduce the corresponding language pack. Multiple language modes can be supported
through configuration. [Click to view all supported languages in codemirror5](https://codemirror.net/5/mode/index.html)

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
