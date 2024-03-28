import{_ as t}from"./index.Cde69QOu.js";import"./javascript.CmanLrEu.js";import{d as n,h as s,o as i,c as l,J as m,p}from"./framework.Dwcv4Uug.js";import"./javascript.CDj2IxTc.js";const c={style:{width:"60%","margin-left":"20vw"}},h=n({__name:"home",setup(u){const r=s(`var arr = [3, 10, 6, 2];
for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
            var num = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = num;
        }
    }
}
console.log(arr)`),e={mode:"text/javascript"};return(f,a)=>(i(),l("div",c,[m(p(t),{value:r.value,"onUpdate:value":a[0]||(a[0]=o=>r.value=o),options:e,border:"",height:300},null,8,["value"])]))}});export{h as default};
