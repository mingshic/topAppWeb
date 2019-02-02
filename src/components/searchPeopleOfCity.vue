<!--任务列表查询-->
<template>
  <div class="searchOeopleOfCityView">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="岗位名称">
        <el-select v-model="form.empPositionNm" placeholder="岗位名称" clearable="">
          <el-option v-for="item in empPositionNmArr" :label="item.EMP_POSITION_NM" :value="item.EMP_POSITION_NM" :key="item.id"></el-option>
        </el-select>
        <!-- <el-input v-model="form.empPositionNm" class="bInput"></el-input> -->
      </el-form-item>
      <el-form-item label="资源类型">
        <el-select v-model="form.resourceType" placeholder="资源类型" clearable="">
          <el-option v-for="item in resourceTypeArr" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
        <!-- <el-input v-model="form.resourceType" class="bInput"></el-input> -->
      </el-form-item>
      <el-form-item label="所属项目部">
        <el-select v-model="form.userQy" placeholder="所属项目部" clearable="">
          <el-option v-for="item in userQyArr" :label="item.DICTNAME" :value="item.DICTNAME" :key="item.id"></el-option>
        </el-select>
        <!-- <el-input v-model="form.userQy" class="bInput"></el-input> -->
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
  name: 'searchPeopleOfCity',

  components: {

  },
  props: ['queryData'],
  data () {
    return {
      form: {
        empPositionNm: '',
        resourceType: '',
        userQy: ''
      },
      empPositionNmArr: [],
      resourceTypeArr:[
        {name:"内部员工",value:"内部"}, 
        {name:"外部员工",value:"外部"}
      ],
      userQyArr:[]
    }
  },

  watch: {},

  created () {
    console.log("focus serach view");
    console.log(this.queryData);
    fetch.get("?action=/system/getPositionList","").then(res=>{
      console.log("res",res);
      this.empPositionNmArr = res.data;
    });
    fetch.get("?action=/system/getDict2&DICT_TYPE=NT_PRO_AREA","").then(res=>{
      console.log("res",res);
      this.userQyArr = res.data;
    });
    this.form.empPositionNm = this.queryData.empPositionNm;
    this.form.resourceType = this.queryData.resourceType;
    this.form.userQy = this.queryData.userQy;
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
  .searchOeopleOfCityView{width:80%;background: #ffffff; padding: 0.15rem 0.2rem 0.5rem;position: relative;}
  .searchOeopleOfCityView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchOeopleOfCityView >>> .el-select{width: 80%;}
  .searchOeopleOfCityView >>> .el-input__inner{padding: 0 0.05rem}
  .searchOeopleOfCityView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchOeopleOfCityView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchOeopleOfCityView >>> .el-checkbox-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem; background: #f6f6f6; color: #333333; font-size: 0.13rem;border: 0.01rem solid #f6f6f6;}
  .searchOeopleOfCityView >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;}
  .searchOeopleOfCityView >>> .bInput .el-input__inner{width: 80%;}
  .searchOeopleOfCityView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchOeopleOfCityView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchOeopleOfCityView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchOeopleOfCityView >>> .el-input__prefix{display: none;}
  .searchOeopleOfCityView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchOeopleOfCityView >>> .el-col-2{text-align: center;}
  .searchOeopleOfCityView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchOeopleOfCityView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchOeopleOfCityView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchOeopleOfCityView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchOeopleOfCityView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchOeopleOfCityView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>