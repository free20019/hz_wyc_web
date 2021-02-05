<!--特定区域监测-->
<template>
  <div class="tw-template-wrapper">
    <div class="tw-map-left-panel" v-show="mapQueryPanel">
      <el-tabs
        class="tw-template-height"
        type="card"
        v-model="activeName"
        :stretch="true"
        @tab-click="tabClick"
      >
        <el-tab-pane label="区域监测" name="first">
          <div class="tab-info">
            <!-- <ul>
							<li class="tw-list-item title">
								<i class="tw-icon--prefix el-icon-location-outline"></i>
								<span class="tab-title" style="text-align:center">区域</span>
								<div class="tw-driver vertical"></div>
								<span class="tab-content car">车辆数</span>
								<div class="tw-driver vertical"></div>
								<span class="tab-content waring">预报警数</span>
							</li>
							<li
									class="tw-list-item"
									v-for="item in areaList"
									:key="item.AREA_ID"
									@click="getVehicleList(item)"
									:class="{'danger-list':item.AREA_NUM > item.AREA_AVG_NUM}"
							>
								<i class="tw-icon--prefix el-icon-location-outline"></i>
								<span class="tab-title">{{item.AREA_NAME}}</span>
								<div class="tw-driver vertical"></div>
								<span class="tab-content car">{{item.AREA_NUM}}</span>
								<div class="tw-driver vertical"></div>
								<span class="tab-content waring">{{item.AREA_AVG_NUM}}</span>
							</li>
            </ul>-->
            <el-table :data="areaList" :row-class-name="tableRowClassName" @row-click="getVehicleList">
              <el-table-column
                :show-overflow-tooltip="true"
                prop="AREA_NAME"
                width="100"
                label="区域"
              ></el-table-column>
              <el-table-column align="center" prop="AREA_NUM" label="车辆数"></el-table-column>
              <el-table-column align="center" prop="AREA_AVG_NUM" label="预报警数"></el-table-column>
            </el-table>
            <!--<el-tabs v-model="tabactiveName" type="card" @tab-click="handleClick">-->
            <!--<el-tab-pane label="区域监控" name="first">-->
            <!---->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="车辆监控" name="second">车辆监控</el-tab-pane>-->
            <!--<el-tab-pane label="车辆信息" name="third">车辆信息</el-tab-pane>-->
            <!--</el-tabs>-->
          </div>
        </el-tab-pane>
        <el-tab-pane label="电子围栏" name="second">
          <div class="tab-info">
            <ul>
              <li
                class="tw-list-item"
                style="line-height:49px;padding-left: 60px;color: #374873;font-weight: 600 "
                :class="{'tw-text-error': item.type}"
                v-for="item in fanceList"
                :key="item.id"
                @click="handleAreaFanceChange(item)"
              >
                <i class="tw-icon--prefix el-icon-location-outline"></i>
                {{item.AREA_NAME}}
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="map-box" id="arcgisMap"></div>
    <div class="table-box">
      <div class="table-title">{{areaname}}</div>
      <el-table
        :data="vehicleList"
        border
        v-show="tabIndex == 0"
        height="100%"
        size="mini"
        v-loading="areaLonding"
      >
        <el-table-column label="平台名称" prop="vehName"></el-table-column>
        <el-table-column label="车牌号码" prop="vehino"></el-table-column>
        <el-table-column label="营运状态" prop="bizStatus" :formatter="fomartyytype"></el-table-column>
        <el-table-column label="速度(KM/H)" prop="speed"></el-table-column>
        <el-table-column label="定位时间" prop="dateTime"></el-table-column>
      </el-table>
      <el-table
        :data="filterDataList"
        border
        v-show="tabIndex == 1"
        height="calc(100% - 42px)"
        size="mini"
        v-loading="fanceLonding"
      >
        <el-table-column prop="ABB_NAME" label="平台名称" width="160"></el-table-column>
        <el-table-column prop="VEHICLENO" label="车牌号码" width="160"></el-table-column>
        <el-table-column prop="IN_OUT" label="类型" :formatter="fomarttype" width="160"></el-table-column>
        <!--<el-table-column  prop="POSITIONTIME" label="定位时间" min-width="160"></el-table-column>-->
        <el-table-column prop="POSITIONTIME" label="定位时间" min-width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-text="fomarttime(scope.row.POSITIONTIME)"></span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="total"
        :page-count="totalPages"
        :current-page="currentPage"
        @current-change="handlePageSizeChange"
      ></el-pagination>
    </div>
    <!--		<div class="tw-map-box" id="arcgisMap"></div>-->
    <!--		<dl class="tw-map-tool-bar tw-map-tool-right">-->
    <!--			<dd class="tw-map-tool-item" :class="[{active: mapQueryPanel}, iconClassName('icon-list')]" @click="handleMapQueryPanelDisplayClick"></dd>-->
    <!--		</dl>-->
    <!--		<transition name="mapQueryPanel">-->
    <!--			<div class="tw-map-query-panel left" v-show="mapQueryPanel">-->
    <!--				<el-tabs type="card" v-model="activeName" :stretch=true>-->
    <!--					<el-tab-pane label="区域检测" name="first">-->
    <!--						<div class="tab-info" style="height: 372px">-->
    <!--							<el-collapse class="tw-collapse" v-model="activeAreaNames" accordion @change="handleAreaPanelChange">-->
    <!--								<el-scrollbar class="tw-scrollbar tw-y">-->
    <!--									<el-collapse-item v-for="item in areaList" :key="item.AREA_ID" :class="{'tw-alarm':item.TYPE}" :title="item.AREA_NAME" :name="item.AREA_ID">-->
    <!--										<transition name="showLoading">-->
    <!--											<div class="tw-loading" v-loading="item.loading" v-if="item.loading"></div>-->
    <!--										</transition>-->
    <!--										<div class="tw-list-item" v-for="vItem in vehicleList" :key="vItem.id">-->
    <!--											<i class="tw-icon&#45;&#45;prefix el-icon-location-outline"></i>{{vItem.vehino}}-->
    <!--											<i class="tw-icon-platform" :class="[iconClassName(vItem.icon || '')]"></i>-->
    <!--										</div>-->
    <!--									</el-collapse-item>-->
    <!--								</el-scrollbar>-->
    <!--							</el-collapse>-->
    <!--						</div>-->
    <!--					</el-tab-pane>-->
    <!--					<el-tab-pane label="电子围栏" name="second">-->
    <!--						<div style="height: 372px;">-->
    <!--							<ul class="tw-list tw-list-border" style="height: 360px;">-->
    <!--								<el-scrollbar class="tw-scrollbar tw-y">-->
    <!--									<li class="tw-list-item" style="line-height:49px" :class="{'tw-text-error': item.type}" v-for="item in fanceList" :key="item.id" @click="handleAreaFanceChange(item)">-->
    <!--										<i class="tw-icon&#45;&#45;prefix el-icon-location-outline"></i>{{item.AREA_NAME}}-->
    <!--									</li>-->
    <!--								</el-scrollbar>-->
    <!--							</ul>-->
    <!--						</div>-->
    <!--					</el-tab-pane>-->
    <!--				</el-tabs>-->
    <!--			</div>-->
    <!--		</transition>-->
    <!--		<transition name="mapQueryPanel&#45;&#45;bottom">-->
    <!--			<div class="tw-map-query-panel" v-show="fanceQueryPanel" style="top: 60%;height: 200px;left: 40%;width: 400px;min-height: 200px;">-->
    <!--				<el-table v-loading="loading" :data="fanceData" height="200px" size="small" style="width: 100%">-->
    <!--					<el-table-column-->
    <!--							v-for="item in tableColumn"-->
    <!--							:key="item.prop"-->
    <!--							:prop="item.prop"-->
    <!--							:label="item.label"-->
    <!--							:width="item.width"-->
    <!--							:min-width="item['min-width']"-->
    <!--							:show-overflow-tooltip="item['show-overflow-tooltip']"-->
    <!--							:formatter="item.formatter"-->
    <!--							:resizable="item.resizable"-->
    <!--					></el-table-column>-->
    <!--				</el-table>-->
    <!--			</div>-->
    <!--		</transition>-->
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'underscore'
import moment from 'moment'
import { esriLoaders, mapLayerPath } from '../../assets/js/arcgis.comfig'
import { iconClassName } from '../../assets/js/util'
import $ from 'jquery'

