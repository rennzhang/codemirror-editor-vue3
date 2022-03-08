### Props

[cm_config_url]: https://codemirror.net/doc/manual.html#config
[cm_editor_type_url]: https://codemirror.net/doc/manual.html#config
[default_options_url]: https://github.com/RennCheung/codemirror-editor-vue3/blob/main/packages/src/config/index.ts#L68

| 名称              |                       说明                       | 类型                         |                 默认值                 | 是否必传 |
| ----------------- | :----------------------------------------------: | :--------------------------- | :------------------------------------: | :------: |
| `value(v-model)`  |                    编辑器内容                    | `string`                     |                   ""                   |    是    |
| `options`         |       [Codemirror 配置选项][cm_config_url]       | [Editor][cm_editor_type_url] | [DEFAULT_OPTIONS][default_options_url] |    否    |
| `placeholder`     |    编辑器占位内容，需引入 codemirror 相关文件    | `string`                     |                   -                    |    否    |
| `border`          |                    编辑器边框                    | `boolean`                    |                `false`                 |    否    |
| `width`           |              编辑器高度，默认 100%               | `string`                     |                `number`                |    否    |
| `height`          |                    编辑器高度                    | `string`                     |                `number`                |    否    |
| `KeepCursorInEnd` | 保持鼠标位置在最后一行，建议在使用实时日志时开启 | `boolean`                    |                `false`                 |    否    |
| `merge`           |                    merge 模式                    | `boolean`                    |                `false`                 |    否    |
| `name`            |        名称，将传给给组件内部的 textarea         | `string`                     |          父组件 name + "-cm"           |    否    |
