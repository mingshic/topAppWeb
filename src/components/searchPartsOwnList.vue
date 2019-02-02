<!--任务列表查询-->
<template>
  <div class="searchPartsOwnListView">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="厂商">
        <el-input v-model="form.factoryName" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-input v-model="form.modelName" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="form.partsTypeName" placeholder="设备类型" multiple="" collapse-tags>
          <el-option v-for="item in partsTypeNameArr" :label="item.partsTypeName" :value="item.partsTypeName" :key="item.id"></el-option>
        </el-select> 
        <!-- <el-input v-model="form.partsTypeName" class="bInput"></el-input> -->
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
  name: 'searchPartsOwnList',

  components: {

  },
  props: ['queryData'],
  data () {
    return {
      form: {
        factoryName: '',
        modelName: '',
        partsTypeName: ''
      },
      partsTypeNameArr: []
    }
  },

  watch: {},

  created () {
    console.log("focus serach view");
    console.log(this.queryData);
    fetch.get("?action=/parts/GetPartsTypeList","").then(res=>{
      console.log(res);
      this.partsTypeNameArr = res.DATA;
      console.log(this.partsTypeNameArr);
    });
    this.form.factoryName = this.queryData.factoryName;
    this.form.modelName = this.queryData.modelName;
    this.form.partsTypeName = this.queryData.partsTypeName;
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
  .searchPartsOwnListView{width:80%;background: #ffffff; padding: 0.15rem 0.2rem 0.5rem;position: relative;}
  .searchPartsOwnListView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchPartsOwnListView >>> .el-select{width: 80%;}
  .searchPartsOwnListView >>> .el-input__inner{padding: 0 0.05rem}
  .searchPartsOwnListView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchPartsOwnListView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchPartsOwnListView >>> .el-checkbox-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem; background: #f6f6f6; color: #333333; font-size: 0.13rem;border: 0.01rem solid #f6f6f6;}
  .searchPartsOwnListView >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;}
  .searchPartsOwnListView >>> .bInput .el-input__inner{width: 80%;}
  .searchPartsOwnListView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchPartsOwnListView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchPartsOwnListView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchPartsOwnListView >>> .el-input__prefix{display: none;}
  .searchPartsOwnListView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchPartsOwnListView >>> .el-col-2{text-align: center;}
  .searchPartsOwnListView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchPartsOwnListView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchPartsOwnListView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchPartsOwnListView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchPartsOwnListView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchPartsOwnListView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>