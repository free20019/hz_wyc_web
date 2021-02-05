<!--平台经营许可信息-->
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
        <el-select v-model="query.state" :formatter="stateFormatter">
          <el-option label="有效" value="0"></el-option>
          <el-option label="失效" value="1"></el-option>
        </el-select>
      </el-form-item>
      &nbsp;<el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table
        class="tw-table"
        :data="table.data"
        v-loading="table.loading"
        border
        :cell-style="cellStyle"
        :header-cell-style="rowClasses"
        height="100%"
        stripe
      >
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="OWNERNAME" label="平台名称" width="190"></el-table-column>
        <el-table-column prop="ADDRESS" label="行政区划" width="180"></el-table-column>
        <el-table-column prop="CERTIFICATE" label="网络预约出租汽车经营许可证号" width="280"></el-table-column>
        <el-table-column prop="OPERATIONAREA" label="经营区域" width="180"></el-table-column>
        <el-table-column prop="COMPANYNAME" label="公司名称" width="190"></el-table-column>
        <el-table-column prop="ORGANIZATION" label="发证机构名称" width="180"></el-table-column>
        <el-table-column prop="STARTDATE" label="有效期起" width="180" :formatter="timeFormatter"></el-table-column>
        <el-table-column prop="STOPDATE" label="有效期止" width="180" :formatter="timeFormatter"></el-table-column>
        <el-table-column prop="CERTIFYDATE" label="核发日期" width="180"></el-table-column>
        <el-table-column prop="STATE" label="证照状态" width="180"></el-table-column>
        <el-table-column prop="FLAG" label="操作标识" width="180" :formatter="flagFormatter"></el-table-column>
        <el-table-column
          prop="UPDATETIME"
          label="更新时间"
          :formatter="timeFormatter"
          width="180"
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
  name: 'platformlicensingInformation',
  data() {
    return {
      query: {
        ptname: '0',
        state: '0'
      },
      table: {
        data: [],
        loading: false
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
        .post('manage/findPtjyxkxx', idata, {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.table.data = data.jyxk
          setTimeout(() => {
            this.table.loading = false
          }, 600)
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
    },
    cellStyle() {
      return 'text-align:center '
    },
    rowClasses() {
      return 'text-align:center'
    }
  }
}
</script>

<style lang="scss" scoped></style>
