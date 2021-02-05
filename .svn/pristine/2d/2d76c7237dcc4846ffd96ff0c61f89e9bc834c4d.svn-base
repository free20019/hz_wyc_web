<!--综合信息查询->综合驾驶员查询-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-select v-model="query.ptname" clearable placeholder="平台名称">
          <el-option
            v-for="item in this.OnlyCompany"
            :key="item.ID"
            :label="item.TEXT"
            :value="item.ID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.driverNum" placeholder="请输入驾驶证号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="querySearch1">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-card class="tw-card tw-card-full" :body-style="{padding: 0}" header="驾驶员基本信息">
        <el-form
          class="tw-form"
          v-model="jsyxxForm"
          :label-position="labelPosition"
          :inline="true"
          size="small"
          label-width="150px"
          ref="driverBaseInfo"
        >
          <el-form-item label="平台名称">
            <el-input :value="jsyxxForm.COMPANYNAME" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶员姓名">
            <el-input :value="jsyxxForm.DRIVERNAME" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶员电话">
            <el-input :value="jsyxxForm.DRIVERPHONE" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶员性别">
            <el-input :value="sexFormatter(jsyxxForm.DRIVERGENDER)" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶员国籍">
            <el-input :value="jsyxxForm.DRIVERNATIONALITY" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶员民族">
            <el-input :value="jsyxxForm.DRIVERNATION" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶员婚姻状况">
            <el-input :value="jsyxxForm.DRIVERMARITALSTATUS" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶员外语能力">
            <el-input :value="jsyxxForm.DRIVERLANGUAGELEVEL" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶员学历">
            <el-input :value="jsyxxForm.DRIVEREDUCATION" readonly></el-input>
          </el-form-item>
          <el-form-item label="准考车型">
            <el-input :value="jsyxxForm.DRIVERTYPE" readonly></el-input>
          </el-form-item>
          <el-form-item label="初次领证驾驶证日期">
            <el-input :value="timeFormatter(jsyxxForm.GETDRIVERLICENSEDATE)" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶证有效期限起">
            <el-input :value="timeFormatter(jsyxxForm.DRIVERLICENSEON)" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶证有效期限止">
            <el-input :value="timeFormatter(jsyxxForm.DRIVERLICENSEOFF)" readonly></el-input>
          </el-form-item>
          <el-form-item label="是否巡游出租驾驶员">
            <el-input :value="oneYesTowNoFormatter(jsyxxForm.TAXIDRIVER)" readonly></el-input>
          </el-form-item>
          <el-form-item label="网络预约出资格证号">
            <el-input :value="jsyxxForm.CERTIFICATENO" readonly></el-input>
          </el-form-item>
          <el-form-item label="发证机构">
            <el-input :value="jsyxxForm.NETWORKCARISSUEORGANIZATION" readonly></el-input>
          </el-form-item>
          <el-form-item label="资格证发证日期">
            <el-input :value="timeFormatter(jsyxxForm.NETWORKCARISSUEDATE)" readonly></el-input>
          </el-form-item>
          <el-form-item label="初次领取资格证日期">
            <el-input :value="timeFormatter(jsyxxForm.GETNETWORKCARPROOFDATE)" readonly></el-input>
          </el-form-item>
          <el-form-item label="资格证有效起始日期">
            <el-input :value="timeFormatter(jsyxxForm.NETWORKCARPROOFON)" readonly></el-input>
          </el-form-item>
          <el-form-item label="资格证有效截止日期">
            <el-input :value="timeFormatter(jsyxxForm.NETWORKCARPROOFOFF)" readonly></el-input>
          </el-form-item>
          <el-form-item label="注册日期">
            <el-input :value="timeFormatter(jsyxxForm.REGISTERDATE)" readonly></el-input>
          </el-form-item>
          <el-form-item label="是否专职司机">
            <el-input :value="oneYesTowNoFormatter(jsyxxForm.FULLTIMEDRIVER)" readonly></el-input>
          </el-form-item>
          <el-form-item label="是否驾驶员黑名单内">
            <el-input :value="oneYesTowNoFormatter(jsyxxForm.INDRIVERBLACKLIST)" readonly></el-input>
          </el-form-item>
          <el-form-item label="服务类型">
            <el-input :value="commercialtypeFormatter(jsyxxForm.COMMERCIALTYPE)" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶员合同签署公司">
            <el-input :value="jsyxxForm.CONTRACTCOMPANY" readonly></el-input>
          </el-form-item>
          <el-form-item label="合同有效期起">
            <el-input :value="timeFormatter(jsyxxForm.CONTRACTON)" readonly></el-input>
          </el-form-item>
          <el-form-item label="合同有效期止">
            <el-input :value="timeFormatter(jsyxxForm.CONTRACTOFF)" readonly></el-input>
          </el-form-item>
          <el-form-item label="紧急情况联系人">
            <el-input :value="jsyxxForm.EMERGENCYCONTACT" readonly></el-input>
          </el-form-item>
          <el-form-item label="紧急情况联系人电话">
            <el-input :value="jsyxxForm.EMERGENCYCONTACTPHONE" readonly></el-input>
          </el-form-item>
          <el-form-item label="户口登记机关名称">
            <el-input :value="jsyxxForm.DRIVERCENSUS" readonly></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人通讯地址">
            <el-input :value="jsyxxForm.EMERGENCYCONTACTADDRESS" readonly></el-input>
          </el-form-item>
          <el-form-item label="户口住址或长住地址">
            <el-input :value="jsyxxForm.DRIVERADDRESS" readonly></el-input>
          </el-form-item>
          <el-form-item label="驾驶员通信地址">
            <el-input :value="jsyxxForm.DRIVERCONTACTADDRESS" readonly></el-input>
          </el-form-item>
        </el-form>
        <el-tabs class="tw-tabs" v-model="activeName" ref="tabPanel" @tab-click="tabHandleClick">
          <el-tab-pane
            v-for="jsyxxTabList in jsyxxTabLists"
            :key="jsyxxTabList.name"
            :label="jsyxxTabList.label"
            :name="jsyxxTabList.name"
          >
            <el-table class="tw-table" :data="jsyxxTabList.data" border size="small" height="100%">
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column
                v-for="item in jsyxxTabList.column"
                :key="item.name"
                :prop="item.name"
                :label="item.title"
                :width="item.width"
                :formatter="item.formatter"
                :min-width="item['min-width']"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { templateHeight, formatTemplateHeight } from '../../../assets/js/util'

