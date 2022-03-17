### 通过 ref 获取

```vue
<template>
  <Codemirror
    ref="cmRefDom"
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
import Codemirror, { CmComponentRef } from "codemirror-editor-vue3";

// language
import "codemirror/mode/javascript/javascript.js";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`const ary = []`);
    const cmRefDom = ref<CmComponentRef>(null);
    const cminstance = ref<Editor>();

    const cmOptions: EditorConfiguration = {
      mode: "javascript",
    };

    onMounted(() => {
      cminstance.value = cmRefDom.value?.cminstance;
      cminstance.value?.focus();
    });

    // or
    // nextTick(() => {
    //   cminstance.value = cmRefDom.value?.cminstance;
    //   cminstance.value?.focus();
    // });

    return {
      cmRefDom,
      code,
      cmOptions,
    };
  },
});
</script>
```

### 通过钩子函数获取

```vue
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    :height="200"
    @ready="onReady"
    @change="onChange"
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
    const cminstance = ref<Editor>();

    const cmOptions: EditorConfiguration = {
      mode: "javascript",
    };

    const onReady = (cm: Editor) => {
      cminstance.value = cm;
      cminstance.value?.focus();
    };

    const onChange = (value: string, cm: Editor) => {
      cminstance.value = cm;
      cminstance.value?.focus();
    };

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
