<!--车辆动态监控-->
<template>
  <div class="tw-template-wrapper">
    <div class="tw-map-list">
      <el-tabs v-model="tabs.active" type="card" :stretch="true">
        <el-tab-pane label="车辆详情列表" name="clxqlb">
          <div class="list-search">
            <el-input class="list-input" v-model="searchfor"></el-input>
            <div class="list-icon">
              <i class="iconfont icon-search" @click="handleSearchForClick"></i>
            </div>
          </div>
          <div class="list-list">
            <ul v-loading="page.loading">
              <li
                class="tw-list-item"
                :class="{ 'tw-text-error': item.type }"
                v-for="item in vehicleList"
                :key="item.id"
                @click="handleVehicleClick(item)"
              >
                <!-- <span>{{item.vehino}}</span> -->
                <i class="tw-icon--prefix el-icon-location-outline"></i>
                {{ item.vehino }}{{ item.TYPE ? '（未上线）' : '' }}
                <i class="tw-icon-platform" :class="[iconClassName(item.icon || '')]" v-if="!item.TYPE"></i>
                <el-button
                  class="tw-list-suffix"
                  type="text"
                  icon="iconfont icon-trajectory"
                  @click.stop.native="handleVehiclelsgj(item)"
                  size="mini"
                ></el-button>
                <!--<i class="tw-icon-platform" :class="[iconClassName(item.icon || '')]"></i>-->
              </li>
            </ul>
          </div>
          <el-pagination
            small
            class="tw-page-bar dynamicMontor"
            layout="pager, total"
            background
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            :total="page.total"
            :pager-count="5"
            @current-change="handleTablePageCurrentChange"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="不合规车辆列表">
          <div class="list-search">
            <el-input class="list-input" v-model="searchfor1"></el-input>
            <div class="list-icon">
              <i class="iconfont icon-search" @click="handleSearchForClick1"></i>
            </div>
          </div>
          <div class="list-list">
            <ul v-loading="page1.loading">
              <li
                class="tw-list-item"
                :class="{ 'tw-text-error': item.type }"
                v-for="item in noHGlist"
                :key="item.id"
                @click="handleVehicleClick(item)"
              >
                <!-- <span>{{item.vehino}}</span> -->
                <i class="tw-icon--prefix el-icon-location-outline"></i>
                {{ item.vehino }}{{ item.TYPE ? '（未上线）' : '' }}
                <i class="tw-icon-platform" :class="[iconClassName(item.icon || '')]" v-if="!item.TYPE"></i>
                <el-button
                  class="tw-list-suffix"
                  type="text"
                  icon="iconfont icon-trajectory"
                  @click.stop.native="handleVehiclelsgj(item)"
                  size="mini"
                ></el-button>
                <!--<i class="tw-icon-platform" :class="[iconClassName(item.icon || '')]"></i>-->
              </li>
            </ul>
          </div>
          <el-pagination
            small
            class="tw-page-bar dynamicMontor"
            layout="pager, total"
            background
            :page-size="page1.pageSize"
            :current-page="page1.currentPage"
            :total="page1.total"
            :pager-count="5"
            @current-change="handleTablePageCurrentChange"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tw-map-box">
      <div id="arcgisMap" style="height: 100%;"></div>
      <div class="tool-box">
        <div class="clearfix tool-area">
          <div class="normal" :class="{ show: showFlag }">
            <el-tabs v-model="editableTabsValue" type="card" class="map-tool" @tab-click="clickItem">
              <el-tab-pane v-for="item in platformList" :key="item.COMPANY_ID" :name="item.ABB_NAME">
                <span slot="label" class="my-pane">
                  <i class="img-color" :class="'my' + item.ICON"></i>
                  <span>{{ item.ABB_NAME }}</span>
                </span>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="tw-tool-btn">
            <i
              @click=";(showFlag = !showFlag), (infoFlag = false)"
              :class="{ show: showFlag }"
              class="iconfont icon-expansion-r"
            ></i>
          </div>
        </div>
        <!-- <div class="map-tool clearfix">
          <div
            @click="clickItem (item,index) "
            :key="item.ABB_NAME"
            class="tool-comp"
            :class="{'show':showFlag, 'active':index == nowIndex}"
            v-for="(item,index) in platformList"
          >
            <i class="iconfont" :class="item.icon"></i>
            <span>{{item.ABB_NAME}}</span>
          </div>
          <div class="tw-tool-btn">
            <i @click="showFlag = !showFlag,infoFlag = false" class="iconfont icon-expansion-r"></i>
          </div>
        </div>-->
      </div>
      <div class="tool-info" v-show="showToolInfo">
        <div class="info-list">
          <div class="yuan-icon">
            <i class="iconfont icon-cljk"></i>
          </div>
          <div class="info-detail">
            <div class="detail-top">{{ company.zx }}</div>
            <div class="detail-bottom">在线</div>
          </div>
        </div>
        <div class="info-list">
          <div class="yuan-icon">
            <i class="iconfont icon-cljk"></i>
          </div>
          <div class="info-detail">
            <div class="detail-top">{{ company.zk }}</div>
            <div class="detail-bottom">载客</div>
          </div>
        </div>
        <div class="info-list">
          <div class="yuan-icon">
            <i class="iconfont icon-cljk"></i>
          </div>
          <div class="info-detail">
            <div class="detail-top">{{ company.kz }}</div>
            <div class="detail-bottom">空载</div>
          </div>
        </div>
        <div class="info-list">
          <div class="small-echart">
            <div id="chart" style="height: 100%"></div>
          </div>
          <div class="info-detail">
            <div class="detail-top">{{ company.lv }}</div>
            <div class="detail-bottom">实载率</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { esriLoaders, mapLayerPath } from '../../assets/js/arcgis.comfig'
