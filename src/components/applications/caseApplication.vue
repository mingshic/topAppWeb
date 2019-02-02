<template>
    <div class="caseApplicationView">
        <div class="attention">
            {{attention1}}
            <a @click="sendCall(attentioncall1)" v-bind:href="'tel:'+attentioncall1" style="color: #2698d6;"> {{attentioncall1}}， </a>
            <a @click="sendCall(attentioncall2)" v-bind:href="'tel:'+attentioncall2" style="color: #2698d6;"> {{attentioncall2}} </a>
            {{attention2}}
        </div>
        <div class="applicationBase">
            <div class="caseApplicationCell">
                <div class="caseApplicationTit">基本信息</div>
            </div>
            <el-form :model="formData" label-width="0.9rem" ref="formData">
                <el-form-item label="所在城市：" class="formborder">
                    <el-cascader :options="options"
                        v-model="formData.city" 
                        :props="prop"  
                        placeholder="请选择所在城市"
                        change-on-select
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="具体地址：">
                    <el-input v-model="formData.address" placeholder="请输入具体地址"></el-input>
                </el-form-item>
                <el-form-item label="故障现象：" class="applicationtext textborder">
                    <el-input type="textarea" v-model="formData.desc" placeholder="请输入故障现象"></el-input>
                </el-form-item>
                <div class="caseApplicationCell" style="margin-top:0.2rem">
                    <div class="caseApplicationTit">故障信息</div>
                </div>
                <el-form-item label="序列号：" class="formborder">
                    <el-input v-model="formData.num" placeholder="请输入序列号"></el-input>
                </el-form-item>
                <el-form-item label="设备型号：">
                    <el-autocomplete class="el-input"
                              v-model="formData.modelName" 
                              :fetch-suggestions="querySearchAsync"
                              placeholder="请输入设备型号" 
                              :trigger-on-focus="false"
                              @select="getDevName">
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="厂商名称：">
                    <el-input v-model="formData.factoryNm" :value="formData.factoryId" placeholder="通过设备型号自动带出" disabled></el-input>
                </el-form-item>
                <el-form-item label="影响程度：">
                    <el-select v-model="formData.levelId" placeholder="请选择">
                        <el-option v-for="item in level" :label="item.value" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="影响范围：">
                    <el-select v-model="formData.scopeId" placeholder="请选择">
                        <el-option v-for="item in scope" :label="item.value" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <div class="caseApplicationCell" style="margin-top:0.2rem">
                    <div class="caseApplicationTit">联系信息</div>
                </div>
                <el-form-item label="客户姓名：" class="formborder">
                    <el-input v-model="formData.custName" placeholder="请输入客户姓名"></el-input>
                </el-form-item>
                <el-form-item label="客户手机：">
                    <el-input v-model="formData.custMobile" placeholder="请输入客户手机"></el-input>
                </el-form-item>
                <el-form-item label="客户座机：">
                    <el-input v-model="formData.custPhone" placeholder="请输入客户座机"></el-input>
                </el-form-item>
                <el-form-item label="邮件地址：">
                    <el-input v-model="formData.custMail" placeholder="请输入邮件地址"></el-input>
                </el-form-item>
                <div class="caseApplicationCell" style="margin-top:0.2rem">
                    <div class="caseApplicationTit">项目信息</div>
                </div>
                <el-form-item label="项目名称：" class="formborder">
                    <el-input v-model="formData.projectName" placeholder="请输入项目名称或留空"></el-input>
                </el-form-item>
                <el-form-item label="项目编号：">
                    <el-input v-model="formData.projectCode" placeholder="请输入项目编号或留空"></el-input>
                </el-form-item>
                <div class="attention">
                    1.如知道对应项目编号和名称则输入，不了解可为空<br />
                    2.入项目或者使用预付费的单次支持，请提前填写序列号、项目名称、项目编号。如果填写错误或者之后补填，可能会给你带来不必要的麻烦，请您务必仔细填写！
                </div>
                <el-form-item class="submitBtn">
                    <el-button @click="submitForm('formData')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import '../../utils/1.js'
