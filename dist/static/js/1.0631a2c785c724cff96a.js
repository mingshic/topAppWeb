webpackJsonp([1],{nzLt:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("77PY"),i=e("DxVv"),r=(e("YF26"),e("Z1y9")),l={name:"workBenchMyEventAll",components:{headerBase:s.a,loadingtmp:i.a},data:function(){return{workBenchMyEventTit:"所有事件",opinionTab:[{name:"first",label:"执行中",eventListArr:[],numname:"unCloseNum"},{name:"second",label:"已关闭",eventListArr:[],numname:"closeNum"},{name:"third",label:"全部",eventListArr:[],numname:"allNum"}],activeName:this.$route.query.isSearch?"third":"first",searchpage:1,isSearch:this.$route.query.isSearch,page:1,pageSize:10,busy:!1,loadall:!1,tab_box:1,searchData:{FACTORY_NAME:this.$route.query.factoryName,TECH_NAME:this.$route.query.techName,CASE_LEVEL:this.$route.query.caseLevel,INDUSTRY_NAME:this.$route.query.industryName,industry:this.$route.query.industry?this.$route.query.industry.split(","):[],custid:this.$route.query.custid,type:this.$route.query.type?this.$route.query.type.split(","):["1","2"],startTime:this.$route.query.startDate,endTime:this.$route.query.endDate},objpages:{first:{page:1,loadall:!1,IF_CLOSE:"N",idx:0,isSearch:0},second:{page:1,loadall:!1,IF_CLOSE:"Y",idx:1,isSearch:0},third:{page:1,loadall:!1,IF_CLOSE:"",idx:2,isSearch:0}},totalData:{unCloseNum:0,closeNum:0,allNum:0}}},created:function(){console.log("ccccccccccccc",this.$route.query.custid)},activated:function(){this.$route.meta.isUseCache||(this.busy=!1,this.loadall=!1,this.page=1,this.objpages.first.page=1,this.objpages.first.loadall=!1,this.opinionTab[0].eventListArr=[],this.objpages.second.loadall=!1,this.opinionTab[1].eventListArr=[],this.objpages.third.loadall=!1,this.opinionTab[2].eventListArr=[],this.loadMore()),this.$route.meta.isUseCache=!1},methods:{tabClick:function(t){var a=this.objpages[this.activeName];if(this.loadall=a.loadall,this.isSearch!=a.isSearch)return a.page=1,a.loadall=!1,a.eventListArr=[],a.isSearch=this.isSearch,void this.loadMore();1!=a.page||a.loadall||this.loadMore()},returnList:function(t,a,e){return e=t?e.concat(a.data):a.data,0==a.data.length||a.data.length<this.pageSize?(this.busy=!1,this.loadall=!0,this.objpages[this.activeName].loadall=!0):(this.busy=!1,this.objpages[this.activeName].page++),e},getEventList:function(){var t=this,a=this.objpages[this.activeName].page>1,e=this.objpages[this.activeName],s={CASE_TYPEID:"1,2",PAGE_NUM:e.page,PAGE_TOTAL:this.pageSize,IF_CLOSE:e.IF_CLOSE};this.isSearch&&(s.CUST_ID=this.$route.query.custid,s.INDUSTRY_NAME=this.searchData.INDUSTRY_NAME,s.TECH_NAME=this.searchData.TECH_NAME,s.CASE_LEVEL=this.searchData.CASE_LEVEL,s.FACTORY_NAME=this.searchData.FACTORY_NAME,s.CASE_TYPEID=this.searchData.type.join(","),s.CUST_NAME=this.searchData.customer,s.PROJECT_NAME=this.searchData.proName,s.PM_NAME=this.searchData.PM,s.CASE_CD=this.searchData.eventNum,s.KEYWORD=this.searchData.keyWord,s.SALE_NAME=this.searchData.sale,s.START_TIME=this.searchData.startTime,s.END_TIME=this.searchData.endTime),r.a.get("?action=GetCaseList&TYPE=all",s).then(function(s){if(console.log(s),"0"==s.STATUSCODE){var i=t.opinionTab[e.idx].eventListArr;t.opinionTab[e.idx].eventListArr=t.returnList(a,s,i),t.totalData=s.totalData}})},loadMore:function(){var t=this;if(this.busy||this.objpages[this.activeName].loadall)return!1;this.busy=!0,console.log("loadMore"),setTimeout(function(){t.getEventList()},500)},getSearParams:function(t){this.activeName="third",this.objpages.third.page=1,this.objpages.third.loadall=!1,this.opinionTab[2].eventListArr=[],this.loadall=!1,this.objpages.third.isSearch=1,this.isSearch=1,this.searchData=t,this.loadMore(),this.objpages.first.isSearch=0,this.objpages.first.loadall=!1,this.opinionTab[0].eventListArr=[],this.objpages.second.isSearch=0,this.objpages.second.loadall=!1,this.opinionTab[1].eventListArr=[]}}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"workBenchMyEventView"},[e("header-base",{attrs:{title:t.workBenchMyEventTit,queryData:t.searchData},on:{searchPro:t.getSearParams}}),t._v(" "),e("div",{staticStyle:{height:"0.45rem"}}),t._v(" "),e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"content",attrs:{"infinite-scroll-disabled":"busy","infinite-scroll-distance":"10"}},[e("el-tabs",{on:{"tab-click":t.tabClick},model:{value:t.activeName,callback:function(a){t.activeName=a},expression:"activeName"}},[t._l(t.opinionTab,function(a){return[e("el-tab-pane",{key:a.id,attrs:{label:a.label+"("+t.totalData[a.numname]+")",name:a.name}},[e("div",{staticStyle:{overflow:"auto"}},t._l(a.eventListArr,function(a){return e("div",{key:a.id,staticClass:"eventCell"},[e("router-link",{attrs:{to:{name:"eventShow",query:{caseId:a.CASE_ID}}}},[e("div",{staticClass:"cellTop"},[e("el-row",[e("el-col",{attrs:{span:1}},[e("span",{staticClass:"spheathcolor",class:"spheathcolor"+a.CASE_HEALTH})]),t._v(" "),e("el-col",{attrs:{span:10}},[e("div",{staticClass:"cellTopNum"},[t._v("\n                    "+t._s(a.CASE_NO)+"\n                    "),e("span",{staticClass:"speventlevel",class:"speventlevelcolor"},[t._v(t._s(a.CASE_LEVEL))])])]),t._v(" "),e("el-col",{attrs:{span:13}},[e("div",{staticClass:"cellTopTime"},[e("span",[t._v(t._s(a.CREATE_DATE))])])])],1)],1),t._v(" "),e("div",{staticClass:"cellContent"},[e("el-row",[e("el-col",{attrs:{span:12}},[e("span",{staticClass:"tit"},[t._v("状态：")]),e("span",[t._v(t._s(a.DEAL_STATUS_NAME))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("span",{staticClass:"tit"},[t._v("类型：")]),e("span",[t._v(t._s(a.CASE_TYPE))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("span",{staticClass:"tit"},[t._v("厂商：")]),e("span",[t._v(t._s(a.FACTORY))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("span",{staticClass:"tit"},[t._v("型号：")]),e("span",[t._v(t._s(a.DEVICE))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("span",{staticClass:"tit"},[t._v("序列号：")]),e("span",[t._v(t._s(a.SN))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("span",{staticClass:"tit"},[t._v("说明：")]),e("span",[t._v(t._s(a.PROBLEM_DETAIL))])])],1)],1)])],1)})),t._v(" "),e("loadingtmp",{attrs:{busy:t.busy,loadall:t.loadall}})],1)]})],2)],1)],1)},staticRenderFns:[]};var n=e("VU/8")(l,o,!1,function(t){e("wWEq")},"data-v-bfb7e544",null);a.default=n.exports},wWEq:function(t,a){}});