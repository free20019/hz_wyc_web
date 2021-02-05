<!--驾驶员移动终端信息-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-date-picker v-model="query.dateyear" type="year" placeholder="选择年"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.ptname" clearable placeholder="平台名称">
          <el-option
            v-for="item in getAutoCompanyName"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.phone" placeholder="驾驶员手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.state">
          <el-option label="有效" value="0" couponSelected></el-option>
          <el-option label="失效" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table class="tw-table" :data="table.data" v-loading="table.loading" border height="calc(100% - 42px)" stripe>
        <el-table-column align="center" type="index" label="序号" width="60" fixed></el-table-column>
        <el-table-column
          align="center"
          prop="COMPANYNAME"
          label="平台名称"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" prop="ADDRESS" label="注册地行政区划代码" min-width="180"></el-table-column>
        <el-table-column align="center" prop="DRIVERPHONE" label="驾驶员手机号" min-width="120"></el-table-column>
        <el-table-column
          align="center"
          prop="NETTYPE"
          label="手机运营商"
          :formatter="netTypeFormatter"
          min-width="120"
        ></el-table-column>
        <el-table-column align="center" prop="APPVERSION" label="使用APP版本号" min-width="120"></el-table-column>
        <el-table-column
          align="center"
          prop="MAPTYPE"
          label="使用地图类型"
          :formatter="mapTypeFormatter"
          min-width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="STATE"
          label="状态"
          min-width="100"
          :formatter="stateFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="FLAG"
          label="操作标识"
          min-width="100"
          :formatter="flagFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="UPDATETIME"
          label="更新时间"
          min-width="180"
          :formatter="timeFormatter"
          :resizable="false"
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
  name: 'DriverMobileTerminalInformation',
  data() {
    return {
      query: {
        ptname: '0',
        state: '0',
        phone: '',
        dateyear: ''
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
      this.query.dateyear = moment(new Date()).format('YYYY')
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
      let year = moment(this.query.dateyear).format('YYYY')
      let idata = `postData={'ptname':'${this.query.ptname}','year':'${year}','phone':'${this.query.phone}','state':'${
        this.query.state
      }','pageIndex':'${this.table.currentPage}','pageIndex':'${this.table.currentPage}','pageSize':'${
        this.table.pageSize
      }'}`
      axios
        .post('manage/findJsyydzdxx', idata, {
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
    flagFormatter(item, col, value) {
      if (value == '1') {
        return '新增'
      } else if (value == '2') {
        return '更新'
      } else {
        return '删除'
      }
    },
    stateFormatter(item, col, value) {
      if (value == '0') {
        return '有效'
      } else if (value == '1') {
        return '失效'
      } else {
        return value
      }
    },
    mapTypeFormatter(item, col, value) {
      if (value == '1') {
        return '百度地图'
      } else if (value == '2') {
        return '高德地图'
      } else {
        return '其他'
      }
    },
    netTypeFormatter(item, col, value) {
      if (value == '1') {
        return '中国联通'
      } else if (value == '2') {
        return '中国移动'
      } else if (value == '3') {
        return '中国电信'
      } else {
        return '其他'
      }
    },
    timeFormatter(item, col, value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getDataList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
