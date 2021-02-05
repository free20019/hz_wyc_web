<!--
 * @Descripttion: 特殊目标查询
 * @version: 
 * @Author: CFQ
 * @Date: 2020-03-26 10:06:44
 * @LastEditors: CFQ
 * @LastEditTime: 2020-04-15 14:16:15
 -->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" :model="query" size="small" ref="queryBar">
      <el-form-item>
        <el-date-picker v-model="query.year" type="month" placeholder="查询时间"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.ptmc" clearable placeholder="平台名称">
          <el-option
            v-for="item in getAutoCompanyName"
            :key="item.onlyId"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.driverName" clearable placeholder="驾驶员姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.idcard" clearable placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.cphm" clearable placeholder="车牌号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="table.loading" @click="handleQueryClick">查询</el-button>
      </el-form-item>
      <!--<el-form-item>-->
      <!--<el-button type="primary">导出</el-button>-->
      <!--</el-form-item>-->
    </el-form>
    <div class="tw-query-panel dialog_no" ref="queryPanel">
      <el-table
        :data="table.data"
        class="tw-table"
        v-loading="table.loading"
        border
        size="small"
        stripe
        height="calc(100% - 42px)"
      >
        <el-table-column label="月份" prop="MONTH" align="center" width="200"></el-table-column>
        <el-table-column label="平台名称" prop="ABB_NAME" align="center" width="200"></el-table-column>
        <el-table-column label="姓名" prop="DRIVERNAME" align="center" width="200"></el-table-column>
        <el-table-column label="身份证号" align="center" width="200">
          <template slot-scope="scope">
            <span class="table-text" @click="handleTableClick(scope.row, 'sfzh')">{{ scope.row.LICENSEID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务车号" align="center" min-width="140">
          <template slot-scope="scope">
            <span class="table-text" @click="handleTableClick(scope.row, 'fwch')">{{ scope.row.VEHICLENO }}</span>
          </template>
        </el-table-column>
        <el-table-column label="营运趟次" prop="ORDER_NUM" align="center" width="200"></el-table-column>
        <el-table-column label="营运收益" prop="FACTPRICE" align="center" width="200"></el-table-column>
        <el-table-column label="操作" align="center" width="140" :resizable="false">
          <template slot-scope="scope">
            <el-button type="text" @click="handleTableClick(scope.row, 'detail')" size="small">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="table.pageSize"
        :current-page="table.currentPage"
        :total="table.total"
        @current-change="handleTablePageCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.display"
      :close-on-click-modal="false"
      :custom-class="dialogClassName"
      :width="dialog.width"
      @close="handleDialogClose"
    >
      <id-card v-if="dialog.type == 'sfzh'" :selectRow="detailData"></id-card>
      <car-info v-else-if="dialog.type == 'fwch'" :selectRow="detailData"></car-info>
      <query-detail
        :data="detailData"
        :total="dialog.total"
        :pageSize="dialog.pageSize"
        :currentPage="dialog.currentPage"
        :loading="dialog.loading"
        @page-change="dialogPageChange"
        @export-detail="handleDetailExport"
        v-else-if="dialog.type == 'detail'"
      ></query-detail>
    </el-dialog>
  </div>
</template>

<script>
import IdCard from '../../components/SpecialTargetQuery/IdCard'
import CarInfo from '../../components/SpecialTargetQuery/CarInfo'
import QueryDetail from '../../components/SpecialTargetQuery/QueryDetail'
import { templateHeight } from '../../assets/js/util'
import { mapGetters } from 'vuex'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'SpecialTargetQuery',
  data() {
    return {
      query: {
        year: new Date(),
        ptmc: '',
        driverName: '',
        idcard: '',
        cphm: ''
      },
      table: {
        data: [],
        loading: false,
        pageSize: 30,
        total: 0,
        currentPage: 1,
        selectRow: {}
      },
      dialog: {
        title: '',
        display: false,
        type: '',
        pageSize: 10,
        total: 0,
        currentPage: 1,
        loading: false,
        width: ''
      },
      detailData: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements)
      this.getTableData()
    })
  },
  computed: {
    ...mapGetters(['getAutoCompanyName']),
    dialogClassName() {
      if (this.dialog.type == 'detail') return 'dialog-big big'
      else return 'dialog-big'
    }
  },
  methods: {
    handleQueryClick() {
      this.table.currentPage = 1
      this.getTableData()
    },
    getTableData() {
      this.table.loading = true
      const baseURL = this.baseURL
      const { year, qymc, driverName, idcard, cphm } = this.query
      const { currentPage, pageSize } = this.table
      axios
        .get('data/getSpecialTarget', {
          baseURL,
          params: {
            stime: year ? moment(year).format('YYYY-MM') : '',
            etime: year ? moment(year).format('YYYY-MM') : '',
            company_id: qymc,
            driver_name: driverName,
            licenseid: idcard,
            vehicleno: cphm,
            page: currentPage,
            pageSize: pageSize
          }
        })
        .then(res => {
          this.table.total = res.data.count
          this.table.data = res.data.datas
          this.table.loading = false
        })
    },
    handleDialogClose() {
      this.dialog.currentPage = 1
      this.dialog.type = ''
      this.dialog.total = 0
      this.detailData = null
    },
    dialogPageChange(val) {
      this.dialog.currentPage = val
      this.getDetail(this.table.selectRow)
    },
    // 查看详细
    handleTableClick(row, type) {
      this.table.loading = true
      this.dialog.type = type
      if (type == 'sfzh') this.getSfzDetail(row.LICENSEID)
      else if (type == 'fwch') this.getCarDetail(row.VEHICLENO)
      else if (type == 'detail') {
        this.table.selectRow = row
        this.getDetail(row)
      }
    },
    handleDetailExport() {
      const { COMPANYID, MONTH, LICENSEID, VEHICLENO } = this.table.selectRow
      const { currentPage, pageSize } = this.dialog
      window.open(
        `${
          this.baseURL
        }data/exportPayInfo?companyid=${COMPANYID}&month=${MONTH}&lincenseid=${LICENSEID}&vehicleno=${VEHICLENO}`
      )
    },
    getDetail(row) {
      this.dialog.width = '1350px'
      this.dialog.title = '订单明细信息'
      const baseURL = this.baseURL
      this.dialog.loading = true
      const { COMPANYID, MONTH, LICENSEID, VEHICLENO } = row
      axios
        .get('data/getPayInfo', {
          baseURL,
          params: {
            companyid: COMPANYID,
            month: MONTH,
            lincenseid: LICENSEID,
            vehicleno: VEHICLENO
          }
        })
        .then(res => {
          this.table.loading = false
          this.detailData = res.data.datas
          this.dialog.total = res.data.count
          this.dialog.display = true
          this.dialog.loading = false
        })
    },
    getCarDetail(id) {
      this.dialog.width = '1200px'
      this.dialog.title = '运输证信息'
      this.detailData = {}
      const baseURL = this.baseURL
      axios
        .get('data/getCarInfo', {
          baseURL,
          params: {
            cphm: id
          }
        })
        .then(res => {
          this.table.loading = false
          if (res.data.msg == '0') {
            this.detailData = (res.data.datas[0] && res.data.datas[0]) || {}
            this.dialog.display = true
          } else {
            this.$message.error('查询失败')
          }
        })
    },
    // 点击身份证获取详细信息
    getSfzDetail(id) {
      this.dialog.width = '1000px'
      this.dialog.title = '驾驶员从业资格信息'
      this.detailData = {}
      const baseURL = this.baseURL
      axios
        .get('data/getDriverInfo', {
          baseURL,
          params: {
            lincenseid: id
          }
        })
        .then(res => {
          this.table.loading = false
          if (res.data.msg == '0') {
            this.detailData = (res.data.datas[0] && res.data.datas[0]) || {}
            console.info(this.detailData)
            this.dialog.display = true
          } else {
            this.$message.error('查询失败')
          }
        })
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getTableData()
    }
  },
  components: {
    IdCard,
    CarInfo,
    QueryDetail
  }
}
</script>

<style lang="scss" scoped>
.table-text {
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #0000ff;
  }
}
</style>