export default {
  name: 'IntegratedDriverQuery',
  data() {
    return {
      query: {
        ptname: '',
        driverNum: ''
      },
      OnlyCompany: [],
      activeName: 'first',
      jsyxxForm: {},
      labelPosition: 'right',
      driverAppData: [], //驾驶员移动终端信息结果集
      lastSearchInfo: '', //最后一次搜索信息
      jsyxxTabLists: [
        {
          name: 'first',
          label: '驾驶员培训信息',
          data: [],
          column: [
            { name: 'COMPANYNAME', title: '平台名称', width: 200 },
            { name: 'ADDRESS', title: '行政区划', width: 120 },
            { name: 'COURSENAME', title: '驾驶员培训课程名称', width: 160 },
            {
              name: 'COURSEDATE',
              title: '培训课程日期',
              formatter: this.timeFormatter,
              width: 120
            },
            { name: 'STARTTIME', title: '培训开始时间', width: 180 },
            { name: 'STOPTIME', title: '培训结束时间', width: 150 },
            {
              name: 'FLAG',
              title: '操作标识',
              formatter: this.flagFormatter,
              width: 100
            },
            {
              name: 'UPDATETIME',
              title: '更新时间',
              formatter: this.timeFormatter,
              'min-width': 180,
              resizable: true
            }
          ]
        },
        {
          name: 'second',
          label: '驾驶员移动终端信息',
          data: this.driverAppData,
          column: [
            { name: 'COMPANYNAME', title: '平台名称', width: 100 },
            { name: 'ADDRESS', title: '注册地行政区划代码', width: 240 },
            { name: 'DRIVERPHONE', title: '驾驶员手机号', width: 140 },
            { name: 'NETTYPE', title: '手机运营商', width: 180 },
            { name: 'APPVERSION', title: '使用APP版本号', width: 140 },
            { name: 'MAPTYPE', title: '使用地图类型', width: 100 },
            {
              name: 'STATE',
              title: '状态',
              formatter: this.stateFormatter,
              width: 100
            },
            {
              name: 'FLAG',
              title: '操作标识',
              formatter: this.flagFormatter,
              width: 100
            },
            {
              name: 'UPDATETIME',
              title: '更新时间',
              formatter: this.timeFormatter,
              'min-width': 180,
              resizable: true
            }
          ]
        },
        {
          name: 'third',
          label: '驾驶员统计信息',
          data: [],
          column: [
            { name: 'COMPANYNAME', title: '平台名称', width: 100 },
            { name: 'ADDRESS', title: '注册地行政区划代码', width: 240 },
            { name: 'CYCLE', title: '统计周期', width: 100 },
            { name: 'ORDERCOUNT', title: '完成订单次数', width: 100 },
            {
              name: 'TRAFFICVIOLATIONCOUNT',
              title: '交通违章次数',
              width: 100
            },
            { name: 'COMPLAINEDCOUNT', title: '被投诉次数', width: 100 },
            {
              name: 'FLAG',
              title: '操作标识',
              formatter: this.flagFormatter,
              width: 100
            },
            {
              name: 'UPDATETIME',
              title: '更新时间',
              formatter: this.timeFormatter,
              'min-width': 180,
              resizable: true
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements, () => {
        this.$refs['tabPanel'].$el.style.height = formatTemplateHeight(
          this.$refs['driverBaseInfo'].$el
        )
      })
      this.getCompany()
      setTimeout(() => {
        this.$refs['tabPanel'].$el.style.height = formatTemplateHeight(
          this.$refs['driverBaseInfo'].$el
        )
      }, 100)
    })
  },
  computed: {
    // ...mapGetters(["getAutoCompanyName"])
  },
  methods: {
    getCompany() {
      axios
        .post('manage/findOnlyCompany', '', {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.OnlyCompany = _.filter(data, item => item.ID)
        })
    },
    timeFormatter(value) {
      if (value != null) {
        return moment(value).format('YYYY-MM-DD')
      } else {
        return ''
      }
    },
    //查询
    querySearch1() {
      if (this.query.ptname == '0') {
        this.$message('请选择公司名称')
        return
      } else if (this.query.driverNum == '') {
        this.$message('请输入驾驶证号')
        return
      } else {
        this.getData()
      }
    },
    getData() {
      this.lastSearchInfo = this.query.ptname + ',' + this.query.driverNum
      let idata = `postData={'ptname':'${this.query.ptname}','jszh':'${this.query.driverNum}'}`
      axios
        .post('manage/findJsyxx', idata, {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.jsyxxTabLists[0].data = res.data.pxxx
          this.jsyxxForm = {}
          if (res.data.jsyxx[0]) {
            this.jsyxxForm = res.data.jsyxx[0]
          } else {
            this.$message('暂无数据')
          }
        })
    },
    //车牌号码输入框输入后匹配信息
    querySearch(query, cb) {
      if (query.length >= 5) {
        let idata = `postData={'vehino':'${query}'}`
        axios
          .post('manage/findJcVehicleNo', idata, {
            baseURL: this.baseURL
          })
          .then(({ data }) => {
            for (let i = 0; i < data.vehicleNo.length; i++) {
              data.vehicleNo[i].value = data.vehicleNo[i].VEHICLENO
            }
            cb(data.vehicleNo)
          })
      } else {
        return
      }
    },
    //车牌号码输入框聚焦事件
    inputfocus() {
      this.query.vehino = '浙A' + this.query.veNum
    },
    //车牌号码输入建议列表显示信息选中事件
    handleSelect(item) {},
    //tab切换事件
    tabHandleClick(item, name) {
      // if(this.query.ptname+","+this.query.driverNum != this.lastSearchInfo){
      if (name.target.textContent === '驾驶员移动终端信息') {
        //驾驶员移动终端信息
        let idata = `postData={'ptname':'${this.query.ptname}','jszh':'${this.query.driverNum}'}`
        axios
          .post('manage/getDriverApp', idata, {
            baseURL: this.baseURL
          })
          .then(({ data }) => {
            // this.driverAppData = data.ydzd
            this.jsyxxTabLists[1].data = data.ydzd
          })
      } else if (name.target.textContent === '驾驶员统计信息') {
        //驾驶员移动终端信息
        let idata = `postData={'ptname':'${this.query.ptname}','jszh':'${this.query.driverNum}'}`
        axios
          .post('manage/getDriverStat', idata, {
            baseURL: this.baseURL
          })
          .then(({ data }) => {
            // this.driverAppData = data.tjxx
            this.jsyxxTabLists[2].data = data.tjxx
          })
      }
      // }
    },
    //操作标识
    flagFormatter(value) {
      if (value == '1') {
        return '新增'
      } else if (value == '2') {
        return '更新'
      } else {
        return '删除'
      }
    },
    //状态
    stateFormatter(value) {
      if (value + '' == '0') {
        return '有效'
      } else if (value + '' == '1') {
        return '失效'
      } else {
        return value
      }
    },
    //1是2否
    oneYesTowNoFormatter(value) {
      if (value + '' == '0') {
        return '否'
      } else if (value + '' == '1') {
        return '是'
      } else {
        return value
      }
    },
    //服务类型
    commercialtypeFormatter(value) {
      if (value + '' == '1') {
        return '网约车'
      } else if (value + '' == '2') {
        return '巡游车'
      } else if (value + '' == '3') {
        return '合乘车'
      } else {
        return value
      }
    },
    //服务类型
    sexFormatter(value) {
      if (value + '' == '1') {
        return '男'
      } else if (value + '' == '2') {
        return '女'
      } else {
        return value
      }
    }
    // //时间格式转换
    // timeFormatter(item, col, value){
    // 	return moment(value).format('YYYY-MM-DD HH:mm:ss')
    // }
  }
}
</script>

<style lang="scss" scoped>
.tw-query {
  &-bar {
    border-bottom: none;
  }

  &-panel {
    overflow: auto;
    padding-top: 0;
  }
}

.tw-form {
  overflow: auto;
  min-height: 200px;
  height: 485px;
  box-sizing: border-box;
}

.tw-tabs {
  min-height: 300px;
  height: calc(100% - 485px) !important;
}
</style>
