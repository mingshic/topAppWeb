<template>
    <div class="workBenchSupplierDetailView">
        <header-last :title="workBenchSupplierDetailTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="workBenchSupplierDetailContent">
            <div class="cell">
                <ul>
                    <li v-for="item in workBenchSupplierDetailObj" :key="item.id">
                        <p>{{item.leftTit}}</p><p v-html="item.rightCon"></p>
                    </li>
                </ul>
            </div>
        </div>
        <div style="height:0.45rem"></div>
        <footer-home></footer-home>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
    name: 'workBenchSupplierDetail',
    components: {
        headerLast,
        footerHome
    },
    data(){
        return{
            workBenchSupplierDetailTit:'供应商详情',
            workBenchSupplierDetailObj:[
                {leftTit: '供应商编号：', rightCon: ''},
                {leftTit: '供应商全称：', rightCon: ''},
                {leftTit: '联系人：', rightCon: ''},
                {leftTit: '联系方式：', rightCon: ''},
                {leftTit: '是否认证：', rightCon: ''},
                {leftTit: '人员级别：', rightCon: ''},
                {leftTit: '备件级别：', rightCon: ''},
                {leftTit: '人员积分：', rightCon: ''},
                {leftTit: '备件积分：', rightCon: ''},
                {leftTit: '状态：', rightCon: ''}
            ]
        }
    },
    created(){
        fetch.get("?action=/supplier/GetSupplierDetail&SUPPLIER_ID="+this.$route.query.supplierId,{}).then(res=>{
            console.log("GetSupplierDetail",res);
            for(let i=0;i<res.data.length;i++){
                this.workBenchSupplierDetailObj[0].rightCon = res.data[i].SUPPLIER_CD;
                this.workBenchSupplierDetailObj[1].rightCon = res.data[i].SUPPLIER_NAME;
                this.workBenchSupplierDetailObj[2].rightCon = res.data[i].REALNAME;
                this.workBenchSupplierDetailObj[3].rightCon = res.data[i].MOBILE;
                this.workBenchSupplierDetailObj[4].rightCon = res.data[i].IF_AUTH;
                this.workBenchSupplierDetailObj[5].rightCon = res.data[i].USER_LEVEL;
                this.workBenchSupplierDetailObj[6].rightCon = res.data[i].PART_LEVEL;
                this.workBenchSupplierDetailObj[7].rightCon = res.data[i].SUPPLIER_GRADE;
                this.workBenchSupplierDetailObj[8].rightCon = res.data[i].PART_GRADE;
                this.workBenchSupplierDetailObj[9].rightCon = res.data[i].APPROVE_STATUS_NAME;
            }
        });
    }
}
</script>
<style scoped>
.workBenchSupplierDetailView{width: 100%;}
.workBenchSupplierDetailContent{width: 100%; margin-top: 0.05rem; color: #999999; background: #ffffff;overflow: scroll}
.workBenchSupplierDetailContent .title{line-height: 0.35rem; color: #2698d6; padding-left: 0.25rem; position: relative;}
.workBenchSupplierDetailContent .title:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.11rem; background: #2698d6;}
.workBenchSupplierDetailContent ul li{padding: 0 0.25rem;}
.workBenchSupplierDetailContent ul li{display: flex; line-height: 0.35rem;}
.workBenchSupplierDetailContent ul li:nth-child(2n+1){color: #999999;background: #ffffff;}
.workBenchSupplierDetailContent ul li:nth-child(2n){color: #999999;background: #f7f7f7;}
.workBenchSupplierDetailContent ul li p:nth-child(1){width: 0.91rem;}
.workBenchSupplierDetailContent ul li p:nth-child(2){width: 66%;word-wrap: break-word;}
</style>

