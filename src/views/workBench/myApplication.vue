<!--工作台-单次事件-->
<template>
  <div class="workBenchApplicationEvent">
    <header-last :title="workBenchApplicationEventTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="ApplicationEventTabs" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-for="item in ApplicationEvent">
          <el-tab-pane :label="item.label+'('+item.num+')'" :name="item.name" :key="item.id">  
            <!-- <div> -->
              <div class="eventsContent" v-for="info in item.applicationListArr" :key="info.CASE_ID">
                <div class="eventsHeader">
                  <el-row>
                    <el-col :span="12"><span class="value">{{info.CREATED_ON}}</span></el-col>
                    <el-col :span="12" style="text-align:right"><span class="value">{{info.CASE_CD}}</span>
                      </el-col>
                  </el-row>
                </div>
                <div>
                  <el-row>
                    <el-col :span="6"><span class="tit">项目名称</span></el-col>
                    <el-col :span="16"><span class="value">{{info.PROJECT_NAME}}</span></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><span class="tit">事件类型</span></el-col>
                    <el-col :span="16"><span class="value">{{getCaseType(info.CASE_TYPE)}}</span></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><span class="tit">事件概述</span></el-col>
                    <el-col :span="15"><span class="value">{{info.REMARK}}</span></el-col>
                    <!-- <el-col :span="3" v-if="info.workerStatus==2" style="float:right"><input type="checkbox" :value="info" v-model="multipleSelection"/></el-col> -->
                  </el-row>
                  <el-row>
                    <el-col :span="6"><span class="tit">当前状态</span></el-col>
                    <el-col :span="18"><span class="value">{{getCaseStatus(info.CASE_STEP)}}</span></el-col>
                  </el-row>
                </div>
                  <div class="buttons">
                    <router-link :to="{name:'caseProgress',query:{CASE_ID:info.CASE_ID}}">       
                    <el-button>查看进展</el-button>            
                    </router-link>
                    <router-link :to="{name:'baseInfomation',query:{CASE_ID:info.CASE_ID}}">  
                    <el-button>查看详情</el-button>            
                    </router-link>
                  </div>  
              <!-- </div> -->
            </div>
            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
          </el-tab-pane>
          
          <!-- <router-view v-bind:parts="parts"></router-view> -->
        </template>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// import eventBaseInfo from '../../components/event/eventBaseInfo'
// import eventProgress from '../../components/event/eventProgress'
// import part_recycle from './part_recycle'
// import eventParts from "../../components/event/eventParts";
import HeaderLast from "../header/headerLast";
import loadingtmp from '@/components/load/loading';
import fetch from "../../utils/ajax";
import axios from 'axios';

