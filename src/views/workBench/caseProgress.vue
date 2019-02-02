<template>
  <div class="applicationEventProgress">
    <header-last :title="eventProgressTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="EventProgressTabs" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <el-collapse v-model="activeName" v-for="items in eventProgressObj['caseProgress']" :key="items.id">
            <el-collapse-item :name="items.id">
                <template slot="title">
                    <img class="titleImg" :src="eventProgressObj['imgSrc']" alt="">{{items.dealDate}}
                </template>
                <template>
                    <!-- <div v-for="item in items.desc" :key="item.id" class="eventProgressDesc"> -->
                        <!-- <div style="display:flex">
                            <span>{{item.info}}</span>
                            <p style="margin-left:0.2rem;font-size: 0.1rem">{{item.time}}</p>
                        </div> -->
                        <p><span>{{items.realname}}</span><span>{{items.remark}}</span></p>
                    <!-- </div> -->
                </template>
            </el-collapse-item>
        </el-collapse>
        <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
    </div>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
import HeaderLast from "../header/headerLast";
import loadingtmp from '@/components/load/loading';
export default {
  name: 'applicationEventProgress',

  components: {
      HeaderLast,
        loadingtmp,
  },

  data () {
    return {
        eventProgressTit:"单次事件进展",
        activeName:1,
        CASE_ID:this.$route.query.CASE_ID,
        page:1,
      pageSize:10,
      busy:false,
      loadall: false,
        eventProgressObj: 
            {imgSrc:require('@/assets/images/ok.png'),
            caseProgress:[]}
            // {title: '2016-09-09 12:23:23', name: '1',imgSrc: require('@/assets/images/ok.png'),  desc: "测试测试测试测试"},
            // {title: '2016-09-09 12:23:23', name: '2',imgSrc: require('@/assets/images/ok.png'), desc: "16-09-09 12:23:23'}, {info: '提交分析诊断记录', time: '2016-09-09 12:23:23'}]"},
            // {title: '2016-09-09 12:23:23', name: '3', imgSrc: require('@/assets/images/ok.png'), desc: "ppppppppppppppppppppp"}
    }
  },
  activated(){
        console.log(this.$route.meta.isUseCache);
        if(!this.$route.meta.isUseCache){
        this.eventProgressObj['caseProgress'] = [];
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
      let params ='&caseId='+this.CASE_ID+"&PAGE_NUM="+this.page+"&PAGE_TOTAL="+this.pageSize;
      console.log(params);
      fetch.get("?action=/once/queryCaseRecord",params).then(res => {
        console.log(res);
        // baseinfo=res.caseRecords;
        // this.totalData = res.total;
        if(flag){
            // console.log(baseinfo);
          this.eventProgressObj['caseProgress'] =this.eventProgressObj['caseProgress'].concat(res.caseRecords);
        }else{
            // console.log("Nnnnn"+baseinfo);
          this.eventProgressObj['caseProgress'] = res.caseRecords;
        }
        if(0 == res.caseRecords.length){
          this.busy = true;
          this.loadall = true;
        }
        else{
          this.busy = false;
          this.page++
        }
        for(var i=0;i<this.eventProgressObj['caseProgress'].length;i++){
          this.eventProgressObj['caseProgress'][i].id=i+1
        }
        console.log(this.eventProgressObj)
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
  created:function(){
    //   fetch.get("?action=/once/queryCaseRecord&caseId="+this.CASE_ID).then(res => {
    //         console.log(res);
    //         let baseinfo = res.caseRecords;
    //         // baseinfo.forEach(function)
    //         // baseinfo.forEach(function(v,i,ar){
                 
	// 		// 	});
    //         this.eventProgressObj['caseProgress']=res.caseRecords;
    //         console.log(this.eventProgressObj)
    //     })
  },
}
  </script>
  <style scoped>
  /* .applicationEventProgress{margin: 0 0; background: #ffffff;position:fixed} */
  .EventProgressTabs{padding: 0 0.25rem;background: #ffffff; width: 86%; position: absolute; top: 0.45rem; bottom: 0;overflow-y: auto}
  /* .EventProgressTabs{background: #ffffff;width:100%;position: relative;padding: 0 0.25rem; bottom: 0;overflow: scroll} */
  .EventProgressTabs:before{position: absolute; top: 0; left: 0.34rem; width: 0.02rem; height: 100%; bottom: 0; background: #999999; content: '';}
  .EventProgressTabs .titleImg{width: 0.2rem; height: 0.2rem;position: absolute; top: 0.15rem; left: -0.43rem;background: white}
  .EventProgressTabs >>> .el-collapse-item__header{color: #2698d6; font-size: 0.16rem; font-weight: bold; margin: 0 0 0.1rem 0.43rem; border: none; position: relative}
  .EventProgressTabs >>> .el-collapse-item__arrow{color: #2698d6; font-size: 0.2rem; border: none}
  .EventProgressTabs >>> .el-collapse-item__wrap{border: none}
  .EventProgressTabs >>> .el-collapse{border: none}
  .EventProgressTabs >>> .el-collapse-item__content{margin-left: 0.43rem; padding: 0;}
  .EventProgressTabs >>> .el-collapse-item__content span{font-size: 0.1rem}
  .EventProgressTabs >>> .el-collapse-item__content p{font-size: 0.13rem}
  .eventProgressDesc{margin-bottom: 0.15rem;}
  .eventProgressDesc span{position: relative;}
  .eventProgressDesc span:before{position: absolute; top: 0.15rem; left: -0.39rem; width: 0.12rem; height: 0.12rem; background: #999999; content: ''; border-radius: 50%;}
</style>
    