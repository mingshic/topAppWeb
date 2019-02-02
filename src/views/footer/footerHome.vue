<!--一级底部-->
<template>
  <div class="footerSelect">
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      @select="select">
    <template v-for="item in footerArr">
      <el-menu-item v-if="footerArr.length == 4" style="width: 25%;" :index="item.index" :key="item.elType">
        <!-- <img v-if="item.elType === 3" :src="item.imgSrc" class="workImg" /> -->
        <i :class="item.className"></i>
        <span>{{ item.text }}</span>
      </el-menu-item>
      <el-menu-item v-if="footerArr.length == 3" style="width: 33.3%;" :index="item.index" :key="item.elType">
        <i :class="item.className"></i>
        <span>{{ item.text }}</span>
      </el-menu-item>
    </template>
    </el-menu>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
export default {
  name: 'footerHome',
  data: function () {
    return {
      footerArr: [],
      title: [],
      defaultActive: 'home'
    }
  },
  activated(){
    this.footerArr = this.getFooterArr();
  },

  created () { 
    this.footerArr = this.getFooterArr(); 
  },

  methods: {
    getFooterArr(){
      this.footerArr = [];
      console.log("AAAAAAAAAAAAAAAAA")
      let permissions = JSON.parse(localStorage.getItem("userPermission"));
      if(permissions==null||permissions.length==0){
        this.footerArr[0] = {elType: 1, index: '/home', text: '首页', className: 'el-icon-footer_1',display:true};
        this.footerArr[1] = {elType: 2, index: '/focus', text: '关注', className: 'el-icon-bell',display:true};
        this.footerArr[2] = {elType: 3, index: '/mine', text: '设置', className: 'el-icon-setting',display:true}
      }else{
        var m=0;
        for(let i=0;i<permissions.length;i++){
          if(permissions[i].PRIVID=='workFlow_business_statistics'){
            m++;
          }  
        }
        if(m!=0){
          this.footerArr[0] = {elType: 1, index: '/home', text: '首页', className: 'el-icon-footer_1',display:true};
          this.footerArr[1] = {elType: 2, index: '/focus', text: '关注', className: 'el-icon-bell',display:true};
          this.footerArr[2] = {elType: 3, index: '/workBench', text: '管理舱', className: 'el-icon-menu',display:false};
          this.footerArr[3] = {elType: 4, index: '/mine', text: '设置', className: 'el-icon-setting',display:true}
        }else{
          this.footerArr[0] = {elType: 1, index: '/home', text: '首页', className: 'el-icon-footer_1',display:true};
          this.footerArr[1] = {elType: 2, index: '/focus', text: '关注', className: 'el-icon-bell',display:true};
          this.footerArr[2] = {elType: 3, index: '/mine', text: '设置', className: 'el-icon-setting',display:true}
        }
      }
      return this.footerArr
    },
    select (index, indexPath, e) {   
      console.log(this.footerArr)
      localStorage.setItem('footerSelectObj', index.split('/')[1])
      let path = localStorage.getItem('footerSelectObj') || JSON.stringify({})
      this.$router.push({path: '/' + path})
    }
  },

}
</script>

<style>
  .footerSelect{display: flex;position: fixed; bottom: 0; left: 0; right: 0; z-index: 999; width: 100%; height: 0.45rem; box-shadow: 0 -0.01rem 0.02rem 0 #d9d9d9}
  .footerSelect .el-menu-item, .el-submenu__title{height: 0.45rem!important;}
  .footerSelect .el-menu--horizontal{width: 100%; padding: 0 0.1rem;}
  .footerSelect .el-menu--horizontal>.el-menu-item{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; border: none;width: 25%; text-align: center; padding: 0; color: #8a8a8a!important; background: #ffffff!important; font-size: 0.1rem;}
  .footerSelect .el-menu--horizontal>.el-menu-item span{line-height: 0.2rem!important;}
  .footerSelect .el-menu--horizontal>.el-menu-item.is-active{border: none; color: #2698d6!important; background: #ffffff!important;}
  .footerSelect .el-menu--horizontal>.el-menu-item i{display: inline-block; width: 0.22rem; height: 0.22rem; margin: auto; font-size: 0.24rem!important;}
  .footerSelect .el-menu--horizontal>.el-menu-item .workImg{width: 0.25rem; height: 0.25rem; margin: auto; position: absolute; top: -0rem; left: 50%; margin-left: -0.12rem}
</style>
