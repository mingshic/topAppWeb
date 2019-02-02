<!--关注-->
<template>
  <div class="focusView">
    <div class="content">
      <div class="event">
        <div class="title">
          <div class="titleLeft">
            <img src="../../assets/images/index_3.png" alt="">
            <router-link :to="{name:'mineNotice',params:{}}">
              {{noticeTitle+'('+noticeTotal+')'}}
            </router-link>
          </div>
          <router-link :to="{name:'mineNotice',params:{}}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <el-table
          :data="noticeData" 
          style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
          <template v-for="item in noticeTable">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                <template v-if="item.prop == 'CASEHEALTH'">
                  <span v-if="scope.row[item.prop] == 0" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;"></span>
                  <span v-if="scope.row[item.prop] == 1" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #009900;"></span>
                  <span v-if="scope.row[item.prop] == 2" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ffff00;"></span>
                  <span v-if="scope.row[item.prop] == 3" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff9900;"></span>
                  <span v-if="scope.row[item.prop] == 4" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff0000;"></span>
                </template>
                <router-link v-else :to="{name:'eventShow',query:{caseId:scope.row['CASEID']}}">
                  <span  class="table_name">{{scope.row[item.prop]}}</span>
                </router-link>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="event">
        <div class="title">
          <div class="titleLeft">
            <img src="../../assets/images/index_1.png" alt="">
            <router-link :to="{name:'focusEventList'}">
              {{eventTitle+'('+eventTitleTotal+')'}}
            </router-link>
          </div>
          <router-link :to="{name:'focusEventList'}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <el-table
          :data="caseData" 
          style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
          <template v-for="item in eventTable">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                <template v-if="item.prop == 'CASEHEALTH'">
                  <span v-if="scope.row[item.prop] == 0" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;"></span>
                  <span v-if="scope.row[item.prop] == 1" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #009900;"></span>
                  <span v-if="scope.row[item.prop] == 2" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ffff00;"></span>
                  <span v-if="scope.row[item.prop] == 3" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff9900;"></span>
                  <span v-if="scope.row[item.prop] == 4" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff0000;"></span>
                </template>
                <router-link v-else :to="{name:'eventShow',query:{caseId:scope.row['CASEID']}}">
                  <span  class="table_name">{{scope.row[item.prop]}}</span>
                </router-link>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="program">
        <div class="title">
          <div class="titleLeft">
            <img src="../../assets/images/index_2.png" alt="">
            <router-link :to="{name:'programList'}">
              {{programTitle+'('+programTitleTotal+')'}}
            </router-link>
          </div>
          <router-link :to="{name:'programList'}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <el-table
          :data="projData"
          style="width: 100%; border: 0.01rem solid #e1e1e1">
          <template v-for="item in programTable">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                <template v-if="item.prop == 'NOW_COLOR'">
                <!-- 1 #ff0000 红，2 #ff9900 橙，3 #ffff00 黄，4 #009900 绿 -->                  
                <div>
                    <i v-if="scope.row[item.prop] == 0" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;"></i>
                    <i v-if="scope.row[item.prop] == 1" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff0000;"></i>
                    <i v-if="scope.row[item.prop] == 2" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff9900;"></i>
                    <i v-if="scope.row[item.prop] == 3" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ffff00;"></i>
                    <i v-if="scope.row[item.prop] == 4" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #009900;"></i>
                  </div>
                </template>
                <router-link v-else :to="{name:'programShow',query:{projectId:scope.row['PROJECT_ID']}}">
                  <span class="table_name">{{scope.row[item.prop]}}</span>
                </router-link>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'


