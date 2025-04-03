const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/jsLint.BF7ZwFa_.js","assets/chunks/index.5PpOw0g3.js","assets/chunks/commonjsHelpers.Cpj98o6Y.js","assets/chunks/framework.ZlHgrsSq.js","assets/chunks/javascript.CUKSlxXk.js","assets/chunks/javascript.D36R9ITX.js","assets/chunks/lint.BO72fUMW.js","assets/chunks/jsonLint.D4Y2jSxH.js"])))=>i.map(i=>d[i]);
import{d as k,p,o as i,c as a,j as n,t as d,F as _,C as $,_ as N,u as R,q as S,a as f,G as g,e as E,k as v,b as C,K as T,H as O,N as L,P as V,h as B,U as j,V as x}from"./framework.ZlHgrsSq.js";import{u as D,_ as I,a as J,R as P}from"./dracula.14JBnO7t.js";import"./commonjsHelpers.Cpj98o6Y.js";const H={class:"vp-code-group vp-adaptive-theme"},M={class:"tabs"},F={class:"blocks"},Q={class:"language-bash vp-adaptive-theme active"},A={class:"shiki shiki-themes github-light github-dark vp-code py-5 px-20px text-14px"},U={class:"line"},W={style:{"--shiki-light":"#6f42c1","--shiki-dark":"#b392f0"},class:"mr-8px"},q={style:{"--shiki-light":"#032f62","--shiki-dark":"#9ecbff"},class:"mr-8px"},z=k({__name:"BashBlock",props:{deps:{}},setup(u){const t=u,c={npm:"install",yarn:"add",pnpm:"add"},o=p("npm");return(y,e)=>(i(),a("div",H,[n("div",M,[e[3]||(e[3]=n("input",{id:"tab-JFiS9vo",type:"radio",name:"group-Qis5R",checked:""},null,-1)),n("label",{for:"tab-JFiS9vo",onClick:e[0]||(e[0]=r=>o.value="npm")},"npm"),e[4]||(e[4]=n("input",{id:"tab-NQHnuSp",type:"radio",name:"group-Qis5R"},null,-1)),n("label",{for:"tab-NQHnuSp",onClick:e[1]||(e[1]=r=>o.value="yarn")},"yarn"),e[5]||(e[5]=n("input",{id:"tab-S4PgNg6",type:"radio",name:"group-Qis5R"},null,-1)),n("label",{for:"tab-S4PgNg6",onClick:e[2]||(e[2]=r=>o.value="pnpm")},"pnpm")]),n("div",F,[n("div",Q,[e[6]||(e[6]=n("button",{title:"Copy Code",class:"copy"},null,-1)),e[7]||(e[7]=n("span",{class:"lang"},"bash",-1)),n("div",A,[n("span",U,[n("span",W,d(o.value),1),n("span",q,d(c[o.value]),1),(i(!0),a(_,null,$(t.deps,(r,l)=>(i(),a("span",{key:l,class:"mr-8px",style:{"--shiki-light":"#032f62","--shiki-dark":"#9ecbff"}},d(r),1))),128))])])])])]))}}),G=N(z,[["__scopeId","data-v-03e6aeae"]]),K={key:0,class:"mt-5"},X={class:"example"},Y={class:"example-showcase"},Z={class:"w-full mb-5"},nn={class:"flex-center"},en={class:"mb-2 mr-10"},tn={class:"font-bold"},sn={class:"mb-2"},on={class:"font-bold"},rn={class:"font-bold flex-center"},an={class:"example-action"},ln={key:1,style:{"font-size":"12px","margin-right":"6px"}},cn=k({__name:"Example",props:{schema:{}},setup(u){const t=u,{isDark:c}=R(),o=p(!1),{copy:y,copied:e}=D(),r=p("github"),l=p(null);return S(()=>[c,l],([h,s])=>{s.value&&V(()=>{var m;(m=s.value)==null||m.setTheme(h.value?"dracula":"default"),r.value=h.value?"github-dark":"github"})},{immediate:!0,deep:!0}),(h,s)=>{var m,b;return i(),a(_,null,[(b=(m=t.schema)==null?void 0:m.deps)!=null&&b.length?(i(),a("div",K,[s[2]||(s[2]=f(" 该功能必须安装以下依赖 / Please install the following dependencies: ")),g(G,{deps:t.schema.deps},null,8,["deps"])])):E("",!0),n("div",X,[n("div",Y,[n("div",Z,[n("div",nn,[n("div",en,[s[3]||(s[3]=f(" Theme: ")),n("span",tn,d(v(c)?"dracula":"default"),1)]),n("div",sn,[s[4]||(s[4]=f(" Lang: ")),n("span",on,d(t.schema.lang),1)])]),n("div",rn,"> "+d(t.schema.describe),1)]),(i(),C(O(t.schema.comp),T({ref_key:"demoRef",ref:l},t.schema.props),null,16))]),n("div",an,[v(e)?(i(),a("span",ln,"Copied!")):(i(),C(I,{key:0,style:{"margin-right":"6px"},onClick:s[0]||(s[0]=w=>v(y)(t.schema.raw))})),g(J,{onClick:s[1]||(s[1]=w=>o.value=!o.value)})]),n("div",{style:L(`height: ${o.value?"auto":"0"};`),class:"example-source"},[g(v(P),{code:t.schema.raw,highlightjs:"",lang:"html",theme:r.value},null,8,["code","theme"])],4)])],64)}}}),dn=`<template>
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
`,mn=`<template>
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
`,pn={class:"mb-3 mt-5"},un=["onClick"],hn={key:0},_n=k({__name:"index",setup(u){const t=p(1),c=[{raw:dn,comp:j(()=>x(()=>import("./jsLint.BF7ZwFa_.js"),__vite__mapDeps([0,1,2,3,4,5,6]))),describe:"校验 js 代码, 在任意位置输入字符尝试校验功能",lang:"javascript",deps:["jslint"]},{raw:mn,comp:j(()=>x(()=>import("./jsonLint.D4Y2jSxH.js"),__vite__mapDeps([7,1,2,3,4,5,6]))),describe:"校验 json 数据, 在任意位置输入字符尝试校验功能",lang:"application/json",deps:["jsonlint-mod"]}],o=B(()=>c[t.value]);return(y,e)=>(i(),a(_,null,[n("div",pn,[(i(),a(_,null,$(c,(r,l)=>n("a",{key:l,class:"mr-3 cursor-pointer",onClick:h=>t.value=l},[l==t.value?(i(),a("span",hn,"👉🏻")):E("",!0),f(" "+d(r.lang)+" Lint ",1)],8,un)),64))]),g(cn,{schema:o.value},null,8,["schema"])],64))}});export{_n as default};
