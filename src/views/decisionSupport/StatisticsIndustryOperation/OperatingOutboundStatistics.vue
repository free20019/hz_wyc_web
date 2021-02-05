<!--营运出车统计-->
<template>
  <div class="tw-template-wrapper">
    <el-form :inline="true" :model="query" size="small" class="tw-query-bar" ref="queryBar">
      <el-form-item>
        <el-date-picker v-model="query.stime" type="date" placeholder="开始日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="query.etime" type="date" placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExportClick">导出</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table class="tw-table" :data="showcase" v-loading="table.loading" border size="small" height="81px">
        <el-table-column prop="VALUE" label="统计日期" align="center"></el-table-column>
        <el-table-column prop="SUM_ORDER_NUMBER" label="日均订单总量" align="center"></el-table-column>
        <el-table-column prop="SUM_DRIVER_OUT_NUMBER" label="日均出车量" align="center"></el-table-column>
        <el-table-column prop="RATE" label="日均出车率" align="center" :resizable="false"></el-table-column>
      </el-table>
      <el-table
        class="tw-table"
        :data="filterTableList"
        v-loading="table.loading"
        border
        size="small"
        height="calc(100% - 132px)"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="FORMAT_DATE" label="统计日期"></el-table-column>
        <el-table-column prop="ORDER_NUMBER" label="订单量"></el-table-column>
        <el-table-column prop="DRIVER_OUT_NUMBER" label="出车量"></el-table-column>
        <el-table-column prop="PERMIT_NUMBER" label="杭州许可总量"></el-table-column>
        <el-table-column prop="RATE" label="出车率" :resizable="false"></el-table-column>
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
import _ from 'underscore'
import axios from 'axios'
import moment from 'moment'
import { templateHeight } from '../../../assets/js/util'

export default {
  name: 'OperatingOutboundStatistics',
  data() {
    return {
      query: {
        stime: '',
        etime: ''
      },
      table: {
        loading: false,
        data: [],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      showcase: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements)
      this.query.stime = moment().format('YYYY-MM-01')
      this.query.etime = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')
      this.getOperatingOutboundStatistics()
    })
  },
  computed: {
    filterTableList() {
      const { data, pageSize, currentPage } = this.table
      const pageIndex = currentPage - 1
      return _.filter(data, (item, index) => {
        return index >= pageIndex * pageSize && index < currentPage * pageSize
      })
    }
  },
  methods: {
    /*数据接口*/
    getOperatingOutboundStatistics() {
      const { stime, etime } = this.query
      if (!stime || !etime || stime == '' || etime == '') {
        this.$message({
          message: '请填写时间选项',
          type: 'warning'
        })
      } else {
        this.table.loading = true
        axios
          .get('getIndustryOperationalAnalysisAction/getOperatingOutboundStatistics', {
            baseURL: this.baseURL,
            params: {
              sTime: stime && moment(stime).format('YYYY-MM-DD'),
              eTime: etime && moment(etime).format('YYYY-MM-DD')
            }
          })
          .then(res => {
            this.showcase = res.data.statistics || []
            console.info(res.data.statistics)
            this.table.data = res.data.datas || []
            this.table.currentPage = 1
            this.table.total = this.table.data.length
            setTimeout(() => {
              this.table.loading = false
            }, 500)
          })
      }
    },
    /*事件*/
    handleQueryClick() {
      this.table.currentPage = 1
      this.getOperatingOutboundStatistics()
    },
    handleExportClick() {
      const { stime, etime } = this.query
      this.$confirm('是否需要导出?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        cancelButtonClass: 'el-button--danger',
        closeOnClickModal: false,
        type: 'info',
        center: true
      })
        .then(() => {
          window.open(
            `${this.baseURL}getIndustryOperationalAnalysisAction/getOperatingOutboundStatisticsExcel?sTime=${stime &&
              moment(stime).format('YYYY-MM-DD')}&eTime=${etime && moment(etime).format('YYYY-MM-DD')}`
          )
        })
        .catch(() => {})
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
    }
  }
}
</script>

<style scoped></style>
