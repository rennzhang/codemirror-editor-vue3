# Custom Theme

CodeMirror editor supports custom themes, allowing you to create your own theme using CSS variables and styles. This
guide will show you how to create and use custom themes.

## Basic Usage

To use a custom theme, you need to:

1. Define theme CSS variables and styles
2. Set the theme name in the editor instance

Here's a complete example (theme code from [catppuccin/codemirror](https://github.com/catppuccin/codemirror)):

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
/* Define theme variables */
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

/* Base styles */
.cm-s-ctp-mocha.CodeMirror,
.cm-s-ctp-mocha .CodeMirror-gutters {
  background-color: var(--primary-bg);
  color: var(--fg3);
}

/* Line number styles */
.cm-s-ctp-mocha .CodeMirror-gutters {
  background: var(--primary-bg);
  border-right: 0px;
}
.cm-s-ctp-mocha .CodeMirror-linenumber {
  color: var(--bg4);
}

/* Cursor styles */
.cm-s-ctp-mocha .CodeMirror-cursor {
  border-left: 1px solid var(--fg);
}
.cm-s-ctp-mocha.cm-fat-cursor .CodeMirror-cursor {
  background-color: var(--cursor) !important;
}
.cm-s-ctp-mocha .cm-animate-fat-cursor {
  background-color: var(--cursor) !important;
}

/* Selected text styles */
.cm-s-ctp-mocha div.CodeMirror-selected {
  background: var(--selection);
}

/* Syntax highlighting styles */
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

/* Current line highlight */
.cm-s-ctp-mocha .CodeMirror-activeline-background {
  background: var(--current-line);
}

/* Matching bracket styles */
.cm-s-ctp-mocha .CodeMirror-matchingbracket {
  background: var(--gray);
  color: var(--bg0) !important;
}

/* Built-in functions and tag styles */
.cm-s-ctp-mocha span.cm-builtin {
  color: var(--orange);
}
.cm-s-ctp-mocha span.cm-tag {
  color: var(--orange);
}
</style>
```

## Theme Variables

In custom themes, you can use the following CSS variables to control different element styles:

- `--bg0`: Background color
- `--bg1`: Secondary background color
- `--bg4`: Line number color
- `--fg`: Primary text color
- `--fg3`: Secondary text color
- `--gray`: Gray text
- `--blue`: Blue highlight
- `--yellow`: Yellow highlight
- `--aqua`: Aqua highlight
- `--orange`: Orange highlight
- `--primary-bg`: Primary background color
- `--current-line`: Current line background color
- `--selection`: Selected text background color
- `--atom`: Atomic element color
- `--cursor`: Cursor color
- `--keyword`: Keyword color
- `--operator`: Operator color
- `--number`: Number color
- `--definition`: Definition color
- `--string`: String color

## Using Custom Theme

To use a custom theme, you need to:

1. Define theme-related CSS styles in your component
2. Set the theme name in the `onReady` callback:

```typescript
onReady(cm: Editor) {
  cm.setOption("theme", "your-theme-name");
}
```

Note: The theme name should match the CSS class name `cm-s-your-theme-name`.

## Best Practices

1. Use CSS variables to manage theme colors for easier maintenance and modification
2. Add appropriate namespaces to theme classes to avoid style conflicts
3. Ensure theme styles cover all necessary CodeMirror elements
4. Test syntax highlighting effects in different language modes
5. Consider adding dark/light theme switching support
