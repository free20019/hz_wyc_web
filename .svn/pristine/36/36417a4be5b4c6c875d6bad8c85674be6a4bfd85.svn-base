<!--平台服务机构-->
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
        <el-input v-model="query.jgmc" placeholder="机构名称" clearable></el-input>
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
        stripe
        height="100%"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="COMPANYNAME" label="平台名称"></el-table-column>
        <el-table-column prop="ADDRESS" label="行政区划"></el-table-column>
        <el-table-column prop="SERVICENAME" label="服务机构名称"></el-table-column>
        <el-table-column prop="SERVICENO" label="服务机构代码"></el-table-column>
        <el-table-column prop="CONTACTPHONE" label="紧急联系电话"></el-table-column>
        <el-table-column prop="RESPONSIBLENAME" label="服务机构负责人姓名"></el-table-column>
        <el-table-column prop="RESPONSIBLEPHONE" label="负责人联系方式"></el-table-column>
        <el-table-column prop="MANAGERNAME" label="服务机构管理人姓名"></el-table-column>
        <el-table-column prop="CONTACTPHONE" label="服务机构紧急联系电话"></el-table-column>
        <el-table-column prop="MAILADDRESS" label="行政文书送达邮寄地址"></el-table-column>
        <el-table-column prop="CREATEDATE" label="服务机构设立日期" :formatter="timeFormatter"></el-table-column>
        <el-table-column prop="STATE" label="状态" width="100" :formatter="stateFormatter"></el-table-column>
        <el-table-column prop="FLAG" label="操作标识" :formatter="flagFormatter" align="center"></el-table-column>
        <el-table-column
          prop="UPDATETIME"
          label="更新时间"
          :formatter="timeFormatter"
          :resizable="false"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'underscore'
import { mapGetters } from 'vuex'
import { templateHeight } from '../../../assets/js/util'

export default {
  name: 'platformServiceOrganization',
  data() {
    return {
      query: {
        ptname: '0',
        state: '0',
        jgmc: ''
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
      const idata = `postData={'ptname':'${this.query.ptname}','jgmc':'${this.query.jgmc}','state':'${
        this.query.state
      }'}`
      axios
        .post('manage/findPtfwjg', idata, {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.table.data = data.fwjg
          setTimeout(() => {
            this.table.loading = false
          }, 500)
        })
    },
    handleQueryClick() {
      this.getData()
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
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-query-panel {
  border-top: none;
}
</style>