import { iconClassName, filterTablePage } from '../../assets/js/util'
import { data as test } from '../../assets/js/test'
import axios from 'axios'
import _ from 'underscore'
import $ from 'jquery'
import moment from 'moment'
import { setTimeout } from 'timers'
import echarts from 'echarts'

export default {
  name: 'VehicleDynamicMonitor',
  data() {
    return {
      tabs: {
        active: 'clxqlb'
      },
      page: {
        pageSize: 15,
        currentPage: 1,
        total: 0,
        data: [],
        loading: false
      },
      page1: {
        pageSize: 15,
        currentPage: 1,
        total: 0,
        data: [],
        loading: false
      },
      editableTabsValue: '',
      tabsValue: 'all',
      showFlag: true,
      infoFlag: false,
      searchfor: '',
      searchfor1: '',
      vehicleList: [
        { id: 1, type: true, name: '浙A12340' },
        { id: 2, type: false, name: '浙A12341' },
        { id: 3, type: false, name: '浙A12342' },
        { id: 4, type: false, name: '浙A12343' },
        { id: 5, type: false, name: '浙A12344' },
        { id: 6, type: true, name: '浙A12345' },
        { id: 7, type: false, name: '浙A12346' },
        { id: 8, type: true, name: '浙A12347' }
      ],
      noHGlist: [
        { id: 1, type: true, name: '浙A12340' },
        { id: 2, type: false, name: '浙A12341' },
        { id: 3, type: false, name: '浙A12342' },
        { id: 4, type: false, name: '浙A12343' },
        { id: 5, type: false, name: '浙A12344' },
        { id: 6, type: true, name: '浙A12345' },
        { id: 7, type: false, name: '浙A12346' },
        { id: 8, type: true, name: '浙A12347' }
      ],
      mapQueryPanel: false,
      platformActive: '全部',
      platformList: [
        {
          title: '卓卓1',
          icon: 'icon-kefu',
          data: { zx: 7310, zk: 2849, kz: 4461 }
        },
        {
          title: '卓卓2',
          icon: 'icon-taxi',
          data: { zx: 2048, zk: 1588, kz: 460 }
        },
        {
          title: '卓卓3',
          icon: 'icon-key',
          data: { zx: 2954, zk: 954, kz: 2000 }
        },
        {
          title: '卓卓4',
          icon: 'icon-ddzc',
          data: { zx: 2954, zk: 954, kz: 2000 }
        }
      ],
      map: {
        loading: false,
        arcgisMap: null,
        levelMap: null,
        dialog: null,
        level: 6,
        ismar: 0
      },
      company: {
        id: 'all',
        name: '全部',
        zk: 0,
        zx: 0,
        kz: 0,
        lv: '100%'
      },
      nowIndex: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      let _this = this
      this.mapQueryPanel = true
      this.getCompanyLIst()
      this.getVehicleList()
      this.getNoHG()
      try {
        this.map.loading = true
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
          _this.map.arcgisMap = new Map('arcgisMap', {
            basemap: 'mapLayerPath',
            spatialReference: {
              wkid: 4326
            },
            slider: false,
            center: [120.197521, 30.24298],
            zoom: 5
          })
          _this.map.arcgisMap.infoWindow.resize(245, 125)
          _this.map.dialog = new TooltipDialog({
            style: 'position: absolute; width: 350px; font: normal normal normal 10pt Helvetica;z-index:100'
          })
          _this.map.dialog.startup()

          this.map.arcgisMap.on('load', () => {
            _this.map.levelMap = new GraphicsLayer({
              id: 'levelmap'
            })
            _this.map.arcgisMap.addLayer(_this.map.levelMap)
            _this.map.loading = false
            _this.map.levelMap.on('click', evt => {
              $('.mapDialog').hide()
              dijitPopup.close(_this.map.dialog)
              if (_this.map.level > 8) {
                // let sspt = ''
                let result = evt.graphic.attributes
                // if (result.mdt_no === 'didi') sspt = '滴滴出行'
                // else if (result.mdt_no === 'shenzhou') sspt = '神州专车'
                // else if (result.mdt_no === 'caocao') sspt = '曹操出行'
                // else if (result.mdt_no === 'yidao') sspt = '易到用车'
                // else if (result.mdt_no === 'aa') sspt = 'AA出行'
                // else if (result.mdt_no === 'yangguangchedao')
                //   sspt = '阳光出行'
                // else if (result.mdt_no === 'wanshun') sspt = '万顺叫车'
                // else if (result.mdt_no === 'shouyue') sspt = '首汽约车'
                // else if (result.mdt_no === 'TJHT') sspt = '携程用车'
                // else if (result.mdt_no === 'hhyc') sspt = '恒好打车'
                // else if (result.mdt_no === 'tongcheng') sspt = '秒走打车'
                // else if (result.mdt_no === 'dccx') sspt = '多彩出行'
                // else if (result.mdt_no === 'xiehua') sspt = '携华出行'
                // else if (result.mdt_no === 'xiangdao') sspt = '享道出行'
                // else if (result.mdt_no === 'weixing') sspt = '耀出行'
                // else if (result.mdt_no === 'tmcx') sspt = '添猫出行'
                // let golsgj = $('<span class="">轨迹</span>').addClass('bottomRight golsgj').on('click', () => {
                // 	this.test(result)
                // });
                let t =
                  '<div class="mapDialog" style="">' +
                  '<div class="mapToolPanel">' +
                  '<TitleCircle><HyperCircle></HyperCircle>网约车-' +
                  result.vehino +
                  '(' +
                  (result.legal == '0' ? '不合规' : '合规') +
                  ')' +
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
                  _this.fomarttype(result.bizStatus) +
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
                  '<span class="bottomRight golsgj" style="cursor: pointer;font-size: 18px;color:aliceblue;">轨迹</span>' +
                  '</div>' +
                  '</div>'
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
                  this.handleVehiclelsgj(result)
                })
              }
            })
            _this.map.arcgisMap.on('zoom-end', function(evt) {
              _this.mapOnchange(evt)
            })
            _this.map.arcgisMap.on('mouse-drag-end', function(evt) {
              if (_this.map.level >= 9) _this.mapOnchange(evt)
            })
            _this.getMapLayered()
          })
        })
      } catch (e) {}
    })
  },
  computed: {
    filterTableList() {
      return filterTablePage(this.page)
    },
    showToolInfo() {
      if (!this.infoFlag) {
        return false
      }
      return true
    },
    platformOnlinData() {
      const { platformActive, platformList } = this
      if (platformActive.length === 0) {
        const count = { zx: 0, zk: 0, kz: 0 }
        _.each(platformList, item => {
          count.zx += item.ONLINE_NUM
          count.zk += item.HEAVY_NUM
          count.kz += item.EMAPY_NUM
        })
        return count
      } else return _.filter(platformList, item => item.title === platformActive)[0].data
    }
  },
  methods: {
    handleTablePageCurrentChange(index) {
      this.page.currentPage = index
      this.getVehicleList()
      this.page1.currentPage = index
      this.getNoHG()
    },
    clickItem(t) {
      let activeName = t.name
      this.page.currentPage = 1
      this.platformActive = t.name
      this.getVehicleList()
      this.getNoHG()
      for (var i = 0; i < this.platformList.length; i++) {
        if (activeName == this.platformList[i].ABB_NAME) {
          this.company.id = this.platformList[i].COMPANYID
          this.company.name = this.platformList[i].ABB_NAME
          this.company.kz = this.platformList[i].EMAPY_NUM
          this.company.zk = this.platformList[i].HEAVY_NUM
          this.company.zx = this.platformList[i].ONLINE_NUM
          this.company.lv = this.platformList[i].LV
          this.infoFlag = true
          esriLoaders(['esri/geometry/webMercatorUtils']).then(([webMercatorUtils]) => {
            this.map.levelMap.clear()
            if (this.map.level < 9) this.getMapLayered()
            else {
              // let point = webMercatorUtils.webMercatorToGeographic(this.map.arcgisMap.extent.getCenter());
              let point = this.map.arcgisMap.extent.getCenter()
              this.getMapLayered9(point.x, point.y)
            }
          })
          setTimeout(() => {
            let color = ['#00bff3', '#e6f4f7']
            this.leftEChart = echarts.init(document.getElementById('chart'))
            this.leftEChart.setOption({
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '90%',
                  center: ['50%', '50%'],
                  color: color,
                  startAngle: 10,
                  data: [
                    {
                      value: this.company.lv.substring(0, this.company.lv.length - 1),
                      name: '直接访问'
                    },
                    {
                      value: 100 - this.company.lv.substring(0, this.company.lv.length - 1),
                      name: '直接访问1'
                    }
                  ],
                  itemStyle: {
                    normal: {
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      }
                    }
                  }
                }
              ]
            })
          }, 500)
        }
      }
    },
    iconClassName,
    handleSearchForClick() {
      this.getVehicleList()
    },
    handleSearchForClick1() {
      this.getNoHG()
    },
    handleMapQueryPanelDisplayClick() {
      this.mapQueryPanel = !this.mapQueryPanel
    },
    haslatformActive(name) {
      return this.platformActive === name
    },
    fomarttime(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    fomarttype(type) {
      if (type == '1') return '载客'
      else if (type == '2') return '接单'
      else if (type == '3') return '空驶'
      else if (type == '4') return '停运'
    },
    getCompanyLIst() {
      axios
        .get('map/getCompany', {
          baseURL: this.baseURL
        })
        .then(res => {
          this.platformList = res.data
          _.each(res.data, item => {
            if (item.ABB_NAME === '全部') {
              this.company.kz = item.EMAPY_NUM
              this.company.zk = item.HEAVY_NUM
              this.company.zx = item.ONLINE_NUM
              this.company.lv = item.LV
            }
          })
        })
      // let data = test[0]
      // this.platformList = data
      // _.each(data, item => {
      //   if (item.ABB_NAME === '全部') {
      //     this.company.kz = item.EMAPY_NUM
      //     this.company.zk = item.HEAVY_NUM
      //     this.company.zx = item.ONLINE_NUM
      //     this.company.lv = item.LV
      //   }
      // })
    },
    getVehicleList() {
      this.page.loading = true
      axios
        .get('map/getVehicle', {
          baseURL: this.baseURL,
          params: {
            vhic: this.searchfor,
            name: this.platformActive,
            page: this.page.currentPage
          }
        })
        .then(res => {
          console.log(res.data)
          this.vehicleList = res.data
          this.page.data = res.data
          if (res.data.length > 0) this.page.total = res.data[0].C
          else this.page.total = 0
          this.page.loading = false
        })
    },
    getNoHG() {
      this.page1.loading = true
      axios
        .get('map/getNoHG', {
          baseURL: this.baseURL,
          params: {
            vhic: this.searchfor1,
            name: this.platformActive,
            page: this.page1.currentPage
          }
        })
        .then(res => {
          console.log(res.data)
          this.noHGlist = res.data
          this.page1.data = res.data
          if (res.data.length > 0) this.page1.total = res.data[0].C
          else this.page1.total = 0
          this.page1.loading = false
        })
    },
    mapOnchange(evt) {
      this.map.levelMap.clear()
      let _this = this
      if (evt.level != null) this.map.level = evt.level
      esriLoaders(['esri/geometry/webMercatorUtils', 'dijit/popup']).then(([webMercatorUtils, dijitPopup]) => {
        $('.mapDialog').hide()
        dijitPopup.close(_this.map.dialog)
        _this.map.levelMap.clear()
        if (_this.map.level < 9) _this.getMapLayered()
        else {
          // let point = webMercatorUtils.webMercatorToGeographic(_this.map.arcgisMap.extent.getCenter())
          let point = _this.map.arcgisMap.extent.getCenter()
          _this.getMapLayered9(point.x, point.y)
        }
      })
    },
    getMapLayered() {
      axios
        .get('map/getMapLayered', {
          baseURL: this.baseURL,
          params: {
            level: this.map.arcgisMap.getZoom(),
            comp_id: this.company.id
          }
        })
        .then(res => {
          _.each(res.data, item => {
            this.myAddmark(item.PX, item.PY, item.AREANUM)
          })
        })
    },
    getMapLayered9(x, y) {
      axios
        .get('map/getGet', {
          baseURL: this.baseURL,
          params: {
            level: this.map.arcgisMap.getZoom(),
            px: x,
            py: y,
            comp_id: this.company.id,
            type: '0'
          }
        })
        .then(res => {
          _.each(res.data, item => {
            this.addmar(item)
          })
        })
    },
    addmar(item) {
      console.log(item)
      esriLoaders(['esri/geometry/Point', 'esri/graphic', 'esri/symbols/PictureMarkerSymbol']).then(
        ([Point, Graphic, PictureMarkerSymbol]) => {
          // let infoTemplate7 = new InfoTemplate();
          // infoTemplate7.setTitle("所属平台  ${DEVICEID}");
          // infoTemplate7.setContent('<table v-if=""> '
          // 		+'<tr><td><b>车辆编号:  ${ANGLE}</b></td></tr>'
          // 		+'<tr><td><b>定位时间:  ${STIME}</b></td></tr></table>'
          // );
          let point = new Point({
            x: item.longi - 0.0049,
            y: item.lati + 0.0025,
            spatialReference: {
              wkid: 4326
            }
          })
          let address = ''
          if (item.mdt_no === 'didi') {
            if (item.legal == '0') address = 'image/marker/ddh.png'
            else address = 'image/marker/dd.png'
          } else if (item.mdt_no === 'shenzhou') {
            if (item.legal == '0') address = 'image/marker/szh.png'
            else address = 'image/marker/sz.png'
          } else if (item.mdt_no === 'caocao') {
            if (item.legal == '0') address = 'image/marker/cch.png'
            else address = 'image/marker/cc.png'
          } else if (item.mdt_no === 'yidao') {
            if (item.legal == '0') address = 'image/marker/ydh.png'
            else address = 'image/marker/yd.png'
          } else if (item.mdt_no === 'aa') {
            if (item.legal == '0') address = 'image/marker/aah.png'
            else address = 'image/marker/aa.png'
          } else if (item.mdt_no === 'yangguangchedao') {
            if (item.legal == '0') address = 'image/marker/ygh.png'
            else address = 'image/marker/yg.png'
          } else if (item.mdt_no === 'wanshun') {
            if (item.legal == '0') address = 'image/marker/wsh.png'
            else address = 'image/marker/ws.png'
          } else if (item.mdt_no === 'shouyue') {
            if (item.legal == '0') address = 'image/marker/syh.png'
            else address = 'image/marker/sy.png'
          } else if (item.mdt_no === 'TJHT') {
            if (item.legal == '0') address = 'image/marker/xcych.png'
            else address = 'image/marker/xcyc.png'
          } else if (item.mdt_no === 'hhyc') {
            if (item.legal == '0') address = 'image/marker/hhdch.png'
            else address = 'image/marker/hhdc.png'
          } else if (item.mdt_no === 'tongcheng') {
            if (item.legal == '0') address = 'image/marker/mzdch.png'
            else address = 'image/marker/mzdc.png'
          } else if (item.mdt_no === 'dccx') {
            if (item.legal == '0') address = 'image/marker/dccxh.png'
            else address = 'image/marker/dccx.png'
          } else if (item.mdt_no === 'xiehua') {
            if (item.legal == '0') address = 'image/marker/xhcxh.png'
            else address = 'image/marker/xhcx.png'
          } else if (item.mdt_no === 'xiangdao') {
            if (item.legal == '0') address = 'image/marker/xdcxh.png'
            else address = 'image/marker/xdcx.png'
          } else if (item.mdt_no === 'weixing') {
            if (item.legal == '0') address = 'image/marker/ycxh.png'
            else address = 'image/marker/ycx.png'
          } else if (item.mdt_no === 'tmcx') {
            if (item.legal == '0') address = 'image/marker/tmcxh.png'
            else address = 'image/marker/tmcx.png'
          } else if (item.mdt_no === 'gscx') {
            if (item.legal == '0') address = 'image/marker/gscxh.png'
            else address = 'image/marker/gscx.png'
          } else if (item.mdt_no === 'jbyy') {
            if (item.legal == '0') address = 'image/marker/jbyyh.png'
            else address = 'image/marker/jbyy.png'
          } else if (item.mdt_no === 'lvcheng') {
            if (item.legal == '0') address = 'image/marker/lcych.png'
            else address = 'image/marker/lcyc.png'
          } else if (item.mdt_no === 'T3') {
            if (item.legal == '0') address = 'image/marker/t3cxh.png'
            else address = 'image/marker/t3cx.png'
          } else if (item.mdt_no === 'tfcx') {
            if (item.legal == '0') address = 'image/marker/tfcxh.png'
            else address = 'image/marker/tfcx.png'
          } else if (item.mdt_no === 'tuotuo') {
            if (item.legal == '0') address = 'image/marker/ttexh.png'
            else address = 'image/marker/ttex.png'
          } else if (item.mdt_no === 'yicheng') {
            if (item.legal == '0') address = 'image/marker/yccxh.png'
            else address = 'image/marker/yccx.png'
          } else if (item.mdt_no === 'zhongche') {
            if (item.legal == '0') address = 'image/marker/zccxh.png'
            else address = 'image/marker/zccx.png'
          } else if (item.mdt_no === 'jike') {
            if (item.legal == '0') address = 'image/marker/jksch.png'
            else address = 'image/marker/jksc.png'
          } else if (item.mdt_no === 'jishi') {
            if (item.legal == '0') address = 'image/marker/jsych.png'
            else address = 'image/marker/jsyc.png'
          }
          let p = PictureMarkerSymbol(this.baseURL + address, 28, 38).setOffset(14, 19)
          this.map.levelMap.add(new Graphic(point, p, item, ''))
        }
      )
    },
    myAddmark(x, y, num) {
      esriLoaders([
        'esri/geometry/Point',
        'esri/graphic',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/TextSymbol',
        'esri/symbols/Font'
      ]).then(([Point, Graphic, SimpleMarkerSymbol, TextSymbol, Font]) => {
        let point = new Point(x, y)
        let color = {}
        let size = ''
        if (parseInt(num) >= 1000) {
          size = '30'
          color = { a: 1, r: 128, g: 177, b: 244 }
        } else if (parseInt(num) >= 300 && num < 1000) {
          size = '25'
          color = { a: 1, r: 71, g: 146, b: 247 }
        } else {
          size = '20'
          color = { a: 1, r: 29, g: 116, b: 231 }
        }
        var _symbol = new SimpleMarkerSymbol({
          color: color,
          size: size,
          angle: 0,
          xoffset: 0,
          yoffset: 0,
          style: 'esriSMSCircle',
          outline: {
            color: '',
            width: 0,
            type: 'esriSLS',
            style: 'esriSLSSolid'
          }
        })
        this.map.background = new Graphic(point, _symbol)
        this.map.levelMap.add(this.map.background)

        let textSymbol = new TextSymbol({
          text: num,
          color: { a: 1, r: 255, g: 255, b: 255 },
          angle: 0,
          xoffset: 0,
          yoffset: -3,
          font: new Font('10', Font.STYLE_ITALIC, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, 'Courier')
        })
        this.map.font = new Graphic(point, textSymbol)
        this.map.levelMap.add(this.map.font)
      })
    },
    handleVehicleClick(item) {
      this.map.ismar++
      let _this = this
      esriLoaders(['dijit/popup']).then(([dijitPopup]) => {
        $('.mapDialog').hide()
        dijitPopup.close(_this.map.dialog)
      })
      if (item.TYPE) {
        this.$message({
          message: '车辆未上线！',
          type: 'warning'
        })
        return
      }
      _this.map.arcgisMap.centerAndZoom([item.longi - 0.0049, item.lati + 0.0025], 10)
      if (_this.map.ismar > 1) {
        _this.map.levelMap.clear()
        _this.addmar(item)
      } else {
        setTimeout(function() {
          _this.map.levelMap.clear()
          _this.addmar(item)
        }, 1200)
      }
    },
    handleVehiclelsgj(item) {
      this.$router.push({
        name: 'HistoricalTrackPlayback',
        params: { vehi_no: item.vehino + '(' + item.vehName + ')' }
      })
      // this.$route.push({name :'HistoricalTrackPlayback',params:{'vehi_no':item.vehino+'('+item.vehName+')'}})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
$font-color: #374873;
$border-color: #69a7f7;
.tw-map {
  &-list {
    float: left;
    width: 300px;
    padding: 5px;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid $border-color;
  }
}
.list-title {
  height: 50px;
  text-align: center;
  span {
    line-height: 50px;
    font-size: 16px;
    color: $font-color;
    font-weight: 700;
  }
}
.tw-list-item {
  color: $font-color;
  font-weight: 600;
  font-size: 14px;
  line-height: 45px;
  i {
    padding-left: 20px;
  }
  span {
    font-size: 16px;
    padding: 0 40px 0 60px;
  }
}
.tw-icon-platform {
  padding-left: 20px;
  transform: translate(-50%, -50%);
}
.tw-map-box {
  position: relative;
  box-sizing: border-box;
  float: left;
  width: calc(100% - 300px);
  height: 100%;
  background-color: #cccccc;
}
/*地图工具栏*/
.map-tool {
  width: 920px;
  box-shadow: 0px -1px 3px #000000;
}
/*工具栏公司排版*/
.tool-comp {
  // float: left;
  height: 50px;
  width: 80px;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  display: block;
  background-color: #ffffff;
  transition: width 0.6s ease;
  cursor: pointer;
  &.active {
    background-color: #384a6e;
    color: #ffffff;
  }
  &:after {
    content: '';
    height: 20px;
    width: 1px;
    background-color: #cccccc;
    position: absolute;
    right: 0;
    top: 15px;
  }
  i {
    position: absolute;
    top: 6px;
    right: 20px;
    left: 20px;
    font-size: 20px;
  }
  span {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
  }
}
/*动画*/
.tool-comp {
  &.show {
    &:first-child {
      background-color: #ffffff;
      color: #ffffff;
    }
    &:after {
      background-color: transparent;
    }
    width: 0;
    & > i,
    & > span {
      color: #ffffff;
      display: none;
    }
  }
}

.tool-box {
  position: absolute;
  right: 0;
  top: 10px;
}
/*	全部 的样式*/
.info-list {
  height: 50px;
  float: left;
  line-height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.info-detail {
  height: 100%;
  box-sizing: border-box;
  width: 60px;
  color: #ffffff;
  padding: 5px;
}
.detail {
  &-top {
    text-align: center;
    line-height: 24px;
    border-bottom: 1px solid #ffffff;
    box-sizing: border-box;
  }
  &-bottom {
    text-align: center;
    line-height: 20px;
  }
}
.small-echart {
  width: 50px;
  height: 50px;
}
.yuan-icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid greenyellow;
  text-align: center;
  i {
    color: #ffffff;
    line-height: 40px;
    font-size: 30px;
  }
}
.my-pane {
  i {
    position: absolute;
    top: 5px;
    right: 20px;
    left: 30px;
    font-size: 20px;
    line-height: 20px;
    height: 20px;
  }
  span {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    height: 20px;
    line-height: 20px;
  }
}
.img-color {
  background-size: 20px;
  background-repeat: no-repeat;
  &.myicon-cczc {
    background-image: url('../../assets/img/com/cczc.svg');
  }
  &.myicon-hhdc {
    background-image: url('../../assets/img/com/hhdc.svg');
  }
  &.myicon-ddzc {
    background-image: url('../../assets/img/com/ddzc.svg');
  }
  &.myicon-clsh {
    background-image: url('../../assets/img/com/clsh.svg');
  }
  &.myicon-szzc {
    background-image: url('../../assets/img/com/szzc.svg');
  }
  &.myicon-xcyc {
    background-image: url('../../assets/img/com/xcyc.svg');
  }
  &.myicon-sqzc {
    background-image: url('../../assets/img/com/sqzc.svg');
  }
  &.myicon-ygzc {
    background-image: url('../../assets/img/com/ygzc.svg');
  }
  &.myicon-aazc {
    background-image: url('../../assets/img/com/aazc.svg');
  }
  &.myicon-dccx {
    background-image: url('../../assets/img/com/dccx.svg');
  }
  &.myicon-wszc {
    background-image: url('../../assets/img/com/wszc.svg');
  }
  &.myicon-mzdc {
    background-image: url('../../assets/img/com/mzdc.svg');
  }
  &.myicon-xhcx {
    background-image: url('../../assets/img/com/xiehua.svg');
  }
  &.myicon-xiangdao {
    background-image: url('../../assets/img/com/xiangdao.svg');
  }
  &.myicon-ycx {
    background-image: url('../../assets/img/com/ycx.svg');
  }
  &.myicon-tmcx {
    background-image: url('../../assets/img/com/tmcx.svg');
  }
  &.myicon-xdcx {
    background-image: url('../../assets/img/com/xiangdao.svg');
  }
  &.myicon-tfcx {
    background-image: url('../../assets/img/com/tfcx.svg');
  }
  &.myicon-t3cx {
    background-image: url('../../assets/img/com/t3cx.svg');
  }
  &.myicon-gscx {
    background-image: url('../../assets/img/com/gscx.svg');
  }
  &.myicon-jbyy {
    background-image: url('../../assets/img/com/jbyy.svg');
  }
  &.myicon-lcyc {
    background-image: url('../../assets/img/com/lcyc.svg');
  }
  &.myicon-ydzc {
    background-image: url('../../assets/img/com/yd.svg');
  }
  &.myicon-ttex {
    background-image: url('../../assets/img/com/ttyx.svg');
  }
  &.myicon-yccx {
    background-image: url('../../assets/img/com/yccx.svg');
  }
  &.myicon-zccx {
    background-image: url('../../assets/img/com/zccx.svg');
  }
  &.myicon-jksc {
    background-image: url('../../assets/img/com/jksc.svg');
  }
  &.myicon-jsyc {
    background-image: url('../../assets/img/com/jsyc.svg');
  }
}
.list-list {
  height: calc(100% - 140px);
}
.tool-area {
  position: relative;
  display: flex;
  .normal {
    position: absolute;
    right: -1000px;
    transition: 0.5s all;
    &.show {
      right: 50px;
      transition: 0.5s all;
    }
  }
}
.tw-template-wrapper {
  overflow: hidden;
}
/*工具栏收缩按钮*/
.tw-tool-btn {
  height: 50px;
  width: 50px;
  font-size: 25px;
  background-color: #ffffff;
  z-index: 3;
  display: flex;
  vertical-align: middle;
  align-items: center;
  i {
    display: block;
    font-size: 30px;
    color: #6ddb9e;
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin: auto;
    transition: all 0.5s;
    transform: rotate(180deg);
    &.show {
      transform: rotate(0deg);
      transition: all 0.5s;
    }
  }
}
.tool-info {
  position: absolute;
  right: 0px;
  top: 60px;
  width: 970px;
  box-sizing: border-box;
  background-color: #384a6e;
  height: 50px;
}
</style>
