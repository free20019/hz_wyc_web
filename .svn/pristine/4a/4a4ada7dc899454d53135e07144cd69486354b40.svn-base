<template>
  <div class="tw-template-wrapper">
    <div class="map-info-box">
      <div class="tw-map-tool search" :class="{'show-tool':toolFlag1}">
        <el-autocomplete
          class="tool-input"
          v-show="toolFlag1"
          placeholder="车牌号码"
          v-model="value1"
          :fetch-suggestions="queryVehicleSearch"
          :trigger-on-focus="false"
        ></el-autocomplete>
        <!--<el-input class="tool-input" v-show="toolFlag1" placeholder="车牌号码"></el-input>-->
        <div class="tool-btn cx" v-show="toolFlag1">
          <el-button type="text" @click="handleQueryClick(1)">查询</el-button>
        </div>
        <div class="tool-btn" v-show="toolFlag1">
          <el-button type="text" @click="handleClearClick(1)">清除</el-button>
        </div>
      </div>
      <div class="tw-map-tool btn">
        <i class="iconfont icon-menu" @click="showTool(1)"></i>
      </div>
      <div id="arcgisMap1" style="height: 100%;" v-loading="map.loading1"></div>

      <div class="info-box">
        <ul class="info-lists">
          <li>
            <span>平台：</span>
            <span>{{info.name1}}</span>
          </li>
          <hr />
          <li>
            <span>状态：</span>
            <span>{{info.type1}}</span>
          </li>
          <hr />
          <li>
            <span>时间：</span>
            <span>{{info.time1}}</span>
          </li>
          <hr />
        </ul>
      </div>
      <!--			<div class="tw-map-box" id="arcgisMap1" v-loading="map.loading1"></div>-->
      <!--			<el-form inline class="map-form" size="small" ref="mapBox">-->
      <!--				<el-form-item>-->
      <!--					<el-autocomplete v-model="value1" :fetch-suggestions="queryVehicleSearch" placeholder="车牌号码" :trigger-on-focus="false"></el-autocomplete>-->
      <!--				</el-form-item>-->
      <!--				<el-form-item>-->
      <!--					<el-button class="map-btn" @click="handleQueryClick(1)">查询</el-button>-->
      <!--					<el-button class="map-btn" @click="handleClearClick(1)">清空</el-button>-->
      <!--				</el-form-item>-->
      <!--			</el-form>-->
    </div>
    <div class="map-info-box">
      <div class="tw-map-tool search" :class="{'show-tool':toolFlag2}">
        <!--<el-input class="tool-input" v-show="toolFlag2" placeholder="车牌号码"></el-input>-->
        <el-autocomplete
          v-show="toolFlag2"
          class="tool-input"
          v-model="value2"
          :fetch-suggestions="queryVehicleSearch"
          placeholder="车牌号码"
          :trigger-on-focus="false"
        ></el-autocomplete>
        <div class="tool-btn cx" v-show="toolFlag2">
          <el-button type="text" @click="handleQueryClick(2)">查询</el-button>
        </div>
        <div class="tool-btn" v-show="toolFlag2">
          <el-button type="text" @click="handleClearClick(2)">清除</el-button>
        </div>
      </div>
      <div class="tw-map-tool btn">
        <i class="iconfont icon-menu" @click="showTool(2)"></i>
      </div>
      <div id="arcgisMap2" style="height: 100%;" v-loading="map.loading2"></div>

      <!--			<div class="tw-map-box" id="arcgisMap2" v-loading="map.loading2"></div>-->
      <!--			<el-form inline class="map-form" size="small">-->
      <!--				<el-form-item>-->
      <!--					<el-autocomplete v-model="value2" :fetch-suggestions="queryVehicleSearch" placeholder="车牌号码" :trigger-on-focus="false"></el-autocomplete>-->
      <!--				</el-form-item>-->
      <!--				<el-form-item>-->
      <!--					<el-button class="map-btn" @click="handleQueryClick(2)">查询</el-button>-->
      <!--					<el-button class="map-btn" @click="handleClearClick(2)">清空</el-button>-->
      <!--				</el-form-item>-->
      <!--			</el-form>-->
      <div class="info-box">
        <ul class="info-lists">
          <li>
            <span>平台：</span>
            <span>{{info.name2}}</span>
          </li>
          <hr />
          <li>
            <span>状态：</span>
            <span>{{info.type2}}</span>
          </li>
          <hr />
          <li>
            <span>时间：</span>
            <span>{{info.time2}}</span>
          </li>
          <hr />
        </ul>
      </div>
    </div>
    <div class="map-info-box">
      <div class="tw-map-tool search" :class="{'show-tool':toolFlag3}">
        <!--<el-input class="tool-input" v-show="toolFlag3" placeholder="车牌号码"></el-input>-->
        <el-autocomplete
          v-show="toolFlag3"
          class="tool-input"
          v-model="value3"
          :fetch-suggestions="queryVehicleSearch"
          placeholder="车牌号码"
          :trigger-on-focus="false"
        ></el-autocomplete>
        <div class="tool-btn cx" v-show="toolFlag3">
          <el-button type="text" @click="handleQueryClick(3)">查询</el-button>
        </div>
        <div class="tool-btn" v-show="toolFlag3">
          <el-button type="text" @click="handleClearClick(3)">清除</el-button>
        </div>
      </div>
      <div class="tw-map-tool btn">
        <i class="iconfont icon-menu" @click="showTool(3)"></i>
      </div>

      <div id="arcgisMap3" style="height: 100%;" v-loading="map.loading3"></div>
      <div class="info-box">
        <ul class="info-lists">
          <li>
            <span>平台：</span>
            <span>{{info.name3}}</span>
          </li>
          <hr />
          <li>
            <span>状态：</span>
            <span>{{info.type3}}</span>
          </li>
          <hr />
          <li>
            <span>时间：</span>
            <span>{{info.time3}}</span>
          </li>
          <hr />
        </ul>
      </div>
      <!--			<div class="tw-map-box" id="arcgisMap3" v-loading="map.loading3"></div>-->
      <!--			<el-form inline class="map-form" size="small">-->
      <!--				<el-form-item>-->
      <!--					<el-autocomplete v-model="value3" :fetch-suggestions="queryVehicleSearch" placeholder="车牌号码" :trigger-on-focus="false"></el-autocomplete>-->
      <!--				</el-form-item>-->
      <!--				<el-form-item>-->
      <!--					<el-button class="map-btn" @click="handleQueryClick(3)">查询</el-button>-->
      <!--					<el-button class="map-btn" @click="handleClearClick(3)">清空</el-button>-->
      <!--				</el-form-item>-->
      <!--			</el-form>-->
      <!--			<div class="info-box">-->
      <!--				<ul class="info-lists">-->
      <!--					<li><span>平台：</span><span>{{info.name3}}</span></li>-->
      <!--					<hr>-->
      <!--					<li><span>状态：</span><span>{{info.type3}}</span></li>-->
      <!--					<hr>-->
      <!--					<li><span>时间：</span><span>{{info.time3}}</span></li>-->
      <!--					<hr>-->
      <!--				</ul>-->
      <!--			</div>-->
    </div>
    <div class="map-info-box">
      <div class="tw-map-tool search" :class="{'show-tool':toolFlag4}">
        <!--<el-input class="tool-input" v-show="toolFlag4" placeholder="车牌号码"></el-input>-->
        <el-autocomplete
          v-show="toolFlag4"
          class="tool-input"
          v-model="value4"
          :fetch-suggestions="queryVehicleSearch"
          placeholder="车牌号码"
          :trigger-on-focus="false"
        ></el-autocomplete>
        <div class="tool-btn cx" v-show="toolFlag4">
          <el-button type="text" @click="handleQueryClick(4)">查询</el-button>
        </div>
        <div class="tool-btn" v-show="toolFlag4">
          <el-button type="text" @click="handleClearClick(4)">清除</el-button>
        </div>
      </div>
      <div class="tw-map-tool btn">
        <i class="iconfont icon-menu" @click="showTool(4)"></i>
      </div>

      <div id="arcgisMap4" style="height: 100%;" v-loading="map.loading4"></div>
      <div class="info-box">
        <ul class="info-lists">
          <li>
            <span>平台：</span>
            <span>{{info.name4}}</span>
          </li>
          <hr />
          <li>
            <span>状态：</span>
            <span>{{info.type4}}</span>
          </li>
          <hr />
          <li>
            <span>时间：</span>
            <span>{{info.time4}}</span>
          </li>
          <hr />
        </ul>
      </div>
      <!--			<div class="tw-map-box" id="arcgisMap4" v-loading="map.loading4"></div>-->
      <!--			<el-form inline class="map-form" size="small">-->
      <!--				<el-form-item>-->
      <!--					<el-autocomplete v-model="value4" :fetch-suggestions="queryVehicleSearch" placeholder="车牌号码" :trigger-on-focus="false"></el-autocomplete>-->
      <!--				</el-form-item>-->
      <!--				<el-form-item>-->
      <!--					<el-button class="map-btn" @click="handleQueryClick(4)">查询</el-button>-->
      <!--					<el-button class="map-btn" @click="handleClearClick(4)">清空</el-button>-->
      <!--				</el-form-item>-->
      <!--			</el-form>-->
    </div>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import { esriLoaders, mapLayerPath } from '../../assets/js/arcgis.comfig'
