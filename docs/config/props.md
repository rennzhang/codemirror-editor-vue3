### Props

| 名称              |                                         说明                                         | 类型      |        默认值        | 是否必传 |
| ----------------- | :----------------------------------------------------------------------------------: | :-------- | :------------------: | :------: |
| `name`            |                          名称，将传给给组件内部的 textarea                           | `string`  | 父组件 name + "-cm"  |    否    |
| `placeholder`     |                      编辑器默认文字，需引入 codemirror 相关文件                      | `string`  |          -           |    否    |
| `value(v-model)`  |                                      编辑器内容                                      | `string`  |          -           |    是    |
| `merge`           |                                      merge 模式                                      | `boolean` |       `false`        |    否    |
| `options`         | Codemirror 配置选项，参考[Codemirror](https://codemirror.net/doc/manual.html#config) | `object`  | **`defaultOptions`** |    否    |
| `KeepCursorInEnd` |                   保持鼠标位置在最后一行，建议在使用实时日志时开启                   | `boolean` |       `false`        |    否    |
| `height`          |                                编辑器高度，默认 350px                                | `string`  |       `number`       |    否    |
| `width`           |                                编辑器高度，默认 100%                                 | `string`  |       `number`       |    否    |
| `border`          |                                      编辑器边框                                      | `boolean` |       `false`        |    否    |

### 说明

- **`defaultOptions`**:

```js
const defaulOptions = {
  mode: "text", // 语言模式
  theme: "default", // 主题
  lineNumbers: true, // 显示行号
  smartIndent: true, // 智能缩进
  indentUnit: 2, // 智能缩进单位为4个空格长度
  foldGutter: true, // 启用行槽中的代码折叠
  matchBrackets: true, // 匹配结束符号，比如"]、}"
  autoCloseBrackets: true, // 自动闭合符号
  styleActiveLine: true, // 显示选中行的样式
};
```
