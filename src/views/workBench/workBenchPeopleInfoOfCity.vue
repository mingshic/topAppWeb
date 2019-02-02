<!--工作台-人员信息-->
<template>
  <div class="workBenchPeopleInfoOfCityView">
    <header-base-ten :title="workBenchPeopleInfoTit" :queryData="searchData"  @searchPro="searchList"></header-base-ten>
    <div style="height: 0.45rem;"></div>
    <div class="workBenchPeopleInfoOfCityContent">
      <!-- <router-link :to="{name:'workBenchTaskDetailInfo',query:{}}"> -->
      <el-table
        stripe
        v-loading="busy && !loadall"
        element-loading-text="加载中"
        v-loadmore="loadMore"
        :data="tableData"
        :height = "tableHeight"
        @row-click="rowClick"
        style="width: 100%">
        <template v-for="item in workBenchPeopleInfoOfCityObj">
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
    <div style="height:0.45rem"></div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerBaseTen from '../header/headerBaseTen'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchPeopleInfo',

  components: {
    headerBaseTen,
    footerHome
  },

  data () {
    return {
      workBenchPeopleInfoTit: '人员信息',
      tableData: [],
      workBenchPeopleInfoOfCityObj: [
        {prop: 'REALNAME', label: '姓名', width: '25%'},
        {prop: 'EMP_POSITION_NM', label: '岗位名称', width: '25%'},
        {prop: 'RESOURCE_TYPE', label: '资源类型', width: '25%'},
        {prop: 'USER_QY', label: '所属项目部', width: '25%'}
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
    this.getPeopleInfoOfCityList()
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
    getPeopleInfoOfCityList(){
      var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,TYPE:"1",AREA_NAME:this.$route.query.areaName,TYPE:this.$route.query.type};
      console.log(params);
      if(this.isSearch){
        params.EMP_POSITION_NM = this.searchData.empPositionNm;
        params.RESOURCE_TYPE = this.searchData.resourceType;
        params.USER_QY = this.searchData.userQy;
      }
      //console.log(params);
      var flag = this.page>1;
      fetch.get("?action=/person/GetPersonList",params).then(res=>{
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
      this.$router.push({name: 'workBenchPeopleInfoDetail', query: {EMPID:row.EMPID}})
    },
    loadMore(){
      if(this.busy){return false}
      this.busy = true;
      setTimeout(() => {
        this.getPeopleInfoOfCityList();
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
  }
}
</script>

<style scoped>
  .workBenchPeopleInfoOfCityView{width: 100%;}
  .workBenchPeopleInfoOfCityContent{margin-top: 0.05rem; color: #666666;}
  .workBenchPeopleInfoOfCityContent >>> .el-table__body{width: 100%!important}
  .workBenchPeopleInfoOfCityContent >>> .el-table__header{width: 100%!important}
  .workBenchPeopleInfoOfCityContent >>> .el-table{font-size: 0.13rem; text-align: center}
  .workBenchPeopleInfoOfCityContent >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .workBenchPeopleInfoOfCityContent >>> .el-table td{border: none}
  .workBenchPeopleInfoOfCityContent >>> .el-table .cell{padding: 0;}
  .workBenchPeopleInfoOfCityContent >>> .el-table__empty-block{position: initial}
</style>