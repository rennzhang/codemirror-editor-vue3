import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "class",
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: false,
  plugins: [],
  theme: {},
  // 基于 windicss 的基础工具类，自定义组合成自己需要的类
  shortcuts: {
    // 单个标签自定义类名
    "flex-center": "flex items-center justify-center",
    "flex-center-x": "flex justify-center",
    "flex-center-y": "flex items-center",
    // 嵌套标签自定义类名
    // 示例
    // "custom-title": {
    //   "@apply": "text-green-400 text-30px",
    //   p: {
    //     "@apply": "text-red-800 text-20px",
    //     span: {
    //       "@apply": "text-blue-800 text-12px",
    //     }
    //   }
    // }
  },
  extract: {
    include: ["playground/**/*.{vue,html,jsx,tsx}"],
    exclude: ["node_modules", ".git"],
  },
});