export default {

  components: {
    HeaderLast,
    loadingtmp
  },

  data() {
    return {
      workBenchApplicationEventTit: "我的单次事件",
      activeName: "first",
      status:"",
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      multipleSelection:[],
      applicationList:{},
      ApplicationEvent: [
        {
          id:1,
          name: 'first',
          label: '进行中',
          applicationListArr: [],
          num:0
        },
        {
          id:2,
          name: 'second',
          label: '已结束',
          applicationListArr: [],
          num:0
        },
      ],
      objpages:{"first":{page:1,loadall:false,idx:0},"second":{page:1,loadall:false,idx:1}},
    };
  },


activated(){
        console.log(this.$route.meta.isUseCache);
        if(!this.$route.meta.isUseCache){
          this.objpages["first"]["page"] = 1;
        this.ApplicationEvent[0].applicationListArr = [];
        this.objpages["first"]["loadall"]=false
        this.ApplicationEvent[1].applicationListArr = [];
        this.objpages["second"]["loadall"]=false
        this.busy= false;
        this.loadall= false;
        this.page =1;    
        this.loadMore();
        }
        this.$route.meta.isUseCache = false;
    },
  methods: {
    tabClick (e) {
      console.log("tabclick");
      var objnowpage = this.objpages[this.activeName];
      this.loadall= objnowpage.loadall;
      console.log(objnowpage.loadall);
      if(objnowpage.page==1 && !objnowpage.loadall){
        // console.log(objnowpage.loadall);
        this.loadMore();
      }
    },
    returnList (flag, res, obj) {
      if(flag){
        obj = obj.concat(res.data);
      }else{
        obj = res.data;
      }
      if(0 == res.data.length||res.data.length<this.pageSize){
        this.busy = false;
        this.loadall = true;
        this.objpages[this.activeName]["loadall"] =true;
      }
      else{
        this.busy = false;
        this.objpages[this.activeName]["page"]++
      }
      return obj
    },
    getEventList(){
      var flag = this.objpages[this.activeName]["page"]>1;
      let objnowpage = this.objpages[this.activeName];     
      let params ='&STATUS='+objnowpage.idx+"&PAGE_NUM="+objnowpage.page+"&PAGE_TOTAL="+this.pageSize;
      console.log(params);
      fetch.get("?action=/once/queryMyCaseListO2O",params).then(res => {
        console.log(res);
        if('0'== res.STATUSCODE){
          let obj = this.ApplicationEvent[objnowpage.idx].applicationListArr;
          this.ApplicationEvent[objnowpage.idx].applicationListArr = this.returnList(flag, res, obj)
          this.total= res.total;   
        }
        else{

        }
      });
      fetch.get("?action=/once/QueryMyCaseCount").then(res => {
        console.log(res);
        this.ApplicationEvent[0].num=res.continued;
        this.ApplicationEvent[1].num=res.finished;
        // console.log("-------------------");
      });
      
    },

    loadMore:function(){
      if(this.busy || this.objpages[this.activeName]["loadall"])return false;
      this.busy = true;
      console.log("loadMore");
      setTimeout(() => {
        this.getEventList();
      }, 500);
    },

    getCaseType(typeId) {
			var caseType = [ {
				"dictID" : "1",
				"dictName" : "故障"
			}, {
				"dictID" : "2",
				"dictName" : "RMA"
			}, {
				"dictID" : "3",
				"dictName" : "巡检"
			}, {
				"dictID" : "4",
				"dictName" : "技术咨询"
			}, {
				"dictID" : "5",
				"dictName" : "非故障技术支持"
			} ];
      var caseTypeName = "";
      caseType.forEach(function(v,i,ar){
        if (v.dictID == typeId) {
					caseTypeName = v.dictName;
				}
      })
			return caseTypeName;
		},
    getCaseStatus(typeId){
      var caseType = [ {
				"dictID" : "1",
				"dictName" : "待受理"
			}, {
				"dictID" : "4",
				"dictName" : "在保已确认"
			}, {
				"dictID" : "5",
				"dictName" : "不在保已确认"
			}, {
				"dictID" : "6",
				"dictName" : "不在保核对中"
			}, {
				"dictID" : "7",
				"dictName" : "单次报价中"
			}, {
				"dictID" : "8",
				"dictName" : "不做单次"
			}, {
				"dictID" : "9",
				"dictName" : "单次待确认"
			}, {
				"dictID" : "11",
				"dictName" : "待分配管理责任人"
			}, {
				"dictID" : "48",
				"dictName" : "待管理责任人承接"
			}, {
				"dictID" : "12",
				"dictName" : "待管理人处理"
			}, {
				"dictID" : "13",
				"dictName" : "待二\/三线承接"
			}, {
				"dictID" : "14",
				"dictName" : "待二\/三线处理"
			}, {
				"dictID" : "2",
				"dictName" : "待关闭"
			}, {
				"dictID" : "3",
				"dictName" : "已关闭"
			}, {
				"dictID" : "15",
				"dictName" : "进行中"
			}, {
				"dictID" : "16",
				"dictName" : "待评价"
			}, {
				"dictID" : "17",
				"dictName" : "已完成"
			}, {
				"dictID" : "18",
				"dictName" : "待回收"
			}, {
				"dictID" : "19",
				"dictName" : "待物流取件"
			}, {
				"dictID" : "20",
				"dictName" : "待分检"
			}, {
				"dictID" : "21",
				"dictName" : "已分检"
			}, {
				"dictID" : "22",
				"dictName" : "维修中止"
			}, {
				"dictID" : "23",
				"dictName" : "待维修"
			}, {
				"dictID" : "24",
				"dictName" : "维修中"
			}, {
				"dictID" : "25",
				"dictName" : "返还中"
			}, {
				"dictID" : "26",
				"dictName" : "待项目经理处理"
			}, {
				"dictID" : "27",
				"dictName" : "待销售处理"
			}, {
				"dictID" : "28",
				"dictName" : "待技术责任人处理"
			}, {
				"dictID" : "29",
				"dictName" : "待客户提供信息"
			}, {
				"dictID" : "30",
				"dictName" : "待客户确定操作时间"
			}, {
				"dictID" : "31",
				"dictName" : "待库管专员处理"
			}, {
				"dictID" : "32",
				"dictName" : "待应急采购专员处理"
			}, {
				"dictID" : "33",
				"dictName" : "待总控中心总经理处理"
			}, {
				"dictID" : "34",
				"dictName" : "待客户审核方案"
			}, {
				"dictID" : "35",
				"dictName" : "待一线处理"
			}, {
				"dictID" : "36",
				"dictName" : "待人员报价岗处理"
			}, {
				"dictID" : "39",
				"dictName" : "观察中"
			}, {
				"dictID" : "37",
				"dictName" : "待分摊确认人处理"
			}, {
				"dictID" : "38",
				"dictName" : "待备件报价岗处理"
			}, {
				"dictID" : "40",
				"dictName" : "待提交"
			}, {
				"dictID" : "41",
				"dictName" : "待报价"
			}, {
				"dictID" : "42",
				"dictName" : "待销售确认"
			}, {
				"dictID" : "43",
				"dictName" : "待分摊"
			}, {
				"dictID" : "44",
				"dictName" : "已拒绝"
      } ];
      var caseTypeName = "";
			caseType.forEach(function(v,i,ar){
        if (v.dictID == typeId) {
					caseTypeName = v.dictName;
				}
      })
			return caseTypeName;
    }
  },
  created: function(){
    // fetch.get("?action=/once/queryMyCaseListO2O&STATUS=0").then(res => {
    //   let baseinfo=res.data
    //   for(var i in baseinfo){
    //     this.ApplicationEvent[0].applicationListArr=baseinfo;
    //   }
    //   });
    //   fetch.get("?action=/once/queryMyCaseListO2O&STATUS=1").then(res => {
    //   console.log(res);
    //   let baseinfo=res.data
    //   for(var i in baseinfo){
    //     this.ApplicationEvent[1].applicationListArr=baseinfo;
    //   }
    //   });
  },
};
</script>

