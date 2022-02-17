import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";
import { libInjectCss } from "./custom";

export default [
  vue(),
  vueJsx(),
  AutoImport({
    dts: "./types/auto-imports.d.ts",
    imports: ["vue"],
    eslintrc: {
      enabled: true, // Default `false`
      filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
    // Generate corresponding .eslintrc-auto-import.json file.
    // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
  }),
  checker({
    typescript: true,
    vueTsc: true,
    eslint: {
      lintCommand: 'eslint "./packages/**/*.{ts,tsx,vue}"',
      dev: {
        logLevel: ["error"],
      },
    },
  }),
  dts(),
  libInjectCss(),
];
