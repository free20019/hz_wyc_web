<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-input v-model="query.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAddClick">添加</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table class="tw-table" stripe :data="table.data" border height="100%">
        <el-table-column prop="USERNAME" label="账号"></el-table-column>
        <!--				<el-table-column prop="PASSWORD" label="密码"></el-table-column>-->
        <el-table-column prop="XM" label="姓名"></el-table-column>
        <el-table-column prop="PHONE" label="所属部门"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleTableClick(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="handleTableDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      class="tw-load-dialog"
      :visible.sync="dialog.visible"
      :title="dialog.title"
      :before-close="handleClose"
      width="600px"
      custom-class="tw-dialog"
      :close-on-click-modal="false"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" :show-password="true" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button :disabled="loadFlag" type="primary" @click="submitForm">
          <i v-show="loadFlag" class="el-icon-loading"></i>
          确 定</el-button
        >
        <!--				<el-button :disabled="true" type="primary" @click="submitForm">-->
        <!--					<i class="el-icon-loading"></i>-->
        <!--					确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'User',
  data() {
    var checkUser = (rule, value, callback) => {
      const baseURL = this.baseURL
      const params = new URLSearchParams()
      params.append('username', this.ruleForm.username)
      if (!value) {
        callback(new Error('请输入用户名'))
      } else if (!!this.editUserName && this.editUserName == this.ruleForm.username) {
        callback()
      } else {
        axios.post('user/checkUsername', params, { baseURL }).then(res => {
          if (res.data == '1') {
            callback(new Error('用户名已存在'))
          } else {
            callback()
          }
        })
      }
    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.length < 8 || value.length > 18) {
        callback(new Error('密码长度8-18位'))
      } else {
        callback()
      }
    }
    var validatePassEasy = (rule, value, callback) => {
      var isDigit = /^.*[0-9]+.*/
      var isLowerCase = /^.*[a-z]+.*/
      var isUpperCase = /^.*[A-Z]+.*/
      var regEx = /^.*[^a-zA-Z0-9]+.*/
      var num = 0
      if (isDigit.test(value)) {
        num = num + 1
      }
      if (isLowerCase.test(value)) {
        num = num + 1
      }
      if (num < 2) {
        return callback(new Error('密码复杂度过低。(必须包含英文和数字)'))
      } else {
        callback()
      }
    }

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
      ruleForm: {
        username: '',
        password: '',
        name: '',
        phone: ''
      },
      rules: {
        username: [{ validator: checkUser, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }, { validator: validatePassEasy, trigger: 'blur' }],
        phone: []
      },
      selectRow: {},
      loadFlag: false,
      editUserName: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.queryTable()
    })
  },
  methods: {
    handleTableDel(row) {
      const { USERNAME } = row
      const baseURL = this.baseURL
      const params = new URLSearchParams()
      params.append('username', USERNAME)
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        cancelButtonClass: 'el-button--danger',
        closeOnClickModal: false,
        type: 'info',
        center: true
      }).then(() => {
        axios.post('user/deleteUser', params, { baseURL }).then(res => {
          this.queryTable()
        })
      })
    },
    handleTableClick(row) {
      this.selectRow = row
      const { USERNAME, PASSWORD, PHONE, XM } = row
      this.ruleForm.username = USERNAME
      this.ruleForm.password = PASSWORD
      this.ruleForm.name = XM
      this.ruleForm.phone = PHONE
      this.dialog.visible = true
      this.dialog.title = '修改'
      this.editUserName = USERNAME
    },
    handleQueryClick() {
      this.queryTable()
    },
    handleAddClick() {
      this.dialog.visible = true
      this.dialog.title = '添加'
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
    handleClose() {
      this.ruleForm = {
        username: '',
        password: '',
        name: '',
        phone: ''
      }
      this.$refs.ruleForm.clearValidate()
      this.dialog.visible = false
    },
    submitForm() {
      const baseURL = this.baseURL
      const { username, password, name, phone } = this.ruleForm
      const params = new URLSearchParams()
      params.append('username', username)
      params.append('password', password)
      params.append('name', name)
      params.append('phone', phone)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loadFlag = true
          if (this.dialog.title == '添加') {
            axios.post('user/addUser', params, { baseURL }).then(res => {
              this.handleClose()
              this.queryTable()
              this.loadFlag = false
            })
          }
          if (this.dialog.title == '修改') {
            params.append('id', this.selectRow.ID)
            axios.post('user/updateUser', params, { baseURL }).then(res => {
              this.handleClose()
              this.queryTable()
              this.loadFlag = false
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