// import $ from 'jquery'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'CarsDynamicMonitor',
  data() {
    return {
      map: {
        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false,
        arcgisMap1: null,
        arcgisMap2: null,
        arcgisMap3: null,
        arcgisMap4: null,
        levelMap1: null,
        levelMap2: null,
        levelMap3: null,
        levelMap4: null,
        dialog: null,
        marMap: null,
        interval1: null,
        interval2: null,
        interval3: null,
        interval4: null,
        maptime1: '',
        maptime2: '',
        maptime3: '',
        maptime4: ''
      },
      options1: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' }
      ],
      options2: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' }
      ],
      options3: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' }
      ],
      options4: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' }
      ],
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      line: {
        line1: null,
        line2: null,
        line3: null,
        line4: null
      },
      info: {
        name1: '',
        time1: '',
        type1: '',
        name2: '',
        time2: '',
        type2: '',
        name3: '',
        time3: '',
        type3: '',
        name4: '',
        time4: '',
        type4: ''
      },
      toolFlag1: true,
      toolFlag2: false,
      toolFlag3: false,
      toolFlag4: false,
      cphm: '1111111'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap('arcgisMap1')
      this.initMap('arcgisMap2')
      this.initMap('arcgisMap3')
      this.initMap('arcgisMap4')
      setTimeout(this.addlayer, 1000)
    })
  },
  methods: {
    showTool(info) {
      if (info === 1) this.toolFlag1 = !this.toolFlag1
      else if (info === 2) this.toolFlag2 = !this.toolFlag2
      else if (info === 3) this.toolFlag3 = !this.toolFlag3
      else if (info === 4) this.toolFlag4 = !this.toolFlag4
    },
    queryVehicleSearch(query, cb) {
      if (query.length < 3) cb([])
      else {
        axios
          .get('map/getVhic', {
            baseURL: this.baseURL,
            params: { vhic: query }
          })
          .then(res => {
            let vhicData = []
            for (let i = 0; i < res.data.length; i++) {
              vhicData.push({
                id: res.data[i].VEHICLENO,
                lable: res.data[i].VEHICLENO + '(' + res.data[i].ABB_NAME + ')',
                value: res.data[i].VEHICLENO + '(' + res.data[i].ABB_NAME + ')'
              })
            }
            cb(vhicData)
          })
      }
    },
    addlayer() {
      const { arcgisMap1, arcgisMap2, arcgisMap3, arcgisMap4 } = this.map
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
          this.map.levelMap1 = new GraphicsLayer({
            id: 'levelmap1'
          })
          arcgisMap1.addLayer(this.map.levelMap1)
          this.map.levelMap2 = new GraphicsLayer({
            id: 'levelmap2'
          })
          arcgisMap2.addLayer(this.map.levelMap2)
          this.map.levelMap3 = new GraphicsLayer({
            id: 'levelmap3'
          })
          arcgisMap3.addLayer(this.map.levelMap3)
          this.map.levelMap4 = new GraphicsLayer({
            id: 'levelmap4'
          })
          arcgisMap4.addLayer(this.map.levelMap4)
        }
      )
    },
    initMap(name) {
      try {
        esriLoaders(['esri/map', 'esri/basemaps']).then(([Map, basemaps]) => {
          basemaps.mapLayerPath = mapLayerPath
          this.map[name] = new Map(name, {
            basemap: 'mapLayerPath',
            spatialReference: {
              wkid: 4326
            },
            center: [120.197521, 30.24298],
            zoom: 5
          })
        })
      } catch (e) {}
    },
    handleClearClick(value) {
      const { level, interval, name, type, time, maptime } = this.shaixuanMap(
        value
      )
      this.map[level].clear()
      this.info[name] = '无'
      this.info[type] = '无'
      this.info[time] = '无'
      clearInterval(this.map[interval])
      this.map[maptime] = ''
    },
    handleQueryClick(value) {
      if (vehino === '') {
        this.$message({
          message: '车牌号码不能为空！',
          type: 'warning'
        })
        return
      }
      const {
        map,
        level,
        linemap,
        vehino,
        interval,
        loading,
        name,
        type,
        time,
        maptime
      } = this.shaixuanMap(value)
      if (this.map[maptime] == '')
        this.map[maptime] = this.fomarttime1(
          new Date(new Date().getTime() - 1000 * 60 * 30)
        )
      this.map[loading] = true
      clearInterval(this.map[interval])
      axios
        .get('map/getDynamic', {
          baseURL: this.baseURL,
          params: { vehi_no: vehino, time: this.map[maptime] }
        })
        .then(res => {
          this.map[loading] = false
          this.map[level].clear()
          if (res.data.length == 0) {
            this.$message({
              message: '车辆无轨迹！',
              type: 'warning'
            })
            return
          }
          this.map[interval] = setInterval(() => {
            this.handleQueryClick(value)
          }, 1000 * 30)
          let line = []
          for (let i = 0; i < res.data.length; i++) {
            line.push([
              res.data[i].LONGITUDE - 0.0049,
              res.data[i].LATITUDE + 0.0025
            ])
            if (i == 0) {
              this.addmar(res.data[i], 0, level)
            } else if (i == res.data.length - 1) {
              this.addmar(res.data[i], 1, level)
              this.info[name] = res.data[i].ABB_NAME
              this.info[type] = this.fomarttype(res.data[i].BIZSTATUS)
              this.info[time] = this.fomarttime(res.data[i].POSITIONTIME)
            } else {
              this.addmar(res.data[i], 2, level)
            }
          }
          this.line[linemap] = line
          this.addline(this.line[linemap], level)
          this.info[name] = res.data[res.data.length - 1].ABB_NAME
          this.info[type] = this.fomarttype(
            res.data[res.data.length - 1].BIZSTATUS
          )
          this.info[time] = this.fomarttime(
            res.data[res.data.length - 1].POSITIONTIME
          )
          if (res.data.length > 0)
            this.map[map].centerAndZoom(
              [
                res.data[res.data.length - 1].LONGITUDE,
                res.data[res.data.length - 1].LATITUDE
              ],
              6
            )
        })
    },
    // handleNewVehicle(level, linemap,name,type,time) {
    // axios.get("map/getDynamic", {
    // 	baseURL: this.baseURL,
    // 	params: {vehi_no:this.value1}
    // }).then(res => {
    // 	if(res.data.length>0){
    // 		this.addmar(res.data[res.data.length - 1], 2, level)
    // 		this.line[linemap].push([res.data[res.data.length - 1].LONGITUDE-0.0049, res.data[res.data.length - 1].LATITUDE+0.0025])
    // 		this.addline(this.line[linemap], level);
    // 		this.info[name] = res.data[res.data.length-1].ABB_NAME;
    // 		this.info[type] = this.fomarttype(res.data[res.data.length-1].BIZSTATUS);
    // 		this.info[time] = this.fomarttime(res.data[res.data.length-1].POSITIONTIME);
    // 		if(res.data.length>0)
    // 			this.map.arcgisMap1.centerAndZoom([res.data[res.data.length-1].LONGITUDE, res.data[res.data.length-1].LATITUDE], 6)
    // 	}
    // })
    // },
    fomarttime(date) {
      return moment(date).format('HH:mm:ss')
    },
    fomarttype(type) {
      if (type == '1') return '载客'
      else if (type == '2') return '接单'
      else if (type == '3') return '空驶'
      else if (type == '4') return '停运'
    },
    shaixuanMap(value) {
      if (value === 1)
        return {
          map: 'arcgisMap1',
          level: 'levelMap1',
          linemap: 'line1',
          vehino: this.value1,
          interval: 'interval1',
          loading: 'loading1',
          type: 'type1',
          name: 'name1',
          time: 'time1',
          maptime: 'maptime1'
        }
      else if (value === 2)
        return {
          map: 'arcgisMap2',
          level: 'levelMap2',
          linemap: 'line2',
          vehino: this.value2,
          interval: 'interval2',
          loading: 'loading2',
          type: 'type2',
          name: 'name2',
          time: 'time2',
          maptime: 'maptime2'
        }
      else if (value === 3)
        return {
          map: 'arcgisMap3',
          level: 'levelMap3',
          linemap: 'line3',
          vehino: this.value3,
          interval: 'interval3',
          loading: 'loading3',
          type: 'type3',
          name: 'name3',
          time: 'time3',
          maptime: 'maptime3'
        }
      else if (value === 4)
        return {
          map: 'arcgisMap4',
          level: 'levelMap4',
          linemap: 'line4',
          vehino: this.value4,
          interval: 'interval4',
          loading: 'loading4',
          type: 'type4',
          name: 'name4',
          time: 'time4',
          maptime: 'maptime4'
        }
    },
    fomarttime1(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    addmar(item, i, name) {
      esriLoaders([
        'esri/geometry/Point',
        'esri/graphic',
        'esri/symbols/PictureMarkerSymbol',
        'esri/InfoTemplate'
      ]).then(([Point, Graphic, PictureMarkerSymbol, InfoTemplate]) => {
        let infoTemplate7 = new InfoTemplate()
        infoTemplate7.setTitle('所属平台  ${ABB_NAME}')
        infoTemplate7.setContent(
          '<table> ' +
            '<tr><td><b>营运状态:  ${TYPE}</b></td></tr>' +
            '<tr><td><b>定位时间:  ${TIME}</b></td></tr></table>'
        )
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
            30,
            30
          ).setOffset(0, 0)
        } else if (i == 1) {
          p = PictureMarkerSymbol(this.baseURL + 'image/histor/car.png', 40, 20)
            .setAngle(item.DIRECTION - 90)
            .setOffset(0, 0)
        } else {
          p = PictureMarkerSymbol(this.baseURL + 'image/histor/gj.png', 25, 25)
            .setAngle(item.DIRECTION - 90)
            .setOffset(0, 0)
        }
        let grap = new Graphic(
          point,
          p,
          {
            ABB_NAME: item.ABB_NAME,
            TIME: this.fomarttime1(item.POSITIONTIME),
            TYPE: this.fomarttype(item.BIZSTATUS)
          },
          infoTemplate7
        )
        this.map[name].add(grap)
        // this.map[name].centerAndZoom([item.LONGITUDE-0.0049,item.LATITUDE+0.0025], 9)
      })
    },
    addline(line, name) {
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
        this.map[name].add(grop)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$marginSide: 5px;
$marginMid: 5px;
.tw-template-wrapper {
  background-color: #6aa6f8;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
}
.map-info-box {
  background-color: #ffffff;
  border-radius: 8px;
  float: left;
  box-sizing: border-box;
  position: relative;
  width: calc((100% - (#{$marginSide + $marginMid}* 2)) / 2);
  height: calc((100% - (#{$marginSide + $marginMid}* 2)) / 2);
  margin: $marginSide $marginMid $marginMid $marginSide;
}
.map-form {
  position: absolute;
  top: 5px;
  right: 10px;
}
.info-box {
  position: absolute;
  box-sizing: border-box;
  bottom: 5px;
  left: 5px;
  width: 30%;
  height: 33%;
  background: rgba($color: #eee9e9, $alpha: 0.4);
  font-weight: bold;
  font-size: 16px;
}
.info-lists {
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  li {
    border-bottom: gray;
    padding-bottom: 10px;
  }
}
.tw-map-tool {
  position: absolute;

  height: 37px;
  background-color: #6aa7f8;
  &.btn {
    right: 10px;
    top: 10px;
    cursor: pointer;
    width: 50px;
    text-align: center;
    i {
      line-height: 37px;
      font-size: 27px;
      color: #ffffff;
    }
  }
  &.search {
    box-sizing: border-box;
    right: 60px;
    top: 10px;
    padding: 5px;
    &.show-tool {
      opacity: 1;
      display: block;
      width: 40%;
    }
    opacity: 0;
    width: 0px;
    transition: all 0.5s ease;
  }
}
.tool-btn {
  box-sizing: border-box;
  width: 20%;
  height: 100%;
  text-align: center;
  &.cx {
  }
  span {
    line-height: 27px;
  }
}
</style>
