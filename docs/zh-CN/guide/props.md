# 组件 Props

[cm_config_url]: https://codemirror.net/doc/manual.html#config
[cm_editor_type_url]: https://codemirror.net/doc/manual.html#config
[default_options_url]: https://github.com/RennCheung/codemirror-editor-vue3/blob/main/packages/src/config/index.ts#L68

| 名称              |                            说明                            | 类型                         |                 默认值                 | 
| ----------------- | :--------------------------------------------------------: | :--------------------------- | :------------------------------------: | 
| **value(v-model)**  |                         编辑器内容                        | `string`                     |                   ""                   |  
| **options**         |            [codemirror5的配置项][cm_config_url]            | [EditorConfiguration][cm_editor_type_url] | [DEFAULT_OPTIONS][default_options_url] |  
| **placeholder**     |         编辑器占位内容，需引入 codemirror 相关文件       | `string`                     |                   ""                    | 
| **border**          |                         边框                      | `boolean`                    |                `false`                 | 
| **width**           |                   宽度               | `string`                     |                `100%  `                | 
| **height**          |                         高度                        | `string`                     |                `100%  `                | 
| **original-style**  | 使用原始样式，禁用此组件二次修改的样式(`但不影响宽度、高度和边框`) | ` boolean`                   |                `false`                 | 
| **KeepCursorInEnd** |      始终保持鼠标位置在最后一行      | `boolean`                    |                `false`                 | 
| **merge**           |                         `merge` 模式，也可作为 diff 模式                     | `boolean`                    |                `false`                 | 
| *name*            |             名称，将传给给组件内部的 textarea(没什么用🙃)            | `string`                     |          -           | 
