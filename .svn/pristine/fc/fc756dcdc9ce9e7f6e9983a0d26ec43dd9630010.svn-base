<!-- 执法调度 -->
<template>
	<div class="tw-template-wrapper" @mousemove="handleMouseMove" @mouseup="handleMouseUp" ref="wrapper">
		<div class="map-box" ref="moveMap">
			<div id="arcgisMap" style="height:100%"></div>
		</div>

		<el-dialog
				title="提示"
				:visible.sync="dialog.display"
				width="600px">
			<el-form label-width="110px">
				<!--<el-form-item label="执法人员">-->
					<!--<el-input v-model="dialog.name" placeholder="执法人员"></el-input>-->
				<!--</el-form-item>-->
				<el-form-item label="调度内容">
					<el-input type="textarea" v-model="dialog.note" placeholder="调度内容" :autosize="{minRows: 10}"></el-input>
				</el-form-item>
		</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialog.display = false">取 消</el-button>
				<el-button type="primary" @click="addZFDD">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import { esriLoaders, mapLayerPath } from '../../assets/js/arcgis.comfig'
	import { iconClassName } from '../../assets/js/util'
	import axios from 'axios'
	import moment from 'moment'
	import $ from 'jquery'
	import { templateHeight } from '../../assets/js/util'
	import _ from 'underscore'

	export default {
		name: 'StatisticsExport',
		data() {
			return {
				map: {
					arcgisMap: null,
					dialog: null,
					levelMap: null
				},
				dialog: {
					display: false,
					name: '',
					note: ''
				},
				loading: false,
				data: [],
				clickFlag: false
			}
		},
		mounted() {
			this.$nextTick(() => {
				let _this = this
				try {
					esriLoaders([
						'esri/map',
						'esri/basemaps',
						'esri/layers/GraphicsLayer',
						'esri/lang',
						'dijit/TooltipDialog',
						'dijit/popup',
						'esri/dijit/Scalebar',
						'dojo/dom-style'
					]).then(([Map, basemaps, GraphicsLayer, esriLang, TooltipDialog, dijitPopup, Scalebar, domStyle]) => {
						basemaps.mapLayerPath = mapLayerPath
						this.map.arcgisMap = new Map('arcgisMap', {
							basemap: 'mapLayerPath',
							spatialReference: {
								wkid: 4326
							},
							center: [120.290262812, 30.268283139],
							zoom: 4
						})
						this.map.arcgisMap.on('load', () => {
							this.getzfgps()
							this.map.arcgisMap.infoWindow.resize(100, 125)
							this.map.dialog = new TooltipDialog({
								style: 'position: absolute; width: 350px; font: normal normal normal 10pt Helvetica;z-index:100'
							})
							this.map.dialog.startup()
							this.map.levelMap = new GraphicsLayer({
								id: 'levelmap'
							})
							this.map.arcgisMap.addLayer(this.map.levelMap)
							_this.map.levelMap.on('click', evt => {
								$('.mapDialog').hide()
								dijitPopup.close(_this.map.dialog)
									let result = evt.graphic.attributes
									let t =
											'<div class="mapDialog" style="">' +
											'<div class="mapToolPanel">' +
											'<TitleCircle><HyperCircle></HyperCircle>执法人姓名：' +
											result.USER_ID+
											'<HyperCircle></HyperCircle><i class="iconfont icon-close"></i></TitleCircle>' +
											'<div class="conent" style="padding-top: 20px;">' +
											'<div class="normBox" type="left">' +
											'<div class="normTitle">定位时间</div>' +
											'<div class="normInfo sbig">' +
											_this.fomarttime(result.GPS_TIME) +
											'</div>' +
											'</div>' +
											'<div class="normBox" type="left">' +
											'<div class="normTitle">定位地址</div>' +
											'<div class="normInfo sbig">' +
											result.GEOGRAPHIC_POSITION +
											'</div>' +
											'</div>' +
											'</div>' +
											'<span class="bottomRight golsgj" style="cursor: pointer;font-size: 18px;color:aliceblue;">执法调度</span>' +
											'</div>' +
											'</div>'
									let content = esriLang.substitute(evt.graphic.attributes, t)
									_this.map.dialog.setContent(content)
									domStyle.set(_this.map.dialog.domNode, 'opacity', 0.85)
									dijitPopup.open({
										popup: _this.map.dialog,
										x: evt.pageX,
										y: evt.pageY
									})
									$('.icon-close').click(function() {
										$('.mapDialog').hide()
										dijitPopup.close(_this.map.dialog)
									})
									$('.golsgj').on('click', () => {
										$('.mapDialog').hide()
										dijitPopup.close(_this.map.dialog)
										this.dialog.name = result.USER_ID
										this.dialog.note = ''
										_this.dialog.display = true
									})
							})
							let scalebar = new Scalebar({
								map: this.map.arcgisMap,
								// "dual" displays both miles and kilmometers
								// "english" is the default, which displays miles
								// use "metric" for kilometers
								scalebarUnit: 'dual'
							})
						})
					})
				} catch (e) {}
			})
		},
		methods: {
			fomarttime(date) {
				return moment(date).format('YYYY-MM-DD HH:mm:ss')
			},
			getzfgps() {
				axios.get('map/getZFGPS', {
							baseURL: this.baseURL,
						})
						.then(res => {
							this.data = res.data
							for(let i=0; i<res.data.length; i++) {
								this.addmar(res.data[i])
							}
						})
			},
			addmar(item) {
				esriLoaders([
					'esri/geometry/Point',
					'esri/graphic',
					'esri/symbols/PictureMarkerSymbol'
				]).then(([Point, Graphic, PictureMarkerSymbol]) => {
					// let infoTemplate7 = new InfoTemplate();
					// infoTemplate7.setTitle("所属平台  ${DEVICEID}");
					// infoTemplate7.setContent('<table v-if=""> '
					// 		+'<tr><td><b>车辆编号:  ${ANGLE}</b></td></tr>'
					// 		+'<tr><td><b>定位时间:  ${STIME}</b></td></tr></table>'
					// );
					let point = new Point({
						x: parseFloat(item.LONGITUDE) - 0.0049,
						y: parseFloat(item.LATITUDE) + 0.0025,
						spatialReference: {
							wkid: 4326
						}
					})
					let address = 'image/marker/persion.png'
					let p = PictureMarkerSymbol(this.baseURL + address, 38, 38).setOffset(
							14,
							19
					)
					this.map.levelMap.add(new Graphic(point, p, item, ''))
				})
			},
			addZFDD() {
				axios.get('map/addZFDD', {
					baseURL: this.baseURL,
					params: {
						name: this.dialog.name,
						note: this.dialog.note
					},
				})
						.then(res => {
							this.dialog.display = false
							this.$message(res.data.info);
						})
			},
			handleMouseMove(e) {
				if (this.clickFlag) {
					let height = e.clientY - 50
					if (height > 200) {
						this.$refs.moveMap.style.height = e.clientY - 50 + 'px'
						this.$refs.moveTable.style.height = `calc(100% - ${height}px)`
						if (this.activeFlagA) {
							const elements = this.$refs['queryBar'].$el
							templateHeight(this.$refs['queryPanel'], elements)
						}
						if (this.activeFlagB) {
							const elements = this.$refs['queryBar'].$el
							templateHeight(this.$refs['queryPanelB'], elements)
						}
					}
				}
			},
			handleMouseUp(e) {
				this.clickFlag = false
			}
		}
	}
</script>
<style lang="scss" scoped>
	$font-color: #374873;
	$border-color: #69a7f7;
	.tw-template-wrapper {
		position: relative;
		overflow: hidden;
	}

	.tw-map {
		&-query-panel {
			top: auto;
			bottom: 30px;
			width: calc(100% - 250px);
			height: 100%;
			min-height: 230px;
		}

		&-tool {
			&-bar {
				top: 40px;
				right: 50px;
			}

			&-right {
				right: 0;
			}
		}
	}

	.tw-query-bar {
		padding-top: 0;
		padding-left: 0;
		padding-right: 0;
	}

	// 滑动面板 从下到上
	.mapQueryPanel--bottom {
		&-enter-active,
		&-leave-active {
			transition: bottom 0.5s ease;
		}
		&-enter,
		&-leave-to {
			bottom: -450px;
		}
	}
	.map-box {
		height: 100%;
	}
</style>
