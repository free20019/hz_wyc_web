<!--未营运车辆统计-->
<template>
  <div class="tw-template-wrapper">
    <el-form :inline="true" :model="query" size="small" class="tw-query-bar" ref="queryBar">
      <el-form-item>
        <el-autocomplete
          v-model="query.vehicleNumber"
          placeholder="车牌号码"
          :fetch-suggestions="handleQuerySearch"
          @focus="handleCarfocus"
          :trigger-on-focus="false"
          clearable
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.type">
          <el-option label="全部" value="0"></el-option>
          <el-option label="超过1个月未营运分析" value="1"></el-option>
          <el-option label="超过3个月未营运分析" value="2"></el-option>
          <el-option label="超过6个月未营运分析" value="3"></el-option>
          <el-option label="超过一年未营运分析" value="4"></el-option>
          <el-option label="未参与营运" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExportClick">导出</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <div class="tw-echart-area">
        <div id="oneMonthEchart" class="echart" v-if="echart.oneMonthFlag"></div>
        <div id="threeMonthEchart" class="echart" v-if="echart.threeMonthFlag"></div>
        <div id="sixMonthEchart" class="echart" v-if="echart.sixMonthFlag"></div>
        <div id="oneYearEchart" class="echart" v-if="echart.oneYearFlag"></div>
        <div id="noJoinEchart" class="echart" v-if="echart.noJoinFlag"></div>
      </div>
      <el-table
        class="tw-table tw-moreinfo-table"
        :data="table.data"
        v-loading="table.loading"
        border
        height="calc(100% - 42px - 300px)"
        stripe
      >
        <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
        <el-table-column prop="AUTO_NUM" align="center" label="车牌号码" min-width="100"></el-table-column>
        <el-table-column prop="OWNER" align="center" label="车辆所有人" width="270"></el-table-column>
        <el-table-column prop="OWNER_TEL" align="center" label="联系电话" width="140"></el-table-column>
        <el-table-column
          prop="LICENSE_REGISTER_DATE"
          align="center"
          label="行驶证注册日期"
          width="160"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          prop="START_DATE"
          align="center"
          label="有效开始日期"
          width="160"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          prop="END_DATE"
          align="center"
          label="有效截止日期"
          min-width="140"
          :formatter="timeFormatter"
          :resizable="false"
        ></el-table-column>
        <el-table-column
          prop="LAST_TIME"
          align="center"
          label="最近营运时间"
          width="140"
          :resizable="false"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          prop="last_type"
          align="center"
          label="营运状态"
          min-width="140"
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
import _ from 'underscore'
import axios from 'axios'
import moment from 'moment'
import { templateHeight } from '../../../assets/js/util'
import { data as test } from '../../../assets/js/test.json'
import echarts from 'echarts'
import { ajaxT } from '../../../assets/js/api'

