webpackJsonp([60],{Up3J:function(e,t){},el8P:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("77PY"),i=(a("YF26"),a("Z1y9")),r=a("DxVv"),o={name:"workBenchPOParts",components:{headerBase:s.a,loadingtmp:r.a},data:function(){return{workBenchPOPartsTit:"PO信息-备件",searchType:"POPartsInfo",tableData:[],workBenchPOPartsObj:[{prop:"SUPPLIER_NAME",label:"供应商",width:"25%"},{prop:"POTYPENAME",label:"类型",width:"25%"},{prop:"PAYPLAN_ACTUALDATE",label:"实际支付日期",width:"25%"},{prop:"TOTALAMOUNT",label:"金额",width:"25%"}],page:1,pageSize:30,busy:!1,loadall:!1,tableHeight:400,isSearch:!1,searchData:{}}},created:function(){this.getPOPartsList()},mounted:function(){var e=this;this.$nextTick(function(){var t=e;e.tableHeight=document.documentElement.clientHeight-45,window.onresize=function(){t.tableHeight=document.documentElement.clientHeight-45}})},methods:{getPOPartsList:function(){var e=this,t={PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,TYPE:"2",YM:this.$route.query.YM};console.log(t),this.isSearch&&(t.SUPPLIER_NAME=this.searchData.supplyName,t.START_TIME=this.searchData.startTime,t.END_TIME=this.searchData.endTime);var a=this.page>1;i.a.get("?action=/po/GetPOList",t).then(function(t){console.log("222222",t),e.tableData=a?e.tableData.concat(t.data):t.data,0==t.data.length||t.data.length<e.pageSize?(e.busy=!0,e.loadall=!0,e.$message({message:"已加载全部数据",type:"success",center:!0,duration:1e3,customClass:"msgdefine"})):(e.busy=!1,e.page++)})},rowClick:function(e){console.log("row",e),this.$router.push({name:"workBenchPOPayDetail",query:{type:"2",payPlanId:e.PAYPLAN_ID}})},loadMore:function(){var e=this;if(this.busy)return!1;this.busy=!0,setTimeout(function(){e.getPOPartsList()},1e3)},searchList:function(e){console.log("formData",e),this.searchData=e,this.tableData=[],this.busy=!1,this.isSearch=!0,this.page=1,this.loadall=!1,this.loadMore()}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"workBenchPOPartsView"},[a("header-base",{attrs:{title:e.workBenchPOPartsTit,searchType:e.searchType,queryData:e.searchData},on:{searchPro:e.searchList}}),e._v(" "),a("div",{staticStyle:{height:"0.45rem"}}),e._v(" "),a("div",{staticClass:"workBenchPOPartsContent"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.busy&&!e.loadall,expression:"busy && !loadall"},{name:"loadmore",rawName:"v-loadmore",value:e.loadMore,expression:"loadMore"}],staticStyle:{width:"100%"},attrs:{stripe:"","element-loading-text":"正在加载下一页",data:e.tableData,height:e.tableHeight},on:{"row-click":e.rowClick}},[e._l(e.workBenchPOPartsObj,function(e){return[a("el-table-column",{key:e.id,attrs:{prop:e.prop,label:e.label,"min-width":e.width}})]})],2)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(o,n,!1,function(e){a("Up3J")},"data-v-555cab9e",null);t.default=l.exports}});