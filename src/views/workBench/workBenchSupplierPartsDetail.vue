<template>
    <div class="workBenchSupplierPartsDetailView">
        <header-last :title="workBenchSupplierPartsDetailTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="workBenchSupplierPartsDetailContent">
            <div class="cell">
                <ul>
                    <li v-for="item in workBenchSupplierPartsDetailObj" :key="item.id">
                        <p>{{item.leftTit}}</p><p v-html="item.rightCon"></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name: 'workBenchSupplierPartsDetail',
    components: {
        headerLast
    },
    data(){
        return{
            workBenchSupplierPartsDetailTit:"备件详情",
            workBenchSupplierPartsDetailObj:[
                {leftTit: '供应商：', rightCon: ''},
                {leftTit: '厂商：', rightCon: ''},
                {leftTit: '备件类型：', rightCon: ''},
                {leftTit: '备件描述：', rightCon: ''},
                {leftTit: 'PN：', rightCon: ''},
                {leftTit: '数量：', rightCon: ''},
                {leftTit: '地域：', rightCon: ''},
                {leftTit: '库房名称：', rightCon: ''},
                {leftTit: '入库时间：', rightCon: ''}
            ]
        } 
    },
    created(){
        fetch.get("?action=/parts/GetSupplierPartsDetail&SINGLEPART_ID="+this.$route.query.singlePartId,{}).then(res=>{
            console.log("GetPODetail",res);
            for(let i=0;i<res.data.length;i++){
                this.workBenchSupplierPartsDetailObj[0].rightCon = res.data[i].SUPPLIER_NAME;
                this.workBenchSupplierPartsDetailObj[1].rightCon = res.data[i].FACTORY_NM;
                this.workBenchSupplierPartsDetailObj[2].rightCon = res.data[i].PARTS_TYPE_NAME;
                this.workBenchSupplierPartsDetailObj[3].rightCon = res.data[i].PART_DESCRIBE;
                this.workBenchSupplierPartsDetailObj[4].rightCon = res.data[i].PN;
                this.workBenchSupplierPartsDetailObj[5].rightCon = res.data[i].PART_NUMBER;
                this.workBenchSupplierPartsDetailObj[6].rightCon = res.data[i].PARENT_AREA_NAME;
                this.workBenchSupplierPartsDetailObj[7].rightCon = res.data[i].STOREHOUSE_NAME;
                this.workBenchSupplierPartsDetailObj[8].rightCon = res.data[i].INSTOCK_ON;
            }
        });
    }
}
</script>
<style scoped>
  .workBenchSupplierPartsDetailView{width: 100%;}
  .workBenchSupplierPartsDetailContent{width: 100%; margin-top: 0.05rem; color: #999999; background: #ffffff;}
  .workBenchSupplierPartsDetailContent .title{line-height: 0.35rem; color: #2698d6; padding-left: 0.25rem; position: relative;}
  .workBenchSupplierPartsDetailContent .title:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.11rem; background: #2698d6;}
  .workBenchSupplierPartsDetailContent ul li{padding: 0 0.25rem;}
  .workBenchSupplierPartsDetailContent ul li{display: flex; line-height: 0.25rem;}
  .workBenchSupplierPartsDetailContent ul li:nth-child(2n+1){color: #999999;background: #ffffff;}
  .workBenchSupplierPartsDetailContent ul li:nth-child(2n){color: #999999;background: #f7f7f7;}
  .workBenchSupplierPartsDetailContent ul li p:nth-child(1){width: 0.91rem;}
  .workBenchSupplierPartsDetailContent ul li p:nth-child(2){width: 66%;word-wrap: break-word;}
</style>

