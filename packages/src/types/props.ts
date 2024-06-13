import type { EditorConfiguration } from "codemirror";

export declare interface CmProps {
  value: string;
  options?: EditorConfiguration;
  globalOptions?: EditorConfiguration;
  placeholder?: string;
  border?: boolean;
  width: string | number | null;
  height: string | number | null;
  keepCursorInEnd: boolean;
  merge?: boolean;
  name?: string;
  marker?: () => HTMLElement;
  /* Consult: https://codemirror.net/doc/manual.html#option_gutters */
  unseenLines?: Array<any>;
}
