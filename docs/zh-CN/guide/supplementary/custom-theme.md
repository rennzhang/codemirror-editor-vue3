# 自定义主题

CodeMirror 编辑器支持自定义主题，你可以通过 CSS 变量和样式来创建自己的主题。本文将介绍如何创建和使用自定义主题。

## 基本用法

要使用自定义主题，你需要：

1. 定义主题的 CSS 变量和样式
2. 在编辑器实例中设置主题名称

以下是一个完整的示例（主题代码来自 [catppuccin/codemirror](https://github.com/catppuccin/codemirror)）：

```vue
<template>
  <div class="h-500px w-300px">
    <Codemirror
      originalStyle
      :options="cmOptions"
      class="cm-component"
      @ready="onReady"
      @scroll="onScroll"
      v-model:value="code"
      :border="true"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { Editor } from "codemirror";
import Codemirror from "codemirror-editor-vue3";
// language
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/selection/active-line";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`function findSequence(goal) {
      function find(start, history) {
        if (start == goal)
          return history;
        else if (start > goal)
          return null;
        else
          return find(start + 5, "(" + history + " + 5)") ||
                 find(start * 3, "(" + history + " * 3)");
      }
      return find(1, "1");
    }`);

    return {
      code,
      cmOptions: {
        mode: "javascript",
        lineNumbers: true,
        highlightDifferences: true,
        lineWiseCopyCut: true,
        styleActiveLine: true,
      },
      onReady(cm: Editor) {
        cm.setOption("theme", "ctp-mocha");
      },
      onScroll(cm: any) {
        console.log(cm);
      },
    };
  },
});
</script>

<style>
/* 定义主题变量 */
div.cm-s-ctp-mocha.CodeMirror {
  --bg0: #1e1e2e;
  --bg1: #7f849c;
  --bg4: #6c7086;
  --fg: #cdd6f4;
  --fg3: #a6adc8;
  --gray: #bac2de;
  --blue: #89b4fa;
  --yellow: #f9e2af;
  --aqua: #89b4fa;
  --orange: #fab387;
  --primary-bg: #1e1e2e;
  --current-line: #313244;
  --selection: #585b70;
  --atom: #b4befe;
  --cursor: #7f849c;
  --keyword: #f38ba8;
  --operator: #89dceb;
  --number: #fab387;
  --definition: #89b4fa;
  --string: #a6e3a1;
}

/* 基础样式 */
.cm-s-ctp-mocha.CodeMirror,
.cm-s-ctp-mocha .CodeMirror-gutters {
  background-color: var(--primary-bg);
  color: var(--fg3);
}

/* 行号样式 */
.cm-s-ctp-mocha .CodeMirror-gutters {
  background: var(--primary-bg);
  border-right: 0px;
}
.cm-s-ctp-mocha .CodeMirror-linenumber {
  color: var(--bg4);
}

/* 光标样式 */
.cm-s-ctp-mocha .CodeMirror-cursor {
  border-left: 1px solid var(--fg);
}
.cm-s-ctp-mocha.cm-fat-cursor .CodeMirror-cursor {
  background-color: var(--cursor) !important;
}
.cm-s-ctp-mocha .cm-animate-fat-cursor {
  background-color: var(--cursor) !important;
}

/* 选中文本样式 */
.cm-s-ctp-mocha div.CodeMirror-selected {
  background: var(--selection);
}

/* 语法高亮样式 */
.cm-s-ctp-mocha span.cm-meta {
  color: var(--blue);
}
.cm-s-ctp-mocha span.cm-comment {
  color: var(--gray);
}
.cm-s-ctp-mocha span.cm-number {
  color: var(--number);
}
.cm-s-ctp-mocha span.cm-atom {
  color: var(--atom);
}
.cm-s-ctp-mocha span.cm-keyword {
  color: var(--keyword);
}
.cm-s-ctp-mocha span.cm-variable {
  color: var(--fg);
}
.cm-s-ctp-mocha span.cm-variable-2 {
  color: var(--fg);
}
.cm-s-ctp-mocha span.cm-variable-3,
.cm-s-ctp-mocha .cm-s-gruvbox-dark span.cm-type {
  color: var(--yellow);
}
.cm-s-ctp-mocha span.cm-operator {
  color: var(--operator);
}
.cm-s-ctp-mocha span.cm-callee {
  color: var(--fg);
}
.cm-s-ctp-mocha span.cm-def {
  color: var(--definition);
}
.cm-s-ctp-mocha span.cm-property {
  color: var(--fg);
}
.cm-s-ctp-mocha span.cm-string {
  color: var(--string);
}
.cm-s-ctp-mocha span.cm-string-2 {
  color: var(--aqua);
}
.cm-s-ctp-mocha span.cm-qualifier {
  color: var(--aqua);
}
.cm-s-ctp-mocha span.cm-attribute {
  color: var(--aqua);
}

/* 当前行高亮 */
.cm-s-ctp-mocha .CodeMirror-activeline-background {
  background: var(--current-line);
}

/* 匹配括号样式 */
.cm-s-ctp-mocha .CodeMirror-matchingbracket {
  background: var(--gray);
  color: var(--bg0) !important;
}

/* 内置函数和标签样式 */
.cm-s-ctp-mocha span.cm-builtin {
  color: var(--orange);
}
.cm-s-ctp-mocha span.cm-tag {
  color: var(--orange);
}
</style>
```

## 主题变量说明

在自定义主题中，你可以使用以下 CSS 变量来控制不同元素的样式：

- `--bg0`: 背景色
- `--bg1`: 次要背景色
- `--bg4`: 行号颜色
- `--fg`: 主要文本颜色
- `--fg3`: 次要文本颜色
- `--gray`: 灰色文本
- `--blue`: 蓝色高亮
- `--yellow`: 黄色高亮
- `--aqua`: 青色高亮
- `--orange`: 橙色高亮
- `--primary-bg`: 主背景色
- `--current-line`: 当前行背景色
- `--selection`: 选中文本背景色
- `--atom`: 原子元素颜色
- `--cursor`: 光标颜色
- `--keyword`: 关键字颜色
- `--operator`: 运算符颜色
- `--number`: 数字颜色
- `--definition`: 定义颜色
- `--string`: 字符串颜色

## 使用自定义主题

要使用自定义主题，你需要：

1. 在组件中定义主题相关的 CSS 样式
2. 在 `onReady` 回调中设置主题名称：

```typescript
onReady(cm: Editor) {
  cm.setOption("theme", "your-theme-name");
}
```

注意：主题名称应该与 CSS 类名中的 `cm-s-your-theme-name` 保持一致。

## 最佳实践

1. 使用 CSS 变量来管理主题颜色，便于统一管理和修改
2. 为主题类添加适当的命名空间，避免样式冲突
3. 确保主题样式覆盖所有必要的 CodeMirror 元素
4. 测试不同语言模式下的语法高亮效果
5. 考虑添加暗色/亮色主题切换支持
