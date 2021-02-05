<!--企业日均营运统计-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-date-picker type="month" v-model="query.time" placeholder="时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
      <el-form-item>
        <!--<el-button type="primary" @click="handleQueryDC">导出</el-button>-->
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table
        class="tw-table tw-moreinfo-table"
        :data="table.data"
        v-loading="table.loading"
        border
        height="100%"
        stripe
      >
        <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
        <el-table-column prop="ABB_NAME" align="center" label="企业名称" width="250"></el-table-column>
        <el-table-column prop="HYJSY" align="center" label="日均活跃驾驶员" width="200"></el-table-column>
        <el-table-column prop="HYCL" align="center" label="日均活跃车辆" width="200"></el-table-column>
        <el-table-column prop="ZDD" align="center" label="日均订单" width="220"></el-table-column>
        <el-table-column prop="ZYS" align="center" label="日均营收(元)" width="220"></el-table-column>
        <el-table-column prop="ZXSLC" align="center" label="日均行驶里程(公里)" width="200"></el-table-column>
        <el-table-column prop="ZZKSC" align="center" label="日均载客时长(分)" min-width="160" :resizable="false"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'underscore'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { templateHeight } from '../../../assets/js/util'

export default {
  name: 'qyrjyytj',
  data() {
    return {
      query: {
        time: ''
      },
      table: {
        data: [],
        loading: true
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.query.time = this.timeFormatter(new Date())
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements)
      this.getData()
    })
  },
  computed: {
    ...mapGetters(['getAutoCompanyName'])
  },
  methods: {
    getData() {
      this.table.loading = true
      const params = new URLSearchParams()
      params.append('time', this.timeFormatter(this.query.time))
      params.append('type', 1)
      return axios.post('map/qyrjyytj', params, { baseURL: this.baseURL }).then(res => {
        let data = res.data
        this.table.data = data
        setTimeout(() => {
          this.table.loading = false
        }, 500)
      })
    },
    handleQueryClick() {
      this.getData()
    },
    timeFormatter(value) {
      return moment(value).format('YYYY-MM')
    },
    handleQueryDC() {
      let url = `${this.baseURL}map/qyrjyytjexcle?type=1&time=${this.timeFormatter(this.query.time)}`
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped></style>
