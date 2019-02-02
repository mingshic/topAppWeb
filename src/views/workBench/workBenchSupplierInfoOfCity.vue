<!--工作台-人员信息-->
<template>
  <div class="workBenchSupplierInfoOfCityView">
    <header-base-eleven :title="workBenchSupplierInfoTit" :queryData="searchData"  @searchPro="searchList"></header-base-eleven>
    <div style="height: 0.45rem;"></div>
    <div class="content">
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
        <template v-for="item in workBenchSupplierInfoOfCityObj">
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
    <!-- <div style="height:0.45rem"></div> -->
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerBaseEleven from '../header/headerBaseEleven'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchSupplierInfoOfCity',

  components: {
    headerBaseEleven,
    footerHome
  },

  data () {
    return {
      workBenchSupplierInfoTit: '供应商信息',
      tableData: [],
      workBenchSupplierInfoOfCityObj: [
        {prop: 'SUPPLIER_NAME', label: '名称', width: '25%'},
        {prop: 'KIND_NAME', label: '供应种类', width: '25%'},
        {prop: 'ATT_NAME', label: '供应属性', width: '25%'},
        {prop: 'C_ATT_NAME', label: '合作属性', width: '25%'}
      ],
      page:1,
      pageSize:30,
      busy:true,
      loadall: false,
      tableHeight:400,
      isSearch:false,
      searchData:{}
    }
  },
  created () {
    this.getSupplierInfoList()
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
    getSupplierInfoList(){
      var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,PROVINCE_NAME:this.$route.query.provinceName,KIND_NAME:this.$route.query.kindName};
      if(this.isSearch){
        params.KIND_NAME = this.searchData.kindName;
        params.ATT_NAME = this.searchData.attName;
        params.C_ATT_NAME = this.searchData.cattName;
      }
      console.log(params)
      var flag = this.page>1;
      fetch.get("?action=/supplier/GetSupplierList",params).then(res=>{
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
      this.$router.push({name: 'workBenchSupplierDetailInfo', query: {supplierId:row.SUPPLIER_ID}})
    },
    loadMore(){
      if(this.busy){return false}
      this.busy = true;
      setTimeout(() => {
        this.getSupplierInfoList();
      }, 1000);
    },
    searchList(formData){
      console.log("formData:",formData);
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
  .workBenchSupplierInfoOfCityView{width: 100%;}
  .content{width: 100%; position: absolute; top: 0.45rem;bottom: 0.45rem; color: #666666;overflow: scroll;}
  .content >>> .el-table__body{width: 100%!important}
  .content >>> .el-table__header{width: 100%!important}
  .content >>> .el-table{font-size: 0.13rem; text-align: center}
  .content >>> .el-table tr:nth-child(2n){background: #f7f7f7}
  .content >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .content >>> .el-table td{border: none}
  .content >>> .el-table .cell{padding: 0;}
  .content >>> .el-table__empty-block{position: initial}
</style>