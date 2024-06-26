<template>
  <div>
    darcula theme:
    <Codemirror v-model:value="code" :options="cmOptions" border :height="200" />
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import type { EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";

// language
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/lint/lint.css";
// import 'codemirror/addon/fold/foldgutter.css'
// import 'codemirror/addon/fold/foldcode.js'
// import 'codemirror/addon/fold/foldgutter.js'
// import 'codemirror/addon/fold/brace-fold.js'

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`{
  "name": "codemirror-editor-vue3",
  "description": "CodeMirror component for Vue3",
  "version": "2.4.1",
  "license": "MIT",
  "files": [
    "dist"
  ],
  "type": "module",
  "types": "./dist/packages/index.d.ts",
  "main": "./dist/codemirror-editor-vue3.umd.cjs",
  "module": "./dist/codemirror-editor-vue3.js",
  "exports": {
    ".": {
      "import": "./dist/codemirror-editor-vue3.js",
      "require": "./dist/codemirror-editor-vue3.umd.cjs"
    }
  },
  "private": false,
  "author": {
    "name": "RennCheung",
    "email": "906155099@qq.com"
  },
  "homepage": "https://rennzhang.github.io/codemirror-editor-vue3/",
  "unpkg": "dist/codemirror-editor-vue3.js",
  "jsnext:main": "dist/codemirror-editor-vue3.js",
  "jspm": {
    "main": "dist/codemirror-editor-vue3.js",
    "registry": "npm",
    "format": "esm"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/rennzhang/codemirror-editor-vue3/"
  },
  "keywords": [
    "codemirror-editor-vue3",
    "vue3 codemirror",
    "codemirror",
    "vue3",
    "log mode",
    "log"
  ],
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "docs-dev": "vitepress dev docs --open",
    "docs-build": "vitepress build docs",
    "docs-serve": "vitepress serve docs",
    "deploy-docs": "bash scripts/deploy-docs.sh",
    "release": "tsx scripts/release.ts",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "tsc": "tsc",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "codemirror": "^5.65.16",
    "diff-match-patch": "^1.0.5"
  },
  "peerDependencies": {
    "codemirror": "^5.65.16",
    "diff-match-patch": "^1.0.5",
    "vue": "^3.x"
  },
  "devDependencies": {
    "@commitlint/cli": "^16.1.0",
    "@commitlint/config-conventional": "^16.0.0",
    "@types/codemirror": "^5.60.15",
    "@types/diff-match-patch": "^1.0.32",
    "@types/node": "^16.11.13",
    "@typescript-eslint/eslint-plugin": "^5.54.0",
    "@typescript-eslint/parser": "^5.54.0",
    "@vitejs/plugin-vue": "^4.0.0",
    "@vitejs/plugin-vue-jsx": "^3.0.0",
    "@vue/cli-plugin-typescript": "~4.5.15",
    "chalk": "^4.1.2",
    "conventional-changelog-cli": "^2.0.31",
    "dedent": "^0.7.0",
    "diff-match-patch": "^1.0.5",
    "eslint": "^8.35.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-vue": "^9.9.0",
    "execa": "^7.0.0",
    "less": "^4.1.3",
    "lint-staged": "^10.2.10",
    "minimist": "^1.2.6",
    "picocolors": "^1.0.0",
    "prettier": "^2.8.4",
    "prompts": "^2.4.2",
    "rollup-plugin-vue": "^6.0.0",
    "semver": "^7.3.5",
    "tsx": "^3.12.3",
    "enquirer": "^2.3.6",
    "typescript": "^4.9.5",
    "unplugin-auto-import": "^0.15.0",
    "vite": "^4.1.4",
    "vite-plugin-checker": "^0.5.6",
    "vite-plugin-dts": "^2.0.2",
    "vite-plugin-pages": "^0.28.0",
    "vite-plugin-windicss": "^1.8.10",
    "vitepress": "1.0.0-alpha.49",
    "vue": "^3.2.47",
    "vue-router": "^4.1.6",
    "vue-tsc": "^1.2.0",
    "windicss": "^3.5.6",
    "yorkie-pnpm": "^2.0.1"
  }
}
`);

    const cmOptions: EditorConfiguration = {
      // json编辑器选项
      mode: "application/json",
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      autofocus: false,
      foldGutter: false,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    };

    return {
      code,
      cmOptions,
    };
  },
});
</script>
