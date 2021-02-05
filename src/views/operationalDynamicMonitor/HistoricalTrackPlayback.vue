<!--历史轨迹回放-->
<template>
  <div
    class="tw-template-wrapper"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    ref="wrapper"
  >
    <div class="map-box" ref="moveMap">
      <div id="arcgisMap" style="height:100%"></div>
    </div>
    <div class="query-table" ref="moveTable">
      <div class="move-line" @mousedown="handleMouseDown"></div>
      <div class="tw-tab one" :class="{active:activeFlagA}" @click="changeA">定位</div>
      <div class="tw-tab two" :class="{active:activeFlagB}" @click="changeB">订单</div>
      <el-form :inline="true" size="mini" ref="queryBar">
        <el-form-item>
          <el-autocomplete
            v-model="query.vehino"
            :fetch-suggestions="queryVehicleSearch"
            placeholder="车牌号码"
            :trigger-on-focus="false"
            clearable
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="datetime" v-model="query.stime" placeholder="开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="datetime" v-model="query.etime" placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
        </el-form-item>
				<el-form-item>
					<el-button type="primary" v-show="buttonShow" @click="trackPlay">播放</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-show="stopShow" @click="trackPause">暂停</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-show="startShow" @click="trackContinues">继续</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-show="buttonShow" @click="trackStop">停止</el-button>
				</el-form-item>
        <!--<el-form-item>-->
          <!--<el-select v-model="compname" placeholder="请选择" @change="historUtil" v-show="displayComp">-->
            <!--<el-option v-for="item in options" :label="item.ABB_NAME" :value="item.ABB_NAME"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      </el-form>
      <div ref="queryPanel" v-show="activeFlagA" v-loading="loading">
        <el-table :data="table.monitor" border size="mini" height="100%">
          <el-table-column prop="ABB_NAME" label="平台名称" width="120"></el-table-column>
          <el-table-column prop="VEHICLENO" label="车牌号码" width="100"></el-table-column>
          <el-table-column prop="LONGITUDE" label="经度" width="120"></el-table-column>
          <el-table-column prop="LATITUDE" label="纬度" width="120"></el-table-column>
          <el-table-column prop="SPEED" label="速度(KM/H)" width="100"></el-table-column>
          <el-table-column prop="DIRECTION" label="方向" width="100" :formatter="fomartfx"></el-table-column>
          <el-table-column prop="ELEVATION" label="海拔高度(M)" width="100"></el-table-column>
          <el-table-column prop="BIZSTATUS" label="状态" width="100" :formatter="fomarttype"></el-table-column>
          <el-table-column prop="POSITIONTIME" label="定位时间" width="160" :formatter="fomarttime"></el-table-column>
          <el-table-column prop="ORDERID" label="订单编号" min-width="120"></el-table-column>
        </el-table>
      </div>
      <div ref="queryPanelB" v-show="activeFlagB" v-loading="loading">
        <el-table :data="table.order" border size="mini" height="100%">
          <el-table-column prop="ABB_NAME" label="平台名称" width="120"></el-table-column>
          <el-table-column prop="ORDERID" label="订单编号" width="120"></el-table-column>
          <el-table-column prop="DRIVERNAME" label="驾驶员姓名" width="120"></el-table-column>
          <el-table-column prop="LICENSEID" label="驾驶证号" width="160"></el-table-column>
          <el-table-column prop="VEHICLENO" label="车辆号牌" width="120"></el-table-column>
          <el-table-column prop="DEPAREA" label="上车地点" width="260"></el-table-column>
          <el-table-column prop="DEPTIME" label="上车时间" width="160" :formatter="fomarttime"></el-table-column>
          <el-table-column prop="DESTAREA" label="下车地点" width="160"></el-table-column>
          <el-table-column prop="DESTTIME" label="下车时间" width="160" :formatter="fomarttime"></el-table-column>
          <el-table-column prop="FACTPRICE" label="实收金额(元)" width="100"></el-table-column>
          <el-table-column prop="DRIVETIME" label="载客时间（秒）" width="110"></el-table-column>
          <el-table-column prop="DRIVEMILE" label="载客里程（千米）" min-width="140"></el-table-column>
        </el-table>
      </div>
    </div>
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
  name: 'HistoricalTrackPlayback',
  data() {
    return {
      map: {
        arcgisMap: null,
        levelMap: null,
        dialog: null,
				motionMap: null,
				lineMap: null
      },
      loading: false,
      mapQueryPanel: false,
      tableType: false,
      query: {
        vehino: '',
        stime: '',
        etime: ''
      },
      table: {
        monitor: [],
        order: [],
        match: []
      },
      data: [],
      activeFlagA: true,
      activeFlagB: false,
      activeFlagC:false,
      options: [],
      compname: '',
      displayComp: false,
      clickFlag: false,
      move: {},
      historList: 0,
      historInterval: null,
			motion: null,
			lineList: [],
			startShow: false,
			stopShow: false,
			buttonShow: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      let _this = this
      this.mapQueryPanel = true
      this.query.stime = this.fomarttime1(
        new Date(new Date().getTime() - 1000 * 60 * 60 * 2)
      )
      this.query.etime = this.fomarttime1(new Date())
      // this.query.vehino = this.$route.params.vhic
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements)
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
              zoom: 13
            })
            this.map.arcgisMap.on('load', () => {
              this.map.arcgisMap.infoWindow.resize(100, 125)
              this.map.dialog = new TooltipDialog({
                style:
                  'position: absolute; width: 350px; font: normal normal normal 10pt Helvetica;z-index:100'
              })
              this.map.dialog.startup()
							this.map.lineMap = new GraphicsLayer({
								id: 'lineMap'
							})
							this.map.arcgisMap.addLayer(this.map.lineMap)
              this.map.levelMap = new GraphicsLayer({
                id: 'levelmap'
              })
              this.map.arcgisMap.addLayer(this.map.levelMap)
							this.map.motionMap = new GraphicsLayer({
								id: 'motionMap'
							})
							this.map.arcgisMap.addLayer(this.map.motionMap)
              _this.map.arcgisMap.on('zoom', function() {
                $('.mapDialog').hide()
                dijitPopup.close(_this.map.dialog)
              })
              _this.map.arcgisMap.on('pan-start', function() {
                $('.mapDialog').hide()
                dijitPopup.close(_this.map.dialog)
              })
              this.getVehi_no()
              this.map.levelMap.on('click', function(evt) {
                // $('.mapDialog').show();
                // _this.map.arcgisMap.infoWindow.hide();
                let result = evt.graphic.attributes
                let t =
                  '<div class="mapDialog" style="">' +
                  '<div class="mapToolPanel">' +
                  '<TitleCircle><HyperCircle></HyperCircle>网约车-' +
                  result.VEHICLENO +
                  '<HyperCircle></HyperCircle><i class="iconfont icon-close"></i></TitleCircle>' +
                  '<div class="conent" style="padding-top: 20px;">' +
                  '<div class="rowbox clearfix">' +
                  '<div class="normBox" type="left" style="display: inline-block;">' +
                  '<div class="normTitle">速度</div>' +
                  '<div class="normInfo sbig">' +
                  '<span class="intensify">' +
                  result.SPEED +
                  '</span>KM/H' +
                  '</div>' +
                  '</div>' +
                  '<div class="normBox" type="right" style="display: inline-block;">' +
                  '<div class="normTitle">营运状态</div>' +
                  '<div class="normInfo sbig" style="font-size: 18px">' +
                  _this.fomarttype1(result.BIZSTATUS) +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<div class="normBox" type="left">' +
                  '<div class="normTitle">GPS时间</div>' +
                  '<div class="normInfo sbig">' +
                  _this.fomarttime1(result.POSITIONTIME) +
                  '</div>' +
                  '</div>' +
                  '<div class="normBox" type="left">' +
                  '<div class="normTitle">所属公司</div>' +
                  '<div class="normInfo sbig">' +
                  result.ABB_NAME +
                  '</div>' +
                  '</div>' +
                  '<div class="normBox" type="left">' +
                  '<div class="normTitle">订单编号</div>' +
                  '<div class="normInfo sbig">' +
                  result.ORDERID +
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
      if (!this.tableType)
        return [
          { prop: 'ABB_NAME', label: '平台名称', width: 120 },
          { prop: 'VEHICLENO', label: '车牌号码', width: 100 },
          { prop: 'LONGITUDE', label: '经度', width: 120 },
          { prop: 'LATITUDE', label: '纬度', width: 120 },
          { prop: 'SPEED', label: '速度(KM/H)', width: 100 },
          {
            prop: 'DIRECTION',
            label: '方向',
            width: 100,
            'show-overflow-tooltip': true,
            formatter: this.fomartfx
          },
          { prop: 'ELEVATION', label: '海拔高度(M)', width: 100 },
          {
            prop: 'BIZSTATUS',
            label: '状态',
            width: 100,
            'show-overflow-tooltip': true,
            formatter: this.fomarttype
          },
          {
            prop: 'POSITIONTIME',
            label: '定位时间',
            width: 160,
            'show-overflow-tooltip': true,
            formatter: this.fomarttime
          },
          {
            prop: 'ORDERID',
            label: '订单编号',
            'min-width': 120,
            resizable: false
          }
        ]
      else
        return [
          { prop: 'ABB_NAME', label: '平台名称', width: 120 },
          { prop: 'ORDERID', label: '订单编号', width: 120 },
          { prop: 'DRIVERNAME', label: '驾驶员姓名', width: 120 },
          { prop: 'LICENSEID', label: '驾驶证号', width: 160 },
          { prop: 'VEHICLENO', label: '车辆号牌', width: 120 },
          { prop: 'DEPAREA', label: '上车地点', width: 260 },
          {
            prop: 'DEPTIME',
            label: '上车时间',
            width: 160,
            formatter: this.fomarttime
          },
          { prop: 'DESTAREA', label: '下车地点', width: 160 },
          {
            prop: 'DESTTIME',
            label: '下车时间',
            width: 160,
            formatter: this.fomarttime
          },
          { prop: 'FACTPRICE', label: '实收金额(元)', width: 100 },
          { prop: 'DRIVETIME', label: '载客时间（秒）', width: 110 },
          { prop: 'DRIVEMILE', label: '载客里程（千米）', 'min-width': 140 }
        ]
    }
  },
  methods: {
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
    },
    handleMouseDown(e) {
      console.info('最大高度', this.$refs.wrapper.clientHeight)
      console.info('地图高度', this.$refs.moveMap)
      console.info('表格高度', this.$refs.moveTable)

      this.clickFlag = true
    },
    changeA() {
      this.activeFlagA = true
      this.activeFlagB = false
      this.activeFlagC = false
    },
    changeB() {
      this.activeFlagA = false
      this.activeFlagB = true
      this.activeFlagC = false
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanelB'], elements)
    },
    fomarttime(row, column, date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    fomarttime1(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    fomarttype(row, column, type) {
      if (type == '1') return '载客'
      else if (type == '2') return '接单'
      else if (type == '3') return '空驶'
      else if (type == '4') return '停运'
    },
    fomarttype1(type) {
      if (type == '1') return '载客'
      else if (type == '2') return '接单'
      else if (type == '3') return '空驶'
      else if (type == '4') return '停运'
    },
    fomartfx(row, column, type) {
      if (type == 0 || type == 360) return '正北'
      else if (type == 90) return '正东'
      else if (type == 180) return '正南'
      else if (type == 270) return '正西'
      else if (type > 0 && type < 90) return '东北'
      else if (type > 90 && type < 180) return '东南'
      else if (type > 180 && type < 270) return '西南'
      else if (type > 270 && type < 360) return '西北'
    },
    iconClassName,
    handleMapQueryPanelDisplayClick() {
      this.mapQueryPanel = !this.mapQueryPanel
    },
    queryVehicleSearch(query, cb) {
      if (query.length < 3) cb([])
      else {
        axios
          .get('map/getVhic', {
            baseURL: this.baseURL,
            params: { vhic: this.query.vehino }
          })
          .then(res => {
            let vhicData = []
            for (let i = 0; i < res.data.length; i++) {
              vhicData.push({
                id: res.data[i].VEHICLENO,
                lable: res.data[i].VEHICLENO+'('+res.data[i].ABB_NAME+')',
                value: res.data[i].VEHICLENO+'('+res.data[i].ABB_NAME+')'
              })
            }
            cb(vhicData)
          })
      }
    },
    handleQueryClick() {
			this.buttonShow = false
      const { stime, etime, vehino } = this.query
      if (stime === '') {
        this.$message({
          message: '开始时间不能为空！',
          type: 'warning'
        })
        return
      }
      if (etime === '') {
        this.$message({
          message: '结束时间不能为空！',
          type: 'warning'
        })
        return
      }
      if (vehino === '') {
        this.$message({
          message: '车牌号码不能为空！',
          type: 'warning'
        })
        return
      }
      // this.displayComp = false
      this.loading = true
      axios
        .get('map/getHistor', {
          baseURL: this.baseURL,
          params: {
            stime: this.fomarttime1(stime),
            etime: this.fomarttime1(etime),
            vehi_no: vehino
          }
        })
        .then(res => {
          this.loading = false
          this.data = res.data.monitor || []
          // this.table.monitor = res.data.monitor || [];
          this.table.monitor = []
          this.table.order = res.data.order || []
          this.table.match = res.data.match || []
          this.map.levelMap.clear()
          if (res.data.monitor.length == 0) {
            this.$message({
              message: '车辆无轨迹！',
              type: 'warning'
            })
            return
          }
					this.buttonShow = true
          // let complist = this.unique(this.data, 'ABB_NAME')
          // this.options = complist
          // this.compname = complist[0].ABB_NAME
          this.historUtil()
          // let line = [];
          // for (let i = 0; i < this.table.monitor.length; i++) {
          // 	line.push([this.table.monitor[i].LONGITUDE-0.0049, this.table.monitor[i].LATITUDE+0.0025])
          // 	if (i == 0) {
          // 		this.addmar(this.table.monitor[i], 0)
          // 	} else if (i == this.table.monitor.length - 1) {
          // 		this.addmar(this.table.monitor[i], 1)
          // 	} else {
          // 		if(this.table.monitor[i].BIZSTATUS == 1 || this.table.monitor[i].BIZSTATUS == 2)
          // 			this.addmar(this.table.monitor[i], 2)
          // 		else this.addmar(this.table.monitor[i], 3)
          // 	}
          // }
          // this.addline(line);
          // if(this.table.monitor.length>0)
          // 	this.map.arcgisMap.centerAndZoom([this.table.monitor[0].LONGITUDE, this.table.monitor[0].LATITUDE], 6)
        })
    },
    /**去除数组中重复数据**/
    unique(arr, type) {
      const res = new Map()
      return arr.filter(a => !res.has(a[type]) && res.set(a[type], 1))
    },
    /**根据查询后下拉框值确定表格及地图打点**/
    historUtil() {
      this.map.levelMap.clear()
			this.map.motionMap.clear()
			this.map.lineMap.clear()
      this.displayComp = true
      let vlist = []
      _.map(this.data, item => {
        if(vlist.length>0){
          if(item.LONGITUDE!=vlist[vlist.length-1].LONGITUDE&&item.LATITUDE!=vlist[vlist.length-1].LATITUDE){
            vlist.push(item)
          }
        }else{
          vlist.push(item)
        }
      })
      this.table.monitor = vlist || []
      let line = []
			let dw = 0;
      for (let i = 0; i < vlist.length; i++) {
        line.push([vlist[i].LONGITUDE - 0.0049, vlist[i].LATITUDE + 0.0025])
				if(i ==0 ){
					dw = 0
				}else if(i == vlist.length - 1){
					dw = 1
				}else if(vlist[i].BIZSTATUS == 1 || vlist[i].BIZSTATUS == 2){
					dw = 2
				}else{
					dw = 3
				}
      this.addmar(vlist[i],dw)
      }
      // this.historMar(0)
			this.lineList = line;
      this.addline(line)
      if (vlist.length > 0){
        this.map.arcgisMap.centerAndZoom(
            [vlist[0].LONGITUDE, vlist[0].LATITUDE],
            6
        )
        // this.historInterval = setInterval(this.historMar,300)
      }
    },
    historMar() {
			this.addMotionMar(this.table.monitor[this.historList],this.historList)
        if (this.historList == 0) {
          this.addmar(this.table.monitor[this.historList],0)
        } else if (this.historList == this.table.monitor.length - 1) {
          this.addmar(this.table.monitor[this.historList],1)
        } else {
          if(this.table.monitor[this.historList].BIZSTATUS == 1 || this.table.monitor[this.historList].BIZSTATUS == 2)
          this.addmar(this.table.monitor[this.historList],2)
          else this.addmar(this.table.monitor[this.historList],3)
        }
      this.historList += 1
      if(this.table.monitor.length<=this.historList){
        clearInterval(this.historInterval)
      }
    },
    handleChangeClick() {
      this.tableType = !this.tableType
    },
		addMotionMar(item,i) {
			esriLoaders([
				'esri/geometry/Point',
				'esri/graphic',
				'esri/symbols/PictureMarkerSymbol'
			]).then(([Point, Graphic, PictureMarkerSymbol]) => {
				// let infoTemplate7 = new InfoTemplate();
				// infoTemplate7.setTitle("所属平台  ${DEVICEID}");
				// infoTemplate7.setContent('<table> '
				// 		+'<tr><td><b>车牌号码:  ${LATITUDE}</b></td></tr>'
				// 		+'<tr><td><b>定位时间:  ${LATITUDE}</b></td></tr></table>'
				// );
				this.map.motionMap.clear()
				if(i >= this.table.monitor.length-1)	return;
				this.motion = new Point({
					x: item.LONGITUDE - 0.0049,
					y: item.LATITUDE + 0.0025,
					spatialReference: {
						wkid: 4326
					}
				})
				let p= PictureMarkerSymbol(
						this.baseURL + 'image/histor/car.png',
						40,
						20
				).setOffset(0, 0).setAngle(item.DIRECTION - 90)
				let grap = new Graphic(this.motion, p, item, '')
				this.map.motionMap.add(grap)
			})
		},
    addmar(item, i) {
      esriLoaders([
        'esri/geometry/Point',
        'esri/graphic',
        'esri/symbols/PictureMarkerSymbol'
      ]).then(([Point, Graphic, PictureMarkerSymbol]) => {
        // let infoTemplate7 = new InfoTemplate();
        // infoTemplate7.setTitle("所属平台  ${DEVICEID}");
        // infoTemplate7.setContent('<table> '
        // 		+'<tr><td><b>车牌号码:  ${LATITUDE}</b></td></tr>'
        // 		+'<tr><td><b>定位时间:  ${LATITUDE}</b></td></tr></table>'
        // );
        let point = new Point({
          x: item.LONGITUDE - 0.0049,
          y: item.LATITUDE + 0.0025,
          spatialReference: {
            wkid: 4326
          }
        })
        let p = null
        if (i == 0) {
          p = PictureMarkerSymbol(
            this.baseURL + 'image/histor/start.png',
            35,
            35
          ).setOffset(0, 0)
        } else if (i == 1) {
          p = PictureMarkerSymbol(
            this.baseURL + 'image/histor/end.png',
            35,
            35
          ).setOffset(0, 0)
        } else if (i == 2) {
          p = PictureMarkerSymbol(this.baseURL + 'image/histor/gjz.png', 25, 25)
            .setOffset(0, 0)
            .setAngle(item.DIRECTION - 90)
            .setOffset(0, 0)
        } else {
          p = PictureMarkerSymbol(this.baseURL + 'image/histor/gj.png', 25, 25)
            .setAngle(item.DIRECTION - 90)
            .setOffset(0, 0)
        }
        let grap = new Graphic(point, p, item, '')
        this.map.levelMap.add(grap)
      })
    },
    addline(line) {
      esriLoaders([
        'esri/geometry/Polyline',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color',
        'esri/graphic'
      ]).then(([Polyline, SimpleLineSymbol, Color, Graphic]) => {
        let polylineJson = { paths: [line], spatialReference: { wkid: 4326 } }
        let polyline = new Polyline(polylineJson)
        let symbol = new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([19, 242, 50, 1]),
          2
        )
        symbol.markok = 'all'
        let grop = new Graphic(polyline, symbol)
        this.map.lineMap.add(grop)
      })
    },
		/**轨迹播放**/
		trackPlay() {
			this.map.levelMap.clear()
			this.map.lineMap.clear()
			this.map.motionMap.clear()
			this.startShow = false
			this.stopShow = true
			clearInterval(this.historInterval)
			this.historList = 0
			this.addline(this.lineList)
			this.historMar(0)
			this.historInterval = setInterval(this.historMar,300)
		},
		/**轨迹暂停**/
		trackPause() {
			this.startShow = true
			this.stopShow = false
			clearInterval(this.historInterval)
		},
		/**轨迹继续**/
		trackContinues() {
			this.startShow = false
			this.stopShow = true
			this.historInterval = setInterval(this.historMar,300)
		},
		/**轨迹停止**/
		trackStop() {
			this.map.levelMap.clear()
			this.map.motionMap.clear()
			this.map.lineMap.clear()
			this.startShow = false
			this.stopShow = false
			clearInterval(this.historInterval)
			this.historList = 0
			let dw = 0;
			for (let i = 0; i < this.table.monitor.length; i++) {
				if(i ==0 ){
					dw = 0
				}else if(i >= this.table.monitor.length-1){
					dw = 1
				}else if(this.table.monitor[i].BIZSTATUS == 1 || this.table.monitor[i].BIZSTATUS == 2){
					dw = 2
				}else{
					dw = 3
				}
				this.addline(this.lineList)
				this.addmar(this.table.monitor[i],dw)
			}
		},
    getVehi_no() {
      const {vehi_no} = this.$route.params
      console.log('vehi:',vehi_no)
      if(!vehi_no) return
      this.query.vehino = vehi_no
      this.handleQueryClick()
    }
  },
  watch: {
    '$route.path'() {
      this.getVehi_no()
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
    height: 280px;
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
  height: calc(100% - 250px);
}
.query-table {
  position: relative;
  height: 250px;
  border-top: 1px solid #cccccc;
  padding: 5px;
  box-sizing: border-box;
}
$tab-width: 150px;
$tab-height: 30px;
.tw-tab {
  position: absolute;
  top: -$tab-height;
  height: $tab-height;
  background-color: #ffffff;
  box-sizing: border-box;
  border-right: 1px solid $border-color;
  border-top: 1px solid $border-color;
  width: $tab-width;
  color: $border-color;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.5s ease;
  cursor: pointer;
  border-bottom: 1px #cccccc;
  &.active {
    background-color: $border-color;
    color: #ffffff;
    border-bottom: none;
  }
  &.one {
  }
  &.two {
    left: 155px;
  }
  &.three {
    left: 305px;
  }
}
</style>
