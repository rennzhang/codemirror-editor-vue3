# Component Events
> The following three are only the events encapsulated by this component. Please refer to more events [Codemirror Events](./events#codemirror-events)

| event name |          description           | params                              |
| -------- | :---------------------: | :------------------------------------ |
| `change` |   value or instance changes    | `(value: string, cm: Editor) => void` |
| `input`  |          input          | `(value: string) => void`             |
| `ready`  | The Codemirror component is mounted | `(cm: Editor) => void;`               |

::: details Click me to view the demo
```vue
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    @change="onChange"// [!code focus]
    @input="onInput"// [!code focus]
    @ready="onReady"// [!code focus]
  >
  </Codemirror>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import "codemirror/mode/javascript/javascript.js";
import Codemirror from "codemirror-editor-vue3";

const code = ref('console.log("name")');

const cmOptions: EditorConfiguration = {
  mode: "text/javascript",
  lint: true,
};

const onChange = (val: string, cm: Editor) => {// [!code focus]
  console.log(val);// [!code focus]
  console.log(cm.getValue());// [!code focus]
};// [!code focus]

const onInput = (val: string) => {// [!code focus]
  console.log(val);// [!code focus]
};// [!code focus]

const onReady = (cm: Editor) => {// [!code focus]
  console.log(cm.focus());// [!code focus]
};// [!code focus]
</script>

```
:::


::: warning tip
change events in the merge mode are different, Case code:
 ::: details
```vue
<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    @change="onChange"// [!code focus]
  >
  </Codemirror>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import { MergeView } from "codemirror/addon/merge/merge";
import "codemirror/mode/javascript/javascript.js";
import Codemirror from "codemirror-editor-vue3";

const code = ref('console.log("name")');

const cmOptions: EditorConfiguration = {
  mode: "text/javascript",
  lint: true,
};

const onChange = (val: string, cm: any) => {      // [!code focus]
  console.log(val);// [!code focus]
  const cmMerge = cm as MergeView;// [!code focus]
  const cminstance: Editor = cmMerge.editor();// [!code focus]
  console.log(cminstance.getValue());// [!code focus]
};// [!code focus]

// ...
</script>

```
 :::
:::
---

## Codemirror Events

::: tip
The following events are official events of Codemirror5. You can refer to the official documents for details [Codemirror Event](https://codemirror.net/doc/manual.html#events)，You can use this component to bind events directly through components, for example：
:::

```vue {8-10}
<Codemirror
  v-model:value="code"
  :options="{ mode: 'text/x-vue', theme: 'default' }"
  border
  placeholder="test-placeholder"
  :height="200"
  @change="onChange"
  @blur="onBlur"
  @focus="onFocus"
  @scroll="onScroll"
/>
```

> All event names are as follows：

- `changes`
- `scroll`
- `beforeChange`
- `cursorActivity`
- `keyHandled`
- `inputRead`
- `electricInput`
- `beforeSelectionChange`
- `viewportChange`
- `swapDoc`
- `gutterClick`
- `gutterContextMenu`
- `focus`
- `blur`
- `refresh`
- `optionChange`
- `scrollCursorIntoView`
- `update`

