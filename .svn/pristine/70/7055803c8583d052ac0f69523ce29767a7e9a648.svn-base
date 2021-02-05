import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('./views/Index2.vue'),
      redirect: '/yingyunzonglan',
      children: [
        /* ******营运动态监测****** */
        /*车辆动态监控*/
        {
          path: '/yydt/cldtjk',
          name: 'VehicleDynamicMonitor',
          component: () => import('./views/operationalDynamicMonitor/VehicleDynamicMonitor.vue')
        },
        /*营运总览*/
        {
          path: '/yingyunzonglan',
          name: 'OperationOverview',
          component: () => import('./views/operationalDynamicMonitor/OperationOverview.vue')
        },
        {
          path: '/yydt/cldtjk2',
          name: 'VehicleDynamicMonitor2',
          component: () => import('./views/operationalDynamicMonitor/VehicleDynamicMonitor2.vue')
        },
        /*特定区域监测*/
        {
          path: '/yydt/tdqyjc',
          name: 'SpecificAreaMonitor',
          component: () => import('./views/operationalDynamicMonitor/SpecificAreaMonitor.vue')
        },
        /*历史轨迹回放*/
        {
          path: '/yydt/lsgjhf',
          name: 'HistoricalTrackPlayback',
          component: () => import('./views/operationalDynamicMonitor/HistoricalTrackPlayback.vue')
        },
        {
          path: '/yydt/lsgjhf/:vehi_no',
          name: 'HistoricalTrackPlayback',
          component: () => import('./views/operationalDynamicMonitor/HistoricalTrackPlayback.vue')
        },
        /*多车动态监控*/
        {
          path: '/yydt/dcdtjk',
          name: 'CarsDynamicMonitor',
          component: () => import('./views/operationalDynamicMonitor/CarsDynamicMonitor.vue')
        },
        /*越区经营预警*/
        {
          path: '/yydt/jcsjcx/yqjyjk',
          name: 'CrossAreaManagementMonitor',
          component: () => import('./views/operationalDynamicMonitor/CrossAreaManagementMonitor.vue')
        },
        /*新增功能*/
        /*无证车辆上线预警*/
        {
          path: '/yydt/jcsjcx/xzgn',
          name: 'xzgn',
          component: () => import('./views/operationalDynamicMonitor/xzgnMonitor.vue')
        },
        /*人车不符经营预警*/
        {
          path: '/yydt/jcsjcx/rcbfjyyj',
          name: 'rcbfjyyj',
          component: () => import('./views/operationalDynamicMonitor/PeopleCarMatchWarning.vue')
        },
        /*热里分布*/
        {
          path: '/yydt/rlfb',
          name: 'rlfb',
          component: () => import('./views/operationalDynamicMonitor/rlfbMonitor.vue')
        },
        /*区域管理*/
        {
          path: '/yydt/qygl',
          name: 'SpecificAreaManage',
          component: () => import('./views/operationalDynamicMonitor/SpecificAreaManage.vue')
        },
        /*特殊目标查询*/
        {
          path: '/fzjc/zhxxcx/tsmbcx',
          name: 'SpecialTargetQuery',
          component: () => import('./views/operationalDynamicMonitor/SpecialTargetQuery.vue')
        },
        /*车辆运营管理*/
        {
          path: '/yydt/clyygl',
          name: 'VehicleOperationManage',
          component: () => import('./views/operationalDynamicMonitor/VehicleOperationManage.vue')
        },
        /*乘客流向分析*/
        {
          path: 'yydt/cklxfx1',
          name: 'PassengerFlowAnalysis',
          component: () => import('./views/operationalDynamicMonitor/cklxfx.vue')
        },
        /*违规流向分析*/
        {
          path: 'yydt/cklxfx',
          name: 'PassengerFlowAnalysis',
          component: () => import('./views/operationalDynamicMonitor/PassengerFlowAnalysis.vue')
        },
        /*违规营运预警*/
        {
          path: '/yydt/jcsjcx/wzyyfx',
          name: 'ViolationOperationAnalysis',
          component: () => import('./views/operationalDynamicMonitor/ViolationOperationAnalysis.vue')
        },
        /*车辆超期预警*/
        {
          path: '/yydt/jcsjcx/clcqyj',
          name: 'VehicleOverdueWarning',
          component: () => import('./views/operationalDynamicMonitor/VehicleOverdueWarning.vue')
        },
        /*指定目标查询*/
        {
          path: '/yydt/jcsjcx/zdmbcx',
          name: 'zdmbcx',
          component: () => import('./views/operationalDynamicMonitor/zdmbcx.vue')
        },
        /* ******辅助决策****** */
        /*基础数据查询*/
        /* {
					 path: '/fzjc/jclsjcx',
					 name: 'BasicDataQuery',
					 component: () => import ('./views/decisionSupport/BasicDataQuery.vue')
				 },*/
        /* ***基础数据查询*** */
        /*平台信息*/
        {
          path: '/fzjc/jcsjcx/ptxx',
          name: 'platformInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/platformInformation.vue')
        },
        /*平台经营许可信息*/
        {
          path: '/fzjc/jcsjcx/ptjyxkxx',
          name: 'platformlicensingInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/platformlicensingInformation.vue')
        },
        /*平台营运规模信息*/
        {
          path: '/fzjc/jcsjcx/ptyygmxx',
          name: 'platformOperationScaleInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/platformOperationScaleInformation.vue')
        },
        /*平台支付信息*/
        {
          path: '/fzjc/jcsjcx/ptzfxx',
          name: 'platformPayInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/platformPayInformation.vue')
        },
        /*平台服务机构*/
        {
          path: '/fzjc/jcsjcx/ptfwjg',
          name: 'platformServiceOrganization',
          component: () => import('./views/decisionSupport/BaseDataQuery/platformServiceOrganization.vue')
        },
        /*平台运价信息*/
        {
          path: '/fzjc/jcsjcx/ptyjxx',
          name: 'platformPriceInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/platformPriceInformation.vue')
        },
        /*车辆信息*/
        {
          path: '/fzjc/jcsjcx/clxx',
          name: 'CarInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/CarInformation.vue')
        },
        /*车辆保险信息*/
        {
          path: '/fzjc/jcsjcx/clbxxx',
          name: 'CarInsuranceInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/CarInsuranceInformation.vue')
        },
        /*车辆保险信息*/
        {
          path: '/fzjc/jcsjcx/cllcxx',
          name: 'CarMileageInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/CarMileageInformation.vue')
        },
        /*驾驶员信息*/
        {
          path: '/fzjc/jcsjcx/jsyxx',
          name: 'DriverInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/DriverInformation.vue')
        },
        /*驾驶员培训信息*/
        {
          path: '/fzjc/jcsjcx/jsypxxx',
          name: 'DriverTrainInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/DriverTrainInformation.vue')
        },
        /*驾驶员移动终端信息*/
        {
          path: '/fzjc/jcsjcx/jsyydzdxx',
          name: 'DriverMobileTerminalInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/DriverMobileTerminalInformation.vue')
        } /*驾驶员统计信息*/,
        {
          path: '/fzjc/jcsjcx/jsytjxx',
          name: 'DriverStatisticsInformation',
          component: () => import('./views/decisionSupport/BaseDataQuery/DriverStatisticsInformation.vue')
        },

        /*综合信息查询*/
        /*1、综合平台查询
         */
        {
          path: '/fzjc/jcsjcx/zhptcx',
          name: 'IntegratedPlatformQuery',
          component: () => import('./views/decisionSupport/ComprehensiveInfoQuery/IntegratedPlatformQuery.vue')
        },
        /*2、综合车辆查询
         */
        {
          path: '/fzjc/jcsjcx/zhclcx',
          name: 'IntegratedCarQuery',
          component: () => import('./views/decisionSupport/ComprehensiveInfoQuery/IntegratedCarQuery.vue')
        },
        /*3、综合驾驶员查询
         */
        {
          path: '/fzjc/jcsjcx/zhjsycx',
          name: 'IntegratedDriverQuery',
          component: () => import('./views/decisionSupport/ComprehensiveInfoQuery/IntegratedDriverQuery.vue')
        },

        /*综合订单查询*/
        {
          path: '/fzjc/zhxxcx/zhddcx',
          name: 'ComprehensiveOrderQuery',
          component: () => import('./views/decisionSupport/ComprehensiveOrderQuery.vue')
        },
        /*经营业务查询*/
        {
          path: '/fzjc/yyywcx',
          name: 'BusinessInquiry',
          component: () => import('./views/decisionSupport/BusinessInquiry.vue')
        },
        /*许可查询*/
        /*企业查询*/
        {
          path: '/fzjc/xkcx/qycx',
          name: 'CompanyQuery',
          component: () => import('./views/decisionSupport/LicenseQuery/CompanyQuery.vue')
        },
        /*驾驶员查询*/
        {
          path: '/fzjc/xkcx/drivercx',
          name: 'DriverQuery',
          component: () => import('./views/decisionSupport/LicenseQuery/DriverQuery.vue')
        },
        /*车辆查询*/
        {
          path: '/fzjc/xkcx/carcx',
          name: 'CarQuery',
          component: () => import('./views/decisionSupport/LicenseQuery/CarQuery.vue')
        },
        /*企业经营统计*/
        {
          path: '/fzjc/qyyytj',
          name: 'BusinessStatistics',
          component: () => import('./views/decisionSupport/BusinessStatistics.vue')
        },
        /*车辆运行统计*/
        {
          path: '/fzjc/clyxtj',
          name: 'VehicleOperationStatistics',
          component: () => import('./views/decisionSupport/VehicleOperationStatistics.vue')
        },
        /*订单数据统计*/
        /*企业月报*/
        // {
        //   path: '/fzjc/ddsjtj/qyyb',
        //   name: 'EnterpriseMonthlyReport',
        //   component: () => import('./views/decisionSupport/OrderData/EnterpriseMonthlyReport.vue')
        // },
        // /*企业日报*/
        // {
        //   path: '/fzjc/ddsjtj/qyrb',
        //   name: 'OrderDataStatistics.vue',
        //   component: () => import('./views/decisionSupport/OrderData/OrderDataStatistics.vue')
        // },
        /*行业运行统计*/
        /*{
          path: '/fzjc/hyyytj',
          name: 'IndustryOperationStatistics',
          component: () => import ('./views/decisionSupport/IndustryOperationStatistics.vue')
        },*/
        /*行业运行统计*/
        /*1、异常经营分析*/
        {
          path: '/fzjc/hyyxtj/ycjyfx',
          name: 'AnalysisAbnormalOperation',
          component: () => import('./views/decisionSupport/StatisticsIndustryOperation/AnalysisAbnormalOperation.vue')
        },
        /*2、未营运车辆统计*/
        {
          path: '/fzjc/hyyxtj/wyycltj',
          name: 'StatisticsUnoperatedVehicles',
          component: () =>
            import('./views/decisionSupport/StatisticsIndustryOperation/StatisticsUnoperatedVehicles.vue')
        },
        /*3、未营运驾驶员统计*/
        {
          path: '/fzjc/hyyxtj/wyyjsytj',
          name: 'StatisticsUnoperatedDriver',
          component: () => import('./views/decisionSupport/StatisticsIndustryOperation/StatisticsUnoperatedDriver.vue')
        },
        /*4、营运出车统计*/
        {
          path: '/fzjc/hyyxtj/yycctj',
          name: 'OperatingOutboundStatistics',
          component: () => import('./views/decisionSupport/StatisticsIndustryOperation/OperatingOutboundStatistics.vue')
        },
        /*5、运力分析报告*/
        {
          path: '/fzjc/hyyxtj/ylfxbg',
          name: 'CapacityAnalysisReport',
          component: () => import('./views/decisionSupport/StatisticsIndustryOperation/CapacityAnalysisReport.vue')
        },
        /*6、单车收益分析*/
        {
          path: '/fzjc/hyyxtj/dcsyfx',
          name: 'BicycleIncomeAnalysis',
          component: () => import('./views/decisionSupport/StatisticsIndustryOperation/BicycleIncomeAnalysis.vue')
        },
        /*企业营运业务统计*/
        /*企业日均营运统计*/
        {
          path: '/fzjc/qyyyywtj/qyrjyytj',
          name: 'qyrjyytj',
          component: () => import('./views/decisionSupport/CompOperation/qyrjyytj.vue')
        },
        {
          path: '/fzjc/qyyyywtj/qyydyytj',
          name: 'qyrjyytj',
          component: () => import('./views/decisionSupport/CompOperation/qyydyytj.vue')
        },
        /*企业日均单车效益分析*/
        {
          path: '/fzjc/qyyyywtj/qyrjdcfx',
          name: 'qyrjdcfx',
          component: () => import('./views/decisionSupport/CompOperation/qyrjdcfx.vue')
        },
        {
          path: '/fzjc/qyyyywtj/qyyddctj',
          name: 'qyrjdcfx',
          component: () => import('./views/decisionSupport/CompOperation/qyyddctj.vue')
        },
        /*服务质量统计*/
        {
          path: '/fzjc/fwzltj',
          name: 'ServiceQualityStatistics',
          component: () => import('./views/decisionSupport/ServiceQualityStatistics.vue')
        },
        {
          path: '/gljc/yyxwfx/zxlfx',
          name: 'OnlineRateStatistics',
          component: () => import('./views/operationalAnalysis/OnlineRateStatistics.vue')
        },
        /*服务质量*/
        /*12328投诉查询*/
        {
          path: '/fwzl/12328tscx',
          name: 'ComplaintInquiry',
          component: () => import('./views/serviceQuality/ComplaintInquiry.vue')
        },
        /*投诉订单查询*/
        {
          path: '/fwzl/tsddcx',
          name: 'ComplaintOrder',
          component: () => import('./views/serviceQuality/ComplaintOrder.vue')
        },
        /*执法调度*/
        {
          path: '/zfjc/zfdd',
          name: 'LawEnforcementDispatch',
          component: () => import('./views/LawEnforcementInspection/LawEnforcementDispatch.vue')
        },
        /*统计导出*/
        {
          path: '/zfjc/tjdc',
          name: 'StatisticsExport',
          component: () => import('./views/LawEnforcementInspection/StatisticsExport.vue')
        },

        /*应急处置*/
        /*应急接入-值班*/
        {
          path: '/yjcz/yjjr/zb',
          name: 'OnDuty',
          component: () => import('./views/emergencyDisposal/yjjr/zb.vue')
        },
        /*应急接入-接入*/
        {
          path: '/yjcz/yjjr/jr',
          name: 'EmAccess',
          component: () => import('./views/emergencyDisposal/yjjr/jr.vue')
        },
        /*启动报送*/
        {
          path: '/yjcz/qdbs',
          name: 'StartSubmission',
          component: () => import('./views/emergencyDisposal/qdbs.vue')
        },
        /*事件处理*/
        /*指挥调度*/
        {
          path: '/yjcz/sjcl/zhdd',
          name: 'CommandDispatch',
          component: () => import('./views/emergencyDisposal/eventProcessing/zhdd.vue')
        },
        /*处置流程*/
        {
          path: '/yjcz/sjcl/czlc',
          name: 'DisposalProcess',
          component: () => import('./views/emergencyDisposal/eventProcessing/czlc.vue')
        },
        /*信息发布*/
        /*信息生成*/
        {
          path: '/yjcz/xxfb/xxsc',
          name: 'InformationGeneration',
          component: () => import('./views/emergencyDisposal/InformationDelivery/xxsc.vue')
        },
        /*信息发布*/
        {
          path: '/yjcz/xxfb/sonxxfb',
          name: 'SonInformationDelivery',
          component: () => import('./views/emergencyDisposal/InformationDelivery/xxfb.vue')
        },
        /*查询与统计*/
        {
          path: '/yjcz/cxytj',
          name: 'QueryStatistics',
          component: () => import('./views/emergencyDisposal/cxytj.vue')
        },
        /*资源库*/
        /*应急预案*/
        {
          path: '/yjcz/zyk/yjya',
          name: 'EmergencyPlan',
          component: () => import('./views/emergencyDisposal/resourceLibrary/yjya.vue')
        },
        /*法律法规*/
        {
          path: '/yjcz/zyk/yjzyk/flfg',
          name: 'LawsRegulations',
          component: () => import('./views/emergencyDisposal/resourceLibrary/flfg.vue')
        },
        /*案例库*/
        {
          path: '/yjcz/zyk/yjzyk/alk',
          name: 'CaseBase',
          component: () => import('./views/emergencyDisposal/resourceLibrary/alk.vue')
        },
        /*企业数据接入*/
        /*数据接入管理*/
        {
          path: '/qysjjr/sjjrgl',
          name: 'DataAccessManagement',
          component: () => import('./views/EnterpriseDataAccess/DataAccessManagement.vue')
        },
        /*数据接入监测*/
        {
          path: '/qysjjr/sjjrjc',
          name: 'DataAccessMonitoring',
          component: () => import('./views/EnterpriseDataAccess/DataAccessMonitoring.vue')
        },
        /*企业运营登记*/
        {
          path: '/qysjjr/qyyydj',
          name: 'BusinessOperationRegistration',
          component: () => import('./views/EnterpriseDataAccess/BusinessOperationRegistration.vue')
        },
        /*用户管理*/
        /*用户*/
        {
          path: '/yhgl/yh',
          name: 'User',
          component: () => import('./views/userManage/User.vue')
        },
        /*权限*/
        {
          path: '/yhgl/qx',
          name: 'Power',
          component: () => import('./views/userManage/Power.vue')
        },
        /*日志*/
        {
          path: '/yhgl/rz',
          name: 'Record ',
          component: () => import('./views/userManage/Record.vue')
        },
        /*违法分析*/
        {
          path: '/zfjc/wffx',
          name: 'IllegalAnalysis ',
          component: () => import('./views/LawEnforcementInspection/IllegalAnalysis.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/NewLogin.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/NotFound.vue')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const baseURL = 'http://172.18.30.1:9090/hzjgpt/'
//   if (to.fullPath == '/login') {
//     next()
//   } else {
//     axios.post('user/makerSuerLogin', '', { baseURL }).then(res => {
//       if (res.data == 0) {
//         next()
//       } else {
//         next()
//         // next({
//         //   path: '/login'
//         // })
//       }
//     })
//   }
// })

export default router