export default {
  name: 'SpecificAreaMonitor',
  data() {
    return {
      map: {
        arcgisMap: null,
        levelMap: null,
        dialog: null,
        marMap: null
      },
      loading: false,
      mapQueryPanel: false,
      fanceQueryPanel: false,
      activeAreaNames: 0,
      areaList: [],
      vehicleList: [],
      activeName: 'first',
      fanceList: [],
      fanceData: [],
      table: {
        data: []
      },
      tabIndex: 0,
      currentPage: 1,
      tableRows: 10,
      total: 0,
      totalPages: 1,
      fanceLonding: false,
      areaLonding: false,
      areaname: '区域名称',
      tabactiveName: 'first'
    }
  },
  mounted() {
    this.$nextTick(() => {
      let _this = this
      this.getAreaList()
      this.mapQueryPanel = true
      try {
        esriLoaders([
          'esri/map',
          'esri/basemaps',
          'esri/layers/GraphicsLayer',
          'esri/lang',
          'dijit/TooltipDialog',
          'dijit/popup',
          'dojo/dom-style'
        ]).then(
          ([
            Map,
            basemaps,
            GraphicsLayer,
            esriLang,
            TooltipDialog,
            dijitPopup,
            domStyle
          ]) => {
            basemaps.mapLayerPath = mapLayerPath
            this.map.arcgisMap = new Map('arcgisMap', {
              basemap: 'mapLayerPath',
              spatialReference: {
                wkid: 4326
              },
              center: [120.197521, 30.24298],
              zoom: 6
            })
            _this.map.arcgisMap.infoWindow.resize(245, 125)
            _this.map.dialog = new TooltipDialog({
              style:
                'position: absolute; width: 350px; font: normal normal normal 10pt Helvetica;z-index:100'
            })
            _this.map.dialog.startup()
            this.map.arcgisMap.on('load', () => {
              this.map.levelMap = new GraphicsLayer({
                id: 'levelmap'
              })
              this.map.arcgisMap.addLayer(this.map.levelMap)
              this.map.marMap = new GraphicsLayer({
                id: 'marMap'
              })
              this.map.arcgisMap.addLayer(this.map.marMap)
              _this.map.marMap.on('click', evt => {
                $('.mapDialog').hide()
                dijitPopup.close(_this.map.dialog)
                let result = evt.graphic.attributes
                // let golsgj = $('<span class="">轨迹</span>').addClass('bottomRight golsgj').on('click', () => {
                // 	this.test(result)
                // });
                let t =
                  '<div class="mapDialog" style="">' +
                  '<div class="mapToolPanel">' +
                  '<TitleCircle><HyperCircle></HyperCircle>网约车-' +
                  result.vehino +
                  '<HyperCircle></HyperCircle><i class="iconfont icon-close"></i></TitleCircle>' +
                  '<div class="conent" style="padding-top: 20px;">' +
                  '<div class="rowbox clearfix">' +
                  '<div class="normBox" type="left" style="display: inline-block;">' +
                  '<div class="normTitle">速度</div>' +
                  '<div class="normInfo sbig">' +
                  '<span class="intensify">' +
                  result.speed +
                  '</span>KM/H' +
                  '</div>' +
                  '</div>' +
                  '<div class="normBox" type="right" style="display: inline-block;">' +
                  '<div class="normTitle">营运状态</div>' +
                  '<div class="normInfo sbig" style="font-size: 18px">' +
                  _this.fomarttype1(result.bizStatus) +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<div class="normBox" type="left">' +
                  '<div class="normTitle">GPS时间</div>' +
                  '<div class="normInfo sbig">' +
                  _this.fomarttime(result.dateTime) +
                  '</div>' +
                  '</div>' +
                  '<div class="normBox" type="left">' +
                  '<div class="normTitle">所属公司</div>' +
                  '<div class="normInfo sbig">' +
                  result.vehName +
                  '</div>' +
                  '</div>' +
                  '</div>' +
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
              })
            })
          }
        )
      } catch (e) {}
    })
  },
  computed: {
    tableColumn() {
      return [
        { prop: 'ABB_NAME', label: '平台名称', width: 80 },
        { prop: 'VEHICLENO', label: '车牌号码', width: 90 },
        {
          prop: 'IN_OUT',
          label: '类型',
          width: 50,
          'show-overflow-tooltip': true,
          formatter: this.fomarttype
        },
        {
          prop: 'POSITIONTIME',
          label: '定位时间',
          'min-width': 160,
          'show-overflow-tooltip': true,
          resizable: false,
          formatter: this.fomarttime
        }
      ]
    },
    filterDataList() {
      return _.filter(this.fanceData, (item, index) => {
        return (
          (this.currentPage - 1) * this.tableRows <= index &&
          this.currentPage * this.tableRows > index
        )
      })
    }
  },
  methods: {
    iconClassName,
    tableRowClassName({ row, rowIndex }) {
      if (row.AREA_NUM > row.AREA_AVG_NUM) {
        return 'danger-row'
      } else return ''
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    tabClick(t) {
      this.tabIndex = t.index
    },
    getAreaList() {
      axios
        .get('map/getArea', {
          baseURL: this.baseURL
        })
        .then(res => {
          let area = res.data,
            fance = res.data
          // _.each(res.data, item => {
          // 	if(item.TYPE == '0')
          // 		area.push(item)
          // 	else fance.push(item);
          // });
          this.fanceList = fance
          this.areaList = area
          // this.areaList = _.map(area, item => {
          // 	return {...item, loading: false};
          // })
        })
    },
    fomarttype(row, column, type) {
      if (type == '0') return '进'
      else if (type == '1') return '出'
    },
    fomarttype1(type) {
      if (type == '1') return '载客'
      else if (type == '2') return '接单'
      else if (type == '3') return '空驶'
      else if (type == '4') return '停运'
    },
    fomarttime(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    getVehicleList(item) {
      let areaId = item.AREA_ID
      let index = null
      _.each(this.areaList, (item, _index) => {
        if (item.AREA_ID === areaId) {
          this.areaname = item.AREA_NAME
          this.map.levelMap.clear()
          this.map.marMap.clear()
          index = _index
          let polygonArr = new Array() //多边形覆盖物节点坐标数组
          let zbs = item.AREA_ZB.split(';')
          for (let i = 0; i < zbs.length; i++) {
            let zb = zbs[i].split(',')
            if(item.INSERT_TYPE == '1')
              polygonArr.push([parseFloat(zb[0]) - 0.0049, parseFloat(zb[1]) + 0.0025])
            else polygonArr.push([parseFloat(zb[0]), parseFloat(zb[1])])
            if (i == 0) {
              this.map.arcgisMap.centerAndZoom(
                [parseFloat(zb[0]), parseFloat(zb[1])],
                9
              )
            }
          }
          this.addPolygon(item, polygonArr)
        }
      })
      this.areaLonding = true
      axios
        .get('map/getGet', {
          baseURL: this.baseURL,
          params: { comp_id: 'all', type: '1', areaid: areaId }
        })
        .then(res => {
          this.vehicleList = res.data
          _.map(this.vehicleList, item => {
            if (item.mdt_no == 'didi') {
              item.icon = 'icon-ddzc'
            } else if (item.mdt_no == 'shouyue') {
              item.icon = 'icon-sqzc'
            } else if (item.mdt_no == 'caocao') {
              item.icon = 'icon-cczc'
            } else if (item.mdt_no == 'wanshun') {
              item.icon = 'icon-wszc'
            } else if (item.mdt_no == 'shenzhou') {
              item.icon = 'icon-szzc'
            }
          })
          this.areaLonding = false
          _.each(res.data, item => {
            this.addmar(item)
          })
        })
    },
    handleAreaPanelChange(value) {
      if (value) this.getVehicleList(value)
      else this.vehicleList = []
    },
    handleMapQueryPanelDisplayClick() {
      this.mapQueryPanel = !this.mapQueryPanel
    },
    addPolygon(item, coordinate) {
      esriLoaders([
        'esri/graphic',
        'esri/InfoTemplate',
        'esri/geometry/Polygon',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color'
      ]).then(
        ([
          Graphic,
          InfoTemplate,
          Polygon,
          SimpleFillSymbol,
          SimpleLineSymbol,
          Color
        ]) => {
          let infoTemplate6 = new InfoTemplate()
          infoTemplate6.setTitle('区域名  ${AREA_NAME}')
          infoTemplate6.setContent('区域描述： ${AREA_MS}')

          var polygonJson = {
            rings: [coordinate],
            spatialReference: {
              wkid: 4326
            }
          }
          var polygon = new Polygon(polygonJson)
          this.map.levelMap.add(
            new Graphic(
              polygon,
              new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(
                  SimpleLineSymbol.STYLE_SOLID,
                  new Color([42, 242, 255, 0.35]),
                  1
                ),
                new Color([244, 67, 54, 0.2])
              ),
              item,
              infoTemplate6
            )
          )
        }
      )
    },
    addmar(item) {
      esriLoaders([
        'esri/geometry/Point',
        'esri/graphic',
        'esri/symbols/PictureMarkerSymbol'
      ]).then(([Point, Graphic, PictureMarkerSymbol]) => {
        let point = new Point({
          x: item.longi- 0.0049,
          y: item.lati+ 0.0025,
          spatialReference: {
            wkid: 4326
          }
        })
        let address = ''
        // if (item.mdt_no === 'didi') address = 'image/marker/dd.png'
        // else if (item.mdt_no === 'shenzhou') address = 'image/marker/sz.png'
        // else if (item.mdt_no === 'caocao') address = 'image/marker/cc.png'
        // else if (item.mdt_no === 'yidao') address = 'image/marker/yd.png'
        // else if (item.mdt_no === 'aa') address = 'image/marker/aa.png'
        // else if (item.mdt_no === 'yangguangchedao')
        //   address = 'image/marker/yg.png'
        // else if (item.mdt_no === 'wanshun') address = 'image/marker/ws.png'
        // else if (item.mdt_no === 'shouyue') address = 'image/marker/sy.png'
        // else if (item.mdt_no === 'TJHT') address = 'image/marker/xcyc.png'
        // else if (item.mdt_no === 'hhyc') address = 'image/marker/hhdc.png'
        // else if (item.mdt_no === 'tongcheng') address = 'image/marker/mzdc.png'
        // else if (item.mdt_no === 'dccx') address = 'image/marker/dccx.png'
        // else if (item.mdt_no === 'xiehua') address = 'image/marker/xhcx.png'
        // else if (item.mdt_no === 'xiangdao') address = 'image/marker/xdcx.png'
        // else if (item.mdt_no === 'weixing') address = 'image/marker/ycx.png'
        // else if (item.mdt_no === 'tmcx') address = 'image/marker/tmcx.png'
        // else if (item.mdt_no === 'gscx') address = 'image/marker/gscx.png'
        // else if (item.mdt_no === 'jbyy') address = 'image/marker/jbyy.png'
        // else if (item.mdt_no === 'lvcheng') address = 'image/marker/lcyc.png'
        // else if (item.mdt_no === 'T3') address = 'image/marker/t3cx.png'
        // else if (item.mdt_no === 'tfcx') address = 'image/marker/tfcx.png'
        // else if (item.mdt_no === 'tuotuo') address = 'image/marker/ttex.png'
        // else if (item.mdt_no === 'yicheng') address = 'image/marker/yccx.png'
        if (item.mdt_no === 'didi') { address = 'image/marker/dd.png'
        } else if (item.mdt_no === 'shenzhou') {address = 'image/marker/sz.png'
        } else if (item.mdt_no === 'caocao') {address = 'image/marker/cc.png'
        } else if (item.mdt_no === 'yidao') {address = 'image/marker/yd.png'
        } else if (item.mdt_no === 'aa') {address = 'image/marker/aa.png'
        } else if (item.mdt_no === 'yangguangchedao') {address = 'image/marker/yg.png'
        } else if (item.mdt_no === 'wanshun') {address = 'image/marker/ws.png'
        } else if (item.mdt_no === 'shouyue') {address = 'image/marker/sy.png'
        } else if (item.mdt_no === 'TJHT') {
          address = 'image/marker/xcyc.png'
        } else if (item.mdt_no === 'hhyc') {
          address = 'image/marker/hhdc.png'
        } else if (item.mdt_no === 'tongcheng') {
          address = 'image/marker/mzdc.png'
        } else if (item.mdt_no === 'dccx') {
          address = 'image/marker/dccx.png'
        } else if (item.mdt_no === 'xiehua') {
          address = 'image/marker/xhcx.png'
        } else if (item.mdt_no === 'xiangdao') {
          address = 'image/marker/xdcx.png'
        } else if (item.mdt_no === 'weixing') {
          address = 'image/marker/ycx.png'
        } else if (item.mdt_no === 'tmcx') {
          address = 'image/marker/tmcx.png'
        } else if (item.mdt_no === 'gscx') {
          address = 'image/marker/gscx.png'
        } else if (item.mdt_no === 'jbyy') {
          address = 'image/marker/jbyy.png'
        } else if (item.mdt_no === 'lvcheng') {
          address = 'image/marker/lcyc.png'
        } else if (item.mdt_no === 'T3') {
          address = 'image/marker/t3cx.png'
        } else if (item.mdt_no === 'tfcx') {
          address = 'image/marker/tfcx.png'
        } else if (item.mdt_no === 'tuotuo') {
          address = 'image/marker/ttex.png'
        } else if (item.mdt_no === 'yicheng') {
          address = 'image/marker/yccx.png'
        } else if (item.mdt_no === 'zhongche') {
          address = 'image/marker/zccx.png'
        } else if (item.mdt_no === 'jike') {
          address = 'image/marker/jksc.png'
        } else if (item.mdt_no === 'jishi') {
          address = 'image/marker/jsyc.png'
        }
        let p = PictureMarkerSymbol(this.baseURL + address, 28, 38).setOffset(
          14,
          19
        )
        this.map.marMap.add(new Graphic(point, p, item, ''))
      })
    },
    handleAreaFanceChange(item) {
      this.areaname = item.AREA_NAME
      this.map.levelMap.clear()
      this.map.marMap.clear()
      let polygonArr = new Array() //多边形覆盖物节点坐标数组
      let zbs = item.AREA_ZB.split(';')
      for (let i = 0; i < zbs.length; i++) {
        let zb = zbs[i].split(',')
        if(item.INSERT_TYPE == '1')
          polygonArr.push([parseFloat(zb[0]) - 0.0049, parseFloat(zb[1]) + 0.0025])
        else polygonArr.push([parseFloat(zb[0]), parseFloat(zb[1])])
        if (i == 0) {
          this.map.arcgisMap.centerAndZoom(
            [parseFloat(zb[0]), parseFloat(zb[1])],
            9
          )
        }
      }
      this.addPolygon(item, polygonArr)
      this.fanceLonding = true
      axios
        .get('map/getFance', {
          baseURL: this.baseURL,
          params: { areaid: item.AREA_ID }
        })
        .then(res => {
          this.fanceLonding = false
          this.fanceData = res.data
          this.total = res.data.length
        })
    },
    /* 当页数改变时触发 */
    handlePageSizeChange(page) {
      this.currentPage = page
    },
    fomartyytype(row, column, type) {
      if (type == '1') return '载客'
      else if (type == '2') return '接单'
      else if (type == '3') return '空驶'
      else if (type == '4') return '停运'
    }
  }
}
</script>

<style lang="scss" scoped>
$font-color: #374873;
$border-color: #69a7f7;
.tw-template-wrapper {
  position: relative;
}

.tw-template-wrapper1 {
  position: relative;
  /*overflow: hidden;*/
}

.tw-collapse {
  height: 100%;
}

.tw-map {
  &-tool {
    &-right {
      top: 40px;
      right: 0;
    }
  }
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
.tab-info {
  height: 100%;
  padding: 0 5px;
  overflow: auto;
}
.tw-icon-platform {
  margin-left: 5px;
  margin-right: 5px;
}
.tw-map-left-panel {
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  width: 300px;
  padding: 10px 10px 5px 5px;
}
.map-box {
  margin-left: 300px;
  height: calc(100% - 250px);
  border: 1px solid $border-color;
}
.table-box {
  position: relative;
  margin-left: 300px;
  height: 250px;
  border-left: 1px solid #cccccc;
  box-sizing: border-box;
}
.table-title {
  position: absolute;
  height: 30px;
  width: 200px;
  top: -30px;
  left: 0;
  background-color: $border-color;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  font-weight: 600;
}
.tab-title {
  display: inline-block;
  width: 90px;
}
.tab-content {
  display: inline-block;
  text-align: center;
  &.car {
    width: 50px;
  }
  &.waring {
    width: 55px;
  }
}
</style>
