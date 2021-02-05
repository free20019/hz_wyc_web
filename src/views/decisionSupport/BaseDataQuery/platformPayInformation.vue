<!--平台支付信息-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-select v-model="query.ptname" clearable placeholder="平台名称">
          <el-option v-for="item in getAutoCompanyName" :key="item.onlyId" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.state">
          <el-option label="有效" value="0"></el-option>
          <el-option label="失效" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table
        class="tw-table tw-moreinfo-table"
        :data="table.data"
        v-loading="table.loading"
        border
        height="calc(100% - 42px)"
        stripe
      >
        <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
        <el-table-column prop="COMPANYNAME" align="center" label="平台名称" width="250"></el-table-column>
        <el-table-column prop="PAYNAME" align="center" label="银行或者非银行支付机构名称" width="250"></el-table-column>
        <el-table-column prop="PAYID" align="center" label="非银行支付机构支付业务许可编号"></el-table-column>
        <el-table-column prop="PAYTYPE" align="center" label="支付业务类型"></el-table-column>
        <el-table-column prop="PAYSCOPE" align="center" label="业务覆盖范围"></el-table-column>
        <el-table-column prop="PREPAREBANK" align="center" label="备付金存管银行"></el-table-column>
        <el-table-column prop="COUNTDATE" align="center" label="结算周期"></el-table-column>
        <el-table-column
          prop="STATE"
          align="center"
          label="状态"
          :formatter="stateFormatter"
          :resizable="false"
        ></el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="table.pageSize"
        :current-page="table.currentPage"
        :total="table.total"
        layout="prev, pager, next"
        @current-change="handleTablePageCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { templateHeight } from '../../../assets/js/util'

export default {
  name: 'platformPayInformation',
  data() {
    return {
      query: {
        ptname: '0',
        state: '0'
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
      this.getDataList()
    })
  },
  computed: {
    ...mapGetters(['getAutoCompanyName'])
  },
  methods: {
    getDataList() {
      this.table.loading = true
      let idata = `postData={'ptname':'${this.query.ptname}','state':'${this.query.state}','pageIndex':'${
        this.table.currentPage
      }','pageSize':'${this.table.pageSize}'}`
      axios
        .post('manage/findPtzfxx', idata, {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.table.data = data.datas
          this.table.total = parseInt(data.count)
          setTimeout(() => {
            this.table.loading = false
          }, 500)
        })
    },
    handleQueryClick() {
      this.table.currentPage = 1
      this.getDataList()
    },
    stateFormatter(item, col, value) {
      if (value == '0') {
        return '有效'
      } else if (value == '1') {
        return '失效'
      } else {
        return ''
      }
    },
    //分页
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getDataList()
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-query-panel {
  border-top: none;
}
</style>
