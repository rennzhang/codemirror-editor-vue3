function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/mergeDemo.CE-wae0Q.js","assets/chunks/index.Cde69QOu.js","assets/chunks/framework.Dwcv4Uug.js","assets/chunks/javascript.CDj2IxTc.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t,Y as h,H as l,c as e,b as p,L as k,e as r,a4 as n,o as a}from"./chunks/framework.Dwcv4Uug.js";const E={data(){return{dynamicComponent:null}},mounted(){h(()=>import("./chunks/mergeDemo.CE-wae0Q.js"),__vite__mapDeps([0,1,2,3])).then(s=>{this.dynamicComponent=l(s.default)})}},C=JSON.parse('{"title":"Merge Mode","description":"","frontmatter":{},"headers":[],"relativePath":"guide/prepattern/merge.md","filePath":"guide/prepattern/merge.md","lastUpdated":1711621496000}'),d=n("",4),g=n("",1);function o(s,y,c,F,i,m){return a(),e("div",null,[d,i.dynamicComponent?(a(),p(k(i.dynamicComponent),{key:0})):r("",!0),g])}const B=t(E,[["render",o]]);export{C as __pageData,B as default};
