<!--任务列表查询-->
<template>
  <div class="searchMyWorkView">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="项目编号" label-width="0.8rem">
        <el-input v-model="form.projectNo" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="项目名称" label-width="0.8rem">
        <el-input v-model="form.projectName" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="事件编号" label-width="0.8rem">
        <el-input v-model="form.caseNo" class="bInput"></el-input>
      </el-form-item>

      <el-form-item label="事件级别" label-width="0.8rem">
        <el-select v-model="form.caseLevel" placeholder="请选择事件级别" multiple>
          <el-option v-for="item in caseLevelArr" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建人" label-width="0.8rem">
        <el-input v-model="form.creatorRealname" class="bInput"></el-input>
      </el-form-item>

      <el-form-item label="起始日期" label-width="0.8rem">
        <el-date-picker type="date" placeholder="开始日期" v-model="form.expectStart" style="width: 100%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期" label-width="0.8rem">
        <el-date-picker type="date" placeholder="开始日期" v-model="form.expectEnd" style="width: 100%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
      </el-form-item>
      <el-form-item label="内容要求" label-width="0.8rem">
        <el-input v-model="form.workRequire" class="bInput"></el-input>
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
  name: 'searchMyWork',

  components: {

  },
  props: ['queryData'],
  data () {
    return {
      form: {
        caseLevel: '',
        projectNo: '',
        projectName: '',
        caseNo: '',
        creatorRealname: '',
        expectStart: '',
        expectEnd: '',
        workRequire: ''
      },
      caseLevelArr: []
    }
  },

  watch: {},

  created () {
    console.log("focus serach view");
    console.log(this.queryData);
    fetch.get("?action=getDict&type=NT_CASE_LEVEL","").then(res=>{
      console.log(res.data);
      this.caseLevelArr = res.data;
    });
    this.form.projectNo = this.queryData.projectNo;
    this.form.projectName = this.queryData.projectName;
    this.form.caseNo = this.queryData.caseNo;
    this.form.caseLevel = this.queryData.caseLevel;
    this.form.creatorRealname = this.queryData.creatorRealname;
    this.form.expectStart = this.queryData.expectStart;
    this.form.expectEnd = this.queryData.expectEnd;
    this.form.workRequire = this.queryData.workRequire;
    
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
  .searchMyWorkView{width:80%;background: #ffffff; padding: 0.15rem 0.2rem 0;position: relative;overflow: scroll;height: 60%}
  .searchMyWorkView >>> .el-form-item{margin-bottom: 0.05rem;}
  .searchMyWorkView >>> .el-select{width: 80%;}
  .searchMyWorkView >>> .el-input__inner{padding: 0 0.05rem}
  .searchMyWorkView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchMyWorkView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchMyWorkView >>> .el-checkbox-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem; background: #f6f6f6; color: #333333; font-size: 0.13rem;border: 0.01rem solid #f6f6f6;}
  .searchMyWorkView >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;}
  .searchMyWorkView >>> .bInput .el-input__inner{width: 80%;}
  .searchMyWorkView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchMyWorkView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchMyWorkView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchMyWorkView >>> .el-input__prefix{display: none;}
  .searchMyWorkView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchMyWorkView >>> .el-col-2{text-align: center;}
  .searchMyWorkView >>> .searchBtn{position: relative;margin-top: 0.2rem; bottom: 0; left: 0; right: 0; height: 0.4rem;}
  .searchMyWorkView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchMyWorkView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchMyWorkView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchMyWorkView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchMyWorkView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>