<style scoped>
.workBenchApplicationEvent {
  /* background: #ffffff */
}
.ApplicationEventTabs{width: 100%; position: absolute; top: 0.45rem; bottom: 0;overflow: scroll}
.ApplicationEventTabs >>> .el-tabs__header {
  margin: 0 0 0.1rem;
}
.ApplicationEventTabs >>> .el-tabs__item.is-active {
  color: #2698d6;
}
.ApplicationEventTabs >>> .el-tabs__active-bar {
  background: #2698d6;
}
.ApplicationEventTabs >>> .el-tabs__nav {
  width: 100%;
  text-align: center;
}
.ApplicationEventTabs >>> .el-tabs__item {
  width: 50%;
  font-size: 0.14rem;
  color: #666666;
}
  .eventsContent{padding: 0 0.1rem;margin-bottom: 0.08rem;background: #ffffff;}
  .eventsHeader{border-bottom: 0.01rem solid #dbdbdb}
  /* .eventsContent .partsDetail{background: #ffffff; margin-bottom: 0.05rem;} */
  /* .eventsContent .partsDetail p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;} */
  .eventsContent .el-col .tit{line-height: 0.25rem; color: #999999;}
  .eventsContent .el-col .value{line-height: 0.25rem; color: #333333;}
 /* .eventsContent .partsDetail input{background: #ffffff;border: #333333;} */
 .buttons{width: 100%;margin-top: 0.2rem ;text-align: center;height:0.35rem;}
 .buttons .el-button {
   float: right;
   margin-right:0.07rem;
  padding: 0.08rem 0.08rem;
  color: #ffffff;
  background: #2698d6; }
</style>
