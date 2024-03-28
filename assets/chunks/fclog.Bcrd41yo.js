import{_ as s,c,a as i,d as n}from"./index.Cde69QOu.js";import{_ as p,d,E as m,b as l,h as r,o as f}from"./framework.Dwcv4Uug.js";const u=d({components:{Codemirror:s},setup(){const o=r(`完整日志下载地址：${c({href:"/logDownload",download:"",target:"_blank"})}

${i("带有时间节点和输出类型的日志")}
${n("info content","info")}
${n("warning content","warning")}
${n("error content","error")}
`);return{ref:r,code:o,cmOptions:{mode:"fclog"}}}});function _(o,e,$,g,k,C){const t=m("Codemirror");return f(),l(t,{value:o.code,"onUpdate:value":e[0]||(e[0]=a=>o.code=a),options:o.cmOptions,border:"",height:400},null,8,["value","options"])}const b=p(u,[["render",_]]);export{b as default};
