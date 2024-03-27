import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import dts from "vite-plugin-dts";
import Pages from "vite-plugin-pages";
import WindiCSS from "vite-plugin-windicss";
import libInjectCss from "./custom/InjectCss";

export default [
  vue(),
  vueJsx(),
  AutoImport({
    dts: "./types/auto-imports.d.ts",
    imports: ["vue", "vue-router"],
    eslintrc: {
      enabled: true, // Default `false`
      filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
    // Generate corresponding .eslintrc-auto-import.json file.
    // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
  }),
  dts(),
  libInjectCss(),
  Pages({
    dirs: [
      {
        dir: "playground/demo",
        baseRoute: "demo",
      },
    ],
    exclude: ["playground/demo/index.vue"],
  }),
  WindiCSS(),
];
