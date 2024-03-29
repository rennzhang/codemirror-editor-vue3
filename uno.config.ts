// `uno.config.ts`
import {
  defineConfig, presetUno, presetAttributify, UserConfig,
} from "unocss";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives()], // 使用指令，如 @apply
  // 一些实用的自定义规则
  rules: [
    [/^wh-(.+)$/, ([, d]) => ({ width: `${d}`, height: `${d}` })],

    [
      /^text-rgba\((.*)$/,
      ([, c]) => ({ color: `rgba(${c}` }),
    ],
  ],
  // 一些实用的自定义组合
  shortcuts: {
    "wh-full": "w-full h-full", // width: 100%, height: 100%
    "flex-end-x": "flex justify-end",
    "flex-end-y": "flex items-end",
    "flex-start-x": "flex justify-start",
    "flex-start-y": "flex items-start",
    "flex-center": "flex justify-center items-center", // flex布局居中
    "flex-center-x": "flex justify-center", // flex布局：主轴居中
    "flex-center-y": "flex items-center", // flex布局：交叉轴居中
    "text-overflow": "overflow-hidden whitespace-nowrap text-ellipsis", // 文本溢出显示省略号
    "text-break": "whitespace-normal break-all break-words", // 文本溢出换行
  },
} as UserConfig);
