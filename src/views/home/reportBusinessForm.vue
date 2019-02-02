<!--报表-->
<template>
  <div class="reportBusinessView">
    <el-tabs v-model="activeName">
      <el-tab-pane label="业务" name="first"><business></business></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import business from '../../components/form/business'
export default {
  name: 'reportBusinessForm',

  components: {
    business
  },

  data () {
    return {
      activeName: 'first',
      display:false,
      searchData:{
        industry:[],
      },
    }
  },
  mounted(){
    let permissions = JSON.parse(localStorage.getItem("userPermission"));
    console.log(permissions);
     for(let i=0;i<permissions.length;i++){
      if(permissions[i].PRIVID=='topApp_report_quality_view'){
        this.display = true
      }
     }
  },

  methods: {

  }
}
</script>

<style scoped>
  .reportBusinessView{margin-top: 0.05rem; width: 100%; background: #ffffff;}
  .reportBusinessView >>> .el-tabs__nav{width: 100%}
  .reportBusinessView >>> .el-tabs__item{width: 50%; text-align: center; font-size: 0.14rem; color: #999999;}
  .reportBusinessView >>> .el-tabs__item.is-active{color: #2698d6;}
  .reportBusinessView >>> .el-tabs__item:hover{color: #2698d6;}
  .reportBusinessView >>> .el-tabs__active-bar{ background-color: #2698d6}
  .reportBusinessView >>> .el-tabs__header{margin: 0 0.25rem}
</style>
