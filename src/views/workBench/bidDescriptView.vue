<template>
    <div class="bidDescriptView">
        <header-last :title="bidDescriptTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="titleInfo">基本信息</div>
        <div class="bodyForm">
            <el-form ref="personInfo" :model="personInfo" label-width="1rem">
                <el-form-item label="报价编号">
                    <el-input v-model="personInfo.code" class="bInput" disabled></el-input>
                </el-form-item>
                <el-form-item label="事件编号">
                  <router-link :to="{name:'baseInfomation',query:{CASE_ID: this.personInfo.caseId}}">
                    <el-input v-model="personInfo.caseCd" class="caseCode" disabled></el-input>
                  </router-link>
                </el-form-item>
                <el-form-item label="报价状态">
                    <el-input v-model="personInfo.onceStatusData" class="bInput" disabled></el-input>
                </el-form-item>
                <el-form-item label="报价类型">
                    <el-input v-model="personInfo.priceTypeData" class="bInput" disabled></el-input>
                </el-form-item>
                <router-link :to="{name:'bidPriceProgress',query:{caseId: this.personInfo.caseId, num: this.personInfo.num}}">
                    <el-button type="primary">查看报价进展</el-button>
                </router-link>
            </el-form>
        </div>
        <div class="titleInfo">参与人员</div>
        <div class="bodyForm">
            <el-form ref="personInfo" :model="personInfo" label-width="1rem">
                <el-form-item label="需求销售">
                  <router-link :to="{name:'personnelInfo',query:{USERID: this.personInfo.demandPersion, positionName: '需求销售'}}">
                    <el-input v-model="personInfo.demandname" class="roleInfo" disabled></el-input>
                  </router-link>
                </el-form-item>
                <el-form-item label="报价发起人">
                  <router-link :to="{name:'personnelInfo',query:{USERID: this.personInfo.createdBy, positionName: '报价发起人'}}">
                    <el-input v-model="personInfo.applyername" class="roleInfo" disabled></el-input>
                  </router-link>
                </el-form-item>
                <el-form-item label="销售确认人">
                  <router-link :to="{name:'personnelInfo',query:{USERID: this.personInfo.saleQuoter, positionName: '销售确认人'}}">
                    <el-input v-model="personInfo.salename" class="roleInfo" disabled></el-input>
                  </router-link>
                </el-form-item>
                <el-form-item label="项目经理">
                  <router-link :to="{name:'personnelInfo',query:{USERID: this.personInfo.projectManager, positionName: '项目经理'}}">
                    <el-input v-model="personInfo.managername" class="roleInfo" disabled></el-input>
                  </router-link>
                </el-form-item>
                <el-form-item label="备件报价人" v-if="personInfo.priceTypeData=='备件'">
                  <router-link :to="{name:'personnelInfo',query:{USERID: this.personInfo.partsQuoter, positionName: '备件报价人'}}">
                    <el-input v-model="personInfo.partsname" class="roleInfo" disabled></el-input>
                  </router-link>
                </el-form-item>
                <el-form-item label="人员报价人" v-if="personInfo.priceTypeData=='人员'">
                  <router-link :to="{name:'personnelInfo',query:{USERID: this.personInfo.staffQuoter, positionName: '人员报价人'}}">
                    <el-input v-model="personInfo.staffname" class="roleInfo" disabled></el-input>
                  </router-link>
                </el-form-item>
                <el-form-item label="分摊确认人">
                  <router-link :to="{name:'personnelInfo',query:{USERID: this.personInfo.productQuoter, positionName: '分摊确认人'}}">
                    <el-input v-model="personInfo.productname" class="roleInfo" disabled></el-input>
                  </router-link>
                </el-form-item>
            </el-form>
        </div>
        <div class="titleInfo">报价信息</div>
        <div class="bodyForm">
            <template ref="personInfo" :model="personInfo">
                <el-form label-width="1rem">
                    <el-form-item label="是否特批">
                        <el-radio-group v-model="personInfo.specialApproved">
                            <el-radio label="1" @change="isSpeciallyApprove('1')">是</el-radio>
                            <el-radio label="0" @change="isSpeciallyApprove('0')">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-input type="textarea" placeholder="请输入特批说明" :rows="2" v-model="personInfo.specialApprovedRemark" v-show="ifShowSpeciallyApprove"></el-input>
                </el-form>
            </template>
            <template v-if="personInfo.priceTypeData=='人员'&&status=='2'&&(realName==personInfo.staffname)"> 
                <el-table :data="staffPriceInfo" tooltip-effect="dark" style="width: 100%" @selection-change="staffPriceSelectionChange">
                    <el-table-column type="selection" width="5">
                    </el-table-column>
                    <el-table-column label="涉及角色" prop="roleName" width="12">
                    </el-table-column>
                    <el-table-column label="所属阶段" prop="stageName" width="12">
                    </el-table-column>
                    <el-table-column label="资源类型" prop="resourceTypeName" width="12">
                    </el-table-column>
                    <el-table-column label="工程师级别" prop="engineerLevelName" width="12">
                    </el-table-column>
                    <el-table-column label="工作量(天)" prop="workload" width="12">
                    </el-table-column>
                    <el-table-column label="外援费用" prop="price" width="12">
                    </el-table-column>
                    <el-table-column label="差旅费用" prop="trvaelPrice" width="12">
                    </el-table-column>
                    <el-table-column label="备注" prop="remark" width="12">
                    </el-table-column>
                </el-table>
                
                <div class="priceOpCell" style="width: 100%" v-if="popSubmit">
                    <el-button type="primary" size="small" @click="onSubmitPrice()" icon="el-icon-success">提交</el-button>
                    <el-button type="primary" size="small" @click="onSubmitPriceAddorEdit(1)" icon="el-icon-circle-plus">增加</el-button>
                    <el-button type="primary" size="small" @click="onSubmitPriceAddorEdit(2)" icon="el-icon-edit">编辑</el-button>
                    <el-button type="primary" size="small" @click="onSubmitPriceDelete()" icon="el-icon-error">删除</el-button>
                </div>
            </template>
             <template v-if="personInfo.priceTypeData=='人员'&&(status!='2'||realName!=personInfo.staffname)"> 
                <el-table :data="staffPriceInfo" style="width: 100%">
                    <el-table-column label="涉及角色" prop="roleName" width="12">
                    </el-table-column>
                    <el-table-column label="所属阶段" prop="stageName" width="12">
                    </el-table-column>
                    <el-table-column label="资源类型" prop="resourceTypeName" width="12">
                    </el-table-column>
                    <el-table-column label="工程师级别" prop="engineerLevelName" width="12">
                    </el-table-column>
                    <el-table-column label="工作量(天)" prop="workload" width="12">
                    </el-table-column>
                    <el-table-column label="外援费用" prop="price" width="12">
                    </el-table-column>
                    <el-table-column label="差旅费用" prop="trvaelPrice" width="12">
                    </el-table-column>
                    <el-table-column label="备注" prop="remark" width="12">
                    </el-table-column>
                </el-table>
            </template>
            <template v-else-if="personInfo.priceTypeData=='备件'">
                <el-table :data="partsPriceInfo" style="width: 100%">
                    <el-table-column label="备件PN" prop="pnEasyEntity.partPn" width="25%">
                    </el-table-column>
                    <el-table-column label="备件数量" prop="amount" width="25%">
                    </el-table-column>
                    <el-table-column label="备件描述" prop="pnEasyEntity.partDescribe" width="25%">
                    </el-table-column>
                    <el-table-column label="备注" prop="remark" width="25%">
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div v-if="popPrice" class="popPrice">
          <el-form ref="priceInfoDataAdd" :model="priceInfoDataAdd" label-width="1rem">
            <el-form-item label="涉及角色">
              <el-select v-model="priceInfoDataAdd.roleId" placeholder="请选择">
                <el-option v-for="item in roleList" :label="item.dictName" :value="item.dictID" :key="item.dictID">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工程师级别">
              <el-select v-model="priceInfoDataAdd.engineerLevel" placeholder="请选择">
                <el-option v-for="item in levelList" :label="item.dictName" :value="item.dictID" :key="item.levelId">
                </el-option>
              </el-select>
              <!-- <el-input v-model="priceInfoDataAdd.engineerLevelName" class="bInput"></el-input> -->
            </el-form-item>
            <el-form-item label="资源类型">
              <el-radio-group v-model="priceInfoDataAdd.resourceType">
                <el-radio label="1" @change="isInsideOrExternalSource('1')">外部资源</el-radio>
                <el-radio label="0" @change="isInsideOrExternalSource('0')">内部资源</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="工作量(天)">
              <el-input v-model="priceInfoDataAdd.workload" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="外援费用" v-if="ifInsideSource">
              <el-input v-model="priceInfoDataAdd.price" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="差旅费用">
              <el-input v-model="priceInfoDataAdd.trvaelPrice" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" :rows="2" v-model="priceInfoDataAdd.remark" class="bInput"></el-input>
            </el-form-item>
            <el-form-item class="submitCell">
              <el-button type="primary" size="small" @click="onSubmitPriceInfoAddAndEdit(priceInfoDataAdd, 'priceInfoDataAdd')">确认</el-button>
              <el-button class="submitBtn" type="primary" size="small" @click="onSubmitPriceAddorEdit(0)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="titleInfo">WBM报价</div>
        <div class="bodyForm">
            <template v-if="personInfo.priceTypeData=='人员'">
                <el-table :data="WBMInfo" style="width: 100%">
                    <el-table-column label="预付费" width="33%">
                        <el-table-column label="工人费用" prop="WBM_STAFF_PREPAY" width="50%">
                        </el-table-column>
                        <el-table-column label="差旅费用" prop="WBM_STAFF_PREPAY_TRAVEL" width="50%">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="分摊" width="33%">
                        <el-table-column label="工人费用" prop="WBM_STAFF_FT" width="50%">
                        </el-table-column>
                        <el-table-column label="差旅费用" prop="WBM_STAFF_FT_TRAVEL" width="50%">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="分摊入项目" width="33%">
                        <el-table-column label="工人费用" prop="WBM_STAFF_FT_TO_PRJ" width="50%">
                        </el-table-column>
                        <el-table-column label="差旅费用" prop="WBM_STAFF_FT_TO_PRJ_TRAVEL" width="50%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </template> 
                
            <template v-if="personInfo.priceTypeData=='备件'">
                <el-table :data="WBMInfo" style="width: 100%">
                    <el-table-column label="预付费" width="33%">
                        <el-table-column label="工人费用" prop="WBM_PART_PREPAY" width="50%">
                        </el-table-column>
                        <el-table-column label="差旅费用" prop="WBM_PART_PREPAY_TRAVEL" width="50%">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="分摊" width="33%">
                        <el-table-column label="工人费用" prop="WBM_PART_FT" width="50%">
                        </el-table-column>
                        <el-table-column label="差旅费用" prop="WBM_PART_FT_TRAVEL" width="50%">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="分摊入项目" width="33%">
                        <el-table-column label="工人费用" prop="WBM_PART_FT_TO_PRJ" width="50%">
                        </el-table-column>
                        <el-table-column label="差旅费用" prop="WBM_PART_FT_TO_PRJ_TRAVEL" width="50%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="titleInfo" v-if="status!='2'&&(realName==personInfo.salename)||status=='6'">销售确认信息</div>
        <div class="bodyForm" v-if="status!='2'&&(realName==personInfo.salename)||status=='6'">
            <el-form ref="personInfo" :model="personInfo" label-width="1rem">
                <el-form-item label="入项目" v-if="personInfo.priceTypeData=='人员'">
                    <el-radio-group v-model="personInfo.fitProjectFlg">
                        <el-radio label="1" @change="isFitProjectFlg('1')" v-if="personInfo.caseType!='5'&& personInfo.serviceType!='5'">是</el-radio>
                        <el-radio label="0" @change="isFitProjectFlg('0')">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="入项目" v-else>
                    <el-radio-group v-model="personInfo.fitProjectFlg">
                        <el-radio label="1" @change="isFitProjectFlg('1')">是</el-radio>
                        <el-radio label="0" @change="isFitProjectFlg('0')">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="支付方式" v-show="isShowPayIsFit">
                    <el-radio-group v-model="personInfo.PayWayDataId">
                        <el-radio label="3">分摊</el-radio>
                    </el-radio-group> 
                </el-form-item>
                <el-form-item label="支付方式" v-show="isShowPayNotIsFit">
                    <el-radio-group v-model="personInfo.notFitPayWayDataId">
                        <el-radio label="3">分摊</el-radio>
                        <el-radio label="1">预付费</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item label="支付方式" v-show="isShowPayIsFit">
                    <el-select v-model="personInfo.PayWayDataId" clearable placeholder="请选择">
                        <el-option
                        v-for="item in payIsFit"
                        :key="item.id"
                        :label="item.payname"
                        :value="item.payid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式" v-show="isShowPayNotIsFit">
                    <el-select v-model="personInfo.PayWayDataId" clearable placeholder="请选择" @change="choiseNotFit()">
                        <el-option 
                        v-for="item in payNotIsFit"
                        :key="item.id"
                        :label="item.payname"
                        :value="item.payid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分摊编号" v-show="isShowFtCode">
                    <el-input v-model="personInfo.ShareNoData" class="bInput"></el-input>
                </el-form-item>
                <div>
                  <div v-show="isShowPreFee">
                      <p>提示：将按照预付费项目选择顺序来扣款</p>
                      <el-table :data="multipleSelection">
                          <el-table-column label="项目名称" prop="projectName">
                          </el-table-column>
                          <el-table-column label="项目编号" prop="projectCode">
                          </el-table-column>
                          <el-table-column label="交付金额" prop="backCost">
                          </el-table-column>
                          <el-table-column label="已用金额" prop="feeAmount">
                          </el-table-column>
                          <el-table-column label="可用金额" prop="restAmount">
                          </el-table-column>
                          <el-table-column label="开始时间" prop="serviceBegin">
                          </el-table-column>
                          <el-table-column label="结束时间" prop="serviceEnd">
                          </el-table-column>
                      </el-table>
                      <el-button type="primary" @click="onSubmitPreFee()">添加预付费项目</el-button>
                      <div v-if="popBg" class="popBg">
                      <el-table :data="PrefeeInfo" tooltip-effect="dark" style="width: 100%" height="483" @selection-change="handleSelectionChange">
                          <el-table-column type="selection" width="4%">
                          </el-table-column>
                          <el-table-column label="项目名称" prop="projectName" width="12%">
                          </el-table-column>
                          <el-table-column label="项目编号" prop="projectCode" width="15%">
                          </el-table-column>
                          <el-table-column label="交付金额" prop="backCost" width="15%">
                          </el-table-column>
                          <el-table-column label="已用金额" prop="feeAmount" width="15%">
                          </el-table-column>
                          <el-table-column label="可用金额" prop="restAmount" width="15%">
                          </el-table-column>
                          <el-table-column label="开始时间" prop="serviceBegin" width="12%">
                          </el-table-column>
                          <el-table-column label="结束时间" prop="serviceEnd" width="12%">
                          </el-table-column>
                      </el-table>
                      <el-form-item class="saleSubmitCell">
                          <el-button type="primary" @click="onSubmitPreFeeSure()">确认选择</el-button>
                          <el-button class="submitBtn" type="primary" @click="onSubmitPreFeeCancel()">取消选择</el-button>
                      </el-form-item>
                      </div>
                  </div>
                </div>
                <!-- <el-form-item label="分摊编号" v-show="isShowSingleFT">
                    <el-input v-model="personInfo.ShareNoData" class="bInput" disabled></el-input>
                </el-form-item> -->
                <el-form-item label="支付金额">
                    <el-input v-model="personInfo.actualFeeAmount" class="bInput" disabled></el-input>
                </el-form-item>
                <el-form-item label="意见说明">
                    <el-input v-model="personInfo.remark" class="bInput"></el-input>
                </el-form-item>
                <el-form-item v-show="isShowSaleButton" class="saleSubmitCell">
                    <el-button type="primary" @click="onSubmitSale('personInfo')" v-if="relate">同意</el-button>
                    <el-button class="submitBtn" type="primary" @click="refuseSubmitSale()" v-if="relate">拒绝</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="titleInfo" v-if="status!='2'&&(realName==personInfo.productname)||status=='6'">分摊确认信息</div>
        <div class="bodyForm" v-if="status!='2'&&(realName==personInfo.productname)||status=='6'">
            <template v-if="personInfo.PayWayData=='分摊'">
            <el-form ref="personInfo" :model="personInfo" label-width="1rem">
                <el-form-item label="是否同意分摊">
                    <el-radio-group v-model="ifFT">
                        <el-radio label="1" @change="onSubmitFTOK()">同意</el-radio>
                        <el-radio label="0" @change="onSubmitFTNO()">拒绝</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-input type="textarea" :rows="2" placeholder="请输入原因说明" v-model="personInfo.productRemark"></el-input>
                <el-button type="primary" @click="onSubmitFT(ifFT)" v-show="isShowSureFT">提交分摊确认</el-button>
    
            </el-form>
            </template>
            <template v-if="personInfo.PayWayData=='预付费'">
            <el-form>
                <el-form-item label="无">
                </el-form-item>
            </el-form>
            </template>
        </div>
        <div style="height:0.45rem"></div>
        <footer-home></footer-home>
    </div>
