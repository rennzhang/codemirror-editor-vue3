import{_ as s,c,a as i,d as n}from"./index.5PpOw0g3.js";import{_ as p,d,b as m,p as r,B as l,o as f}from"./framework.ZlHgrsSq.js";import"./commonjsHelpers.Cpj98o6Y.js";const u=d({components:{Codemirror:s},setup(){const o=r(`完整日志下载地址：${c({href:"/logDownload",download:"",target:"_blank"})}

${i("带有时间节点和输出类型的日志")}
${n("info content","info")}
${n("warning content","warning")}
${n("error content","error")}
`);return{ref:r,code:o,cmOptions:{mode:"fclog"}}}});function _(o,e,$,g,k,C){const t=l("Codemirror");return f(),m(t,{value:o.code,"onUpdate:value":e[0]||(e[0]=a=>o.code=a),options:o.cmOptions,border:"",height:400},null,8,["value","options"])}const B=p(u,[["render",_]]);export{B as default};
