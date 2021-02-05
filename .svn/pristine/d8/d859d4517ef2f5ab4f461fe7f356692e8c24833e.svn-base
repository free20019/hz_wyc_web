<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-input v-model="query.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.sysType" placeholder="请选择系统类型">
          <el-option v-for="item in query.sysList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          align="right"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick" :loading="table.loading">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExportClick">导出</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table v-loading="table.loading" stripe class="tw-table" :data="table.data" border height="calc(100% - 42px)">
        <el-table-column prop="USERNAME" width="200" align="center" label="用户名"></el-table-column>
        <el-table-column prop="HANDLE" width="650" align="center" label="访问模块"></el-table-column>
        <el-table-column
          label="时间"
          align="center"
          min-width="200"
          :resizable="false"
          :formatter="formatterTime"
        ></el-table-column>
      </el-table>
      <el-pagination
        class="tw-page-bar"
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

export default {
  name: 'Record',
  data() {
    return {
      query: {
        sysType: 0,
        sysList: [
          { value: 0, label: '网约车监管服务平台' },
          { value: 1, label: '考试管理系统' },
          { value: 2, label: '申报信息管理系统' },
          { value: 3, label: '互联网申报系统' }
        ],
        stime: '',
        etime: '',
        username: ''
      },
      table: {
        data: [],
        pageSize: 30,
        currentPage: 1,
        total: 0,
        loading: false
      },
      value2: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.query.etime = moment().format('YYYY-MM-DD 23:59:59')
      this.query.stime = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD 00:00:00')
      this.value2.push(this.query.stime)
      this.value2.push(this.query.etime)
      this.queryTable()
    })
  },
  methods: {
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
          const { sysType } = this.query
          let startTime = ''
          let endTime = ''
          if (this.value2) {
            startTime = moment(this.value2[0]).format('YYYY-MM-DD HH:mm:ss')
            ;(endTime = 'etime'), moment(this.value2[1]).format('YYYY-MM-DD HH:mm:ss')
          }
          window.open(`${this.baseURL}user/getLogExcel?condition=${sysType}&stime=${startTime}&etime=${endTime}`)
        })
        .catch(e => {})
    },
    formatterTime(row) {
      return moment(row.DBTIME).format('YYYY-MM-DD HH:mm:ss')
    },
    handleQueryClick() {
      this.queryTable()
    },
    queryTable() {
      const timelist = this.value2
      const baseURL = this.baseURL
      const params = new URLSearchParams()
      if (!this.value2) {
        this.$message({
          message: '请选择时间',
          type: 'warning'
        })
      } else {
        this.table.loading = true
        params.append('condition', this.query.sysType)
        params.append('page', this.table.currentPage)
        params.append('pageSize', this.table.pageSize)
        params.append('username', this.query.username)
        if (timelist) {
          params.append('stime', moment(this.value2[0]).format('YYYY-MM-DD HH:mm:ss'))
          params.append('etime', moment(this.value2[1]).format('YYYY-MM-DD HH:mm:ss'))
        } else {
          params.append('stime', '')
          params.append('etime', '')
        }
        axios.post('user/getLog', params, { baseURL }).then(res => {
          this.table.data = res.data.list
          this.table.total = res.data.count
          setTimeout(() => {
            this.table.loading = false
          }, 500)
        })
      }
    },
    handleTablePageCurrentChange(val) {
      this.table.currentPage = val
      this.queryTable()
    }
  }
}
</script>

<style scoped></style>
