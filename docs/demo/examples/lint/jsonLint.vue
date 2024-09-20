<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    :height="300"
    width="90%"
    class="cm-component"
    :border="true"
    @ready="onReady"
  />
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";
import jsonlint from "jsonlint-mod";
// language json or js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/json-lint";

window.jsonlint = jsonlint;

const code = ref(`{
  "compilerOptions": {
    "baseUrl": ".",
    "module": "ESNext",
    "target": "esnext",
    "lib": ["DOM", "ESNext"],
    "types": ["vite/client"],
    "jsx": "preserve",
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "incremental": false,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noUnusedLocals": true,
    "strictNullChecks": true,
    "declaration": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@/*": ["packages/*"],
      "./*": ["./*"],
      "codemirror-editor-vue3": ["packages/index.ts"]
    }
  },
  "include": [
    "packages/**/*",
    "playground/**/*",
    "docs/**/*",
    "docs/demo/**/*",
    "script",
    "types",
    "*.ts",
    "*.tsx",
    "*.vue",
    "*.d.ts",
    "*.md"
  ]
}
`);

const cmOptions: EditorConfiguration = reactive({
  mode: "application/json",
  lineNumbers: true,
  lineWiseCopyCut: true,
  gutters: ["CodeMirror-lint-markers"],
  lint: true,
});

const cminstance = ref<Editor | null>(null);
const onReady = (cm: Editor) => {
  cminstance.value = cm;
  console.log(cm.getValue());
};

defineExpose({
  setTheme: (theme: string) => {
    console.log(" theme", theme);
    cminstance.value?.setOption("theme", theme);
  },
});
</script>
<style lang="less" scoped>
.cm-component {
  font-family: monospace;
}
</style>
