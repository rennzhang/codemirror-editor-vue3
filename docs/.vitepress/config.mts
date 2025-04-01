import { defineConfig } from "vitepress";
import { resolve } from "path";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

const base = process.env.NODE_ENV == "production" ? "/codemirror-editor-vue3/" : "/";
const routeMap = {
  en: "",
  zh: "/zh-CN",
};
const getNav = (lang: "en" | "zh") => {
  const isEn = lang == "en";
  const route = routeMap[lang];
  return [
    {
      text: isEn ? "Guide" : "入门",
      link: `${route}/guide/getting-started`,
      activeMatch: "/guide/g",
    },
    {
      text: isEn ? "More Example" : "更多案例",
      link: `${route}/example/index`,
      activeMatch: "/example/g",
    },
    {
      text: isEn ? "Changelog" : "更新日志",
      link: "https://github.com/RennCheung/codemirror-editor-vue3/blob/main/CHANGELOG.md",
    },
  ];
};

function getGuideSidebar(lang: "en" | "zh") {
  const isEn = lang == "en";

  const route = routeMap[lang];
  return [
    {
      text: isEn ? "Introduction" : "介绍",
      collapsed: false,
      items: [
        {
          text: isEn ? "Getting Started" : "入门指南",
          link: `${route}/guide/getting-started`,
        },
        {
          text: isEn ? "Component Props" : "组件属性",
          link: `${route}/guide/props`,
        },
        {
          text: isEn ? "Component Events" : "组件事件",
          link: `${route}/guide/events`,
        },
        {
          text: isEn ? "Language Modes" : "语言高亮",
          link: `${route}/guide/lang`,
        },
      ],
    },
    {
      text: isEn ? "prepattern" : "预置模式",
      items: [
        {
          text: isEn ? "merge(diff) mode" : "merge(diff) 模式",
          link: `${route}/guide/prepattern/merge`,
        },
        {
          text: isEn ? "log mode" : "log 模式",
          link: `${route}/guide/prepattern/log`,
        },
      ],
    },
    {
      text: isEn ? "Supplementary Instruction" : "补充说明",
      items: [
        {
          text: isEn ? "CodeMirror Static properties" : "CodeMirror 静态属性",
          link: `${route}/guide/supplementary/static-properties`,
        },
        {
          text: isEn ? "Get instance object" : "获取实例对象",
          link: `${route}/guide/supplementary/instance`,
        },
        // 自定义主题
        {
          text: isEn ? "Custom Theme" : "自定义主题",
          link: `${route}/guide/supplementary/custom-theme`,
        },
      ],
    },
    {
      text: isEn ? "Typescript Support" : "Typescript 支持",
      link: `${route}/guide/typescript/Support`,
    },
    // {
    //   text: "更多案例",
    //   link: "/more/index",
    // },
  ];
}
function getExampleSidebar(lang: "en" | "zh") {
  const isEn = lang == "en";

  const route = routeMap[lang];
  return [
    {
      text: isEn ? "Examples" : "示例",
      collapsed: false,
      items: [
        {
          text: isEn ? "Basic Examples" : "基础示例",
          link: `${route}/example/index`,
        },
        {
          text: "Code Syntax Check",
          link: `${route}/example/codeLint`,
        },
      ],
    },
  ];
}
export default defineConfig({
  base,
  title: "codemirror-editor-vue3",
  description: "CodeMirror component for Vue3",
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: [
    // 自定义函数，忽略所有包含 "example "的链接
    (url) => {
      return url.toLowerCase().includes("/example");
    },
  ],
  vite: {
    build: {},
    plugins: [
      UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: [
        {
          find: "codemirror-editor-vue3",
          replacement: `${pathResolve("packages/index.ts")}`,
        },
      ],
    },
  },

  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        lastUpdatedText: "Last update time",
        nav: getNav("en"),
        sidebar: {
          "/guide": getGuideSidebar("en"),
          "/example": getExampleSidebar("en"),
        },
      },
    },
    "zh-CN": {
      label: "简体中文",
      lang: "zh-CN",
      themeConfig: {
        lastUpdatedText: "最近更新时间",
        nav: getNav("zh"),
        sidebar: {
          "/zh-CN/guide": getGuideSidebar("zh"),
          "/zh-CN/example": getExampleSidebar("zh"),
        },
      },
    },
  },
  head: [
    ["link", { rel: "icon", href: "https://codemirror.net/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#3c8772" }],
  ],
  themeConfig: {
    editLink: {
      pattern: "https://github.com/RennCheung/codemirror-editor-vue3/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/RennCheung/codemirror-editor-vue3",
      },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2021-present Renn Cheung",
    },
    search: {
      provider: "local",
      options: {
        locales: {
          "zh-CN": {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },

    // algolia: {
    //   appId: "TIA2QKB31F",
    //   apiKey: "57dd54cc00e988117cc8b741128f5089",
    //   indexName: "codemirror-editor-vue3"
    // }
  },
});
