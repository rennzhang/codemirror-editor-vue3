import{_ as i}from"./index.5PpOw0g3.js";import"./htmlmixed.BdpVk4Cu.js";import{_ as c,d as m,b as l,e as d,p as o,v as p,ao as u,B as h,o as f}from"./framework.ZlHgrsSq.js";import"./commonjsHelpers.Cpj98o6Y.js";import"./javascript.D36R9ITX.js";const g=m({components:{Codemirror:i},setup(){const e=o(!1),t=o(`<head>
  <title>codemirror-editor-vue</title>
  <meta data-n-head="ssr" charset="utf-8">
</head>`),n=o(`<head>
  <title>test title</title>
  <meta data-n-head="ssr" charset="utf-8">
</head>`);return p(()=>{e.value=!0}),{isMounted:e,onChange(r,s){console.log(r),console.log(s)},cmOptions:u({value:t,origLeft:null,orig:n,connect:"align",mode:"text/html",lineNumbers:!0,collapseIdentical:!1,highlightDifferences:!0})}}});function _(e,t,n,r,s,C){const a=h("Codemirror");return e.isMounted?(f(),l(a,{key:0,merge:!0,options:e.cmOptions,height:400,class:"cm-component",onChange:e.onChange},null,8,["options","onChange"])):d("",!0)}const b=c(g,[["render",_]]);export{b as default};
