webpackJsonp([29],{"0dI6":function(t,e){},"6MHa":function(t,e){},yCwA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Z1y9"),r={name:"quality",data:function(){return{form:{time:"",industry:""},optionTime:[],batch:"",optionType:[{value:"选项1",label:"部门指标排名"}],echartsTit:"部门指标排名",tableData:[],qualityTableObj:[{fixed:!0,prop:"ranking",label:"排名序列",width:"30%"},{fixed:!0,prop:"department",label:"部门",width:"40%"},{fixed:!0,prop:"score",label:"综合分值",width:"30%"}],data1:[],data1X:[]}},mounted:function(){var t=this;i.a.get("?action=GetQualityReleaseBatch",{}).then(function(e){t.optionTime=e.data,t.form.time=e.data[0].BATCH_ID,t.freshcharts()})},methods:{freshcharts:function(){var t=this,e={TARGET_ID:1,BATCH_ID:this.form.time};i.a.get("?action=GetQualityReleaseData",e).then(function(e){console.log(e);for(var a=e.dataSummary,i=[],r=[],n=[],l=0;l<a.length;l++){var o=a.length-l-1;r[l]=a[o].DEPT_NAME,i[l]=a[o].SCORE,n[l]={},n[l].ranking=a[l].ROWNUM,n[l].department=a[l].DEPT_NAME,n[l].score=a[l].SCORE}t.tableData=n,t.data1=i,t.data1X=r,t.drawLine()})},drawLine:function(){var t=document.getElementById("myChart");this.myChart=echarts.init(t),this.myChart.setOption({grid:{top:"5%",left:"0",right:"6%",bottom:"2%",containLabel:!0},xAxis:{type:"value",boundaryGap:[0,.01]},yAxis:{type:"category",barWidth:"30%",data:this.data1X},series:[{name:"2011年",type:"bar",data:this.data1,itemStyle:{normal:{label:{show:!0,formatter:"{c}"},labelLine:{show:!0}}}}]})},rowClick:function(t){this.$router.push({name:"qualityDetailDept",query:{dept:t.department,batchId:this.form.time,score:t.score}})}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"qualityView"},[a("div",{staticClass:"qualityTop"},[a("span",[t._v("筛选条件")]),t._v(" "),a("el-form",{ref:"form",attrs:{model:t.form}},[a("el-form-item",[a("el-select",{attrs:{placeholder:"时间段"},on:{change:t.freshcharts},model:{value:t.form.time,callback:function(e){t.$set(t.form,"time",e)},expression:"form.time"}},t._l(t.optionTime,function(t){return a("el-option",{key:t.BATCH_ID,attrs:{label:t.BATCH_NAME,value:t.BATCH_ID}})}))],1)],1)],1),t._v(" "),a("div",{staticClass:"qualityEcharts"},[a("div",{staticClass:"qualityTit"},[t._v(t._s(t.echartsTit))]),t._v(" "),a("div",{style:{width:"100%",height:"2rem"},attrs:{id:"myChart"}})]),t._v(" "),a("div",{staticClass:"qualityTable"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""},on:{"row-click":t.rowClick}},[t._l(t.qualityTableObj,function(t){return[a("el-table-column",{key:t.id,attrs:{fixed:t.fixed,prop:t.prop,label:t.label,"min-width":t.width}})]})],2)],1)])},staticRenderFns:[]};var l=a("VU/8")(r,n,!1,function(t){a("0dI6")},"data-v-e8505866",null).exports,o={name:"reportForm",components:{headerLast:a("eMYz").a,quality:l},data:function(){return{workBenchQualityControlViewTit:"质量",activeName:"first"}},mounted:function(){},methods:{}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"workBenchQualityControlView"},[a("header-last",{attrs:{title:t.workBenchQualityControlViewTit}}),t._v(" "),a("div",{staticClass:"reportFormView"},[a("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"质量",name:"first"}},[a("quality")],1)],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(o,s,!1,function(t){a("6MHa")},"data-v-9af246e0",null);e.default=c.exports}});