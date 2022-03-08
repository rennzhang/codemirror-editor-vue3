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
export const cmEvts: CMEvents[] = [
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
  mode: "text", // Language mode
  theme: "default", // Theme
  lineNumbers: true, // Display line number
  smartIndent: true, // Intelligent indentation
  indentUnit: 2,
};