</template>

<script>
import headerLast from "../header/headerLast";
import loadingtmp from "@/components/load/loading";
import fetch from "../../utils/ajax";
import footerHome from '../footer/footerHome'
export default {
  name: "bidDescriptView",
  components: {
    headerLast,
    loadingtmp,
    footerHome
  },
  data() {
    return {

  // 标题：
      bidDescriptTit: "单次报价详情",      

  // 访问(router)参数：
      processinstId: this.$route.query.processinstId,
      num: this.$route.query.num,
      caseId: this.$route.query.caseId,
      relate: this.$route.query.relate,
      status: this.$route.query.status,
      realName: localStorage.getItem("realName"),

  // 公共参数：
      personInfo: {},

  // 报价信息参数：
      stageList: [{ dictID: "1", dictName: "分析诊断" },{ dictID: "2", dictName: "实施" }],
      roleList: [{ dictID: "3", dictName: "一线" },{ dictID: "4", dictName: "二线" },{ dictID: "5", dictName: "三线" },{ dictID: "1", dictName: "CMO" },{ dictID: "2", dictName: "PM" }],
      levelList: [{ dictID: "1", dictName: "初级" },{ dictID: "2", dictName: "中级" },{ dictID: "3", dictName: "高级" },{ dictID: "4", dictName: "专家" }],
      statusList: [{ dictID: "1", dictName: "待提交" },{ dictID: "2", dictName: "待报价" },{ dictID: "3", dictName: "待销售确认" },{ dictID: "4", dictName: "已拒绝" },{ dictID: "5", dictName: "驳回" },{ dictID: "6", dictName: "已完成" },{ dictID: "7", dictName: "待分摊确认" },{ dictID: "8", dictName: "拒绝分摊" },{ dictID: "99", dictName: "已取消" },{ dictID: "9", dictName: "待产品经理审核" }],
     
      ifShowSpeciallyApprove: false,
      popSubmit: true,
      popPrice: false,
      ifInsideSource: true,

      staffPriceInfo: {},
      partsPriceInfo: {},
      priceInfoDataAdd: {},

      ifEdit: "",

  // WBM报价参数：
      WBMInfo: [],
 
  // 销售确认信息参数：
      payIsFit: [{payname: "分摊", payid: "3"}],
      payNotIsFit: [{payname: "分摊", payid: "3"}, {payname: "预付费", payid: "1"}],
      
      isShowPayIsFit: false,
      isShowPayNotIsFit: false,
      isShowFtCode: false,
      isShowPreFee: false,
      popBg: false,
      isShowSaleButton: true,

      PrefeeInfo: [],
      multipleSelection: [],

  // 分摊确认信息参数：
      isShowSureFT: false,
      ifFT: "",


  //
              // payWay: [],
      // isShowPayIsFit: false,
      // isShowPayNotIsFit: false,

      // popBg: false,
      // popPrice: false,
      // popSubmit: true,

              // isShow: false,
      // isShowSureFT: false,
              // isShowSingleFT: true,
      // isShowSaleButton: true,
      // isShowFtCode: false,
      // isShowPreFee: false,
              // isShowPreFeeInfo: false,
      // ifShowSpeciallyApprove: false,


              // ifSpeciallyApprove: "",
    };
  },
  created() {

    if(this.status==7||this.status==9||this.status==6||this.status==1){
      this.isShowSaleButton = false;
    }

  // 销售确认信息：
    fetch.get("?action=/once/serchFreeOffer&num=" + this.num, {}).then(res => {
      console.log("serchFreeOffer1",res)
      this.PrefeeInfo = res.data;
    });

    fetch.get("?action=/once/checkOnceRules&num=" + this.num, {}).then(res => {
      console.log("checkOnceRules2", res);
    });
    fetch.get("?action=/once/queryCaseOnceFee&caseId=" + this.caseId + "&num=" + this.num + "&feeFlg=", {}).then(res => {
      console.log("queryCaseOnceFee3", res);
    });
  
  // 备件报价信息
    fetch.get("?action=/once/queryCaseOncePartsByProcessInstID&processInstID=" +this.processinstId,{}).then(res => {
      console.log("queryCaseOncePartsByProcessInstID4", res);
      this.partsPriceInfo = res.data;
    });

  // 人员报价信息
    fetch.get("?action=/once/queryCaseOnceStaffByProcessInstId&processInstID=" +this.processinstId,{}).then(res => {
      console.log("queryCaseOnceStaffByProcessInstId5", res);
      this.staffPriceInfo = res.data;
      for (var j = 0; j < this.staffPriceInfo.length; j++) {
        for (var i = 0; i < this.roleList.length; i++) {
          if (this.roleList[i]["dictID"] == this.staffPriceInfo[j].roleId) {
            this.staffPriceInfo[j].roleName = this.roleList[i]["dictName"];
          }
        }
        for (var i = 0; i < this.stageList.length; i++) {
          if (this.stageList[i]["dictID"] == this.staffPriceInfo[j].stageId) {
            this.staffPriceInfo[j].stageName = this.stageList[i]["dictName"];
          }
        }
        for (var i = 0; i < this.levelList.length; i++) {
          if (this.levelList[i]["dictID"] == this.staffPriceInfo[j].engineerLevel) {
            this.staffPriceInfo[j].engineerLevelName = this.levelList[i]["dictName"];
          }
        }
        if (this.staffPriceInfo[j].resourceType == "1") {
          this.staffPriceInfo[j].resourceTypeName = "外部资源";
        } else if (this.staffPriceInfo[j].resourceType == "0") {
          this.staffPriceInfo[j].resourceTypeName = "内部资源";
        }
      }
      console.log("staffPriceInfo", this.staffPriceInfo);
    });

  // WBM报价信息
    fetch.get("?action=/once/queryWBMPersonFree&onceNum=" + this.num, {}).then(res => {
        console.log("queryWBMPersonFree6", res);
        this.WBMInfo = res.data;
        this.WBMInfoPrice = res.data[0]
    });
  
  // 公共信息
    fetch.get("?action=/once/getCaseOnceByProcessInstID&processInstID=" + this.processinstId,{}).then(res => {
        this.personInfo = res.data;
        console.log("getCaseOnceByProcessInstID_before7", this.personInfo)
        this.personInfo.priceTypeData = this.choisePriceType(this.personInfo.priceType);
        this.personInfo.onceStatusData = this.choisePriceStatus(this.personInfo.onceStatus);

        this.personInfo.PayWayDataId = "3";
        this.personInfo.notFitPayWayDataId = "3";

        if (this.personInfo.specialApproved == "1"){
          this.ifShowSpeciallyApprove = true
        }
        else{
          this.ifShowSpeciallyApprove = false
        }

        if (this.personInfo.fitProjectFlg == "1") {
          if (this.personInfo.priceTypeData == "人员") {
            if (this.personInfo.staffPay == "3") {
              this.personInfo.PayWayData = "分摊";
              this.personInfo.ShareNoData = this.personInfo.staffShareNo;
              console.log("sharenoDATA", this.personInfo.ShareNoData)
              this.isShowFtCode = true;
            }
          } else if (this.personInfo.priceTypeData == "备件") {
            if (this.personInfo.partsPay == "3") {
              this.personInfo.PayWayData = "分摊";
              this.personInfo.ShareNoData = this.personInfo.partsShareNo;
              this.isShowFtCode = true;
            }
          }
        } else if (this.personInfo.fitProjectFlg == "0") {
          if (this.personInfo.priceTypeData == "人员") {
            if (this.personInfo.staffPay == "3") {
              this.personInfo.PayWayData = "分摊";
              this.personInfo.ShareNoData = this.personInfo.staffShareNo;
              this.isShowFtCode = true;
            } else {
              this.personInfo.PayWayData = "预付费";
            }
          } else if (this.personInfo.priceTypeData == "备件") {
            if (this.personInfo.partsPay == "3") {
              this.personInfo.PayWayData = "分摊";
              this.isShowFtCode = true;
            } else {
              this.personInfo.PayWayData = "预付费";
            }
          }
        }
    });
  },

  methods: {
  // 报价信息：
    isSpeciallyApprove(val){
      if (val=="1"){
        this.ifShowSpeciallyApprove = true;
      }
      else if(val=="0")
      {
        this.ifShowSpeciallyApprove = false;
      }
    },

    isInsideOrExternalSource(val){
      if (val=="0"){
        this.ifInsideSource = false;
      }
      else if (val=="1"){
        this.ifInsideSource = true;
        this.priceInfoDataAdd.price = undefined;
        
      }
    },

    onSubmitPrice(){
      let params = new URLSearchParams;
      params.append("onceType", this.personInfo.priceType);
      params.append("approved", this.personInfo.specialApproved);
      if (this.personInfo.specialApproved=="1"){
        params.append("remark",this.personInfo.remark);
      }
      else if (this.personInfo.specialApproved=="0"){
        console.log(this.personInfo.specialApproved)
      }
      params.append("onceNum", this.personInfo.num);
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      fetch.post("?action=/once/submitCaseOnceAll", params).then(res=>{
        console.log("resssssre", res)
        loading.close();
        if(res.STATUSCODE=="0"){
          this.$message({
            message:'提交成功',
            type: 'success',
            center: true,
            customClass: 'msgdefine'
          });
          this.opPriceInfo();
          this.opWBMInfo();
          this.popPrice = false;
          this.popSubmit = false;
        }
        else if(res.STATUSCODE=="1"){
          this.$message({
            message: res.MESSAGE,
            type: 'warning',
            center: true,
            customClass: 'msgdefine'
          });
        }
      })
    },

    onSubmitPriceAddorEdit(key){
      if (key==1){
        if (this.priceInfoDataAdd!=undefined){
          this.priceInfoDataAdd = {};
          this.ifEdit = 1;
          this.popPrice = true;
        }
      }
      else if(key==2){
        if (this.priceInfoDataAdd.__ob__.value.caseId==undefined){
          this.$message({
            message: "没有选择编辑项，无编辑项",
            type: 'warning',
            center: true,
            customClass:'msgdefine'
          });
        }
        else{
          this.ifEdit = 2;
          this.popPrice = true;
        }
      }
      else{
        this.popPrice = false;
      }
    },
    
    onSubmitPriceDelete(){
      let params = new URLSearchParams;
      params.append("num", this.priceInfoDataAdd.num);
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      fetch.post("?action=/once/deleteCaseOnceStaff", params).then(res=>{
        console.log("resssssre", res)
        loading.close();
        if(res.STATUSCODE=="0"){
          this.$message({
            message:'提交成功',
            type: 'success',
            center: true,
            customClass: 'msgdefine'
          });
          this.opPriceInfo();
        }
      })
    },

    onSubmitPriceInfoAddAndEdit(priceAddEditData, priceInfoDataAddForm){
      let params = new URLSearchParams;
      let data = {};
      data.caseId = this.caseId;
      data.processinstid = this.processinstId
      data.roleId = priceAddEditData.roleId;
      data.engineerLevel = priceAddEditData.engineerLevel;
      data.resourceType = priceAddEditData.resourceType;
      data.workload = priceAddEditData.workload;
      data.price = priceAddEditData.price;
      data.trvaelPrice = priceAddEditData.trvaelPrice;
      data.remark = priceAddEditData.remark;
      if (this.ifEdit=="2"){
        data.num = priceAddEditData.num;
      }
      let array = JSON.stringify(data);
      params.append("ifEdit", this.ifEdit);
      params.append("data", array);
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm = this;
      this.$refs[priceInfoDataAddForm].validate((valid) => {
        if (valid) {
          if(!vm.checkAdd(loading)) return;
          fetch.post("?action=/once/saveCaseOnceStaff", params).then(res=>{
            console.log("resssssre", res)
            loading.close();
            if(res.STATUSCODE=="0"){
              this.$message({
                message:'提交成功',
                type: 'success',
                center: true,
                customClass: 'msgdefine'
              });
              this.opPriceInfo();
              this.popPrice = false;
            }
          })
        }
      })
    },

    staffPriceSelectionChange(val){
      this.priceInfoDataAdd = val[0];
      if (this.priceInfoDataAdd==undefined){
        this.priceInfoDataAdd = {};
      }
    },
    
  // 销售确认信息：
    isFitProjectFlg(fitProjectFlgId) {
      let math = require('mathjs');
      if (fitProjectFlgId=="1") {
        this.isShowPayIsFit = true;
        this.isShowPayNotIsFit = false;
        this.isShowSingleFT = false;
        this.isShowPreFee = false;
        this.personInfo.PayWayDataId = "3"
        if (this.personInfo.PayWayDataId=="3"){
          this.isShowFtCode = true
          if (this.personInfo.priceTypeData=="人员"){
            this.personInfo.actualFeeAmount = math.format(math.chain(math.bignumber(this.WBMInfoPrice.WBM_STAFF_FT_TO_PRJ)).add(math.bignumber(this.WBMInfoPrice.WBM_STAFF_FT_TO_PRJ_TRAVEL)).done());
          }
          else if (this.personInfo.priceTypeData=="备件"){
            this.personInfo.actualFeeAmount = math.format(math.chain(math.bignumber(this.WBMInfoPrice.WBM_PART_FT_TO_PRJ)).add(math.bignumber(this.WBMInfoPrice.WBM_PART_FT_TO_PRJ_TRAVEL)).done());
          }
        }
        
      } else if (fitProjectFlgId == "0") {
        this.isShowPayIsFit = false;
        this.isShowPayNotIsFit = true;
        this.isShowSingleFT = false;
        if (this.personInfo.notFitPayWayDataId=="3"){
          this.isShowFtCode = true;
          this.isShowSingleFT = false;
          if (this.personInfo.priceTypeData=="人员"){
            this.personInfo.actualFeeAmount = math.format(math.chain(math.bignumber(this.WBMInfoPrice.WBM_STAFF_FT)).add(math.bignumber(this.WBMInfoPrice.WBM_STAFF_FT_TRAVEL)).done());
          }
          else if (this.personInfo.priceTypeData=="备件"){
            this.personInfo.actualFeeAmount = math.format(math.chain(math.bignumber(this.WBMInfoPrice.WBM_PART_FT)).add(math.bignumber(this.WBMInfoPrice.WBM_PART_FT_TRAVEL)).done());
          }
        }
        else if (this.personInfo.notFitPayWayDataId=="1"){
          this.isShowFtCode = false;
          this.isShowSingleFT = false;
          if (this.personInfo.priceTypeData=="人员"){
            this.personInfo.actualFeeAmount = math.format(math.chain(math.bignumber(this.WBMInfoPrice.WBM_STAFF_PREPAY)).add(math.bignumber(this.WBMInfoPrice.WBM_STAFF_PREPAY_TRAVEL)).done());
          }
          else if (this.personInfo.priceTypeData=="备件"){
            this.personInfo.actualFeeAmount = math.format(math.chain(math.bignumber(this.WBMInfoPrice.WBM_PART_PREPAY)).add(math.bignumber(this.WBMInfoPrice.WBM_PART_PREPAY_TRAVEL)).done());
          }
        }
      }
    },

    choiseNotFit(){
      let math = require('mathjs');
      if (this.personInfo.PayWayDataId=="1"){
        this.isShowFtCode = false;
        this.isShowPreFee = true;
        if (this.personInfo.priceTypeData=="人员"){
            this.personInfo.actualFeeAmount = math.format(math.chain(math.bignumber(this.WBMInfoPrice.WBM_STAFF_PREPAY)).add(math.bignumber(this.WBMInfoPrice.WBM_STAFF_PREPAY_TRAVEL)).done());
          }
        else if (this.personInfo.priceTypeData=="备件"){
          this.personInfo.actualFeeAmount = math.format(math.chain(math.bignumber(this.WBMInfoPrice.WBM_PART_PREPAY)).add(math.bignumber(this.WBMInfoPrice.WBM_PART_PREPAY_TRAVEL)).done());
        }
      }
      else if(this.personInfo.PayWayDataId=="3"){
        this.isShowFtCode = true;
        this.isShowPreFee = false;
        if (this.personInfo.priceTypeData=="人员"){
            this.personInfo.actualFeeAmount = math.format(math.chain(math.bignumber(this.WBMInfoPrice.WBM_STAFF_FT)).add(math.bignumber(this.WBMInfoPrice.WBM_STAFF_FT_TRAVEL)).done());
          }
        else if (this.personInfo.priceTypeData=="备件"){
          this.personInfo.actualFeeAmount = math.format(math.chain(math.bignumber(this.WBMInfoPrice.WBM_PART_FT)).add(math.bignumber(this.WBMInfoPrice.WBM_PART_FT_TRAVEL)).done());
        }
      }
    },

    onSubmitPreFee(){
      this.popBg = true;
    },

    onSubmitPreFeeSure(){
      this.popBg = false;
      this.isShowPreFeeInfo = true;
    },

    onSubmitPreFeeCancel(){
      this.popBg = false;
      this.multipleSelection = [];
    },

    onSubmitSale(personForm){
      let params = new URLSearchParams;
      let userName = localStorage.getItem("userName");
      let data = JSON.stringify(this.saleData());
      let ifFunds = true;
      params.append("data", data)
      if (this.personInfo.priceType=="1"&&this.personInfo.PayWayDataId=='1'){
        let projectFeedata = this.projectFeeData()
        ifFunds = this.ifAdequacyOfFunds(projectFeedata)
        params.append("products", JSON.stringify(projectFeedata))
      }
      else if(this.personInfo.PayWayDataId=='1'){
        let projectFeedata = this.projectFeeData()
        ifFunds = this.ifAdequacyOfFunds(projectFeedata)
        params.append("proParts", JSON.stringify(projectFeedata))
      }
      params.append("taskTodoLink", "/ntop/caseManage/caseDeal/caseEditOnce.jsp?caseId="+this.personInfo.caseId+"&num=");
      params.append("USERNAME", userName.toUpperCase())
      if (ifFunds){
        const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
        });
        let vm= this;
        this.$refs[personForm].validate((valid) => {
          if (valid) {
            if(!vm.check(loading)) return;
            fetch.post("?action=/once/finishCaseOnceFlow", params).then(res=>{
              console.log("resssssre", res)
              loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine'
                });
                this.opPriceInfo();
                this.isShowSaleButton = false;
              }
            })
          }
        })
      }
      else {
        this.$message({
          message: "被选择的项目资金不足，请确认可用资金",
          type: 'warning',
          center: true,
          customClass:'msgdefine'
          });
      }
    },

    refuseSubmitSale(){
      let params = new URLSearchParams;
      let data = {};
      let userName = localStorage.getItem("userName");
      data.caseId = this.personInfo.caseId;
      data.num = this.personInfo.num;
      data.code = this.personInfo.code;
      data.processinstid = this.personInfo.processinstid;
      data.priceType = this.personInfo.priceType;
      data.remark = this.personInfo.remark;
      data = JSON.stringify(data);
      params.append("data", data)
      params.append("todo", "/ntop/caseManage/caseDeal/caseEditOnce.jsp?caseId="+this.personInfo.caseId+"&num=")
      params.append("USERNAME", userName.toUpperCase())
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });

      fetch.post("?action=/once/stopCaseOnceFlow", params).then(res=>{
        console.log("resssssre", res)
        loading.close();
        if(res.STATUSCODE=="0"){
          this.$message({
            message:'提交成功',
            type: 'success',
            center: true,
            customClass: 'msgdefine'
          });
          this.opPriceInfo();
          this.isShowSaleButton = false;
        }
      })
    },
    handleSelectionChange(val) {
      let math = require('mathjs');
      this.multipleSelection = val;
    },

  // 分摊确认信息：
    onSubmitFTOK(){
      if (this.status=='7'){
        this.isShowSureFT = true;
      }
    },
    onSubmitFTNO(){
      if (this.status=='7'){
        this.isShowSureFT = true;
      }
    },

    onSubmitFT(ftway){
      if (ftway=="1"){
        let params = new URLSearchParams;
        let data = {};
        let userName = localStorage.getItem("userName");
        data.caseId = this.personInfo.caseId;
        data.num = this.personInfo.num;
        data.code = this.personInfo.code;
        data.processinstid = this.personInfo.processinstid;
        data.priceType = this.personInfo.priceType;
        data.productRemark = this.personInfo.productRemark;
        data = JSON.stringify(data);
        params.append("data", data)
        params.append("todoLink", "/ntop/caseManage/caseDeal/caseEditOnce.jsp?caseId="+this.personInfo.caseId+"&num=")
        params.append("USERNAME", userName.toUpperCase())
        const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
        });
        fetch.post("?action=/once/finishCaseOnceApportion", params).then(res=>{
          console.log("resssssre", res)
          loading.close();
          if(res.STATUSCODE=="0"){
            this.$message({
              message:'提交成功',
              type: 'success',
              center: true,
              customClass: 'msgdefine'
            });
            this.opPriceInfo();
            this.isShowSureFT = false;
          }
        });
      }
      else if (ftway=="0"){
        let params = new URLSearchParams;
        let data = {};
        let userName = localStorage.getItem("userName");
        data.caseId = this.personInfo.caseId;
        data.num = this.personInfo.num;
        data.code = this.personInfo.code;
        data.processinstid = this.personInfo.processinstid;
        data.priceType = this.personInfo.priceType;
        data.productRemark = this.personInfo.productRemark;
        data = JSON.stringify(data);
        params.append("data", data)
        params.append("todoLink", "/ntop/caseManage/caseDeal/caseEditOnce.jsp?caseId="+this.personInfo.caseId+"&num=")
        params.append("USERNAME", userName.toUpperCase())
        const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
        });
        fetch.post("?action=/once/stopCaseOnceApportion", params).then(res=>{
          console.log("resssssre", res)
          loading.close();
          if(res.STATUSCODE=="0"){
            this.$message({
              message:'提交成功',
              type: 'success',
              center: true,
              customClass: 'msgdefine'
            });
            this.opPriceInfo();
            this.isShowSureFT = false;
          }
        });
      }
    },
  
  // 公共信息：

    opWBMInfo(){
      fetch.get("?action=/once/queryWBMPersonFree&onceNum=" + this.num, {}).then(res => {
        console.log("queryWBMPersonFree", res);
        this.WBMInfo = res.data;
      // this.WBMInfoPrice = res.data[0]
      });
    },
    opPriceInfo(){
      fetch.get("?action=/once/queryCaseOnceStaffByProcessInstId&processInstID=" +this.processinstId,{}).then(res => {
        console.log("queryCaseOnceStaffByProcessInstId", res);
        this.staffPriceInfo = res.data;
        for (var j = 0; j < this.staffPriceInfo.length; j++) {
          for (var i = 0; i < this.roleList.length; i++) {
            if (this.roleList[i]["dictID"] == this.staffPriceInfo[j].roleId) {
              this.staffPriceInfo[j].roleName = this.roleList[i]["dictName"];
            }
          }
          for (var i = 0; i < this.stageList.length; i++) {
            if (this.stageList[i]["dictID"] == this.staffPriceInfo[j].stageId) {
              this.staffPriceInfo[j].stageName = this.stageList[i]["dictName"];
            }
          }
          for (var i = 0; i < this.levelList.length; i++) {
            if (this.levelList[i]["dictID"] == this.staffPriceInfo[j].engineerLevel) {
              this.staffPriceInfo[j].engineerLevelName = this.levelList[i]["dictName"];
            }
          }
          if (this.staffPriceInfo[j].resourceType == "1") {
            this.staffPriceInfo[j].resourceTypeName = "外部资源";
          } else if (this.staffPriceInfo[j].resourceType == "0") {
            this.staffPriceInfo[j].resourceTypeName = "内部资源";
          }
        }
      });
    },

    choisePriceType(priceId) {
      if (priceId == 1) {
        return "人员";
      } else if (priceId == 2) {
        return "备件";
      }
    },
    choisePriceStatus(onceStatusId) {
      for (var i = 0; i < this.statusList.length; i++) {
        if (this.statusList[i]["dictID"] == onceStatusId) {
          return this.statusList[i]["dictName"];
        }
      }
    },

    choiseStaffPay(staffPayNum, partsPayNum, priceTypeData, fitProjectNum) {
      if (fitProjectNum == "1") {
        if (priceTypeData == "人员") {
          if (staffPayNum == "3") {
            staffPayData.staffPay = "分摊";
            return staffPayData;
          }
        } else if (priceTypeData == "备件") {
          if (partsPayNum == "3") {
            partsPayData.partsPay = "3";
            return staffPayData;
          }
        }
      } else if (priceTypeData == "备件") {
      }
    },
    

    saleData(){
      let data = {};
      data.caseId = this.personInfo.caseId;
      data.num = this.personInfo.num;
      data.code = this.personInfo.code;
      data.processinstid = this.personInfo.processinstid;
      data.fitProjectFlg = this.personInfo.fitProjectFlg;
      data.priceType = this.personInfo.priceType;
      data.actualFeeAmount = this.personInfo.actualFeeAmount;
      data.remark = this.personInfo.remark;
      if (this.personInfo.priceType=="1"){
          data.staffPay = this.personInfo.PayWayDataId
          data.staffShareNo = this.personInfo.ShareNoData
      }
      else{
          data.partsPay = this.personInfo.PayWayDataId
          data.partsShareNo = this.personInfo.ShareNoData
      }
      return data
  
    },
    projectFeeData(){
      let math = require('mathjs');
      let dataFee = [];
      let flag = true;
      let total = this.personInfo.actualFeeAmount;
      for (var i=0;i<this.multipleSelection.length;i++){
        let dob = {};
        if (flag){
          if (math.format(math.chain(math.bignumber(total)).subtract(math.bignumber(this.multipleSelection[i].restAmount)).done())>0.0) {
            dob.restAmount = parseInt(this.multipleSelection[i].restAmount);
            total = math.format(math.chain(math.bignumber(total)).subtract(math.bignumber(this.multipleSelection[i].restAmount)).done());
          }
          else{
            dob.restAmount = parseInt(total);
            flag = false;
          }
        }
        else{
          dob.restAmount = parseInt(0.0);
        }
        dob.projectId = this.multipleSelection[i].projectId;
        dob.projectCode = this.multipleSelection[i].projectCode
        dataFee.push(dob);
      }
      return dataFee
    },
    ifAdequacyOfFunds(funds){
      let total = 0;
      for (var i=0;i<funds.length;i++){
        total += funds[i].restAmount
      }
      if (this.personInfo.actualFeeAmount==total){
        return true
      }
      else{
        return false
      }
    },

    checkAdd(loading,){
      if(this.priceInfoDataAdd.resourceType==undefined){
        this.$message({
            message:'请选择外部(内部)资源',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      if(this.priceInfoDataAdd.resourceType=='0'&&this.priceInfoDataAdd.roleId==undefined){
        this.$message({
            message:'请选择涉及角色',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      if(this.priceInfoDataAdd.resourceType=='0'&&this.priceInfoDataAdd.workload==undefined){
        this.$message({
            message:'请输入工作量(天)',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      if(this.priceInfoDataAdd.resourceType=='1'&&this.priceInfoDataAdd.roleId==undefined){
        this.$message({
            message:'请选择涉及角色',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      if(this.priceInfoDataAdd.resourceType=='1'&&this.priceInfoDataAdd.engineerLevel==undefined){
        this.$message({
            message:'请选择工程师级别',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      if(this.priceInfoDataAdd.resourceType=='1'&&this.priceInfoDataAdd.price==undefined){
        this.$message({
            message:'请输入外援费用',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      return true;
    },
    

    check(loading){
      if(this.personInfo.fitProjectFlg==undefined){
        this.$message({
            message:'请选择是否入项目',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      if(this.personInfo.ShareNoData==undefined&&this.personInfo.PayWayDataId!='1'){
        this.$message({
            message:'请输入分摊编号',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      return true;
    },
  },
  beforeRouteLeave( to, from,next){
    if (to.name == 'bid') {
        to.meta.isUseCache = true;    
    }        
    next();
  }
};
</script>

<style scoped>
.popBg{background: rgba(0,0,0,0.5); overflow:scroll; position: absolute; top: 0.45rem; bottom: 0; z-index: 998; padding: 0 0.25rem;}
.popPrice{background: rgba(0,0,0,0.5); position: relative; bottom: 0; z-index: 998; padding: 0 0.25rem;}

.popPrice {width: 90%;}
.bodyForm >>> .caseCode .el-input__inner{color: #104E8B}
.bodyForm >>> .roleInfo .el-input__inner{color: #104E8B}
.popPrice >>> .el-form-item {border-bottom: 0.01rem solid #e5e5e5;margin: 0;}
.popPrice >>> .el-form-item__label {font-size: 0.13rem;color: #acacac;padding: 0 0 0 0.15rem;text-align: left;}
.popPrice >>> .el-form-item__error {position: relative;}
.popPrice >>> .el-input__inner {border: none; color: #333333; background-color: gray; padding: 0px 0px;}
.popPrice >>> .el-textarea__inner{background-color: gray}
.popPrice >>> .el-input__inner::placeholder {font-size: 0.13rem; color: #acacac;}
.popPrice >>> .el-input.is-disabled .el-input__inner {background: #ffffff;}

.popPrice >>> .submitCell{position: relative}
.popPrice >>> .submitCell .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: white; font-size: 0.13rem;}
.popPrice >>> .submitCell .el-button:hover{background: #ffffff;}
.popPrice >>> .submitCell .searchBtnCell:hover{background: #2698d6;}
.popPrice >>> .submitCell .el-form-item__content{margin: 0!important; display: flex;}
.popPrice >>> .submitCell .submitBtn{background: #ffffff; color: #2698d6;}

.bodyForm >>> .priceOpCell{position: relative}
.bodyForm >>> .priceOpCell .el-button{width: 24%; border: none; padding: 0; margin: 0; height: 0.3rem; border-radius: 0; font-size: 0.13rem;}
.bodyForm >>> .priceOpCell .el-button:hover{background: #ffffff;}
.bodyForm >>> .priceOpCell .searchBtnCell:hover{background: #2698d6;}
.bodyForm >>> .priceOpCell .el-form-item__content{margin: 0!important; display: flex;}
.bodyForm >>> .priceOpCell .submitBtn{background: #2698d6; color: #ffffff;}


.bodyForm >>> .saleSubmitCell{position: relative}
.bodyForm >>> .saleSubmitCell .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #ffffff; font-size: 0.13rem;}
.bodyForm >>> .saleSubmitCell .el-button:hover{background: #ffffff;}
.bodyForm >>> .saleSubmitCell .searchBtnCell:hover{background: #2698d6;}
.bodyForm >>> .saleSubmitCell .el-form-item__content{margin: 0!important; display: flex;}
.bodyForm >>> .saleSubmitCell .submitBtn{background: #2698d6; color: #ffffff;}


.bodyForm {width: 100%;background: #ffffff;}
.bodyForm >>> .el-form-item {border-bottom: 0.01rem solid #e5e5e5;margin: 0;}
.bodyForm >>> .el-form-item__label {font-size: 0.13rem;color: #acacac;padding: 0 0 0 0.15rem;text-align: left;}
.bodyForm >>> .el-form-item__error {position: relative;}
.bodyForm >>> .el-input__inner {border: none;color: black;padding: 0px 0px;}
.bodyForm >>> .el-input__inner::placeholder {font-size: 0.13rem;color: #acacac;}
.bodyForm >>> .el-input.is-disabled .el-input__inner {background: #ffffff;}
.bodyForm >>> .el-button {width: 100%;}
.bodyForm >>> .el-button+.el-button {margin-left: 0px}

.bodyForm >>> .el-radio__label {font-size: 14px;}
.bodyForm >>> .el-table__body {width: 100% !important;}
.bodyForm >>> .el-table__header {width: 100% !important;}
.bodyForm >>> .el-table {font-size: 0.13rem;text-align: center;}
.bodyForm >>> .el-table th {text-align: center;background: #f7f7f7;}
.bodyForm >>> .el-table td {border: 0.001rem solid #ebeef5;}
.bodyForm >>> .el-table td:nth-child(3) {text-align: right;}
.bodyForm >>> .el-table td:nth-child(5) {text-align: right;padding-right: 0.05rem;}
.bodyForm >>> .el-table .cell {padding: 0;text-align: center;}
.bodyForm >>> .el-table__empty-block {position: initial;}

.bidListView {width: 100%;}
.titleInfo {position: relative;line-height: 0.35rem;margin-left: 0.15rem;font-size: 0.14rem;color: #2698d6;}
.titleInfo::before {position: absolute;top: 0.1rem;left: -0.1rem;width: 0.05rem;height: 0.15rem;content: "";background: #2698d6;}
.titleInfo::after {position: absolute;bottom: 0.1rem;right: 0;width: 80%;height: 0.01rem;content: "";background: #e5e5e5;}
.ul_basicInfo .li_basicInfo {display: flex;justify-content: space-between;align-items: center;height: 0.5rem;border-bottom: 0.01rem solid #e5e5e5;font-size: 0.14rem;line-height: 0.5rem;padding: 0 0.2rem;}
.ul_basicInfo .li_basicInfo img {width: 0.24rem;height: 0.24rem;margin-right: 0.15rem;}
.ul_basicInfo .li_basicInfo span {width: 100%;text-align: left;color: #262626;}

.priceInfo .el-col {line-height: 0.25rem;color: #333333;}
.priceInfo .el-col .tit {line-height: 0.25rem;color: #999999;}
</style>