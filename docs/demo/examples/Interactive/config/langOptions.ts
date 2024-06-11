import { LangOption } from "../types";
export const LANG_OPTIONS: LangOption[] = [
  {
    value: "javascript",
    label: "javascript",
    langPath: "codemirror/mode/javascript/javascript.js",
    code: `function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}
`,
  },
  // json
  {
    langPath: "codemirror/mode/javascript/javascript.js",
    value: "json",
    label: "json",
    code: `{
      "compilerOptions": {
        "baseUrl": ".",
        "outDir": "temp",
        "sourceMap": false,
        "target": "es2016",
        "newLine": "LF",
        "useDefineForClassFields": false,
        "module": "esnext",
        "moduleResolution": "bundler",
        "allowJs": true,
        "strict": true,
        "noUnusedLocals": true,
        "experimentalDecorators": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "removeComments": false,
        "jsx": "preserve",
        "lib": ["es2016", "dom"],
        "types": ["vitest/globals", "puppeteer", "node"],
        "rootDir": ".",
        "paths": {
          "@vue/compat": ["packages/vue-compat/src"],
          "@vue/*": ["packages/*/src"],
          "vue": ["packages/vue/src"]
        }
      },
      "include": [
        "packages/global.d.ts",
        "packages/*/src",
        "packages/runtime-dom/types/jsx.d.ts",
        "packages/*/__tests__",
        "packages/dts-test",
        "packages/vue/jsx-runtime",
        "scripts/*",
        "rollup.*.js"
      ]
    }`,
  },
  {
    langPath: "codemirror/mode/css/css.js",
    value: "css",
    label: "css",
    code: `/* Some example CSS */

    @import url("something.css");

    body {
      margin: 0;
      padding: 3em 6em;
      font-family: tahoma, arial, sans-serif;
      color: #000;
    }

    #navigation a {
      font-weight: bold;
      text-decoration: none !important;
    }`,
  },
  {
    langPath: "codemirror/mode/htmlmixed/htmlmixed.js",
    value: "text/html",
    label: "html",
    code: `<html style="color: green">
    <!-- this is a comment -->
    <head>
      <title>Mixed HTML Example</title>
      <style>
        h1 {font-family: comic sans; color: #f0f;}
        div {background: yellow !important;}
        body {
          max-width: 50em;
          margin: 1em 2em 1em 5em;
        }
      </style>
    </head>
    <body>
      <h1>Mixed HTML Example</h1>
      <script>
        function jsFunc(arg1, arg2) {
          if (arg1 && arg2) document.body.innerHTML = "achoo";
        }
      </script>
    </body>
  </html>
  `,
  },
  {
    langPath: "codemirror/mode/apl/apl.js",
    value: "text/apl",
    label: "apl",
    code: `⍝ Conway's game of life

⍝ This example was inspired by the impressive demo at
⍝ http://www.youtube.com/watch?v=a9xAKttWgP4

⍝ Create a matrix:
⍝     0 1 1
⍝     1 1 0
⍝     0 1 0
creature ← (3 3 ⍴ ⍳ 9) ∈ 1 2 3 4 7   ⍝ Original creature from demo
creature ← (3 3 ⍴ ⍳ 9) ∈ 1 3 6 7 8   ⍝ Glider

⍝ Place the creature on a larger board, near the centre
board ← ¯1 ⊖ ¯2 ⌽ 5 7 ↑ creature

⍝ A function to move from one generation to the next
life ← {∨/ 1 ⍵ ∧ 3 4 = ⊂+/ +⌿ 1 0 ¯1 ∘.⊖ 1 0 ¯1 ⌽¨ ⊂⍵}

⍝ Compute n-th generation and format it as a
⍝ character matrix
gen ← {' #'[(life ⍣ ⍵) board]}

⍝ Show first three generations
(gen 1) (gen 2) (gen 3)
`,
  },
];

export const DEFAULT_LANG_OPT = LANG_OPTIONS[0];
