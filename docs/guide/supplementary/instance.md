::: tip Gets an instance object of the codemirror editor to perform a series of operations on the editor content, such
as select, insert, collapse, and so on. :::

## Obtained from the component ref

Get the component first, then get the instance object in the component, and pay attention to the lifecycle.

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
import Codemirror, { CmComponentRef } from "codemirror-editor-vue3"; // [!code focus]
import type { Editor, EditorConfiguration } from "codemirror";

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

## Get it through the hook function

You can get instance objects in 'change' and 'ready'.

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
import Codemirror from "codemirror-editor-vue3";
import type { Editor, EditorConfiguration } from "codemirror";

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
