<template>
    <div class="workBenchPeopleInfoDetailView">
        <header-last :title="workBenchPeopleInfoDetailTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="workBenchPeopleInfoDetailContent">
            <div class="cell">
                <ul>
                    <li v-for="item in workBenchPeopleInfoDetailObj" :key="item.id">
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
    name: 'workBenchPeopleInfoDetail',
    components: {
        headerLast,
        footerHome
    },
    data () {
        return{
            workBenchPeopleInfoDetailTit: '',
            payPlanId:this.$route.query.payPlanId,
            workBenchPeopleInfoDetailObj:[
                {leftTit: '用户ID：', rightCon: ''},
                {leftTit: '手机：', rightCon: ''},
                {leftTit: 'EMAIL：', rightCon: ''},
                {leftTit: '资源类型：', rightCon: ''},
                {leftTit: '业务方向：', rightCon: ''},
                {leftTit: '岗位名称：', rightCon: ''},
                {leftTit: '所属项目部：', rightCon: ''},
                {leftTit: '所属部门：', rightCon: ''},
                {leftTit: '常驻所在地：', rightCon: ''}
            ]
        }
    },
    created(){
        console.log(this.$route.query.EMPID);
        fetch.get("?action=/person/getPersonDetail&SERCH_EMP_ID="+this.$route.query.EMPID,{}).then(res=>{
            console.log("GetPODetail",res);
            for(let i=0;i<res.data.length;i++){
                this.workBenchPeopleInfoDetailTit = res.data[i].REALNAME;
                this.workBenchPeopleInfoDetailObj[0].rightCon = res.data[i].USERID;
                this.workBenchPeopleInfoDetailObj[1].rightCon = res.data[i].MOBILENO;
                this.workBenchPeopleInfoDetailObj[2].rightCon = res.data[i].OEMAIL;
                this.workBenchPeopleInfoDetailObj[3].rightCon = res.data[i].RESOURCE_TYPE;
                this.workBenchPeopleInfoDetailObj[4].rightCon = res.data[i].USER_YWFX;
                this.workBenchPeopleInfoDetailObj[5].rightCon = res.data[i].EMP_POSITION_NM;
                this.workBenchPeopleInfoDetailObj[6].rightCon = res.data[i].USER_QY;
                this.workBenchPeopleInfoDetailObj[7].rightCon = res.data[i].ENG_ORGNAME;
                this.workBenchPeopleInfoDetailObj[8].rightCon = res.data[i].USUAL_AREA;
            }
        });
    }
    
}
</script>

<style scoped>
  .workBenchPeopleInfoDetailView{width: 100%;}
  .workBenchPeopleInfoDetailContent{width: 100%; margin-top: 0.05rem;bottom: 0.45rem; color: #999999; background: #ffffff;}
  .workBenchPeopleInfoDetailContent .title{line-height: 0.35rem; color: #2698d6; padding-left: 0.25rem; position: relative;}
  .workBenchPeopleInfoDetailContent .title:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.11rem; background: #2698d6;}
  .workBenchPeopleInfoDetailContent ul li{padding: 0 0.25rem;}
  .workBenchPeopleInfoDetailContent ul li{display: flex; line-height: 0.35rem;}
  .workBenchPeopleInfoDetailContent ul li:nth-child(2n+1){color: #999999;background: #ffffff;}
  .workBenchPeopleInfoDetailContent ul li:nth-child(2n){color: #999999;background: #f7f7f7;}
  .workBenchPeopleInfoDetailContent ul li p:nth-child(1){width: 0.91rem;}
  .workBenchPeopleInfoDetailContent ul li p:nth-child(2){width: 66%;word-wrap: break-word;}
</style>



  