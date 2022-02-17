import { Editor } from "codemirror";

export type CMEvents =
  | "changes"
  | "scroll"
  | "beforeChange"
  | "cursorActivity"
  | "keyHandled"
  | "inputRead"
  | "electricInput"
  | "beforeSelectionChange"
  | "viewportChange"
  | "swapDoc"
  | "gutterClick"
  | "gutterContextMenu"
  | "focus"
  | "blur"
  | "refresh"
  | "optionChange"
  | "scrollCursorIntoView"
  | "update";

interface ComponentsEvts {
  "update:value": (value: string) => string;
  change: (value: string, cm: Editor) => { value: string; cm: Editor };
  input: (value: string) => string;
  ready: (cm: Editor) => Editor;
  [key: string]: any;
}
// component define events
export const componentsEvts: ComponentsEvts = {
  "update:value": (value: string) => value,
  change: (value: string, cm: Editor) => ({ value, cm }),
  input: (value: string) => value,
  ready: (cm: Editor) => cm,
};

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

export const getCmEvts = () => {
  const result: { [key: string]: () => void } = {};
  cmEvts.forEach((name) => {
    result[name] = (...args: any[]) => args;
  });
  return result;
};
export const DEFAULT_OPTIONS = {
  mode: "text", // 语言模式
  theme: "default", // 主题
  lineNumbers: true, // 显示行号
  smartIndent: true, // 智能缩进
  indentUnit: 2, // 智能缩进单位为4个空格长度
};
