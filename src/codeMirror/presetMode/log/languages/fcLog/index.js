/* */
import "codemirror/addon/mode/simple.js";
import * as codemirror from "codemirror";

const startRegex = [
  {
    regex: /(\[.*?\])([ \t]*)(<error>)/,
    token: ["tag", null, "error.strong"],
    sol: true,
    next: "error",
  },
  {
    regex: /(\[.*?\])([ \t]*)(<info>)/,
    token: ["tag", null, "bracket"],
    sol: true,
    next: "info",
  },
  {
    regex: /(\[.*?\])([ \t]*)(<warning>)/,
    token: ["tag", null, "comment"],
    sol: true,
    next: "warning",
  },
];

codemirror.defineSimpleMode("fclog", {
  start: [
    ...startRegex,
    {
      regex: /.*/,
      token: "hr",
    },
  ],
  error: [
    ...startRegex,
    {
      regex: /.*/,
      token: "error.strong",
    },
  ],
  info: [
    ...startRegex,
    {
      regex: /.*/,
      token: "bracket",
    },
  ],
  warning: [
    ...startRegex,
    {
      regex: /.*/,
      token: "comment",
    },
  ],
});
