<!--工作台-所有事件-->
<template>
  <div class="workBenchMyEventView">
    <header-base   :title="workBenchMyEventTit"  :queryData="searchData" @searchPro="getSearParams"></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-for="(item) in opinionTab">
          <el-tab-pane :label="item.label+'('+totalData[item.numname]+')'" :name="item.name" :key="item.id">
            <div style="overflow:auto">
            <div class="eventCell" v-for="info in item.eventListArr" :key="info.id">
              <router-link :to="{name:'eventShow',query:{caseId:info.CASE_ID}}">
              <div class="cellTop">
                <el-row>
                  <el-col :span="1">
                    <span class="spheathcolor" :class="'spheathcolor'+info.CASE_HEALTH" ></span>
                  </el-col>
                  <el-col :span="10">
                    <div class="cellTopNum">
                      {{info.CASE_NO}}
                      <span class="speventlevel" :class="'speventlevelcolor'" >{{info.CASE_LEVEL}}</span>
                    </div>
                  </el-col>
                  
                  <el-col :span="13">
                    <div class="cellTopTime"><span>{{info.CREATE_DATE}}</span></div>
                  </el-col>
                </el-row>
              </div>
              <div class="cellContent">
                <el-row>
                  <el-col :span="12"><span class="tit">状态：</span><span>{{info.DEAL_STATUS_NAME}}</span></el-col>
                  <el-col :span="12"><span class="tit">类型：</span><span>{{info.CASE_TYPE}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><span class="tit">厂商：</span><span>{{info.FACTORY}}</span></el-col>
                  <el-col :span="12"><span class="tit">型号：</span><span>{{info.DEVICE}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><span class="tit">序列号：</span><span>{{info.SN}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><span class="tit">说明：</span><span>{{info.PROBLEM_DETAIL}}</span></el-col>
                </el-row>
              </div>
              </router-link>
            </div>
            </div>
            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
import loadingtmp from '@/components/load/loading'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchMyEventAll',

  components: {
    headerBase,
    loadingtmp,
    footerHome
  },

  data () {
    return {
      workBenchMyEventTit: '所有事件',
      opinionTab: [
        {
          name: 'first',
          label: '执行中',
          eventListArr: [],
          numname:"unCloseNum"
        },
        {
          name: 'second',
          label: '已关闭',
          eventListArr: [],
          numname:"closeNum"
        },
        {
          name: 'third',
          label: '全部',
          eventListArr: [],
          numname:"allNum"
        }
      ],
      activeName: this.$route.query.isSearch?"third":'first',
      searchpage:1,
      isSearch:this.$route.query.isSearch,
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      tab_box: 1,
      searchData:{
        industry:[],
        INDUSTRY_NAME: this.$route.query.industryName,
      },
      objpages:{"first":{page:1,loadall:false, IF_CLOSE:'N',idx:0,isSearch:0},"second":{page:1,loadall:false,IF_CLOSE:'Y',idx:1,isSearch:0},
      "third":{page:1,loadall:false,IF_CLOSE:'',idx:2,isSearch:0}},
      totalData:{"unCloseNum":0,"closeNum":0,"allNum":0}
    }
  },
  created () {
  },
  activated(){
    this.searchData={
      customer:'',
      eventNum:'',
      industry: this.$route.query.industry? this.$route.query.industry.split(','):[],
      keyWord:'',
      PM:'',
      proName:'',
      sale:'',
      startTime:this.$route.query.startDate,
      endTime:this.$route.query.endDate,
      type:this.$route.query.type? this.$route.query.type.split(','):["1","2"],
    }
    this.isSearch = this.$route.query.isSearch;
    if(!this.$route.meta.isUseCache){
      this.busy= false;
      this.loadall= false;
      this.page =1;
      this.objpages["first"]["page"] = 1;
      this.objpages["first"]["loadall"]=false
      this.opinionTab[0].eventListArr = [];
      this.objpages["second"]["page"] = 1;
      this.objpages["second"]["loadall"]=false
      this.opinionTab[1].eventListArr = [];
      this.objpages["third"]["page"] = 1;
      this.objpages["third"]["loadall"]= false;
      this.opinionTab[2].eventListArr = [];
      this.loadMore();
    }
    this.$route.meta.isUseCache = false;
  },
  methods: {
    tabClick (e) {
      var objnowpage = this.objpages[this.activeName];
      this.loadall= objnowpage.loadall;
      if(this.isSearch != objnowpage.isSearch ){
        objnowpage.page= 1
        objnowpage.loadall = false
        objnowpage.eventListArr= []
        objnowpage.isSearch = this.isSearch;
        this.loadMore();
        return ;
      }
      if(objnowpage.page==1 && !objnowpage.loadall){
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
      let strurl = "?action=GetCaseList&TYPE=all";
      let params = {CASE_TYPEID:"1,2",PAGE_NUM: objnowpage.page, PAGE_TOTAL: this.pageSize, IF_CLOSE: objnowpage.IF_CLOSE}
      if(this.isSearch){
        params.CUST_ID = this.$route.query.custid;
        params.TECH_NAME = this.$route.query.techName;
        params.CASE_LEVEL = this.$route.query.caseLevel;
        params.FACTORY_NAME = this.$route.query.factoryName;
        params.CUST_NAME = this.$route.query.CUST_NAME;

        params.INDUSTRY_NAME = this.searchData.industry.join(",");//行业
        params.TYPE = this.searchData["type"].join(",");//事件类型
        params.CUSTOMER_NAME = this.searchData.customer;//客户
        params.PROJECT_NAME = this.searchData.proName;//项目名称
        params.SALE_NAME = this.searchData.sale;
        params.PM_NAME = this.searchData.PM;
        params.CASE_NO = this.searchData.eventNum;//事件编号
        params.KEYWORD = this.searchData.keyWord;//关键词
        params.START_TIME = this.searchData.startTime;//事件创建时间的开始时间
        params.END_TIME = this.searchData.endTime;//时间创建时间的结束时间
        params.IF_ONCE = this.searchData.IF_ONCE;
      }

      fetch.get(strurl,params).then(res => {
        console.log("workBunchMyEventAll",res)
        if('0'== res.STATUSCODE){         
          let obj = this.opinionTab[objnowpage.idx].eventListArr;
          this.opinionTab[objnowpage.idx].eventListArr = this.returnList(flag, res, obj)
          this.totalData= res.totalData;    
        }
        else{}
      });          
    },

    loadMore(){
      if(this.busy || this.objpages[this.activeName]["loadall"])return false;
      this.busy = true;
      
      console.log("loadMore");
      setTimeout(() => {
        this.getEventList();
      }, 500);
    },

    getSearParams (searchData) {
      this.activeName="third";
      this.objpages["third"]["page"] = 1;
      this.objpages["third"]["loadall"]= false;
      this.opinionTab[2].eventListArr = [];
      this.loadall = false;
      this.objpages["third"]["isSearch"] = 1;
      this.isSearch=1;
      this.searchData = searchData;
      this.loadMore();

      this.objpages["first"]["isSearch"]=0
      this.objpages["first"]["loadall"]=false
      this.opinionTab[0].eventListArr = [];

      this.objpages["second"]["isSearch"]=0
      this.objpages["second"]["loadall"]=false
      this.opinionTab[1].eventListArr = [];
    },
  },
  //在页面离开时记录滚动位置
  beforeRouteLeave (to, from, next) {
    if (to.name == 'eventShow') {
      this.scrollTop = document.querySelector('.content').scrollTop;
    }   
    next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter (to, from, next) {
    console.log("next:",next);
    next(vm => {
      console.log("vmvmvm",vm.scrollTop);
      document.querySelector('.content').scrollTop = vm.scrollTop
    })
  },
}
</script>

<style scoped>
  .workBenchMyEventView{width: 100%;}
  .content{width: 100%; position: absolute; top: 0.45rem; bottom: 0.45rem;overflow: scroll;}
  .content >>> .el-tabs{ }
  .content >>> .el-tabs__header{margin-bottom: 0.45rem; background: #ffffff}
  .content >>> .el-tabs__nav{width: 100%;position: fixed;background:#ffffff; top: 0.45rem;}
  .content >>> .el-tabs__active-bar{background: #2698d6}
  .content >>> .el-tabs__nav .el-tabs__item{width: 33.33333333%; text-align: center; padding: 0; color: #999999}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .eventCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .eventCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .eventCell .cellTop .cellTopNum{font-size: 0.13rem; color: #2698d6;}
  /* .eventCell .cellTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.08rem; color: #ffffff; text-align: center; line-height: 0.2rem;} */
  .eventCell .cellTop .cellTopNum span{display: inline-block;font-size: 0.13rem;  height: 0.19rem; vertical-align: text-top; margin-left: 0.05rem;  text-align: center; line-height: 0.2rem; color: #666;}
  .eventCell .cellTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0; text-align: right}
  .eventCell .cellTop .cellTopTime{text-align: right; color: #999999;font-size: 0.13rem;}
  .eventCell .cellContent .el-col{line-height: 0.25rem; color: #333333;}
  .eventCell .cellContent .el-col .tit{line-height: 0.25rem; color: #999999;}
  .eventCell .cellContent .el-col span{font-size: 0.13rem}
  .speventlevel{}
  .speventlevelcolor1{ background:#ff0000; }
  .speventlevelcolor2{ background:#ff0000; }
  .speventlevelcolor3{ background:#ff9900; }
  .speventlevelcolor4{ background:#ffff00; }
  .speventlevelcolor5{ background:#1ca2a5; }

  .eventCell .cellTop .spheathcolor{display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;}
  .spheathcolor1{background: #009900;}
  .spheathcolor2{background: #ffff00;}
  .spheathcolor3{background: #ff9900;}
  .spheathcolor4{background: #ff0000;}
</style>
