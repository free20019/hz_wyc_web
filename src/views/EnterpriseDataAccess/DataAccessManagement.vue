<!--
 * @Descripttion: 企业数据接入 数据接入管理
 * @version: 
 * @Author: CFQ
 * @Date: 2020-03-26 15:43:31
 * @LastEditors: CFQ
 * @LastEditTime: 2020-06-03 11:42:37
 -->
<template>
  <div class="tw-template-wrapper">
    <div class="tw-content-top">
      <el-row class="tw-row">
        <el-col class="tw-col" :span="6"
          ><div class="tw-col-text">申请接入企业：{{ echartData.total }}家</div></el-col
        >
        <el-col class="tw-col" :span="6"
          ><div class="tw-col-text">完成接入企业：{{ echartData.end }}家</div></el-col
        >
        <el-col class="tw-col" :span="6">
          <div class="tw-col-text">接入中企业：{{ echartData.online }}家</div>
        </el-col>
        <el-col class="tw-col" :span="6">
          <div class="tw-echart" id="echart"></div>
        </el-col>
      </el-row>
    </div>
    <div class="tw-content-bottom">
      <el-form class="tw-query-bar" :inline="true" :model="query" size="small" ref="queryBar">
        <el-form-item label="企业名称">
          <el-input v-model="query.qymc" clearable placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="接入状态">
          <el-select class="tw-block" v-model="query.state" placeholder="接入状态">
            <el-option
              v-for="item in query.stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="handleDelClick">删除</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddClick">新增接入</el-button>
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
          stripe
          @selection-change="handleTableSelectionChange"
        >
          <!-- <el-table-column
            type="selection"
            align="center"
            width="50"
            :resizable="false"
          ></el-table-column> -->
          <el-table-column type="index" label="序号" width="60" align="center" :resizable="false"></el-table-column>
          <el-table-column label="企业编码" prop="COMPANY_ID" align="center" width="250"></el-table-column>
          <el-table-column label="企业名称" prop="COMPANY" align="center" width="250"></el-table-column>
          <el-table-column label="APP名称" prop="ABB_NAME" align="center" min-width="130"></el-table-column>
          <el-table-column label="拟在杭运营规模" prop="SCALE" align="center" width="200"></el-table-column>
          <el-table-column
            label="开始接入时间"
            prop="STIME"
            :formatter="formatterTableTime"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            label="完成接入时间"
            prop="ETIME"
            :formatter="formatterTableTime"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            label="接入状态"
            prop="STATUS"
            :formatter="formatterTableState"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column label="操作" align="center" min-width="150">
            <template slot-scope="scope">
              <el-button @click="handleTableClick(scope.row)" type="primary" plain size="small">编辑</el-button>
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
        <el-form-item label="企业编码">
          <el-input v-model="dialog.form.companyId" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="dialog.form.qymc" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="APP名称">
          <el-input v-model="dialog.form.appName" placeholder="APP名称"></el-input>
        </el-form-item>
        <el-form-item label="IP地址白名单">
          <el-input v-model="dialog.form.ip" placeholder="IP地址白名单"></el-input>
        </el-form-item>
        <el-form-item label="拟在杭运营规模">
          <el-input v-model="dialog.form.SCALE" placeholder="拟在杭运营规模"></el-input>
        </el-form-item>
        <el-form-item label="开始接入时间">
          <el-date-picker v-model="dialog.form.stime" type="date" placeholder="开始接入时间"> </el-date-picker>
        </el-form-item>
        <el-form-item label="完成接入时间">
          <el-date-picker v-model="dialog.form.etime" type="date" placeholder="完成接入时间"> </el-date-picker>
        </el-form-item>
        <el-form-item label="接入状态">
          <el-select class="tw-block" v-model="dialog.form.state" placeholder="接入状态">
            <el-option
              v-for="item in dialog.form.stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接入车辆规模">
          <el-input v-model="dialog.form.access_scale" placeholder="测试阶段接入车辆规模"></el-input>
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
import echarts from 'echarts'
import { templateHeight, filterTablePage } from '../../assets//js/util'
import axios from 'axios'
import _ from 'underscore'
import moment from 'moment'

