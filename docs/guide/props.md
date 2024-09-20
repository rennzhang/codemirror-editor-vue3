# Component Props

[cm_config_url]: https://codemirror.net/doc/manual.html#config
[cm_editor_type_url]: https://codemirror.net/doc/manual.html#config
[default_options_url]: https://github.com/RennCheung/codemirror-editor-vue3/blob/main/packages/src/config/index.ts#L68

| name                |                                                                description                                                                | type                                      |                default                 |
| ------------------- | :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------- | :------------------------------------: |
| **value(v-model)**  |                                                              Editor content                                                               | `string`                                  |                   ""                   |
| **options**         |                                           [Configuration options of codemirror5][cm_config_url]                                           | [EditorConfiguration][cm_editor_type_url] | [DEFAULT_OPTIONS][default_options_url] |
| **placeholder**     |                                     Editor placeholder content to introduce codemirror related files                                      | `string`                                  |                   ""                   |
| **border**          |                                                     Whether to display editor borders                                                     | `boolean`                                 |                `false`                 |
| **width**           |                                                                   width                                                                   | `string`                                  |                `100%  `                |
| **height**          |                                                                  height                                                                   | `string`                                  |                `100%  `                |
| **original-style**  | Using the original style, disable the second modification of the style for this component (but does not affect width, height, and border) | ` boolean`                                |                `false`                 |
| **KeepCursorInEnd** |                                              Always keep the mouse position on the last line                                              | `boolean`                                 |                `false`                 |
| **merge**           |                                               merge mode, can also be used as diff pattern                                                | `boolean`                                 |                `false`                 |
| _name_              |                               Name, which is passed to the textarea inside the component(This is useless🙃)                               | `string`                                  |                   -                    |
