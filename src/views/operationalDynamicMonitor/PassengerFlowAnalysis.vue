<!--
 * @Descripttion: 乘客流向分析
 * @version: 
 * @Author: CFQ
 * @Date: 2020-06-02 15:05:49
 * @LastEditors: CFQ
 * @LastEditTime: 2020-06-05 16:57:06
-->
<template>
  <div class="tw-template-wrapper">
    <div class="tw-map-left-panel">
      <el-tabs class="tw-template-height" type="card" v-model="activeName" :stretch="true" @tab-click="tabClick">
        <el-tab-pane label="异常订单出发区域" name="first" v-loading="tab.loading">
          <div class="tab-info">
            <div class="tw-date1">
              <span>开始时间：</span>
              <el-date-picker class="tw-date" v-model="tab.qddate" type="date" placeholder="开始日期" @change="getpassengerFlowTo(0)">
              </el-date-picker><br>
              <span>结束时间：</span>
              <el-date-picker class="tw-date" v-model="tab.qdedate" type="date" placeholder="结束日期" @change="getpassengerFlowTo(0)">
              </el-date-picker>
            </div>
            <div v-for="(item, index) in tab.qddata" :key="'qddata_' + index">
              <div class="tw-item" @click="getpassengerFlowToDetailed(0, item)">
                <div class="tw-rank">{{ index + 1 }}</div>
                <div class="tw-title" :class="{ active: index == tab.index }" @click="handleTitle(index)">
                  {{ item.AREA_NAME }}({{ item.WYC_NUMBER }})
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="异常订单到达区域" name="second" v-loading="tab.loading">
          <div class="tab-info">
            <div class="tw-date1">
              <span>开始时间：</span>
              <el-date-picker class="tw-date" v-model="tab.zddate" type="date" placeholder="选择日期" @change="getpassengerFlowTo(1)">
              </el-date-picker><br>
              <span>结束时间：</span>
              <el-date-picker class="tw-date" v-model="tab.zdedate" type="date" placeholder="结束日期" @change="getpassengerFlowTo(1)">
              </el-date-picker>
            </div>
            <div v-for="(item, index) in tab.zddata" :key="'zddata_' + index">
              <div class="tw-item" @click="getpassengerFlowToDetailed(1, item)">
                <div class="tw-rank">{{ index + 1 }}</div>
                <div class="tw-title" :class="{ active: index == tab.index }" @click="handleTitle(index)">
                  {{ item.AREA_NAME }}({{ item.WYC_NUMBER }})
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="map-box" id="arcgisMap"></div>
    <div class="tw-map-tool ">
      <el-tabs type="card" class="tw-item" @tab-click="clickDisItem">
        <el-tab-pane v-for="(item, index) in disList" :key="'dis_' + index" :name="item.label">
          <span slot="label" class="my-pane">
            <span>{{ item.label }}</span>
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tw-tips">
      <div class="tw-bg" ref="tip">
        <div><span>异常订单出发区域</span></div>
        <div><span>异常订单到达区域</span></div>
      </div>
      <div class="tw-tl" @click="handleTipsShow()">图例</div>
    </div>
    <!--<div class="tw-right-panel">-->
      <!--<div class="tw-title">异常订单数排名</div>-->
      <!--<div class="tw-content">-->
        <!--<div class="tw-item">1.异常订单数排名</div>-->
        <!--<div class="tw-item">1.异常订单数排名</div>-->
        <!--<div class="tw-item">1.异常订单数排名</div>-->
        <!--<div class="tw-item">1.异常订单数排名</div>-->
        <!--<div class="tw-item">1.异常订单数排名</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import { esriLoaders, mapLayerPath } from '../../assets/js/arcgis.comfig'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'PassengerFlowAnalysis',
  data() {
    return {
      map: {
        arcgisMap: null,
        levelMap: null,
        dialog: null
      },
      activeName: 'first',
      tab: {
        qddate: '',
        qdedate: '',
        zddate: '',
        zdedate: '',
        qddata: [],
        zddata: {},
        loading: false,
        index: 0
      },
      name: '全  部',
      tabName: 0,
      disList: [
        { label: '全  部' },
        { label: '上城区' },
        { label: '下城区' },
        { label: '江干区' },
        { label: '拱墅区' },
        { label: '西湖区' },
        { label: '滨江区' },
        { label: '萧山区' },
        { label: '余杭区' },
        { label: '富阳区' },
        { label: '临安区' }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tab.qddate = moment(new Date(new Date().getTime() - 1000 * 60 * 60 * 24)).format('YYYY-MM-DD')
      this.tab.zddate = moment(new Date(new Date().getTime() - 1000 * 60 * 60 * 24)).format('YYYY-MM-DD')
      this.tab.qdedate = moment(new Date(new Date().getTime() - 1000 * 60 * 60 * 24)).format('YYYY-MM-DD')
      this.tab.zdedate = moment(new Date(new Date().getTime() - 1000 * 60 * 60 * 24)).format('YYYY-MM-DD')
      try {
        esriLoaders([
          'esri/map',
          'esri/basemaps',
          'esri/layers/GraphicsLayer',
          'dijit/TooltipDialog',
          'esri/dijit/Scalebar'
        ]).then(([Map, basemaps, GraphicsLayer, TooltipDialog, Scalebar]) => {
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
            this.getpassengerFlowTo(0)
            // this.map.arcgisMap.infoWindow.resize(100, 125)
            this.map.dialog = new TooltipDialog({
              style: 'position: absolute; width: 500px; font: normal normal normal 10pt Helvetica;z-index:100'
            })
            this.map.dialog.startup()
            this.map.levelMap = new GraphicsLayer({
              id: 'levelmap'
            })
            this.map.arcgisMap.addLayer(this.map.levelMap)
            new Scalebar({
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
    // 区域 点击事件
    clickDisItem(e) {
      this.name = e.name
      this.getpassengerFlowTo(1)
    },
    handleTitle(index) {
      this.tab.index = index
    },
    tabClick(tabs) {
      if (tabs.name == 'first') {
        this.tabName = 0
        this.getpassengerFlowTo(0)
      } else {
        this.tabName = 1
        this.getpassengerFlowTo(1)
      }
      this.tab.index = 0
    },
    handleTipsShow() {
      if (this.$refs.tip.offsetWidth > 0) this.$refs.tip.style.width = '0'
      else this.$refs.tip.style.width = '220px'
    },
    getpassengerFlowTo(type) {
      let stime = '',etime = ''
      if (this.tabName == 0){
        stime = moment(this.tab.qddate).format('YYYY-MM-DD')
        etime = moment(this.tab.qdedate).format('YYYY-MM-DD')
      }
      else{
        stime = moment(this.tab.zddate).format('YYYY-MM-DD')
        etime = moment(this.tab.zdedate).format('YYYY-MM-DD')
      }
      this.tab.loading = true
        axios
            .get('map/passengerFlowTo', {
              baseURL: this.baseURL,
              params: {
                type: this.tabName,
                stime: stime,
                etime: etime,
                area: this.name
              }
            })
            .then(res => {
              console.log(res.data)
              if (this.tabName == 0) this.tab.qddata = res.data
              else this.tab.zddata = res.data
              if (res.data.length > 0) {
                if(type == 1) {
                  this.map.levelMap.clear()
                  let polygonArr = new Array()
                  for (let i = 0; i < res.data.length; i++) {
                    res.data[i].WYC_COUNT = res.data[i].WYC_NUMBER
                    polygonArr = new Array()
                    let zbs = res.data[i].AREA_COORDINATES.split(';')
                    for (let j = 0; j < zbs.length; j++) {
                      let zb = zbs[j].split(',')
                      polygonArr.push([parseFloat(zb[0]) - 0.0049, parseFloat(zb[1]) + 0.0025])
                    }
                    this.addPolygon(this.tabName, res.data[i], polygonArr)
                  }
                }else {
                  this.getpassengerFlowToDetailed(this.tabName, res.data[0])
                }
              }
              this.tab.loading = false
            })

    },
    getpassengerFlowToDetailed(type, item) {
      this.map.levelMap.clear()
      this.map.arcgisMap.centerAndZoom(
        [parseFloat(item.CENTER.split(',')[0]), parseFloat(item.CENTER.split(',')[1])],
        5
      )
      let stime = '',etime = ''
      if (this.tabName == 0){
        stime = moment(this.tab.qddate).format('YYYY-MM-DD')
        etime = moment(this.tab.qdedate).format('YYYY-MM-DD')
      }
      else{
        stime = moment(this.tab.zddate).format('YYYY-MM-DD')
        etime = moment(this.tab.zdedate).format('YYYY-MM-DD')
      }
      this.tab.loading = true
      let jwd = item.AREA_COORDINATES.split(';')
      let jwdlist = []
      for (let j = 0; j < jwd.length; j++) {
        let zbs = jwd[j].split(',')
        jwdlist.push([parseFloat(zbs[0]) - 0.0049, parseFloat(zbs[1]) + 0.0025])
      }
      item.WYC_COUNT = item.WYC_NUMBER
      if (type == 0) this.addPolygon(0, item, jwdlist)
      else this.addPolygon(1, item, jwdlist)
      axios
        .get('map/passengerFlowToDetailed', {
          baseURL: this.baseURL,
          params: {
            type: type,
            stime: stime,
            etime: etime,
            id: item.AREA_ID
          }
        })
        .then(res => {
          this.tab.loading = false
          let polygonArr = new Array()
          for (let i = 0; i < res.data.length; i++) {
            polygonArr = new Array()
            let zbs = res.data[i].AREA_COORDINATES.split(';')
            for (let j = 0; j < zbs.length; j++) {
              let zb = zbs[j].split(',')
              polygonArr.push([parseFloat(zb[0]) - 0.0049, parseFloat(zb[1]) + 0.0025])
            }
            if (type == 0) this.addPolygon(1, res.data[i], polygonArr)
            else this.addPolygon(0, res.data[i], polygonArr)
          }
        })
    },
    addPolygon(type, item, coordinate) {
      esriLoaders([
        'esri/graphic',
        'esri/InfoTemplate',
        'esri/geometry/Polygon',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color'
      ]).then(([Graphic, InfoTemplate, Polygon, SimpleFillSymbol, SimpleLineSymbol, Color]) => {
        let infoTemplate6 = new InfoTemplate()
        infoTemplate6.setTitle('区域名  ${AREA_NAME}')
        infoTemplate6.setContent('订单数量： ${WYC_COUNT}')

        var polygonJson = {
          rings: [coordinate],
          spatialReference: {
            wkid: 4326
          }
        }
        var polygon = new Polygon(polygonJson)
        let pcolor = []
        if (type == 0) {
          pcolor = [18, 115, 208, 0.7]
        } else {
          pcolor = [122, 32, 163, 0.7]
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
            infoTemplate6
          )
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$border-color: #69a7f7;
.tw-template-wrapper {
  position: relative;
}
.tab-info {
  height: 100%;
  padding: 0 5px;
  overflow: auto;
  overflow-x: hidden;
}
.tw-map-left-panel {
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  width: 300px;
  padding: 10px 10px 5px 5px;
}
.map-box {
  position: relative;
  margin-left: 300px;
  height: 100%;
  width: calc(100% - 300px);
  box-sizing: border-box;
}
.tab-info {
  $height: 25px;
  .tw-item {
    position: relative;
    width: 100%;
    height: $height;
    padding: 3px;
    cursor: pointer;
    .tw-rank {
      position: absolute;
      left: 10px;
      top: 0;
      width: $height;
      height: $height;
      background-color: #43d994;
      border-radius: $height / 2;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 20px;
    }
    .tw-title {
      line-height: $height;
      margin-left: 50px;
      font-size: 15px;
      &.active {
        color: $border-color;
      }
    }
  }
}
.tw-date1 {
  text-align: center;
  margin-bottom: 10px;
}
.tw-date {
  text-align: center;
  margin-bottom: 10px;
  width: 160px;
}
.tw-tips {
  position: absolute;
  right: 50px;
  bottom: 10px;
  .tw-bg {
    display: inline-block;
    transition: all 0.5s;
    overflow: hidden;
    white-space: nowrap;
    background-color: #ffffff;
    padding-left: 10px;
    div {
      height: 40px;
      display: inline-block;
      position: relative;
      margin-right: 10px;
      span {
        margin-left: 25px;
        font-size: 15px;
        font-weight: 600;
        line-height: 40px;
      }
      &:first-child {
        color: #1273d0;
        &::before {
          content: '';
          position: absolute;
          height: 20px;
          display: inline-block;
          width: 20px;
          top: 10px;
          left: 0;
          background-color: #1273d0;
        }
      }
      &:nth-child(2) {
        color: #7a20a3;
        &::before {
          content: '';
          position: absolute;
          height: 20px;
          display: inline-block;
          width: 20px;
          top: 10px;
          left: 0;
          background-color: #7a20a3;
        }
      }
    }
  }
  .tw-tl {
    position: absolute;
    cursor: pointer;
    right: -30px;
    top: -5px;
    width: 20px;
    font-weight: 600;
    line-height: 18px;
    padding: 5px;
    color: #ffffff;
    font-size: 16px;
    background-color: #1890ff;
  }
}
// 区
.tw-map-tool {
  width: 540px;
  position: absolute;
  right: 10px;
  top: 10px;
}
// 右边白色悬浮框
.tw-right-panel {
  position: absolute;
  right: 20px;
  top: 80px;
  width: 300px;
  height: 650px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 3px 3px 5px #cccccc;
  .tw-title {
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    font-size: 25px;
    text-align: center;
  }
  .tw-content {
    height: 600px;
    overflow: auto;
    .tw-item {
      padding: 10px;
      padding-left: 20px;
      font-size: 17px;
    }
  }
}
</style>
