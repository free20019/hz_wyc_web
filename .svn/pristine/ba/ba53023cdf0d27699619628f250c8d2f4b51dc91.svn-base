<template>
	<div class="template-wrapper">
		<el-form class="query-bar" :inline="true" size="small">
			<el-form-item>
				<el-input v-model="themeName" placeholder="主题"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="showDialog('添加')">添加</el-button>
			</el-form-item>
		</el-form>
		<div class="dataListPanel center" style="height: 220px; margin-bottom: 10px;">
			<el-table size="small" height="100%" border :data="table.data">
				<el-table-column width="70" type="index" label="序号"></el-table-column>
				<el-table-column label="时间" :formatter="formatterTime"></el-table-column>
				<el-table-column prop="SJZT" label="主题"></el-table-column>
				<el-table-column prop="BJR" label="报警人"></el-table-column>
				<el-table-column prop="DJDH" label="报警人电话"></el-table-column>
				<el-table-column prop="JJR" label="接警人"></el-table-column>
				<el-table-column prop="SJJB" label="事件级别"></el-table-column>
				<el-table-column prop="SH" label="状态"></el-table-column>
				<el-table-column width="200" label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small">核实</el-button>
						<el-button type="text" size="small" @click="getDialog(scope.row)">修改</el-button>
						<el-button type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="tw-my-layout" style="height: calc(100% - 300px);">
			<div class="tw-my-layout-left">
				<div class="dataListPanel center">
					<div class="header"><i class="iconfont icon-sound"></i>&nbsp;报警内容</div>
					<div class="content">
						<div class="scrollbar-macosx">
						</div>
					</div>
				</div>
			</div>
			<div class="tw-my-layout-main">
				<div class="dataListPanel center" style="padding: 0;">
					<div id="amap" class="template-map"></div>
				</div>
			</div>
		</div>
		<el-dialog :visible.sync="dialog.visible" :title="dialog.title" :before-close="handleClose">
			<div class="tw-my-layout" style="height: 400px;">
				<div class="tw-my-layout-left">
					<div class="scrollbar-macosx" style="overflow-y: auto">
						<el-form size="small" label-width="100px">
							<el-form-item label="事件编号">
								<el-input v-model="dialog.form.eventId" placeholder="事件编号"></el-input>
							</el-form-item>
							<el-form-item label="事件主题">
								<el-input v-model="dialog.form.eventTitle" placeholder="事件主题"></el-input>
							</el-form-item>
							<el-form-item label="发生地址">
								<el-input :disabled="true"></el-input>
							</el-form-item>
							<el-form-item label="经纬度">
								<el-input :disabled="true"></el-input>
							</el-form-item>
							<el-form-item label="报警人">
								<el-input v-model="dialog.form.bjr" placeholder="报警人"></el-input>
							</el-form-item>
							<el-form-item label="报警电话">
								<el-input v-model="dialog.form.bjTel" placeholder="报警电话"></el-input>
							</el-form-item>
							<el-form-item label="接警人">
								<el-input v-model="dialog.form.jjr" placeholder="接警人"></el-input>
							</el-form-item>
							<el-form-item label="事件级别">
								<el-select v-model="dialog.form.eventRank" placeholder="请选择">
									<el-option v-for="item in dialog.form.eventRankOptions" :key="item.value" :label="item.value"
														 :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="接警方式">
								<el-select v-model="dialog.form.jjfs" placeholder="请选择">
									<el-option v-for="item in dialog.form.jjfsOptions" :key="item.value" :label="item.value"
														 :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="报警内容">
								<el-input type="textarea" v-model="dialog.form.bjnr" placeholder="报警内容"></el-input>
							</el-form-item>
							<el-form-item label="事件记录">
								<el-input type="textarea" v-model="dialog.form.sjjl" placeholder="事件记录"></el-input>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div class="tw-my-layout-main">
					<div class="dataListPanel center" style="padding: 0;">
						<div id="dialog-amap" class="template-map"></div>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
							<el-button @click="dialog.visible = false">取 消</el-button>
							<el-button type="primary" @click="submitDialog">确 定</el-button>
						</span>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';

	export default {
		name: "jr",
		data() {
			return {
				themeName: '',
				dialog: {
					title:'',
					visible: false,
					form: {
						eventId: '',
						eventTitle: '',
						bjr: '',
						bjTel: '',
						jjr: '',
						eventRank: '',
						eventRankOptions: [
							{value: '一级'},
							{value: '二级'},
							{value: '三级'}
						],
						jjfs: '',
						jjfsOptions: [
							{value: '电话报警'},
							{value: '短信报警'},
							{value: '110联动'},
							{value: '12328转入'},
							{value: '12345转入'},
							{value: '领导指定'},
							{value: '相关部门指定'},
							{value: '系统预警'}
						],
						bjnr: '',
						sjjl: ''
					}
				},
				table: {
					data: []
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.fingyjSjjr();
			});
		},
		methods: {
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
			showDialog(type) {
				this.dialog.title = type;
				this.dialog.visible = true;
			},
			getDialog(row){
				this.showDialog('修改');
				this.dialog.form.eventId = row.SJBH;
				this.dialog.form.eventTitle = row.SJZT;
				this.dialog.form.bjr = row.BJR;
				this.dialog.form.bjTel = row.DJDH;
				this.dialog.form.jjr = row.JJR;
				this.dialog.form.eventRank = row.SJJB;
				this.dialog.form.jjfs = row.BJFS;
				this.dialog.form.bjnr = row.SJNR;
				this.dialog.form.sjjl = row.SJJL;
			},
			submitDialog(){

			},
			handleClose(){
				this.dialog = {
					title:'',
					visible: false,
					form: {
						eventId: '',
						eventTitle: '',
						bjr: '',
						bjTel: '',
						jjr: '',
						eventRank: '',
						eventRankOptions: [
							{value: '一级'},
							{value: '二级'},
							{value: '三级'}
						],
						jjfs: '',
						jjfsOptions: [
							{value: '电话报警'},
							{value: '短信报警'},
							{value: '110联动'},
							{value: '12328转入'},
							{value: '12345转入'},
							{value: '领导指定'},
							{value: '相关部门指定'},
							{value: '系统预警'}
						],
						bjnr: '',
						sjjl: ''
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/access";

</style>
