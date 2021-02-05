<!--综合信息查询->综合平台查询-->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-select v-model="query.ptname" clearable placeholder="平台名称">
          <el-option
            v-for="item in this.OnlyCompany"
            :key="item.ID"
            :label="item.TEXT"
            :value="item.ID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuerySearch">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel" ref="queryPanel">
      <el-card class="tw-card tw-card-full" :body-style="{padding: 0}" header="平台基本信息">
        <el-form
          class="tw-form"
          :label-position="labelPosition"
          :inline="true"
          size="small"
          label-width="150px"
          ref="platformBaseInfo"
        >
          <el-form-item label="平台名称">
            <el-input :value="ptjbxxForm.COMPANYNAME" readonly></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码">
            <el-input :value="ptjbxxForm.IDENTIFIER" readonly></el-input>
          </el-form-item>
          <el-form-item label="注册地行政区划">
            <el-input :value="ptjbxxForm.ADDRESS" readonly></el-input>
          </el-form-item>
          <el-form-item label="经营业户经济类型">
            <el-input :value="ptjbxxForm.ECONOMICTYPE" readonly></el-input>
          </el-form-item>
          <el-form-item label="注册资本">
            <el-input :value="ptjbxxForm.REGCAPITAL" readonly></el-input>
          </el-form-item>
          <el-form-item label="法人代表姓名">
            <el-input :value="ptjbxxForm.LEGALNAME" readonly></el-input>
          </el-form-item>
          <el-form-item label="法人代表身份证号">
            <el-input :value="ptjbxxForm.LEGALID" readonly></el-input>
          </el-form-item>
          <el-form-item label="法人代表电话">
            <el-input :value="ptjbxxForm.LEGALPHONE" readonly></el-input>
          </el-form-item>
          <el-form-item class="tw-block tw-size__150px" label="通信地址">
            <el-input :value="ptjbxxForm.CONTACTADDRESS" readonly></el-input>
          </el-form-item>
          <el-form-item class="tw-block tw-size__150px" label="经营范围">
            <el-input
              type="textarea"
              :value="ptjbxxForm.BUSINESSSCOPE"
              readonly
              :autosize="{ minRows: 8, maxRows: 15}"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-tabs class="tw-tabs" v-model="activeName" ref="tabPanel" @tab-click="tabHandleClick">
          <el-tab-pane
            v-for="bottomTablist in bottomTablists"
            :key="bottomTablist.name"
            :label="bottomTablist.label"
            :name="bottomTablist.name"
          >
            <el-table class="tw-table" :data="bottomTablist.data" border size="small" height="100%">
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column
                v-for="item in bottomTablist.column"
                :key="item.name"
                :prop="item.name"
                :label="item.title"
                :width="item.width"
                :formatter="item.formatter"
                :min-width="item['min-width']"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { templateHeight, formatTemplateHeight } from '../../../assets/js/util'