export default {
  name: 'DataAccessManagement',
  data() {
    return {
      echart: null,
      query: {
        qymc: '',
        state: '0',
        stateOptions: [
          { label: '全部', value: '0' },
          { label: '接入中', value: '1' },
          { label: '接入完成', value: '2' }
        ]
      },
      echartData: {
        online: 0,
        end: 0,
        total: 0
      },
      table: {
        data: [],
        loading: false,
        pageSize: 30,
        total: 0,
        currentPage: 1,
        selectRow: {},
        selected: []
      },
      dialog: {
        title: '',
        display: false,
        form: {
          companyId: '',
          qymc: '',
          appName: '',
          ip: '',
          SCALE: '',
          stime: '',
          etime: '',
          state: '',
          stateOptions: [{ label: '接入中', value: '1' }, { label: '接入完成', value: '2' }],
          access_scale: ''
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
      this.getTableDataList()
      this.getEchartDataList()
      window.addEventListener('resize', () => {
        if (this.echart) this.echart.resize()
      })
    })
  },
  methods: {
    handleQueryClick() {
      this.getTableDataList()
    },
    handleTableSelectionChange(rows) {
      this.table.selected = rows
    },
    getEchartDataList() {
      const baseURL = this.baseURL
      axios
        .get('data/getChartInfo', {
          baseURL
        })
        .then(res => {
          this.echartData.end = res.data.end
          this.echartData.online = res.data.online
          this.echartData.total = res.data.online + res.data.end
          this.initEcharts()
        })
    },
    // 格式化表格接入状态
    formatterTableState(row, a, val) {
      return val == '1' ? '接入中' : val == '2' ? '接入完成' : ''
    },
    // 格式化表格时间
    formatterTableTime(row, a, val) {
      return moment(val).format('YYYY-MM-DD')
    },
    handleClose() {
      this.dialog.display = false
      this.dialog.form.companyId = ''
      this.dialog.form.qymc = ''
      this.dialog.form.appName = ''
      this.dialog.form.ip = ''
      this.dialog.form.SCALE = ''
      this.dialog.form.stime = ''
      this.dialog.form.etime = ''
      this.dialog.form.state = ''
      this.dialog.form.access_scale = ''
    },
    // 提交表单
    submitInfo() {
      const { companyId, qymc, appName, ip, SCALE, stime, etime, state, access_scale } = this.dialog.form
      if (!qymc) this.$message.error('请输入企业名称!')
      else if (!companyId) this.$message.error('请输入企业编码!')
      else if (!appName) this.$message.error('请输入APP名称!')
      else if (!SCALE) this.$message.error('请输入拟在杭运营规模!')
      else if (!stime) this.$message.error('请选择开始接入时间!')
      // else if (!etime) this.$message.error('请选择完成接入时间!')
      else if (!state) this.$message.error('请选择接入状态!')
      else if (!access_scale) this.$message.error('请输入接入车辆规模!')
      else {
        let params = new URLSearchParams()
        params.append('company', qymc)
        params.append('company_id', companyId)
        params.append('abb_name', appName)
        params.append('ip_addr', ip)
        params.append('scale', SCALE)
        params.append('stime', moment(stime).format('YYYY-MM-DD'))
        params.append('etime', moment(etime).format('YYYY-MM-DD'))
        params.append('status', state)
        params.append('access_scale', access_scale)
        if (this.dialog.title == '添加') {
          this.addForm(params)
        } else if (this.dialog.title == '修改') {
          this.editForm(params)
        }
      }
    },
    // 提交 添加表单
    addForm(params) {
      const baseURL = this.baseURL
      axios
        .post('data/addData', params, {
          baseURL
        })
        .then(res => {
          if (res.data.msg == '0') {
            this.$message.success('添加成功')
            this.getTableDataList()
            this.getEchartDataList()
            this.dialog.display = false
          } else this.$message.error('添加失败')
        })
    },
    // 提交 修改表单
    editForm(params) {
      const baseURL = this.baseURL
      params.append('id', this.table.selectRow.ID)
      axios
        .post('data/editData', params, {
          baseURL
        })
        .then(res => {
          if (res.data.msg == '0') {
            this.$message.success('修改成功')
            this.getTableDataList()
            this.getEchartDataList()
            this.dialog.display = false
          } else this.$message.error('修改失败')
        })
    },
    // 删除
    handleDelClick() {
      console.info(_.pluck(this.table.selected, 'ID'))
    },
    // 添加
    handleAddClick() {
      this.dialog.title = '添加'
      this.dialog.display = true
    },
    //分页
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
      this.getTableDataList()
    },
    getTableDataList() {
      this.table.loading = true
      const baseURL = this.baseURL
      const { qymc, state } = this.query
      axios
        .get('data/getDataList', {
          baseURL,
          params: {
            company: qymc,
            status: state
          }
        })
        .then(res => {
          this.table.data = res.data.datas
          this.table.total = res.data.datas.length
          this.table.loading = false
        })
    },
    handleTableClick(row) {
      this.table.selectRow = row
      this.dialog.display = true
      this.dialog.title = '修改'
      this.editShow()
    },
    // 编辑信息回显
    editShow() {
      const { COMPANY_ID, COMPANY, ABB_NAME, IP_ADDR, SCALE, STIME, ETIME, STATUS, ACCESS_SCALE } = this.table.selectRow
      this.dialog.form.qymc = COMPANY
      this.dialog.form.companyId = COMPANY_ID
      this.dialog.form.appName = ABB_NAME
      this.dialog.form.ip = IP_ADDR
      this.dialog.form.SCALE = SCALE
      this.dialog.form.stime = moment(STIME).format('YYYY-MM-DD')
      this.dialog.form.etime = moment(STIME).format('YYYY-MM-DD')
      this.dialog.form.state = STATUS
      this.dialog.form.access_scale = ACCESS_SCALE
    },
    initEcharts() {
      this.echart = echarts.init(document.getElementById('echart'))
      this.echart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['接入中', '接入完成']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{ value: this.echartData.online, name: '接入中' }, { value: this.echartData.end, name: '接入完成' }],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 220px;
.tw-content {
  &-top {
    height: $height;
    box-sizing: border-box;
  }
  &-bottom {
    height: calc(100% - #{$height});
    box-sizing: border-box;
  }
}
.tw-row {
  height: 100%;
  border-bottom: 1px solid #eeeeee;
}
.tw-col {
  height: 100%;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  line-height: $height;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  &-text {
  }
}
.tw-echart {
  height: 100%;
  width: 100%;
}
</style>
