<!--综合信息查询->综合车辆查询-->
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
        <el-autocomplete
          class="inline-input"
          v-model="query.vehino"
          :fetch-suggestions="handleQuerySearch"
          placeholder="车牌号码"
          :trigger-on-focus="false"
          @focus="handleCarfocus"
          clearable
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="querySearchCar">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-card class="tw-card tw-card-full" :body-style="{padding: 0}" header="车辆基本信息">
        <el-form
          class="tw-form"
          v-model="clxxForm"
          :label-position="labelPosition"
          :inline="true"
          size="small"
          label-width="150px"
          ref="vehicleBaseInfo"
        >
          <el-form-item label="平台名称">
            <el-input :value="clxxForm.COMPANYNAME" readonly></el-input>
          </el-form-item>
          <el-form-item label="行政区划">
            <el-input :value="clxxForm.ADDRESS" readonly></el-input>
          </el-form-item>
          <el-form-item label="车牌号码">
            <el-input :value="clxxForm.VEHICLENO" readonly></el-input>
          </el-form-item>
          <el-form-item label="车牌颜色">
            <el-input :value="clxxForm.PLATECOLOR" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆类型">
            <el-input :value="clxxForm.VEHICLETYPE" readonly></el-input>
          </el-form-item>
          <el-form-item label="核定载客位">
            <el-input :value="clxxForm.SEATS" readonly></el-input>
          </el-form-item>
          <el-form-item label="报备日期">
            <el-input :value="timeFormatter(clxxForm.UPDATETIME)" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆型号">
            <el-input :value="clxxForm.MODEL" readonly></el-input>
          </el-form-item>
          <el-form-item label="运价类型">
            <el-input :value="clxxForm.FARETYPE" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆品牌">
            <el-input :value="clxxForm.BRAND" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆所有人">
            <el-input :value="clxxForm.OWNERNAME" readonly></el-input>
          </el-form-item>
          <el-form-item label="发动机号">
            <el-input :value="clxxForm.ENGINEID" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆VIN码">
            <el-input :value="clxxForm.VIN" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆燃料类型">
            <el-input :value="clxxForm.FUELTYPE" readonly></el-input>
          </el-form-item>
          <el-form-item label="发动机排量">
            <el-input :value="clxxForm.ENGINEDISPLACE" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆运输证发证机构">
            <el-input :value="clxxForm.TRANSAGENCY" readonly></el-input>
          </el-form-item>
          <el-form-item label="发票打印设备序列号">
            <el-input :value="clxxForm.FEEPRINTID" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆运输证有效期起">
            <el-input :value="timeFormatter(clxxForm.TRANSDATESTART)" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆运输证有效期止">
            <el-input :value="timeFormatter(clxxForm.TRANSDATESTOP)" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆年度审验状态">
            <el-input :value="clxxForm.CHECKSTATE" readonly></el-input>
          </el-form-item>
          <el-form-item label="卫星定位装置品牌">
            <el-input :value="clxxForm.GPSBRAND" readonly></el-input>
          </el-form-item>
          <el-form-item label="卫星定位装置型号">
            <el-input :value="clxxForm.GPSMODEL" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆初次领证日期">
            <el-input :value="timeFormatter(clxxForm.CERTIFYDATEA)" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆检修状态">
            <el-input :value="clxxForm.FIXSTATE" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆下次年检时间">
            <el-input :value="clxxForm.NEXTFIXDATE" readonly></el-input>
          </el-form-item>
          <el-form-item label="卫星定位装置IMEI号">
            <el-input :value="clxxForm.GPSIMEI" readonly></el-input>
          </el-form-item>
          <el-form-item label="车辆注册日期">
            <el-input :value="timeFormatter(clxxForm.CERTIFYDATEA)" readonly></el-input>
          </el-form-item>
          <el-form-item label="卫星定位安装日期">
            <el-input :value="timeFormatter(clxxForm.GPSINSTALLDATE)" readonly></el-input>
          </el-form-item>
        </el-form>
        <el-tabs class="tw-tabs" v-model="activeName" ref="tabPanel" @tab-click="tabHandleClick">
          <el-tab-pane
            v-for="clxxTabList in clxxTabLists"
            :key="clxxTabList.name"
            :label="clxxTabList.label"
            :name="clxxTabList.name"
          >
            <el-table class="tw-table" :data="clxxTabList.data" border size="small" height="100%">
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column
                v-for="item in clxxTabList.column"
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
  name: 'IntegratedCarQuery',
  data() {
    return {
      query: {
        ptname: '',
        vehino: '',
        veNum: ''
      },
      OnlyCompany: [],
      activeName: 'first',
      labelPosition: 'right',
      clxxForm: {},
      clxxTabLists: [
        {
          name: 'first',
          label: '车辆保险信息',
          data: [],
          column: [
            { name: 'COMPANYNAME', title: '平台名称', width: 150 },
            { name: 'VEHICLENO', title: '车牌号码', width: 100 },
            { name: 'INSURCOM', title: '保险公司', width: 200 },
            { name: 'INSURNUM', title: '保险号', width: 100 },
            { name: 'INSURTYPE', title: '保险类型', width: 180 },
            { name: 'INSURCOUNT', title: '保险金额', width: 150 },
            {
              name: 'INSUREFF',
              title: '保险生效时间',
              formatter: this.timeTableFormatter,
              width: 150
            },
            {
              name: 'UPDATETIME',
              title: '更新时间',
              formatter: this.timeTableFormatter,
              'min-width': 180,
              resizable: true
            }
          ]
        },
        {
          name: 'second',
          label: '车辆里程信息',
          data: [],
          column: [
            { name: 'COMPANYNAME', title: '平台名称', width: 150 },
            { name: 'ADDRESS', title: '注册地行政区划代码', width: 100 },
            { name: 'VEHICLENO', title: '车牌号码', width: 100 },
            { name: 'TOTALMILE', title: '行驶总里程', width: 100 },
            {
              name: 'UPDATETIME',
              title: '更新时间',
              formatter: this.timeTableFormatter,
              width: 150
            },
            {
              name: 'FLAG',
              title: '操作标识',
              formatter: this.flagFormatter,
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
          this.$refs['vehicleBaseInfo'].$el
        )
      })
      this.getCompany()
      setTimeout(() => {
        this.$refs['tabPanel'].$el.style.height = formatTemplateHeight(
          this.$refs['vehicleBaseInfo'].$el
        )
      }, 100)
    })
  },
  computed: {
    // ...mapGetters(["getAutoCompanyName"]),
  },
  methods: {
    //查询
    querySearchCar() {
      if (this.query.vehino.length < 5) {
        this.$message('请输入正确的车牌号码')
        return
      } else {
        this.getData()
      }
    },
    timeFormatter(value) {
      if (value != null) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    timeTableFormatter(item, a, value) {
      if (value != null) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    getData() {
      let idata = `postData={'ptname':'${this.query.ptname}','vehino':'${this.query.vehino}'}`
      axios
        .post('manage/findClxx', idata, {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.clxxTabLists[0].data = res.data.clbx
          this.clxxForm = {}
          if (res.data.clxx[0]) {
            this.clxxForm = res.data.clxx[0]
          } else {
            this.$message('暂无数据')
          }
        })
    },
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
    //车牌号码输入框输入后匹配信息
    handleQuerySearch(query, cb) {
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
    handleCarfocus() {
      const { vehino } = this.query
      if (vehino === '') this.query.vehino = '浙A'
    },
    //tab切换事件
    tabHandleClick(item, name) {
      if (name.target.textContent === '车辆里程信息') {
        //驾驶员移动终端信息
        let idata = `postData={'ptname':'${this.query.ptname}','vehino':'${this.query.vehino}'}`
        axios
          .post('manage/findCarClxx', idata, {
            baseURL: this.baseURL
          })
          .then(({ data }) => {
            this.clxxTabLists[1].data = data.cllc
          })
      }
    },
    //操作标识
    flagFormatter(item, col, value) {
      if (value == '1') {
        return '新增'
      } else if (value == '2') {
        return '更新'
      } else {
        return '删除'
      }
    },
    //状态
    stateFormatter(item, col, value) {
      if (value == '0') {
        return '有效'
      } else if (value == '1') {
        return '失效'
      } else {
        return value
      }
    }
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
  height: 450px;
  box-sizing: border-box;
}

.tw-tabs {
  min-height: 300px;
  height: calc(100% - 450px) !important;
}
</style>
