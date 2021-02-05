<!--车辆里程信息-->
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
        <el-button type="primary" @click="handleClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table class="tw-table" :data="table.data" v-loading="table.loading" border height="calc(100% - 42px)" stripe>
        <el-table-column align="center" width="60" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="COMPANYNAME" label="平台名称"></el-table-column>
        <el-table-column align="center" prop="VEHICLENO" label="车牌号码"></el-table-column>
        <el-table-column align="center" prop="TOTALMILE" label="行驶总里程"></el-table-column>
        <el-table-column align="center" prop="UPDATETIME" label="更新时间" :formatter="timeFormatter"></el-table-column>
        <el-table-column align="center" prop="FLAG" label="操作标识" :formatter="flagFormatter"></el-table-column>
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
  name: 'CarMileageInformation',
  data() {
    return {
      query: {
        ptname: '0',
        vehino: '',
        dateyear: ''
      },
      table: {
        data: [],
        loading: false,
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      options: []
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
    handleClick() {
      this.table.currentPage = 1
      this.getDataList()
    },
    //查询里程信息
    getDataList() {
      this.table.loading = true
      let year = moment(this.query.dateyear).format('YYYY')
      let idata = `postData={'ptname':'${this.query.ptname}','year':'${year}','vehino':'${
        this.query.vehino
      }','pageIndex':'${this.table.currentPage}','pageSize':'${this.table.pageSize}' }`
      axios
        .post('manage/findCllcxx', idata, {
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
        let idata = `postData={'vehino':'${query}','year':'${this.query.dateyear}'}`
        axios
          .post('manage/findlcVehicleNo', idata, {
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
    //分页
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getDataList()
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
    //时间格式转换
    timeFormatter(item, col, value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-query-panel {
  border-top: none;
}
</style>