import fetch from '../../utils/ajax'
export default {
    name: 'caseApplication',
    components: {
    }, 
    data(){
        return{
            attention1:"您好！神州信息微信端单次支持5*9（9:00-18:00），非工作时间请拨打服务热线报障：",
            attentioncall1:"400-6106661",
            attentioncall2:"800-8106661",
            attention2:"（密码：7653），感谢您的支持！",
            formData:{
                city: [],
                address:'',
                desc:'',
                factoryNm:'',
                factoryId:'',
                modelName:'',
                devId:'',
                num:'',
                levelId:'',
                scopeId:'',
                custName:'',
                custMobile:'',
                custPhone:'',
                custMail:'',
                projectName:'',
                projectCode:''
            },
            cityName:'',
            typeId:1,
            options: areajson,
            deviceArray:[],
            caseLevel:'',
            caseLevelName:'',
            prop:{
                label:'label',
                children:'children'
            },
            level: [
                {"id" : "1","value" : "有问题,但是没有明显影响"}, 
                {"id" : "2","value" : "性能受损,业务尚可运行"}, 
                {"id" : "3","value" : "严重性能下降"}, 
                {"id" : "4","value" : "业务已经中断"}
            ],
            scope:[
                {"id" : "1","value" : "极小范围或者个人"}, 
                {"id" : "2","value" : "部分业务范围"}, 
                {"id" : "3","value" : "整个业务范围"}
            ]
        }
    },
    created(){

    },
    methods:{
       handleChange(val){
           var vm = this;
           let children1 = [];
           let children2 = [];
           vm.options.forEach(function(v,i){
               if(v.value == val[0]){
                   vm.cityName = v.label;
                   children1 = v.children;
               }
           });
           children1.forEach(function(v1,i){
               if(v1.value == val[1]){
                   vm.cityName += "/"+v1.label;
                   children2 = v1.children;
               }
           })
           children2.forEach(function(v2,i){
               if(v2.value == val[2]){
                   vm.cityName += "/"+v2.label;
               }
           })
       },
        getDevName(){
            if(this.formData.modelName){
                for(let i=0;i<this.deviceArray.length;i++){
                    if(this.deviceArray[i].modelName == this.formData.modelName){
                        this.formData.factoryNm = this.deviceArray[i].factoryNm;
                        this.formData.factoryId = this.deviceArray[i].factoryId;
                        this.formData.devId = this.deviceArray[i].modelId;
                    }
                } 
            }
        },
        querySearchAsync(queryString, cb) {
            fetch.get("?action=/once/queryPartsModelAuto&key="+this.formData.modelName,'').then(res=>{
                console.log(res);
                this.deviceArray = res.datas;
                let deviceArray = [];
                for(let i=0;i<res.datas.length;i++){
                   deviceArray.push({'modelId':res.datas[i].modelId,'factoryNm':res.datas[i].factoryNm,'value':res.datas[i].modelName})
                }
                
                let results = queryString ? deviceArray.filter(this.createStateFilter(queryString)) : deviceArray;
        
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());
            })
            // let deviceArray = this.deviceArray;
        },
        createStateFilter(queryString) {
            console.log(queryString);
            return (devId) => {
                return (devId.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
            };
        },
        submitForm (formName) {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(vm.cityName);
                    vm.getCaseLevel();
                    if(!vm.check(loading)) return;
                    var data = new URLSearchParams;
                    var caseContacts = new Array();
                    var temp = {};
                    temp.contactId = '10231';
                    temp.contactRole = '申报受理人';
                    temp.contactType = '1';
                    caseContacts.push(temp);
                    data.append('caseContacts',JSON.stringify(caseContacts));
                    var map = new Map();
                    map.set("userId",localStorage.getItem('empId'));
                    map.set("userName",localStorage.getItem('realName'));
                    map.set("typeId",'1');
                    map.set("city",vm.cityName);
                    map.set("cityId",vm.formData.city[vm.formData.city.length - 1]);
                    map.set("producerId",vm.formData.factoryId);
                    map.set("devId",vm.formData.devId);
                    map.set("sn",vm.formData.num);
                    map.set("levelId",vm.formData.levelId);
                    map.set("scopeId",vm.formData.scopeId);
                    map.set("custName",vm.formData.custName);
                    map.set("custMobile",vm.formData.custMobile);
                    map.set("custPhone",vm.formData.custPhone);
                    map.set("custMail",vm.formData.custMail);
                    if(vm.formData.desc==''||vm.formData.desc==null)
                        map.set("description",'无');
                    else 
                        map.set("description",vm.formData.desc);
                    map.set("projectName",vm.formData.projectName);
                    map.set("projectCode",vm.formData.projectCode);
                    map.set("caseLevel",vm.caseLevel);
                    map.set("address",vm.formData.address);
                    map.set("userRname",localStorage.getItem('realName'));
                    map.set("caseLevelName",vm.caseLevelName);
                    let obj= Object.create(null);
                    for (let[k,v] of map) {
                        obj[k] = v;
                    }
                    console.log(obj);
                    data.append('map',JSON.stringify(obj));
                    console.log(data);
                    fetch.post("?action=/once/insertCaseOnceO2O",data).then(res=>{
                        console.log(res);
                        loading.close();
                        if(res.STATUSCODE==0){
                            this.$message({
                            message:'提交成功',
                            type: 'success',
                            center: true,
                            customClass: 'msgdefine'
                            });
                            //跳转
                        }
                    })
                    
                }
            })
        },
        getCaseLevel(){
            let caselevelId = this.formData.levelId;
            let casescopeId = this.formData.scopeId;
            if(caselevelId!=''&&casescopeId!=''){
                if((caselevelId==1)&&((casescopeId==1)||(casescopeId==2))){
                    this.caseLevel = "4";
				    this.caseLevelName="四级";
                }else if((caselevelId==1)&&(casescopeId==3)){
                    this.caseLevel = "3";
				    this.caseLevelName="三级";
                }else if((caselevelId==2)&&(casescopeId==1)){
                    this.caseLevel = "3";
				    this.caseLevelName="三级";
                }else if((caselevelId==2)&&(casescopeId==2)){
                    this.caseLevel = "3";
				    this.caseLevelName="三级";
                }else if((caselevelId==2)&&(casescopeId==3)){
                    this.caseLevel = "2";
				    this.caseLevelName="二级";
                }else if((caselevelId==3)&&(casescopeId==1)){
                    this.caseLevel = "3";
				    this.caseLevelName="三级";
                }else if((caselevelId==3)&&(casescopeId==2)){
                    this.caseLevel = "2";
				    this.caseLevelName="二级";
                }else if((caselevelId==3)&&(casescopeId==3)){
                    this.caseLevel = "2";
				    this.caseLevelName="二级";
                }else if((caselevelId==4)&&(casescopeId==1)){
                    this.caseLevel = "2";
				    this.caseLevelName="二级";
                }else if((caselevelId==4)&&(casescopeId==2)){
                    this.caseLevel = "1";
				    this.caseLevelName="一级";
                }else if((caselevelId==4)&&(casescopeId==3)){
                    this.caseLevel = "1";
				    this.caseLevelName="一级";
                }
            }
        },
        check(loading){
            if(this.formData.city.length==0){
                this.$message({
                    message:'请选择所在城市!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.address==''){
                this.$message({
                    message:'请输入具体地址!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.desc==''){
                this.$message({
                    message:'请输入故障现象!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.factoryNm==''){
                this.$message({
                    message:'请输入厂商名称!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.modelName==''){
                this.$message({
                    message:'请输入设备型号!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.levelId==''){
                this.$message({
                    message:'请输入影响程度!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.scopeId==''){
                this.$message({
                    message:'请输入影响范围!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.custName==''){
                this.$message({
                    message:'请输入客户姓名!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.custMobile==''&&this.formData.custPhone==''){
                this.$message({
                    message:'手机或座机请任意输入一项!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.custMail){
                var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if(!reg.test(this.formData.custMail)){
                    this.$message({
                        message:'请输入有效的邮箱!',
                        type: 'warning',
                        center: true,
                        customClass:'msgdefine'
                    });
                    loading.close();
                    return false
                }
            }
            return true;
        }
    }
}
</script>


<style scoped>
.caseApplicationView{width: 100%}
.attention{color: red;margin: 0.1rem;}
.caseApplicationCell{overflow: scroll;margin-bottom: 0.1rem;}
.caseApplicationCell .caseApplicationTit{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.caseApplicationCell .caseApplicationTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
/* .caseApplicationCell .caseApplicationTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;} */

.applicationBase{background: #ffffff; position: relative; padding-bottom: 0.5rem; margin-bottom: 0.5rem; top: 0.1rem;}
.applicationBase >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.applicationBase >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
.applicationBase >>> .el-input__inner{border: none; color: #333333;}
.applicationBase >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.applicationBase >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
.applicationBase >>> .el-cascader{width: 85%;}
.applicationBase >>> .el-select{width: 85%;}
.applicationtext{margin: 0!important;}
.applicationtext >>> .el-form-item__content{margin: 0!important; line-height: 0.2rem;}
.applicationtext >>> .el-textarea{border: 0.01rem solid #e5e5e5;width: 90%; margin:0 5%;}
.applicationtext >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 1rem!important; color: #333333;}
.applicationtext >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
.applicationBase>>>.textborder{border-bottom: 0rem solid #e5e5e5}
.applicationBase>>>.formborder{border-top: 0.01rem solid #e5e5e5}
</style>
