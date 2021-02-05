<!--越区经营预警-->
<template>
  <div class="tw-template-wrapper" @mousemove="handleMouseMove" @mouseup="handleMouseUp" ref="wrapper">
    <div class="map-box" ref="moveMap">
      <div id="arcgisMap" style="height:100%"></div>
    </div>
    <div class="query-table" ref="moveTable">
      <div class="move-line" @mousedown="handleMouseDown"></div>
      <el-form :inline="true" size="mini" ref="queryBar">
        <el-form-item>
          <el-select v-model="query.company" clearable placeholder="平台名称">
            <el-option v-for="item in companyList" :label="item.ABB_NAME" :value="item.COMPANYID"></el-option>
          </el-select>
        </el-form-item>
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
          <el-button type="primary" @click="getOrder">查询</el-button>
        </el-form-item>
      </el-form>
      <div ref="queryPanel" v-loading="loading">
        <el-table :data="table.order" border size="mini" height="100%" @row-click="getHistor">
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
  name: 'CrossAreaManagementMonitor',
  data() {
    return {
      map: {
        arcgisMap: null,
        levelMap: null,
        dialog: null
      },
      loading: false,
      mapQueryPanel: false,
      tableType: false,
      query: {
        vehino: '',
        stime: '',
        etime: '',
        company: ''
      },
      table: {
        monitor: [],
        order: []
      },
      data: [],
      options: [],
      compname: '',
      clickFlag: false,
      move: {},
      companyList: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      let _this = this
      this.getCompSelect()
      this.mapQueryPanel = true
      this.query.stime = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD 00:00:00')
      this.query.etime = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD 24:00:00')
      this.query.vehino = this.$route.params.vhic
      const elements = this.$refs['queryBar'].$el
      templateHeight(this.$refs['queryPanel'], elements)
      this.getOrder()
      try {
        esriLoaders([
          'esri/map',
          'esri/basemaps',
          'esri/layers/GraphicsLayer',
          'esri/lang',
          'dijit/TooltipDialog',
          'dijit/popup',
          'dojo/dom-style'
        ]).then(([Map, basemaps, GraphicsLayer, esriLang, TooltipDialog, dijitPopup, domStyle]) => {
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
              style: 'position: absolute; width: 350px; font: normal normal normal 10pt Helvetica;z-index:100'
            })
            this.map.dialog.startup()
            this.map.levelMap = new GraphicsLayer({
              id: 'levelmap'
            })
            this.map.arcgisMap.addLayer(this.map.levelMap)
            _this.map.arcgisMap.on('zoom', function() {
              $('.mapDialog').hide()
              dijitPopup.close(_this.map.dialog)
            })
            _this.map.arcgisMap.on('pan-start', function() {
              $('.mapDialog').hide()
              dijitPopup.close(_this.map.dialog)
            })
            this.map.levelMap.on('click', function(evt) {
              // $('.mapDialog').show();
              // _this.map.arcgisMap.infoWindow.hide();
              let result = evt.graphic.attributes
              let time = '',address = ''
              if(evt.graphic.symbol.url.indexOf('start') >=0) {
                time = _this.fomarttime1(result.DEPTIME)
                address = result.DEPAREA
              }else {
                time = _this.fomarttime1(result.DESTTIME)
                address = result.DESTAREA
              }
              let t =
                '<div class="mapDialog" style="">' +
                '<div class="mapToolPanel">' +
                '<TitleCircle><HyperCircle></HyperCircle>网约车-' +
                result.VEHICLENO +
                '<HyperCircle></HyperCircle><i class="iconfont icon-close"></i></TitleCircle>' +
                '<div class="normBox" type="left">' +
                '<div class="normTitle">GPS时间</div>' +
                '<div class="normInfo sbig">' +
                 time +
                '</div>' +
                '</div>' +
                '<div class="normBox" type="left">' +
                '<div class="normTitle">所属公司</div>' +
                '<div class="normInfo sbig">' +
                result.ABB_NAME +
                '</div>' +
                '</div>' +
                  '<div class="normBox" type="left">' +
                  '<div class="normTitle">地址</div>' +
                  '<div class="normInfo sbig">' +
                  address +
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
        })
      } catch (e) {}
    })
  },
  methods: {
    getCompSelect() {
      axios.get('map/compSelect', { baseURL: this.baseURL }).then(res => {
        this.companyList = res.data
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
    },
    handleMouseDown(e) {
      console.info('最大高度', this.$refs.wrapper.clientHeight)
      console.info('地图高度', this.$refs.moveMap)
      console.info('表格高度', this.$refs.moveTable)

      this.clickFlag = true
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
                lable: res.data[i].VEHICLENO,
                value: res.data[i].VEHICLENO
              })
            }
            cb(vhicData)
          })
      }
    },
    getOrder() {
      axios
        .get('map/getOverRange', {
          baseURL: this.baseURL,
          params: {
            vhic: this.query.vehino,
            stime: this.fomarttime1(this.query.stime),
            etime: this.fomarttime1(this.query.etime),
            company: this.query.company
          }
        })
        .then(res => {
          this.table.order = res.data || []
        })
    },
    getHistor(row) {
      this.map.levelMap.clear()
      let line = []
      line.push([row.DEPLONGITUDE - 0.0049, row.DEPLATITUDE + 0.0025])
      line.push([row.DESTLONGITUDE - 0.0049, row.DESTLATITUDE + 0.0025])
      this.addline(line)
      this.addmar(row,0)
      this.addmar(row,1)
      this.map.arcgisMap.centerAndZoom([parseFloat(row.DEPLONGITUDE)- 0.0049, parseFloat(row.DEPLATITUDE) + 0.0025], 6)
      // axios
      //   .get('map/getHistor', {
      //     baseURL: this.baseURL,
      //     params: {
      //       stime: this.fomarttime1(row.DEPTIME),
      //       etime: this.fomarttime1(row.DESTTIME),
      //       vehi_no: row.VEHICLENO + '(' + row.ABB_NAME + ')'
      //     }
      //   })
      //   .then(res => {
      //     this.data = res.data.monitor || []
      //     // this.table.monitor = res.data.monitor || [];
      //     this.table.monitor = []
      //     this.map.levelMap.clear()
      //     if (res.data.monitor.length == 0) {
      //       this.$message({
      //         message: '车辆无轨迹！',
      //         type: 'warning'
      //       })
      //       return
      //     }
      //     let complist = this.unique(this.data, 'ABB_NAME')
      //     this.options = complist
      //     this.compname = complist[0].ABB_NAME
      //     this.historUtil()
      //   })

    },
    /**去除数组中重复数据**/
    unique(arr, type) {
      const res = new Map()
      return arr.filter(a => !res.has(a[type]) && res.set(a[type], 1))
    },
    /**根据查询后下拉框值确定表格及地图打点**/
    historUtil() {
      // this.map.levelMap.clear()
      // let vlist = []
      // _.map(this.data, item => {
      //   if (item.ABB_NAME == this.compname) {
      //     vlist.push(item)
      //   }
      // })
      // this.table.monitor = vlist || []
      // let line = []
      // for (let i = 0; i < vlist.length; i++) {
      //   line.push([vlist[i].LONGITUDE - 0.0049, vlist[i].LATITUDE + 0.0025])
      //   if (i == 0) {
      //     this.addmar(vlist[i], 0)
      //   } else if (i == vlist.length - 1) {
      //     this.addmar(vlist[i], 1)
      //   } else {
      //     if (vlist[i].BIZSTATUS == 1 || vlist[i].BIZSTATUS == 2) this.addmar(vlist[i], 2)
      //     else this.addmar(vlist[i], 3)
      //   }
      // }
      // this.addline(line)
      // if (vlist.length > 0) this.map.arcgisMap.centerAndZoom([vlist[0].LONGITUDE, vlist[0].LATITUDE], 6)
    },
    handleChangeClick() {
      this.tableType = !this.tableType
    },
    addmar(item, i) {
      esriLoaders(['esri/geometry/Point', 'esri/graphic', 'esri/symbols/PictureMarkerSymbol']).then(
        ([Point, Graphic, PictureMarkerSymbol]) => {
          // let infoTemplate7 = new InfoTemplate();
          // infoTemplate7.setTitle("所属平台  ${DEVICEID}");
          // infoTemplate7.setContent('<table> '
          // 		+'<tr><td><b>车牌号码:  ${LATITUDE}</b></td></tr>'
          // 		+'<tr><td><b>定位时间:  ${LATITUDE}</b></td></tr></table>'
          // );
          let p = null
          let point = null
          if (i == 0) {
            p = PictureMarkerSymbol(this.baseURL + 'image/histor/start.png', 35, 35).setOffset(0, 0)
            point = new Point({
              x: item.DEPLONGITUDE - 0.0049,
              y: item.DEPLATITUDE + 0.0025,
              spatialReference: {
                wkid: 4326
              }
            })
          } else if (i == 1) {
            p = PictureMarkerSymbol(this.baseURL + 'image/histor/end.png', 35, 35).setOffset(0, 0)
            point = new Point({
              x: item.DESTLONGITUDE - 0.0049,
              y: item.DESTLATITUDE + 0.0025,
              spatialReference: {
                wkid: 4326
              }
            })
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
        }
      )
    },
    addline(line) {
      esriLoaders(['esri/geometry/Polyline', 'esri/symbols/SimpleLineSymbol', 'esri/Color', 'esri/graphic']).then(
        ([Polyline, SimpleLineSymbol, Color, Graphic]) => {
          let polylineJson = { paths: [line], spatialReference: { wkid: 4326 } }
          let polyline = new Polyline(polylineJson)
          let symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([19, 242, 50, 1]), 2)
          symbol.markok = 'all'
          let grop = new Graphic(polyline, symbol)
          this.map.levelMap.add(grop)
        }
      )
    }
  },
  watch: {
    '$route.path': {
      handler(oldVal, newVal) {
        this.query.stime = moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD 00:00:00')
        this.query.etime = moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD 24:00:00')
        this.getOrder()
      }
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
    left: $tab-width;
  }
}
</style>
