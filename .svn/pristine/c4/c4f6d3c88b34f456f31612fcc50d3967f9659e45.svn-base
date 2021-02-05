<!-- 驾驶员查询 -->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" :model="query" size="small" ref="queryBar">
      <el-form-item>
        <el-input v-model="query.name" clearable placeholder="人员姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.idcard" clearable placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.phone" clearable placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="核发日期" v-model="query.stime"></el-date-picker>
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker type="date" placeholder="核发日期" v-model="query.etime"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick" :loading="table.loading">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table :data="table.data" class="tw-table" v-loading="table.loading" stripe border height="calc(100% - 42px)">
        <el-table-column align="center" type="index" label="序号" width="60" :resizable="false"></el-table-column>
        <el-table-column align="center" prop="DISTRICT" label="行政区划" width="250"></el-table-column>
        <el-table-column align="center" prop="NAME" label="人员姓名" width="250"></el-table-column>
        <el-table-column align="center" prop="ID_NUMBER" label="身份证号" width="300"></el-table-column>
        <el-table-column align="center" prop="CERTI_SUB_CODE" label="从业资格类别" width="200"></el-table-column>
        <el-table-column
          align="center"
          prop="STATUS"
          label="证照状态"
          width="200"
          :formatter="statusFormatter"
        ></el-table-column>

        <el-table-column label="操作" min-width="80" align="center" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleTableClick(scope.row)" type="text" size="small">详情</el-button>
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
      custom-class="dialog-big"
      width="1100px"
    >
      <div class="tw-dialog-title">
        <div>基本信息</div>
      </div>
      <el-form
        class="tw-form"
        label-position="right"
        :inline="true"
        size="small"
        label-width="100px"
        ref="platformBaseInfo"
      >
        <el-form-item label="姓名">
          <el-input :value="selectRow.NAME" readonly></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input :value="selectRow.ID_NUMBER" readonly></el-input>
        </el-form-item>
        <el-form-item label="资格证号">
          <el-input readonly></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input :value="sexFormatter(selectRow.SEX)" readonly></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input :value="timeFormatter(selectRow.BIRTHDAY)" readonly></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input :value="selectRow.NATION" readonly></el-input>
        </el-form-item>
        <el-form-item label="档案号">
          <el-input :value="selectRow.FILE_NUMBER" readonly></el-input>
        </el-form-item>
        <el-form-item label="所在行政区划">
          <el-input :value="selectRow.DISTRICT" readonly></el-input>
        </el-form-item>
        <el-form-item label="暂住证号码">
          <el-input readonly></el-input>
        </el-form-item>
        <el-form-item label="身份证地址">
          <el-input :value="selectRow.ID_ADDR" readonly></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input :value="selectRow.PHONE" readonly></el-input>
        </el-form-item>
        <el-form-item label="现住地址">
          <el-input :value="selectRow.LIVING_ADDR" readonly></el-input>
        </el-form-item>
      </el-form>
      <div class="tw-dialog-title" style="margin-top:10px">
        <div>资格信息</div>
      </div>
      <el-form
        class="tw-form"
        label-position="right"
        :inline="true"
        size="small"
        label-width="100px"
        ref="platformBaseInfo"
      >
        <el-form-item label="证件编号">
          <el-input :value="selectRow.DRIVER_NUM" readonly></el-input>
        </el-form-item>
        <el-form-item label="从业资格类别">
          <el-input :value="selectRow.CERTI_SUB_CODE" readonly></el-input>
        </el-form-item>
        <el-form-item label="证件状态">
          <el-input :value="statusFormatter('', '', selectRow.STATUS)" readonly></el-input>
        </el-form-item>
        <el-form-item label="发证机关">
          <el-input :value="selectRow.ORGAN_CODE" readonly></el-input>
        </el-form-item>
        <el-form-item label="有效期起">
          <el-input :value="selectRow.VALID_DATE_BEGIN" readonly></el-input>
        </el-form-item>
        <el-form-item label="有效期止">
          <el-input :value="selectRow.VALID_DATE_END" readonly></el-input>
        </el-form-item>
        <el-form-item label="初领日期">
          <el-input :value="selectRow.CERTI_EARLY_DATE" readonly></el-input>
        </el-form-item>
        <el-form-item label="核发日期">
          <el-input :value="selectRow.PRINT_DATE" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { templateHeight } from '../../../assets//js/util'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'DriverQuery',
  data() {
    return {
      query: {
        name: '',
        idcard: '',
        phone: '',
        stime: '',
        etime: ''
      },
      table: {
        data: [],
        loading: false,
        pageSize: 30,
        total: 0,
        currentPage: 1
      },
      dialog: {
        title: '',
        display: false
      },
      selectRow: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements)
      this.getQueryData()
    })
  },
  methods: {
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getQueryData()
    },
    handleTableClick(row) {
      this.selectRow = row
      this.dialog.display = true
    },
    getQueryData() {
      this.table.loading = true
      const baseURL = this.baseURL
      const { name, idcard, phone, stime, etime } = this.query
      const { currentPage, pageSize } = this.table
      let begin_time = ''
      let end_time = ''
      if (stime) {
        begin_time = moment(stime).format('YYYY-MM-DD')
      }
      if (etime) {
        end_time = moment(etime).format('YYYY-MM-DD')
      }
      let idata = `postData={'name':'${name}','sfz':'${idcard}','phone':'${phone}','begin_time':'${begin_time}','end_time':'${end_time}','pageIndex':'${currentPage}','pageSize':'${pageSize}'}`

      axios.post('manage/findPerson', idata, { baseURL }).then(res => {
        console.info(res)
        this.table.loading = false
        this.table.data = res.data.datas
        this.table.total = res.data.count
      })
    },
    handleQueryClick() {
      this.getQueryData()
    },
    //颜色状态
    statusFormatter(item, col, value) {
      if (value == '0') {
        return '正常'
      } else if (value == '1') {
        return '老系统(弃用)'
      } else if (value == '0') {
        return '注销'
      } else {
        return value
      }
    },
    //性别状态
    sexFormatter(value) {
      if (value == '2') {
        return '女'
      } else if (value == '1') {
        return '男'
      } else {
        return value
      }
    },
    timeFormatter(value) {
      if (value != null) {
        return moment(value).format('YYYY-MM-DD')
      }
    }
  }
}
</script>

<style></style>
