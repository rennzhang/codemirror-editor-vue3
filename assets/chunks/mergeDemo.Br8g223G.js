import{_ as i}from"./index.DD8iZr2B.js";import"./htmlmixed.Ce98L_Dl.js";import{_ as c,d as m,D as l,o as d,b as p,e as u,s as o,y as h,aj as f}from"./framework.CikD31qk.js";import"./commonjsHelpers.Cpj98o6Y.js";import"./javascript.B-ix7aJG.js";const g=m({components:{Codemirror:i},setup(){const e=o(!1),t=o(`<head>
  <title>codemirror-editor-vue</title>
  <meta data-n-head="ssr" charset="utf-8">
</head>`),n=o(`<head>
  <title>test title</title>
  <meta data-n-head="ssr" charset="utf-8">
</head>`);return h(()=>{e.value=!0}),{isMounted:e,onChange(r,s){console.log(r),console.log(s)},cmOptions:f({value:t,origLeft:null,orig:n,connect:"align",mode:"text/html",lineNumbers:!0,collapseIdentical:!1,highlightDifferences:!0})}}});function _(e,t,n,r,s,C){const a=l("Codemirror");return e.isMounted?(d(),p(a,{key:0,merge:!0,options:e.cmOptions,height:400,class:"cm-component",onChange:e.onChange},null,8,["options","onChange"])):u("",!0)}const b=c(g,[["render",_]]);export{b as default};
