<!--终极头部-->
<template>
  <header class="headerView">
    <div class="headerLeft " v-on:click="back"><i class="el-icon-arrow-left"></i></div>
    <h2>{{title}}</h2>
    <div class="headerRight"></div>
  </header>
</template>

<script>
export default {
  name: 'headerLast',

  data () {
    return {
      
    }
  },
  props: ['title','backUrl','date1','date2'],

  watch: {
  },

  created () {
  },

  methods: {

    back: function (event) {
      console.log("in back");
      if(this.backUrl&&this.backUrl.length>0){
        console.log("route backurl");
        this.$router.push({name:this.backUrl,query:{date1:this.date1,date2:this.date2}});       
      }else{
        this.$router.back(-1);
      }
    }
  }
}
</script>

<style scoped>
  .headerView{position:fixed; top: 0; left: 0; right: 0; z-index: 999;display: flex; justify-content: space-between; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
  h2{display: flex; background: #2698d6;font-size: 0.16rem;}
  .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem; font-size: 0.14rem;}
  .headerLeft i{font-size: 0.2rem;}
</style>
