<!--工作台-在保项目信息-->
<template>
  <div class="workBenchInfoSaleManagementView">
    <header-base-sale-manage :title="workBenchInfoSaleManagementTit" v-on:dateToFilterData="getworkBenchInfoSaleManagementList($event)"></header-base-sale-manage>
    <div style="height: 0.45rem;"></div>
    <div class="workBenchInfoSaleManagementContent">
      <el-table
        stripe
        :data="workBenchInfoSaleManagementListObj"
        element-loading-text="正在加载下一页"
        @row-click="rowClick"
        :height = "tableHeight"
        style="width: 100%">
        <!-- <el-table-column type="index" width="50"></el-table-column> -->
        <template v-for="item in SaleManagementTable">
          <el-table-column
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width">
            <!-- <template slot-scope="scope">
              <span class="table_name">{{scope.row[item.prop]}}</span>
            </template> -->
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import headerBaseSaleManage from '../header/headerBaseSaleManage'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import loadingtmp from '@/components/load/loading'
export default {
  name: 'workBenchInfoSaleManagement',

  components: {
    headerBaseSaleManage,
    loadingtmp
  },

  data () {
    return {
      workBenchInfoSaleManagementTit: this.$route.query.ROLE_NAME,
      workBenchInfoSaleManagementListObj: [],
      tableHeight:400,
      TYPE: this.$route.query.TYPE,
      SEARCH_EMP_ID: this.$route.query.SEARCH_EMP_ID,
      year: "",
       
      SaleManagementTable: [
        {
          prop: 'CUST_NAME',
          label: '客户名称',
          // fixed: true,
          width: '20%'
        },
        {
          prop: 'PROJECT_NAME',
          label: '项目名称',
          // fixed: true,
          width: '20%'
        },
        {
          prop: 'PROJECT_STATUS',
          label: '项目状态',
          // fixed: true,
          width: '20%'
        },
        {
          prop: 'HEALTH_CURRENT_VALUE',
          label: '项目健康度',
          // fixed: true,
          width: '20%'
        }
      ],
    }
  },
  created () {
    this.year = this.currentData()
    this.getworkBenchInfoSaleManagementList(this.year)
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
    getworkBenchInfoSaleManagementList(dateYear) {
        let url = "?action=/project/GetSaleOrPmProjectList";
        let params = {SEARCH_EMP_ID:this.SEARCH_EMP_ID,SEARCH_TIME:dateYear,TYPE:this.TYPE};
        let flag = this.page>1;
        fetch.get(url, params).then(res => {
            this.workBenchInfoSaleManagementListObj = res.data;
            this.$message({
                message:'已加载全部数据',
                type: 'success',
                center: true,
                duration:1000,
                customClass:'msgdefine'
            });
        })
    },
    rowClick (row) {
        console.log("row",row)
        this.$router.push({name: 'programShow', query: {projectId:row.PROJECT_ID,type:'manager_module'}})
    },
    currentData () {
        var date = new Date();
        return date.getFullYear();
    }
  },
  beforeRouteLeave( to, from,next){
    if (to.name == 'workBenchInfoDetail') {
        to.meta.isUseCache = true;    
    }        
    next();
  }
}

</script>

<style scoped>
  .workBenchInfoSaleManagementView{width: 100%; background:#f7f7f7;}
  .workBenchInfoSaleManagementContent{width: 100%; position: absolute; top: 0.45rem;bottom: 0; color: #666666;overflow: scroll;}
  .workBenchInfoSaleManagementContent >>> .el-table__body{width: 100%!important}
  .workBenchInfoSaleManagementContent >>> .el-table__header{width: 100%!important}
  .workBenchInfoSaleManagementContent >>> .el-table{font-size: 0.13rem; text-align: center;}
  .workBenchInfoSaleManagementContent >>> .el-table tr:nth-child(2n){background: #f7f7f7}
  .workBenchInfoSaleManagementContent >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .workBenchInfoSaleManagementContent >>> .el-table td{border: none}
  .workBenchInfoSaleManagementContent >>> .el-table .cell{padding: 0;}
  .workBenchInfoSaleManagementContent >>> .el-table__empty-block{position: initial}
</style>