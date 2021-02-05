<!--平台信息-->
<template>
	<div class="tw-template-wrapper">
		<el-form class="tw-query-bar" :model="query" :inline="true" size="small" ref="queryBar">
			<el-form-item>
				<el-select v-model="query.ptname" clearable placeholder="平台名称">
					<el-option v-for="item in companyList" :label="item.ABB_NAME" :value="item.COMPANYID"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-date-picker type="date" v-model="query.stime" placeholder="开始时间"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-date-picker type="date" v-model="query.etime" placeholder="结束时间"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-input v-model="query.cphm" placeholder="车牌号码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="query.name" placeholder="驾驶员姓名/身份证号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleQueryClick">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="tw-query-panel" ref="queryPanel">
			<el-table
					class="tw-table tw-moreinfo-table"
					:data="table.data"
					v-loading="table.loading"
					border
					size="small"
					height="100%"
			>
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="DRIVERNAME" label="驾驶员姓名" width="200"></el-table-column>
				<el-table-column prop="LICENSEID" label="身份证号" width="160"></el-table-column>
				<el-table-column prop="VEHICLENO" label="车牌号码" width="160"></el-table-column>
				<el-table-column prop="ABB_NAME" label="所属企业" width="160"></el-table-column>
				<el-table-column prop="ZDD" label="订单数" width="160"></el-table-column>
				<el-table-column prop="ZYS" label="总营收(元)" width="160"></el-table-column>
				<el-table-column prop="ZZKLC" label="总行驶里程(公里)" width="160"></el-table-column>
				<el-table-column prop="ZZKSJ" label="总载客时长(分)" min-width="160" :resizable="false"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	import _ from 'underscore'
	import moment from 'moment'
	import {mapGetters} from 'vuex'
	import {templateHeight} from '../../assets/js/util'

	export default {
		name: "zdmbcx" ,
		data() {
			return {
				query: {
					stime: '',
					etime: '',
					ptname: '',
					cphm: '',
					name: ''
				} ,
				companyList: [],
				table:{
					data: [],
					loading:false,
				},
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.stime = this.timeFormatter(new Date())
				this.query.etime = this.timeFormatter(new Date())
				const elements = this.$refs['queryBar'].$el;
				templateHeight(this.$refs['queryPanel'], elements);
				this.getCompSelect()
				// this.getData();
			})
		},
		computed: {
			...mapGetters(["getAutoCompanyName"])
		},
		methods:{
			getCompSelect() {
				axios.get('map/compSelect', {	baseURL: this.baseURL})
						.then(res => {
							this.companyList = res.data
						})
			},
			getData(){
				if(this.query.stime ==''){
					this.$message.error('起始时间不能为空！');
					return
				}
				if(this.query.etime ==''){
					this.$message.error('起始时间不能为空！');
					return
				}
				if(this.query.name =='' && this.query.cphm == ''){
					this.$message.error('车牌号码与驾驶员姓名/身份证号至少有一项不为空！');
					return
				}
				this.table.loading = true;
				const params = new URLSearchParams()
				params.append('stime', this.timeFormatter(this.query.stime))
				params.append('etime', this.timeFormatter(this.query.etime))
				params.append('comp', this.query.ptname)
				params.append('name', this.query.name)
				params.append('vhic', this.query.cphm)
				return axios.post('map/zdmbcx', params, { baseURL: this.baseURL }).then(res => {
					let data=res.data;
					this.table.data = data;
					setTimeout(() =>{
						this.table.loading = false;
					},500);
				})
			},
			handleQueryClick() {
				this.getData();
			},
			timeFormatter(value){
				return moment(value).format('YYYY-MM-DD')
			},
			handleQueryDC() {
				let url = `${this.baseURL}map/qyrjyytjexcle?time=${this.timeFormatter(this.query.time)}`;
				window.open(url);
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
