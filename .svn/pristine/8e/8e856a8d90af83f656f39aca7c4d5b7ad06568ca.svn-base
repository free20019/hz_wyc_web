<!--违规营运分析-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-select v-model="value" placeholder="平台名称" clearable>
          <el-option
            v-for="item in info"
            :key="item.value"
            :label="item.platformName"
            :value="item.platformName"
          ></el-option>
        </el-select>
      </el-form-item>
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
        <el-input v-model="query.driverNumber" placeholder="驾驶员证号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="query.stime" type="date" placeholder="开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="query.etime" type="date" placeholder="结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.violationType" placeholder="违规类型">
          <el-option label="人证不符" value="人证不符"></el-option>
          <el-option label="车证不符" value="车证不符"></el-option>
          <el-option label="人车证不符" value="人车证不符"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table class="tw-table" :data="table.data" v-loading="table.loading" border height="calc(100% - 42px)">
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="DRIVER_NAME" label="姓名" width="80"></el-table-column>
        <el-table-column align="center" prop="DRIVER_NUMBER" label="驾驶员证号" width="180"></el-table-column>
        <el-table-column align="center" prop="VEHICLE_NUMBER" label="车牌号码" width="140"></el-table-column>
        <el-table-column align="center" prop="ABB_NAME" label="平台名称" width="180"></el-table-column>
        <el-table-column align="center" prop="ORDER_NUMBER" label="订单编号" width="160"></el-table-column>
        <el-table-column align="center" prop="VIOLATION_TYPE" label="违规类型" width="160"></el-table-column>
        <el-table-column align="center" prop="START_TIME" label="订单起始时间" width="160"></el-table-column>
        <el-table-column align="center" prop="END_TIME" label="订单终止时间" width="160"></el-table-column>
        <el-table-column align="center" prop="START_POSITION" label="订单起点" width="140"></el-table-column>
        <el-table-column align="center" prop="END_POSITION" label="订单终点" width="140"></el-table-column>
        <el-table-column align="center" prop="ORDER_MONEY" label="订单金额/元" width="140"></el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="table.pageSize"
        :current-page="table.currentPage"
        :total="table.total"
        @current-change="handleTablePageCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog
        title="导出"
        :visible.sync="dialogVisible"
        width="30%">
      <el-form :model="dialog.form" label-width="80px">
        <el-form-item label="导出类型">
          <el-radio v-model="dialog.radio1" label="1" border @change="changeList">默认</el-radio>
          <el-radio v-model="dialog.radio1" label="2" border @change="changeList">自定义</el-radio>
        </el-form-item>
        <el-form-item label="导出列表" v-show="dialog.display">
          <el-select v-model="dialog.list" multiple placeholder="请选择" :clearable="true">
            <el-option
                v-for="item in filedList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportExcle">导 出</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'underscore'
import { templateHeight } from '../../assets/js/util'

