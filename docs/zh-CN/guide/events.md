# 组件事件

> 以下三种仅是本组件封装的事件，更多事件请查阅 [Codemirror Events](./events#codemirror-events)

| 事件名称 |        说明        | 参数                                  |
| -------- | :----------------: | :------------------------------------ |
| `change` | `值`或者`实例`改变 | `(value: string, cm: Editor) => void` |
| `input`  |       input        | `(value: string) => void`             |
| `ready`  |    组件加载完成    | `(cm: Editor) => void;`               |

示例:

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
import "codemirror/mode/javascript/javascript.js";
import Codemirror from "codemirror-editor-vue3";
import type { Editor, EditorConfiguration } from "codemirror";

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

::: warning 注意 `merge(diff)` 模式下 `change` 事件有所不同, 示例:

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
import "codemirror/mode/javascript/javascript.js";
import Codemirror from "codemirror-editor-vue3";
import type { Editor, EditorConfiguration } from "codemirror";
import type { MergeView } from "codemirror/addon/merge/merge";

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

</script>
```

:::

## Codemirror 自身事件

::: tip

以下事件为 Codemirror5 官方自身事件，具体内容可以查阅官方文档 [Codemirror Event](https://codemirror.net/doc/manual.html#events)，使用本插件时可以直接通过组件绑定事件，例如：

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

> 所有事件名称如下：

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
