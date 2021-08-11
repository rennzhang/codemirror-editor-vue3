import esbuild from "rollup-plugin-esbuild"; // plugin-esbuild将ts变为js
import vue from "rollup-plugin-vue"; // plugin-vue将vue结尾的文件变为js
import { terser } from "rollup-plugin-terser"; // 变丑别人看不懂（压缩后的）
import { name } from "./package.json";

const file = () => `dist/${name}.js`;

export default {
  input: "src/index.js", // 输入文件
  resolve: { dedupe: ["vue"] },
  external: ["vue"],
  // 输出，告诉rollup一些重要的信息
  output: {
    globals: {
      vue: "Vue", // 我们的仓库实际依赖vue, vue是不需要打包的，所以这里说明我们用了一个全局变量vue
    },
    name: "vue3-infinite-scroll-xs", // 仓库或组件的名字
    file: file("esm"), // 我们要生成的文件目录（css是自动创建）
    format: "umd", // 文件输出格式为UMD，一个统一的模块定义器
    plugins: [terser()], // 插件，（js的丑化，即打包后，不容易阅读的压缩后的文件）； 如果去掉terser()，得到的js代码即为容易阅读的
  },
  plugins: [
    // esbuild({ // 对所有的js及ts进行编译，编译为ie支持的js(目标为es6)
    //   include: /\.[jt]s$/,
    //   minify: process.env.NODE_ENV === 'production',
    //   target: 'es2015'
    // }),
    vue({
      // 引用的vue插件，即上述引入的插件使用一遍，以及添加一些选项
      include: /\.vue$/,
    }),
  ],
};
