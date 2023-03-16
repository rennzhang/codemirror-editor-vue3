import { defineConfig } from "vitepress"
const base = process.env.NODE_ENV == "production" ? "/codemirror-editor-vue3/" : "/"
const routeMap = {
  en: "",
  zh: "/zh-CN"
}
const getNav = (lang: "en" | "zh") => {
  const isEn = lang == "en"
  const route = routeMap[lang]
  return [
    {
      text: isEn ? "Guide" : "入门",
      link: `${route}/guide/getting-started`,
      activeMatch: "/guide/g"
    },
    {
      text: isEn ? "Changelog" : "更新日志",
      link: "https://github.com/RennCheung/codemirror-editor-vue3/blob/main/CHANGELOG.md"
    }
  ]
}

function getGuideSidebar(lang: "en" | "zh") {
  const isEn = lang == "en"

  const route = routeMap[lang]
  return [
    {
      text: isEn ? "Introduction" : "介绍",
      collapsed: false,
      items: [
        {
          text: isEn ? "Getting Started" : "入门指南",
          link: `${route}/guide/getting-started`
        },
        {
          text: isEn ? "Component Props" : "组件属性",
          link: `${route}/guide/props`
        },
        {
          text: isEn ? "Component Events" : "组件事件",
          link: `${route}/guide/events`
        }
      ]
    },
    {
      text: isEn ? "prepattern" : "预置模式",
      items: [
        {
          text: isEn ? "merge(diff) mode" : "merge(diff) 模式",
          link: `${route}/prepattern/merge`
        },
        {
          text: isEn ? "log mode" : "log 模式",
          link: `${route}/prepattern/log`
        }
      ]
    },
    {
      text: isEn ? "Supplementary Instruction" : "补充说明",
      items: [
        {
          text: isEn ? "CodeMirror Static properties" : "CodeMirror 静态属性",
          link: `${route}/supplementary/static-properties`
        },
        {
          text: isEn ? "Get instance object" : "获取实例对象",
          link: `${route}/supplementary/instance`
        }
      ]
    },
    {
      text: isEn ? "Typescript Support" : "Typescript 支持",
      link: `${route}/typescript/Support`
    }
    // {
    //   text: "更多案例",
    //   link: "/more/index",
    // },
  ]
}
export default defineConfig({
  base,
  title: "codemirror-editor-vue3",
  description: "CodeMirror component for Vue3",
  lastUpdated: true,
  cleanUrls: true,
  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        lastUpdatedText: "Last update time",
        nav: getNav("en"),
        sidebar: {
          "/": getGuideSidebar("en")
        }
      }
    },
    "zh-CN": {
      label: "简体中文",
      lang: "zh-CN",
      themeConfig: {
        lastUpdatedText: "最近更新时间",
        nav: getNav("zh"),
        sidebar: {
          "/zh-CN": getGuideSidebar("zh")
        }
      }
    }
  },
  head: [["meta", { name: "theme-color", content: "#3c8772" }]],
  themeConfig: {
    editLink: {
      pattern: "https://github.com/RennCheung/codemirror-editor-vue3/edit/main/docs/:path",
      text: "Edit this page on GitHub"
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/RennCheung/codemirror-editor-vue3"
      }
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2021-present Renn Cheung"
    },

    algolia: {
      appId: "TIA2QKB31F",
      apiKey: "57dd54cc00e988117cc8b741128f5089",
      indexName: "codemirror-editor-vue3"
    }
  }
})
