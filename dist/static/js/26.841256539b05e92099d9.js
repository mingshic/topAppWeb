webpackJsonp([26],{"5g4J":function(e,t){},MUOc:function(e,t){},"jcZ+":function(e,t){},sDZe:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("bOdI"),r=a.n(o),s=a("Z1y9"),n={name:"searchPeopleOfCity",components:{},props:["queryData"],data:function(){return{form:{empPositionNm:"",resourceType:"",userQy:""},empPositionNmArr:[],resourceTypeArr:[{name:"内部员工",value:"内部"},{name:"外部员工",value:"外部"}],userQyArr:[]}},watch:{},created:function(){var e=this;console.log("focus serach view"),console.log(this.queryData),s.a.get("?action=/system/getPositionList","").then(function(t){console.log("res",t),e.empPositionNmArr=t.data}),s.a.get("?action=/system/getDict2&DICT_TYPE=NT_PRO_AREA","").then(function(t){console.log("res",t),e.userQyArr=t.data}),this.form.empPositionNm=this.queryData.empPositionNm,this.form.resourceType=this.queryData.resourceType,this.form.userQy=this.queryData.userQy},methods:{onCancel:function(){this.$emit("change",{popBg:!1})},onSearch:function(){var e=this.form;this.$emit("search",e);this.$emit("change",{popBg:!1})},noKeyword:function(){document.activeElement.blur()}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"searchOeopleOfCityView"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"岗位名称"}},[a("el-select",{attrs:{placeholder:"岗位名称",clearable:""},model:{value:e.form.empPositionNm,callback:function(t){e.$set(e.form,"empPositionNm",t)},expression:"form.empPositionNm"}},e._l(e.empPositionNmArr,function(e){return a("el-option",{key:e.id,attrs:{label:e.EMP_POSITION_NM,value:e.EMP_POSITION_NM}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"资源类型"}},[a("el-select",{attrs:{placeholder:"资源类型",clearable:""},model:{value:e.form.resourceType,callback:function(t){e.$set(e.form,"resourceType",t)},expression:"form.resourceType"}},e._l(e.resourceTypeArr,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"所属项目部"}},[a("el-select",{attrs:{placeholder:"所属项目部",clearable:""},model:{value:e.form.userQy,callback:function(t){e.$set(e.form,"userQy",t)},expression:"form.userQy"}},e._l(e.userQyArr,function(e){return a("el-option",{key:e.id,attrs:{label:e.DICTNAME,value:e.DICTNAME}})}))],1),e._v(" "),a("el-form-item",{staticClass:"searchBtn"},[a("el-button",{on:{click:e.onCancel}},[e._v("取消")]),e._v(" "),a("el-button",{staticClass:"searchBtnCell",on:{click:e.onSearch}},[e._v("查询")])],1)],1)],1)},staticRenderFns:[]};var l={name:"headerBaseTen",components:{searchPeopleOfCity:a("VU/8")(n,i,!1,function(e){a("jcZ+")},"data-v-36f4a17d",null).exports},data:function(){return{headerRight:"查询",popBg:!1}},props:["title","queryData"],watch:{},created:function(){},methods:{updatePopBg:function(e){console.log(e+"=========="),console.log(e.popBg),this.popBg=e.popBg},searchData:function(e){this.$emit("searchPro",e)},back:function(e){this.$router.back(-1)}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"headerView"},[a("header",[a("div",{staticClass:"headerLeft",on:{click:e.back}},[a("i",{staticClass:"el-icon-arrow-left"})]),e._v(" "),a("h2",[e._v(e._s(e.title))]),e._v(" "),a("div",{staticClass:"headerRight",on:{click:function(t){t.stopPropagation(),e.popBg=!e.popBg}}},[e._v(e._s(e.headerRight))])]),e._v(" "),e.popBg?[a("div",{staticClass:"popBg"},[a("search-people-of-city",{attrs:{queryData:e.queryData},on:{change:e.updatePopBg,search:e.searchData}})],1)]:e._e()],2)},staticRenderFns:[]};var u={name:"workBenchPeopleInfo",components:{headerBaseTen:a("VU/8")(l,c,!1,function(e){a("MUOc")},"data-v-2774db9b",null).exports},data:function(){return{workBenchPeopleInfoTit:"人员信息",tableData:[],workBenchPeopleInfoOfCityObj:[{prop:"REALNAME",label:"姓名",width:"25%"},{prop:"EMP_POSITION_NM",label:"岗位名称",width:"25%"},{prop:"RESOURCE_TYPE",label:"资源类型",width:"25%"},{prop:"USER_QY",label:"所属项目部",width:"25%"}],page:1,pageSize:30,busy:!0,loadall:!1,tableHeight:400,isSearch:!1,searchData:{}}},created:function(){this.getPeopleInfoOfCityList()},mounted:function(){var e=this;this.$nextTick(function(){var t=e;console.log("ssssssss",e.type),e.tableHeight=document.documentElement.clientHeight-45,window.onresize=function(){t.tableHeight=document.documentElement.clientHeight-45}})},methods:{getPeopleInfoOfCityList:function(){var e=this,t=r()({PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,TYPE:"1",AREA_NAME:this.$route.query.areaName},"TYPE",this.$route.query.type);console.log(t),this.isSearch&&(t.EMP_POSITION_NM=this.searchData.empPositionNm,t.RESOURCE_TYPE=this.searchData.resourceType,t.USER_QY=this.searchData.userQy);var a=this.page>1;s.a.get("?action=/person/GetPersonList",t).then(function(t){console.log("222222",t),e.tableData=a?e.tableData.concat(t.data):t.data,0==t.data.length||t.data.length<e.pageSize?(e.busy=!0,e.loadall=!0,e.$message({message:"已加载全部数据",type:"success",center:!0,duration:1e3,customClass:"msgdefine"})):(e.busy=!1,e.page++)})},rowClick:function(e){console.log("row",e),this.$router.push({name:"workBenchPeopleInfoDetail",query:{EMPID:e.EMPID}})},loadMore:function(){var e=this;if(this.busy)return!1;this.busy=!0,setTimeout(function(){e.getPeopleInfoOfCityList()},1e3)},searchList:function(e){console.log("formData",e),this.searchData=e,this.tableData=[],this.busy=!1,this.isSearch=!0,this.page=1,this.loadall=!1,this.loadMore()}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"workBenchPeopleInfoOfCityView"},[a("header-base-ten",{attrs:{title:e.workBenchPeopleInfoTit,queryData:e.searchData},on:{searchPro:e.searchList}}),e._v(" "),a("div",{staticStyle:{height:"0.45rem"}}),e._v(" "),a("div",{staticClass:"workBenchPeopleInfoOfCityContent"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.busy&&!e.loadall,expression:"busy && !loadall"},{name:"loadmore",rawName:"v-loadmore",value:e.loadMore,expression:"loadMore"}],staticStyle:{width:"100%"},attrs:{stripe:"","element-loading-text":"加载中",data:e.tableData,height:e.tableHeight},on:{"row-click":e.rowClick}},[e._l(e.workBenchPeopleInfoOfCityObj,function(e){return[a("el-table-column",{key:e.id,attrs:{prop:e.prop,label:e.label,"min-width":e.width}})]})],2)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(u,h,!1,function(e){a("5g4J")},"data-v-5cb87e61",null);t.default=p.exports}});