### 组件 Events

| 事件名称 |          说明           | 回调参数                              |
| -------- | :---------------------: | :------------------------------------ |
| `change` |   value 或者实例改变    | `(value: string, cm: Editor) => void` |
| `input`  |          input          | `(value: string) => void`             |
| `ready`  | codemirror 实例创建完成 | `(cm: Editor) => void;`               |

### Codemirror Events

::: tip
以下事件为官方 Codemirror 自身事件，具体内容可以查阅官方文档 [Codemirror Event](https://codemirror.net/doc/manual.html#events)，使用本插件时可以直接通过组件绑定以下事件：
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

#### 说明

本插件实现动态获取用户绑定的事件，只想外部抛出已绑定的时间，减少不必要的事件监听，和避免 vue3 中，emit 未绑定的事件控制台出现警告的问题
