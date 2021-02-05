<!--信息生成-->
<template>
	<div class="template-wrapper">
		<el-form class="query-bar" :inline="true" size="small">
			<el-form-item>
				<el-input v-model="themeName" placeholder="主题"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" >查询</el-button>
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
		<div class="tw-my-layout" style="height: calc(100% - 380px);">
			<div class="dataListPanel center" style="margin-bottom: 10px;">
				<div class="header"><i class="iconfont icon-sound"></i>&nbsp;报警描述</div>
				<div class="content">
					<div class="scrollbar-macosx">
						{{rowInfo.SJNR}}
					</div>
				</div>
			</div>
			<div class="dataListPanel center">
				<div class="header"><i class="iconfont icon-sound"></i>&nbsp;事件记录</div>
				<div class="content">
					<div class="scrollbar-macosx">
						{{rowInfo.SJJL}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';

	export default {
		name: "xxsc",
		data(){
			return{
				table: {
					data: []
				},
				themeName:'',
				rowInfo:[]
			}
		},
		mounted() {
			this.$nextTick(() =>{
				this.fingyjSjjr();
			})
		},
		methods:{
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
	@import "../../../assets/css/startReport";
</style>
