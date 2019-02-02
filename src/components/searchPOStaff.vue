<!--PO信息-人员-->
<template>
  <div class="searchPOStaffView">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="姓名">
        <!-- <el-select v-model="form.supplyName" placeholder="供应商" multiple>
          <el-option v-for="item in supplyNameArr" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select> -->
        <el-input v-model="form.supplyName" class="bInput"></el-input>
      </el-form-item>
      <!-- <el-form-item label="类型">
        <el-input v-model="form.poTypeName" class="bInput"></el-input>
      </el-form-item> -->
      <el-form-item label="实际支付日期">
        <el-col :span="11">
          <el-date-picker type="date" v-model="form.startTime" style="width: 100%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">～</el-col>
        <el-col :span="11">
          <el-date-picker type="date" v-model="form.endTime" style="width: 100%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
        </el-col>
        <!-- <el-input v-model="form.caseNo" class="bInput"></el-input> -->
      </el-form-item>
      
      <el-form-item class="searchBtn">
        <el-button @click="onCancel">取消</el-button>
        <el-button class="searchBtnCell" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import fetch from '../utils/ajax'
export default {
  name: 'searchPOStaff',

  components: {

  },
  props: ['queryData'],
  data () {
    return {
      form: {
        supplyName: '',
        startTime: '',
        endTime: ''
      },
      supplyNameArr: []
    }
  },

  watch: {},

  created () {
    console.log("focus serach view");
    console.log(this.queryData);
    // var params = {SUPPLIER_NAME:this.form.poTypeName,TYPE:this.form.type,START_TIME:this.form.startTime,END_TIME:this.form.endTime};
    // console.log(params);
    // fetch.get("?action=/po/GetPOList",params).then(res=>{
    //   console.log("res:",res);
    // })
    // fetch.get("?action=getDict&type=NT_CASE_LEVEL","").then(res=>{
    //   console.log(res.data);
    //   this.caseLevelArr = res.data;
    // });
    this.form.supplyName = this.queryData.supplyName;
    this.form.startTime = this.queryData.startTime;
    this.form.endTime = this.queryData.endTime;
  },

  methods: {
    onCancel () {
      let data = {
        popBg: false
      }
      this.$emit('change', data)
    },
    onSearch () {
      let form = this.form
      this.$emit('search', form)
      let data = {
        popBg: false
      }
      this.$emit('change', data)
    },
    noKeyword () {
      document.activeElement.blur()
    }
  }
}
</script>

<style scoped>
  .searchPOStaffView{background: #ffffff; padding: 0.15rem 0.2rem 0.5rem;position: relative;}
  .searchPOStaffView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchPOStaffView >>> .el-select{width: 80%;}
  .searchPOStaffView >>> .el-input__inner{padding: 0 0.05rem}
  .searchPOStaffView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchPOStaffView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchPOStaffView >>> .el-checkbox-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem; background: #f6f6f6; color: #333333; font-size: 0.13rem;border: 0.01rem solid #f6f6f6;}
  .searchPOStaffView >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;}
  .searchPOStaffView >>> .bInput .el-input__inner{width: 80%;}
  .searchPOStaffView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchPOStaffView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchPOStaffView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchPOStaffView >>> .el-input__prefix{display: none;}
  .searchPOStaffView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchPOStaffView >>> .el-col-2{text-align: center;}
  .searchPOStaffView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchPOStaffView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchPOStaffView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchPOStaffView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchPOStaffView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchPOStaffView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>