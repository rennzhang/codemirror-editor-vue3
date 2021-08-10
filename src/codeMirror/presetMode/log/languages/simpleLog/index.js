import "codemirror/addon/mode/simple.js";
import * as codemirror from "codemirror/lib/codemirror.js";

codemirror.defineSimpleMode("log", {
  start: [
    {
      regex: /^[=]+[^=]*[=]+/,
      token: "strong",
    },
    {
      regex: /([^\w])([A-Z][\w]*)/,
      token: [null, "string"],
    },
    {
      regex: /(^[A-Z][\w]*)/,
      token: "string",
    },
    // {
    //     regex: /([^\d])([0-9]+)/,
    //     token: [null, 'comment']
    // },
    // {
    //     regex: /(^[0-9]+)/,
    //     token: 'comment'
    // }
  ],
});
