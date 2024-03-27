import { defineConfig } from "vite";
import { resolve } from "path";

import plugins from "./build/plugins";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default defineConfig({
  server: {
    host: "::",
    open: true,
    port: 3008,
  },
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: `${pathResolve("packages/")}/`,
      },
      {
        find: "codemirror-editor-vue3",
        replacement: `${pathResolve("packages/index.ts")}`,
      },
    ],
  },
  // 生产环境路径，类似webpack的assetsPath
  build: {
    minify: "esbuild",
    lib: {
      formats: ["umd", "es"],
      entry: resolve(__dirname, "packages/index.ts"),
      name: "codemirror-editor-vue3",
    },
    rollupOptions: {
      output: {
        exports: "named",
        name: "codemirror-editor-vue3", // 仓库或组件的名字
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          codemirror: "codemirror",
          "codemirror/lib/codemirror.js": "codemirror",
          "diff-match-patch": "DiffMatchPatch",
          // codemirror: "codemirror/lib/codemirror.js",
          // "codemirror/lib/codemirror.js": "codemirror",
        },
      },

      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "vue",
        "codemirror",
        "diff-match-patch",
        "DiffMatchPatch",
        "codemirror/addon/mode/simple.js",
        "codemirror/lib/codemirror.js",
        "codemirror/mode/css/css.js",
        "codemirror/lib/codemirror.css",
        "codemirror/addon/merge/merge.css",
        "codemirror/addon/merge/merge.js",
        "codemirror/addon/selection/active-line.js",
        "codemirror/addon/fold/foldgutter.css",
        "codemirror/addon/fold/foldcode.js",
        "codemirror/addon/fold/foldgutter.js",
        "codemirror/addon/fold/brace-fold.js",
      ],
    },
  },
  plugins,
});
