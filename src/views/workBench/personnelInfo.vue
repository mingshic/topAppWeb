<template>
    <div class="personnelView">
        <header-last :title="personnelTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="content"></div>
        <div class="personForm" ref="personnelData" :data="personnelData" v-if="userRole==undefined">
            <div class="cellLeft">
                <img v-if="!personnelData.imgSrc" src="../../assets/images/photo.png" alt="">
                <img v-else :src="personnelData.imgSrc" alt="">
            </div>
            <div class="cellRight">
                <p>{{personnelData.realname}}</p>
                <ul>
                    <li><span>邮箱：</span>{{personnelData.oemail}}</li>
                    <li><span>手机：</span><a style="color: #2698d6" @click="sendCall(personnelData.mobileno)" v-bind:href="'tel:'+personnelData.mobileno" >{{personnelData.mobileno}}</a></li>
                    <li><span>参与角色：</span>{{personnelData.positionName}}</li>
                </ul>
            </div>
        </div>
        <div class="personForm" ref="personnelSupportData" :data="personnelSupportData" v-if="userRole!=undefined">
            <div class="cellLeft">
                <img v-if="!personnelSupportData.imgSrc" src="../../assets/images/photo.png" alt="">
                <img v-else :src="personnelSupportData.imgSrc" alt="">
            </div>
            <div class="cellRight">
                <p>{{personnelSupportData.userName}}</p>
                <ul>
                    <li><span>邮箱：</span>{{personnelSupportData.email}}</li>
                    <li><span>手机：</span><a style="color: #2698d6" @click="sendCall(personnelSupportData.userPhone)" v-bind:href="'tel:'+personnelSupportData.userPhone" >{{personnelSupportData.userPhone}}</a></li>
                    <li><span>参与角色：</span>{{personnelSupportData.userRole}}</li>
                </ul>
            </div>
        </div>
        <!-- <div class="personForm" v-if="userRole==undefined">
            <el-form ref="personnelData" :model="personnelData" label-width="1.5rem">
                <el-form-item label="姓名">
                    <el-input v-model="personnelData.realname" class="bInput" disabled></el-input>
                </el-form-item>
                <el-form-item label="参与角色">
                    <el-input v-model="personnelData.positionName" class="bInput" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <a @click="sendCall(personnelData.mobileno)" v-bind:href="'tel:'+personnelData.mobileno" style="color: #2698d6; text-align: center">{{personnelData.mobileno}}
                    </a>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="personnelData.oemail" class="bInput" disabled></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="personForm" v-if="userRole!=undefined">
            <el-form ref="personnelData" :model="personnelSupportData" label-width="1.5rem">
                <el-form-item label="姓名">
                    <el-input v-model="personnelSupportData.userName" class="bInput" disabled></el-input>
                </el-form-item>
                <el-form-item label="参与角色">
                    <el-input v-model="personnelSupportData.userRole" class="bInput" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <a @click="sendCall(personnelSupportData.userPhone)" v-bind:href="'tel:'+personnelSupportData.userPhone" style="color: #2698d6; text-align: center">{{personnelSupportData.userPhone}}
                    </a>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="personnelSupportData.email" class="bInput" disabled></el-input>
                </el-form-item>
            </el-form>
        </div> -->
    </div>
    
</template>

    
<script>
import headerLast from "../header/headerLast";
import fetch from "../../utils/ajax";
export default {
    name: "personnelInfo",
    components: {
        headerLast,
    },
    data(){
        return{
            personnelTit: "人员信息",
            USERID: this.$route.query.USERID,
        
            email: this.$route.query.email,
            userRole: this.$route.query.userRole,
            userName: this.$route.query.userName,
            userPhone: this.$route.query.userPhone,

            positionName: this.$route.query.positionName,
            personnelData: {}, 
            personnelSupportData: {},

        }
    },
    created: function(){
        if (this.userRole==undefined){
            fetch.get("?action=/once/QueryUserInfo&USERID=" + this.USERID,{}).then(res => {
                this.personnelData = res.data;
                this.personnelData.positionName = this.positionName;
            });
        }
        else if (this.userRole!=undefined){
            this.personnelSupportData.userRole = this.userRole,
            this.personnelSupportData.userName = this.userName,
            this.personnelSupportData.userPhone = this.userPhone,
            this.personnelSupportData.email = this.email
        }
        
    },


}
</script>
  
<style scoped>
/* .personForm {width: 100%;}
.personForm >>> .el-form-item {border-bottom: 0.01rem solid #e5e5e5;border-top: 0.01rem solid #e5e5e5; margin: 0}
.personForm >>> .el-form-item__label {font-size: 0.13rem;padding: 0 0 0 0.15rem;text-align: center;}
.personForm >>> .el-form-item__error {position: relative;}
.personForm >>> .el-input__inner {border: none;color: #333333;padding: 0px 0px;}
.personForm >>> .el-input__inner::placeholder {font-size: 0.13rem;color: #acacac;}
.split {margin-top: 0.05rem} */

.personnelView{ width: 100%; height: 100%; position: relative}
.content{margin-top: 0.05rem; background: #ffffff;}
.personForm{display: flex; margin: 0 0.25rem; padding: 0.15rem 0; border-bottom: 0.01rem solid #cccccc}
.personForm:last-child{border-bottom: none}
.personForm .cellLeft{width: 0.75rem; height: 0.75rem; margin-right: 0.25rem;}
.personForm .cellLeft img{width: 0.75rem; height: 0.75rem; border-radius: 50%;}
.personForm .cellRight p{font-size: 0.15rem; color: #262626; margin-bottom: 0.1rem;}
.personForm .cellRight li{color: #666666; font-size: 0.12rem; line-height: 0.18rem;}
.personForm .cellRight li span{margin-right: 0.15rem;}
    
</style>
    