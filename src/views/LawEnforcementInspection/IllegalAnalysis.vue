<!-- 违法分析 -->
<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
      <el-form-item>
        <el-date-picker v-model="query.stime" type="date" placeholder="开始日期"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="query.etime" type="date" placeholder="结束日期"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick()">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="echart-area">
      <div class="tw-echart" id="echart"></div>
      <div class="tw-rank">
        <div class="tw-title">各大队稽查排名</div>
        <div class="tw-content">
          <div class="list" v-for="(item, index) in rankData" :key="index">
            <span class="index">{{ index + 1 }}</span
            ><span class="title">{{ item.UNIT_NAME }}</span
            ><span class="num">{{ item['NVL(A.C,0)'] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="table-area">
      <el-table
        style="margin-bottom:10px"
        :data="filterTableList"
        :loading="table.loading"
        height="calc(100% - 42px)"
        border
      >
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="NAME" label="司机姓名"></el-table-column>
        <el-table-column align="center" prop="SFZH" label="身份证号" width="170"></el-table-column>
        <el-table-column align="center" prop="CPHM" label="车牌号码" width="100"></el-table-column>
        <el-table-column align="center" prop="COMPANY" label="企业名称" width="250"></el-table-column>
        <el-table-column align="center" prop="HYLB" label="行业类别" width="120"></el-table-column>
        <el-table-column align="center" prop="TITLE" label="案件标题" width="150"></el-table-column>
        <el-table-column align="center" prop="TITLE" label="案件标题" width="150"></el-table-column>
        <el-table-column align="center" prop="CONTENT" label="内容" width="150"></el-table-column>
        <el-table-column align="center" prop="PERSON" label="执法人员" width="150"></el-table-column>
        <el-table-column
          align="center"
          prop="ZF_TIME"
          label="执法时间"
          width="150"
          :formatter="formatterTableTime"
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
import echarts from 'echarts'
import { ajaxT } from '../../assets/js/api'
import { data as test } from '../../assets/js/test.json'
import moment from 'moment'
import _ from 'underscore'
import { filterTablePage } from '../../assets/js/util'
export default {
  name: 'IllegalAnalysis',
  data() {
    return {
      query: {
        stime: '2020-10-01',
        etime: new Date()
      },
      table: {
        data: [],
        loading: false,
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      echart: null,
      rankData: []
    }
  },
  computed: {
    filterTableList() {
      return filterTablePage(this.table)
    }
  },
  mounted() {
    this.queryInfo()
    window.onresize = () => {
      this.echart.resize()
    }
  },
  methods: {
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
    },
    // 格式化表格时间
    formatterTableTime(a, b, val) {
      return (val && moment(val).format('YYYY-MM-DD')) || ''
    },
    // 查询API
    queryInfo() {
      const { stime, etime } = this.query
      this.table.loading = true
      const params = new URLSearchParams()
      params.append('stime', (stime && moment(stime).format('YYYY-MM-DD')) || '')
      params.append('etime', (etime && moment(etime).format('YYYY-MM-DD')) || '')
      ajaxT.post('map/getWffx', params).then(res => {
        let data = res.data
        this.initEchart(data.chart)
        this.rankData = data.ranking
        this.table.total = data.table.length
        this.table.data = data.table
        this.table.loading = false
      })
      // let data = test[0]
      // this.initEchart(data.chart)
      // this.rankData = data.ranking
      // this.table.total = data.table.length
      // this.table.data = data.table
    },
    // 查询按钮
    handleQueryClick() {
      this.queryInfo()
      console.log(this.query.date)
    },
    // echart
    initEchart(data) {
      this.echart = echarts.init(document.getElementById('echart'))
      this.echart.setOption({
        color: ['#1892ff'],
        xAxis: {
          type: 'category',
          data: _.pluck(data, 'ZF_TIME')
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: _.pluck(data, 'C'),
            type: 'bar'
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-area {
  height: calc((100% - 54px) / 2);
  display: flex;
  .tw-echart {
    width: calc(100% - 300px);
    height: 100%;
  }
  .tw-rank {
    width: 300px;
    padding: 0 25px;
  }
}
.table-area {
  padding: 10px;
  box-sizing: border-box;
  height: calc((100% - 54px) / 2);
}
.tw-rank {
  .tw-title {
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
  }
  .tw-content {
    height: calc(100% - 40px);
    overflow-y: auto;
    .list {
      display: flex;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      padding: 8px 0 8px 8px;
      .index {
        width: 30px;
        border-radius: 15px;
        background-color: #f7f7f7;
      }
      .title {
        flex: 1;
      }
      .num {
        width: 50px;
      }
      &:nth-child(3) {
        .index {
          background: #31455a;
          color: #ffffff;
        }
      }
      &:nth-child(1) {
        .index {
          background: #31455a;
          color: #ffffff;
        }
      }
      &:nth-child(2) {
        .index {
          background: #31455a;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
