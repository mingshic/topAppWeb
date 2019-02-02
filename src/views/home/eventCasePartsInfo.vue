<template>
  <div class="partsInfoView">
    <header-last :title="partsInfotil"></header-last>
    <div style="height: 0.45rem;"></div>
        <!-- <div class="eventShowTabs"> -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="待回收安排" name="first"><arrangements></arrangements></el-tab-pane>
      <el-tab-pane v-if="display" label="已完全回收" name="second" lazy><completed></completed></el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import arrangements from '../../components/form/arrangements'
import completed from '../../components/form/completed'
import headerLast from '../header/headerLast'

export default {
  name: 'eventCasePartsInfo',

  components: {
    arrangements,
    completed,
    headerLast
  },

  data () {
    return {
      activeName: 'first',
      display:false,
      partsInfotil: '备件回收',
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
  .partsInfoView{margin-top: 0.05rem; width: 100%; background: #ffffff;}
  .partsInfoView >>> .el-tabs__nav{width: 100%}
  .partsInfoView >>> .el-tabs__item{width: 50%; text-align: center; font-size: 0.14rem; color: #999999;}
  .partsInfoView >>> .el-tabs__item.is-active{color: #2698d6;}
  .partsInfoView >>> .el-tabs__item:hover{color: #2698d6;}
  .partsInfoView >>> .el-tabs__active-bar{ background-color: #2698d6}
  .partsInfoView >>> .el-tabs__header{margin: 0 0.25rem}
</style>

    