export default {
  name: 'IntegratedPlatformQuery',
  data() {
    return {
      query: {
        ptname: ''
      },
      OnlyCompany: [],
      ptjbxxForm: {},
      labelPosition: 'right',
      activeName: 'first',
      bottomTablists: [
        {
          name: 'first',
          label: '平台经营许可信息',
          data: [],
          column: [
            { name: 'COMPANYNAME', title: '平台名称', width: 100 },
            { name: 'ADDRESS', title: '行政区划', width: 100 },
            {
              name: 'CERTIFICATE',
              title: '网络预约出租汽车经营许可证号',
              width: 200
            },
            { name: 'OPERATIONAREA', title: '经营区域', width: 100 },
            // {name: 'COMPANYNAME', title: '公司名称', width: 180},
            { name: 'ORGANIZATION', title: '发证机构', width: 150 },
            { name: 'STARTDATE', title: '有效期起', width: 100 },
            { name: 'STOPDATE', title: '有效期止', width: 100 },
            { name: 'CERTIFYDATE', title: '核发日期', width: 100 },
            {
              name: 'FLAG',
              title: '证照状态',
              formatter: this.stateFormatter,
              width: 100
            },
            {
              name: 'STATE',
              title: '操作标识',
              formatter: this.flagFormatter,
              width: 100
            },
            {
              name: 'UPDATETIME',
              title: '更新时间',
              'min-width': 180,
              resizable: true
            }
          ]
        },
        {
          name: 'second',
          label: '平台营运规模信息',
          data: [],
          column: [
            { name: 'COMPANYNAME', title: '平台名称', width: 100 },
            { name: 'VEHICLENUM', title: '平台注册网约车辆数', width: 250 },
            { name: 'DRIVERNUM', title: '平台注册司机数', width: 250 },
            {
              name: 'FLAG',
              title: '操作标识',
              formatter: this.flagFormatter,
              width: 100
            },
            {
              name: 'UPDATETIME',
              title: '更新时间',
              'min-width': 180,
              resizable: true
            }
          ]
        },
        {
          name: 'third',
          label: '平台支付信息',
          data: [],
          column: [
            { name: 'COMPANYNAME', title: '平台名称', width: 150 },
            {
              name: 'PAYNAME',
              title: '银行或者非银行支付机构名称',
              width: 240
            },
            {
              name: 'PAYID',
              title: '非银行支付机构支付业务许可编号',
              width: 240
            },
            { name: 'PAYTYPE', title: '支付业务类型', width: 150 },
            { name: 'PAYSCOPE', title: '业务覆盖范围', width: 100 },
            { name: 'PREPAREBANK', title: '备付金存管银行', width: 150 },
            {
              name: 'STATE',
              title: '状态',
              formatter: this.stateFormatter,
              width: 100
            },
            {
              name: 'FLAG',
              title: '操作标识',
              formatter: this.flagFormatter,
              width: 100
            },
            {
              name: 'UPDATETIME',
              title: '更新时间',
              'min-width': 180,
              resizable: true
            }
          ]
        },
        {
          name: 'fourth',
          label: '平台服务机构',
          data: [],
          column: [
            { name: 'COMPANYNAME', title: '平台名称', width: 150 },
            { name: 'ADDRESS', title: '行政区划', width: 150 },
            { name: 'SERVICENAME', title: '服务机构名称', width: 150 },
            { name: 'SERVICENO', title: '服务机构代码', width: 150 },
            { name: 'CONTACTPHONE', title: '紧急联系电话', width: 150 },
            {
              name: 'RESPONSIBLENAME',
              title: '服务机构负责人姓名',
              width: 150
            },
            { name: 'RESPONSIBLEPHONE', title: '负责人联系方式', width: 150 },
            { name: 'MANAGERNAME', title: '服务机构管理人员姓名', width: 150 },
            { name: 'MAILADDRESS', title: '行政文书送达邮寄地址', width: 150 },
            { name: 'CREATEDATE', title: '服务机构设立日期', width: 150 },
            {
              name: 'STATE',
              title: '状态',
              formatter: this.stateFormatter,
              width: 150
            },
            {
              name: 'FLAG',
              title: '操作标识',
              formatter: this.flagFormatter,
              width: 150
            },
            {
              name: 'UPDATETIME',
              title: '更新时间',
              'min-width': 180,
              resizable: true
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements, () => {
        this.$refs['tabPanel'].$el.style.height = formatTemplateHeight(
          this.$refs['platformBaseInfo'].$el
        )
      })
      this.getCompany()
      setTimeout(() => {
        this.$refs['tabPanel'].$el.style.height = formatTemplateHeight(
          this.$refs['platformBaseInfo'].$el
        )
      }, 100)
    })
  },
  computed: {
    ...mapGetters(['getAutoCompanyName'])
  },
  methods: {
    getCompany() {
      axios
        .post('manage/findOnlyCompany', '', {
          baseURL: this.baseURL
        })
        .then(res => {
          let data = res.data
          this.OnlyCompany = _.filter(data, item => item.ID)
        })
    },
    //查询
    handleQuerySearch() {
      if (this.query.ptname == '0') {
        this.$message('请选择公司名称')
        return
      } else {
        this.getData()
      }
    },
    getData() {
      let idata = `postData={'ptname':'${this.query.ptname}'}`
      axios
        .post('manage/findPtxx', idata, {
          baseURL: this.baseURL
        })
        .then(res => {
          this.bottomTablists[0].data = res.data.jyxk
          this.bottomTablists[1].data = res.data.yyjm
          this.bottomTablists[2].data = res.data.ptzf
          this.bottomTablists[3].data = res.data.ptfwjg
          this.ptjbxxForm = {}
          if (res.data.ptxx[0]) {
            this.ptjbxxForm = res.data.ptxx[0]
          } else {
            this.$message('暂无数据')
          }
        })
    },
    //tab切换点击事件
    tabHandleClick() {},
    //操作标识
    flagFormatter(item, col, value) {
      if (value == '1') {
        return '新增'
      } else if (value == '2') {
        return '更新'
      } else {
        return '删除'
      }
    },
    //状态
    stateFormatter(item, col, value) {
      if (value == '0') {
        return '有效'
      } else if (value == '1') {
        return '失效'
      } else {
        return value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-query {
  &-bar {
    border-bottom: none;
  }

  &-panel {
    overflow: auto;
    padding-top: 0;
  }
}

.tw-form {
  overflow: auto;
  min-height: 200px;
  height: 400px;
  box-sizing: border-box;
}

.tw-tabs {
  min-height: 300px;
  height: calc(100% - 400px) !important;
}
</style>
