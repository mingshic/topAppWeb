<!--工作台-在保项目信息-->
<template>
  <div class="workBenchIndustryCustomerView">
    <header-last :title="workBenchIndustryCustomerTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="workBenchIndustryCustomerContent">
      <el-table
        stripe
        v-loading="busy && !loadall"
        :data="workBenchIndustryCustomerListObj"
        element-loading-text="正在加载下一页"
        v-loadmore="loadMore"
        @row-click="rowClick"
        :height = "tableHeight"
        style="width: 100%">
        <template v-for="item in IndustryCustomerTable">
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
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import loadingtmp from '@/components/load/loading'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchIndustryCustomerList',

  components: {
    headerLast,
    loadingtmp,
    footerHome
  },

  data () {
    return {
      workBenchIndustryCustomerTit: '行业-客户列表',
      workBenchIndustryCustomerListObj: [],
      page:1,
      pageSize:20,
      busy: false,
      loadall: false,
      tableHeight:400,

      searchData:{
        BUSSINESS_TYPE: this.$route.query.BUSINESS_TYPE,
        INDUSTRY_NAME: this.$route.query.INDUSTRY_NAME
      },
      IndustryCustomerTable: [
        {
          prop: 'CUST_NAME',
          label: '客户名称',
          // fixed: true,
          width: '33%'
        },
        {
          prop: 'PRO_NUM',
          label: '项目数量',
          // fixed: true,
          width: '33%'
        },
        {
          prop: 'AMOUNT',
          label: '合同规模',
          // fixed: true,
          width: '34%'
        }
      ],
    }
  },
  created () {
    this.getIndustryCustomerList()
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
    getIndustryCustomerList() {
        let url = "?action=/project/GetCustDetail";
        let params = {BUSSINESS_TYPE: this.$route.query.BUSINESS_TYPE,INDUSTRY_NAME: this.$route.query.INDUSTRY_NAME,PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};
        let flag = this.page>1;
        fetch.get(url, params).then(res => {
            console.log(res);
            if(flag){
                this.workBenchIndustryCustomerListObj = this.workBenchIndustryCustomerListObj.concat(res.data);
            }else{
                this.workBenchIndustryCustomerListObj = res.data;
            }
            if(0 == res.data.length || res.data.length<this.pageSize ){
                this.busy = true
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
        })
          // let math = require('mathjs');
        //   this.workBenchIndustryCustomerListObj = res.data
    },
    rowClick (row) {
        console.log("row",row)
        this.$router.push({name: 'workBenchInfoDetail', query: {cust_name:row.CUST_NAME,business:row.BUSINESS_TYPE,industry:row.INDUSTRY,isSearch:1}})
    },
        
    loadMore(){
        console.log(this.busy)
        if(this.busy) {
            console.log("eeeeeeeeeeeeeeeee")
            return false
        }
        this.busy = true;
        setTimeout(() => {
            this.getIndustryCustomerList();
        }, 1000);
    },

  }
}

</script>

<style scoped>
  .workBenchIndustryCustomerView{width: 100%; background:#f7f7f7;}
  .workBenchIndustryCustomerContent{width: 100%; position: absolute; top: 0.45rem;bottom: 0.45rem; color: #666666;overflow: scroll;}
  .workBenchIndustryCustomerContent >>> .el-table__body{width: 100%!important}
  .workBenchIndustryCustomerContent >>> .el-table__header{width: 100%!important}
  .workBenchIndustryCustomerContent >>> .el-table{font-size: 0.13rem; text-align: center;}
  .workBenchIndustryCustomerContent >>> .el-table tr:nth-child(2n){background: #f7f7f7}
  .workBenchIndustryCustomerContent >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .workBenchIndustryCustomerContent >>> .el-table td{border: none}
  .workBenchIndustryCustomerContent >>> .el-table .cell{padding: 0;}
  .workBenchIndustryCustomerContent >>> .el-table__empty-block{position: initial}
</style>