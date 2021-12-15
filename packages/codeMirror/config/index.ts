// component define events
export const componentsEvts = ["update:value", "change", "input", "ready"];

// codemirror events
export const cmEvts = [
  "changes",
  "scroll",
  "beforeChange",
  "cursorActivity",
  "keyHandled",
  "inputRead",
  "electricInput",
  "beforeSelectionChange",
  "viewportChange",
  "swapDoc",
  "gutterClick",
  "gutterContextMenu",
  "focus",
  "blur",
  "refresh",
  "optionChange",
  "scrollCursorIntoView",
  "update",
];

export const DEFAULT_OPTIONS = {
  mode: "text", // 语言模式
  theme: "default", // 主题
  lineNumbers: true, // 显示行号
  smartIndent: true, // 智能缩进
  indentUnit: 2, // 智能缩进单位为4个空格长度
  foldGutter: true, // 启用行槽中的代码折叠
  matchBrackets: true, // 匹配结束符号，比如"]、}"
  autoCloseBrackets: true, // 自动闭合符号
  styleActiveLine: true, // 显示选中行的样式
};
