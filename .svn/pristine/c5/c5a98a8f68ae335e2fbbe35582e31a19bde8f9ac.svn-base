<!--热里分布-->
<template>
  <div
    class="tw-template-wrapper"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    ref="wrapper"
    v-loading="loading"
  >
    <div class="tw-tips">
      <div :class="{ active: map.type === 'go' }" @click="handleGo">出发热力</div>
      <div :class="{ active: map.type === 'arrive' }" @click="handleArrive">到达热力</div>
    </div>
    <div class="map-box" ref="moveMap">
      <div id="arcgisMap" style="height:100%"></div>
    </div>
    <div class="tw-step">
      <el-steps :active=active>
        <el-step @click.native="handleStep(0)" title="0时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(1)"  title="2时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(2)"  title="4时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(3)"  title="6时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(4)"  title="8时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(5)"  title="10时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(6)"  title="12时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(7)"  title="14时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(8)"  title="16时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(9)"  title="18时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(10)"  title="20时" icon="el-icon-time"></el-step>
        <el-step @click.native="handleStep(11)"  title="22时" icon="el-icon-time"></el-step>
      </el-steps>
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
  name: 'rlfbMonitor',
  data() {
    return {
      map: {
        arcgisMap: null,
        levelMap: null,
        dialog: null,
        type: 'go'
      },
      loading: false,
      data: [],
      clickFlag: false,
      active: 1,
      rkttype: 0
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
            maxZoom: 6,
            minZoom: 4,
            spatialReference: {
              wkid: 4326
            },
            center: [120.290262812, 30.268283139],
            zoom: 4
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
            _this.map.arcgisMap.on('zoom-end', function(evt) {
              // if(evt.level>6) _this.map.arcgisMap.setZoom(6)
              // else  if(evt.level<4) _this.map.arcgisMap.setZoom(4)
              if (evt.level == 4) _this.mapUtil(0)
              else if (evt.level == 5) _this.mapUtil(1)
              else if (evt.level == 6) _this.mapUtil(2)
            })
            this.map.levelMap.on('click', function(evt) {
              // $('.mapDialog').show();
              // _this.map.arcgisMap.infoWindow.hide();
            })
            let scalebar = new Scalebar({
              map: this.map.arcgisMap,
              // "dual" displays both miles and kilmometers
              // "english" is the default, which displays miles
              // use "metric" for kilometers
              scalebarUnit: 'dual'
            })
            let hour = parseInt(new Date().getHours() /2)
            this.active = hour
            this.getGrid()
          })
        })
      } catch (e) {}
    })
  },
  methods: {
    handleStep(num) {
      if(parseInt(new Date().getHours() /2) < num) {
        this.$message.error('超出当前时间！')
        return
      }
      this.active = num
      this.getGrid()
    },
    // 出发热力
    handleGo() {
      this.map.type = 'go'
      this.rkttype = 0
      this.getGrid()
    },
    // 到达热力
    handleArrive() {
      this.map.type = 'arrive'
      this.rkttype = 1
      this.getGrid()
    },
    getGrid() {
      this.loading = true
      axios
        .get('map/getGrid', {
          baseURL: this.baseURL,
          params: {
            type: this.rkttype,
            time: this.active
          }
        })
        .then(res => {
          this.loading = false
          this.data = res.data
          this.mapUtil(0)
        })
    },
    mapUtil(lev) {
      this.map.levelMap.clear()
      let polygonArr = new Array()
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].GRID_LEV == lev) {
          polygonArr = new Array()
          let zbs = this.data[i].COORD.split(';')
          for (let j = 0; j < zbs.length; j++) {
            let zb = zbs[j].split(',')
            polygonArr.push([parseFloat(zb[0]) - 0.0049, parseFloat(zb[1]) + 0.0025])
          }
          this.addPolygon(this.data[i], polygonArr)
        }
      }
    },
    addPolygon(item, coordinate) {
      esriLoaders([
        'esri/graphic',
        'esri/InfoTemplate',
        'esri/geometry/Polygon',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color',
        'esri/symbols/TextSymbol',
        'esri/symbols/Font',
        'esri/geometry/Point'
      ]).then(
        ([Graphic, InfoTemplate, Polygon, SimpleFillSymbol, SimpleLineSymbol, Color, TextSymbol, Font, Point]) => {
          let infoTemplate6 = new InfoTemplate()
          infoTemplate6.setTitle('ID  ${GRID_ID}')
          infoTemplate6.setContent('区域描述： ${AREA_MS}')

          var polygonJson = {
            rings: [coordinate],
            spatialReference: {
              wkid: 4326
            }
          }
          var polygon = new Polygon(polygonJson)
          let pcolor = []
          let tcolor = {}
          if (item.OPERATEDEPART_CNT >= 1000) {
            pcolor = [226, 195, 226, 0.7]
            tcolor = { a: 1, r: 139, g: 7, b: 7 }
          } else if (item.OPERATEDEPART_CNT < 1000 && item.OPERATEDEPART_CNT >= 500) {
            pcolor = [242, 210, 202, 0.7]
            tcolor = { a: 1, r: 148, g: 207, b: 179 }
          } else if (item.OPERATEDEPART_CNT < 500 && item.OPERATEDEPART_CNT >= 100) {
            pcolor = [239, 209, 219, 0.7]
            tcolor = { a: 1, r: 188, g: 144, b: 193 }
          } else {
            pcolor = [195, 226, 235, 0.7]
            tcolor = { a: 1, r: 74, g: 156, b: 110 }
          }
          this.map.levelMap.add(
            new Graphic(
              polygon,
              new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([42, 242, 255, 0.35]), 1),
                new Color(pcolor)
              ),
              item,
              ''
            )
          )

          let textSymbol = new TextSymbol({
            text: item.OPERATEDEPART_CNT,
            color: tcolor,
            angle: 0,
            xoffset: 0,
            yoffset: -3,
            font: new Font('16', Font.STYLE_ITALIC, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, 'Courier')
          })
          let point = new Point(
            parseFloat(item.CENTER.split(',')[0]) - 0.0049,
            parseFloat(item.CENTER.split(',')[1]) + 0.0025
          )
          this.map.font = new Graphic(point, textSymbol)
          this.map.levelMap.add(this.map.font)
        }
      )
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
.tw-tips {
  position: fixed;
  top: 110px;
  right: 10px;
  z-index: 12222;
  div {
    display: inline-block;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    color: #ffffff;
    border: 1px solid #ffffff;
    cursor: pointer;
    background-color: rgba(105, 167, 247, 0.3);
    &.active,
    &:hover {
      background-color: rgba(105, 167, 247, 0.637);
    }
  }
}
.tw-step {
  position: absolute;
  bottom: 100px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
