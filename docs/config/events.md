### 组件 Events

| 事件名称        | 说明           | 回调参数  |
| ------ |:------:| :--------|
| `change` | codemirror实例发生改变，返回 value 和该实例（如：绑定值变化或 options 变化）| `(value: string, instance: object) => void` |
| `input` | input | `(value: string) => void` |
| `ready`  | codemirror实例创建完成，返回该实例      |   `(instance: object) => void` |

### Codemirror Events

::: tip
以下事件为官方Codemirror自身事件，具体内容可以查阅官方文档 [Codemirror Event](https://codemirror.net/doc/manual.html#events)，使用本插件时可以直接通过组件绑定以下事件：
:::

```vue {8-10}
  <Codemirror
    v-model:value="code"
    :options="{ mode: 'text/x-vue', theme: 'default' }"
    border
    placeholder="测试 placeholder"
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