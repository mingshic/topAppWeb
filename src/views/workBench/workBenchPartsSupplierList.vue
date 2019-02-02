<!--工作台-备件管理-供应商-->
<template>
  <div class="workBenchPartsSupplierListView">
    <header-base-parts-own :title="workBenchPartsSupplierListTit" :queryData="searchData"  @searchPro="searchList"></header-base-parts-own>
    <div style="height: 0.45rem;"></div>
    <div class="workBenchPartsSupplierListContent">
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
        <template v-for="item in workBenchPartsSupplierListObj">
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
  </div>
</template>

<script>
import headerBasePartsOwn from '../header/headerBasePartsOwn'
import fetch from '../../utils/ajax'
export default {
  name: 'workBenchPartsSupplierListView',

  components: {
    headerBasePartsOwn
  },

  data () {
    return {
      workBenchPartsSupplierListTit: '备件信息-供应商',
      tableData: [],
      workBenchPartsSupplierListObj: [
        {prop: 'SUPPLIER_NAME', label: '供应商', width: '20%'},
        {prop: 'FACTORY_NM', label: '厂商', width: '20%'},
        {prop: 'MODEL_NAME', label: '设备型号', width: '20%'},
        {prop: 'PARTS_TYPE_NAME', label: '设备类型', width: '20%'},
        {prop: 'PART_AMOUNT', label: '金额', width: '20%'}
      ],
      page:1,
      pageSize:30,
      busy:true,
      loadall: false,
      tableHeight:400,
      isSearch:false,
      searchData:{
      }
    }
  },
  created(){
    this.getPartsSupplierList()
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
    getPartsSupplierList(){
      var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,TYPE:"1",PARENT_AREA_NAME:this.$route.query.provinceName};
      console.log(params);
      if(this.isSearch){
        params.FACTORY_NAME = this.searchData.factoryName;
        params.MODEL_NAME = this.searchData.modelName;
        params.PARTS_TYPE_NAME = this.searchData.partsTypeName.join(",");
      }
      //console.log(params);
      var flag = this.page>1;
      fetch.get("?action=/parts/GetSupplierPartsList",params).then(res=>{
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
      this.$router.push({name: 'workBenchSupplierPartsDetail', query: {singlePartId:row.SINGLEPART_ID}})
    },
    loadMore(){
      if(this.busy){return false}
      this.busy = true;
      setTimeout(() => {
        this.getPartsSupplierList();
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
  .workBenchPartsSupplierListView{width: 100%;}
  .workBenchPartsSupplierListContent{margin-top: 0.05rem; color: #666666;}
  .workBenchPartsSupplierListContent >>> .el-table__body{width: 100%!important}
  .workBenchPartsSupplierListContent >>> .el-table__header{width: 100%!important}
  .workBenchPartsSupplierListContent >>> .el-table{font-size: 0.13rem; text-align: center}
  .workBenchPartsSupplierListContent >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .workBenchPartsSupplierListContent >>> .el-table td{border: none}
  .workBenchPartsSupplierListContent >>> .el-table .cell{padding: 0;}
  .workBenchPartsSupplierListContent >>> .el-table__empty-block{position: initial}
</style>