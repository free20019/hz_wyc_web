<!--企业月报-->
<template>
	<div class="tw-template-wrapper">
		<el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
			<el-form-item>
				<el-date-picker v-model="query.etime" type="month" value-format="yyyy-MM" placeholder="截止日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleQueryClick" :loading="table.loading">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleExcelClick">导出</el-button>
			</el-form-item>
		</el-form>
		<div class="tw-query-panel" ref="queryPanel">
			<el-table class="tw-table" :data="table.data" v-loading="table.loading" border size="mini" height="calc(100% - 310px)" ref="tableOne" :span-method="objectSpanMethod">
				<el-table-column prop="ABB_NAME" label="企业名称"></el-table-column>
				<el-table-column prop="sum" label="全月" sortable></el-table-column>
				<el-table-column v-for="item in table.timeRow" :key="item" :prop="item" :label="item"
				></el-table-column>
			</el-table>
			<div style="height: 310px; width: 100%" id="chart" ref="chartBox"></div>
		</div>
	</div>
</template>

<script>
	import {templateBodyHeight, listUnique} from '../../../assets/js/util';
	import echarts from "echarts";
	import axios from 'axios';
	import moment from 'moment';
	import _ from 'underscore';

	export default {
		name: "EnterpriseMonthlyReport",
		data() {
			return {
				query: {
					etime:new Date(),
				},
				table:{
					data:[],
					loading:false,
					timeRow:[]
				}
			}
		},
		mounted() {
			this.$nextTick(() =>{
				templateBodyHeight(this.$refs.queryPanel,[this.$refs.queryBar.$el]);
				setTimeout(() => {
					this.getEnterpriseMonthlyReport();
				}, 500);
				window.onresize = () => {
					this.leftEChart.resize();
				};
			});
		},
		methods:{
			handleExcelClick(){
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					const {etime} = this.query;
					window.open(`${this.baseURL}getIndustryOperationalAnalysisAction/getEnterpriseMonthlyReportExcel?time=${moment(etime).format('YYYY-MM')}`);
				}).catch(e => {
					// console.error("error" + e)
				});
			},
			handleQueryClick(){
				this.getEnterpriseMonthlyReport();
			},
			initEachart(data){
				let xInfo = [];
				let serInfo = [];
				xInfo = _.pluck(data , 'ABB_NAME');
				serInfo = _.pluck(data , 'SUM');
				this.leftEChart = echarts.init(document.getElementById("chart"));
				this.leftEChart.setOption({
					color: ['#3398DB'],
					tooltip : {
						trigger: 'axis',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							data : xInfo,
							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							type:'bar',
							barWidth: '60%',
							data:serInfo
						}
					]
				});
			},
			getEnterpriseMonthlyReport(){
				const {etime} = this.query;
				const params = new URLSearchParams();
				const baseURL = this.baseURL;
				if(!etime || etime == ''){
					this.$message({
						message: '请选择月份',
						type: 'warning'
					});
				}else{
					this.table.loading = true;
					let time = moment(etime).format('YYYY-MM')

					params.append('time',time);

					axios.post('getIndustryOperationalAnalysisAction/getEnterpriseMonthlyReport',params,{baseURL}).then(res =>{
						if(res.data.list.length>0){
							let keynames = Object.getOwnPropertyNames(res.data.list[0]);
							if(keynames.indexOf('ABB_NAME') > 0){
								keynames.splice(keynames.indexOf('ABB_NAME'),1);
							}
							if(keynames.indexOf('sum') > 0){
								keynames.splice(keynames.indexOf('sum'),1);
							}
							if(keynames.indexOf('rate') > 0){
								keynames.splice(keynames.indexOf('rate'),1);
							}
							this.table.timeRow = keynames.sort();
							this.table.data = res.data.list;
							setTimeout(() =>{
								this.table.loading = false;
							},500);
						}

						this.initEachart(res.data.echartsList);
					})
				}

			},
			//合并表格列
			objectSpanMethod({ row, column, rowIndex, columnIndex }) {
				if (columnIndex === 0) {
					if (rowIndex % 2 === 0) {
						return {
							rowspan: 2,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}
			}
		}
	}
</script>

<style scoped>

</style>
