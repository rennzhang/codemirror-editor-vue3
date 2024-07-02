import{_ as a,c,a as i,d as n}from"./index.DD8iZr2B.js";import{_ as p,d,D as m,o as l,b as f,s as r}from"./framework.CikD31qk.js";import"./commonjsHelpers.Cpj98o6Y.js";const u=d({components:{Codemirror:a},setup(){const o=r(`完整日志下载地址：${c({href:"/logDownload",download:"",target:"_blank"})}

${i("带有时间节点和输出类型的日志")}
${n("info content","info")}
${n("warning content","warning")}
${n("error content","error")}
`);return{ref:r,code:o,cmOptions:{mode:"fclog"}}}});function _(o,e,$,g,k,C){const t=m("Codemirror");return l(),f(t,{value:o.code,"onUpdate:value":e[0]||(e[0]=s=>o.code=s),options:o.cmOptions,border:"",height:400},null,8,["value","options"])}const O=p(u,[["render",_]]);export{O as default};
