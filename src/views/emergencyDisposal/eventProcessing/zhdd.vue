<template>
	<div class="template-wrapper">
		<div class="dataListPanel">
			<div class="tw-map" id="amap"></div>
			<div class="tw-map-search-for" v-if="hasVehicleSearch">
				<input class="tw-map-input" v-model="vehicleSearch" placeholder="车辆搜索" @focus="handleVehicleSearchFocus" @keyup="handleVehicleSearchKeyup"/>
<!--				<a class="tw-map-button btn btn-primary iconfont icon-search"></a>-->
				<el-button type="primary" class="tw-map-button iconfont icon-search"></el-button>
			</div>
			<div class="tw-map-event-bar" v-if="hasVehicleSearch && hasEventBar">
				<div class="tw-map-event-item" @click="handleEventClick"><i class="tw-icon iconfont icon-lable"></i>事件</div>
				<div class="tw-map-event-item" @click="handleVehicleClick"><i class="tw-icon iconfont icon-car"></i>车辆</div>
			</div>
			<div class="tw-map-panel" v-if="hasVehicleSearch && hasEventList">
				<div class="tw-map-header" @click="handleCloseEventClick">
					返回<span class="countNumber">共计{{eventList.length}}条记</span>
				</div>
				<div class="tw-map-list">
					<div class="tw-map-item" v-for="item in eventList" :key="item.ID" @click="handleDingWei(item,2)">
