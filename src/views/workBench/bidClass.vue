<template>
    <div class="bidClassView">
        <header-last :title="bidClassTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="myrepaire">待我处理的报价</div>
        <ul class="ul_myView"  v-for="item in form.mydeal" :key="item.id">
            <router-link :to="{name:'bid',query:{relate: 'deal', status: item.status}}">
                <li class="li_myView">
                        <template>
                            <img :src="require('@/assets/images/mydeal32.png')" alt="">
                            <span>{{item.key+'('+item.num+')'}}</span>
                            <i class="el-icon-arrow-right"></i>
                        </template>
                </li>
            </router-link>
        </ul>
        <div class="myrepaire">与我有关的报价</div>
        <ul class="ul_myView"  v-for="item in form.myrelate" :key="item.id">
            <router-link :to="{name:'bid',query:{relate: 'relate', status: item.status}}">
                <li class="li_myView">
                        <template>
                            <img :src="require('@/assets/images/myrelate32.png')" alt="">
                            <span>{{item.key+'('+item.num+')'}}</span>
                            <i class="el-icon-arrow-right"></i>
                        </template>
                </li>
            </router-link>
        </ul>
        <div style="height:0.45rem"></div>
        <footer-home></footer-home>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
    name: 'bidClass',
    components: {
        headerLast,
        footerHome   
    },
    data(){
        return{
            form: {
                
                mydeal: [
                    {key: "待报价", num: "0", status: "2"},
                    {key: "待销售确认", num: "0", status: "3"},
                    {key: "待分摊确认", num: "0", status: "7"},
                ],
                
                myrelate: [
                    {key: "待报价", num: "0", status: "2"},
                    {key: "待产品经理审核", num: "0", status: "9"},
                    {key: "待销售确认", num: "0", status: "3"},
                    {key: "待分摊确认", num: "0", status: "7"},
                    {key: "已完成", num: "0", status: "6"},
                    {key: "其他", num: "0", status: "1"},
                ]
            },
            bidClassTit: "我的报价列表",
        }
    },
    created:function(){
        const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
        });
        fetch.get("?action=/once/QueryMyBidCount",{}).then(res=>{ 
            console.log("opNum", res)
            loading.close();
            if(res.STATUSCODE=="0"){
                this.$message({
                    message:'加载完毕',
                    type: 'success',
                    center: true,
                    duration:1000,
                    customClass: 'msgdefine'
                });
            };
            let opNum = "opNum"
            for (var i=1;i<this.form.mydeal.length+1;i++){
                this.form.mydeal[i-1].num = res[opNum+i]
            }
            this.form.myrelate[0].num = res.pendingfirmed
            this.form.myrelate[1].num = res.reviewefirm
            this.form.myrelate[2].num = res.saleconfirm
            this.form.myrelate[3].num = res.productconfirm
            this.form.myrelate[4].num = res.confirmed
            this.form.myrelate[5].num = res.unConfirmed
        });
    },
}
</script>

<style scoped>
.bidClassView{overflow: auto}
.ul_myView .li_myView{display: flex; justify-content: space-between; align-items: center;height: 0.5rem; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0 0.2rem;}
.ul_myView .li_myView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
.ul_myView .li_myView span{width: 100%; text-align: left; color: #262626}
.myrepaire{position: relative; line-height: 0.45rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.myrepaire::before{position: absolute; top: 0.15rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.myrepaire::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
</style>

