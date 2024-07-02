const __vite__fileDeps=["assets/chunks/jsLint.Dpy7EqPc.js","assets/chunks/index.DD8iZr2B.js","assets/chunks/commonjsHelpers.Cpj98o6Y.js","assets/chunks/framework.CikD31qk.js","assets/chunks/javascript.DmjD0XMr.js","assets/chunks/javascript.B-ix7aJG.js","assets/chunks/lint.LixDJPjZ.js","assets/chunks/jsonLint.BqOrvBdX.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{d as b,s as u,o as s,c as a,j as e,t as m,F as y,E,p as N,l as R,_ as I,u as T,ai as O,v as L,a as f,I as g,e as w,k as v,b as j,M as B,K as D,P as J,R as P,h as V,W as x,X as $}from"./framework.CikD31qk.js";import{_ as M,a as F,U as H}from"./dracula.-TEBmUJL.js";import"./commonjsHelpers.Cpj98o6Y.js";const h=r=>(N("data-v-03e6aeae"),r=r(),R(),r),Q={class:"vp-code-group vp-adaptive-theme"},U={class:"tabs"},W=h(()=>e("input",{id:"tab-JFiS9vo",type:"radio",name:"group-Qis5R",checked:""},null,-1)),A=h(()=>e("input",{id:"tab-NQHnuSp",type:"radio",name:"group-Qis5R"},null,-1)),z=h(()=>e("input",{id:"tab-S4PgNg6",type:"radio",name:"group-Qis5R"},null,-1)),q={class:"blocks"},K={class:"language-bash vp-adaptive-theme active"},X=h(()=>e("button",{title:"Copy Code",class:"copy"},null,-1)),G=h(()=>e("span",{class:"lang"},"bash",-1)),Y={class:"shiki shiki-themes github-light github-dark vp-code py-5 px-20px text-14px"},Z={class:"line"},ee={style:{"--shiki-light":"#6f42c1","--shiki-dark":"#b392f0"},class:"mr-8px"},ne={style:{"--shiki-light":"#032f62","--shiki-dark":"#9ecbff"},class:"mr-8px"},te=b({__name:"BashBlock",props:{deps:{}},setup(r){const n=r,c={npm:"install",yarn:"add",pnpm:"add"},t=u("npm");return(k,o)=>(s(),a("div",Q,[e("div",U,[W,e("label",{for:"tab-JFiS9vo",onClick:o[0]||(o[0]=i=>t.value="npm")},"npm"),A,e("label",{for:"tab-NQHnuSp",onClick:o[1]||(o[1]=i=>t.value="yarn")},"yarn"),z,e("label",{for:"tab-S4PgNg6",onClick:o[2]||(o[2]=i=>t.value="pnpm")},"pnpm")]),e("div",q,[e("div",K,[X,G,e("div",Y,[e("span",Z,[e("span",ee,m(t.value),1),e("span",ne,m(c[t.value]),1),(s(!0),a(y,null,E(n.deps,(i,l)=>(s(),a("span",{key:l,class:"mr-8px",style:{"--shiki-light":"#032f62","--shiki-dark":"#9ecbff"}},m(i),1))),128))])])])])]))}}),se=I(te,[["__scopeId","data-v-03e6aeae"]]),oe={key:0,class:"mt-5"},ie={class:"example"},ae={class:"example-showcase"},re={class:"w-full mb-5"},le={class:"flex-center"},ce={class:"mb-2 mr-10"},de={class:"font-bold"},me={class:"mb-2"},pe={class:"font-bold"},ue={class:"font-bold flex-center"},he={class:"example-action"},_e={key:1,style:{"font-size":"12px","margin-right":"6px"}},ve=b({__name:"Example",props:{schema:{}},setup(r){const n=r,{isDark:c}=T(),t=u(!1),{copy:k,copied:o}=O(),i=u("github"),l=u(null);return L(()=>[c,l],([_,d])=>{d.value&&P(()=>{var p;(p=d.value)==null||p.setTheme(_.value?"dracula":"default"),i.value=_.value?"github-dark":"github"})},{immediate:!0,deep:!0}),(_,d)=>{var p,C;return s(),a(y,null,[(C=(p=n.schema)==null?void 0:p.deps)!=null&&C.length?(s(),a("div",oe,[f(" 该功能必须安装以下依赖 / Please install the following dependencies: "),g(se,{deps:n.schema.deps},null,8,["deps"])])):w("",!0),e("div",ie,[e("div",ae,[e("div",re,[e("div",le,[e("div",ce,[f(" Theme: "),e("span",de,m(v(c)?"dracula":"default"),1)]),e("div",me,[f(" Lang: "),e("span",pe,m(n.schema.lang),1)])]),e("div",ue,"> "+m(n.schema.describe),1)]),(s(),j(D(n.schema.comp),B({ref_key:"demoRef",ref:l},n.schema.props),null,16))]),e("div",he,[v(o)?(s(),a("span",_e,"Copied!")):(s(),j(M,{key:0,style:{"margin-right":"6px"},onClick:d[0]||(d[0]=S=>v(k)(n.schema.raw))})),g(F,{onClick:d[1]||(d[1]=S=>t.value=!t.value)})]),e("div",{style:J(`height: ${t.value?"auto":"0"};`),class:"example-source"},[g(v(H),{code:n.schema.raw,highlightjs:"",lang:"html",theme:i.value},null,8,["code","theme"])],4)])],64)}}}),fe=`<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    :height="300"
    width="90%"
    class="cm-component"
    :border="true"
    @ready="onReady"
  />
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";
import { JSHINT } from "jshint";
// language json or js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint.js";

window.JSHINT = JSHINT;

const code = ref(\`function findSequence(goal) {
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
}\`);

const cmOptions: EditorConfiguration = reactive({
  mode: "javascript",
  lineNumbers: true,
  lineWiseCopyCut: true,
  // 是否在编辑器侧边栏中显示代码提示
  // Whether to display code hints in the editor sidebar
  gutters: ["CodeMirror-lint-markers"],
  lint: true,
});

const cminstance = ref<Editor | null>(null);
const onReady = (cm: Editor) => {
  cminstance.value = cm;
  console.log(cm.getValue());
};

defineExpose({
  setTheme: (theme: string) => {
    cminstance.value?.setOption("theme", theme);
  },
});
<\/script>
<style lang="less" scoped>
.cm-component {
  font-family: monospace;
}
</style>
`,ge=`<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    :height="300"
    width="90%"
    class="cm-component"
    :border="true"
    @ready="onReady"
  />
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";
import jsonlint from "jsonlint-mod";
// language json or js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/json-lint";

window.jsonlint = jsonlint;

const code = ref(\`{
  "compilerOptions": {
    "baseUrl": ".",
    "module": "ESNext",
    "target": "esnext",
    "lib": ["DOM", "ESNext"],
    "types": ["vite/client"],
    "jsx": "preserve",
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "incremental": false,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noUnusedLocals": true,
    "strictNullChecks": true,
    "declaration": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@/*": ["packages/*"],
      "./*": ["./*"],
      "codemirror-editor-vue3": ["packages/index.ts"]
    }
  },
  "include": [
    "packages/**/*",
    "playground/**/*",
    "docs/**/*",
    "docs/demo/**/*",
    "script",
    "types",
    "*.ts",
    "*.tsx",
    "*.vue",
    "*.d.ts",
    "*.md"
  ]
}
\`);

const cmOptions: EditorConfiguration = reactive({
  mode: "application/json",
  lineNumbers: true,
  lineWiseCopyCut: true,
  gutters: ["CodeMirror-lint-markers"],
  lint: true,
});

const cminstance = ref<Editor | null>(null);
const onReady = (cm: Editor) => {
  cminstance.value = cm;
  console.log(cm.getValue());
};

defineExpose({
  setTheme: (theme: string) => {
    console.log(" theme", theme);
    cminstance.value?.setOption("theme", theme);
  },
});
<\/script>
<style lang="less" scoped>
.cm-component {
  font-family: monospace;
}
</style>
`,ye={class:"mb-3 mt-5"},ke=["onClick"],be={key:0},$e=b({__name:"index",setup(r){const n=u(1),c=[{raw:fe,comp:x(()=>$(()=>import("./jsLint.Dpy7EqPc.js"),__vite__mapDeps([0,1,2,3,4,5,6]))),describe:"校验 js 代码, 在任意位置输入字符尝试校验功能",lang:"javascript",deps:["jslint"]},{raw:ge,comp:x(()=>$(()=>import("./jsonLint.BqOrvBdX.js"),__vite__mapDeps([7,1,2,3,4,5,6]))),describe:"校验 json 数据, 在任意位置输入字符尝试校验功能",lang:"application/json",deps:["jsonlint"]}],t=V(()=>c[n.value]);return(k,o)=>(s(),a(y,null,[e("div",ye,[(s(),a(y,null,E(c,(i,l)=>e("a",{key:l,class:"mr-3 cursor-pointer",onClick:_=>n.value=l},[l==n.value?(s(),a("span",be,"👉🏻")):w("",!0),f(" "+m(i.lang)+" Lint ",1)],8,ke)),64))]),g(ve,{schema:t.value},null,8,["schema"])],64))}});export{$e as default};
