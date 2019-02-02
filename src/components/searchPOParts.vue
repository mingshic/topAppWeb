<!--PO信息-备件-->
<template>
  <div class="searchPOPartsView">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="供应商">
        <el-input v-model="form.supplyName" class="bInput"></el-input>
      </el-form-item>
      <!-- <el-form-item label="类型">
        <el-input v-model="form.projectName" class="bInput"></el-input>
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
  name: 'searchPOParts',

  components: {

  },
  props: ['queryData'],
  data () {
    return {
      form: {
        supplyName: '',
        startTime: '',
        endTime: ''
      }
    }
  },

  watch: {},

  created () {
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
      // console.log(this.form, '------------------')
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
  .searchPOPartsView{background: #ffffff; padding: 0.15rem 0.2rem 0.5rem;position: relative;}
  .searchPOPartsView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchPOPartsView >>> .el-select{width: 80%;}
  .searchPOPartsView >>> .el-input__inner{padding: 0 0.05rem}
  .searchPOPartsView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchPOPartsView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchPOPartsView >>> .el-checkbox-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem; background: #f6f6f6; color: #333333; font-size: 0.13rem;border: 0.01rem solid #f6f6f6;}
  .searchPOPartsView >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;}
  .searchPOPartsView >>> .bInput .el-input__inner{width: 80%;}
  .searchPOPartsView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchPOPartsView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchPOPartsView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchPOPartsView >>> .el-input__prefix{display: none;}
  .searchPOPartsView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchPOPartsView >>> .el-col-2{text-align: center;}
  .searchPOPartsView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchPOPartsView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchPOPartsView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchPOPartsView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchPOPartsView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchPOPartsView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>