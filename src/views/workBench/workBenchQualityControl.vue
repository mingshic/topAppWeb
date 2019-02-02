<!--报表--> 
<template>
  <div class="workBenchQualityControlView">
    <header-last :title="workBenchQualityControlViewTit"></header-last>
    <!-- <div style="height: 0.45rem;"></div> -->
    <div class="reportFormView">
      <el-tabs v-model="activeName">
        <el-tab-pane label="质量" name="first"><quality></quality></el-tab-pane>
      </el-tabs>
    </div>
    <div style="height:0.45rem"></div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import quality from '../../components/form/quality'
import headerLast from '../header/headerLast'
import footerHome from '../footer/footerHome'
export default {
  name: 'reportForm',

  components: {
    headerLast,
    quality,
    footerHome
  },

  data () {
    return {
      workBenchQualityControlViewTit: '质量',
      activeName: 'first',
      // display:false
    }
  },
  mounted(){
    // let permissions = JSON.parse(localStorage.getItem("userPermission"));
    // console.log(permissions);
    //  for(let i=0;i<permissions.length;i++){
    //   if(permissions[i].PRIVID=='topApp_report_quality_view'){
    //     this.display = true
    //   }
    //  }
  },

  methods: {

  }
}
</script>

<style scoped>
  .workBenchQualityControlView{width: 100%;}
  .reportFormView{margin-top: 0.05rem; width: 100%; background: #ffffff;}
  .reportFormView >>> .el-tabs__nav{width: 100%}
  .reportFormView >>> .el-tabs__item{width: 100%; text-align: center; font-size: 0.14rem; color: #999999;}
  .reportFormView >>> .el-tabs__item.is-active{color: #2698d6;}
  .reportFormView >>> .el-tabs__item:hover{color: #2698d6;}
  .reportFormView >>> .el-tabs__active-bar{ background-color: #2698d6}
  .reportFormView >>> .el-tabs__header{margin: 0 0.25rem}
</style>
