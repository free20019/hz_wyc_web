<!--日报-->
<template>
	<div class="tw-template-wrapper">
		<el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
			<el-form-item>
				<el-date-picker
						v-model="query.etime"
						type="date"
						placeholder="截止日期">
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
			<el-table
					class="tw-table"
					:data="table.data"
					v-loading="table.loading"
					border
					size="mini"
					height="calc(100% - 310px)"
					max-height="480px"
					:span-method="objectSpanMethod"
					ref="tableOne"
			>
				<el-table-column prop="companyName" label="企业名称" ></el-table-column>
				<el-table-column prop="sumNumber" label="全天" ></el-table-column>
				<el-table-column
						v-for="index in 24"
						:key="index.value"
						:prop="'y'+(index - 1)"
						:label="index-1 + '时'"
						:resizable="false"
						header-align="center"
				></el-table-column>
			</el-table>
			<div style="height: 310px; width: 100%" id="chart" ref="chartBox"></div>
		<!--设置自适应窗口大小: :auto-resize="true" -->
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import echarts from "echarts";
	import axios from 'axios'
	import _ from 'underscore'
	import {formatTemplateHeight, templateHeight} from '../../../assets/js/util'

	export default {
		name: "OrderDataStatistics",
		data() {
			return {
				query: {
					etime:new Date(),
				},
				table:{
					data:[],
					loading:false,
				},
				dateTime:[],
				chart: {
					date:'',
					orderNum:''
				},
			}
		},
		computed: {
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
					window.open(`${this.baseURL}manage/findOrderWeekExcel?time=${moment(etime).format('YYYY-MM-DD')}`);
				}).catch(e => {
					console.error("error" + e)
				});
			},
			getDateList() {

				const {etime} = this.query;
				const baseURL = this.baseURL;
				const postData='postData='+ JSON.stringify({time:moment(etime).format('YYYY-MM-DD')});
				if(!etime || etime == ''){
					this.$message({
						message: '请选择时间',
						type: 'warning'
					});
				} else {
					this.table.loading = true;
					axios.post('manage/findOrderWeek', postData, {baseURL}).then(res => {
						try {
							this.table.data = res.data.datas;
							setTimeout(() => {
								this.table.loading = false;
							}, 500);
							let idata = res.data.datas;
							/*	for(let i=0; i<idata[0].length; i++){
									this.table.dateTime = _.pluck(idata[0],'y'+i);
								}*/
						} catch (e) {
						}
					});
				}
			},
			getEchartData() {
				this.table.loading = true;
				const baseURL = this.baseURL;
				const {etime} = this.query;
				const postData='postData='+ JSON.stringify({time:moment(etime).format('YYYY-MM-DD')});
				axios.post('manage/findOrderWeekEchart',postData,{baseURL}).then(res => {
					try{
						let data  = res.data.datas;
						this.chart.orderNum = _.pluck(data, 'sumorder');
						this.chart.date = _.pluck(data, 'date');
						this.table.loading = false;
						this.leftEChart = echarts.init(document.getElementById("chart"));
						this.leftEChart.setOption({
							tooltip: {   //鼠标放到图表上显示数据
								trigger: "axis"
							},
							grid:{
								right:'50',
								left:100,
								bottom:'10%'
							},
							//toolbox：工具栏
							color: ["#709dc7"],
							xAxis: {
								type: "category",
								boundaryGap: false,
								data: this.chart.date
							},
							yAxis: {
								type: "value",
							},
							series: [
								{
									name: "总数",
									type: "line",
									areaStyle:{},
									data: this.chart.orderNum
								}
							]
						})
					} catch (e) {
						console.log(e);
					}
				})
			},
			handleQueryClick() {
				this.getDateList();
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
		},
		mounted() {
			this.$nextTick(() => {
				// const elements = this.$refs['queryBar'].$el;
				// this.$refs['chartBox'].$el.style.height = formatTemplateHeight(this.$refs['tableOne'].$el);
				// templateHeight(this.$refs['queryPanel'], elements, () =>{
				// 	this.$refs['chartBox'].$el.style.height = formatTemplateHeight(this.$refs['tableOne'].$el);
				// });
				setTimeout(() => {
					this.getEchartData();
				}, 500);
				window.onresize = () => {
					this.leftEChart.resize();
				};
				this.handleQueryClick();
				//设置echart自适应窗口大小的改变
				/*window.onresize = () => {
					this.$refs.chartBox.resize();
				}*/
			});
		},
		destroyed() {
			// console.info('destroyed:')
		}
	}
</script>

<style lang="scss" scoped>

</style>
