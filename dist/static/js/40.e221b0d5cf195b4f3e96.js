webpackJsonp([40],{So9i:function(e,a){},c5za:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=t("eMYz"),o=(t("YF26"),t("Z1y9")),r=(t("mw3O"),{name:"eventFeedback",components:{headerLast:l.a},data:function(){return{eventFeedbackTit:"意见反馈",title:"意见内容",formData:{name:"",phone:"",region:"",type:"",article:"",email:""},options:[{value:"1",label:"意见"},{value:"2",label:"投诉"},{value:"3",label:"咨询"},{value:"4",label:"扣款"},{value:"5",label:"事故"}],value4:"1",caseId:this.$route.query.caseId,projectId:this.$route.query.projectId}},methods:{submitForm:function(e){var a=this,t=this.$loading({lock:!0,text:"提交中...",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.3)"}),l=this;this.$refs[e].validate(function(e){if(!e)return a.$message({message:"请正确填写",type:"error",center:!0,customClass:"msgdefine"}),!1;var r="&PROJECT_ID="+a.projectId+"&TYPE="+a.value4+"&NAME="+a.formData.name+"&PHONE="+a.formData.phone+"&CONTENT="+window.encodeURI(a.formData.article);o.a.get("?action=UpdateSuggest&CASE_ID="+a.caseId+r,"").then(function(e){if(t.close(),"0"==e.STATUSCODE){a.$message({message:"提交成功",type:"success",center:!0,customClass:"msgdefine"});var o=l.caseId;setTimeout(function(){l.$router.push({name:"eventShow",query:{caseId:o}})},1e3)}else a.$message({message:e.MESSAGE+"发生错误",type:"error",center:!0,customClass:"msgdefine"})})})}},created:function(){this.formData.name=localStorage.getItem("realName"),this.formData.phone=localStorage.getItem("mobile"),this.formData.email=localStorage.getItem("email")}}),s={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"eventFeedbackView"},[t("header-last",{attrs:{title:e.eventFeedbackTit}}),e._v(" "),t("div",{staticStyle:{height:"0.45rem"}}),e._v(" "),t("div",{staticClass:"content"},[t("el-form",{ref:"formData",attrs:{model:e.formData,"label-width":"0.8rem"}},[t("el-form-item",{attrs:{label:"意见类型"}},[[t("el-select",{attrs:{clearable:"",placeholder:"请选择意见类型"},model:{value:e.value4,callback:function(a){e.value4=a},expression:"value4"}},e._l(e.options,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))]],2),e._v(" "),t("el-form-item",{attrs:{label:"姓名"}},[t("el-input",{model:{value:e.formData.name,callback:function(a){e.$set(e.formData,"name",a)},expression:"formData.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"联系电话"}},[t("el-input",{attrs:{placeholder:"请输入电话号码"},model:{value:e.formData.phone,callback:function(a){e.$set(e.formData,"phone",a)},expression:"formData.phone"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"联系邮箱"}},[t("el-input",{attrs:{placeholder:"请输入邮箱地址"},model:{value:e.formData.email,callback:function(a){e.$set(e.formData,"email",a)},expression:"formData.email"}})],1),e._v(" "),t("div",{staticClass:"article"},[e._v(e._s(e.title))]),e._v(" "),t("el-form-item",{staticClass:"text"},[t("el-input",{attrs:{type:"textarea",placeholder:"请输入意见内容"},model:{value:e.formData.article,callback:function(a){e.$set(e.formData,"article",a)},expression:"formData.article"}})],1),e._v(" "),t("el-form-item",{staticClass:"submitBtn"},[t("el-button",{on:{click:function(a){e.submitForm("formData")}}},[e._v("提交")])],1)],1)],1)],1)},staticRenderFns:[]};var n=t("VU/8")(r,s,!1,function(e){t("So9i")},"data-v-f3fca7de",null);a.default=n.exports}});