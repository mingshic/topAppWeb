webpackJsonp([68],{AE6r:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),l=a.n(n),r=(a("m4ug"),a("eMYz")),s=a("Z1y9"),i=(a("mw3O"),{components:{HeaderLast:r.a},data:function(){return{workBenchPartRecycleTit:"备件回收",activeName:"first",caseId:this.$route.params.caseId,transportCompany:"",transportCode:"",transportCompanytype:"",dialogVisible:!1,innerVisible:!1,remark:"",maininput:[],parts:[],recycleInfoinput:[],supplier:{},currentdate:"",canRecycleTime:"",senderArea:[]}},created:function(){var e=this;this.currentdate=new Date,this.parts=this.$route.params.parts,console.log("========="+this.caseId),console.log(this.parts),console.log("======="),s.a.get("?action=/parts/getPartsCanRecycle&CASE_ID="+this.caseId).then(function(t){console.log("ffffffffff"),console.log(t),e.maininput=t.main[0],e.recycleInfoinput=t.recycleInfo[0],e.supplier=t.supplier})},methods:{sender:function(){var e=this;if(console.log(this.transportCompany),"1000047"!=this.transportCompany)return alert("物流公司不是顺丰物流，无法选择此功能"),!1;this.dialogVisible=!0,s.a.get("?action=/parts/queryArea&areaCode="+this.maininput.areaId).then(function(t){console.log("hhhhhhhhhh"),console.log(t),e.senderArea=t.DATA[0]})},onSubmit1:function(){var e=this,t=this.$loading({lock:!0,text:"提交中...",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.3)"}),a={ShipperCode:"SF"};a.OrderCode=(new Date).getTime(),a.PayType=1,a.ExpType=1;var n={};n.Name=this.maininput.empname,n.Mobile=this.maininput.recyclePhone,n.CityName=this.senderArea.areaName,n.ProvinceName=this.senderArea.provinceName,n.Address=this.maininput.customerAddress,a.Sender=n;var r={};r.Name=this.recycleInfoinput.recyclePerson+"(神州数码公司)",r.Mobile=this.recycleInfoinput.recycleContact,r.ProvinceName=this.recycleInfoinput.recycyleProvince,r.CityName=this.recycleInfoinput.recycleCity,r.Address=this.recycleInfoinput.recycleAddr,a.Receiver=r,a.Remark="收件公司名称：神州数码公司";var i=[],c={GoodsName:"电子产品"};i.push(c),a.Commodity=i,a.Remark=this.remark;var o=l()(a);console.log(o),s.a.get("?action=/parts/getSFSendCode&kd="+o).then(function(a){t.close(),"0"==a.STATUSCODE?(e.$message({message:"提交成功",type:"success",center:!0,customClass:"msgdefine",TimeRanges:"1000"}),innerVisible=!1,location.reload):e.$message({message:a.MESSAGE+"发生错误",type:"error",center:!0,customClass:"msgdefine"}),console.log(a)})},onSubmit2:function(e){var t=this,a=this.$loading({lock:!0,text:"提交中...",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.3)"}),n=this,r=[];this.parts.forEach(function(e,t,a){var n={};n.gOrB=e.gOrB,n.length=e.length,n.pkid=e.pkid,n.supplyType=e.supplyType,n.useState=e.useState,r.push(n)});var i={};i.recycleBy=n.maininput.applyBy,i.recycleOn=n.currentdate,i.customerLinkman=n.maininput.customerLinkman,i.customerTel=n.maininput.customerTel,i.customerAddress=n.maininput.customerAddress,i.canRecycleTime=n.canRecycleTime,i.remark=n.maininput.remark,i.caseId=n.maininput.caseId,i.areaId=n.maininput.areaId;var c={};c.recyclePerson=n.recycleInfoinput.recyclePerson,c.recycleContact=n.recycleInfoinput.recycleContact,c.recycleAddr=n.recycleInfoinput.recycleAddr,c.areaCode=n.recycleInfoinput.areaCode,c.transportCompany=n.transportCompany,c.transportCode=n.transportCode,c.dcitsRecyclePerson=n.recycleInfoinput.dcitsRecyclePerson,c.dcitsRecycleContact=n.recycleInfoinput.dcitsRecycleContact,c.remark=n.remark,c.sendType1=n.transportCompanytype,console.log("1111111"),console.log(r),console.log(i),console.log(c);for(var o=0;o<r.length;o++)if(null==r[o].recycleMId||""==r.recycleMId){i.ifSave=1;break}console.log("details:"+r);var p=new URLSearchParams;if(p.append("main",l()(i)),p.append("details",l()(r)),p.append("recycleInfo",l()(c)),console.log(p.get("main")),console.log(p.get("details")),console.log(p.get("recycleInfo")),1==e){if(""==c.transportCode)return a.close(),alert("请填写物流单号！"),!1;s.a.post("?action=/parts/insertRecycleApply",p).then(function(e){a.close(),"0"==e.STATUSCODE?(t.$message({message:"提交成功",type:"success",center:!0,customClass:"msgdefine",TimeRanges:"1000"}),location.reload):t.$message({message:e.MESSAGE+"发生错误",type:"error",center:!0,customClass:"msgdefine"}),console.log(e)})}2==e&&s.a.post("?action=/parts/submitPartsRecycle",p).then(function(e){a.close(),"0"==e.STATUSCODE?(t.$message({message:"保存成功",type:"success",center:!0,customClass:"msgdefine",TimeRanges:"1000"}),t.dialogVisible0=!1,t.dialogVisible1=!1,location.reload):t.$message({message:e.MESSAGE+"发生错误",type:"error",center:!0,customClass:"msgdefine"}),console.log(e)})}}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"workBenchPartRecycle"},[a("header-last",{attrs:{title:e.workBenchPartRecycleTit}}),e._v(" "),a("div",{staticStyle:{height:"0.45rem"}}),e._v(" "),a("div",{staticClass:"partRecycleContent"},[a("el-form",{attrs:{"label-width":"100px","label-position":"left"}},[a("p",[e._v("基本信息")]),e._v(" "),a("el-form-item",{attrs:{label:"回收申请人："}},[a("el-input",{attrs:{disabled:!0},model:{value:e.maininput.empname,callback:function(t){e.$set(e.maininput,"empname",t)},expression:"maininput.empname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"申请时间:"}},[a("el-col",{attrs:{span:24}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"请选择可回收时间",disabled:!0},model:{value:e.currentdate,callback:function(t){e.currentdate=t},expression:"currentdate"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"回收联系人："}},[a("el-input",{attrs:{disabled:!0},model:{value:e.maininput.customerLinkman,callback:function(t){e.$set(e.maininput,"customerLinkman",t)},expression:"maininput.customerLinkman"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机:"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.maininput.customerTel,callback:function(t){e.$set(e.maininput,"customerTel",t)},expression:"maininput.customerTel"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"回收地点:"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.maininput.customerAddress,callback:function(t){e.$set(e.maininput,"customerAddress",t)},expression:"maininput.customerAddress"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"客户交接地址:"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.maininput.customerAddress,callback:function(t){e.$set(e.maininput,"customerAddress",t)},expression:"maininput.customerAddress"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"可回收时间:"}},[a("el-col",{attrs:{span:24}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"请选择可回收时间"},model:{value:e.canRecycleTime,callback:function(t){e.canRecycleTime=t},expression:"canRecycleTime"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"回收单要求:"}},[a("el-input",{attrs:{type:"textarea",placeholder:"选填，请填写回收单要求",rows:3,disabled:!0},model:{value:e.maininput.remark,callback:function(t){e.$set(e.maininput,"remark",t)},expression:"maininput.remark"}})],1),e._v(" "),a("p",[e._v("温馨提示：通过第三方物流陆运方式发货，运费到付。推荐顺丰物流 客服电话 "),a("a",{staticStyle:{"font-size":"0.13em",color:"#2698d6"},attrs:{href:"tel:95338"},on:{click:e.sendCall}},[e._v("95338")]),e._v("。")]),e._v(" "),a("p",[e._v("回收安排信息")]),e._v(" "),a("el-form-item",{attrs:{label:"回收件收货人:"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.recycleInfoinput.recyclePerson,callback:function(t){e.$set(e.recycleInfoinput,"recyclePerson",t)},expression:"recycleInfoinput.recyclePerson"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"回收件收货人联系方式:","label-width":"40%"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.recycleInfoinput.recycleContact,callback:function(t){e.$set(e.recycleInfoinput,"recycleContact",t)},expression:"recycleInfoinput.recycleContact"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"回收件收货地址:"}},[a("el-input",{attrs:{rows:.5,disabled:!0},model:{value:e.recycleInfoinput.recycleAddr,callback:function(t){e.$set(e.recycleInfoinput,"recycleAddr",t)},expression:"recycleInfoinput.recycleAddr"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"物流公司:"}},[a("el-select",{model:{value:e.transportCompany,callback:function(t){e.transportCompany=t},expression:"transportCompany"}},e._l(e.supplier,function(e){return a("el-option",{key:e.key,attrs:{label:e.supplierName,value:e.supplierId}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"物流单号:"}},[a("el-input",{attrs:{placeholder:"请填写物流单号:"},model:{value:e.transportCode,callback:function(t){e.transportCode=t},expression:"transportCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"回收物流类型"}},[a("el-select",{model:{value:e.transportCompanytype,callback:function(t){e.transportCompanytype=t},expression:"transportCompanytype"}},[a("el-option",{key:1,attrs:{label:"第三方物流",value:1}}),e._v(" "),a("el-option",{key:5,attrs:{label:"供应商回收自取",value:5}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"回寄说明:"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请填写回寄说明",rows:3},model:{value:e.remark,callback:function(t){e.remark=t},expression:"remark"}})],1)],1),e._v(" "),a("div",{staticClass:"buttons"},[a("el-button",{attrs:{type:"primary"},on:{click:e.sender}},[e._v("我要寄件")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onSubmit2(2)}}},[e._v("暂存")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onSubmit2(1)}}},[e._v("提交")]),e._v(" "),a("router-link",{attrs:{to:{name:"workBenchPartRecycle",query:{caseId:"126511"}}}},[a("el-button",{attrs:{type:"primary"}},[e._v("关闭")])],1)],1)],1),e._v(" "),a("div",{staticClass:"partRecDialog"},[a("el-dialog",{attrs:{visible:e.dialogVisible,width:"80%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{staticClass:"form1",staticStyle:{color:"#333333"},attrs:{"label-width":"80px"}},[a("p",[e._v("发件人信息")]),e._v(" "),a("el-form-item",{attrs:{label:"发货人"}},[a("el-input",{staticClass:"input1",staticStyle:{"font-size":"6px"},attrs:{disabled:!0},model:{value:e.maininput.empname,callback:function(t){e.$set(e.maininput,"empname",t)},expression:"maininput.empname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"发货人手机"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.maininput.recyclePhone,callback:function(t){e.$set(e.maininput,"recyclePhone",t)},expression:"maininput.recyclePhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"发货城市"}},[a("el-input",{staticClass:"input1",staticStyle:{"font-size":"6px width:20px"},attrs:{disabled:!0},model:{value:e.senderArea.fullName,callback:function(t){e.$set(e.senderArea,"fullName",t)},expression:"senderArea.fullName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"详细地址"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.maininput.customerAddress,callback:function(t){e.$set(e.maininput,"customerAddress",t)},expression:"maininput.customerAddress"}})],1),e._v(" "),a("p",[e._v("收货人信息")]),e._v(" "),a("el-form-item",{attrs:{label:"收货人"}},[a("el-input",{staticClass:"input1",staticStyle:{"font-size":"6px"},attrs:{disabled:!0},model:{value:e.recycleInfoinput.recyclePerson,callback:function(t){e.$set(e.recycleInfoinput,"recyclePerson",t)},expression:"recycleInfoinput.recyclePerson"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"收货人手机"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.recycleInfoinput.recycleContact,callback:function(t){e.$set(e.recycleInfoinput,"recycleContact",t)},expression:"recycleInfoinput.recycleContact"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"收货人城市"}},[a("el-input",{staticClass:"input1",staticStyle:{"font-size":"6px width:20px"},model:{value:e.recycleInfoinput.recycleCity,callback:function(t){e.$set(e.recycleInfoinput,"recycleCity",t)},expression:"recycleInfoinput.recycleCity"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"详细地址"}},[a("el-input",{model:{value:e.recycleInfoinput.recycleAddr,callback:function(t){e.$set(e.recycleInfoinput,"recycleAddr",t)},expression:"recycleInfoinput.recycleAddr"}})],1),e._v(" "),a("el-form-item",{staticClass:"submit"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{staticClass:"onsubmit",attrs:{type:"primary"},on:{click:function(t){e.innerVisible=!0}}},[e._v("顺丰下单")])],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{visible:e.innerVisible,width:"60%"},on:{"update:visible":function(t){e.innerVisible=t}}},[a("el-form",{staticClass:"form1",staticStyle:{color:"#333333"},attrs:{"label-width":"80px"}},[a("p",{staticStyle:{"line-height":"60px"}},[a("span",[e._v("确定预约寄件？")])]),e._v(" "),a("el-form-item",{staticClass:"submit"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.innerVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{staticClass:"onsubmit",attrs:{type:"primary"},on:{click:e.onSubmit1}},[e._v("确定")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(i,c,!1,function(e){a("wLRR")},null,null);t.default=o.exports},wLRR:function(e,t){}});