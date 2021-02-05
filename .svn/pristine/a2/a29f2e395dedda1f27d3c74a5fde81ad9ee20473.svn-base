<!--投诉订单查询-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" :model="query" size="small" ref="queryBar">
      <el-form-item>
        <el-input v-model="query.orderId" placeholder="请输入订单号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.driverName" placeholder="请输入驾驶员姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.vehicleNo" placeholder="请输入车牌号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="datetime" placeholder="开始时间" v-model="query.sTime"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="datetime" placeholder="结束时间" v-model="query.eTime"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick" :loading="table.loading">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table
        :data="table.data"
        class="tw-table tw-moreinfo-table"
        v-loading="table.loading"
        border
        height="calc(100% - 42px)"
        stripe
      >
        <el-table-column align="center" prop="ORDERID" label="订单号" width="160"></el-table-column>
        <el-table-column
          align="center"
          prop="COMPLAINTTIME"
          label="投诉时间"
          width="160"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column align="center" prop="DETAIL" label="投诉内容" width="160"></el-table-column>
        <el-table-column align="center" prop="RESULT" label="处理结果" width="160"></el-table-column>
        <el-table-column align="center" prop="DRIVERNAME" label="驾驶员姓名" width="160"></el-table-column>
        <el-table-column align="center" prop="LICENSEID" label="机动车驾驶证号" width="160"></el-table-column>
        <el-table-column align="center" prop="VEHICLENO" label="车辆号牌" width="160"></el-table-column>
        <el-table-column align="center" prop="DEPAREA" label="上车地点" width="160"></el-table-column>
        <el-table-column
          align="center"
          prop="DEPTIME"
          label="上车时间"
          width="160"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column align="center" prop="DESTAREA" label="下车地点" width="160"></el-table-column>
        <el-table-column
          align="center"
          prop="DESTTIME"
          label="下车时间"
          width="160"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column align="center" prop="FACTPRICE" label="实收金额(元)" width="160"></el-table-column>
        <el-table-column
          align="center"
          prop="ORDERMATCHTIME"
          label="订单完成时间"
          :formatter="timeFormatter"
          width="160"
          :resizable="false"
        ></el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="table.pageSize"
        :current-currentPage="table.currentPage"
        :total="table.total"
        @current-change="handleTablePageCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import { templateHeight } from '../../assets/js/util'
export default {
  name: 'ComplaintOrder',
  data() {
    return {
      query: {
        sTime: '',
        eTime: '',
        orderId: '',
        driverName: '',
        vehicleNo: ''
      },
      table: {
        data: [{ RESULT: '解决' }],
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
      this.query.sTime = moment(moment().format('YYYY-MM-DD 00:00:00'))
      this.query.eTime = moment(moment().format('YYYY-MM-DD HH:mm:ss'))
      this.getQueryData()
    })
  },
  methods: {
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getQueryData()
    },
    handleQueryClick() {
      this.table.currentPage = 1
      this.getQueryData()
    },
    getQueryData() {
      const { sTime, eTime, orderId, driverName, vehicleNo } = this.query
      const { currentPage, pageSize } = this.table
      if (!sTime || !eTime || sTime == '' || eTime == '') {
        this.$message({
          message: '请填写时间选项',
          type: 'warning'
        })
      } else {
        this.table.loading = true
        axios
          .get('getServiceQualityAction/getComplaintOrder', {
            baseURL: this.baseURL,
            params: {
              orderId,
              driverName,
              vehicleNo,
              sTime: moment(this.query.sTime).format('YYYY-MM-DD HH:mm:ss'),
              eTime: moment(this.query.eTime).format('YYYY-MM-DD HH:mm:ss'),
              page: currentPage,
              pageSize
            }
          })
          .then(res => {
            let data = res.data
            this.table.data = data.datas
            this.table.total = parseInt(data.count)
            setTimeout(() => {
              this.table.loading = false
            }, 500)
          })
      }
    },
    //时间
    timeFormatter(item, col, value) {
      if (value !== '') {
        return moment(value).format('YYYY-MM-DD')
      } else {
        return moment()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-table {
  overflow-x: auto;
}
</style>
