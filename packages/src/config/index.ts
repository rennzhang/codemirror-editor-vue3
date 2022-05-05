import { Editor, EditorEventMap } from "codemirror";

export type EditorEventNames = Exclude<keyof EditorEventMap, "change">;

export interface ComponentEventMap {
  "update:value": (value: string) => string;
  change: (value: string, cm: Editor) => { value: string; cm: Editor };
  input: (value: string) => string;
  ready: (cm: Editor) => Editor;
}

// component define events
export const componentEventMap: ComponentEventMap = {
  "update:value": (value) => value,
  change: (value, cm) => ({ value, cm }),
  input: (value) => value,
  ready: (cm) => cm,
};

// codemirror events
export const cmEvts: EditorEventNames[] = [
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

export const getCmEvts = (): Pick<
  EditorEventMap,
  Exclude<keyof EditorEventMap, "change">
> => {
  const result: any = {};
  cmEvts.forEach((name) => {
    result[name] = (...args: any) => args;
  });
  return result;
};

export const emitOptions = { ...componentEventMap, ...getCmEvts() };

export const DEFAULT_OPTIONS = {
  mode: "text", // Language mode
  theme: "default", // Theme
  lineNumbers: true, // Display line number
  smartIndent: true, // Intelligent indentation
  indentUnit: 2,
};
