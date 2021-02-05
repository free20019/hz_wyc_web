<template>
	<div>
		<div class="beonduty_Box">
			<h3 class="title">今日值班</h3>
			<div class="currentDate">
				<span class="year">2019</span>年
				<span class="month">{{nowZb.ZBSJ}}</span>
				<span class="week">{{formatterTime()}}</span>
			</div>
			<div class="zhiban">值班长</div>
			<div class="name zongzhibanStaff">金俊</div>
			<div class="zhiban">早班 晚班</div>
			<div class="name zhibanStaff" style="width:280px;">{{nowZb.WBNAME}}&nbsp;{{nowZb.WEEK}}</div>
			<div class="zhiban">白班电话</div>
			<div class="phone">
				<div class="tel">
					<span>电话：</span>
					<span class="_tel dh_tel">0571-86445781</span>
				</div>
				<!--<div class="mobilephoneb">-->
				<!--<span>电话：</span>-->
				<!--<span class="_tel dh_phone"></span>-->
				<!--</div>-->
			</div>
		</div>

		<div class="body_Box">
			<h3 class="title">本周值班</h3>
			<div class="body">
				<span class="time">时间</span>
				<span class="person">早班</span>
				<span class="telephone">晚班</span>
			</div>
			<div class="form" >
				<ul>
					<li><span class="data1">  星期一</span><span class="name1">{{weekZb[0].WBNAME}}</span><span class="telephone1">{{weekZb[0].WEEK}}</span></li>
					<li><span class="data1">  星期二</span><span class="name1">{{weekZb[1].WBNAME}}</span><span class="telephone1">{{weekZb[1].WEEK}}</span></li>
					<li><span class="data1">  星期三</span><span class="name1">{{weekZb[2].WBNAME}}</span><span class="telephone1">{{weekZb[2].WEEK}}</span></li>
					<li><span class="data1">  星期四</span><span class="name1">{{weekZb[3].WBNAME}}</span><span class="telephone1">{{weekZb[3].WEEK}}</span></li>
					<li><span class="data1">  星期五</span><span class="name1">{{weekZb[4].WBNAME}}</span><span class="telephone1">{{weekZb[4].WEEK}}</span></li>
					<li><span class="data1">  星期六</span><span class="name1">{{weekZb[5].WBNAME}}</span><span class="telephone1">{{weekZb[5].WEEK}}</span></li>
					<li><span class="data1">  星期天</span><span class="name1">{{weekZb[6].WBNAME}}</span><span class="telephone1">{{weekZb[6].WEEK}}</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';

	export default {
		name: "zb",
		data(){
			return{
				nowZb:{},
				weekZb:[]
			}
		},
		mounted(){
			this.$nextTick(() =>{
				this.findZbb();
			});
		},
		methods:{
			findZbb(){
				const baseURL = this.baseURL;
				axios.post('Yjzh/findzbb','',{baseURL}).then(res =>{
					this.nowZb = res.data.NOW[0];
					this.weekZb = res.data.WEEK;
				})
			},
			formatterTime(){
				if(moment().format('dddd') == 'Monday'){
					return '星期一'
				}
				if(moment().format('dddd') == 'Tuesday'){
					return '星期二'
				}
				if(moment().format('dddd') == 'Wednesday'){
					return '星期三'
				}
				if(moment().format('dddd') == 'Thursday'){
					return '星期四'
				}
				if(moment().format('dddd') == 'Friday'){
					return '星期五'
				}
				if(moment().format('dddd') == 'Saturday'){
					return '星期六'
				}
				if(moment().format('dddd') == 'Sunday'){
					return '星期日'
				}
			}
		}
	}
</script>

<style scoped>
	.beonduty_Box {width: 370px; height: 556px; margin-left: 20%; font-family: '黑体'; background: #7db2df;float:left;margin-top: 50px;}
	[class$='_Box'] {background: url('../../../assets/img/zbb.jpg') no-repeat!important;}
	[class$='_Box'] > div {text-align: center;  color: #4976b9;}
	[class$='_Box'] .title {padding: 23px 0px 45px; font-size: 30px; text-align: center; text-shadow: 2px 2px 2px #000; color: #ff0000;}
	.currentDate { margin-bottom: 30px; padding-top: 10px; font-size: 18px; font-weight: bold;}
	.currentDate iii{margin-left: 2px;}
	.currentDate .month, .currentDate .week {margin-left: 17px;}
	.zhiban {margin-top: 20px; font-size: 20px; font-weight: bold;}
	.beonduty_Box .name {width: 160px; height: 35px; line-height: 35px; margin: 10px auto; font-size: 24px; color: #000000; background: #d0ecf8;}
	.beonduty_Box .phone { width: 240px; margin: 0px auto; margin-top: 25px; font-size: 18px; text-align: left; color: #000000;}
	.beonduty_Box .phone > div {margin: 15px 0px;}
	.beonduty_Box .phone > div ._tel {width: 150px; height: 30px; line-height: 30px; padding-left: 10px; display: inline-block; background: #cfecf8;}

	.body_Box {width: 370px; height: 556px; position: relative; font-family: '黑体';float:left;margin-left: 50px;margin-top: 50px;}
	.body_Box > div {text-align: center;  color: #4976b9;}
	.body {height: 30px; margin: 0px -150px; position: absolute; left: 50%;}
	.body > span {width: 100px;height: 30px; border-bottom: 2px solid #fa0202;  display: block;  float: left; }
	.body { margin-bottom: 30px; padding-top: 10px; font-size: 18px; font-weight: bold;}
	.form{position: relative;  top: 50px;}
	.form ul, .form ul li {list-style-type: none; margin: 0px; padding: 0px;}
	.form ul li{  margin: 18px 0;}
	.form ul li span{  width:100px;height: 20px;display:inline-block;text-align:center; font-size: 14px;font-family: '黑体';}
	.form ul li span.name1 {text-align: center;}
	html,body {
		background: #ffffff;
	}
</style>