<!--					<div class="tw-map-item" v-for="item in eventList" :key="item.ID" @click="getOneEvent(item)">-->
						<div class="tw-card">
							<div class="tw-title" v-text="item.SJZT"></div>
							<div class="tw-time" v-text="formatDateTime(item.TIME)"></div>
							<div class="tw-address" v-text="item.ADDRESS"></div>
							<a class="tw-button btn btn-link btn-sm iconfont icon-details" @click="handleEventDetailsClick(item)">1</a>
						</div>
					</div>
				</div>
			</div>
			<div class="tw-map-panel" v-if="hasVehicleSearch && hasEventDetails">
				<div class="tw-map-header" @click="handleCloseEventDetailsClick">
					返回<span class="countNumber">共计{{eventList.length}}条记</span>
				</div>
				<div class="tw-map-panel-title">
					<div class="tw-map-panel-header"><i class="iconfont icon-details"></i>事件详情</div>
					<div class="tw-map-panel-body" style="height: 180px;">
						<div class="tw-body-item">
							<div class="tw-body-item-title">事件名称:</div>
							<div class="tw-body-item-value" v-text="selectEventItem.SJZT"></div>
						</div>
						<div class="tw-body-item">
							<div class="tw-body-item-title">事件时间:</div>
							<div class="tw-body-item-value" v-text="formatDateTime(selectEventItem.TIME)"></div>
						</div>
						<div class="tw-body-item">
							<div class="tw-body-item-title">事件地点:</div>
							<div class="tw-body-item-value" v-text="selectEventItem.ADDRESS"></div>
						</div>
						<div class="tw-body-item">
							<div class="tw-body-item-title">事件内容:</div>
							<div class="tw-body-item-value" v-text="selectEventItem.SJNR" style="width: 100%; margin-left: 0; text-indent: 85px"></div>
						</div>
						<div class="tw-body-item">
							<div class="tw-body-item-title">相关车辆数:</div>
							<div class="tw-body-item-value" v-text="selectEventItem.count"></div>
						</div>
					</div>
				</div>
				<div class="tw-map-panel-title" style="height: calc(100% - 274px);">
					<div class="tw-map-panel-header"><i class="iconfont icon-car"></i>有关车辆</div>
					<div class="tw-map-panel-body" style="padding: 0; height: calc(100% - 41px);">
						<div class="tw-map-list">
							<div class="tw-map-item" v-for="(item, index) in selectEventItem.VEHI_NO" :key="index" @click="handleEventVehicleDetailsClick(item)">
								<div class="tw-vehicle" v-text="item"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tw-map-panel" v-if="hasVehicleSearch && hasEventVehicleDetails" style="height: auto;">
				<div class="tw-map-header" @click="handleCloseEventVehicleDetailsClick">
					返回<span class="countNumber">共计{{eventList.length}}条记</span>
				</div>
				<div class="tw-map-panel-title">
					<div class="tw-map-panel-header"><i class="iconfont icon-details"></i>事件详情</div>
					<div class="tw-map-panel-body" style="height: 180px;">
						<div class="tw-body-item">
							<div class="tw-body-item-title">车牌号码:</div>
							<div class="tw-body-item-value" v-text="selectEventVehicleItem[0].VEHI_NO"></div>
						</div>
						<div class="tw-body-item">
							<div class="tw-body-item-title">司机:</div>
							<div class="tw-body-item-value" v-text="selectEventVehicleItem[0].OWN_NAME"></div>
						</div>
						<div class="tw-body-item">
							<div class="tw-body-item-title">电话:</div>
							<div class="tw-body-item-value" v-text="selectEventVehicleItem[0].OWN_TEL || ''"></div>
						</div>
						<div class="tw-body-item">
							<div class="tw-body-item-title">所属公司:</div>
							<div class="tw-body-item-value" v-text="selectEventVehicleItem[0].COMP_NAME"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="tw-map-panel" v-if="hasVehicleSearch && hasVehicleList"  style="overflow: auto; height: auto; max-height: calc(100% - 200px);">
				<div class="tw-map-header" @click="handleCloseVehicleClick">
					返回<span class="countNumber">共计{{vehiclelist.length}}条记</span>
				</div>
				<div class="tw-map-list">
					<div class="tw-map-item" v-for="(item, index) in vehiclelist.slice(0,99)" :key="index"  @click="handleDingWei(item,1)">
						<div class="tw-title" v-text="item.COMP_NAME" ></div>
						<div class="tw-vehicle" v-text="item.VEHI_NO"></div>
					</div>
				</div>
			</div>
			<div class="tw-map-panel" v-if="hasVehicleSearch && vehicleSearchList.length > 0" style="overflow: auto; height: auto; max-height: calc(100% - 200px);">
				<div class="tw-map-list">
					<div class="tw-map-item" v-for="(item, index) in vehicleSearchList" :key="index" @click="handleDingWei(item,1)">
						<div class="tw-title" v-text="item.COMP_NAME"></div>
						<div class="tw-vehicle" v-text="item.VEHI_NO"></div>
					</div>
				</div>
			</div>
			<div class="tw-map-tool-bar">
				<div class="tw-map-tool-header"><i class="tw-icon iconfont icon-menu">&nbsp;</i></div>
				<div class="tw-map-tool-item" @click="handleGuiJi">
					<i class="tw-icon iconfont icon-gjhf"></i>轨迹
				</div>
				<div class="tw-map-tool-item" @click="handleLkmap">
					<i class="tw-icon iconfont icon-hld"></i>路况
				</div>
				<div class="tw-map-tool-item"  @click="handleWxmap">
					<i class="tw-icon iconfont icon-weixing"></i>卫星图
				</div>
				<div class="tw-map-tool-item" @click="handleDisplayList">
					<i class="tw-icon iconfont icon-rzsh"></i>列表
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import _ from 'underscore';

	export default {
		name: "zhdd",
		data: function() {
			return {
				map: null,
				mapMarker: '',
				wxtpd: false,
				layers: null,
				lkpd:false,
				trafficLayer:null,
				vehicleSearch: '',
				vehicleSearchList: [],
				hasVehicleSearch: true,
				hasEventBar: false,
				hasEventList: false,
				hasEventDetails: false,
				hasEventVehicleDetails: false,
				hasVehicleList: false,
				eventList: [],
				vehiclelist:[],
				selectEventItem: {},
				selectEventVehicleItem: {},
				vehiclelistInfo:[]
			}
		},
		mounted(){
			this.$nextTick(() =>{
				var _this = this;
				this.$nextTick( () => {
					_this.map = new AMap.Map('amap', {
						zoom:14,
						center: new AMap.LngLat(120.153576,30.287459)
					});
					//卫星图
					_this.layers=new AMap.TileLayer.Satellite();
					_this.layers.setMap(_this.map);
					_this.layers.hide();
					//实时路况图层
					_this.trafficLayer = new AMap.TileLayer.Traffic({
						zIndex: 10
					});
					_this.trafficLayer.setMap(_this.map);
					_this.trafficLayer.hide();
				});
				_this.getQuerVehicleList();
			});
		},
		methods:{
			handleVehicleSearchFocus(){
				this.hasEventBar = true;
				this.hasEventList = false;
				this.hasVehicleList = false;
			},
			handleVehicleSearchKeyup(value) {
				if (this.vehicleSearch.length <= 2) return this.vehicleSearchList = [];
				this.getQuerVehicleList();
			},
			getQuerVehicleList(){
				const baseURL = this.baseURL;
				let vehicle = this.vehicleSearch;
				axios.get('Yjzh/findclsj',{
					baseURL: baseURL,
					params: {
						info: vehicle
					}
				}).then(res => {
					if(vehicle==''){
						this.vehiclelist = res.data || [];
					}else{
						this.vehicleSearchList = res || [];
					}
				});
			},
			handleVehicleClick(){
				this.hasVehicleList = true;
			},
			handleEventClick(){
				this.hasEventList = true;
				this.getEventList();
			},
			getEventList(){
				const baseURL = this.baseURL;
				axios.get('Yjzh/findjtsj',{
					baseURL: baseURL,
				}).then((res) => {
					this.eventList = res.data.list || [];
				});
			},
			getOneEvent(item){
				const baseURL = this.baseURL;
				axios.get('Yjzh/findjtsj',{
					baseURL: baseURL,
					params:{
						sjbh:item.SJBH
					}
				}).then((res) => {
				});
			},
			handleCloseEventClick() {
				this.hasEventList = false;
			},
			handleWxmap() {
				if (this.wxtpd) {
					this.layers.hide();
					this.wxtpd = false;
				} else {
					this.layers.show();
					this.wxtpd = true;
				}
			},
			handleGuiJi: function() {
				var _parent = parent.$(window.parent.document);
				_parent.find('.ip-menuItem [data-skip="xxfwygl"]').trigger("click");
				_parent.find('.ip-menuItem [data-skip="gjhfgz"]').trigger("click");
// 					setTimeout(function(){
// 						_parent.find('#menuListBar .ip-menuItem:nth-of-type(1) .ip-menuTitle').trigger("click");
// 						_parent.find('.ip-menuItem [data-skip="gjhfgz"]').trigger("click");
// 					},100);
			},
			handleLkmap: function() {
				if (this.lkpd) {
					this.trafficLayer.hide();
					this.lkpd = false;
				} else {
					this.trafficLayer.show();
					this.lkpd = true;
				}
			},
			handleDisplayList: function() {
				this.hasVehicleSearch = !this.hasVehicleSearch;
			},
			handleDingWei: function(item,type) {
				this.addMapMarker(item,type);
			},
			/* 将单个车辆的位置信息显示在地图上 */
			addMapMarker: function(item,type) {
				var _this = this;
				if(!(item.hasOwnProperty('PX')&&item.hasOwnProperty('PY'))){
					_this.$message.error('该车辆无定位！');
					return false;
				}
				if(this.mapMarker) this.mapMarker.setMap(null);
				var markerContent = document.createElement('div');
				markerContent.className = 'txtstyle';
				//点标记中的图标
				var markerImg = document.createElement('img');
				markerImg.className = 'markerlnglat';
				markerImg.src = '../../resources/images/411.png';
				markerContent.appendChild(markerImg);
				this.mapMarker = new AMap.Marker({
					map: this.map,
					position: new AMap.LngLat(item.PX, item.PY),
					offset: new AMap.Pixel(-7,-10), //相对于基点的偏移位置
					draggable: false,  //是否可拖动
					content: markerContent   //自定义点标记覆盖物内容
				});
				this.map.setCenter(new AMap.LngLat(item.PX,item.PY));
				var txt = '';
				if(type=='1'){
					txt = "<table><tr><td><b style='color:#3399ff'>"+item.VEHI_NO+"</b></td>" +
							"<td></td></tr><tr><td><b>[所属业户]</b>："+item.COMP_NAME+"</td></tr>" +
							// 						"<tr><td><b>[车辆商标]</b>："+item.VT_NAME+"</td></tr>" +
							// 						"<tr><td><b>[车辆颜色]</b>："+item.VC_NAME+"</td></tr>" +
							"<tr><td><b>[SIM卡]</b>："+item.SIM_NUM+"</td></tr>" +
							"<tr><td><b>[车辆所属人]</b>："+(item.OWN_NAME==null?"":item.OWN_NAME)+"</td></tr>" +
							"<tr><td><b>[联系电话]</b>："+(item.OWN_TEL==null?"":item.OWN_TEL)+"</td></tr>" +
							"<tr><td><b>[经度]</b>："+item.PX+"</td></tr><tr><td><b>[纬度]</b>："+item.PY+"</td></tr>" +
							"";
				}else if(type=='2'){
					txt = "<table><tr><td><b style='color:#3399FF'>"+item.SJZT+"</b></td>" +
							"<td></td></tr><tr><td><b>[地点]</b>："+item.ADDRESS+"</td></tr>" +
							"<tr><td><b>[经度]</b>："+item.PX+"</td></tr><tr><td><b>[纬度]</b>："+item.PY+"</td></tr>" +
							"";
				}
				var info = [];
				info.push(txt);
				var inforWindowone = new AMap.InfoWindow({
					offset: new AMap.Pixel(3, 0),
					content: info.join("</table>")
				});
				inforWindowone.open(this.map, this.mapMarker.getPosition());
				AMap.event.addListener(this.mapMarker, "click", function (e) {
					inforWindowone.open(_this.map, _this.mapMarker.getPosition());
				});
			},
			handleCloseVehicleClick: function() {
				this.hasVehicleList = false;
			},
			formatDateTime: function (time) {
				return moment(time).format('YYYY-MM-DD HH:mm:ss');
			},
			handleEventDetailsClick: function(item) {
				this.hasEventList = false;
				this.hasEventDetails = true;

				const params = new URLSearchParams();
				const baseURL = this.baseURL;
				params.append('sjbh',item.SJBH);
				axios.post('Yjzh/findjtsj',params,{baseURL}).then(res =>{
					this.vehiclelistInfo = res.data.list1 || [];
					let vlists = _.pluck(res.data.list1 , 'VEHI_NO');
					this.selectEventItem = item;
					this.selectEventItem.VEHI_NO = vlists;
					this.selectEventItem.count = vlists.length;
				});

			},
			formatVehicleList: function (item) {
				if(!(item.hasOwnProperty('VEHI_NO'))||!(item.hasOwnProperty('OWN_NAME'))||!(item.hasOwnProperty('OWN_TEL'))||!(item.hasOwnProperty('COMP_NAME'))){
					return false;
				}
				var vehicle = item.VEHI_NO.split(',');
				var name = item.OWN_NAME.split(',');
				var phone = item.OWN_TEL.split(',');
				var company = item.COMP_NAME.split(',');
				var newItem = [];
				_.each(vehicle, function (_, index) {
					if (!vehicle[index] && !name[index] && !phone[index] && !company[index]) return;
					newItem.push({
						vehicle: vehicle[index],
						name: name[index],
						phone: phone[index],
						company: company[index]
					});
				})
				return newItem;
			},
			handleCloseEventDetailsClick: function() {
				this.hasEventDetails = false;
				this.hasEventList = true;
			},
			handleEventVehicleDetailsClick: function(item) {
				this.hasEventVehicleDetails = true;
				this.selectEventVehicleItem = _.filter(this.vehiclelistInfo , info =>{
					return info.VEHI_NO == item
				});
			},
			handleCloseEventVehicleDetailsClick: function() {
				this.hasEventVehicleDetails = false;
				this.selectEventVehicleItem = {};
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/comAControl";
</style>