export default {
  name: 'StatisticsUnoperatedVehicles',
  data() {
    return {
      query: {
        vehicleNumber: '',
        type: '0'
      },
      table: {
        loading: false,
        data: [],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      echart: {
        oneMonth: null,
        threeMonth: null,
        sixMonth: null,
        oneYear: null,
        noJoin: null,
        oneMonthFlag: false,
        threeMonthFlag: false,
        sixMonthFlag: false,
        oneYearFlag: false,
        noJoinFlag: false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements, this.resizeEchart)
      this.getEchartData()
      this.getDataList()
    })
  },
  computed: {},
  methods: {
    // 屏幕resize 回调方法
    resizeEchart() {
      console.info('resize')
      if (this.echart.oneMonth) this.echart.oneMonth.resize()
      if (this.echart.threeMonth) this.echart.threeMonth.resize()
      if (this.echart.sixMonth) this.echart.sixMonth.resize()
      if (this.echart.oneYear) this.echart.oneYear.resize()
      if (this.echart.noJoin) this.echart.noJoin.resize()
    },
    // 获取echart数据
    getEchartData() {
      // ajaxT('manage/getCarNotOperateEcharts').then(res => {
      //   let data = res.data.datas
      //   let total = res.data.count
      //   // 会出现没数据的情况 需要循环判断是否加载echart

      // })
      let data = test[0].datas
      let total = test[0].count
      _.each(data, item => {
        if (item.LASTTIME === '超过一个月未营运') {
          this.echart.oneMonthFlag = true
          setTimeout(() => {
            this.initEchart(item.COUNT, total, 'oneMonth', '超过一个月未营运')
          })
        }
        if (item.LASTTIME === '超过三个月未营运') {
          this.echart.threeMonthFlag = true
          setTimeout(() => {
            this.initEchart(item.COUNT, total, 'threeMonth', '超过三个月未营运')
          })
        }
        if (item.LASTTIME === '超过六个月未营运') {
          this.echart.sixMonthFlag = true
          setTimeout(() => {
            this.initEchart(item.COUNT, total, 'sixMonth', '超过六个月未营运')
          })
        }
        if (item.LASTTIME === '超过一年未营运') {
          this.echart.oneYearFlag = true
          setTimeout(() => {
            this.initEchart(item.COUNT, total, 'oneYear', '超过一年未营运')
          })
        }
        if (item.LASTTIME === '未参加营运') {
          this.echart.noJoinFlag = true
          setTimeout(() => {
            this.initEchart(item.COUNT, total, 'noJoin', '未参加营运')
          })
        }
      })
    },
    // 初始化echart
    initEchart(count, total, type, title) {
      this.echart[type] = echarts.init(document.getElementById(type + 'Echart'))
      this.echart[type].setOption({
        title: {
          text: title + '分析',
          left: 'center',
          top: '3%'
        },
        color: ['#334b5c', '#6ab0b8'],
        series: [
          {
            name: '未营运分析',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            selectedMode: 'single',
            startAngle: 95,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: count,
                name: title,
                selected: false,
                selected: true,
                label: {
                  formatter: '{b}\n({d}%)',
                  fontSize: 15
                },
                labelLine: {
                  show: true,
                  length: 7,
                  length2: 5
                }
              },
              {
                value: total,
                name: '',
                label: { show: false },
                labelLine: {
                  show: false
                }
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },

    /*接口*/
    getDataList() {
      this.table.loading = true
      const { vehicleNumber, type } = this.query
      const baseURL = this.baseURL
      const postData =
        `postData=` +
        JSON.stringify({
          vehino: vehicleNumber,
          type: type,
          pageSize: this.table.pageSize,
          pageIndex: this.table.currentPage
        })
      axios.post('manage/findCarNotOperate', postData, { baseURL }).then(res => {
        try {
          let data = res.data
          this.table.data = data.datas
          this.table.total = parseInt(data.count)
          setTimeout(() => {
            this.table.loading = false
          }, 500)
        } catch (e) {}
      })
    },
    //时间转换
    timeFormatter(item, col, value) {
      if (value != '') {
        return moment(value).format('YYYY-MM-DD')
      }
    },
    //车牌号码输入框输入后匹配信息
    handleQuerySearch(query, cb) {
      if (query.length >= 5) {
        let idata = `postData={'vehino':'${query}'}`
        axios
          .post('manage/findNotOperateVehicleNo', idata, {
            baseURL: this.baseURL
          })
          .then(({ data }) => {
            for (let i = 0; i < data.vehino.length; i++) {
              data.vehino[i].value = data.vehino[i].VehicleNo
            }
            cb(data.vehicleNo)
          })
      } else {
        return
      }
    },
    //车牌号码输入框聚焦事件
    handleCarfocus() {
      const { vehicleNumber } = this.query
      if (vehicleNumber === '') this.query.vehicleNumber = '浙A'
    },
    /*事件*/
    handleQueryClick() {
      this.getDataList()
    },
    //分页
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getDataList()
    },
    //导出
    handleExportClick() {
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
            `${this.baseURL}manage/exportCarNotOperate?postData={'vehino':'${this.query.vehicleNumber}','type':'${
              this.query.type
            }','pageSize':'${this.table.pageSize}','pageIndex':'${this.table.currentPage}'}`
          )
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-echart-area {
  height: 300px;

  display: flex;
  .echart {
    flex: 1;
    padding: 0 12px;
    box-sizing: border-box;
  }
}
</style>
