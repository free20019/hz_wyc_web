<template>
	<div class="template-wrapper">
		<el-form class="query-bar" :inline="true" size="small">
			<el-form-item>
				<el-input v-model="themeName" placeholder="主题"></el-input>
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
							{{bjContent}}
						</div>
					</div>
				</div>
			</div>
			<div class="tw-my-layout-main">
				<div class="dataListPanel center" style="padding: 0;">
					<div id="ztree" class="ztree">
						<el-tree ref="tree" :data="data2" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[3]" :props="defaultProps"  style="margin-left:90px;">
						</el-tree>
					</div>
					<div class="ztree-bar">
						<label class="checkbox-inline">
							<input type="checkbox" v-model="sendType" value="短信" id="message">&nbsp;短信
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" v-model="sendType" value="邮件" id="email">&nbsp;邮件
						</label>&nbsp;&nbsp;&nbsp;&nbsp;
						<el-button type="primary" size="small">发送</el-button>
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
		name: "qdbs",
		data(){
			return{
				data2: [{
					id: 1,
					label: '运管局',
					children: [{
						id: 2,
						label: '指挥中心',
						children: [{
							id: 3,
							label: '金俊'
						}]

					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				sendType: [],
				table: {
					data: []
				},
				themeName:'',
				bjContent:''
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
			handleRow(row, column, event){
				this.bjContent = row.SJJL;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/access";
.ztree{
	height: 85%;
	border-bottom: 1px solid #cccccc;
	padding: 20px;
}
	.ztree-bar{
		width: 100%;
		margin-top: 10px;
		text-align: center;
	}
</style>
