<!--车辆动态监控-->
<template>
	<div class="tw-template-wrapper">
		<div class="tw-map-box" id="arcgisMap"></div>
		<dl class="tw-map-tool-bar tw-map-tool-right">
			<dd class="tw-map-tool-item" :class="[{active: mapQueryPanel}, iconClassName('icon-list')]" @click="handleMapQueryPanelDisplayClick"></dd>
			<el-tooltip v-for="item in platformList" :key="item.ABB_NAME" effect="dark" :content="item.ABB_NAME" placement="left">
				<dd class="tw-map-tool-item" :class="{active: haslatformActive(item.ABB_NAME)}" @click="handlePlatformClick(item)"><i :class="iconClassName(item.icon || '')"></i></dd>
			</el-tooltip>
		</dl>
		<el-form class="tw-map-tool-bar tw-map-tool-bottom" inline>
			<el-form-item class="tw-map-tool-item" label="平台：">{{company.name}}</el-form-item>
			<el-form-item class="tw-map-tool-item" label="在线：">{{company.zx}}</el-form-item>
			<el-form-item class="tw-map-tool-item" label="载客：">{{company.zk}}</el-form-item>
			<el-form-item class="tw-map-tool-item" label="空载：">{{company.kz}}</el-form-item>
			<el-form-item class="tw-map-tool-item" label="占比：">{{company.lv}}</el-form-item>
		</el-form>
		<transition name="mapQueryPanel">
			<div class="tw-map-query-panel" v-show="mapQueryPanel">
				<el-input class="tw-search-for" v-model="searchfor" size="small" placeholder="车牌号码">
					<span slot="suffix" class="el-input__icon el-button el-button--primary el-button--small el-icon-search" @click="handleSearchForClick"></span>
				</el-input>
				<ul class="tw-list tw-list-border">
					<el-scrollbar class="tw-scrollbar tw-y">
						<li class="tw-list-item" :class="{'tw-text-error': item.type}" v-for="item in vehicleList" :key="item.id" @click="handleVehicleClick(item)">
							<i class="tw-icon--prefix el-icon-location-outline"></i>{{item.vehino}}{{item.TYPE?'（未上线）':''}}
							<i class="tw-icon-platform" :class="[iconClassName(item.icon || '')]" v-if="!item.TYPE"></i>
							<el-button class="tw-list-suffix" type="text" icon="iconfont icon-trajectory" @click.stop.native="handleVehiclelsgj(item)" size="mini"></el-button>
						</li>
					</el-scrollbar>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script>
	import {esriLoaders, mapLayerPath} from '../../assets/js/arcgis.comfig'
	import {iconClassName} from '../../assets/js/util'
	import axios from "axios";
	import _ from "underscore";
	import $ from 'jquery'
	import moment from 'moment'
	export default {
		name: "VehicleDynamicMonitor",
		data() {
			return {
				searchfor: '',
				vehicleList: [
					{id: 1, type: true, name: '浙A12340'},
					{id: 2, type: false, name: '浙A12341'},
					{id: 3, type: false, name: '浙A12342'},
					{id: 4, type: false, name: '浙A12343'},
					{id: 5, type: false, name: '浙A12344'},
					{id: 6, type: true, name: '浙A12345'},
					{id: 7, type: false, name: '浙A12346'},
					{id: 8, type: true, name: '浙A12347'}
				],
				mapQueryPanel: false,
				platformActive: '全部',
				platformList: [
					{title: '卓卓1', icon: 'icon-kefu', data: {zx: 7310, zk: 2849,kz: 4461}},
					{title: '卓卓2', icon: 'icon-taxi', data: {zx: 2048, zk: 1588,kz: 460}},
					{title: '卓卓3', icon: 'icon-key', data: {zx: 2954, zk: 954,kz: 2000}},
					{title: '卓卓4', icon: 'icon-ddzc', data: {zx: 2954, zk: 954,kz: 2000}}
				],
				map: {
					loading: false,
					arcgisMap: null,
					levelMap: null,
					dialog: null,
					level: 6,
					ismar:0
				},
				company: {
					id: 'all',
					name: '全部',
					zk: 0,
					zx: 0,
					kz: 0,
					lv: '100%'
				}
			}
		},
		mounted(){
			this.$nextTick(() => {
				let _this = this;
				this.mapQueryPanel = true;
				this.getCompanyLIst();
				this.getVehicleList();
				try {
					this.map.loading = true;
					esriLoaders(['esri/map', 'esri/basemaps','esri/layers/GraphicsLayer', 'esri/lang', 'dijit/TooltipDialog', 'dijit/popup', 'dojo/dom-style'
					]).then(([Map, basemaps, GraphicsLayer, esriLang, TooltipDialog, dijitPopup, domStyle]) => {
						basemaps.mapLayerPath = mapLayerPath;
						_this.map.arcgisMap = new Map('arcgisMap', {
							basemap: 'mapLayerPath',
							spatialReference: {
								wkid: 4326
							},
							slider: false,
							center: [120.197521,30.24298],
							zoom: 5
						});
						_this.map.arcgisMap.infoWindow.resize(245,125);
						_this.map.dialog = new TooltipDialog({
							style: "position: absolute; width: 350px; font: normal normal normal 10pt Helvetica;z-index:100"
						});
						_this.map.dialog.startup();

						this.map.arcgisMap.on("load", () => {
							_this.map.levelMap = new GraphicsLayer({
								id : 'levelmap'
							});
							_this.map.arcgisMap.addLayer(_this.map.levelMap);
							_this.map.loading = false;
							_this.map.levelMap.on("click", evt=>{
								$('.mapDialog').hide();
								dijitPopup.close(_this.map.dialog);
								if(_this.map.level >8){
									let result =evt.graphic.attributes
									// let golsgj = $('<span class="">轨迹</span>').addClass('bottomRight golsgj').on('click', () => {
									// 	this.test(result)
									// });
									let t = '<div class="mapDialog" style="">'+
											'<div class="mapToolPanel">'+
											'<TitleCircle><HyperCircle></HyperCircle>网约车-'+result.vehino+'<HyperCircle></HyperCircle><i class="iconfont icon-close"></i></TitleCircle>'+
											'<div class="conent" style="padding-top: 20px;">'+
											'<div class="rowbox clearfix">'+
											'<div class="normBox" type="left" style="display: inline-block;">'+
											'<div class="normTitle">速度</div>'+
											'<div class="normInfo sbig">'+
											'<span class="intensify">'+result.speed+'</span>KM/H'+
											'</div>'+
											'</div>'+
											'<div class="normBox" type="right" style="display: inline-block;">'+
											'<div class="normTitle">营运状态</div>'+
											'<div class="normInfo sbig" style="font-size: 18px">'+_this.fomarttype(result.bizStatus)+'</div>'+
											'</div>'+'</div>'+
											'<div class="normBox" type="left">'+
											'<div class="normTitle">GPS时间</div>'+
											'<div class="normInfo sbig">'+_this.fomarttime(result.dateTime)+'</div>'+
											'</div>'+
											'<div class="normBox" type="left">'+
											'<div class="normTitle">所属公司</div>'+
											'<div class="normInfo sbig">'+result.vehName+'</div>'+
											'</div>'+
											'</div>'+
											'<span class="bottomRight golsgj" style="cursor: pointer;font-size: 18px;color:aliceblue;">轨迹</span>'+
										'</div>'+
										'</div>';
									// let titleCircle = $('<TitleCircle><HyperCircle></HyperCircle>网约车-'+result.VEHICLENO+'<HyperCircle></HyperCircle><i class="iconfont icon-close"></i></TitleCircle><TitleCircle><HyperCircle></HyperCircle>网约车-<HyperCircle></HyperCircle><i class="iconfont icon-close"></i></TitleCircle>').addClass('mapToolPanel')
									// let conent = $('<div class="conent" style="padding-top: 20px;"><div class="rowbox clearfix"><div class="normBox" type="left" style="display: inline-block;"><div class="normTitle">速度</div><div class="normInfo sbig"><span class="intensify">'+result.SPEED+'</span>KM/H</div></div><div class="normBox" type="right" style="display: inline-block;"><div class="normTitle">营运状态</div><div class="normInfo sbig">'+_this.fomarttype(result.BIZSTATUS)+'</div></div></div><div class="normBox" type="left"><div class="normTitle">GPS时间</div><div class="normInfo sbig">'+_this.fomarttime(result.POSITIONTIME)+'</div></div><div class="normBox" type="left"><div class="normTitle">所属公司</div><div class="normInfo sbig">'+result.ABB_NAME+'</div></div></div>').addClass('mapToolPanel')
									// let golsgj = $('<span class="">轨迹</span>').addClass('bottomRight golsgj').on('click', () => {
									// 	this.test(result)
									// });
									// let mapToolPanel = $('<div>').addClass('mapToolPanel')
									// mapToolPanel.append(titleCircle);
									// mapToolPanel.append(conent);
									// mapToolPanel.append(golsgj);
									// let zzjg = $('<div>').addClass('mapDialog').append(mapToolPanel)
									let content = esriLang.substitute(evt.graphic.attributes,t);
									_this.map.dialog.setContent(content);
									domStyle.set(_this.map.dialog.domNode, "opacity", 0.85);
									dijitPopup.open({
										popup: _this.map.dialog,
										x: evt.pageX,
										y: evt.pageY
									});
									$('.icon-close').click(function(){
										$('.mapDialog').hide();
										dijitPopup.close(_this.map.dialog);
									});
									$('.golsgj').on('click', () => {
										$('.mapDialog').hide();
										dijitPopup.close(_this.map.dialog);
										this.handleVehiclelsgj(result)
									})
								}
							});
							_this.map.arcgisMap.on("zoom-end", function (evt) {
								_this.mapOnchange(evt);
							})
							_this.map.arcgisMap.on("mouse-drag-end", function (evt) {
									if(_this.map.level >=9)
										_this.mapOnchange(evt);
							})
							_this.getMapLayered();
						});
					});
				} catch (e) {}
			});
		},
		computed: {
			platformOnlinData() {
				const {platformActive, platformList} = this;
				if (platformActive.length === 0) {
					const count = {zx: 0, zk: 0, kz: 0};
					_.each(platformList, item => {
						count.zx += item.ONLINE_NUM;
						count.zk += item.HEAVY_NUM;
						count.kz += item.EMAPY_NUM;
					});
					return count;
				} else return _.filter(platformList, item => item.title === platformActive)[0].data
			}
		},
		methods: {
			iconClassName,
			handleSearchForClick() {
				this.getVehicleList();
			},
			handleMapQueryPanelDisplayClick() {
				this.mapQueryPanel = !this.mapQueryPanel;
			},
			handlePlatformClick(item) {
				// if (this.platformActive === item.ABB_NAME) this.platformActive = '';
				this.platformActive = item.ABB_NAME;
				this.company.id = item.COMPANYID;
				this.company.name = item.ABB_NAME;
				this.company.kz = item.EMAPY_NUM;
				this.company.zk = item.HEAVY_NUM;
				this.company.zx = item.ONLINE_NUM;
				this.company.lv = item.LV;
				esriLoaders(['esri/geometry/webMercatorUtils']).then(([webMercatorUtils]) => {
					this.map.levelMap.clear();
					if (this.map.level < 9)
						this.getMapLayered();
					else {
						// let point = webMercatorUtils.webMercatorToGeographic(this.map.arcgisMap.extent.getCenter());
						let point = this.map.arcgisMap.extent.getCenter();
						this.getMapLayered9(point.x, point.y);
					}
				})
			},
			haslatformActive(name) {
				return this.platformActive === name;
			},
			fomarttime(date){
				return moment(date).format('YYYY-MM-DD HH:mm:ss')
			},
			fomarttype(type){
				if(type == '1')
					return '载客';
				else if(type == '2')
					return '接单';
				else if(type == '3')
					return '空驶';
				else if(type == '4')
					return '停运';
			},
			getCompanyLIst() {
				axios.get("map/getCompany", {
					baseURL: this.baseURL
				}).then(res => {
					this.platformList = res.data;
					_.each(res.data, item => {
						if(item.ABB_NAME === '全部'){
							this.company.kz = item.EMAPY_NUM;
							this.company.zk = item.HEAVY_NUM;
							this.company.zx = item.ONLINE_NUM;
							this.company.lv = item.LV;
						}
					});
				});
			},
			getVehicleList() {
				axios.get("map/getVehicle", {
					baseURL: this.baseURL,
					params: {vhic: this.searchfor}
				}).then(res => {
					this.vehicleList = res.data;
				});
			},
			mapOnchange(evt) {
				this.map.levelMap.clear();
				let _this = this;
				if(evt.level != null)
					this.map.level = evt.level;
				esriLoaders(['esri/geometry/webMercatorUtils','dijit/popup']).then(([webMercatorUtils, dijitPopup]) => {
					$('.mapDialog').hide();
					dijitPopup.close(_this.map.dialog);
					_this.map.levelMap.clear();
					if (_this.map.level < 9)
						_this.getMapLayered();
					else {
						// let point = webMercatorUtils.webMercatorToGeographic(_this.map.arcgisMap.extent.getCenter())
						let point = _this.map.arcgisMap.extent.getCenter();
						_this.getMapLayered9(point.x, point.y);
					}
				})
			},
			getMapLayered() {
				axios.get("map/getMapLayered", {
					baseURL: this.baseURL,
					params: {level: this.map.arcgisMap.getZoom(),comp_id:this.company.id}
				}).then(res => {
					_.each(res.data, item => {
						this.myAddmark(item.PX, item.PY, item.AREANUM)
					});
				});
			},
			getMapLayered9(x,y) {
				axios.get("map/getGet", {
					baseURL: this.baseURL,
					params: {level: this.map.arcgisMap.getZoom(),px:x,py:y,comp_id:this.company.id,type:'0'}
				}).then(res => {
					_.each(res.data, item => {
						this.addmar(item);
					});
				});
			},
			addmar(item) {
				esriLoaders(['esri/geometry/Point', 'esri/graphic' ,'esri/symbols/PictureMarkerSymbol']).then((
						[Point, Graphic, PictureMarkerSymbol]) => {
					// let infoTemplate7 = new InfoTemplate();
					// infoTemplate7.setTitle("所属平台  ${DEVICEID}");
					// infoTemplate7.setContent('<table v-if=""> '
					// 		+'<tr><td><b>车辆编号:  ${ANGLE}</b></td></tr>'
					// 		+'<tr><td><b>定位时间:  ${STIME}</b></td></tr></table>'
					// );
					let point = new Point({
						"x": item.longi-0.0049,
						"y": item.lati+0.0025,
						"spatialReference": {
							"wkid": 4326
						}
					});
					let address = '';
					if(item.mdt_no === 'didi')
						address = 'image/marker/dd.png';
					else if(item.mdt_no === 'shenzhou')
						address = 'image/marker/sz.png';
					else if(item.mdt_no === 'caocao')
						address = 'image/marker/cc.png';
					else if(item.mdt_no === 'yidao')
						address = 'image/marker/yd.png';
					else if(item.mdt_no === 'aa')
						address = 'image/marker/aa.png';
					else if(item.mdt_no === 'yangguangchedao')
						address = 'image/marker/yg.png';
					else if(item.mdt_no === 'wanshun')
						address = 'image/marker/ws.png';
					else if(item.mdt_no === 'shouyue')
						address = 'image/marker/sy.png';
					let p = PictureMarkerSymbol(this.baseURL + address, 36, 36).setOffset(18, 18);
					this.map.levelMap.add(new Graphic(point,
							p, item, ''));
				});
			},
			myAddmark(x, y, num) {
				esriLoaders(['esri/geometry/Point', 'esri/graphic','esri/symbols/SimpleMarkerSymbol'
					,'esri/symbols/TextSymbol' ,'esri/symbols/Font']).then((
					[Point, Graphic, SimpleMarkerSymbol, TextSymbol, Font]) => {
					let point = new Point(x,y);
					let color = {};
					let size = '';
					if(parseInt(num) >= 1000){
						size = '50';
						color = {a:1,r:216,g:30,b:6};
					}
					else if(parseInt(num) >=500 && num < 1000){
						size = '45';
						color = {a:1,r:244,g:138,b:42};
					}
					else if(parseInt(num) >=100 && num < 500){
						size = '35';
						color = {a:1,r:18,g:150,b:219};
					}
					else{
						size = '30';
						color = {a:1,r:42,g:234,b:42};
					}
					var _symbol = new SimpleMarkerSymbol({
						"color": color,
						"size": size,
						"angle": 0,
						"xoffset": 0,
						"yoffset": 0,
						"style": "esriSMSCircle",
						"outline": {
							"color": "",
							"width": 0,
							"type": "esriSLS",
							"style": "esriSLSSolid"
						}
					});
					this.map.background = new Graphic(point,_symbol);
					this.map.levelMap.add(this.map.background);

					let textSymbol =  new TextSymbol({
						'text': num,
						'color': {a:1,r:255,g:255,b:255},
						'angle': 0,
						'xoffset': 0,
						'yoffset': -3,
						'font': new Font(
								"12",
								Font.STYLE_ITALIC,
								Font.VARIANT_NORMAL,
								Font.WEIGHT_BOLD,
								"Courier"
						)
					});
					this.map.font = new Graphic(point,textSymbol);
					this.map.levelMap.add(this.map.font);
				});
			},
			handleVehicleClick(item) {
				this.map.ismar ++;
				let _this = this;
				esriLoaders(['dijit/popup']).then(([dijitPopup]) => {
					$('.mapDialog').hide();
					dijitPopup.close(_this.map.dialog);
				})
				if(item.TYPE){
					this.$message({
						message: '车辆未上线！',
						type: 'warning'
					});
					return;
				}
				_this.map.arcgisMap.centerAndZoom([item.longi-0.0049, item.lati+0.0025], 10)
				if(_this.map.ismar >1){
					_this.map.levelMap.clear();
					_this.addmar(item);
				}else{
					setTimeout(function(){
						_this.map.levelMap.clear();
						_this.addmar(item);
					},1200)
				}
			},
			handleVehiclelsgj(item) {
				this.$router.push({name: 'HistoricalTrackPlayback', params: {vhic: item.vehino}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/variable";

	.tw-template-wrapper {
		position: relative;
	}
	.tw-search-for {
		margin-bottom: 10px;
	}
	.tw-map{
		&-query-panel {
		}
		&-tool {
			&-bar {
				top: 40px;
				right: 50px;
			}
			&-right {
				right: 0;
			}
			&-bottom {
				top: auto;
				right: auto;
			}
		}
	}
	.tw-list {
		height: calc(100% - 42px);
		margin-bottom: $margin;
		&-item{
			line-height: 40px;
			cursor: pointer;
		}
	}
	.tw-icon-platform {
		margin-left: 5px;
		margin-right: 5px;
	}
	.mapDialog{
		background-color: red;
	}
</style>
