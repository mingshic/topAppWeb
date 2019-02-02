<template>
    <div class="workBenchOwnPartsDetailView">
        <header-last :title="workBenchOwnPartsDetailTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="workBenchOwnPartsDetailContent">
            <div class="cell">
                <ul>
                    <li v-for="item in workBenchOwnPartsDetailObj" :key="item.id">
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
    name: 'workBenchOwnPartsDetail',
    components: {
        headerLast,
        footerHome
    },
    data(){
        return{
            workBenchOwnPartsDetailTit:"备件详情",
            workBenchOwnPartsDetailObj:[
                {leftTit: '入库单号：', rightCon: ''},
                {leftTit: '入库类型：', rightCon: ''},
                {leftTit: '厂商：', rightCon: ''},
                {leftTit: '设备型号：', rightCon: ''},
                {leftTit: '备件类型：', rightCon: ''},
                {leftTit: '备件描述：', rightCon: ''},
                {leftTit: 'FRU/PN：', rightCon: ''},
                {leftTit: '数量：', rightCon: ''},
                {leftTit: '金额：', rightCon: ''},
                {leftTit: '入库时间：', rightCon: ''},
                {leftTit: '库存来源：', rightCon: ''},
                {leftTit: '仓库名称：', rightCon: ''},
                {leftTit: '仓库城市：', rightCon: ''},
                {leftTit: '仓库省份：', rightCon: ''}
            ]
        } 
    },
    created(){
        fetch.get("?action=/parts/GetSelfPartsDetail&SINGLEPART_ID="+this.$route.query.singlePartId,{}).then(res=>{
            console.log("GetPODetail",res);
            for(let i=0;i<res.data.length;i++){
                this.workBenchOwnPartsDetailObj[0].rightCon = res.data[i].INSTOCK_MAIN_CODE;
                this.workBenchOwnPartsDetailObj[1].rightCon = res.data[i].DICTINSTOCKTYPE;
                this.workBenchOwnPartsDetailObj[2].rightCon = res.data[i].FACTORY_NM;
                this.workBenchOwnPartsDetailObj[3].rightCon = res.data[i].MODEL_NAME;
                this.workBenchOwnPartsDetailObj[4].rightCon = res.data[i].PARTS_TYPE_NAME;
                this.workBenchOwnPartsDetailObj[5].rightCon = res.data[i].PART_DESCRIBE;
                this.workBenchOwnPartsDetailObj[6].rightCon = res.data[i].PN;
                this.workBenchOwnPartsDetailObj[7].rightCon = res.data[i].PART_NUMBER;
                this.workBenchOwnPartsDetailObj[8].rightCon = res.data[i].PART_AMOUNT;
                this.workBenchOwnPartsDetailObj[9].rightCon = res.data[i].INSTOCK_ON;
                this.workBenchOwnPartsDetailObj[10].rightCon = res.data[i].WAREHOUSE_TYPE;
                this.workBenchOwnPartsDetailObj[11].rightCon = res.data[i].STOREHOUSE_NAME;
                this.workBenchOwnPartsDetailObj[12].rightCon = res.data[i].AREA_NAME;
                this.workBenchOwnPartsDetailObj[13].rightCon = res.data[i].PARENT_AREA_NAME;
            }
        });
    }
}
</script>
<style scoped>
  .workBenchOwnPartsDetailView{width: 100%;}
  .workBenchOwnPartsDetailContent{width: 100%; margin-top: 0.05rem;color: #999999; background: #ffffff;overflow: scroll;}
  .workBenchOwnPartsDetailContent .title{line-height: 0.35rem; color: #2698d6; padding-left: 0.25rem; position: relative;}
  .workBenchOwnPartsDetailContent .title:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.11rem; background: #2698d6;}
  .workBenchOwnPartsDetailContent ul li{padding: 0 0.25rem;}
  .workBenchOwnPartsDetailContent ul li{display: flex; line-height: 0.35rem;}
  .workBenchOwnPartsDetailContent ul li:nth-child(2n+1){color: #999999;background: #ffffff;}
  .workBenchOwnPartsDetailContent ul li:nth-child(2n){color: #999999;background: #f7f7f7;}
  .workBenchOwnPartsDetailContent ul li p:nth-child(1){width: 0.91rem;}
  .workBenchOwnPartsDetailContent ul li p:nth-child(2){width: 66%;word-wrap: break-word;}
</style>

