<!--查询与统计-->
<template>
	<div class="template-wrapper">
		<el-form class="query-bar" :inline="true" size="small">
			<el-form-item>
				<el-input  v-model="themeName" placeholder="主题"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="dataListPanel center" style="height: 220px; margin-bottom: 10px;">
			<el-table size="small" height="100%" border :data="table.data" @row-click="handleRow">
				<el-table-column width="70" type="index" label="序号"></el-table-column>
				<el-table-column label="时间" :formatter="formatterTime"></el-table-column>
				<el-table-column prop="SJZT" label="主题"></el-table-column>
				<el-table-column prop="BJR" label="报警人"></el-table-column>
				<el-table-column prop="DJDH" label="报警人电话"></el-table-column>
				<el-table-column prop="JJR" label="接警人"></el-table-column>
				<el-table-column prop="SJJB" label="事件级别"></el-table-column>
				<el-table-column prop="SH" label="状态"></el-table-column>
			</el-table>
		</div>
		<div class="tw-my-layout" style="height: calc(100% - 300px);">
			<div class="tw-my-layout-left">
				<div class="dataListPanel center">
					<div class="header"><i class="iconfont icon-sound"></i>&nbsp;报警内容</div>
					<div class="content">
						<div class="scrollbar-macosx">
							{{rowInfo.SJJL}}
						</div>
					</div>
				</div>
			</div>
			<div class="tw-my-layout-main">
				<div class="dataListPanel center" style="padding: 0;">
					<div class="scrollbar-macosx">
						<div style="height: 100%; width: 100%" id="chart" ref="chartBox"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	import moment from 'moment';
	import axios from 'axios';

	export default {
		name: "cxytj",
		data(){
			return{
				table: {
					data: []
				},
				themeName:'',
				rowInfo:[]
			}
		},
		mounted(){
			this.$nextTick(() =>{
				setTimeout(() => {
					// this.initEachart();
					this.fingyjSjjr();
				}, 500);
				window.onresize = () => {
					this.leftEChart.resize();
				};
			})
		},
		methods:{
			initEachart(){
				this.leftEChart = echarts.init(document.getElementById("chart"));
				this.leftEChart.setOption({
					title : {
						text: '出租车进京上访图',
						subtext: '数据来自指挥中心',
						x:'center'
					},
					tooltip : {
						trigger: 'item'
					},
					legend: {
						x:'left',
						data:['车辆']
					},
					dataRange: {
						min : 0,
						max : 80,
						calculable : true,
						color: ['maroon','purple','red','orange','yellow','lightgreen']
					},
					toolbox: {
						show : true,
						orient : 'vertical',
						x: 'right',
						y: 'center',
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					series : [
						{
							name: '车辆',
							type: 'map',
							mapType: 'china',
							hoverable: false,
							roam:true,
							data : [],
							markPoint : {
								symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
								itemStyle: {
									normal: {
										borderColor: '#87cefa',
										borderWidth: 1,            // 标注边线线宽，单位px，默认为1
										label: {
											show: false
										}
									},
									emphasis: {
										borderColor: '#1e90ff',
										borderWidth: 5,
										label: {
											show: false
										}
									}
								},
								data : [
									{name: "杭州南庄兜", value: 11},
									{name: "湖州青山服务区", value: 28},
									{name: "湖州太湖服务区", value: 20},
									{name: "常州天目湖服务区", value: 44},
									{name: "镇江荣炳服务区", value: 43},
									{name: "高邮龙奔服务区", value: 40},
									{name: "淮阴川星服务区", value: 40},
									{name: "新沂服务区", value: 35},
									{name: "临沂服务区", value: 32},
									{name: "廊坊服务区",value:12}
								]
							},
							geoCoord: {
								"杭州南庄兜":[120.1152278535,30.3829857165],
								"湖州青山服务区":[120.0526253716,30.6649965868],
								"湖州太湖服务区":[119.9417111999,31.1217188297],
								"常州天目湖服务区":[119.5140046095,31.3837233116],
								"镇江荣炳服务区":[119.3991322843,31.8429947734],
								"高邮龙奔服务区":[119.5118645572,32.7632090013],
								"淮阴川星服务区":[119.0451073403,33.7973424061],
								"新沂服务区":[118.5403185814,34.3278117247],
								"临沂服务区":[118.2521006965,35.1690596547],
								"廊坊服务区":[116.4807165354,39.4761904072]
							}
						}

					]
				});
			},
			fingyjSjjr() {
				const params = new URLSearchParams();
				const baseURL = this.baseURL;
				params.append('sjzt', this.themeName);
				axios.post('Yjzh/fingyjsjjr', params, {baseURL}).then(res => {
					this.table.data = res.data;
				});
			},
			formatterTime(row) {
				return moment(row.TIME).format('YYYY-MM-DD');
			},
			handleRow(row){
				this.rowInfo = row;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/access";
</style>
