<template>
  <div class="applicationEventProgress">
    <header-last :title="bidProgressTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="bidProgressTabs" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <el-collapse v-model="activeName" v-for="item in bidProgressObj" :key="item.id">
            <el-collapse-item :name="item.sortName">
                <template slot="title">
                    <img class="titleImg" :src="require('@/assets/images/ok.png')" alt="">{{item.createOn}}
                </template>
                <template>
                    <p><span>{{item.realname}}</span><span>{{item.logContent}}</span></p>
                </template>
            </el-collapse-item>
        </el-collapse>
        <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
    </div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
import HeaderLast from "../header/headerLast";
import loadingtmp from '@/components/load/loading';
import footerHome from '../footer/footerHome'
export default {
    name: 'applicationEventProgress',

    components: {
        HeaderLast,
        loadingtmp,
        footerHome
    },

    data () {
        return {
            bidProgressTit:"单次报价进展",
            activeName: 1,
            caseId: this.$route.query.caseId,
            num: this.$route.query.num,
            page:1,
            pageSize:10,
            busy:false,
            loadall: false,
            bidProgressObj: [],
        }
    },
    activated(){
        console.log(this.$route.meta.isUseCache);
        if(!this.$route.meta.isUseCache){
            this.busy= false;
            this.loadall= false;
            this.page =1;    
            this.loadMore();
        }
        this.$route.meta.isUseCache = false;
    },
    methods:{
        getEventList(){
            var flag = this.page>1;
            let params ='&caseId='+this.caseId+'&num='+this.num+"&PAGE_NUM="+this.page+"&PAGE_TOTAL="+this.pageSize;
            fetch.get("?action=/once/queryProcessLogForCaseOnce",params).then(res => {
                console.log(res);
                if(flag){
                    this.bidProgressObj = this.bidProgressObj.concat(res.datas).reverse();
                }else{
                    this.bidProgressObj = res.datas.reverse();
                }
                if(0 == res.datas.length || res.datas.length<this.pageSize){
                    this.busy = true;
                    this.loadall = true;
                }
                else{
                    this.busy = false;
                    this.page++
                }
                for (var i=0;i<this.bidProgressObj.length;i++){
                    this.bidProgressObj[i].sortName = Number(i+1)
                }
            });
        },
        loadMore:function(){
            this.busy = true;
            console.log("loadMore");
            setTimeout(() => {
                this.getEventList();
            }, 500);
        },
    },
    beforeRouteLeave( to, from,next){
        if (to.name == 'bid') {
            to.meta.isUseCache = true;    
        }        
        next();
    }
}
</script>
<style scoped>
  /* .applicationEventProgress{margin: 0 0; background: #ffffff;position:fixed} */
  .bidProgressTabs{padding: 0 0.25rem;background: #ffffff; width: 86%; position: absolute; top: 0.45rem; bottom: 0.45rem;overflow-y: auto}
  /* .bidProgressTabs{background: #ffffff;width:100%;position: relative;padding: 0 0.25rem; bottom: 0;overflow: scroll} */
  .bidProgressTabs:before{position: absolute; top: 0; left: 0.34rem; width: 0.02rem; height: 100%; bottom: 0; background: #999999; content: '';}
  .bidProgressTabs .titleImg{width: 0.2rem; height: 0.2rem;position: absolute; top: 0.15rem; left: -0.43rem;background: white}
  .bidProgressTabs >>> .el-collapse-item__header{color: #2698d6; font-size: 0.16rem; font-weight: bold; margin: 0 0 0.1rem 0.43rem; border: none; position: relative}
  .bidProgressTabs >>> .el-collapse-item__arrow{color: #2698d6; font-size: 0.2rem; border: none}
  .bidProgressTabs >>> .el-collapse-item__wrap{border: none}
  .bidProgressTabs >>> .el-collapse{border: none}
  .bidProgressTabs >>> .el-collapse-item__content{margin-left: 0.43rem; padding: 0;}
  .bidProgressTabs >>> .el-collapse-item__content span{font-size: 0.1rem}
  .bidProgressTabs >>> .el-collapse-item__content p{font-size: 0.13rem}
  /* .eventProgressDesc{margin-bottom: 0.15rem;}
  .eventProgressDesc span{position: relative;}
  .eventProgressDesc span:before{position: absolute; top: 0.15rem; left: -0.39rem; width: 0.12rem; height: 0.12rem; background: #999999; content: ''; border-radius: 50%;} */
</style>