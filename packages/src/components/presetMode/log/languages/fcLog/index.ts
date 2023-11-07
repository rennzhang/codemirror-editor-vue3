/* */
import "codemirror/addon/mode/simple.js";
import _CodeMirror from "../../../../../sourceLib";

const startRegex = [
  {
    regex: /(\[.*?\])([ \t]*)(<error>[ \t])(.+)/,
    token: ["tag", "", "error.strong", "error.strong"],
    sol: true
    // next: "error",
  },
  {
    regex: /(\[.*?\])([ \t]*)(<info>)(.+)(.?)/,
    token: ["tag", "", "bracket", "bracket", "hr"],
    sol: true
    // next: "info",
  },
  {
    regex: /(\[.*?\])([ \t]*)(<warning>)(.+)(.?)/,
    token: ["tag", "", "comment", "comment", "hr"],
    sol: true
    // next: "warning",
  }
];

_CodeMirror.defineSimpleMode("fclog", {
  start: [
    ...startRegex,
    {
      regex: /.*/,
      token: "hr"
    }
  ],
  error: [
    ...startRegex,
    {
      regex: /.*/,
      token: "error.strong"
    }
  ],
  info: [
    ...startRegex,
    {
      regex: /.*/,
      token: "bracket"
    }
  ],
  warning: [
    ...startRegex,
    {
      regex: /.*\[/,
      token: "comment"
    }
  ]
});
