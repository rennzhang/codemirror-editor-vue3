# [2.3.0](https://github.com/RennCheung/codemirror-editor-vue3/compare/v2.3.0-beta.1...v2.3.0) (2023-03-07)



# [2.3.0-beta.1](https://github.com/RennCheung/codemirror-editor-vue3/compare/v2.3.0-beta2...v2.3.0-beta.1) (2023-03-07)



# [2.3.0-beta2](https://github.com/RennCheung/codemirror-editor-vue3/compare/v2.2.1...v2.3.0-beta2) (2023-03-07)


### Bug Fixes

* Repair the packaging issues lead to cannot be highlighted ([a355314](https://github.com/RennCheung/codemirror-editor-vue3/commit/a3553148a29372ff5eae6396de978a295b0b278e))



## [2.2.1](https://github.com/RennCheung/codemirror-editor-vue3/compare/v2.2.0...v2.2.1) (2023-03-03)



# [2.2.0](https://github.com/RennCheung/codemirror-editor-vue3/compare/v2.1.9-beta1...v2.2.0) (2023-02-09)



## [2.1.9-beta1](https://github.com/RennCheung/codemirror-editor-vue3/compare/v2.1.7...v2.1.9-beta1) (2023-02-09)


### Bug Fixes

* Data not updated when all code is selected for deletion([#30](https://github.com/RennCheung/codemirror-editor-vue3/issues/30)) ([95b43ea](https://github.com/RennCheung/codemirror-editor-vue3/commit/95b43ea5638da37603b739d4632045f94901cf6f))



## [2.1.8](https://github.com/RennCheung/codemirror-editor-vue3/compare/v2.1.7...v2.1.8) (2023-01-31)



## [2.1.7](https://github.com/RennCheung/codemirror-editor-vue3/compare/v2.1.6...v2.1.7) (2022-06-06)


### Bug Fixes

* Remove the default height of 200([#20](https://github.com/RennCheung/codemirror-editor-vue3/issues/20)) ([a7b4121](https://github.com/RennCheung/codemirror-editor-vue3/commit/a7b41213ee1cc457cc532b2c75ca64d675371215))



## [2.1.6](https://github.com/RennCheung/codemirror-editor-vue3/compare/v2.1.4...v2.1.5) (2022-06-02)

### Bug Fixes

- **type:** change codemirror event type([#19](https://github.com/RennCheung/codemirror-editor-vue3/issues/19)) ([f29a9f5](https://github.com/RennCheung/codemirror-editor-vue3/commit/f29a9f5e9e7e06f5fb9d8fc95c17d4b46329621d))

## [2.1.4](https://github.com/RennCheung/codemirror-editor-vue3/compare/v2.1.3...v2.1.4) (2022-05-29)

### Bug Fixes

- 取出 emit 出现警告 ([882d120](https://github.com/RennCheung/codemirror-editor-vue3/commit/882d1207f698d94f3036f8a9fd156392d686f1ff))

### Features

- Set the default height to 200 ([1faa2f9](https://github.com/RennCheung/codemirror-editor-vue3/commit/1faa2f9f533628a44c228c1830698cdea4f71c1a))

## 2.1.3

`2022-05-07`

- 🌟 feat: Provides an option to turn off automatic style injection. Disable the plugin's secondary modifications and direct injection of styles into this header, removing all '! important` [#17](https://github.com/RennCheung/codemirror-editor-vue3/issues/17)

- ⚙️ type: Ts type adjustment, better TS support.

---

- 🌟 新功能: 提供关闭自动样式注入的选项，禁用本插件二次修改并直接注入到此头部的样式，去掉所有的`!important` [#17](https://github.com/RennCheung/codemirror-editor-vue3/issues/17)

- ⚙️ 类型: ts 类型调整，更好的 ts 支持

## 2.0.6

`2022-03-23`

- 🐞 fix: Repair "PlaceHolder" cannot respond to update issues [#15](https://github.com/RennCheung/codemirror-editor-vue3/issues/15)

---

- 🐞 fix: 修复 "PlaceHolder" 不能响应式更新的 bug [#15](https://github.com/RennCheung/codemirror-editor-vue3/issues/15)

## 2.0.4

`2022-03-17`

- 🐞 Fix the problem that the merge mode failed to be used. [#14](https://github.com/RennCheung/codemirror-editor-vue3/issues/14)
- 🌟 Add ts type: get the type of component through ref [CmComponentRef](https://github.com/RennCheung/codemirror-editor-vue3/blob/main/packages/index.ts#L16).

---

- 🐞 修复 merge 模式报错无法使用问题 [#14](https://github.com/RennCheung/codemirror-editor-vue3/issues/14)
- 🌟 增加 ts 类型：通过 ref 获取组件的类型[CmComponentRef](https://github.com/RennCheung/codemirror-editor-vue3/blob/main/packages/index.ts#L16)

## 2.0.3

`2022-03-15`

- 🐞 Repair cannot dynamically set the width and height [#11](https://github.com/RennCheung/codemirror-editor-vue3/issues/11).

---

- 🐞 修复无法动态设置宽度和高度问题 [#11](https://github.com/RennCheung/codemirror-editor-vue3/issues/11)

## 2.0.2

`2022-03-10`

- 🐞 Fix the log mode, `createTitle` function parameters `Symbol` has no default value.

---

- 🐞 修复 log 模式中, `createTitle` 函数参数 `symbol` 没有默认值问题

## 2.0.1

`2022-03-09`

- 🐞 Fix errors in README

---

- 🐞 修复 README 中错误

## 2.0.0

`2022-03-08`

- 🌟 Use TS reconstruction partial code, fully support TS type check.
  - Modify registration global component mode

---

- 🌟 使用 ts 重构部分代码，全面支持 ts 类型检查
  - 修改注册全局组件方式

## 1.0.1

`2022-01-04`

- 🌟 Change the version number only.

---

- 🌟 仅修改版本号

## 0.3.5

`2021-12-16`

- 🌟 Update part of document content
- 🐞 Fix the problem that this component is used in pop-up boxes or other animation effects, and changes the value before the animation ends, resulting in style disorder.

---

- 🌟 更新文档部分内容
- 🐞 修复本组件在弹出框或其他带有动画效果中使用，在动画结束前改变 value 导致样式错乱的问题

## 0.3.2

`2021-12-15`

- 🌟 Support styles to be automatically injected into the head tag, and there is no need to introduce component styles separately. (The related styles of codemirror itself still need to be introduced manually)
- 🌟 Increase the support of `KeepCursorInEnd` attribute, which can only be used in `fclog` mode.
- 🌟 Refactor partial code.
- 🐞 Fix cannot call the scrollTo method of the instance.

---

- 🌟 支持组件样式自动注入 head 标签中，不需要单独引入组件样式。(codemirror 本身的相关样式依然需要手动引入)
- 🌟 所有模式都可以使用 `KeepCursorInEnd` 属性，之前只能在`fclog`模式中使用
- 🌟 重构部分代码
- 🐞 修复不能调用实例的 scrollTo 方法问题

## 0.2.4

`2021-09-08`

- Delete useless dependencies

## v0.2.3

`2021-09-01`

- Update the readme to English
