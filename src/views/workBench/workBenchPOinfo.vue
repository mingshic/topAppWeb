<!--工作台-PO信息-->
<template>
  <div class="workBenchPOinfoView">
    <header-last :title="workBenchPOinfoTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="workBenchPOinfoContent">
      <el-tabs v-model="activeName" style="overflow:scroll">
        <template v-for="item in POinfoTab">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.id">
            <el-table
              stripe
              v-loading="busy && !loadall"
              element-loading-text="加载中"
              v-loadmore="loadMore"
              :data="item.tableData"
              @row-click="rowClick"
              :height = "tableHeight"
              style="width: 100%; border: 0.01rem solid #e1e1e1">
              <template v-for="info in POinfotable">
                <el-table-column
                  :key="info.id"
                  :prop="info.prop"
                  :label="info.label"
                  :min-width="info.width">
                  <template slot-scope="scope">
                    <span class="table_name">{{scope.row[info.prop]}}</span>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <div style="height:0.45rem"></div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchPOinfo',

  components: {
    headerLast,
    footerHome
  },

  data () {
    return {
      workBenchPOinfoTit: 'PO管理',
      POinfoTab: [
        {
          name: 'first',
          label: '人员',
          tableData: []
        },
        {
          name: 'second',
          label: '备件',
          tableData: []
        }
      ],
      activeName: 'first',
      POinfotable: [
        {
          prop: 'YM',
          label: '年月',
          fixed: true,
          width: '34%'
        },
        {
          prop: 'TOTALAMOUNT',
          label: '总金额',
          fixed: true,
          width: '33%'
        },
        {
          prop: 'FAMOUNT',
          label: '已支付金额',
          fixed: true,
          width: '33%'
        }
      ],
      page:1,
      pageSize:30,
      busy:false,
      loadall: false,
      tableHeight:400
    }
  },
  activated(){
    if(!this.$route.meta.isUseCache){
      this.busy= false;
      this.loadall= false;
      this.page =1;
      this.POinfoTab[0].tableData = [];
      this.POinfoTab[1].tableData = [];
      this.loadMore();
    }
    this.$route.meta.isUseCache = false;
  },
  created () {
    // this.getPOInfoList()
    // var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};
    // fetch.get("?action=GetPoPerson",params).then(res=>{
    //   this.POinfoTab[0].tableData = res.data;
    // });
    // fetch.get("?action=GetPoParts",params).then(res=>{
    //   this.POinfoTab[1].tableData = res.data;
    //   this.busy= false;
    //   this.loadall = true;
    // });
  },
  mounted(){
    this.$nextTick(() => {
      let self = this;
      this.tableHeight = document.documentElement.clientHeight- 45;
      window.onresize = function() {
        self.tableHeight = document.documentElement.clientHeight- 45;
      }
      console.log("ssssssss",self.tableHeight);
    })
  },
  methods: {
    getPOInfoList(){
      var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};
      console.log("params:",params);
      var flag = this.page>1;
      fetch.get("?action=GetPoPerson",params).then(res=>{
        if(flag){
          this.POinfoTab[0].tableData = this.POinfoTab[0].tableData.concat(res.data);
        }else{
          this.POinfoTab[0].tableData = res.data;
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
      fetch.get("?action=GetPoParts",params).then(res=>{
        if(flag){
          this.POinfoTab[1].tableData = this.POinfoTab[1].tableData.concat(res.data);
        }else{
          this.POinfoTab[1].tableData = res.data;
        }
      });
    },
    loadMore(){
      console.log("this.busy:",this.busy)
      if(this.busy){return false}
      this.busy = true;
      setTimeout(() => {
        this.getPOInfoList();
      }, 1000);
    },
    rowClick (row) {
      console.log("111111111111", row)
      if (row.__ob__.value.KIND == 0){
        this.$router.push({name: 'workBenchPOStaff', query:{YM:row.YM}})
      }
      if (row.__ob__.value.KIND == 1){
        this.$router.push({name: 'workBenchPOParts', query: {YM:row.YM}})
      }
    },
  }
}
</script>

<style scoped>
  .workBenchPOinfoView{width: 100%;}
  .workBenchPOinfoContent{width: 100%; position: absolute; top: 0.45rem;bottom: 0.45rem; text-align: center; color: #666666; background: #ffffff;overflow: scroll}
  /* overflow: scroll */
  .workBenchPOinfoContent >>> .el-table{}
  .workBenchPOinfoContent >>> .el-table th{text-align: center; color: #333333; background: #f7f7f7}
  .workBenchPOinfoContent >>> .el-table tr:nth-child(2n){background: #f7f7f7}
  .workBenchPOinfoContent >>> .el-table td:nth-child(2){text-align: right}
  .workBenchPOinfoContent >>> .el-table td:nth-child(3){text-align: right}
  .workBenchPOinfoContent >>> .el-tabs__header{margin: 0;}
  .workBenchPOinfoContent >>> .el-tabs__nav{width: 100%}
  .workBenchPOinfoContent >>> .el-tabs__nav .el-tabs__item{width: 50%}
  .workBenchPOinfoContent >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .workBenchPOinfoContent >>> .el-tabs__active-bar{background: #2698d6}
  .workBenchPOinfoContent >>> .el-table__empty-block{position: initial}
</style>
