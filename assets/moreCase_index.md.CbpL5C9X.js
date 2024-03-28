function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/index.Dgy4IUEb.js","assets/chunks/framework.Dwcv4Uug.js","assets/chunks/index.Cde69QOu.js","assets/chunks/javascript.CmanLrEu.js","assets/chunks/javascript.CDj2IxTc.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as o,Y as r,H as n,c as i,b as l,L as d,e as c,m as e,a as m,o as s}from"./chunks/framework.Dwcv4Uug.js";const _={data(){return{CaseContainer:null}},mounted(){r(()=>import("./chunks/index.Dgy4IUEb.js"),__vite__mapDeps([0,1,2,3,4])).then(a=>{this.CaseContainer=n(a.default)})}},v=JSON.parse('{"title":"Example","description":"","frontmatter":{"aside":false},"headers":[],"relativePath":"moreCase/index.md","filePath":"moreCase/index.md","lastUpdated":1711621496000}'),p=e("h1",{id:"example",tabindex:"-1"},[m("Example "),e("a",{class:"header-anchor",href:"#example","aria-label":'Permalink to "Example"'},"​")],-1),h=e("p",null,"More cases are being updated...",-1);function u(a,x,f,C,t,E){return s(),i("div",null,[p,h,t.CaseContainer?(s(),l(d(t.CaseContainer),{key:0})):c("",!0)])}const P=o(_,[["render",u]]);export{v as __pageData,P as default};
