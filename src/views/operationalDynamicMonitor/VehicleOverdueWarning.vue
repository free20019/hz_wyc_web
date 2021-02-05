<!--车辆超期预警-->
<template>
  <div class="tw-template-wrapper">
    <el-form :inline="true" :model="query" size="small" class="tw-query-bar" ref="queryBar">
      <el-form-item>
        <el-autocomplete
          class="inline-input"
          v-model="query.vehicleNumber"
          :fetch-suggestions="handleQuerySearch"
          placeholder="车牌号码"
          :trigger-on-focus="false"
          @focus="handleCarfocus"
          clearable
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.violationType" placeholder="违规类型">
          <el-option label="全部" value="0"></el-option>
          <el-option label="已超期" value="1"></el-option>
          <el-option label="即将超期" value="2"></el-option>
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
      <el-table class="tw-table" :data="table.data" v-loading="table.loading" border height="calc(100% - 52px)">
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="AUTO_NUM" label="车牌号码" width="180"></el-table-column>
        <el-table-column align="center" prop="OWNER" label="车辆所有人" width="240"></el-table-column>
        <el-table-column align="center" prop="OWNER_TEL" label="联系电话" width="180"></el-table-column>
        <el-table-column
          align="center"
          prop="LICENSE_REGISTER_DATE"
          label="行驶证注册日期"
          width="160"
        ></el-table-column>
        <el-table-column align="center" prop="START_DATE" label="有效开始日期" width="180"></el-table-column>
        <el-table-column align="center" prop="END_DATE" label="有效截止日期" width="180"></el-table-column>
        <el-table-column align="center" prop="TYPE" label="状态" min-width="180"></el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="table.pageSize"
        :current-page="table.currentPage"
        :total="table.total"
        @current-change="handleTablePageCurrentChange"
        style="margin-bottom: 10px;"
      ></el-pagination>
      <!--<v-chart class="tw-chart-panel" :options="chartOptions" ref="chartBox"></v-chart>-->
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import axios from 'axios'
import moment from 'moment'
import ECharts from 'vue-echarts'
import { templateHeight } from '../../assets/js/util'

export default {
  name: 'VehicleOverdueWarning',
  data() {
    return {
      query: {
        vehicleNumber: '',
        violationType: '1'
      },
      table: {
        loading: false,
        data: [],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      chart: {
        data: []
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements, () => {
        // this.$refs['chartBox'].resize()
      })
      this.getVehicleOverdueWarning()
    })
  },
  computed: {
    chartResize() {
      return this.$store.state.secondary
    },
    chartOptions() {
      let titles = _.pluck(this.chart.data, 'TIME')
      let values = _.pluck(this.chart.data, 'COUNT')
      return {
        title: {
          text: '注册车辆数'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        xAxis: {
          data: titles
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: values,
            type: 'bar'
          }
        ]
      }
    }
  },
  /*接口*/
  methods: {
    getVehicleOverdueWarning() {
      this.table.loading = true
      const { vehicleNumber, violationType } = this.query
      const { currentPage, pageSize } = this.table
      axios
        .get('getOperationAndWarningAction/getVehicleOverdueWarning', {
          baseURL: this.baseURL,
          params: {
            vehicleNumber: vehicleNumber,
            Situation: violationType,
            page: currentPage,
            pageSize: pageSize
          }
        })
        .then(res => {
          this.table.data = res.data.datas || []
          this.table.total = res.data.count
          this.table.loading = false
          this.chart.data = res.data.echarts
        })
    },
    handleQuerySearch(query, cb) {
      if (query.length >= 5) {
        axios
          .get('getOperationAndWarningAction/getVehicleOverdueWarningVehicleNumber', {
            baseURL: this.baseURL,
            params: {
              PLATE_NUMBER: this.query.vehicleNumber
            }
          })
          .then(({ data }) => {
            for (let i = 0; i < data.length; i++) {
              data[i].value = data[i].PLATE_NUMBER
            }
            cb(data)
          })
      } else {
        return
      }
    },
    handleCarfocus() {
      if (this.query.vehicleNumber === '') this.query.vehicleNumber = '浙A'
    },
    /*事件*/
    handleQueryClick() {
      this.table.currentPage = 1
      this.getVehicleOverdueWarning()
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getVehicleOverdueWarning()
    }, //导出
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
            `${this.baseURL}getOperationAndWarningAction/exportVehicleOverdueWarning?vehicleNumber=${
              this.query.vehicleNumber
            }&Situation=${this.query.violationType}&page=1&pageSize=100`
          )
        })
        .catch(() => {})
    }
  },
  components: {
    'v-chart': ECharts
  },
  watch: {
    '$route.path': {
      handler(oldVal, newVal) {
        this.query.violationType = '1'
        this.getVehicleOverdueWarning()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';

$tableHeight: 300px;

.tw-table {
  margin-bottom: $margin;
}

.tw-chart {
  &-panel {
    width: 100%;
    height: 300px;
    overflow: auto;
  }
}
</style>
