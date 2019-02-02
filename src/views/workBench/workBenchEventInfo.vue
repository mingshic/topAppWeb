<!--工作台-事件信息-->
<template>
  <div class="workBenchEventInfoView">
    <header-last :title="workBenchEventInfoTit" :backUrl="backUrl"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="searchView">
        <el-form label-width="100px">
          <el-form-item label="行业：" label-width="0.8rem">
            <el-row>
            <el-col :span="6">
              <el-checkbox :indeterminate="isIndeterminateH" v-model="checkAllH" @change="handleCheckAllChangeH">全选</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-checkbox-group v-model="checkedH" @change="handleCheckedChangeH" size="mini">
                <el-checkbox v-for="h in INDUSTRYS" :label="h" :key="h">{{h}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="厂商：" label-width="0.8rem">
            <el-row>
            <el-col :span="6">
              <el-checkbox :indeterminate="isIndeterminateC" v-model="checkAllC" @change="handleCheckAllChangeC">全选</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-checkbox-group v-model="checkedC" @change="handleCheckedChangeC" size="mini">
                <el-checkbox v-for="c in FACTORYS" :label="c" :key="c">{{c}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="事件级别：" label-width="0.8rem">
            <el-row>
            <el-col :span="6">
              <el-checkbox :indeterminate="isIndeterminateS" v-model="checkAllS" @change="handleCheckAllChangeS">全选</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-checkbox-group v-model="checkedS" @change="handleCheckedChangeS" size="mini">
                <el-checkbox v-for="s in CASE_LEVELS" :label="s" :key="s">{{s}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="技术方向：" label-width="0.8rem">
            <el-row>
            <el-col :span="6">
              <el-checkbox :indeterminate="isIndeterminateJ" v-model="checkAllJ" @change="handleCheckAllChangeJ">全选</el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-checkbox-group v-model="checkedJ" @change="handleCheckedChangeJ" size="mini">
                <el-checkbox v-for="j in TECHS" :label="j" :key="j">{{j}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="时间：" label-width="0.8rem">
          <el-col :span="8">
            <el-form-item prop="date1">
              <el-date-picker size="mini" type="date" placeholder="请选择日期" v-model="form.date1" style="width: 90%;" :picker-options="pickerOptions" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">~</el-col>
          <el-col :span="8">
            <el-form-item prop="date2">
              <el-date-picker size="mini" type="date" placeholder="请选择日期" v-model="form.date2" style="width: 90%;" :picker-options="pickerOptions" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="searchInfo">查询</el-button>
            </el-form-item>
          </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div style="height: 1.6rem;"></div>
      <div class="tableView">
        <el-table
          :data="tableData"
          :summary-method="getSummaries"
          show-summary
          max-height="437"
          v-loading="busy && !loadall"
          @row-click="rowClick"
          style="width: 100%;">
          <template v-for="item in workBenchEventInfoObj">
            <el-table-column
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <div style="height:0.45rem"></div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
const I = ['移动', '联通', '电信', '金融', '政府', '企事业', '其他'];
const F = ['IBM', 'HP', 'DELL', 'EMC', 'H3C', '其他'];
const C = ['一级', '二级', '三级', '四级'];
const T = ['小型机', 'X86刀片', '交换机', 'PC服务器', '存储磁盘', '其他'];

export default {
  name: 'workBenchEventInfo',

  components: {
    headerLast,
    footerHome
  },
  data () {
    
    return {
      workBenchEventInfoTit: '事件信息',
      form: {
        date1: this.getFormerTime(1)[0],
        date2: this.getCurrentTime(1)[0]
      },
      checkAllH: false,
      checkAllC: false,
      checkAllS: false,
      checkAllJ: false,
      INDUSTRYS_toID: {'移动': '001', '联通': '002', '电信': '003', '金融': '004', '政府': '005', '企事业': '006', '其他': '007'},
      // INDUSTRYS: ['移动', '联通', '电信', '金融', '政府', '企事业', '其他'],
      // FACTORYS: ['IBM', 'HP', 'DELL', 'EMC', 'H3C', '其他'],
      // CASE_LEVELS: ['一级', '二级', '三级', '四级'],
      // TECHS: ['小型机', 'X86刀片', '交换机', 'PC服务器', '存储磁盘', '其他'],
      INDUSTRYS: I,
      FACTORYS: F,
      CASE_LEVELS: C,
      TECHS: T,
      checkedH: ['移动', '联通', '电信', '金融', '其他'],
      checkedC: ['IBM'],
      checkedS: ['二级', '三级'],
      checkedJ: ['PC服务器'],
      // checkedH: '',
      // checkedC: '',
      // checkedS: '',
      // checkedJ: '',
      isIndeterminateH: true,
      isIndeterminateC: true,
      isIndeterminateS: true,
      isIndeterminateJ: true,
      tableData: [],

      checkI: "",
      checkS: "",
      checkJ: "",
      checkC: "",

      workBenchEventInfoObj: [
        {prop: 'INDUSTRY', label: '行业', width: '25%'},
        {prop: 'FAULT_NUM', label: '故障类', width: '25%'},
        {prop: 'NON_FAULT_NUM', label: '非故障类', width: '25%'},
        {prop: 'total', label: '总计', width: '25%'}
      ],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now();
        }
      },
      backUrl : 'workBench',
      busy:true,
      loadall: false
    }
  },
  created () {
    
    if(undefined!=this.$route.query.date1){
      this.form.date1 = this.$route.query.date1;
      this.form.date2 = this.$route.query.date2;
    }

    this.returnList()
    //console.log(this.form)
  },
  methods: {
    returnList () {
      this.checkI = this.industryId().join(",")
      this.checkS = this.checkedS.join(',')
      this.checkJ = this.checkedJ.join(',')
      this.checkC = this.checkedC.join(',')
      let params = {INDUSTRY_NAME: this.checkI, CASE_LEVEL: this.checkS, TECH_NAME: this.checkJ, FACTORY_NAME: this.checkC, START_TIME: this.form.date1, END_TIME: this.form.date2}
      fetch.get("?action=GetCaseStat",params).then(res=>{
        this.tableData = res.data
        console.log(res.data)
        let _this = this
        for (let i = 0; i < this.tableData.length; i++) {
          let totalNum = this.tableData[i].FAULT_NUM + this.tableData[i].NON_FAULT_NUM
          _this.tableData[i] = {
            INDUSTRY: _this.tableData[i].INDUSTRY,
            INDUSTRY_ID: _this.tableData[i].INDUSTRY_ID,
            FAULT_NUM: _this.tableData[i].FAULT_NUM,
            NON_FAULT_NUM: _this.tableData[i].NON_FAULT_NUM,
            total: totalNum
          }
        }

        this.busy= false;
        this.loadall = true;
      })
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    // 跳转链接
    rowClick (row) {
      console.log("aaaaaaaaaaaaa", row)
      this.$router.push({name: 'workBenchEventInfoShow', query: {INDUSTRY_NAME: row.INDUSTRY_ID, CASE_LEVEL: this.checkS, TECH_NAME: this.checkJ, FACTORY_NAME: this.checkC,date1:this.form.date1,date2:this.form.date2}})
    },
    searchInfo () {
      this.returnList()
    },
    standardDate(join,...num){
      let arr = [];
      num.forEach((item)=>{
        item.toString().length<2?arr.push('0'+item):arr.push(item);
      });
      return arr.join('-')
    },
    getFormerTime (n) {
      let nowYear = new Date().getFullYear() - 1, yearArr = []
      yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
      for(let i = 1;i<n;i++){
        yearArr.unshift(nowYear-i+'1231')
      }
      //console.log(yearArr)
      return yearArr
    },
    getCurrentTime (n) {
      let nowYear = new Date().getFullYear(), yearArr = []
      yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
      for(let i = 1;i<n;i++){
        yearArr.unshift(nowYear-i+'1231')
      }
      //console.log(yearArr)
      return yearArr
    },
    noKeyword () {
      document.activeElement.blur()
    },
    industryId () {
        let ids = []
        for (var i=0;i<this.checkedH.length;i++){
            ids.push(this.INDUSTRYS_toID[this.checkedH[i]])
        }
        return ids
    },
    handleCheckAllChangeH(val) {
        console.log(val)
        this.checkedH = val ? I : [];
        this.isIndeterminateH = false;
        console.log(this.checkedH)
      },
    handleCheckedChangeH(value) {
      console.log("111", value)
      let checkedCount = value.length;
      this.checkAllH = checkedCount === this.INDUSTRYS.length;
      this.isIndeterminateH = checkedCount > 0 && checkedCount < this.INDUSTRYS.length;
      },
    handleCheckAllChangeC(val) {
        console.log(val)
        this.checkedC = val ? F : [];
        this.isIndeterminateC = false;
        console.log(this.checkedC)
      },
    handleCheckedChangeC(value) {
      console.log("222", value)
      let checkedCount = value.length;
      this.checkAllC = checkedCount === this.FACTORYS.length;
      this.isIndeterminateC = checkedCount > 0 && checkedCount < this.FACTORYS.length;
      },
    handleCheckAllChangeS(val) {
        this.checkedS = val ? C : [];
        this.isIndeterminateS = false;
      },
    handleCheckedChangeS(value) {
      let checkedCount = value.length;
      this.checkAllS = checkedCount === this.CASE_LEVELS.length;
      this.isIndeterminateS = checkedCount > 0 && checkedCount < this.CASE_LEVELS.length;
      },
    handleCheckAllChangeJ(val) {
        this.checkedJ = val ? T : [];
        this.isIndeterminateJ = false;
      },
    handleCheckedChangeJ(value) {
      let checkedCount = value.length;
      this.checkAllJ = checkedCount === this.TECHS.length;
      this.isIndeterminateJ = checkedCount > 0 && checkedCount < this.TECHS.length;
      },
  }
}
</script>

<style scoped>
  .workBenchEventInfoView{width: 100%;}
  .workBenchEventInfoView .content{margin-top: 0.05rem; background: #ffffff;bottom: 0.45rem}
  /* .searchView{padding: 0.15rem 0.25rem;} */
  .searchView >>> .el-form{height: 0.3rem;margin-bottom:0.3rem}
  .searchView >>> .el-form-item__label{line-height: 0.25rem;margin-top: 0rem;font-size: 0.13rem;}
  .searchView >>> .el-input__icon{display: none}
  .searchView >>> .el-input__prefix{display: none;}
  .searchView >>> .el-checkbox__label{line-height: 0.25rem;}
  /* .searchView >>> .el-checkbox{text-align: left} */
  .searchView >>> .el-form-item__content{line-height: 0px;}
  .searchView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchView >>> .el-col{text-align: left;font-size: 0.13rem}
  .searchView >>> .el-col-1{text-align: center; line-height: 0.4rem}
  .searchView >>> .el-form .line{text-align: center; line-height: 0.3rem}
   .searchView >>> .el-checkbox{margin:0rem;height: 100%}
  .searchView >>> .el-checkbox-group{line-height: 0.1rem; text-align: left}
  .searchView >>> .el-form-item{margin-bottom: 0rem}
  .searchView >>> .el-form-item__label{padding: 0 0 0 0.1rem; color: #666666; text-align: left;}
  .searchView >>> .el-button{padding: 6px 10px}
  .tableView >>> .el-table th{border-top: 0.01rem solid #e1e1e1; line-height: 0.25rem; color: #333333;font-size: 0.13rem}
  .tableView >>> .el-table .cell{text-align: center; padding: 0}
  .tableView >>> .el-table tr{line-height: 0.25rem; color: #666666;font-size: 0.13rem}
  .tableView >>> .el-table tr:nth-child(2n+1){background: #f7f7f7;}
  .tableView >>> .el-table tr:nth-child(2n){background: #ffffff;}
</style>
<style>
.searchView .el-row .el-col{line-height:0.25rem}
</style>