export default {
  name: 'index',

  components: {
  },

  data () {
    return {
      noticeTitle:'通知',
      eventTitle: '需关注事件',
      programTitle: '需关注项目',
      more: '更多',
      caseData: [],
      eventTable:[
        {
          prop: 'CASEHEALTH',
          label: '',
          fixed: true,
          width: '5%'
        },
        {
          prop: 'CODE',
          label: '事件编号',
          fixed: true,
          width: '35px'
        },
        {
          prop: 'ITEM',
          label: '关注原因',
          fixed: true,
          width: '35%'
        },
        {
          prop: 'CUSTOM',
          label: '客户名称',
          fixed: true,
          width: '35%'
        }
      ],
      projData:[],
      programTable:[
        {
          prop: 'NOW_COLOR',
          label: '',
          fixed: true,
          width: '5%'
        },
        {
          prop: 'PROJECT_NAME',
          label: '项目名称',
          fixed: true,
          width: '35px'
        },
        {
          prop: 'START_DATE',
          label: '开始日期',
          fixed: true,
          width: '35%'
        },
        {
          prop: 'END_DATE',
          label: '结束日期',
          fixed: true,
          width: '35%'
        }
      ],
      noticeData:[],
      noticeTable:[
        {
          prop: 'CASEHEALTH',
          label: '',
          fixed: true,
          width: '5%'
        },
        {
          prop: 'BIZ_NAME',
          label: '业务类型',
          fixed: true,
          width: '35px'
        },
        {
          prop: 'CREATE_ON',
          label: '时间',
          fixed: true,
          width: '35%'
        },
        {
          prop: 'TITLE',
          label: '内容',
          fixed: true,
          width: '35%'
        }
      ],
      eventTitleTotal:0,
      programTitleTotal:0,
      noticeTotal:0
    }
  },

  created:function(){
    this.fetchData();
  },

  methods:{
    fetchData:function(){
      fetch.get("?action=GetFocusCase&PAGE_NUM=1&PAGE_TOTAL=3","").then(res=>{
        console.log(res.data);
        this.caseData = res.data;
        this.eventTitleTotal = res.total;
      });
      fetch.get("?action=GetFocusProject&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
        console.log("GetFocusProject:",res)
        this.projData = res.data;
        this.programTitleTotal = res.total;
      });
      fetch.get("?action=GetTaskMessage&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
        this.noticeData = res.data;
        this.noticeTotal = res.total;
        console.log("GetTaskMessage:",res);
      });
    }   
    
  },
  beforeCreate:function(){
    this.$router.replace(location);    
    history.pushState(null, null, document.url);
    window.onpopstate = () => {
      history.go(1)
    }
  },
  activated(){
    if(!this.$route.meta.isUseCache){
      this.noticeData = [];
      this.caseData = [];
      this.projData = [];
      fetch.get("?action=checkSession",{}).then(res=>{
        this.fetchData();
      });
    }
    this.$route.meta.isUseCache = false;
  },
  deactivated(){
    console.log('移除');
    window.onpopstate = null
  }
}
</script>

<style scoped>
  .focusView{width: 100%;}
  .content{margin: 0 0.14rem; display: block;}
  .content .title{display: flex; justify-content: space-between;height: 0.33rem; line-height: 0.33rem; font-size: 0.14rem; color: #2698d6;}
  .content .title a{color: #2698d6;}
  .content .title .titleRight{font-size: 0.13rem; color: #999999;}
  .content .title img{width: 0.18rem; height: 0.18rem; vertical-align: text-bottom; margin-right: 0.08rem;}
  .content >>> .el-table td{height: 0.3rem!important; box-sizing: border-box; margin: 0; padding: 0; text-align: center}
  .content >>> .event .el-table td:nth-child(1) .cell{padding: 0}
  .content >>> .program .el-table td:nth-child(1) .cell{padding: 0}
  .content >>> .event .el-table td:nth-child(3){text-align: left}
  .content >>> .event .el-table td:nth-child(4){text-align: left}
  .content >>> .program .el-table td:nth-child(2){text-align: left}
  .content >>> .opinion .el-table td:nth-child(1){text-align: left}
  .content >>> .el-table th{height: 0.3rem!important; box-sizing: border-box; margin: 0; text-align: center; padding: 0;}
  .content >>> .el-table td>.cell{color: #666666; padding: 0 0.02rem}
  .content >>> .el-table th>.cell{color: #333333; padding: 0 0.02rem;}
  .event .table_name{display: block; width: 100%; height: 0.3rem; line-height: 0.3rem; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;}
</style>

