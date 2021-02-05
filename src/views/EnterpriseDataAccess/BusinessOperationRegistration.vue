<!--
 * @Descripttion: 企业运营登记
 * @version: 
 * @Author: CFQ
 * @Date: 2020-04-13 15:59:17
 * @LastEditors: CFQ
 * @LastEditTime: 2020-06-02 18:47:49
 -->

<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" :model="query" size="small" ref="queryBar">
      <el-form-item>
        <el-input placeholder="APP名称" clearable v-model="query.abb_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="企业全称" clearable v-model="query.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select class="tw-block" v-model="query.yyzt" placeholder="运营状态">
          <el-option
            v-for="item in query.yyztOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAddClick">添加企业</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table
        :data="filterTableList"
        class="tw-table"
        v-loading="table.loading"
        border
        size="small"
        height="calc(100% - 42px)"
      >
        <el-table-column type="index" label="序号" width="60" align="center" :resizable="false"></el-table-column>
        <el-table-column label="公司编码" prop="COMPANY_ID" align="center" width="250"></el-table-column>
        <el-table-column label="APP名称" prop="ABB_NAME" align="center" width="250"></el-table-column>
        <el-table-column label="企业全称" prop="NAME" align="center" min-width="300"></el-table-column>
        <el-table-column
          label="运营状态"
          :formatter="formatterTableState"
          prop="OPERATING"
          align="center"
          width="250"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          :formatter="formatterTableTime"
          prop="DBTIME"
          align="center"
          width="250"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="handleTableEdit(scope.row)" type="primary" plain size="small">修改</el-button>
            <el-button @click="handleTableDel(scope.row.ID)" type="primary" plain size="small">删除</el-button>
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
      custom-class="tw-dialog"
      @close="handleClose"
      width="600px"
    >
      <el-form label-width="110px">
        <el-form-item label="公司编码">
          <el-input v-model="dialog.form.gsbm" placeholder="公司编码"></el-input>
        </el-form-item>
        <el-form-item label="APP名称">
          <el-input v-model="dialog.form.appName" placeholder="APP名称"></el-input>
        </el-form-item>
        <el-form-item label="企业全称">
          <el-input v-model="dialog.form.qyqc" placeholder="企业全称"></el-input>
        </el-form-item>
        <el-form-item label="运营状态">
          <el-select class="tw-block" v-model="dialog.form.yyzt" placeholder="运营状态">
            <el-option
              v-for="item in dialog.form.yyztOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { templateHeight, filterTablePage } from '../../assets/js/util'

export default {
  name: 'BusinessOperationRegistration',
  data() {
    return {
      query: {
        abb_name: '',
        name: '',
        yyzt: '2',
        yyztOptions: [{ value: '2', label: '全部' }, { value: '0', label: '在营运' }, { value: '1', label: '未营运' }]
      },
      table: {
        data: [],
        loading: false,
        pageSize: 20,
        currentPage: 1,
        total: 0,
        selectRow: {}
      },
      dialog: {
        title: '',
        display: false,
        form: {
          gsbm: '',
          appName: '',
          qyqc: '',
          yyzt: '',
          yyztOptions: [{ value: '0', label: '在营运' }, { value: '1', label: '未营运' }]
        }
      }
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
      this.getDataList()
    })
  },
  methods: {
    handleTableEdit(row) {
      this.table.selectRow = row
      this.dialog.display = true
      this.dialog.title = '修改'
      this.editShow()
    },
    // 编辑信息回显
    editShow() {
      const { ABB_NAME, NAME, OPERATING, COMPANY_ID } = this.table.selectRow
      this.dialog.form.yyzt = OPERATING
      this.dialog.form.gsbm = COMPANY_ID
      this.dialog.form.appName = ABB_NAME
      this.dialog.form.qyqc = NAME
    },
    handleTableDel(id) {
      const baseURL = this.baseURL
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        cancelButtonClass: 'el-button--danger',
        closeOnClickModal: false,
        type: 'info',
        center: true
      }).then(() => {
        axios
          .get('data/delBikeCompany', {
            baseURL,
            params: {
              id
            }
          })
          .then(res => {
            if (res.data.msg == '0') {
              this.$message.success('删除成功')
              this.getDataList()
            } else {
              this.$message.success('删除失败')
            }
          })
      })
    },
    formatterTableState(row, a, val) {
      return val == '0' ? '营运中' : val == '1' ? '未营运' : ''
    },
    formatterTableTime(row, a, val) {
      return val ? moment(val).format('YYYY-MM-DD') : ''
    },
    submitInfo() {
      const { gsbm, appName, qyqc, yyzt } = this.dialog.form
      const baseURL = this.baseURL
      if (!gsbm) this.$message.warning('请输入公司编码')
      else if (!appName) this.$message.warning('请输入APP名称')
      else if (!qyqc) this.$message.warning('请输入企业全称')
      else if (!yyzt) this.$message.warning('请选择运营状态')
      else {
        if (this.dialog.title == '添加') {
          axios
            .get('data/addBikeCompany', {
              baseURL,
              params: {
                id: gsbm,
                abb_name: appName,
                name: qyqc,
                operating: yyzt
              }
            })
            .then(res => {
              if (res.data.msg == '0') {
                this.$message.success('添加成功')
                this.dialog.display = false
                this.getDataList()
              } else {
                this.$message.success('添加失败')
              }
            })
        } else if (this.dialog.title == '修改') {
          axios
            .get('data/updateBikeCompany', {
              baseURL,
              params: {
                id: gsbm,
                abb_name: appName,
                name: qyqc,
                operating: yyzt,
                jlid: this.table.selectRow.ID
              }
            })
            .then(res => {
              if (res.data.msg == '0') {
                this.$message.success('修改成功')
                this.dialog.display = false
                this.getDataList()
              } else {
                this.$message.success('修改失败')
              }
            })
        }
      }
    },
    handleAddClick() {
      this.dialog.title = '添加'
      this.dialog.display = true
    },
    handleClose() {
      this.dialog.title = ''
      this.dialog.form.gsbm = ''
      this.dialog.form.appName = ''
      this.dialog.form.qyqc = ''
      this.dialog.form.yyzt = ''
      this.dialog.display = false
    },
    getDataList() {
      this.table.loading = true
      const baseURL = this.baseURL
      const { abb_name, name, yyzt } = this.query
      axios
        .get('data/getBikeCompany', {
          baseURL,
          params: {
            operating: yyzt,
            abb_name,
            name
          }
        })
        .then(res => {
          this.table.data = res.data.datas
          this.table.total = res.data.datas.length
          setTimeout(() => {
            this.table.loading = false
          }, 300)
        })
    },
    handleQueryClick() {
      this.getDataList()
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
    }
  }
}
</script>

<style></style>
