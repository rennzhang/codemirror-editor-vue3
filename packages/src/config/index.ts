import { Editor, EditorEventMap } from "codemirror";

export type EditorEventNames = Exclude<keyof EditorEventMap, "change">;
interface EditorEventMapWithChange extends EditorEventMap {
  keyHandled: (instance: Editor, name: string, eventObj: Event) => void;
  focus: (instance: Editor, eventObj: FocusEvent) => void;
  blur: (instance: Editor, eventObj: FocusEvent) => void;
  scrollCursorIntoView: (instance: Editor, eventObj: Event) => void;
}

export interface ComponentEventMap {
  "update:value": (value: string) => any;
  change: (value: string, cm: Editor) => { value: string; cm: Editor };
  input: (value: string) => any;
  ready: (cm: Editor) => Editor;
}

// component define events
export const componentEventMap: ComponentEventMap = {
  "update:value": () => true,
  change: (value, cm) => ({ value, cm }),
  input: () => true,
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
  EditorEventMapWithChange,
  EditorEventNames
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
