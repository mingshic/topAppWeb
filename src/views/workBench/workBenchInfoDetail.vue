<!--工作台-在保项目信息明细-->
<template>
  <div class="workBenchInfoDetailView">
    <!-- <header-base-three :title="workBenchInfoDetailTit" :queryData="searchData" @searchPro="getSearParams"></header-base-three> -->
    <header-last :title="workBenchInfoDetailTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="programCell" v-for="item in programListArr" :key="item.id">
        <router-link :to="{name:'programShow',query:{projectId:item.PROJECT_ID,type:'manager_module'}}" >
          <div class="cellTop">
            <el-row>
              <el-col :span="11">
                <div class="cellTopNum">{{item.PROJECT_CODE}}</div>
              </el-col>
              <el-col :span="13">
                <div class="cellTopState">合同规模：<span>{{item.CONTRACT_AMOUNT}}</span></div>
              </el-col>
            </el-row>
          </div>
        </router-link>
        <div class="cellContent">
          <router-link :to="{name:'programShow',query:{projectId:item.PROJECT_ID,type:'manager_module'}}">
          <p>{{item.PROJECT_NAME}}</p>
          </router-link>
          <el-row>
            <el-col :span="12"><span class="tit">销售姓名：<el-button type="text" @click.native="roleProjectList(1,item)" style="margin: 0;padding: 0;">{{item.SALE_NAME}}</el-button></span></el-col>
            <el-col :span="12"><span class="tit">PM姓名：<el-button type="text" @click.native="roleProjectList(2,item)" style="margin: 0;padding: 0;">{{item.MANAGER_NAME}}</el-button></span></el-col>
          </el-row>
          <router-link :to="{name:'programShow',query:{projectId:item.PROJECT_ID,type:'manager_module'}}">
          <el-row>
            <el-col :span="12"><span class="tit">服务开始：{{item.PROJECT_START_DATE}}</span></el-col>
            <el-col :span="12"><span class="tit">服务结束：{{item.PROJECT_END_DATE}}</span></el-col>
          </el-row>
          </router-link>
        </div>
      </div>
    </div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchInfoDetail',

  components: {
    headerLast,
    footerHome
  },

  data () {
    return {
      workBenchInfoDetailTit: '客户-项目列表',
      programListArr: [],
      searchData:{
        BUSINESS_TYPE: this.$route.query.business,
        INDUSTRY_NAME: this.$route.query.industry,
        CUST_NAME: this.$route.query.cust_name
      },
      isSearch:  this.$route.query.isSearch
    }
  },
  beforeCreate(){
    
  },
  activated () {
    console.log(this.$route.query.business)
    this.loadList();
  },

  methods: {
    loadList(){
      let url = "?action=GetProjectStatList";
      let tpmpara ={}
      if(this.isSearch){tpmpara = this.searchData};
      fetch.get(url,tpmpara).then(res => {
        console.log("sssssssssssssss", res.data);
        this.programListArr = res.data
      })
    },
    roleProjectList(type, col){
      if (type == 1) {
        console.log(type, col)
        this.$router.push({name: 'workBenchInfoSaleManagement', query: {ROLE_NAME:col.SALE_NAME,SEARCH_EMP_ID:col.SALE_ID,TYPE:type}})
      }
      else if (type == 2) {
        console.log(type, col)
        this.$router.push({name: 'workBenchInfoSaleManagement', query: {ROLE_NAME:col.MANAGER_NAME,SEARCH_EMP_ID:col.MANAGER_ID,TYPE:type}})
      }
    }
  },
  //在页面离开时记录滚动位置
  beforeRouteLeave (to, from, next) {
    if (to.name == 'workBenchInfoSaleManagement') {
      this.scrollTop = document.querySelector('.content').scrollTop;
      console.log("scrollTop:",this.scrollTop)
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
  }
}
</script>

<style scoped>
  .workBenchInfoDetailView{width: 100%;}
  .content{width: 100%; position: absolute; top: 0.45rem; bottom: 0.45rem;overflow: scroll;}
  .programCell{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .programCell .cellTop .cellTopState{text-align: right; color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.14rem;}
  .programCell .cellContent .tit{font-size: 0.13rem}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
</style>
