const base =
  process.env.NODE_ENV == "production" ? "/codemirror-editor-vue3/" : "/";
module.exports = {
  base,
  lang: "zh-cn",
  title: "codemirror-editor-vue3",
  description: "CodeMirror component for Vue3",
  themeConfig: {
    repo: "RennCheung/codemirror-editor-vue3",
    docsDir: "docs",
    lastUpdated: "最近更新时间",

    nav: [
      { text: "Guide", link: "/", activeMatch: "^/$|^/guide/" },
      {
        text: "Changelog",
        link: "https://github.com/RennCheung/codemirror-editor-vue3/blob/main/CHANGELOG.md",
      },
    ],
    sidebar: {
      "/Guide/": getGuideSidebar(),
      "/": getGuideSidebar(),
    },
  },
};

function getGuideSidebar() {
  return [
    {
      text: "快速上手",
      link: "/index",
    },
    {
      text: "配置",
      link: "/config",
      children: [
        { text: "Props", link: "/config/props" },
        { text: "事件系统", link: "/config/events" },
      ],
    },
    {
      text: "预置模式",
      children: [
        { text: "merge模式", link: "/merge/index" },
        { text: "log模式", link: "/log/index" },
      ],
    },
    {
      text: "Typescript 支持",
      link: "/tsSupport/index",
    },
    // {
    //   text: "更多案例",
    //   link: "/more/index",
    // },
  ];
}
