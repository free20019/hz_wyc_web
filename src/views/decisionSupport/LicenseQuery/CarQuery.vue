<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :inline="true" :model="query" size="small" stripe ref="queryBar">
      <el-form-item>
        <el-input v-model="query.cphm" clearable placeholder="车牌号码" @focus="handleCarfocus"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.yszh" clearable placeholder="道路运输证号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select class="tw-block" v-model="query.color" placeholder="车辆颜色">
          <el-option
            v-for="item in query.colorList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="query.stime"
          type="daterange"
          range-separator="-"
          start-placeholder="有效期起"
          end-placeholder="有效期起"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="query.etime"
          type="daterange"
          range-separator="-"
          start-placeholder="有效期止"
          end-placeholder="有效期止"
        ></el-date-picker>
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
        border
        stripe
        height="calc(100% - 42px)"
      >
        <el-table-column align="center" type="index" label="序号" width="60" :resizable="false"></el-table-column>
        <el-table-column align="center" prop="DISTRICT" label="行政区划" width="130"></el-table-column>
        <el-table-column align="center" prop="AUTO_NUM" label="车牌号码" width="140"></el-table-column>
        <el-table-column
          align="center"
          prop="LICENSE_PLATE_COLOR"
          label="车牌颜色"
          width="140"
          :formatter="colorFormatter"
        ></el-table-column>
        <el-table-column align="center" prop="LICENSE_NUMBER" label="道路运输证号" width="200"></el-table-column>
        <el-table-column align="center" prop="AREA" label="经营范围" min-width="160"></el-table-column>
        <el-table-column align="center" prop="OWNER" label="业户名称" width="350"></el-table-column>
        <el-table-column
          align="center"
          prop="STATUS"
          label="经营状态"
          width="140"
          :formatter="statusFormatter"
        ></el-table-column>
        <el-table-column label="操作" width="80" :resizable="false" fixed="right" align="center">
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
        <el-form-item label="车牌号码">
          <el-input :value="selectRow.AUTO_NUM" readonly></el-input>
        </el-form-item>
        <el-form-item label="车牌颜色">
          <el-input :value="colorFormatter('', '', selectRow.LICENSE_PLATE_COLOR)" readonly></el-input>
        </el-form-item>
        <el-form-item label="车辆类型">
          <el-input readonly></el-input>
        </el-form-item>
        <el-form-item label="业户名称">
          <el-input :value="selectRow.OWNER" readonly></el-input>
        </el-form-item>
        <el-form-item label="经营许可证号">
          <el-input readonly></el-input>
        </el-form-item>
        <el-form-item label="经营许可证有效期止">
          <el-input readonly></el-input>
        </el-form-item>
        <el-form-item label="所在行政区划">
          <el-input :value="selectRow.DISTRICT" readonly></el-input>
        </el-form-item>
        <el-form-item label="业户经营范围">
          <el-input :value="selectRow.AREA" readonly></el-input>
        </el-form-item>
        <el-form-item label="核定载客">
          <el-input :value="selectRow.SEATS" readonly></el-input>
        </el-form-item>
        <el-form-item label="行驶证初次登记日期">
          <el-input :value="timeFormatter(selectRow.LICENSE_REGISTER_DATE)" readonly></el-input>
        </el-form-item>
        <el-form-item label="厂牌">
          <el-input :value="selectRow.FACTORY_PLATE" readonly></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input :value="selectRow.BRAND" readonly></el-input>
        </el-form-item>
        <el-form-item label="车身颜色">
          <el-input readonly></el-input>
        </el-form-item>
        <el-form-item label="车长(毫米)">
          <el-input :value="selectRow.BUS_LENGTH" readonly></el-input>
        </el-form-item>
        <el-form-item label="车宽(毫米)">
          <el-input :value="selectRow.BUS_WIDTH" readonly></el-input>
        </el-form-item>
        <el-form-item label="车高(毫米)">
          <el-input :value="selectRow.BUS_HEIGHT" readonly></el-input>
        </el-form-item>
        <el-form-item label="所属平台">
          <el-input readonly></el-input>
        </el-form-item>
        <el-form-item label="车辆经营范围">
          <el-input :value="selectRow.AREA" readonly></el-input>
        </el-form-item>
        <el-form-item label="燃料消耗">
          <el-input :value="selectRow.FUEL_USAGE" readonly></el-input>
        </el-form-item>
        <el-form-item label="计税价格">
          <el-input :value="selectRow.TAX_PRICE" readonly></el-input>
        </el-form-item>
        <el-form-item label="车主姓名">
          <el-input :value="selectRow.OWNER" readonly></el-input>
        </el-form-item>
        <el-form-item label="车主手机号">
          <el-input :value="selectRow.OWNER_TEL" readonly></el-input>
        </el-form-item>
        <el-form-item label="车主地址">
          <el-input readonly></el-input>
        </el-form-item>
        <el-form-item label="车主身份证号">
          <el-input readonly></el-input>
        </el-form-item>
      </el-form>
      <div class="tw-dialog-title" style="margin-top:10px">
        <div>道路运输证信息</div>
      </div>
      <el-form
        class="tw-form"
        label-position="right"
        :inline="true"
        size="small"
        label-width="150px"
        ref="platformBaseInfo"
      >
        <el-form-item label="道路运输证号">
          <el-input :value="selectRow.LICENSE_NUMBER" readonly></el-input>
        </el-form-item>
        <el-form-item label="道路运输证字号">
          <el-input :value="selectRow.LICENSE_KEY" readonly></el-input>
        </el-form-item>
        <el-form-item label="发证机关">
          <el-input :value="selectRow.ISSUING_AGENCY" readonly></el-input>
        </el-form-item>
        <el-form-item label="有效期起">
          <el-input :value="timeFormatter(selectRow.START_DATE)" readonly></el-input>
        </el-form-item>
        <el-form-item label="有效期止">
          <el-input :value="timeFormatter(selectRow.END_DATE)" readonly></el-input>
        </el-form-item>
        <el-form-item label="核发日期">
          <el-input :value="timeFormatter(selectRow.ISSUING_DATE)" readonly></el-input>
        </el-form-item>
        <el-form-item label="年审有效期止">
          <el-input :value="timeFormatter(selectRow.ANNUAL_END_DATE)" readonly></el-input>
        </el-form-item>
        <el-form-item label="初次发证时间">
          <el-input :value="timeFormatter(selectRow.FIRST_ISSUING_DATE)" readonly></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input :value="statusFormatter('', '', selectRow.STATUS)" readonly></el-input>
        </el-form-item>
      </el-form>
      <!--<div class="tw-dialog-title" style="margin-top:10px">-->
      <!--<div>卫星定位信息</div>-->
      <!--</div>-->
      <!--<el-form-->
      <!--class="tw-form"-->
      <!--label-position="right"-->
      <!--:inline="true"-->
      <!--size="small"-->
      <!--label-width="150px"-->
      <!--ref="platformBaseInfo"-->
      <!--&gt;-->
      <!--<el-form-item label="卫星定位平台">-->
      <!--<el-input :value="selectRow.GPS_NAME" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="平台服务商">-->
      <!--<el-input :value="selectRow.GPS_OPERATOR" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="设备型号">-->
      <!--<el-input :value="selectRow.GPS_TYPE" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="生产厂商">-->
      <!--<el-input :value="selectRow.GPS_MANUFACTURE" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="SIM卡号">-->
      <!--<el-input :value="selectRow.GPS_SIM_NUM" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="序列号">-->
      <!--<el-input :value="selectRow.GPS_SERIAL_NUM" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div class="tw-dialog-title" style="margin-top:10px">-->
      <!--<div>技术信息</div>-->
      <!--</div>-->
      <!--<el-form-->
      <!--class="tw-form"-->
      <!--label-position="right"-->
      <!--:inline="true"-->
      <!--size="small"-->
      <!--label-width="150px"-->
      <!--ref="platformBaseInfo"-->
      <!--&gt;-->
      <!--<el-form-item label="技术等级">-->
      <!--<el-input :value="selectRow.TECHNICAL_GRADE" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="技术等级评定有效期止">-->
      <!--<el-input :value="selectRow.TECHNICAL_TIME_END" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="发动机号">-->
      <!--<el-input :value="selectRow.ENGINE_NUM" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="二维操作日期">-->
      <!--<el-input  readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="二维周期">-->
      <!--<el-input  readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="二维有效期止">-->
      <!--<el-input  readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="车架号">-->
      <!--<el-input :value="selectRow.VEHICLE_FRAME_NO" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="燃料类型">-->
      <!--<el-input :value="selectRow.FUEL_TYPE" readonly></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="排放标准">-->
      <!--<el-input readonly></el-input>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
    </el-dialog>
  </div>
