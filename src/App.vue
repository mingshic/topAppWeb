<template>
  <!-- <div id="app">
    <keep-alive>      
        <router-view v-if="$route.meta.keepAlive"/>    
    </keep-alive>    
    <router-view v-if="!$route.meta.keepAlive"/>

  </div> -->
  <div id="app"  >
    <v-touch v-on:swiperight="onSwipeRight"  v-bind:swipe-options="{ direction: 'right',threshold: 100  }" class="touchwrap" style=" ">
      <keep-alive>      
          <router-view v-if="$route.meta.keepAlive"/>    
      </keep-alive>    
      <router-view v-if="!$route.meta.keepAlive"/>
    </v-touch>
  </div>

</template>

<style scoped>
  #app{
    width: 100%;
    height: 100%;
  }
  .touchwrap{
    height:100%; touch-action: pan-y!important;
    height:100%;
  }

</style>

<script>
var curComponent;
export default {
  name: 'App',
  data(){
    return {
      transitionName: "slide-left"
    }
  },

  methods: {
    setComponent: function (component) {
        //console.log("setComponent");
        curComponent = component;
    },
    onSwipeRight: function(){
      window.routeback();
    }
  },
  mounted(){
    window.routeback = () =>{
      if(["home","focus","workBench","mine"].indexOf(this.$route.name)>-1){
        if(typeof(android)!="undefined"){
          if(sessionStorage.backTime && (new Date()).getTime()- parseInt(sessionStorage.backTime) <1500  ){
            console.log((new Date()).getTime()- parseInt(sessionStorage.backTime))
            sessionStorage.backTime = ''
            android.Finish();
          }
          else{
            this.$toast('再按一次退出')
            sessionStorage.backTime = (new Date()).getTime()
          }
        }
      }
      else{
        this.$router.back(-1)
      }
      
    }
  }
}
window["receiveMsgFromNative"] = function (msg) {
  var value = "{action:receiveMsgFromNative}";
  android.getClient(value);
  curComponent.receiveMsgFromParent(msg);
}

</script>
