<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" :model="query" size="small" ref="queryBar">
      <el-form-item>
        <el-input v-model="query.name" clearable placeholder="业户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.idcard" clearable placeholder="经营许可证号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select class="tw-block" v-model="query.status" placeholder="经营状态">
          <el-option
            v-for="item in query.statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick" :loading="table.loading">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table
        :data="filterTableList"
        class="tw-table"
        v-loading="table.loading"
        stripe
        border
        height="calc(100% - 42px)"
      >
        <el-table-column align="center" type="index" label="序号" width="60" :resizable="false"></el-table-column>
        <el-table-column align="center" label="行政区划" prop="CITY" width="140"></el-table-column>
        <el-table-column align="center" label="业户名称" prop="NAME" width="400"></el-table-column>
        <el-table-column align="center" label="经营许可证号" prop="LICENSE_NUM" width="230"></el-table-column>
        <el-table-column align="center" label="经营范围" prop="AREA" min-width="140"></el-table-column>
        <el-table-column
          align="center"
          label="经营状态"
          prop="STATUS"
          width="230"
          :formatter="statusFormatter"
        ></el-table-column>
        <el-table-column align="center" label="操作" prop="CHECKSTATE" width="80" :resizable="false">
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
      width="1150px"
    >
      <div class="tw-dialog-title">
        <div>基本信息</div>
      </div>
      <el-form
        class="tw-form"
        label-position="right"
        :inline="true"
        size="small"
        label-width="150px"
        ref="platformBaseInfo"
      >
        <el-form-item label="业户名称">
          <el-input :value="selectRow.NAME" readonly></el-input>
        </el-form-item>
        <el-form-item label="所在行政区划">
          <el-input :value="selectRow.DISTRICT" readonly></el-input>
        </el-form-item>
        <el-form-item label="经营状态">
          <el-input :value="statusFormatter('', '', selectRow.STATUS)" readonly></el-input>
        </el-form-item>
        <el-form-item label="经营许可证字">
          <el-input :value="selectRow.LICENSE_KEY" readonly></el-input>
        </el-form-item>
        <el-form-item label="经营许可证号">
          <el-input :value="selectRow.LICENSE_NUM" readonly></el-input>
        </el-form-item>
        <el-form-item label="注册地址">
          <el-input :value="selectRow.ADDRESS" readonly></el-input>
        </el-form-item>
        <el-form-item label="经济类型">
          <el-input :value="selectRow.ECON_TYPE" readonly></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input :value="selectRow.AGENT_TEL" readonly></el-input>
        </el-form-item>
        <el-form-item label="办公地址">
          <el-input :value="selectRow.BUSI_ADDRESS" readonly></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input :value="selectRow.REPRES_NAME" readonly></el-input>
        </el-form-item>
        <el-form-item label="法定代表人身份证">
          <el-input :value="selectRow.REPRES_ID" readonly></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input :value="selectRow.AGENT_NAME" readonly></el-input>
        </el-form-item>
        <el-form-item label="负责人手机">
          <el-input :value="selectRow.AGENT_TEL" readonly></el-input>
        </el-form-item>
        <el-form-item label="经办人">
          <el-input :value="selectRow.MANAGER" readonly></el-input>
        </el-form-item>
        <el-form-item label="经办人手机">
          <el-input :value="selectRow.MANAGER_MOBILE" readonly></el-input>
        </el-form-item>
        <el-form-item label="发证机关">
          <el-input :value="selectRow.ORGAN_CODE" readonly></el-input>
        </el-form-item>
        <el-form-item label="初次领证日期">
          <el-input :value="selectRow.FIRST_PRINT_DATE" readonly></el-input>
        </el-form-item>
        <el-form-item label="核发日期">
          <el-input :value="selectRow.PRINT_DATE" readonly></el-input>
        </el-form-item>
        <el-form-item label="经营范围">
          <el-input :value="selectRow.AREA" readonly></el-input>
        </el-form-item>
        <el-form-item label="有效期起">
          <el-input :value="selectRow.VALID_DATE_BEGIN" readonly></el-input>
        </el-form-item>
        <el-form-item label="有效期止">
          <el-input :value="selectRow.VALID_DATE_END" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input :value="selectRow.CRT_DATE" readonly></el-input>
        </el-form-item>
        <el-form-item label="拥有出租车辆数">
          <el-input readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { templateHeight, filterTablePage } from '../../../assets//js/util'
import axios from 'axios'
export default {
  name: 'CompanyQuery',
  data() {
    return {
      query: {
        name: '',
        idcard: '',
        status: 0,
        statusList: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '正常'
          },
          {
            value: 3,
            label: '暂停'
          },
          {
            value: 6,
            label: '注销'
          }
        ]
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
  computed: {
    filterTableList() {
      return filterTablePage(this.table)
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
    },
    handleTableClick(row) {
      this.selectRow = row
      this.dialog.display = true
    },
    getQueryData() {
      this.table.loading = true
      const baseURL = this.baseURL
      const { name, idcard, status } = this.query
      let idata = `postData={'name':'${name}','license_num':'${idcard}','status':'${status}'}`
      axios.post('manage/findPlatforms', idata, { baseURL }).then(res => {
        this.table.loading = false
        this.table.data = res.data.datas
        this.table.total = res.data.datas.length
      })
    },
    handleQueryClick() {
      this.getQueryData()
    },
    //状态
    statusFormatter(item, col, value) {
      if (value == '1') {
        return '正常'
      } else if (value == '3') {
        return '暂停'
      } else if (value == '6') {
        return '注销'
      } else {
        return value
      }
    }
  }
}
</script>

<style></style>
