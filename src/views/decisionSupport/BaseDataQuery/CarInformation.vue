<!--车辆信息-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-select v-model="query.ptname" clearable placeholder="平台名称">
          <el-option
            v-for="item in getAutoCompanyName"
            :key="item.onlyId"
            :label="item.label"
            :value="item.value"
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
        <el-select v-model="query.state">
          <el-option label="有效" value="0"></el-option>
          <el-option label="失效" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table
        class="tw-table tw-moreinfo-table"
        :data="table.data"
        v-loading="table.loading"
        border
        stripe
        height="calc(100% - 42px)"
      >
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="COMPANYNAME" label="平台名称" width="140"></el-table-column>
        <el-table-column align="center" prop="ADDRESS" label="行政区划"></el-table-column>
        <el-table-column align="center" width="100" prop="VEHICLENO" label="车牌号码"></el-table-column>
        <el-table-column align="center" prop="PLATECOLOR" label="车牌颜色"></el-table-column>
        <el-table-column align="center" prop="CPLX" label="车牌类型"></el-table-column>
        <el-table-column align="center" width="100" prop="SEATS" label="核定载客位"></el-table-column>
        <el-table-column align="center" prop="BBRQ" label="报备日期"></el-table-column>
        <el-table-column align="center" prop="MODEL" label="车辆型号"></el-table-column>
        <el-table-column align="center" prop="FARETYPE" label="运价类型"></el-table-column>
        <el-table-column align="center" prop="CLPP" label="车辆品牌"></el-table-column>
        <el-table-column align="center" prop="BRAND" label="车辆厂牌"></el-table-column>
        <el-table-column align="center" prop="VEHICLETYPE" label="车辆类型"></el-table-column>
        <el-table-column align="center" width="120" prop="OWNERNAME" label="车辆所有人"></el-table-column>
        <el-table-column align="center" prop="VEHICLECOLOR" label="车身颜色"></el-table-column>
        <el-table-column align="center" prop="ENGINEID" label="发动机号"></el-table-column>
        <el-table-column align="center" width="120" prop="VIN" label="车辆VIN码"></el-table-column>
        <el-table-column align="center" width="120" prop="FUELTYPE" label="车辆燃油类型"></el-table-column>
        <el-table-column align="center" width="100" prop="ENGINEDISPLACE" label="发动机排量"></el-table-column>
        <el-table-column align="center" width="120" prop="PHOTOID" label="车辆照片文件"></el-table-column>
        <el-table-column align="center" width="120" prop="CERTIFICATE" label="运输证字号"></el-table-column>
        <el-table-column align="center" width="170" prop="TRANSAGENCY" label="车辆运输证发证机构"></el-table-column>
        <el-table-column align="center" width="140" prop="TRANSAREA" label="车辆营运区域"></el-table-column>
        <el-table-column
          align="center"
          width="140"
          prop="TRANSDATESTART"
          label="车辆营运有效期起"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          width="140"
          prop="TRANSDATESTOP"
          label="车辆营运有效期止"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          width="140"
          prop="CERTIFYDATEB"
          label="车辆初次登记日期"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column align="center" width="140" prop="FIXSTATE" label="车辆检修状态"></el-table-column>
        <el-table-column align="center" width="140" prop="CHECKSTATE" label="车辆年度审验状态"></el-table-column>
        <el-table-column align="center" width="170" prop="FEEPRINTID" label="发票打印设备序列号"></el-table-column>
        <el-table-column align="center" width="140" prop="GPSBRAND" label="卫星定位装置品牌"></el-table-column>
        <el-table-column align="center" width="140" prop="GPSMODEL" label="卫星定位装置型号"></el-table-column>
        <el-table-column align="center" width="170" prop="GPSIMEI" label="卫星定位装置IMEI号"></el-table-column>
        <el-table-column
          align="center"
          width="170"
          prop="GPSINSTALLDATE"
          label="卫星定位设备安装日期"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          width="160"
          prop="REGISTERDATE"
          label="注册日期"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="COMMERCIALTYPE"
          label="营运类型"
          :formatter="commercialTypeFormatter"
        ></el-table-column>
        <el-table-column align="center" prop="STATE" label="状态" :formatter="stateFormatter"></el-table-column>
        <el-table-column align="center" prop="FLAG" label="操作标识" :formatter="flagFormatter"></el-table-column>
        <el-table-column
          align="center"
          prop="UPDATETIME"
          label="更新时间"
          min-width="165"
          :formatter="timeFormatter"
        ></el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="table.pageSize"
        :current-page="table.currentPage"
        :total="table.total"
        @current-change="handleTablePageCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { templateHeight } from '../../../assets/js/util'

export default {
  name: 'CarInformation',
  data() {
    return {
      query: {
        ptname: '0',
        vehino: '',
        state: '0',
        vehino1: ''
      },
      table: {
        data: [],
        loading: false,
        pageSize: 20,
        currentPage: 1,
        total: 0
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements)
      this.getDataList()
    })
  },
  computed: {
    ...mapGetters(['getAutoCompanyName'])
  },
  methods: {
    handleQueryClick() {
      this.table.currentPage = 1
      this.getDataList()
    },
    getDataList() {
      this.table.loading = true
      let idata = `postData={'ptname':'${this.query.ptname}','state':'${this.query.state}','vehino':'${
        this.query.vehino
      }','pageIndex':'${this.table.currentPage}','pageSize':'${this.table.pageSize}' }`
      axios
        .post('manage/findCljcxx', idata, {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.table.data = data.datas
          this.table.total = parseInt(data.count)
          setTimeout(() => {
            this.table.loading = false
          }, 500)
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
    },
    //营运类型
    commercialTypeFormatter(item, col, value) {
      if (value == '1') {
        return '网约车'
      } else if (value == '2') {
        return '巡游车'
      } else if (value == '3') {
        return '合乘车'
      } else {
        return value
      }
    },
    //分页
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getDataList()
    },
    //时间格式转换
    timeFormatter(item, col, value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped></style>
