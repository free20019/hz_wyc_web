<!--
 * @Descripttion: 单车收益分析
 * @version: 
 * @Author: CFQ
 * @Date: 2020-04-03 09:34:54
 * @LastEditors: CFQ
 * @LastEditTime: 2020-06-02 15:56:20
 -->
<template>
  <div class="tw-template-wrapper" style="overflow-y:auto">
    <el-form class="tw-query-bar" :inline="true" :model="query" size="small" ref="queryBar">
      <el-form-item>
        <el-date-picker v-model="query.time" type="date" placeholder="查询时间"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-table">
      <el-table :data="table.data" v-loading="table.loading" border size="small" :row-class-name="tableRowClassName">
        <el-table-column label="平台公司" prop="ABB_NAME" align="center" min-width="130"></el-table-column>
        <el-table-column label="单车日均订单" prop="ORDER_AVE" align="center" width="250"></el-table-column>
        <el-table-column label="单车日均营收" prop="PRICE_AVE" align="center" width="250"></el-table-column>
        <el-table-column label="单车日均载客里程" prop="MILE_AVE" align="center" width="250"></el-table-column>
        <el-table-column label="单车日均载客时长" prop="DUR_AVE" align="center" width="250"></el-table-column>
      </el-table>
      <el-radio-group style="margin-top:20px" @change="getEchartData" v-model="query.radio" size="small">
        <el-radio-button label="ORDER_AVE">订单</el-radio-button>
        <el-radio-button label="PRICE_AVE">营收</el-radio-button>
        <el-radio-button label="MILE_AVE">里程</el-radio-button>
        <el-radio-button label="DUR_AVE">时长</el-radio-button>
      </el-radio-group>
    </div>
    <div class="tw-echart-content" ref="queryEchart" v-loading="table.loading">
      <div class="tw-echart" id="echart"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import echarts from 'echarts'
import { templateHeight } from '../../../assets/js/util'
import axios from 'axios'
import _ from 'underscore'

export default {
  name: 'BicycleIncomeAnalysis',
  data() {
    return {
      query: {
        time: moment(new Date()).add(-1, 'days'),
        radio: 'ORDER_AVE'
      },
      table: {
        data: [],
        loading: false,
        pageSize: 30,
        total: 0,
        currentPage: 1,
        selectRow: {}
      },
      echart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        this.echart.resize()
      }
      // const elements = this.$refs['queryBar'].$el
      // templateHeight(
      //   this.$refs['queryPanel'],
      //   [elements, this.$refs['queryEchart']],
      //   () => {
      //     if (this.echart) this.echart.resize()
      //   }
      // )
      this.getTableData()
      this.getEchartData()
    })
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      console.info(row)
      if (row.ABB_NAME.indexOf('平均') > -1) {
        return 'important-row'
      } else return ''
    },
    handleQueryClick() {
      this.getTableData()
      this.getEchartData()
    },
    getEchartData() {
      const baseURL = this.baseURL
      const { time } = this.query
      axios
        .get('data/getBikeEcharts', {
          baseURL,
          params: {
            time: time ? moment(time).format('YYYY-MM-DD') : ''
          }
        })
        .then(res => {
          this.initEcharts(res.data, this.query.radio)
        })
    },
    getTableData() {
      const baseURL = this.baseURL
      const { time } = this.query
      this.table.loading = true
      axios
        .get('data/getBikeAnalysis', {
          baseURL,
          params: {
            time: time ? moment(time).format('YYYY-MM-DD') : ''
          }
        })
        .then(res => {
          this.table.data = res.data.datas
          this.table.loading = false
        })
    },
    initEcharts(data, type) {
      const yesterDay = data.yesterDay
      const today = data.today
      const lastMonth = data.lastMonth
      const lastWeek = data.lastWeek

      this.echart = echarts.init(document.getElementById('echart'))
      this.echart.setOption({
        legend: {
          data: ['当日', '昨日', '上周', '上月']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',

          axisLabel: {
            rotate: 40,
            boundaryGap: false
          },
          data:
            yesterDay.length > 0
              ? _.pluck(yesterDay, 'ABB_NAME')
              : today.length > 0
              ? _.pluck(today, 'ABB_NAME')
              : lastMonth.length > 0
              ? _.pluck(lastMonth, 'ABB_NAME')
              : lastWeek.length > 0
              ? _.pluck(lastWeek, 'ABB_NAME')
              : []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '当日',
            type: 'line',
            data: _.pluck(today, type)
          },
          {
            name: '昨日',
            type: 'line',
            data: _.pluck(yesterDay, type)
          },
          {
            name: '上周',
            type: 'line',
            data: _.pluck(lastWeek, type)
          },
          {
            name: '上月',
            type: 'line',
            data: _.pluck(lastMonth, type)
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-echart {
  height: 100%;
  width: 100%;
}
.tw-echart-content {
  height: 300px;
  transition: all 0.5s ease;
}
.tw-query-table {
  padding: 15px;
  box-sizing: border-box;
}
</style>
