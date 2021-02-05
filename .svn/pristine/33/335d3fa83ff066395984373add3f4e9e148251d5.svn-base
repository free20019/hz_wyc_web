<!--12328投诉查询-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" :model="query" size="small" ref="queryBar">
      <el-form-item>
        <el-date-picker type="date" placeholder="开始时间" v-model="query.stime"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="结束时间" v-model="query.etime"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick" :loading="table.loading">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table
        :data="filterPlatformList"
        class="tw-table tw-moreinfo-table"
        v-loading="table.loading"
        border
        height="calc(100% - 42px)"
        stripe
      >
        <el-table-column align="center" prop="REGID" label="受理ID" width="160"></el-table-column>
        <el-table-column
          prop="DEMAND_TIME"
          align="center"
          label="要求完成时间"
          width="160"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column align="center" prop="PROC_USER_NAME" label="办理人姓名" width="160"></el-table-column>
        <el-table-column align="center" prop="PROC_DEPT_NAME" label="办理部门名称" width="160"></el-table-column>
        <el-table-column
          align="center"
          prop="PROC_TIME"
          label="办理时间"
          width="160"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column align="center" prop="PROC_RESULT" label="办理结果" width="160"></el-table-column>
        <el-table-column align="center" prop="CUST_SATITYPE" label="公众满意度" width="160"></el-table-column>
        <el-table-column align="center" prop="CUST_ADVICE" label="公众意见" width="160"></el-table-column>
        <el-table-column
          align="center"
          prop="FROMTYPE"
          label="业务来源"
          width="160"
          :formatter="ywlyFomatter"
        ></el-table-column>
        <el-table-column align="center" prop="NAME" label="姓名" width="160"></el-table-column>
        <el-table-column align="center" prop="PHONENO" label="电话号码" width="160"></el-table-column>
        <el-table-column align="center" prop="CAR_LICENSE_NUM" label="车牌号" width="160"></el-table-column>
        <el-table-column align="center" prop="UNIT_NAME" label="单位名称" width="160"></el-table-column>
        <el-table-column
          align="center"
          prop="HAPPEN_DATE"
          label="发生时间"
          width="160"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="YWTYPE"
          label="业务种类"
          width="160"
          :formatter="ywFomatter"
        ></el-table-column>
        <el-table-column align="center" prop="YWTYPEFULLNAME" label="业务类型全称" width="160"></el-table-column>
        <el-table-column align="center" prop="CONTENT" label="业务内容" width="160"></el-table-column>
        <el-table-column align="center" prop="HAPPEN_ADDR" label="发生地点" width="160"></el-table-column>
        <el-table-column align="center" prop="IS_VALID" label="网约车字段" width="160"></el-table-column>
        <el-table-column align="center" prop="MEMO" label="备注" width="160" :resizable="false"></el-table-column>
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
import moment from 'moment'
import axios from 'axios'
import _ from 'underscore'
import { templateHeight } from '../../assets/js/util'
export default {
  name: 'ComplaintInquiry',
  data() {
    return {
      query: {
        stime: '',
        etime: ''
      },
      table: {
        data: [{ REGID: '123456', FROMTYPE: '17', YWTYPE: '0' }],
        loading: false,
        pageSize: 20,
        currentPage: 1,
        total: 0
      }
    }
  },
  computed: {
    filterPlatformList() {
      const { data, pageSize, currentPage } = this.table
      const pageIndex = currentPage - 1
      return _.filter(data, (item, index) => {
        return index >= pageIndex * pageSize && index < currentPage * pageSize
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements)
      this.query.stime = this.query.etime = moment()
      this.getQueryData()
    })
  },
  methods: {
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
    },
    handleQueryClick() {
      this.table.currentPage = 1
      this.getQueryData()
    },
    getQueryData() {
      const { stime, etime } = this.query
      if (!stime || !etime || stime == '' || etime == '') {
        this.$message({
          message: '请填写时间选项',
          type: 'warning'
        })
      } else {
        this.table.loading = true
        axios
          .get('getServiceQualityAction/getComplaintEnquiry', {
            baseURL: this.baseURL,
            params: {
              sTime: moment(this.query.stime).format('YYYY-MM-DD'),
              eTime: moment(this.query.etime).format('YYYY-MM-DD')
            }
          })
          .then(res => {
            this.table.data = res.data || []
            this.table.currentPage = 1
            this.table.total = this.table.data.length
            setTimeout(() => {
              this.table.loading = false
            }, 500)
          })
      }
    },
    //要求完成时间
    timeFormatter(item, col, value) {
      if (value !== '') {
        return moment(value).format('YYYY-MM-DD')
      } else {
        return ''
      }
    },
    //业务种类
    ywFomatter(item, col, value) {
      if (value == '0') {
        return '投诉'
      } else if (value == '1') {
        return '咨询'
      } else if (value == '9') {
        return '其它'
      } else if (value == '2') {
        return '建议'
      } else {
        return ''
      }
    },
    //业务来源
    ywlyFomatter(item, col, value) {
      if (value == '17') {
        return '运管来人来访件'
      } else if (value == 'B') {
        return '交通部转办件'
      } else if (value == 'T') {
        return '12328热线电话'
      } else if (value == '5') {
        return '数字城管交办件'
      } else if (value == 'O') {
        return '其它'
      } else if (value == 'R') {
        return '12328督察重办件'
      } else if (value == '7') {
        return '厅长信箱'
      } else if (value == '6') {
        return '局长信箱'
      } else if (value == '4') {
        return '12345市长公开电话交办件'
      } else if (value == '8') {
        return '治堵平台'
      } else if (value == '9') {
        return '新浪微博'
      } else if (value == '10') {
        return '腾讯微博'
      } else if (value == 'F') {
        return '12328热线传真'
      } else if (value == '11') {
        return '新华微博'
      } else if (value == 'V') {
        return '12328热线留言'
      } else if (value == '12') {
        return '腾讯微信'
      } else if (value == '13') {
        return '浙江服务网'
      } else if (value == '14') {
        return '交通杭州微信'
      } else if (value == '18') {
        return '110应急联动'
      } else if (value == 'J') {
        return '交通杭州APP交办件'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-table {
  overflow-x: auto;
}
</style>
