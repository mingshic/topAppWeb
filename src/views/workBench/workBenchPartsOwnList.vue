<!--工作台-备件管理-自有-->
<template>
  <div class="workBenchPartsOwnListView">
    <header-base-parts-own :title="workBenchPartsOwnListTit" :queryData="searchData"  @searchPro="searchList"></header-base-parts-own>
    <div style="height: 0.45rem;"></div>
    <div class="workBenchPartsOwnListContent">
      <el-table
        stripe
        v-loading="busy && !loadall"
        element-loading-text="加载中"
        v-loadmore="loadMore"
        :data="tableData"
        :height = "tableHeight"
        @row-click="rowClick"
        style="width: 100%">
        <template v-for="item in workBenchPartsOwnListObj">
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
import headerBasePartsOwn from '../header/headerBasePartsOwn'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchPartsOwnListView',

  components: {
    headerBasePartsOwn,
    footerHome
  },

  data () {
    return {
      workBenchPartsOwnListTit: '备件信息-自有',
      tableData: [],
      workBenchPartsOwnListObj: [
        {prop: 'INSTOCK_MAIN_CODE', label: '入库单号', width: '20%'},
        {prop: 'FACTORY_NM', label: '厂商', width: '20%'},
        {prop: 'MODEL_NAME', label: '设备型号', width: '20%'},
        {prop: 'PARTS_TYPE_NAME', label: '备件类型', width: '20%'},
        {prop: 'PART_AMOUNT', label: '金额', width: '20%'}
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
    this.getPartsOwnList()
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
    getPartsOwnList(){
      var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,TYPE:"1",PARENT_AREA_NAME:this.$route.query.provinceName};
      console.log(params);
      if(this.isSearch){
        params.FACTORY_NAME = this.searchData.factoryName;
        params.MODEL_NAME = this.searchData.modelName;
        params.PARTS_TYPE_NAME = this.searchData.partsTypeName.join(",");
      }
      console.log(params);
      var flag = this.page>1;
      fetch.get("?action=/parts/GetSelfPartsList",params).then(res=>{
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
      this.$router.push({name: 'workBenchOwnPartsDetail', query: {singlePartId:row.SINGLEPART_ID}})
    },
    loadMore(){
      if(this.busy){return false}
      this.busy = true;
      setTimeout(() => {
        this.getPartsOwnList();
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
  .workBenchPartsOwnListView{width: 100%;}
  .workBenchPartsOwnListContent{margin-top: 0.05rem; color: #666666;}
  .workBenchPartsOwnListContent >>> .el-table__body{width: 100%!important}
  .workBenchPartsOwnListContent >>> .el-table__header{width: 100%!important}
  .workBenchPartsOwnListContent >>> .el-table{font-size: 0.13rem; text-align: center}
  .workBenchPartsOwnListContent >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .workBenchPartsOwnListContent >>> .el-table td{border: none}
  .workBenchPartsOwnListContent >>> .el-table .cell{padding: 0;}
  .workBenchPartsOwnListContent >>> .el-table__empty-block{position: initial}
</style>