export default {
  name: 'ViolationOperationAnalysis',
  data() {
    return {
      info: [
        {
          platformName: '全部选择',
          vehicleNumber: '',
          driverNumber: '',
          violationType: '',
          stime: '',
          etime: '',
          value: '全部选择'
        }
      ],
      query: {
        platformName: '',
        vehicleNumber: '',
        driverNumber: '',
        violationType: '',
        stime: '',
        etime: '',
        value: ''
      },
      table: {
        loading: false,
        data: [],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      count: 1,
      value: '全部选择',
      dialogVisible: false,
      dialog: {
        radio1: '1',
        list: [],
        display: false
      },
      filedList: [{
        value: 'DRIVER_NAME',
        label: '驾驶员姓名'
      }, {
        value: 'DRIVER_NUMBER',
        label: '驾驶员证号'
      }, {
        value: 'VEHICLE_NUMBER',
        label: '车牌号码'
      }, {
        value: 'ABB_NAME',
        label: '平台公司'
      }, {
        value: 'ORDER_NUMBER',
        label: '订单编号'
      }, {
        value: 'VIOLATION_TYPE',
        label: '违规类型'
      }, {
        value: 'STIME',
        label: '订单开始时间'
      }, {
        value: 'ETIME',
        label: '订单结束时间'
      }, {
        value: 'START_POSITION',
        label: '订单起点'
      }, {
        value: 'END_POSITION',
        label: '订单终点'
      }, {
        value: 'ORDER_MONEY',
        label: '订单金额'
      }]
    }
  },
  mounted() {
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements)
      this.query.stime = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')
      this.query.etime = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')
      this.getViolationOperationAnalysis()
      this.getPlatformName()
    })
  },
  methods: {
    getViolationOperationAnalysis() {
      const { vehicleNumber, driverNumber, violationType, stime, etime } = this.query
      if (stime === '' || !stime || etime === '' || !etime) {
        this.$message({
          message: '时间不能为空！',
          type: 'warning'
        })
      } else {
        this.table.loading = true

        let tempPlatformName = ''
        if (this.value != '全部选择') {
          tempPlatformName = this.value
        }
        const { currentPage, pageSize } = this.table
        axios
          .get('getOperationAndWarningAction/getViolationOperationAnalysis', {
            baseURL: this.baseURL,
            params: {
              platformName: tempPlatformName,
              vehicleNumber: vehicleNumber,
              driverNumber: driverNumber,
              violationType: violationType,
              page: currentPage,
              pageSize: pageSize,
              sTime: stime && moment(stime).format('YYYY-MM-DD'),
              eTime: etime && moment(etime).format('YYYY-MM-DD')
            }
          })
          .then(res => {
            this.table.data = res.data.datas || []
            this.table.total = res.data.count
            this.table.loading = false
          })
      }
    },
    getPlatformName() {
      this.table.loading = true
      axios
        .get('getOperationAndWarningAction/getPlatformName', {
          baseURL: this.baseURL,
          params: {}
        })
        .then(res => {
          _.each(res.data, item => {
            let temp = {}
            if (item.ABB_NAME != '') {
              temp.platformName = item.ABB_NAME
              temp.value = this.count++
              this.info.push(temp)
            }
          })
          this.table.loading = false
        })
    },
    handleQuerySearch(query, cb) {
      let list = []
      if (query.length >= 5) {
        let idata = `postData={'vehicle_number':'${this.query.vehicleNumber}','time':'${this.query.stime}'}`
        axios
          .post('getOperationAndWarningAction/getViolationOperationAnalysisVehicleNumber', idata, {
            baseURL: this.baseURL
          })
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              list.push({
                value: res.data[i].VEHICLE_NUMBER
              })
            }
            cb(list)
          })
      } else {
        return
      }
    },
    handleCarfocus() {
      // const {vehino} = this.query;
      if (this.query.vehicleNumber === '') this.query.vehicleNumber = '浙A'
    },
    handleQueryClick() {
      this.table.currentPage = 1
      this.getViolationOperationAnalysis()
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getViolationOperationAnalysis()
    },
    cellStyle() {
      return 'text-align:center;'
    },
    exportExcel() {
      this.dialogVisible = true
      this.dialog.radio1 = '1'
      this.dialog.list = []
      this.dialog.display = false
    },
    changeList() {
      if(this.dialog.radio1 == '1') this.dialog.display = false
      else this.dialog.display = true
    },
    exportExcle() {
      const {list,radio1} = this.dialog
      let chioceList = _.filter(this.filedList,item => list.indexOf(item.value)!=-1)
      if(radio1 == '2') {
        if(chioceList.length == 0) {
          this.$message.error("导出列表不能为空！")
          return
        }
      }
      let filedLabel = '',filedValue = ''
      _.map(chioceList, item => {
        filedLabel += item.label + ','
        filedValue += item.value + ','
      })
      filedValue = filedValue.substring(0, filedValue.length - 1)
      filedLabel = filedLabel.substring(0, filedLabel.length - 1)
      this.dialogVisible = false
      const { platformName, vehicleNumber, driverNumber, violationType, stime, etime } = this.query
          window.open(
            `${this.baseURL}getOperationAndWarningAction/getViolationOperationAnalysisExcel?platformName=${
              this.value
            }&vehicleNumber=${vehicleNumber}&driverNumber=${driverNumber}&violationType=${violationType}&sTime=${stime &&
              moment(stime).format('YYYY-MM-DD')}&eTime=${etime && moment(etime).format('YYYY-MM-DD')}
              &type=${radio1}&filedLabel=${filedLabel}&filedValue=${filedValue}`
          )
    }
  },
  watch: {
    '$route.path': {
      handler(oldVal, newVal) {
        this.query.stime = moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
        this.query.etime = moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
        this.getViolationOperationAnalysis()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
.tw-table {
  bottom: $margin;
}
</style>
