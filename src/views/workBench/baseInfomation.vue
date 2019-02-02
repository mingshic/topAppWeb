<template>
    <div class="baseInfomationView">
        <header-last :title="baseInfomationTit"></header-last>
        <div style="height: 0.45rem;"></div>
            <el-form ref="formData" :model="formData" label-width="1rem">
                <div class="titleInfo">基本信息</div>
                <div class="bodyForm">
                    <el-form-item label="事件编号">
                        <el-input v-model="formData.eventCode" class="bInput" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input  v-model="formData.projectName" class="bInput" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="项目编号">
                        <el-input v-model="formData.projectCode" class="bInput" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="事件类型">
                        <el-input :value="getCaseType(formData.eventType)" class="bInput" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="事件级别">
                        <el-input :value="getCaseLevel(formData.eventLevel)" class="bInput" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="厂商名称">
                        <el-input v-model="formData.producerName" class="bInput" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="设备型号">
                        <el-input v-model="formData.devCode" class="bInput" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="序列号">
                        <el-input v-model="formData.SN" class="bInput" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="事件描述">
                        <el-input type="textarea" v-model="formData.description" class="bInput" disabled></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="设备型号">
                        <el-input v-model="formData.devCode" class="bInput" disabled></el-input>
                    </el-form-item>      -->
                </div>
                <div class="titleInfo">参与人员</div>
                <div class="bodyForm" v-for="item in ueserList" :key="item.userRole">
                    <router-link :to="{name:'personnelInfo',query:{userRole: item.userRole, userName: item.userRname, userPhone: item.userPhone, email: item.email}}">
                      <el-form-item :label=item.userRole>
                        <el-input  class="bluecolor"  v-model="item.userRname"  disabled></el-input>
                      </el-form-item>     
                    </router-link>                
                </div>
                <div class="titleInfo">报价信息</div>
                <div class="bodyForm" v-for="quotation in bidList" :key=quotation.bidId>
                    <el-form-item  label="报价编号">
                        <router-link :to="{name:'bidDescriptView',query:{caseId:CASE_ID, num: quotation.num, processinstId: quotation.bidId}}">
                            <!-- processinstId=1174545&num=1057491&caseId=92550&relate=deal&status=3 -->
                        <el-input v-model="quotation.bidNum" class="bluecolor" disabled></el-input>
                        </router-link>
                    </el-form-item>                     
                </div>
                <div class="bodyForm">
                    <router-link :to="{name:'caseProgress',query:{CASE_ID:CASE_ID}}">
                        <el-button>查看进展</el-button>
                    </router-link>                    
                </div>
            </el-form>
    </div>
</template>

<script>
import headerLast from '../header/headerLast';
import fetch from "../../utils/ajax";
export default {
    name:'baseInfomation',
    components:{
        headerLast
    },
    data(){
        return{
            baseInfomationTit:'单次支持详情',
            CASE_ID:this.$route.query.CASE_ID,
            formData:{},
                // eventCode:'',
                // projectName:'',
                // projectCode:'',
                // eventType:'',
                // eventLevel:'',
                // producerName:'',
                // devCode:'',
                // SN:'',
                // description:'',
                // devCode:'',
            ueserList:[
                // {label:'技术责任人',userRole:'1',userRname:'杜鑫'},
                // {label:'销售',userRole:'2',userRname:'杜鑫'},
                // {label:'备件报价人',userRole:'3',userRname:'杜鑫'},
                // {label:'分摊确认人',userRole:'4',userRname:'杜鑫'},
                // {label:'工程师',userRole:'5',userRname:'黄健'},
                // {label:'工程师',userRole:'5',userRname:'一线'},
                // {label:'销售',userRole:'6',userRname:'销售'},
                // {label:'需求人',userRole:'7',userRname:'销售'},
                // {label:'项目经理',userRole:'8',userRname:'杜鑫'},
                // {label:'管理责任人',userRole:'9',userRname:'杜鑫'}
            ],
            bidList:[],
        }
    },
    created: function(){
        console.log(this.CASE_ID);
        fetch.get("?action=/once/getCaseInfoAndOnceList&caseId="+this.CASE_ID).then(res => {
            console.log("res", res)
            let baseinfo=JSON.parse(res.data);
            // console.log(baseinfo);
            this.ueserList=baseinfo.users;
            this.bidList=baseinfo.bids;
            console.log("bid", this.bidList)
            this.formData=baseinfo;
            console.log(this.formData);
        })

    },
    methods:{
        getCaseType(typeId){
            var caseType = [{"dictID":"1","dictName":"故障"},{"dictID":"2","dictName":"RMA"},{"dictID":"3","dictName":"巡检"},{"dictID":"4","dictName":"技术咨询"},{"dictID":"5","dictName":"非故障技术支持"}]
  			var caseTypeName;
  			caseType.forEach(function(v,i,ar){
                if (v.dictID == typeId) {
					caseTypeName = v.dictName;
				}
            });
   			return caseTypeName;
           },
           getCaseLevel(typeId){
   			var caseType = [{"dictID":"1","dictName":"一级"},{"dictID":"2","dictName":"二级"},{"dictID":"3","dictName":"三级"},{"dictID":"4","dictName":"四级"},{"dictID":"5","dictName":"五级"}];
  			var caseTypeName;
  			caseType.forEach(function(v,i,ar){
            if (v.dictID == typeId) {
					caseTypeName = v.dictName;
				}
            })
   			return caseTypeName;
        },
    },
}
</script>

<style scoped>
.titleInfo{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.titleInfo::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.titleInfo::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.bodyForm{width:100%;background: #ffffff;}
.bodyForm >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.bodyForm >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left}
/* .userForm{width:100%;background: #ffffff;} */
/* .userForm >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;} */
/* .userForm >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left} */
/* .bodyForm >>> .el-form-item__error{position: relative} */
.bodyForm >>> .bluecolor .el-input__inner{border: none;color: #2698d6;  padding: 0px 0px}
.bodyForm >>> .bluecolor .el-input.is-disabled .el-input__inner{background: #ffffff}
.bodyForm >>> .bluecolor .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.bodyForm >>> .el-input__inner{border: none;color: #333333;  padding: 0px 0px}
.bodyForm >>> .el-textarea__inner{border: none; color: #333333 ; padding: 10px 0px}
.bodyForm >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.bodyForm >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac}
.bodyForm >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
.bodyForm >>> .el-textarea.is-disabled .el-textarea__inner{background: #ffffff}
/* .bodyForm >>> .el-input__inner .bInputco{color: #2698d6;} */
.bodyForm >>> .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; bottom: 0};
</style>
