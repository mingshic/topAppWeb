webpackJsonp([56],{"6zlO":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("eMYz"),i=(o("YF26"),o("Z1y9")),a={name:"workBenchPeopleInfoDetail",components:{headerLast:n.a},data:function(){return{workBenchPeopleInfoDetailTit:"",payPlanId:this.$route.query.payPlanId,workBenchPeopleInfoDetailObj:[{leftTit:"用户ID：",rightCon:""},{leftTit:"手机：",rightCon:""},{leftTit:"EMAIL：",rightCon:""},{leftTit:"资源类型：",rightCon:""},{leftTit:"业务方向：",rightCon:""},{leftTit:"岗位名称：",rightCon:""},{leftTit:"所属项目部：",rightCon:""},{leftTit:"所属部门：",rightCon:""},{leftTit:"常驻所在地：",rightCon:""}]}},created:function(){var e=this;console.log(this.$route.query.EMPID),i.a.get("?action=/person/getPersonDetail&SERCH_EMP_ID="+this.$route.query.EMPID,{}).then(function(t){console.log("GetPODetail",t);for(var o=0;o<t.data.length;o++)e.workBenchPeopleInfoDetailTit=t.data[o].REALNAME,e.workBenchPeopleInfoDetailObj[0].rightCon=t.data[o].USERID,e.workBenchPeopleInfoDetailObj[1].rightCon=t.data[o].MOBILENO,e.workBenchPeopleInfoDetailObj[2].rightCon=t.data[o].OEMAIL,e.workBenchPeopleInfoDetailObj[3].rightCon=t.data[o].RESOURCE_TYPE,e.workBenchPeopleInfoDetailObj[4].rightCon=t.data[o].USER_YWFX,e.workBenchPeopleInfoDetailObj[5].rightCon=t.data[o].EMP_POSITION_NM,e.workBenchPeopleInfoDetailObj[6].rightCon=t.data[o].USER_QY,e.workBenchPeopleInfoDetailObj[7].rightCon=t.data[o].ENG_ORGNAME,e.workBenchPeopleInfoDetailObj[8].rightCon=t.data[o].USUAL_AREA})}},l={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"workBenchPeopleInfoDetailView"},[o("header-last",{attrs:{title:e.workBenchPeopleInfoDetailTit}}),e._v(" "),o("div",{staticStyle:{height:"0.45rem"}}),e._v(" "),o("div",{staticClass:"workBenchPeopleInfoDetailContent"},[o("div",{staticClass:"cell"},[o("ul",e._l(e.workBenchPeopleInfoDetailObj,function(t){return o("li",{key:t.id},[o("p",[e._v(e._s(t.leftTit))]),o("p",{domProps:{innerHTML:e._s(t.rightCon)}})])}))])])],1)},staticRenderFns:[]};var r=o("VU/8")(a,l,!1,function(e){o("O/HK")},"data-v-630856ae",null);t.default=r.exports},"O/HK":function(e,t){}});