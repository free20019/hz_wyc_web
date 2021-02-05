<!--驾驶员统计信息-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
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
        <el-input v-model="query.jszh" placeholder="驾驶证号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="query.stime" type="datetime" placeholder="开始日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="query.etime" type="datetime" placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table class="tw-table" :data="table.data" v-loading="table.loading" border height="calc(100% - 42px)" stripe>
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="COMPANYNAME" label="平台名称" width="240"></el-table-column>
        <el-table-column align="center" prop="ADDRESS" label="注册地行政区划代码" width="160"></el-table-column>
        <el-table-column align="center" prop="LICENSEID" label="机动车驾驶证编号" width="160"></el-table-column>
        <el-table-column align="center" prop="CYCLE" label="统计周期" width="160"></el-table-column>
        <el-table-column align="center" prop="ORDERCOUNT" label="完成订单次数" width="160"></el-table-column>
        <el-table-column align="center" prop="TRAFFICVIOLATIONCOUNT" label="交通违章次数" width="160"></el-table-column>
        <el-table-column align="center" prop="COMPLAINEDCOUNT" label="被投诉次数" width="160"></el-table-column>
        <el-table-column
          align="center"
          prop="FLAG"
          label="操作标识"
          width="160"
          :formatter="flagFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="UPDATETIME"
          label="更新时间"
          :formatter="timeFormatter"
          min-width="160"
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
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { templateHeight } from '../../../assets/js/util'

export default {
  name: 'DriverStatisticsInformation',
  data() {
    return {
      query: {
        jszh: '',
        stime: '',
        etime: '',
        ptname: '0'
      },
      table: {
        data: [],
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
      this.query.stime = moment(moment().format('YYYY-MM-DD 00:00:00'))
      this.query.etime = moment(moment().format('YYYY-MM-DD HH:mm:ss'))
      this.getDataList()
    })
  },
  computed: {
    ...mapGetters(['getAutoCompanyName'])
  },
  methods: {
    handleQueryClick() {
      this.table.currentPage = 1
      this.getDataList()
    },
    getDataList() {
      const { stime, etime } = this.query
      if (stime == '' || etime == '' || !stime || !etime) {
        this.$message({
          message: '时间选项不能为空！',
          type: 'warning'
        })
      } else {
        this.table.loading = true
        let idata = `postData={'ptname':'${this.query.ptname}','jszh':'${this.query.jszh}','endtime':'${moment(
          this.query.etime
        ).format('YYYY-MM-DD HH:mm:ss')}','begintime':'${moment(this.query.stime).format(
          'YYYY-MM-DD HH:mm:ss'
        )}','pageIndex':'${this.table.currentPage}','pageSize':'${this.table.pageSize}' }`
        axios.post('manage/findJsytjxx', idata, { baseURL: this.baseURL }).then(res => {
          let data = res.data
          this.table.data = data.datas
          this.table.total = parseInt(data.count)
          setTimeout(() => {
            this.table.loading = false
          }, 500)
        })
      }
    },
    flagFormatter(item, col, value) {
      if (value == '1') {
        return '新增'
      } else if (value == '2') {
        return '更新'
      } else {
        return '删除'
      }
    },
    timeFormatter(item, col, value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getDataList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
