<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" style="text-align: right;" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-button type="primary" @click="handleExport">导出</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel" style="height:650px">
      <el-table :data="data" class="tw-table" v-loading="loading" border size="small" height="100%">
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="ABB_NAME" label="平台名称" width="100"></el-table-column>
        <el-table-column align="center" prop="DRIVERNAME" label="姓名" width="80"></el-table-column>
        <el-table-column align="center" prop="LICENSEID" label="身份证号" width="150"></el-table-column>
        <el-table-column align="center" prop="VEHICLENO" label="服务车号" width="100"></el-table-column>
        <el-table-column align="center" prop="DEPTIME" label="上车时间" width="130"></el-table-column>
        <el-table-column align="center" prop="DEPAREA" label="上车位置" width="200"></el-table-column>
        <el-table-column align="center" prop="DESTTIME" label="下车时间" width="130"></el-table-column>
        <el-table-column align="center" prop="DESTAREA" label="下车位置" min-width="200"></el-table-column>
        <el-table-column align="center" prop="FACTPRICE" label="营收金额" width="100"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'QueryDetail',
  data() {
    return {
      table: {
        data: [],
        loading: false,
        pageSize: 30,
        total: 0,
        currentPage: 1
      }
    }
  },
  props: {
    data: Array,
    total: Number,
    currentPage: Number,
    pageSize: Number,
    loading: Boolean
  },
  methods: {
    handleTablePageCurrentChange(index) {
      this.$emit('page-change', index)
    },
    handleExport() {
      this.$emit('export-detail')
    },
    // 格式化表格时间
    formatterTableTime(row, a, val) {
      return moment(val).format('YYYY-MM-DD HH:MM')
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-query-panel {
  height: 700px !important;
}
</style>
