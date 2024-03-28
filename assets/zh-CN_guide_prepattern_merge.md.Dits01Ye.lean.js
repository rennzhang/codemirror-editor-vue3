function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/mergeDemo.CE-wae0Q.js","assets/chunks/index.Cde69QOu.js","assets/chunks/framework.Dwcv4Uug.js","assets/chunks/javascript.CDj2IxTc.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t,Y as h,H as l,c as k,b as p,L as e,e as E,a4 as n,o as a}from"./chunks/framework.Dwcv4Uug.js";const r={data(){return{dynamicComponent:null}},mounted(){h(()=>import("./chunks/mergeDemo.CE-wae0Q.js"),__vite__mapDeps([0,1,2,3])).then(s=>{this.dynamicComponent=l(s.default)})}},u=JSON.parse('{"title":"merge 模式","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/guide/prepattern/merge.md","filePath":"zh-CN/guide/prepattern/merge.md","lastUpdated":1711621496000}'),d=n("",4),g=n("",1);function o(s,y,F,c,i,m){return a(),k("div",null,[d,i.dynamicComponent?(a(),p(e(i.dynamicComponent),{key:0})):E("",!0),g])}const B=t(r,[["render",o]]);export{u as __pageData,B as default};
