webpackJsonp([42],{espZ:function(t,e){},iZOe:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("eMYz"),a=(s("YF26"),s("Z1y9")),l=(s("DxVv"),{name:"workBenchSLAfeedback",components:{headerLast:i.a},data:function(){return{SLAfeedbackTit:"SLA反馈",dialogVisible0:!1,dialogVisible1:!1,radio:0,typeid:"",form:{des1:"",des2:"",des3:""},date:"",status:"",SLAObj:[]}},created:function(){this.getWorkInfo()},methods:{getWorkInfo:function(){var t=this;a.a.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(function(e){console.log(e);var s=e.DATA[0];t.SLAObj=s.slaStatus})},getTime:function(){var t=new Date,e=t.getMonth()+1,s=t.getDate();return e>=1&&e<=9&&(e="0"+e),s>=0&&s<=9&&(s="0"+s),t.getFullYear()+"-"+e+"-"+s+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()},dialogopen:function(t){this.date=this.$options.methods.getTime(),this.typeid=t,8==t||10==t?this.dialogVisible1=!0:this.dialogVisible0=!0},onSubmit:function(){var t=this,e=this.$loading({lock:!0,text:"提交中...",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.3)"}),s=this,i="&REASON="+this.form.des2+"&EXPLAIN="+this.form.des1+this.form.des3;a.a.get("?action=/work/UpdateWorkSLAStatus&WORK_ID="+s.$route.query.workId+"&SLA_TYPE="+s.typeid+"&OPERATE_DATE="+s.date+i).then(function(i){e.close(),"0"==i.STATUSCODE?(t.$message({message:"提交成功",type:"success",center:!0,customClass:"msgdefine",TimeRanges:"1000"}),t.dialogVisible0=!1,t.dialogVisible1=!1,s.getWorkInfo()):(t.$message({message:i.MESSAGE,type:"error",center:!0,customClass:"msgdefine"}),t.dialogVisible0=!1,t.dialogVisible1=!1),console.log(i)})}}}),o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"workBenchSLAfeedback"},[s("header-last",{attrs:{title:t.SLAfeedbackTit}}),t._v(" "),s("div",{staticStyle:{height:"0.45rem"}}),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"tabheader"},[s("el-row",[s("el-col",{staticStyle:{"text-align":"left"},attrs:{span:7}},[t._v(" 反馈项")]),t._v(" "),s("el-col",{attrs:{span:8}},[t._v("反馈时间")]),t._v(" "),s("el-col",{attrs:{span:6}},[t._v("说明")]),t._v(" "),s("el-col",{attrs:{span:3}},[t._v("状态")])],1)],1),t._v(" "),s("div",{staticClass:"tabdetail"},t._l(t.SLAObj,function(e){return s("el-row",{key:e.slaTypeId},[s("el-col",{attrs:{span:7}},[s("div",{staticStyle:{"text-align":"left"}},[t._v(t._s(e.slaType))])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticStyle:{"font-size":"0.13rem","line-height":"0.2rem"}},[t._v(t._s(e.operateDate))])]),t._v(" "),s("el-col",{staticStyle:{"word-wrap":"break-word","font-size":"0.13rem","padding-right":"5px","line-height":"0.2rem"},attrs:{span:6}},[t._v(t._s(e.feedbackDescription))]),t._v(" "),s("el-col",{staticStyle:{float:"right",color:"#2698d6"},attrs:{span:3}},[0==e.ifFeedback?s("div",{on:{click:function(s){t.dialogopen(e.slaTypeId)}}},[t._v("反馈")]):t._e(),t._v(" "),0!=e.ifFeedback?s("div",{staticStyle:{color:"#666666"}},[t._v("已反馈")]):t._e()])],1)}))]),t._v(" "),s("div",{staticClass:"SLAdialog"},[s("el-dialog",{staticClass:"dialog",attrs:{visible:t.dialogVisible0,width:"70%","show-close":!1},on:{"update:visible":function(e){t.dialogVisible0=e}}},[s("el-form",{staticClass:"form1",staticStyle:{color:"#333333"}},[s("el-form-item",{attrs:{label:"反馈时间"}},[s("el-input",{staticClass:"input1",staticStyle:{"font-size":"6px"},attrs:{value:t.date,disabled:!0}})],1),t._v(" "),s("el-form-item",[6==t.typeid?s("el-input",{staticStyle:{"font-size":"6px"},attrs:{type:"textarea",rows:4,placeholder:"请简要描述所做操作及处理结果。例如，更换25盘柜上的13号硬盘后，存储状态恢复正常。"},model:{value:t.form.des1,callback:function(e){t.$set(t.form,"des1",e)},expression:"form.des1"}}):s("el-input",{staticStyle:{"font-size":"6px"},attrs:{type:"textarea",placeholder:"请填写说明"},model:{value:t.form.des1,callback:function(e){t.$set(t.form,"des1",e)},expression:"form.des1"}})],1),t._v(" "),s("el-form-item",{staticClass:"submit"},[s("el-button",{on:{click:function(e){t.dialogVisible0=!1}}},[t._v("取消")]),t._v(" "),s("el-button",{staticClass:"onsubmit",attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("提交")])],1)],1)],1)],1),t._v(" "),s("div",{staticClass:"SLAdialog"},[s("el-dialog",{attrs:{title:"任务反馈",visible:t.dialogVisible1,width:"70%"},on:{"update:visible":function(e){t.dialogVisible1=e}}},[s("el-form",{staticClass:"form1"},[s("el-form-item",{attrs:{label:"原因"}},[s("el-radio-group",{staticStyle:{"font-size":"6px"},model:{value:t.form.des2,callback:function(e){t.$set(t.form,"des2",e)},expression:"form.des2"}},[s("el-radio",{attrs:{label:1}},[t._v("故障定位不准确")]),s("br"),t._v(" "),s("el-radio",{attrs:{label:2}},[t._v("现场备件不可用")]),s("br"),t._v(" "),s("el-radio",{attrs:{label:3}},[t._v("操作失误")]),s("br"),t._v(" "),s("el-radio",{attrs:{label:4}},[t._v("客户取消任务")]),s("br"),t._v(" "),s("el-radio",{attrs:{label:5}},[t._v("实施时间不够")]),s("br"),t._v(" "),s("el-radio",{attrs:{label:6}},[t._v("其他")])],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"解决不成功原因"}},[s("el-input",{staticStyle:{"font-size":"6px"},attrs:{type:"textarea",rows:3,placeholder:"请填写说明"},model:{value:t.form.des3,callback:function(e){t.$set(t.form,"des3",e)},expression:"form.des3"}})],1),t._v(" "),s("el-form-item",{staticClass:"submit"},[s("el-button",{on:{click:function(e){t.dialogVisible1=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{staticClass:"onsubmit",attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("提 交")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var r=s("VU/8")(l,o,!1,function(t){s("espZ")},"data-v-e89165b2",null);e.default=r.exports}});