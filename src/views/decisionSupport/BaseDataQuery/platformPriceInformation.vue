<!--平台运价信息-->
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
        <el-input v-model="query.yjlx" placeholder="运价类型" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table
        class="tw-table tw-moreinfo-table"
        :data="filterPlatformList"
        v-loading="table.loading"
        border
        height="calc(100% - 42px)"
        stripe
      >
        <el-table-column prop="COMPANYNAME" align="center" label="平台名称" width="200" fixed="left"></el-table-column>
        <el-table-column prop="ADDRESS" align="center" label="行政区划代码" width="120"></el-table-column>
        <el-table-column prop="FARETYPE" align="center" label="运价类型编码" width="150"></el-table-column>
        <el-table-column prop="FARETYPENOTE" label="运价类型说明" align="center" width="180"></el-table-column>
        <el-table-column
          prop="FAREVALIDON"
          label="运价有效期起"
          :formatter="timeFormatter"
          align="center"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="FAREVALIDOFF"
          label="运价有效期止"
          :formatter="timeFormatter"
          align="center"
          width="160"
        ></el-table-column>
        <el-table-column prop="STARTFARE" label="起步价" align="center" width="120"></el-table-column>
        <el-table-column prop="STARTMILE" label="起步里程" align="center" width="120"></el-table-column>
        <el-table-column prop="UNITPRICEPERMILE" label="计程单价按公里" align="center" width="120"></el-table-column>
        <el-table-column prop="UNITPRICEPERMINUTE" label="计时单价按分钟" align="center" width="120"></el-table-column>
        <el-table-column prop="UPPRICE" label="单程加价单价" align="center" width="120"></el-table-column>
        <el-table-column prop="UPPRICESTARTMILE" label="单程加价公里" align="center" width="120"></el-table-column>
        <el-table-column prop="MORNINGPEAKTIMEON" label="营运早高峰时间起" align="center" width="150"></el-table-column>
        <el-table-column
          prop="MORNINGPEAKTIMEOFF"
          label="营运早高峰时间止"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column prop="EVENINGPEAKTIMEON" label="营运晚高峰时间起" align="center" width="150"></el-table-column>
        <el-table-column
          prop="EVENINGPEAKTIMEOFF"
          label="营运晚高峰时间止"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column prop="OTHERPEAKTIMEON" label="其他营运高峰时间起" align="center" width="150"></el-table-column>
        <el-table-column
          prop="OTHERPEAKTIMEOFF"
          label="其他营运高峰时间止"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column prop="PEAKUNITPRICE" label="高峰时间单程加价单价" align="center" width="170"></el-table-column>
        <el-table-column
          prop="PEAKPRICESTARTMILE"
          label="高峰时间单程加价公里"
          align="center"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="LOWSPEEDPRICEPERMINUTE"
          label="低速计时加价按分钟"
          align="center"
          width="160"
        ></el-table-column>
        <el-table-column prop="NIGHTPRICEPERMILE" label="夜间费按公里" align="center" width="150"></el-table-column>
        <el-table-column prop="NIGHTPRICEPERMINUTE" label="夜间费按分钟" align="center" width="150"></el-table-column>
        <el-table-column prop="OTHERPRICE" label="其它加价金额" align="center" width="150"></el-table-column>
        <el-table-column
          prop="STATE"
          label="状态"
          align="center"
          :formatter="stateFormatter"
          fixed="right"
        ></el-table-column>
        <el-table-column
          prop="UPDATETIME"
          label="更新时间"
          :formatter="timeFormatter"
          align="center"
          width="170"
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
import _ from 'underscore'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { templateHeight } from '../../../assets/js/util'

export default {
  name: 'platformPriceInformation',
  data() {
    return {
      query: {
        ptname: '0',
        state: '0',
        yjlx: ''
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
    ...mapGetters(['getAutoCompanyName']),
    filterPlatformList() {
      const { data, pageSize, currentPage } = this.table
      const pageIndex = currentPage - 1
      return _.filter(data, (item, index) => {
        return index >= pageIndex * pageSize && index < currentPage * pageSize
      })
    }
  },
  methods: {
    getDataList() {
      this.table.loading = true
      const idata = `postData={'ptname':'${this.query.ptname}','yjlx':'${this.query.yjlx}','state':'${
        this.query.state
      }'}`
      axios
        .post('manage/findPtyjxx', idata, {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.table.data = data.yjxx || []
          this.table.currentPage = 1
          this.table.total = this.table.data.length
          setTimeout(() => {
            this.table.loading = false
          }, 500)
        })
    },
    handleQueryClick() {
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
    timeFormatter(item, col, value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    //分页
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
    }
  }
}
</script>

<style lang="scss" scoped></style>
