<template>
  <div class="tw-template-wrapper">
    <el-form class="tw-query-bar" :model="query" :inline="true" size="small">
      <el-form-item>
        <el-date-picker v-model="query.time" type="date" placeholder="日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel">
      <el-table class="tw-table" :data="table.data" :load="table.loading" height="300px" border size="small" style="width: 100%;">
        <el-table-column prop="date" label="时间" width="140"></el-table-column>
        <el-table-column v-for="item in 24" :key="(item-1)" :prop="'y'+(item-1)" :label="(item-1)+':00'" width="100"></el-table-column>
      </el-table>
<!--      <v-chart class="tw-chart-panel" :options="chartOptions" ref="chartBox"></v-chart>-->
    </div>
  </div>
</template>

<script>
  // import ECharts from 'vue-echarts'

  export default {
    name: "OnlineRateStatistics",
    data() {
      return {
        query: {
          time: ''
        },
        table: {
          loading: false,
          data: []
        }
      };
    },
    mounted() {},
    computed: {
      chartResize() {
        return this.$store.state.secondary;
      },
      chartOptions() {
        return {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        }
      }
    },
    methods: {
      handleQueryClick() {
      }
    },
    watch: {
      chartResize() {
        setInterval(()=>{
          this.$refs.chartBox.resize();
        }, 300)
      }
    },
    components: {
      'v-chart': ECharts
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/variable";

  $tableHeight: 300px;

  .tw-table {
    margin-bottom: $margin;
  }

  .tw-chart {
    &-panel {
      width: 100%;
      height: calc(100% - #{$tableHeight + 2 * $margin});
    }
  }
</style>

