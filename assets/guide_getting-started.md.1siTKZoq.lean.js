function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/index.mSWb5lyD.js","assets/chunks/index.Cde69QOu.js","assets/chunks/framework.Dwcv4Uug.js","assets/chunks/javascript.CmanLrEu.js","assets/chunks/javascript.CDj2IxTc.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t,Y as h,H as l,c as p,b as k,L as e,e as E,a4 as n,o as a}from"./chunks/framework.Dwcv4Uug.js";const r={data(){return{dynamicComponent:null}},mounted(){h(()=>import("./chunks/index.mSWb5lyD.js"),__vite__mapDeps([0,1,2,3,4])).then(s=>{this.dynamicComponent=l(s.default)})}},m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/getting-started.md","filePath":"guide/getting-started.md","lastUpdated":1695707222000}'),d=n("",14),g=n("",2);function o(s,y,c,F,i,u){return a(),p("div",null,[d,i.dynamicComponent?(a(),k(e(i.dynamicComponent),{key:0})):E("",!0),g])}const B=t(r,[["render",o]]);export{m as __pageData,B as default};
