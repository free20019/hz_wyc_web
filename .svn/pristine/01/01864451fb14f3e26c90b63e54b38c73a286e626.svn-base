<!--特定区域监测-->
<template>
  <div class="tw-template-wrapper">
    <div class="tw-map-box" id="arcgisMap" style="height: 60%"></div>
    <div class="mp-querybar" style="height: 25px">
      <el-form size="small">
        <el-form-item>
          <el-button type="primary" @click="addarea">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tw-query-panel" ref="queryPanel" style="height: calc(40% - 25px)">
      <el-table class="tw-table" :data="areaList" v-loading="table.loading" border size="small" height="calc(100%)" @row-click="trowclick">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="AREA_NAME" label="区域名称" min-width="140"></el-table-column>
        <el-table-column prop="AREA_NUM" label="当前车辆数" width="180"></el-table-column>
        <el-table-column prop="AREA_AVG_NUM" label="最大车辆数" min-width="140" :resizable="false"></el-table-column>
        <el-table-column prop="AREA_NUM" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="table-button"
              icon="el-icon-edit"
              size="small"
              @click="handleEditClick(scope.row)"
            ></el-button>
            <el-button
              type="text"
              class="table-button"
              icon="el-icon-delete"
              size="small"
              @click="handleDeleteClick(scope.row.AREA_ID)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.display" @close="handleDialogClose">
      <el-form :model="dialog.form" label-width="80px">
        <el-form-item label="区域名称">
          <el-input v-model="dialog.form.area_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域描述">
          <el-input v-model="dialog.form.area_ms" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域坐标">
          <el-input v-model="dialog.form.area_zb" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.display = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSaveClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import _ from 'underscore'
import { esriLoaders, mapLayerPath } from '../../assets/js/arcgis.comfig'
import { iconClassName } from '../../assets/js/util'

