<!--平台信息-->
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
        height="100%"
        stripe
      >
        <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
        <el-table-column prop="COMPANYNAME" align="center" label="公司名称" width="220"></el-table-column>
        <el-table-column prop="IDENTIFIER" align="center" label="统一社会信用代码" width="200"></el-table-column>
        <el-table-column prop="ADDRESS" align="center" label="注册地行政区划" width="140"></el-table-column>
        <el-table-column prop="BUSINESSSCOPE" align="center" label="经营范围" width="400"></el-table-column>
        <el-table-column prop="CONTACTADDRESS" align="center" label="通讯地址" width="220"></el-table-column>
        <el-table-column prop="ECONOMICTYPE" align="center" label="经营业户经济类型" width="180"></el-table-column>
        <el-table-column prop="REGCAPITAL" align="center" label="注册资本" width="160"></el-table-column>
        <el-table-column prop="LEGALNAME" align="center" label="法人代表名称" width="150"></el-table-column>
        <el-table-column prop="LEGALID" align="center" label="法人代表身份证" width="180"></el-table-column>
        <el-table-column prop="LEGALPHONE" align="center" label="法人代表电话" width="150"></el-table-column>
        <el-table-column
          prop="STATE"
          align="center"
          label="状态"
          width="120"
          :formatter="stateFormatter"
        ></el-table-column>
        <el-table-column
          prop="FLAG"
          align="center"
          label="操作标识"
          :formatter="flagFormatter"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="UPDATETIME"
          align="center"
          label="更新时间"
          :formatter="timeFormatter"
          min-width="160"
          :resizable="false"
        ></el-table-column>
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
  name: 'platformInformation',
  data() {
    return {
      query: {
        ptname: '0',
        state: '0'
      },
      table: {
        data: [],
        loading: true
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
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
      let idata = `postData={'ptname':'${this.query.ptname}','state':'${this.query.state}'}`
      axios
        .post('manage/findPtjcxx', idata, {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.table.data = data.ptjcxx
          setTimeout(() => {
            this.table.loading = false
          }, 500)
        })
    },
    handleQueryClick() {
      this.getData()
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
    stateFormatter(item, col, value) {
      if (value == '0') {
        return '有效'
      } else if (value == '1') {
        return '失效'
      } else {
        return ''
      }
    },
    timeFormatter(item, col, value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped></style>
