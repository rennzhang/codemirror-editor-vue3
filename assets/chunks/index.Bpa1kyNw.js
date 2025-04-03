import{_ as n,c as i,a as t,b as o}from"./index.5PpOw0g3.js";import{_ as l,d,b as p,p as r,B as m,o as u}from"./framework.ZlHgrsSq.js";import"./commonjsHelpers.Cpj98o6Y.js";const g=d({components:{Codemirror:n},setup(){const e=r(`完整日志下载地址：${i({href:"/logDownload",download:"",target:"_blank"})}
${t("可以标记每一行日志的输出类型")}
${o("2021-08-26 15:07:09: job is success","info")}
${o("2021-08-26 15:07:09: job is success","warning")}
${o("2021-08-26 15:07:09: job is error","error")}

====================引擎日志====================

DataStreamMain start
java.lang.NullPointerException
at
at java.util.Properties.load0(Properties.java:353)
at java.util.Properties.load(Properties.java:341)
at com.zhiweicloud.dataprocess.util.common.PropertiesUtil.getStringByKey(PropertiesUtil.
at com.zhiweicloud.dataprocess.engine.FlinkEngine.readFlinkEngineConfig(FlinkEngine.
at com.zhiweicloud.dataprocess.engine.FlinkEngine.buildFlinkStream(FlinkEngine.
at com.zhiweicloud.dataprocess.engine.FlinkEngine.startFlinkEngine(FlinkEngine.
at com.zhiweicloud.dataprocess.DataStreamMain.main(DataStreamMain.
 `);return{Codemirror:n,createLinkMark:i,createLogMark:o,createTitle:t,ref:r,code:e,cmOptions:{mode:"log",theme:"default"}}}});function k(e,a,f,_,$,v){const s=m("Codemirror");return u(),p(s,{value:e.code,"onUpdate:value":a[0]||(a[0]=c=>e.code=c),options:e.cmOptions,border:"",height:400},null,8,["value","options"])}const h=l(g,[["render",k]]);export{h as default};
