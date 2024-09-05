<template>
  <div>
    <Codemirror
      id="cm-component"
      v-model:value="code"
      :options="cmOptions"
      border
      @ready="onEditorReady"
      :width="400"
      :height="300"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";
// import 'codemirror/addon/fold/foldgutter.css'
// import 'codemirror/addon/fold/foldcode.js'
// import 'codemirror/addon/fold/foldgutter.js'
// import 'codemirror/addon/fold/brace-fold.js'

// language
import "codemirror/mode/javascript/javascript.js";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
const code = ref(`function getCompletions(token, context) {
    var found = [], start = token.string;
    function maybeAdd(str) {
      if (str.indexOf(start) == 0) found.push(str);
    }
    function gatherCompletions(obj) {
      if (typeof obj == "string") forEach(stringProps, maybeAdd);
      else if (obj instanceof Array) forEach(arrayProps, maybeAdd);
      else if (obj instanceof Function) forEach(funcProps, maybeAdd);
      for (var name in obj) maybeAdd(name);
    }

    if (context) {
      var obj = context.pop(), base;
      if (obj.className == "js-variable")
        base = window[obj.string];
      else if (obj.className == "js-string")
        base = "";
      else if (obj.className == "js-atom")
        base = 1;
      while (base != null && context.length)
        base = base[context.pop().string];
      if (base != null) gatherCompletions(base);
    }
    else {
      for (var v = token.state.localVars; v; v = v.next) maybeAdd(v.name);
      gatherCompletions(window);
      forEach(keywords, maybeAdd);
    }
    return found;
  }`);

const cmOptions: EditorConfiguration = {
  lineNumbers: true,
  mode: { name: "javascript" },
  extraKeys: {
    // "Ctrl-Space": "autocomplete",
    "Ctrl-Space": () => {
      alert("Ctrl-Space");
    },
  },
};

function synonyms(cm: any, option: any) {
  const comp = [
    ["here", "hither"],
    ["asynchronous", "nonsynchronous"],
    ["completion", "achievement", "conclusion", "culmination", "expirations"],
    ["hinting", "advise", "broach", "imply"],
    ["function", "action"],
    ["provide", "add", "bring", "give"],
    ["synonyms", "equivalents"],
    ["words", "token"],
    ["each", "every"],
  ];
  return new Promise((accept) => {
    setTimeout(() => {
      const cursor = cm.getCursor(),
        line = cm.getLine(cursor.line);
      let start = cursor.ch,
        end = cursor.ch;
      while (start && /\w/.test(line.charAt(start - 1))) --start;
      while (end < line.length && /\w/.test(line.charAt(end))) ++end;
      const word = line.slice(start, end).toLowerCase();
      for (let i = 0; i < comp.length; i++) {
        if (comp[i].indexOf(word) !== -1) {
          return accept({
            list: comp[i],
            from: cm.pos(cursor.line, start),
            to: cm.pos(cursor.line, end),
          });
        }
      }
      return accept(null);
    }, 100);
  });
}
const onEditorReady = (cm: any) => {
  if (typeof Promise !== "undefined") {
    cm.setOption("hintOptions", { hint: synonyms });
  }
};
</script>

<style>
/* #cm-component .CodeMirror {
  font-family: "Fira Code", monospace;
} */
</style>
