webpackJsonp([43],{FUZt:function(t,e){},apsi:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("eMYz"),n=(a("YF26"),a("Z1y9")),r={name:"workBenchPOPayDetail",components:{headerLast:i.a},data:function(){return{workBenchPOPayDetailTit:"PO支付详情",payPlanId:this.$route.query.payPlanId,workBenchPOPayDetailObj:[{leftTit:"",rightCon:""},{leftTit:"",rightCon:""},{leftTit:"",rightCon:""},{leftTit:"",rightCon:""},{leftTit:"",rightCon:""},{leftTit:"",rightCon:""},{leftTit:"",rightCon:""},{leftTit:"",rightCon:""},{leftTit:"",rightCon:""},{leftTit:"",rightCon:""},{leftTit:"",rightCon:""}]}},created:function(){var t=this;n.a.get("?action=/po/GetPODetail&TYPE="+this.$route.query.type+"&PAYPLAN_ID="+this.$route.query.payPlanId,{}).then(function(e){console.log("GetPODetail",e);for(var a=0;a<e.data.length;a++)t.workBenchPOPayDetailObj[0].leftTit="计划编号：",t.workBenchPOPayDetailObj[0].rightCon=e.data[a].PAYPLAN_ID,"1"==t.$route.query.type?t.workBenchPOPayDetailObj[1].leftTit="姓名：":t.workBenchPOPayDetailObj[1].leftTit="供应商：",t.workBenchPOPayDetailObj[1].rightCon=e.data[a].SUPPLIER_NAME,t.workBenchPOPayDetailObj[2].leftTit="类型：","1"==t.$route.query.type?t.workBenchPOPayDetailObj[2].rightCon="人员":t.workBenchPOPayDetailObj[2].rightCon="备件",t.workBenchPOPayDetailObj[3].leftTit="业务方向：",t.workBenchPOPayDetailObj[3].rightCon=e.data[a].BUSINESS,t.workBenchPOPayDetailObj[4].leftTit="区域：",t.workBenchPOPayDetailObj[4].rightCon=e.data[a].AREA_NAME,t.workBenchPOPayDetailObj[5].leftTit="制作者：",t.workBenchPOPayDetailObj[5].rightCon=e.data[a].PAYPLAN_OWNER,t.workBenchPOPayDetailObj[6].leftTit="审批日期：",t.workBenchPOPayDetailObj[6].rightCon=e.data[a].APPROVE_DATE,t.workBenchPOPayDetailObj[7].leftTit="支付金额：",t.workBenchPOPayDetailObj[7].rightCon=e.data[a].TOTALAMOUNT,t.workBenchPOPayDetailObj[8].leftTit="预计支付：",t.workBenchPOPayDetailObj[8].rightCon=e.data[a].PAYPLAN_DATE,t.workBenchPOPayDetailObj[9].leftTit="实际支付：",t.workBenchPOPayDetailObj[9].rightCon=e.data[a].PAYPLAN_ACTUALDATE,t.workBenchPOPayDetailObj[10].leftTit="说明：",t.workBenchPOPayDetailObj[10].rightCon=e.data[a].REMARK})}},P={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"workBenchPOPayDetailView"},[a("header-last",{attrs:{title:t.workBenchPOPayDetailTit}}),t._v(" "),a("div",{staticStyle:{height:"0.45rem"}}),t._v(" "),a("div",{staticClass:"workBenchPOPayDetailContent"},[a("div",{staticClass:"cell"},[a("ul",t._l(t.workBenchPOPayDetailObj,function(e){return a("li",{key:e.id},[a("p",[t._v(t._s(e.leftTit))]),a("p",{domProps:{innerHTML:t._s(e.rightCon)}})])}))])])],1)},staticRenderFns:[]};var o=a("VU/8")(r,P,!1,function(t){a("FUZt")},"data-v-d9aeaa82",null);e.default=o.exports}});