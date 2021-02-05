<!-- 运力分析报告 -->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" :model="query" size="small" ref="queryBar">
      <el-form-item>
        <el-date-picker v-model="query.stime" type="date" placeholder="开始日期"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="query.etime" type="date" placeholder="截止日期"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExportClick">导出</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table
        :data="table.data"
        class="tw-table no-highlight"
        v-loading="table.loading"
        border
        size="small"
        height="100%"
        :highlight-current-row="false"
        stripe
        :span-method="spanMethod"
      >
        <el-table-column
          label="日期"
          prop="DBTIME"
          align="center"
          :formatter="formatterTableTime"
          min-width="130"
        ></el-table-column>
        <el-table-column label="每日派单" align="center">
          <el-table-column label="派单总量(单)" prop="CREATE_ORDER_NUM" align="center" width="105"></el-table-column>
          <el-table-column label="昨日环比(%)" prop="CREATE_YESTERDAY" align="center" width="105"></el-table-column>
          <el-table-column label="上周同比(%)" prop="CREATE_LASTWEEK" align="center" width="105"></el-table-column>
        </el-table-column>
        <el-table-column label="每日完单" align="center">
          <el-table-column label="完单总量(单)" prop="DEP_ORDER_NUM" align="center" width="105"></el-table-column>
          <el-table-column label="昨日环比(%)" prop="DEP_YESTERDAY" align="center" width="105"></el-table-column>
          <el-table-column label="上周同比(%)" prop="DEP_LASTWEEK" align="center" width="105"></el-table-column>
        </el-table-column>
        <el-table-column label="活跃车辆" align="center">
          <el-table-column label="接单车数(辆)" prop="DEP_ORDER_VEH" align="center" width="105"></el-table-column>
          <el-table-column label="昨日环比(%)" prop="VEH_YESTERDAY" align="center" width="105"></el-table-column>
          <el-table-column label="上周同比(%)" prop="VEH_LASTWEEK" align="center" width="105"></el-table-column>
        </el-table-column>
        <el-table-column label="网约车完单率" prop="END_ORDER" align="center" width="105"></el-table-column>
        <el-table-column label="早晚高峰" align="center">
          <el-table-column label="早高峰完单量" prop="MORNINGORDER" align="center" width="105"></el-table-column>
          <el-table-column label="早高峰出车量" prop="MORNINGCAR" align="center" width="105"></el-table-column>
          <el-table-column label="晚高峰完单量" prop="NIGHTORDER" align="center" width="105"></el-table-column>
          <el-table-column label="晚高峰出车量" prop="NIGHTCAR" align="center" width="105"></el-table-column>
        </el-table-column>
        <el-table-column label="当日热点区域分析" align="center">
          <el-table-column label="当日热点区域" prop="AREA_NAME" align="center" width="105"></el-table-column>
          <el-table-column label="热点区域订单数" prop="AREA_NUM" align="center" width="105"></el-table-column>
        </el-table-column>
        <el-table-column label="当日热点时段分析" align="center">
          <el-table-column label="当日热点时段" prop="HOT_TIME" align="center" width="105"></el-table-column>
          <el-table-column label="热点时段订单数" prop="TIME_NUM" align="center" width="105"></el-table-column>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        background
        :page-size="table.pageSize"
        :current-page="table.currentPage"
        :total="table.total"
        @current-change="handleTablePageCurrentChange"
      ></el-pagination> -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import _ from 'underscore'
import { baseURL } from '../../../assets/js/api'
export default {
  name: 'CapacityAnalysisReport',
  data() {
    return {
      query: {
        stime: moment(new Date()).add(-3, 'days'),
        etime: moment(new Date()).add(-1, 'days')
      },
      table: {
        data: [],
        loading: false,
        pageSize: 150,
        total: 0,
        currentPage: 1
      },
      tableSummary: []
    }
  },
  mounted() {
    this.getTableDataList()
  },
  methods: {
    handleExportClick() {
      const { pageSize, currentPage } = this.table
      const { stime, etime } = this.query
      window.open(
        `${baseURL}data/exportAnalyze?page=${currentPage}&pageSize=${pageSize}&stime=${
          stime ? moment(stime).format('YYYY-MM-DD') : ''
        }&etime=${etime ? moment(etime).format('YYYY-MM-DD') : ''}`
      )
    },
    // 格式化表格时间
    formatterTableTime(row, a, val) {
      return moment(val).format('YYYY-MM-DD')
    },
    formatterTableData(list) {
      let summary = []
      let dateArr = _.uniq(_.pluck(list, 'DBTIME'))
      let listIndex = 0
      _.each(list, item => {
        if (item.DBTIME == dateArr[listIndex]) {
          item.num = _.filter(list, i => i.DBTIME === item.DBTIME).length
          listIndex += 1
        }
      })
      this.table.data = list
    },
    // 表格合并方法
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex != 15 && columnIndex != 16 && columnIndex != 17 && columnIndex != 18) {
        if (row.num) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    //分页
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getTableDataList()
    },
    // 查询按钮
    handleQueryClick() {
      this.getTableDataList()
    },
    getTableDataList() {
      this.table.loading = true
      const { pageSize, currentPage } = this.table
      const { stime, etime } = this.query
      axios
        .get('data/getAnalyze', {
          baseURL,
          params: {
            page: currentPage,
            pageSize,
            stime: stime ? moment(stime).format('YYYY-MM-DD') : '',
            etime: etime ? moment(etime).format('YYYY-MM-DD') : ''
          }
        })
        .then(res => {
          this.table.total = res.data.count
          this.formatterTableData(res.data.datas)
          this.table.loading = false
        })
    }
  },
  watch: {
    'query.stime': {
      handler(newVal, oldVal) {
        const { stime, etime } = this.query
        let data = moment(etime).diff(moment(stime), 'days')
        if (data > 30) {
          this.$message({
            message: '时间间隔不能超过30天',
            type: 'warning'
          })
          this.query.stime = oldVal
        }
        if (data < 0) {
          this.$message({
            message: '开始时间不得大于结束时间',
            type: 'warning'
          })
          this.query.stime = oldVal
        }
      }
    },
    'query.etime': {
      handler(newVal, oldVal) {
        const { stime, etime } = this.query
        let data = moment(etime).diff(moment(stime), 'days')
        if (data > 30) {
          this.$message({
            message: '时间间隔不能超过30天',
            type: 'warning'
          })
          this.query.etime = oldVal
        }
        if (data < 0) {
          this.$message({
            message: '结束时间不得小于开始时间',
            type: 'warning'
          })
          this.query.etime = oldVal
        }
      }
    }
  }
}
</script>

<style></style>
