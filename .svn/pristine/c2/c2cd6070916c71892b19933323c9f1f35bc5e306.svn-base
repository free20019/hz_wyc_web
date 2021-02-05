<!--平台营运规模信息-->
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
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table class="tw-table" :data="table.data" v-loading="table.loading" border height="100%" stripe>
        <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
        <el-table-column prop="COMPANYNAME" align="center" label="平台名称"></el-table-column>
        <el-table-column prop="VEHICLENUM" align="center" label="平台注册网约车辆数"></el-table-column>
        <el-table-column prop="DRIVERNUM" align="center" label="平台注册司机数"></el-table-column>
        <el-table-column prop="FLAG" align="center" label="操作标识" :formatter="flagFormatter"></el-table-column>
        <el-table-column
          prop="UPDATETIME"
          align="center"
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
import _ from 'underscore'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { templateHeight } from '../../../assets/js/util'

export default {
  name: 'platformOperationScaleInformation',
  data() {
    return {
      query: {
        ptname: '0'
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
      let idata = `postData={'ptname':'${this.query.ptname}'}`
      axios
        .post('manage/findPtyygmxx', idata, {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.table.data = data.yygm
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
    timeFormatter(item, col, value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped></style>
