<template>
    <div class="workBenchPOPayDetailView">
        <header-last :title="workBenchPOPayDetailTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="workBenchPOPayDetailContent">
            <div class="cell">
                <ul>
                    <li v-for="item in workBenchPOPayDetailObj" :key="item.id">
                        <p>{{item.leftTit}}</p><p v-html="item.rightCon"></p>
                    </li>
                </ul>
            </div>
        </div>
        <footer-home></footer-home>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
    name: 'workBenchPOPayDetail',
    components: {
        headerLast,
        footerHome
    },
    data () {
        return{
            workBenchPOPayDetailTit: 'PO支付详情',
            payPlanId:this.$route.query.payPlanId,
            workBenchPOPayDetailObj:[
                {leftTit: '', rightCon: ''},
                {leftTit: '', rightCon: ''},
                {leftTit: '', rightCon: ''},
                {leftTit: '', rightCon: ''},
                {leftTit: '', rightCon: ''},
                {leftTit: '', rightCon: ''},
                {leftTit: '', rightCon: ''},
                {leftTit: '', rightCon: ''},
                {leftTit: '', rightCon: ''},
                {leftTit: '', rightCon: ''},
                {leftTit: '', rightCon: ''}
            ]
        }
    },
    created(){
        fetch.get("?action=/po/GetPODetail&TYPE="+this.$route.query.type+"&PAYPLAN_ID="+this.$route.query.payPlanId,{}).then(res=>{
            console.log("GetPODetail",res);
            for(let i=0;i<res.data.length;i++){
                this.workBenchPOPayDetailObj[0].leftTit = '计划编号：';
                this.workBenchPOPayDetailObj[0].rightCon = res.data[i].PAYPLAN_ID;
                if(this.$route.query.type == '1'){
                    this.workBenchPOPayDetailObj[1].leftTit = '姓名：';
                }else{
                    this.workBenchPOPayDetailObj[1].leftTit = '供应商：';
                }
                this.workBenchPOPayDetailObj[1].rightCon = res.data[i].SUPPLIER_NAME;
                this.workBenchPOPayDetailObj[2].leftTit = "类型：";
                if(this.$route.query.type=='1'){
                    this.workBenchPOPayDetailObj[2].rightCon = "人员";
                }else{
                    this.workBenchPOPayDetailObj[2].rightCon = "备件";
                }
                this.workBenchPOPayDetailObj[3].leftTit = "业务方向：";
                this.workBenchPOPayDetailObj[3].rightCon = res.data[i].BUSINESS;
                this.workBenchPOPayDetailObj[4].leftTit = "区域：";
                this.workBenchPOPayDetailObj[4].rightCon = res.data[i].AREA_NAME;
                this.workBenchPOPayDetailObj[5].leftTit = "制作者：";
                this.workBenchPOPayDetailObj[5].rightCon = res.data[i].PAYPLAN_OWNER;
                this.workBenchPOPayDetailObj[6].leftTit = "审批日期：";
                this.workBenchPOPayDetailObj[6].rightCon = res.data[i].APPROVE_DATE;
                this.workBenchPOPayDetailObj[7].leftTit = "支付金额：";
                this.workBenchPOPayDetailObj[7].rightCon = res.data[i].TOTALAMOUNT;
                this.workBenchPOPayDetailObj[8].leftTit = "预计支付：";
                this.workBenchPOPayDetailObj[8].rightCon = res.data[i].PAYPLAN_DATE;
                this.workBenchPOPayDetailObj[9].leftTit = "实际支付：";
                this.workBenchPOPayDetailObj[9].rightCon = res.data[i].PAYPLAN_ACTUALDATE;
                this.workBenchPOPayDetailObj[10].leftTit = "说明：";
                this.workBenchPOPayDetailObj[10].rightCon = res.data[i].REMARK;
            }
        });
    }
    
}
</script>

<style scoped>
  .workBenchPOStaffView{width: 100%;}
  .workBenchPOPayDetailContent{width: 100%; margin-top: 0.05rem; bottom:0.45rem;color: #999999; background: #ffffff;overflow: scroll}
  .workBenchPOPayDetailContent .title{line-height: 0.35rem; color: #2698d6; padding-left: 0.25rem; position: relative;}
  .workBenchPOPayDetailContent .title:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.11rem; background: #2698d6;}
  .workBenchPOPayDetailContent ul li{padding: 0 0.25rem;}
  .workBenchPOPayDetailContent ul li{display: flex; line-height: 0.35rem;}
  .workBenchPOPayDetailContent ul li:nth-child(2n+1){color: #999999;background: #ffffff;}
  .workBenchPOPayDetailContent ul li:nth-child(2n){color: #999999;background: #f7f7f7;}
  .workBenchPOPayDetailContent ul li p:nth-child(1){width: 0.91rem;}
  .workBenchPOPayDetailContent ul li p:nth-child(2){width: 66%;word-wrap: break-word;}
</style>



  