import "codemirror/addon/mode/simple.js"
import _CodeMirror from "../../../../../sourceLib"

_CodeMirror.defineSimpleMode("log", {
  start: [
    {
      regex: /^[=]+[^=]*[=]+/,
      token: "strong"
    },
    {
      regex: /([^\w])([A-Z][\w]*)/,
      token: ["", "string"]
    },
    {
      regex: /(^[A-Z][\w]*)/,
      token: "string"
    }
    // {
    //     regex: /([^\d])([0-9]+)/,
    //     token: [null, 'comment']
    // },
    // {
    //     regex: /(^[0-9]+)/,
    //     token: 'comment'
    // }
  ]
})
