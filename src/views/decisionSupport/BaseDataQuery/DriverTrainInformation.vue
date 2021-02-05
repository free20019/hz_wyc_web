<!--驾驶员培训信息-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-date-picker v-model="query.dateyear" type="year" placeholder="选择年"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.ptname" clearable placeholder="平台名称">
          <el-option
            v-for="item in getAutoCompanyName"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.jszh" placeholder="机动车驾驶证" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.pxkmc" placeholder="培训课程名" clearable></el-input>
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
      <el-table class="tw-table" :data="table.data" v-loading="table.loading" border height="calc(100% - 42px)" stripe>
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          align="center"
          prop="COMPANYNAME"
          label="平台名称"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" prop="ADDRESS" label="行政区划" min-width="180"></el-table-column>
        <el-table-column align="center" prop="LICENSEID" label="机动车驾驶证号" min-width="180"></el-table-column>
        <el-table-column align="center" prop="COURSENAME" label="驾驶员培训课程名称" min-width="180"></el-table-column>
        <el-table-column
          align="center"
          prop="COURSEDATE"
          label="培训课程日期"
          min-width="180"
          :formatter="dateFormatter"
        ></el-table-column>
        <el-table-column align="center" prop="STARTTIME" label="培训开始时间" min-width="180"></el-table-column>
        <el-table-column align="center" prop="STOPTIME" label="培训结束时间" min-width="180"></el-table-column>
        <el-table-column align="center" prop="DURATION" label="培训时长" min-width="180"></el-table-column>
        <el-table-column
          align="center"
          prop="FLAG"
          label="操作标识"
          min-width="180"
          :formatter="flagFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="UPDATETIME"
          label="更新时间"
          :formatter="timeFormatter"
          min-width="180"
          :resizable="false"
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

import _ from 'underscore'

export default {
  name: 'DriverTrainInformation',
  data() {
    return {
      query: {
        jszh: '',
        pxkmc: '',
        ptname: '0',
        state: '0',
        dateyear: ''
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
      this.query.dateyear = moment(new Date()).format('YYYY')
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
      this.table.loading = true
      let year = moment(this.query.dateyear).format('YYYY')
      let idata = `postData={'ptname':'${this.query.ptname}','year':'${year}','jszh':'${this.query.jszh}','pxkmc':'${
        this.query.pxkmc
      }','pageIndex':'${this.table.currentPage}','pageSize':'${this.table.pageSize}' }`
      axios
        .post('manage/findJsypxxx', idata, {
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
    dateFormatter(item, col, value) {
      return moment(value).format('YYYY-MM-DD')
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getDataList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