</template>

<script>
import { templateHeight, filterTablePage } from '../../../assets//js/util'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'CarQuery',
  data() {
    return {
      query: {
        cphm: '',
        yszh: '',
        color: '',
        colorList: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 2600,
            label: '蓝色'
          },
          {
            value: 2603,
            label: '渐变绿'
          }
        ],
        stime: [],
        etime: []
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
      this.getQueryData()
    },
    handleTableClick(row) {
      this.selectRow = row
      this.dialog.display = true
    },
    getQueryData() {
      this.table.loading = true
      const baseURL = this.baseURL
      const { cphm, yszh, color, stime, etime } = this.query
      const { pageSize, currentPage } = this.table
      let start_begin = ''
      let start_end = ''
      let end_begin = ''
      let end_end = ''
      if (stime.length > 0) {
        start_begin = moment(stime[0]).format('YYYY-MM-DD')
        start_end = moment(stime[1]).format('YYYY-MM-DD')
      }
      if (etime.length > 0) {
        end_begin = moment(etime[0]).format('YYYY-MM-DD')
        end_end = moment(etime[1]).format('YYYY-MM-DD')
      }
      let idata = `postData={'auto_num':'${cphm}','color':'${color}','start_begin':'${start_begin}','start_end':'${start_end}','end_begin':'${end_begin}','end_end':'${end_end}','pageIndex':'${currentPage}','pageSize':'${pageSize}'}`

      axios.post('manage/findPlatcar', idata, { baseURL }).then(res => {
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
    colorFormatter(item, col, value) {
      if (value == '2600') {
        return '蓝色'
      } else if (value == '2603') {
        return '渐变绿'
      } else {
        return value
      }
    },
    //颜色状态
    statusFormatter(item, col, value) {
      if (value == '10') {
        return '正常'
      } else if (value == '80') {
        return '注销'
      } else if (value == '35') {
        return '过户'
      } else {
        return value
      }
    },
    timeFormatter(value) {
      if (value != null) {
        return moment(value).format('YYYY-MM-DD')
      }
    },
    //车牌号码输入框聚焦事件
    handleCarfocus() {
      const { cphm } = this.query
      if (cphm === '') this.query.cphm = '浙A.'
    }
  }
}
</script>

<style></style>
