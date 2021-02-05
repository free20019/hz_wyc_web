<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-input v-model="query.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table class="tw-table" :data="table.data" border height="100%" stripe>
        <el-table-column prop="USERNAME" label="账号"></el-table-column>
        <el-table-column prop="XM" label="姓名"></el-table-column>
        <el-table-column prop="PHONE" label="手机号"></el-table-column>
        <el-table-column prop="CNQX" label="权限"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showDialog(scope.row)">添加</el-button>
            <el-button type="text" size="small" @click="handleTableClick(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialog.visible" :title="dialog.title" :before-close="handleClose">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            class="tw-tree"
            :data="data"
            :default-expanded-keys="['yydt', 'fzjc', 'fwzl', 'yjcz', 'yhgl']"
            node-key="id"
            show-checkbox
            ref="tree"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitQx">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'underscore'
import { secondMenu } from '../../assets/js/menu.comfig2'

export default {
  name: 'Power',
  data() {
    return {
      query: {
        name: ''
      },
      table: {
        data: []
      },
      dialog: {
        visible: false,
        title: ''
      },
      data: [],

      menuLists: JSON.parse(JSON.stringify(secondMenu)),
      username: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.queryTable()
      this.formatterTree(this.menuLists)
    })
  },
  methods: {
    handleClose() {
      this.dialog.visible = false
      this.$refs.tree.setCheckedKeys([])
    },
    submitQx() {
      let selectedQX = []
      let setQX = []
      let selectedCNQX = []
      setQX = this.$refs.tree.getCheckedKeys(true)
      selectedQX.push(...this.$refs.tree.getCheckedKeys(false))
      selectedQX.push(...this.$refs.tree.getHalfCheckedKeys())
      selectedCNQX = _.pluck(this.$refs.tree.getCheckedNodes(), 'label')
      const baseURL = this.baseURL
      const params = new URLSearchParams()
      params.append('qx', selectedQX)
      params.append('qxList', setQX)
      params.append('cnqx', selectedCNQX)
      params.append('username', this.username)
      if (this.dialog.title == '添加权限') {
        axios.post('user/addPower', params, { baseURL }).then(res => {
          this.dialog.visible = false
          if (res.data == '1') {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          } else {
            this.$message.error('添加失败')
          }
          this.queryTable()
        })
      }
      if (this.dialog.title == '修改权限') {
        axios.post('user/updatePower', params, { baseURL }).then(res => {
          this.dialog.visible = false
          if (res.data == '1') {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          } else {
            this.$message.error('添加失败')
          }
          this.queryTable()
        })
      }
    },
    formatterTree(menuLists) {
      // let totlalMenu = []
      _.each(menuLists, item => {
        item.label = item.title
        if (item.children) this.formatterChildrenTree(item.children)
      })
      this.data = menuLists
    },
    formatterChildrenTree(menuLists) {
      _.each(menuLists, list => {
        list.label = list.title
        if (list.children) {
          this.formatterChildrenTree(list.children)
        }
      })
    },
    queryTable() {
      const baseURL = this.baseURL
      axios
        .get('user/getUserList', {
          baseURL,
          params: {
            xm: this.query.name
          }
        })
        .then(res => {
          this.table.data = res.data || []
        })
    },
    handleQueryClick() {
      this.queryTable()
    },
    handleAddClick() {},
    handleTableClick(row) {
      this.dialog.title = '修改权限'
      this.dialog.visible = true
      this.username = row.USERNAME
      setTimeout(() => {
        this.$refs.tree.setCheckedKeys(row.QXLIST.split(','))
      }, 100)
    },
    showDialog(row) {
      this.dialog.title = '添加权限'
      this.dialog.visible = true
      this.username = row.USERNAME
    },
    handleTableDel(row) {}
  }
}
</script>

<style lang="scss" scoped>
.dialog-info {
  width: 80%;
  margin: auto;
  height: 600px;
  overflow-y: auto;
}
</style>
