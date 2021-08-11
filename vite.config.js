import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

const viteCfg = defineConfig({
  // input: "src/main.js",
  // resolve: {
  //   alias: {
  //     // 配置别名
  //     "@": path.resolve(__dirname, "./src"),
  //   },
  // },
  // server: {
  //   host: "::",
  //   hostname: "0.0.0.0",
  //   open: true,
  //   port: 8080,
  //   https: false,
  //   ssr: false,
  // },
  // 生产环境路径，类似webpack的assetsPath
  // base: "./",
  optimizeDeps: {
    exclude: ["vue"],
  },
  build: {
    output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      globals: {
        vue: "Vue",
        codemirror$: "codemirror/lib/codemirror.js",
      },
    },
    lib: {
      formats: ["umd", "es"],
      entry: path.resolve(__dirname, "src/index.js"),
      name: "codemirror-editor-vue3",
    },
    rollupOptions: {
      // resolve: { dedupe: ["vue"] },

      // format: "amd",
      // dir: "dist",
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "vue",
        "codemirror",
        "less",
        "diff-match-patch",
        "codemirror/addon/mode/simple.js",
        "codemirror/lib/codemirror.js",
        "codemirror/mode/css/css.js",
        "codemirror/lib/codemirror.css",
        "codemirror/addon/merge/merge.css",
        "codemirror/addon/merge/merge.js",
      ],
    },
  },
  plugins: [
    vue({
      // 引用的vue插件，即上述引入的插件使用一遍，以及添加一些选项
      include: /\.vue$/,
    }),
  ],
});
export default viteCfg;
