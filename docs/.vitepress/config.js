module.exports = {
  lang: "zh-cn",
  title: "codemirror-editor-vue3",
  description: "CodeMirror component for Vue3",
  themeConfig: {
    repo: "vuejs/vitepress",
    docsDir: "docs",
    lastUpdated: "最近更新时间",
    nav: [{ text: "Guide", link: "/", activeMatch: "^/$|^/guide/" }],

    sidebar: {
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
        { text: "Component Props", link: "/config/props" },
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
  ];
}
