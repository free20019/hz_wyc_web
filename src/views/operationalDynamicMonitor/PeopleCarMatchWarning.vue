<!-- 人车不符经营预警 -->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-select v-model="query.companyName" placeholder="平台名称" clearable>
          <el-option
            v-for="item in query.companyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-autocomplete
          class="inline-input"
          v-model="query.vehicleNumber"
          placeholder="车牌号码"
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
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">导出</el-button>
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
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ajaxT } from '../../assets/js/api'
import _ from 'underscore'
import moment from 'moment'
import { templateHeight } from '../../assets/js/util'

export default {
  name: 'PeopleCarMatchWarning',
  data() {
    return {
      query: {
        companyName: '全部',
        companyList: [],
        vehicleNumber: '',
        driverNumber: '',
        stime: '',
        etime: '',
        violationType: ''
      },
      table: {
        loading: false,
        data: [],
        pageSize: 20,
        currentPage: 1,
        total: 0
      }
    }
  },
  mounted() {
    this.query.stime = moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD')
    this.query.etime = moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD')
    this.getPlatformName()
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements)
    })
  },
  methods: {
    // 公司下拉框
    getPlatformName() {
      ajaxT.get('getOperationAndWarningAction/getPlatformName', {}).then(res => {
        let list = [
          {
            label: '全部',
            value: ''
          }
        ]
        _.each(res.data, item => {
          if (item.ABB_NAME) list.push({ value: item.ABB_NAME, label: item.ABB_NAME })
        })
        this.query.companyList = list
      })
    },
    // 自动补全浙A
    handleCarfocus() {
      if (this.query.vehicleNumber === '') this.query.vehicleNumber = '浙A'
    }
  }
}
</script>

<style></style>
