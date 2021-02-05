<!--驾驶员信息-->
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
        <el-input v-model="query.jszh" placeholder="机动车驾驶证" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.jsyname" placeholder="驾驶员姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-table class="tw-table" :data="table.data" v-loading="table.loading" border height="calc(100% - 42px)" stripe>
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column
          align="center"
          prop="COMPANYNAME"
          label="平台名称"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" prop="ADDRESS" label="行政区划" width="100"></el-table-column>
        <el-table-column align="center" prop="DRIVERNAME" label="驾驶员姓名" width="100"></el-table-column>
        <el-table-column align="center" prop="DRIVERPHONE" label="驾驶员电话" width="120"></el-table-column>
        <el-table-column
          align="center"
          prop="DRIVERGENDER"
          :formatter="formattSex"
          label="驾驶员性别"
          width="100"
        ></el-table-column>
        <el-table-column align="center" prop="DRIVERNATIONALITY" label="国籍" width="120"></el-table-column>
        <el-table-column align="center" prop="DRIVERNATION" label="驾驶员民族" width="120"></el-table-column>
        <el-table-column align="center" prop="DRIVERMARITALSTATUS" label="驾驶员婚姻状况" width="120"></el-table-column>
        <el-table-column align="center" prop="DRIVERLANGUAGELEVEL" label="驾驶员外语能力" width="120"></el-table-column>
        <el-table-column align="center" prop="DRIVEREDUCATION" label="驾驶员学历" width="120"></el-table-column>
        <el-table-column align="center" prop="DRIVERCENSUS" label="户口登记机关名称" width="180"></el-table-column>
        <el-table-column align="center" prop="DRIVERADDRESS" label="户口住址或长住住址" width="250"></el-table-column>
        <el-table-column
          align="center"
          prop="DRIVERCONTACTADDRESS"
          label="驾驶员通信地址"
          width="240"
        ></el-table-column>
        <el-table-column align="center" prop="PHOTOID" label="驾驶员照片文件编号" width="240"></el-table-column>
        <el-table-column
          align="center"
          prop="LICENSEPHOTOID"
          label="机动车驾驶证扫描文件编号"
          width="200"
        ></el-table-column>
        <el-table-column align="center" prop="DRIVERTYPE" label="准驾车型" width="120"></el-table-column>
        <el-table-column
          align="center"
          prop="GETDRIVERLICENSEDATE"
          label="初次领取驾驶证日期"
          width="150"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="DRIVERLICENSEON"
          label="驾驶证有效期限起"
          width="150"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="DRIVERLICENSEOFF"
          label="驾驶证有效期限止"
          width="150"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="TAXIDRIVER"
          label="是否巡游出租车驾驶员"
          :formatter="isDriverFormatter"
          width="180"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="CERTIFICATENO"
          label="网络预约出租汽车驾驶员资格证号"
          width="240"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="NETWORKCARISSUEORGANIZATION"
          label="网络预约出租汽车驾驶员证发证机构"
          width="250"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="NETWORKCARISSUEDATE"
          label="资格证发证日期"
          width="150"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="GETNETWORKCARPROOFDATE"
          label="初次领取资格证日期"
          width="150"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="NETWORKCARPROOFON"
          label="资格证有效起始日期"
          width="150"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="NETWORKCARPROOFOFF"
          label="资格证有效截止日期"
          width="150"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column align="center" prop="REGISTERDATE" label="报备日期" width="150"></el-table-column>
        <el-table-column
          align="center"
          prop="FULLTIMEDRIVER"
          label="是否专职驾驶员"
          :formatter="isZZDriverFormatter"
          width="160"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="INDRIVERBLACKLIST"
          label="是否在驾驶员黑名单内"
          :formatter="isZZDriverFormatter"
          width="170"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="COMMERCIALTYPE"
          label="营运类型"
          :formatter="commercialTypeFormatter"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="CONTRACTCOMPANY"
          label="驾驶员合同（或协议）签署公司"
          width="230"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="CONTRACTON"
          label="合同（或协议）有效期起"
          width="180"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="CONTRACTOFF"
          label="合同（或协议）有效期止"
          width="180"
          :formatter="timeFormatter"
        ></el-table-column>
        <el-table-column align="center" prop="EMERGENCYCONTACT" label="紧急情况联系人" width="120"></el-table-column>
        <el-table-column
          align="center"
          prop="EMERGENCYCONTACTPHONE"
          label="紧急情况联系人电话"
          width="180"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="EMERGENCYCONTACTADDRESS"
          label="紧急情况联系人通讯地址"
          width="240"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="STATE"
          label="状态"
          width="120"
          :formatter="stateFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="FLAG"
          label="操作标识"
          width="120"
          :formatter="flagFormatter"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="UPDATETIME"
          label="更新时间"
          min-width="150"
          :formatter="timeFormatter"
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

export default {
  name: 'DriverInformation',
  data() {
    return {
      query: {
        jszh: '',
        jsyname: '',
        ptname: '0',
        state: '0'
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
      this.getDataList()
    })
  },
  computed: {
    ...mapGetters(['getAutoCompanyName'])
  },
  methods: {
    formattSex(row) {
      return row.DRIVERGENDER == '1' ? '男' : '女'
    },
    handleQueryClick() {
      this.table.currentPage = 1
      this.getDataList()
    },
    getDataList() {
      this.table.loading = true
      let idata = `postData={'ptname':'${this.query.ptname}','jszh':'${this.query.jszh}','jsyname':'${
        this.query.jsyname
      }','pageIndex':'${this.table.currentPage}','pageSize':'${this.table.pageSize}' }`
      axios
        .post('manage/findJsyjcxx', idata, {
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
    isDriverFormatter(item, col, value) {
      if (value == '0') {
        return '是'
      } else if (value == '1') {
        return '否'
      } else {
        return value
      }
    },
    commercialTypeFormatter(item, col, value) {
      if (value == '1') {
        return '网约车'
      } else if (value == '2') {
        return '巡游车'
      } else if (value == '3') {
        return '合乘车'
      } else {
        return value
      }
    },
    isZZDriverFormatter(item, col, value) {
      if (value == '0') {
        return '是'
      } else if (value == '1') {
        return '否'
      } else {
        return value
      }
    },
    stateFormatter(item, col, value) {
      if (value == '0') {
        return '有效'
      } else if (value == '1') {
        return '失效'
      } else {
        return value
      }
    },
    timeFormatter(item, col, value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getDataList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
