<template>
    <div class="bidListView">
        <header-last :title="bidListTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div class="bidListCell" v-for="item in bidList" :key="item.id">
                    <!-- <hr> -->
                <!-- <router-link :to="{name:'onsiteServiceInfo',query:{caseId:item.caseId,serviceId:item.serviceId,workId:item.workId,taskId:item.taskId,evaluateId:item.evaluateId,serviceType:item.serviceType}}"> -->
                    <div class="panel">
                        <div class="title">
                            <div>{{item.createdOn}}</div>
                            <div>{{item.code}}</div>
                        </div>
                    </div>
                    <div class="split"></div>
                    <ul class="tableTd">
                        <li>
                            <span class="tit">项目名称</span>  
                            <span style="color: #333333">{{item.projectName}}</span>
                        </li>
                        <li>
                            <span class="tit">事件类型</span>  
                            <span style="color: #333333">{{getCaseType(item.caseType)}}</span>
                        </li>
                        <li>
                            <span class="tit">事件描述</span>  
                            <span style="color: #333333">{{item.remark}}</span>
                        </li>
                        <li>
                            <span class="titpart">报价类型</span>  
                            <span style="color: #333333">{{choisePriceType(item.priceType)}}</span>
                        </li>  
                        <li>
                            <span class="titpart">报价人</span>  
                            <span style="color: #333333">{{choiseQuoterName(item)}}</span>
                        </li>  
                        <li>
                            <span class="titpart">销售确认人</span>  
                            <span style="color: #333333">{{item.saleQuoterName}}</span>
                        </li>
                        <li>
                            <span class="titpart">分摊报价人</span>  
                            <span style="color: #333333">{{item.productQuoterName}}</span>
                        </li>
                        <li>
                            <span class="tit">服务内容</span>  
                            <span style="color: #333333">{{item.serviceContent}}</span>
                        </li>
                        <div class="btns">
                            <el-row>
                                <router-link :to="{name:'bidDescriptView',query:{processinstId: item.processinstid, num: item.num, caseId: item.caseId, relate: relate, status: status}}">
                                    <!-- staffQuoterName: staffQuoterName, partsQuoterName: partsQuoterName, saleQuoterName: saleQuoterName, productQuoterName: productQuoterName -->
                                    <el-button type="primary">查看详情</el-button>
                                </router-link>
                                <router-link :to="{name:'bidPriceProgress',query:{caseId: item.caseId, num: item.num}}">
                                    <el-button type="primary">查看进展</el-button>
                                </router-link>
                            </el-row>
                        </div>
                    </ul>
            </div>
            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
        </div>
        <footer-home></footer-home>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
    name: "bid",
    components: {
        headerLast,
        loadingtmp,
        footerHome
    },
    data(){
        return{
            bidListTit: "单次报价列表",
            page:1,
            pageSize:10,
            busy:true,
            loadall: false,
            bidList:[],
            staffQuoterName: "",
            partsQuoterName: "",
            saleQuoterName: "",
            productQuoterName: "",

            relate: this.$route.query.relate,
            status: this.$route.query.status,
            
            

        }
    },

    activated(){
        console.log(this.$route.meta.savedPosition)
        if(!this.$route.meta.isUseCache){
            this.eventListArr = [];
            this.page =1;
            this.loadall =false;
            this.busy= false;
            this.loadMore();
        }
        this.$route.meta.isUseCache = false;
    },

    methods: {
        getBidList(){
            var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};
            var flag = this.page>1;
            if (this.relate=="deal"){
                fetch.get("?action=/once/queryOnceOpBid&STATUS=" + this.status,{}).then(res=>{  
                    console.log("status", res)
                    if(flag){
                        this.bidList = this.bidList.concat(res.data);
                    }else{
                        this.bidList = res.data;
                    }
                    if(0 == res.data.length || res.data.length<this.pageSize ){
                        this.busy = false;
                        this.loadall = true;
                    }
                    else{
                        this.busy = false;
                        this.page++
                    }
                })
            }else{
                fetch.get("?action=/once/queryOnceBidListO2O&STATUS=" + this.status,{}).then(res=>{  
                    console.log("status", res)
                    if(flag){
                        this.bidList = this.bidList.concat(res.datas);
                    }else{
                        this.bidList = res.datas;
                    }
                    if(0 == res.datas.length || res.datas.length<this.pageSize ){
                    this.busy = false;
                    this.loadall = true;
                    }
                    else{
                    this.busy = false;
                    this.page++
                    }
                })
            }
            
        },

        loadMore(){
            console.log(this.busy, this.loadall)
            if(this.busy || this.loadall)
                return;
            this.busy = true;
            setTimeout(() => {
                this.getBidList();
            }, 500);
        },

        getCaseType(typeId){
        
            let caseType = [{"dictID" : "1","dictName" : "故障"}, {"dictID" : "2","dictName" : "RMA"}, {"dictID" : "3","dictName" : "巡检"}, {"dictID" : "4","dictName" : "技术咨询"}, {"dictID" : "5","dictName" : "非故障技术支持"}];
            for (var i=0;i<caseType.length;i++){
                if (caseType[i]["dictID"]==typeId){
                    return caseType[i]["dictName"]
                } 
            }

        },
        choiseQuoterName(item){
            if (item.staffQuoterName==null){
                return item.partsQuoterName
            }
            else{
                return item.staffQuoterName
            }
        },
        choisePriceType(priceId){
            if (priceId==1){
                return "人员"
            }
            else if (priceId==2){
                return "备件"
            }
        }      
    },
    //在页面离开时记录滚动位置
    beforeRouteLeave (to, from, next) {
        if (to.name == 'bidDescriptView' ||to.name == 'bidPriceProgress') {
        this.scrollTop = document.querySelector('.content').scrollTop;
        console.log("scrollTop:",this.scrollTop)
        }   
        next();
    },
    //进入该页面时，用之前保存的滚动位置赋值
    beforeRouteEnter (to, from, next) {
        console.log("next:",next);
        next(vm => {
        console.log("vmvmvm",vm.scrollTop);
        document.querySelector('.content').scrollTop = vm.scrollTop
        })
    },

    
}
</script>

<style scoped>
    .bidListView{width: 100%;}
    .content{width: 100%; position: absolute; top: 0.45rem; bottom: 0.45rem; overflow: scroll;}
    .bidListCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-top: 0.05rem;}
    .tableTd li{display: flex; line-height: 0.2rem; color: #666666;}
    .tableTd span{text-align: center;}
    .tableTd span:nth-child(1){width: 30%; text-align: left;}
    .tableTd span:nth-child(2){width: 70%;text-align: left; display:inline-block; word-wrap: break-word;}
    .panel{height: 25px; line-height: 2;border-bottom: 0.01rem solid #dbdbdb}
    .title div:nth-child(1){float: left;}
    .title div:nth-child(2){float: right;}

    .tit{line-height: 0.25rem;color: #999999;}
    .titpart{line-height: 0.25rem;color: #999999;}

    .btns{text-align: right; padding: 20px 0px 0px}
    .btns >>> .el-button{line-height: 0;}
    .split{margin-top: 0.1rem}

    .content:nth-child(2n+1){background: #fafafa}

</style>

