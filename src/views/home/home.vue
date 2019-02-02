<!--工作台-->
<template>
  <div class="homeView">
    <div class="swiper">
      <el-carousel trigger="click" arrow="never" width="100%" height="1.2rem">
        <el-carousel-item v-for="item in imgObj" :key="item.id">
          <img :src="item.imgSrc" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="text-align:center;margin-top:0.1rem" v-for="items in workBenchObj" :key="items.id" >
      <div v-if="items.arr.length!=0">
        <ul class="ul_workBench" >
            <template v-for="item in items.arr">
              <li class="li_workBench" :key="item.id">
                <router-link :to="{name:item.href,params:item.params}" >
                  <img  :src="item.imgSrc" alt="">
                </router-link>
                <span>{{item.text}}</span>
              </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
export default {
  name: 'workBench',

  components: {
  },

  data () {
    return {
      imgObj: [
        {imgSrc: require('@/assets/images/swiper_1.jpg')},
        {imgSrc: require('@/assets/images/swiper_2.jpg')},
        {imgSrc: require('@/assets/images/swiper_3.jpg')},
        {imgSrc: require('@/assets/images/swiper_4.jpg')},
        {imgSrc: require('@/assets/images/swiper_5.jpg')}
      ],
      workBenchObj: [
        {arr: []},
        {arr: []},
        {arr: []}
      ]
    }
  },
  activated(){
    // console.log(this.$route.meta.isUseCache);
    this.workBenchObj = [
        {arr: []},
        {arr: []},
        {arr: []}
    ];
    this.getWorkBenchObj();  
  },
  created(){
    this.getWorkBenchObj();
  },
  methods: {
    getWorkBenchObj(){
      let permissions = JSON.parse(localStorage.getItem("userPermission"));
      var m=0;
      var n=0;
      for(let i=0;i<permissions.length;i++){
        if(permissions[i].PRIVID=='workFlow_my_task'){
          m++;
        }
        if(permissions[i].PRIVID=='workFlow_case_once'){
          n++;
        }
      }
      if(m!=0){
        this.workBenchObj[0].arr[0] = {imgSrc: require('@/assets/images/my_1.png'), text: '我的任务', href: 'workBenchMyTask',params: {type: 'my'},display:false};
        this.workBenchObj[0].arr[1] = {imgSrc: require('@/assets/images/my_2.png'), text: '我的事件', href: 'workBenchMyEvent',params: {type: 'my'},display:true};
        this.workBenchObj[0].arr[2] = {imgSrc: require('@/assets/images/my_3.png'), text: '我的项目', href: 'workBenchMyPro',params: {type: 'my'},display:true};
        if(n!=0){
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_4.png'), text: '单次报价', href: 'bidClass', params: {type: 'my'},display:false};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计',href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[1] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉', href: 'tabshowTest',params: {type: 'my'},display:true};
        }else{
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计', href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉', href: 'tabshowTest',params: {type: 'my'},display:true};
        }
      }else{
        this.workBenchObj[0].arr[0] = {imgSrc: require('@/assets/images/my_2.png'), text: '我的事件', href: 'workBenchMyEvent',params: {type: 'my'},display:true};
        this.workBenchObj[0].arr[1] = {imgSrc: require('@/assets/images/my_3.png'), text: '我的项目', href: 'workBenchMyPro',params: {type: 'my'},display:true};
        if(n!=0){
          this.workBenchObj[0].arr[2] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_4.png'), text: '单次报价', href: 'bidClass', params: {type: 'my'},display:false};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计',href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr[0] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉', href: 'tabshowTest',params: {type: 'my'},display:true};
        }else{
          this.workBenchObj[0].arr[2] = {imgSrc: require('@/assets/images/my_5.png'), text: '事件总览', href: 'workBenchMyEventAll', params: {type: 'all'},display:true},
          this.workBenchObj[1].arr[0] = {imgSrc: require('@/assets/images/my_6.png'), text: '项目总览', href: 'workBenchMyProAll', params: {type: 'all'},display:true};
          this.workBenchObj[1].arr[1] = {imgSrc: require('@/assets/images/my_8.png'), text: '报表统计',href: 'reportBusinessForm',params: {type: 'my'},display:true};
          this.workBenchObj[1].arr[2] = {imgSrc: require('@/assets/images/my_7.png'), text: '意见投诉', href: 'tabshowTest',params: {type: 'my'},display:true};
          this.workBenchObj[2].arr = []
        }
      }
    },
  },

  beforeCreate:function(){
    this.$router.replace(location);
    
    history.pushState(null, null, document.url);
    window.onpopstate = () => {
      history.go(1)
    }
  },
  deactivated(){
    console.log('移除');
    window.onpopstate = null
  }
}
</script>

<style scoped>
  .homeView{ width: 100%;}
  .swiper >>> .el-carousel__button{width: 0.08rem; height: 0.08rem; border-radius: 100%;}
  .swiper >>> .el-carousel__indicator.is-active button{background: #199dff}
  .swiper img{width: 100%; height: 100%}
  .homeView .ul_workBench{display: flex;flex-wrap: wrap; padding: 0.15rem 0.1rem; margin-top: 0.09rem; background: #ffffff;font-size: 0.15rem}
  .homeView .ul_workBench:first-child .li_workBench:first-child span{width: 110%; margin-left: -5%;}
  .homeView .ul_workBench .li_workBench{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; width: 33%; height: 0.55rem; text-align: center;}
  .homeView .ul_workBench .li_workBench:nth-child(n+5){margin-top: 0.15rem;}
  .ul_workBench img{ width: 0.3rem; height: 0.3rem; margin: auto;}
  /* .homeView .newInfo{display:flex;margin-top: 0.15rem;background:#ffffff}
  .homeView .newInfo .newImg{width:20%;text-align: center;}
  .homeView .newInfo img{width: 0.6rem; height: 0.6rem; border-radius: 50%; } */
  /* .workBenchView .newInfo .newImg img{height:100%;width: 100%;} */
  /* .homeView .ul_mineView{}
  .homeView .ul_mineView .li_mineView{display: flex; justify-content: space-between; align-items: center;height: 100%; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.2rem; padding: 0.05rem 0.2rem;}
  .homeView .ul_mineView .li_mineView:nth-child(4){margin-top: 0.1rem; border-top: 0.01rem solid #e5e5e5;}
  .homeView .ul_mineView .li_mineView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
  .homeView .ul_mineView .li_mineView span{width: 100%; text-align: left; color: #262626;} */
  .homeView .ul_mineView .li_mineView span{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
  }
</style>
