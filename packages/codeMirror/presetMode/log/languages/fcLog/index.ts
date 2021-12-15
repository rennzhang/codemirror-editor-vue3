/* */
import "codemirror/addon/mode/simple.js";
// import * as codemirror from "codemirror";
import codemirror from "codemirror";
const startRegex = [
  {
    regex: /(\[.*?\])([ \t]*)(<error>[ \t])(.+)/,
    token: ["tag", null, "error.strong", "error.strong"],
    sol: true,
    // next: "error",
  },
  {
    regex: /(\[.*?\])([ \t]*)(<info>)(.+)(.?)/,
    token: ["tag", null, "bracket", "bracket", "hr"],
    sol: true,
    // next: "info",
  },
  {
    regex: /(\[.*?\])([ \t]*)(<warning>)(.+)(.?)/,
    token: ["tag", null, "comment", "comment", "hr"],
    sol: true,
    // next: "warning",
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
      regex: /.*\[/,
      token: "comment",
    },
  ],
});
