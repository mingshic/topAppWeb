<!--工作台-备件库存-->
<template>
  <div class="workBenchPartsView">
    <header-last :title="workBenchPartsTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="firstTabTit" name="first"><work-bench-parts-own :own-info="ownInfo"></work-bench-parts-own></el-tab-pane>
        <el-tab-pane :label="secondTabTit" name="second" lazy><work-bench-parts-supplier :supplier-info="supplierInfo"></work-bench-parts-supplier></el-tab-pane>
      </el-tabs>
      <!-- <el-table
        stripe
        :data="tableData"
        v-loading="busy && !loadall"
        style="width: 100%">
        <el-table-column
          prop="PROVINCE_NAME"
          label="地点"
          width="16%">
        </el-table-column>
        <el-table-column label="自有">
          <el-table-column
            prop="ZY_PART_NUMBER"
            label="数量"
            width="15%">
          </el-table-column>
          <el-table-column
            prop="ZY_PART_AMOUNT"
            label="金额"
            width="27%">
          </el-table-column>
        </el-table-column>
        <el-table-column label="供应商">
          <el-table-column
            prop="GYS_PART_NUMBER"
            label="数量"
            width="15%">
          </el-table-column>
          <el-table-column
            prop="GYS_PART_AMOUNT"
            label="金额"
            width="27%">
          </el-table-column>
        </el-table-column>
      </el-table> -->
    </div>
    <div style="height:0.45rem"></div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import workBenchPartsSupplier from '../../components/workBenchPartsInfo/workBenchPartsSupplier'
import workBenchPartsOwn from '../../components/workBenchPartsInfo/workBenchPartsOwn'
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchParts',

  components: {
    workBenchPartsSupplier,
    workBenchPartsOwn,
    headerLast,
    footerHome
  },

  data () {
    return {
      activeName: 'first',
      workBenchPartsTit: '备件管理',
      firstTabTit: '自有',
      secondTabTit: '供应商',
      tableData: [],
      ownInfo: [],
      supplierInfo: [],
      // busy: true,
      // loadall: false
    }
  },
  created () {
    fetch.get("?action=GetPartStat",{}).then(res=>{
      this.tableData = res.data;
      console.log(this.tableData);
      this.ownInfo = this.tableData;
      this.supplierInfo = this.tableData;
      // this.busy= false;
      // this.loadall = true;
      // console.log(this.tableData);
    });
  },
  methods: {
  }
}
</script>

<style scoped>
  .workBenchPartsView{width: 100%;}
  .content{margin: 0 0; background: #ffffff; position: relative;}
  .content >>> .el-tabs__header{margin: 0 0 0rem;}
  .content >>> .el-tabs__item.is-active{color: #2698d6;}
  .content >>> .el-tabs__active-bar{background: #2698d6;}
  .content >>> .el-tabs__nav{width: 100%; text-align: center;}
  .content >>> .el-tabs__item{width: 50%; padding: 0; font-size: 0.14rem; color: #666666;text-align: center}
</style>
