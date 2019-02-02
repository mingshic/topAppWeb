import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(Router)
Vue.use(infiniteScroll)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: index,
      name: 'index',
      children: [
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/views/home/home'], resolve),
          meta: {
            isUseCache: false,
            keepAlive: true
          }
        },
        {          
          path: '/focus',          
          name: 'focus',          
          component: resolve => require(['@/views/focus/focus'], resolve),          
          meta: {          
            isUseCache: false,            
            keepAlive: true          
          }        
        },
        {
          path: '/workBench',
          name: 'workBench',
          component: resolve => require(['@/views/workBench/workBench'], resolve)
        },
        {
          path: '/mine',
          name: 'mine',
          component: resolve => require(['@/views/mine/mine'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve)
    },
    //首页我的任务
    {
      path: '/workBench/workBenchMyTask',
      name: 'workBenchMyTask',
      component: resolve => require(['@/views/workBench/workBenchMyTask'], resolve),
    },
    //首页我的事件
    {
      path: '/workBench/workBenchMyEvent',
      name: 'workBenchMyEvent',
      component: resolve => require(['@/views/workBench/workBenchMyEvent'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    //首页我的项目->项目列表
    {
      path: '/workBench/workBenchMyPro',
      name: 'workBenchMyPro',
      component: resolve => require(['@/views/workBench/workBenchMyPro'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    //首页我的项目->项目列表->项目详情
    {
      path: '/home/programShow',
      name: 'programShow',
      component: resolve => require(['@/views/home/programShow'], resolve)
    },
    //首页单次报价->我的报价列表
    {
      path: '/workBench/bidClass',
      name: 'bidClass',
      component: resolve => require(['@/views/workBench/bidClass'], resolve)
    },
    //首页单次报价->我的报价列表->单次报价列表
    {
      path: '/workBench/bid',
      name: 'bid',
      component: resolve => require(['@/views/workBench/bid'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    //首页单次报价->我的报价列表->单次报价列表->单次报价详情
    {
      path: '/workBench/bidDescriptView',
      name: 'bidDescriptView',
      component: resolve => require(['@/views/workBench/bidDescriptView'], resolve)
    },
    //首页单次报价->我的报价列表->单次报价列表->单次报价进展
    {
      path: '/workBench/bidPriceProgress',
      name: 'bidPriceProgress',
      component: resolve => require(['@/views/workBench/bidPriceProgress'], resolve)
    },
    //首页事件总览
    {
      path: '/workBench/workBenchMyEventAll',
      name: 'workBenchMyEventAll',
      component: resolve => require(['@/views/workBench/workBenchMyEventAll'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    //首页项目总览
    {
      path: '/workBench/workBenchMyProAll',
      name: 'workBenchMyProAll',
      component: resolve => require(['@/views/workBench/workBenchMyProAll'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    //首页意见投诉
    {
      path: '/home/tabshowTest',
      name: 'tabshowTest',
      component: resolve => require(['@/views/home/tabshowTest'], resolve)
    },
    //首页报表统计（业务）
    {
      path: '/home/reportBusinessForm',
      name: 'reportBusinessForm',
      component: resolve => require(['@/views//home/reportBusinessForm'], resolve)
    },
    //任务列表（首页我的任务->任务列表）
    {
      path: '/workBench/workBenchTaskList',
      name: 'workBenchTaskList',
      component: resolve => require(['@/views/workBench/workBenchTaskList'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    //任务列表（首页我的任务->任务列表->任务）
    {
      path: '/workBench/workBenchTaskDetailInfo', 
      name: 'workBenchTaskDetailInfo',
      component: resolve => require(['@/views/workBench/workBenchTaskDetailInfo'], resolve),
    },
    //任务列表（首页我的任务->任务列表->任务->SLA反馈）
    {
      path: '/workBench/workBenchSLAfeedback', 
      name: 'workBenchSLAfeedback',
      component: resolve => require(['@/views/workBench/workBenchSLAfeedback'], resolve)
    },
    //任务列表（首页我的任务->任务列表->任务->服务单一览表）
    {
      path: '/workBench/serviceList',
      name: 'serviceList',
      component: resolve => require(['@/views/workBench/serviceList'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    //任务列表（首页我的任务->任务列表->任务->服务单一览表->现场服务单/故障处理服务单）
    {
      path: '/workBench/onsiteServiceInfo',
      name: 'onsiteServiceInfo',
      component: resolve => require(['@/views/workBench/onsiteServiceInfo'], resolve)
    },
    //任务列表（首页我的任务->任务列表->任务->工作量申报）
    {
      path: '/home/declareWorkLoad',
      name: 'declareWorkLoad',
      component: resolve => require(['@/views/home/declareWorkLoad'], resolve)
    },
    //任务列表（首页我的任务->任务列表->任务->人员评价/备件评价）
    {
      path: '/workBench/casePartEvaluate',
      name: 'casePartEvaluate',
      component: resolve => require(['@/views/workBench/casePartEvaluate'], resolve)
    },
    //任务列表（首页我的任务->任务列表->任务->事件备件列表）
    {
      path: '/workBench/sparePartsSortOut',
      name: 'sparePartsSortOut',
      component: resolve => require(['@/views/workBench/sparePartsSortOut'], resolve)
    },
    //任务列表（首页我的任务->任务列表->任务->备件回收
    {
      path: '/workBench/workBenchPartRecycle',
      name: 'workBenchPartRecycle',
      component: resolve => require(['@/views/workBench/workBenchPartRecycle'], resolve)
    },
    //首页关注->需关注事件列表
    {
      path: '/home/eventList',
      name: 'focusEventList',
      component: resolve => require(['@/views/home/eventList'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    //首页关注->需关注事件列表->事件详情
    {
      path: '/home/eventShow',
      name: 'eventShow',
      component: resolve => require(['@/views//home/eventShow'], resolve)
    },
    //首页关注->需关注事件列表->事件详情->补充说明
    {
      path: '/home/eventReplenish',
      name: 'eventReplenish',
      component: resolve => require(['@/views/home/eventReplenish'], resolve)
    },
    //首页关注->需关注事件列表->事件详情->意见反馈
    {
      path: '/home/eventFeedback',
      name: 'eventFeedback',
      component: resolve => require(['@/views/home/eventFeedback'], resolve)
    },
    //首页关注->需关注事件列表->事件详情->服务评价
    {
      path: '/home/eventEvaluation',
      name: 'eventEvaluation',
      component: resolve => require(['@/views/home/eventEvaluation'], resolve)
    },
    //首页关注->需关注事件列表->事件详情->相关人员
    {
      path: '/home/eventPeople',
      name: 'eventPeople',
      component: resolve => require(['@/views/home/eventPeople'], resolve)
    },
    //首页关注->需关注事件列表->事件详情->相关报修
    {
      path: '/home/eventRepair',
      name: 'eventRepair',
      component: resolve => require(['@/views/home/eventRepair'], resolve)
    },
    //首页关注->需关注事件列表->事件详情->SLA反馈
    {
      path: '/home/eventSLAInfo',
      name: 'eventSLAInfo',
      component: resolve => require(['@/views/home/eventSLAInfo'], resolve)
    },
     
    {
      path: '/workBench/personnelInfo',
      name: 'personnelInfo',
      component: resolve => require(['@/views/workBench/personnelInfo'], resolve)
    },
    {
      path: '/home/addParts',
      name: 'addParts',
      component: resolve => require(['@/views/home/addParts'], resolve)
    },
    
    {
      path: '/home/eventEvaluationEditor',
      name: 'eventEvaluationEditor',
      component: resolve => require(['@/views/home/eventEvaluationEditor'], resolve)
    },
    {
      path: '/home/eventEvaluationShow',
      name: 'eventEvaluationShow',
      component: resolve => require(['@/views/home/eventEvaluationShow'], resolve)
    },
    {
      path: '/home/programList',
      name: 'programList',
      component: resolve => require(['@/views/home/programList'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    
    {
      path: '/home/opinion',
      name: 'opinion',
      component: resolve => require(['@/views/home/opinion'], resolve)
    },
    {
      path: '/workBench/workBenchInfo',
      name: 'workBenchInfo',
      component: resolve => require(['@/views/workBench/workBenchInfo'], resolve)
    },
    {
      path: '/workBench/workBenchIndustryCustomerList',
      name: 'workBenchIndustryCustomerList',
      component: resolve => require(['@/views/workBench/workBenchIndustryCustomerList'], resolve)
    },
    {
      path: '/workBench/workBenchInfoSaleManagement',
      name: 'workBenchInfoSaleManagement',
      component: resolve => require(['@/views/workBench/workBenchInfoSaleManagement'], resolve)
    },
    {
      path: '/workBench/workBenchInfoDetail',
      name: 'workBenchInfoDetail',
      component: resolve => require(['@/views/workBench/workBenchInfoDetail'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },  
    {
      path: '/workBench/workBenchEventInfo',
      name: 'workBenchEventInfo',
      component: resolve => require(['@/views/workBench/workBenchEventInfo'], resolve)
    },
    {
      path: '/workBench/workBenchEventInfoShow',
      name: 'workBenchEventInfoShow',
      component: resolve => require(['@/views/workBench/workBenchEventInfoShow'], resolve)
    },
    //首页人员管理
    {
      path: '/workBench/workBenchPeopleInfo',
      name: 'workBenchPeopleInfo',
      component: resolve => require(['@/views/workBench/workBenchPeopleInfo'], resolve)
    },
    //首页人员管理->人员信息
    {
      path: '/workBench/workBenchPeopleInfoOfCity',
      name: 'workBenchPeopleInfoOfCity',
      component: resolve => require(['@/views/workBench/workBenchPeopleInfoOfCity'], resolve)
    },
    //首页人员管理->人员信息->单个人员信息
    {
      path: '/workBench/workBenchPeopleInfoDetail',
      name: 'workBenchPeopleInfoDetail',
      component: resolve => require(['@/views/workBench/workBenchPeopleInfoDetail'], resolve)
    },
    //首页备件管理
    {
      path: '/workBench/workBenchParts',
      name: 'workBenchParts',
      component: resolve => require(['@/views/workBench/workBenchParts'], resolve)
    },
    //首页备件管理列表->备件信息（自有）
    {
      path: '/workBench/workBenchPartsOwnList',
      name: 'workBenchPartsOwnList',
      component: resolve => require(['@/views/workBench/workBenchPartsOwnList'], resolve)
    },
    //首页备件管理列表-备件信息（自有）->备件详情(自有)
    {
      path: '/workBench/workBenchOwnPartsDetail',
      name: 'workBenchOwnPartsDetail',
      component: resolve => require(['@/views/workBench/workBenchOwnPartsDetail'], resolve)
    },
   
    //首页备件管理列表->备件信息（供应商）  
    {
      path: '/workBench/workBenchPartsSupplierList',
      name: 'workBenchPartsSupplierList',
      component: resolve => require(['@/views/workBench/workBenchPartsSupplierList'], resolve)
    },
     //首页备件管理列表->备件信息（供应商）->备件详情（供应商）
     {
      path: '/workBench/workBenchSupplierPartsDetail',
      name: 'workBenchSupplierPartsDetail',
      component: resolve => require(['@/views/workBench/workBenchSupplierPartsDetail'], resolve)
    },
    //首页供应商管理
    {
      path: '/workBench/workBenchSupplier',
      name: 'workBenchSupplier',
      component: resolve => require(['@/views/workBench/workBenchSupplier'], resolve)
    },
    //首页供应商管理->供应商信息
    {
      path: '/workBench/workBenchSupplierInfoOfCity',
      name: 'workBenchSupplierInfoOfCity',
      component: resolve => require(['@/views/workBench/workBenchSupplierInfoOfCity'], resolve)
    },
    //首页供应商管理->供应商信息->供应商详情
    {
      path: '/workBench/workBenchSupplierDetailInfo',
      name: 'workBenchSupplierDetailInfo',
      component: resolve => require(['@/views/workBench/workBenchSupplierDetailInfo'], resolve)
    },
    //首页管理仓->PO管理
    {
      path: '/workBench/workBenchPOinfo',
      name: 'workBenchPOinfo',
      component: resolve => require(['@/views/workBench/workBenchPOinfo'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    //首页管理仓->PO管理->PO信息-人员
    {
      path: '/workBench/workBenchPOStaff',
      name: 'workBenchPOStaff',
      component: resolve => require(['@/views/workBench/workBenchPOStaff'], resolve),
    },
    //首页管理仓->PO管理->PO信息-备件
    {
      path: '/workBench/workBenchPOParts',
      name: 'workBenchPOParts',
      component: resolve => require(['@/views/workBench/workBenchPOParts'], resolve)
    },
    //首页管理仓->PO管理->PO信息-PO支付详情
    {
      path: '/workBench/workBenchPOPayDetail',
      name: 'workBenchPOPayDetail',
      component: resolve => require(['@/views/workBench/workBenchPOPayDetail'], resolve)
    },
    {
      path: '/workBench/workBenchQualityControl',
      name: 'workBenchQualityControl',
      component: resolve => require(['@/views/workBench/workBenchQualityControl'], resolve)
    },
    {
      path: '/workBench/workBenchMyEvent',
      name: 'workBenchMyEvent',
      component: resolve => require(['@/views/workBench/workBenchMyEvent'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/workBench/workBenchMyEventAll',
      name: 'workBenchMyEventAll',
      component: resolve => require(['@/views/workBench/workBenchMyEventAll'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/workBench/workBenchMyPro',
      name: 'workBenchMyPro',
      component: resolve => require(['@/views/workBench/workBenchMyPro'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/workBench/workBenchMyProAll',
      name: 'workBenchMyProAll',
      component: resolve => require(['@/views/workBench/workBenchMyProAll'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
 
    {
      path: '/workBench/workBenchDeclare',
      name: 'workBenchDeclare',
      component: resolve => require(['@/views/workBench/workBenchDeclare'], resolve)
    },
     
    
    {
      path: '/workBench/part_recycles',
      name: 'partRecycles',
      component: resolve => require(['@/views/workBench/part_recycle'], resolve)
    },
    
    
    {
      path: '/workBench/applicationSupport',
      name: 'applicationSupport',
      component: resolve => require(['@/views/workBench/applicationSupport'], resolve),
    },
    {
      path: '/workBench/application',
      name: 'application',
      component: resolve => require(['@/views/workBench/application'], resolve),
    },
    {
      path: '/workBench/baseInfomation',
      name: 'baseInfomation',
      component: resolve => require(['@/views/workBench/baseInfomation'], resolve),
    },
    {
      path: '/workBench/myApplication',
      name: 'myApplication',
      component: resolve => require(['@/views/workBench/myApplication'], resolve),
    },
    {
      path: '/workBench/caseProgress',
      name: 'caseProgress',
      component: resolve => require(['@/views/workBench/caseProgress'], resolve),
    },
    {
      path: '/reportform/reportFormShow',
      name: 'reportFormShow',
      component: resolve => require(['@/views/reportform/reportFormShow'], resolve)
    },
    {
      path: '/mine/mineNotice',
      name: 'mineNotice',
      component: resolve => require(['@/views/mine/mineNotice'], resolve)
    },
    //设置-反馈建议（App）
    {
      path: '/mine/mineAppFeedBack',
      name: 'mineAppFeedBack',
      component: resolve => require(['@/views//mine/mineAppFeedBack'], resolve)
    },
    //设置-修改密码
    {
      path: '/mine/changePwd',
      name: 'changePwd',
      component: resolve => require(['@/views//mine/changePwd'], resolve)
    },
    {
      path: '/mine/mineFeedback',
      name: 'mineFeedback',
      component: resolve => require(['@/views//mine/mineFeedback'], resolve)
    },
    {
      path: '/mine/mineFeedbackShow',
      name: 'mineFeedbackShow',
      component: resolve => require(['@/views//mine/mineFeedbackShow'], resolve)
    },
    {
      path: '/home/caseEvaluateList',
      name: 'caseEvaluateList',
      component: resolve => require(['@/views/home/caseEvaluateList'], resolve)
    },
    {
      path: '/home/complaintList',
      name: 'complaintList',
      component: resolve => require(['@/views/home/complaintList'], resolve)
    },
    {
      path: '/home/projectEvaluateList',
      name: 'projectEvaluateList',
      component: resolve => require(['@/views/home/projectEvaluateList'], resolve)
    },
    {
      path: '/reportform/qualityDetailDept',
      name: 'qualityDetailDept',
      component: resolve => require(['@/views/reportform/qualityDetailDept'], resolve)
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
