<!--PO信息-人员-->
<template>
  <div class="workBenchPOStaffView">
    <header-base :title="workBenchPOStaffTit" :searchType="searchType" :queryData="searchData"  @searchPro="searchList"></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="workBenchPOStaffContent">
      <!-- <router-link :to="{name:'workBenchTaskDetailInfo',query:{}}"> -->
        <el-table
          stripe
          v-loading="busy && !loadall"
          element-loading-text="正在加载下一页"
          v-loadmore="loadMore"
          :data="tableData"
          @row-click="rowClick"
          :height = "tableHeight"
          style="width: 100%">
          <template v-for="item in workBenchPOStaffObj">
              <el-table-column
                :key="item.id"
                :prop="item.prop"
                :label="item.label"
                :min-width="item.width">
              </el-table-column>
          </template>
        </el-table>
      <!-- </router-link> -->
    </div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import loadingtmp from '@/components/load/loading'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchPOStaff',

  components: {
    headerBase,
    loadingtmp,
    footerHome
  },

  data () {
    return {
      workBenchPOStaffTit: 'PO信息-人员',
      searchType: 'POStaffInfo',
      tableData: [],
      workBenchPOStaffObj: [
        {prop: 'SUPPLIER_NAME', label: '姓名', width: '25%'},
        {prop: 'POTYPENAME', label: '类型', width: '25%'},
        {prop: 'PAYPLAN_ACTUALDATE', label: '实际支付日期', width: '25%'},
        {prop: 'TOTALAMOUNT', label: '金额', width: '25%'}
      ],
      page:1,
      pageSize:30,
      busy:false,
      loadall: false,
      tableHeight:400,
      isSearch:false,
      searchData:{
      }
    }
  },
  created(){
    this.getPOStaffList()
  },
  mounted(){
    this.$nextTick(() => {
      let self = this;
      console.log("ssssssss",this.type);
      this.tableHeight = document.documentElement.clientHeight- 45;
      window.onresize = function() {
        self.tableHeight = document.documentElement.clientHeight- 45;
      }
    })
  },
  methods: {
    getPOStaffList(){
      var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,TYPE:"1",YM:this.$route.query.YM};
      console.log(params);
      if(this.isSearch){
        params.SUPPLIER_NAME = this.searchData.supplyName;
        params.START_TIME = this.searchData.startTime;
        params.END_TIME = this.searchData.endTime;
      }
      //console.log(params);
      var flag = this.page>1;
      fetch.get("?action=/po/GetPOList",params).then(res=>{
        console.log("222222",res);
        if(flag){
            this.tableData = this.tableData.concat(res.data);
        }else{
            this.tableData = res.data;
        }
        if(0 == res.data.length || res.data.length<this.pageSize ){
          this.busy = true;
          this.loadall = true;
          this.$message({
            message:'已加载全部数据',
            type: 'success',
            center: true,
            duration:1000,
            customClass:'msgdefine'
          });
        }
        else{
          this.busy = false;
          this.page++ 
        }
      });
    },
    rowClick (row) {
      console.log("row",row)
      this.$router.push({name: 'workBenchPOPayDetail', query: {type:"1",payPlanId:row.PAYPLAN_ID}})
    },
    loadMore(){
      console.log("this.busy:",this.busy)
      if(this.busy){return false}
      this.busy = true;
      setTimeout(() => {
        this.getPOStaffList();
      }, 1000);
    },
    searchList(formData){
      console.log("formData",formData)
      this.searchData = formData;
      this.tableData=[];
      this.busy = false;
      this.isSearch = true;
      this.page = 1;
      this.loadall= false;
      this.loadMore();
    }
  },
  
}
</script>

<style scoped>
  .workBenchPOStaffView{width: 100%;background:#f7f7f7}
  .workBenchPOStaffContent{width: 100%; position: absolute; top: 0.45rem;bottom: 0.45rem; color: #666666;overflow: scroll;}
  .workBenchPOStaffContent >>> .el-table__body{width: 100%!important}
  .workBenchPOStaffContent >>> .el-table__header{width: 100%!important}
  .workBenchPOStaffContent >>> .el-table{font-size: 0.13rem; text-align: center;}
  .workBenchPOStaffContent >>> .el-table tr:nth-child(2n){background: #f7f7f7}
  .workBenchPOStaffContent >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .workBenchPOStaffContent >>> .el-table td{border: none}
  .workBenchPOStaffContent >>> .el-table .cell{padding: 0;}
  .workBenchPOStaffContent >>> .el-table__empty-block{position: initial}
</style>