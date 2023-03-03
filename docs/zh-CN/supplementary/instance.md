::: tip
获取 codemirror editor 的实例对象，从而对编辑器内容进行一系列的操作，比如选中、插入、折叠等等。
:::

## 通过组件 ref 获取

先获取组件，再获取组件中的实例对象，需要注意生命周期。

```vue
<template>
  <Codemirror
    ref="cmComponentRef" // [!code focus]
    v-model:value="code"
    :options="cmOptions"
    border
    :height="200"
  >
  </Codemirror>
</template>

<script lang="ts">
import { ref } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror, { CmComponentRef } from "codemirror-editor-vue3"; // [!code focus]

// language
import "codemirror/mode/javascript/javascript.js";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`const ary = []`);
    const cmComponentRef = ref<CmComponentRef>(null);
    const cminstance = ref<Editor>();// [!code focus]

    const cmOptions: EditorConfiguration = {
      mode: "javascript",
    };

    onMounted(() => {// [!code focus]
      cminstance.value = cmComponentRef.value?.cminstance;// [!code focus]
      cminstance.value?.focus();// [!code focus]
    });// [!code focus]

    // or// [!code focus]
    nextTick(() => {// [!code focus]
      cminstance.value = cmComponentRef.value?.cminstance;// [!code focus]
      cminstance.value?.focus();// [!code focus]
    });// [!code focus]

    return {
      cmComponentRef,
      code,
      cmOptions,
    };
  },
});
</script>
```

## 通过钩子函数获取

可以在`change`和`ready`中拿到实例对象

```vue
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    :height="200"
    @ready="onReady" // [!code focus]
    @change="onChange" // [!code focus]
  >
  </Codemirror>
</template>

<script lang="ts">
import { ref } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";

// language
import "codemirror/mode/javascript/javascript.js";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`const ary = []`);
    const cminstance = ref<Editor>(); // [!code focus]

    const cmOptions: EditorConfiguration = {
      mode: "javascript",
    };

    const onReady = (cm: Editor) => {// [!code focus]
      cminstance.value = cm;// [!code focus]
      cminstance.value?.focus();// [!code focus]
    };// [!code focus]

    const onChange = (value: string, cm: Editor) => {// [!code focus]
      cminstance.value = cm;// [!code focus]
      cminstance.value?.focus();// [!code focus]
    };// [!code focus]

    return {
      code,
      cmOptions,
      onReady,
      onChange,
    };
  },
});
</script>
```