export default {
  name: 'SpecificAreaManage',
  data() {
    return {
      map: {
        arcgisMap: null,
        levelMap: null,
        toolbar_map: null
      },
      areaList: [],
      table: {
        loading: false
      },
      dialog: {
        display: false,
        title: '',
        form: {
          area_id: '',
          area_name: '',
          area_ms: '',
          area_zb: ''
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      try {
        esriLoaders(['esri/map', 'esri/basemaps', 'esri/layers/GraphicsLayer', 'esri/toolbars/draw']).then(
          ([Map, basemaps, GraphicsLayer, Draw]) => {
            basemaps.mapLayerPath = mapLayerPath
            this.map.arcgisMap = new Map('arcgisMap', {
              basemap: 'mapLayerPath',
              spatialReference: {
                wkid: 4326
              },
              center: [120.197521, 30.24298],
              zoom: 6
            })
            this.map.arcgisMap.on('load', () => {
              this.map.levelMap = new GraphicsLayer({
                id: 'levelmap'
              })
              this.map.arcgisMap.addLayer(this.map.levelMap)
              this.getAreaList()
              this.map.toolbar_map = new Draw(this.map.arcgisMap)
            })
          }
        )
      } catch (e) {}
    })
  },
  methods: {
    iconClassName,
    getAreaList() {
      axios
        .get('map/getArea', {
          baseURL: this.baseURL
        })
        .then(res => {
          this.map.levelMap.clear()
          this.areaList = res.data
          _.each(this.areaList, item => {
            let polygonArr = new Array() //多边形覆盖物节点坐标数组
            let zbs = item.AREA_ZB.split(';')
            for (let i = 0; i < zbs.length; i++) {
              let zb = zbs[i].split(',')
              if(item.INSERT_TYPE == '1')
                polygonArr.push([parseFloat(zb[0]) - 0.0049, parseFloat(zb[1]) + 0.0025])
              else polygonArr.push([parseFloat(zb[0]), parseFloat(zb[1])])
              // if(i == 0){
              // 	this.map.arcgisMap.centerAndZoom([parseFloat(zb[0]),parseFloat(zb[1])], 8)
              // }
            }
            this.addPolygon(item, polygonArr)
          })
        })
    },
    addPolygon(item, coordinate) {
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
        infoTemplate6.setContent('区域描述： ${AREA_MS}')

        let polygonJson = {
          rings: [coordinate],
          spatialReference: {
            wkid: 4326
          }
        }
        let polygon = new Polygon(polygonJson)
        this.map.levelMap.add(
          new Graphic(
            polygon,
            new SimpleFillSymbol(
              SimpleFillSymbol.STYLE_SOLID,
              new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([42, 242, 255, 0.35]), 1),
              new Color([244, 67, 54, 0.6])
            ),
            item,
            infoTemplate6
          )
        )
      })
    },
    addarea() {
      esriLoaders(['esri/toolbars/draw']).then(([Draw]) => {
        this.map.toolbar_map.on('draw-end', this.addToMap)
        this.map.toolbar_map.activate(Draw.POLYGON)
        this.map.levelMap.clear()
      })
    },
    addToMap(evt) {
      esriLoaders([
        'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/graphic'
      ]).then(([SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Graphic]) => {
        let symbol
        this.map.toolbar_map.deactivate()
        switch (evt.geometry.type) {
          case 'point':
          case 'multipoint':
            symbol = new SimpleMarkerSymbol()
            break
          case 'polyline':
            symbol = new SimpleLineSymbol()
            break
          default:
            symbol = new SimpleFillSymbol()
            break
        }
        let graphic = new Graphic(evt.geometry, symbol, null, null)
        this.map.levelMap.add(graphic)
        let num = this.map.levelMap.graphics.length - 1
        //经纬度
        let jwd = ''
        let obj = this.map.levelMap.graphics[num].geometry.rings[0]
        for (var i = 0; i < obj.length; i++) {
          if (i < obj.length - 1) {
            jwd += obj[i][0] + ',' + obj[i][1] + ';'
          } else {
            jwd += obj[i][0] + ',' + obj[i][1]
          }
        }
        this.dialog.form.area_zb = jwd
        this.handleAddClick()
      })
    },
    handleAddClick() {
      this.dialog.display = true
      this.dialog.title = '添加区域'
      this.dialog.form.area_id = ''
      this.dialog.form.area_name = ''
      this.dialog.form.area_ms = ''
    },
    handleDialogClose() {
      this.dialog.title = ''
      this.dialog.form.area_id = ''
      this.dialog.form.area_name = ''
      this.dialog.form.area_ms = ''
      this.getAreaList()
    },
    handleEditClick(row) {
      this.dialog.display = true
      this.dialog.title = '修改区域'
      this.dialog.form.area_id = row.AREA_ID
      this.dialog.form.area_name = row.AREA_NAME
      this.dialog.form.area_ms = row.AREA_MS
      this.dialog.form.area_zb = row.AREA_ZB
    },
    handleDeleteClick(id) {
      this.$confirm('此操作将永久删除该区域, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios
            .get('map/delArea', {
              baseURL: this.baseURL,
              params: { area_id: id }
            })
            .then(res => {
              this.$message(res.data.info)
              this.getAreaList()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleDialogSaveClick() {
      if (!this.dialog.form.area_name) return this.$message({ type: 'warning', message: '请输入区域名称' })
      if (!this.dialog.form.area_ms) return this.$message({ type: 'warning', message: '请输入区域描述' })
      this.dialog.display = false
      if (this.dialog.title === '添加区域') {
        axios
          .get('map/addArea', {
            baseURL: this.baseURL,
            params: {
              area_name: this.dialog.form.area_name,
              area_ms: this.dialog.form.area_ms,
              area_zb: this.dialog.form.area_zb
            }
          })
          .then(res => {
            this.$message(res.data.info)
            this.getAreaList()
          })
      } else if (this.dialog.title === '修改区域') {
        axios
          .get('map/editArea', {
            baseURL: this.baseURL,
            params: {
              area_name: this.dialog.form.area_name,
              area_ms: this.dialog.form.area_ms,
              area_zb: this.dialog.form.area_zb,
              area_id: this.dialog.form.area_id
            }
          })
          .then(res => {
            this.$message(res.data.info)
            this.getAreaList()
          })
      }
    },
    trowclick(row) {
      esriLoaders([
        'esri/geometry/Point'      ]).then(([Point]) => {
        let zbs = row.AREA_ZB.split(';')
        let zb = zbs[0].split(',')

        this.map.arcgisMap.centerAndZoom(
            [parseFloat(zb[0]), parseFloat(zb[1])],
            9
        )
        let graphics = this.map.levelMap.graphics
        for (let i = 0; i < graphics.length; i++) {
          if (row.AREA_ID == graphics[i].attributes.AREA_ID) {

            let point = new Point({
              x: parseFloat(zb[0]) - 0.0049,
              y: parseFloat(zb[1]) + 0.0025,
              spatialReference: {
                wkid: 4326
              }
            })
            this.map.arcgisMap.infoWindow.show(point);
            this.map.arcgisMap.infoWindow.setFeatures([graphics[i]])
          }

          if (row.INSERT_TYPE == '1') this.map.arcgisMap.centerAndZoom(
              [parseFloat(zb[0]) - 0.0049, parseFloat(zb[1]) + 0.0025],
              9
          )
          else this.map.arcgisMap.centerAndZoom(
              [parseFloat(zb[0]), parseFloat(zb[1])],
              9
          )
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-template-wrapper {
  position: relative;
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
</style>
