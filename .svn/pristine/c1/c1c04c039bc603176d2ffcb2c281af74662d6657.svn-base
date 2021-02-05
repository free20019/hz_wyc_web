<!--
 * @Descripttion: 数据接入监测
 * @version: 
 * @Author: CFQ
 * @Date: 2020-03-27 08:56:41
 * @LastEditors: CFQ
 * @LastEditTime: 2020-04-03 16:18:23
 -->
<template>
  <div class="tw-template-wrapper">
    <div style="display:none">
      <img
        v-for="(item, index) in imgList"
        :key="index"
        :ref="item.ref"
        :src="item.url"
        :data-flag="item.flag"
      />
      <img src="../../assets/img/com/xiehua.svg" />
    </div>

    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'underscore'
export default {
  name: 'DataAccessMonitoring',
  data() {
    return {
      dataset: {
        distance: 17.578125,
        angle: 30,
        valueFontSize: 20,
        data: [
          {
            x: 42.1875,
            y: 344.125,
            z: 0,
            w: 100,
            h: 31,
            text: 24,
            font: 40,
            valuecolor: 'rgba(6              5, 239, 65,1)',
            label: '触发',
            lablefont: 20
          },
          {
            x: 210.9375,
            y: 244.125,
            z: 0,
            w: 100,
            h: 31,
            text: 23,
            font: 40,
            valuecolor: 'rgba(239, 196, 65,1)',
            label: '1',
            lablefont: 20
          },
          {
            x: 379.6875,
            y: 244.125,
            z: 0,
            w: 100,
            h: 31,
            text: 26,
            font: 40,
            valuecolor: 'rgba(239, 65, 233,1)',
            label: '维修',
            lablefont: 20
          },
          {
            x: 848.4375,
            y: 244.125,
            z: 0,
            w: 100,
            h: 31,
            text: 23,
            font: 40,
            valuecolor: 'rgba(241, 23, 12,1)',
            label: '解决',
            lablefont: 20
          }
        ]
      },
      arr: [
        //四个图标得位置 和unicode     //第一步
        { x: 10, y: 330, icon: '&#xe63a;' },
        { x: 180, y: 230, icon: '&#xe63a;' },
        { x: 350, y: 230, icon: '&#xe63a;' },
        { x: 820, y: 230, icon: '&#xe63a;' }
      ],
      offset: 0,
      timerccc: null,
      imgList: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.initCanvas()
      this.getData()
      // this.init()
    })
  },
  methods: {
    getData() {
      const baseURL = this.baseURL
      axios
        .get('data/getCompanyDataFlow', {
          baseURL
        })
        .then(res => {
          let data = res.data.datas
          if (this.handleData(data, 'aa')) {
            this.imgList.push({
              ref: 'aazc',
              url: 'img/aazc.a3ff9f5b.svg',
              flag: this.handleDataFlag(data, 'aa')
            })
          }
          if (this.handleData(data, 'didi')) {
            this.imgList.push({
              ref: 'ddzc',
              url: 'img/ddzc.450d7dcb.svg',
              flag: this.handleDataFlag(data, 'didi')
            })
          }
          if (this.handleData(data, 'TJHT')) {
            this.imgList.push({
              ref: 'xcyc',
              url: 'img/xcyc.a6468b4e.svg',
              flag: this.handleDataFlag(data, 'TJHT')
            })
          }
          if (this.handleData(data, 'shenzhou')) {
            this.imgList.push({
              ref: 'shenzhou',
              url: 'img/szzc.47927ac9.svg',
              flag: this.handleDataFlag(data, 'shenzhou')
            })
          }
          if (this.handleData(data, 'tmcx')) {
            this.imgList.push({
              ref: 'tmcx',
              url: 'img/tmcx.8b4fc437.svg',
              flag: this.handleDataFlag(data, 'tmcx')
            })
          }
          if (this.handleData(data, 'weixing')) {
            this.imgList.push({
              ref: 'weixing',
              url: 'img/ycx.b2da81f8.svg',
              flag: this.handleDataFlag(data, 'weixing')
            })
          }
          if (this.handleData(data, 'xiangdao')) {
            this.imgList.push({
              ref: 'xiangdao',
              url: 'img/xiangdao.d15e5d96.svg',
              flag: this.handleDataFlag(data, 'xiangdao')
            })
          }
          if (this.handleData(data, 'wanshun')) {
            this.imgList.push({
              ref: 'wanshun',
              url: 'img/wszc.845df5fb.svg',
              flag: this.handleDataFlag(data, 'wanshun')
            })
          }
          if (this.handleData(data, 'yangguangchedao')) {
            this.imgList.push({
              ref: 'yangguangchedao',
              url: 'img/ygzc.266075ad.svg',
              flag: this.handleDataFlag(data, 'yangguangchedao')
            })
          }
          if (this.handleData(data, 'dccx')) {
            this.imgList.push({
              ref: 'dccx',
              url: 'img/dccx.2b7e5c50.svg',
              flag: this.handleDataFlag(data, 'dccx')
            })
          }
          if (this.handleData(data, 'shouyue')) {
            this.imgList.push({
              ref: 'shouyue',
              url: 'img/sqzc.d261b8f1.svg',
              flag: this.handleDataFlag(data, 'shouyue')
            })
          }
          if (this.handleData(data, 'tongcheng')) {
            this.imgList.push({
              ref: 'tongcheng',
              url: 'img/mzdc.c8d98929.svg',
              flag: this.handleDataFlag(data, 'tongcheng')
            })
          }
          if (this.handleData(data, 'caocao')) {
            this.imgList.push({
              ref: 'caocao',
              url: 'img/cczc.115a64cd.svg',
              flag: this.handleDataFlag(data, 'caocao')
            })
          }
          if (this.handleData(data, 'xiehua')) {
            this.imgList.push({
              ref: 'xiehua',
              url: 'img/xiehua.81c09aee.svg',
              flag: this.handleDataFlag(data, 'xiehua')
            })
          }
          setTimeout(() => {
            this.init()
          })
        })
    },
    handleDataFlag(data, info) {
      return _.filter(data, item => {
        return item.COMPANYID == info
      })[0].FLAG
    },
    handleData(data, info) {
      return (
        _.filter(data, item => {
          return item.COMPANYID == info
        }).length > 0
      )
    },
    initCanvas() {
      // var arr = [
      //   //四个图标得位置 和unicode     //第一步
      //   { x: 10, y: 330, icon: '&#xe69f;' }
      // ]
      var c = document.getElementById('myCanvas') //初始化
      //  计算画布的宽度
      let width = c.offsetWidth
      //  计算画布的高度
      let height = c.offsetHeight
      let ctx = c.getContext('2d')
      //  设置宽高
      c.width = width
      c.height = height
      //开始一个新的绘制路径
      ctx.beginPath()

      // 在Canvas画布 添加图片
      var img = this.$refs.img1
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 50, 50)
      }

      // for (var p = 0; p < arr.length; p++) {
      //   //第二步 循环arr数组绘制图标
      //   ctx.font = '60px  IconFont' //图标大小
      //   ctx.fillStyle = 'inherit'
      //   ctx.fillText(
      //     eval(
      //       ('("' + arr[p].icon).replace('&#x', '\\u').replace(';', '') + '")'
      //     ),
      //     arr[p].x,
      //     arr[p].y
      //   )
      // }
      ctx.setLineDash([4, 4])
      ctx.lineDashOffset = 12
      ctx.strokeStyle = 'rgba(235, 206, 53,1)'
      //定义直线的起点坐标为(10,10)
      ctx.moveTo(50, 50)
      //定义直线的终点坐标为(50,10)
      ctx.lineTo(500, 250)
      //沿着坐标点顺序的路径绘制直线
      ctx.lineWidth = 1
      ctx.strokeStyle = 'green'
      ctx.stroke()
      //关闭当前的绘制路径
      ctx.closePath()
    },
    init() {
      function angle(x1, y1, x2, y2) {
        const x = x2 - x1
        const y = y2 - y1
        // 返回弧度 不是角度
        return (360 * Math.atan(y / x)) / (2 * Math.PI)
      }
      var number = -1

      var canvas = document.getElementById('myCanvas') //初始化
      //  计算画布的宽度
      let width = canvas.offsetWidth
      //  计算画布的高度
      let height = canvas.offsetHeight
      //  设置宽高
      canvas.width = width
      canvas.height = height
      let count = 0
      let num = 1
      for (let i in this.$refs) {
        count++
      }
      this.arr = []
      this.dataset.data = []
      for (let i in this.$refs) {
        let success_color = {
          background: {
            line: 'rgba(36, 177, 191,1)',
            fill: 'rgba(36, 177, 191,0.5)'
          },
          bottom: {
            line: 'rgba(36, 177, 191,1)',
            fill: 'rgba(36, 177, 191,0.5)'
          },
          middle1: {
            line: 'rgba(210, 201, 69,1)',
            fill: 'rgba(210, 201, 69,1)'
          },
          middle2: {
            line: 'rgba(40, 230, 239,1)',
            fill: 'rgba(40, 230, 239,0.5)'
          },
          top: {
            line: 'rgba(37, 192, 205,1)',
            fill: 'rgba(37, 192, 205,0.5)'
          },
          light: {
            line: 'rgba(37, 192, 205,1)',
            fill: 'rgba(37, 192, 205,0.5)',
            stop: 'rgba(37, 192, 205,0)',
            end: 'rgba(37, 192, 205,'
          }
        }
        let error_color = {
          background: {
            line: 'rgba(36, 177, 191,1)',
            fill: 'rgba(36, 177, 191,0.5)'
          },
          bottom: {
            line: 'rgba(36, 177, 191,1)',
            fill: 'rgba(36, 177, 191,0.5)'
          },
          middle1: {
            line: 'rgba(210, 201, 69,1)',
            fill: 'rgba(210, 201, 69,1)'
          },
          middle2: {
            line: 'rgba(40, 230, 239,1)',
            fill: 'rgba(40, 230, 239,0.5)'
          },
          top: {
            line: 'rgba(37, 192, 205,1)',
            fill: 'rgba(37, 192, 205,0.5)'
          },
          light: {
            line: 'rgba(37, 192, 205,1)',
            fill: 'rgba(37, 192, 205,0.5)',
            stop: 'rgba(37, 192, 205,0)',
            end: 'rgba(37, 192, 205,'
          }
        }
        // 0 警告 1 正常
        console.info('refs', this.$refs[i][0].dataset.flag)
        if (num % 2 != 0) {
          this.arr.push({
            x: ((width / count) * 1.8 * num) / 2,
            y: 90,
            img: i
          })
          this.dataset.data.push({
            x: ((width / count) * 1.8 * num) / 2 + 28,
            y: 150,
            z: 0,
            w: 100,
            h: 31,
            text: 23,
            font: 40,
            valuecolor: 'rgba(241, 23, 12,1)',
            label: '解决',
            lablefont: 20,
            color:
              this.$refs[i][0].dataset.flag == 0 ? success_color : success_color
          })
        } else {
          this.arr.push({
            x: ((width / count) * 1.8 * num) / 2,
            y: 750,
            img: i
          })
          this.dataset.data.push({
            x: ((width / count) * 1.8 * num) / 2 + 28,
            y: 810,
            z: 0,
            w: 100,
            h: 31,
            text: 23,
            font: 40,
            valuecolor: 'rgba(241, 23, 12,1)',
            label: '解决',
            lablefont: 20,
            color:
              this.$refs[i][0].dataset.flag == 0 ? success_color : success_color
          })
        }

        num++
      }
      console.info('data::', this.dataset.data)
      this.timer()
    },
    timer() {
      const angle = this.dataset.angle
      const canvas = document.getElementById('myCanvas') // 子容器
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const data = this.dataset.data
      for (let i = 0; i < data.length; i++) {
        this.boox(
          canvas,
          data[i].x,
          data[i].y,
          data[i].z,
          data[i].w,
          data[i].h,
          data[i].text,
          data[i].font,
          data[i].label,
          data[i].lablefont,
          data[i].valuecolor,
          data[i].color
        )
        const x = data[i].x
        const y = data[i].y
        const z = data[i].z

        this.drawLine(data[i].h, canvas, x, y, z, 3, false)
        this.offset++
        this.drawLine(data[i].h, canvas, x, y, z, 1, false, {
          dash: [4, 4],
          offset: parseInt(this.offset / 10)
        })
        this.drawLine(data[i].h, canvas, x, y, z, 1, false, {
          dash: [4, 4],
          offset: parseInt(this.offset / 10)
        })
      }
      if (this.timerccc) {
        clearTimeout(this.timerccc)
      }
      this.timerccc = setTimeout(() => {
        this.timer()
      }, 50)
    },
    drawLine(h, canvas, x, y, z, lineWidth, vars, lineStyle) {
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.lineWidth = lineWidth
      // ctx.setLineDash([5, 15]);
      if (lineStyle) {
        ctx.setLineDash(lineStyle.dash)
        ctx.lineDashOffset = lineStyle.offset
        ctx.strokeStyle = 'rgba(235, 206, 53,1)'
      } else {
        ctx.strokeStyle = 'rgba(39, 229, 239,1)'
      }
      ctx.moveTo(canvas.offsetWidth / 2, canvas.offsetHeight / 2)
      ctx.lineTo(x, y)

      // ctx.strokeStyle = "rgba(255, 255, 255,1)";
      // ctx.fillStyle = "rgba(255, 255, 255,1)";
      ctx.stroke()
      ctx.setLineDash([0, 0])
      ctx.lineDashOffset = 0
    },
    boox(
      canvas,
      x,
      y,
      z,
      width,
      height,
      text,
      font,
      label,
      lablefont,
      valuecolor,
      color
    ) {
      const angle = this.dataset.angle
      const ctx = canvas.getContext('2d')
      y = y - z
      ctx.moveTo(x, y)
      const line = width / 2 / Math.cos((Math.PI / 180) * angle)
      ctx.moveTo(x - width / 2, y - height / 2)
      // 背景
      ctx.beginPath()
      ctx.moveTo(x - width / 2, y + height / 2)
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 + Math.sin((Math.PI / 180) * angle) * line
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line * 2,
        y + height / 2
      )

      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line * 2,
        y + height / 2 - height * 1
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 - Math.sin((Math.PI / 180) * angle) * line - height * 1
      )
      ctx.lineTo(x - width / 2, y + height / 2 - height * 1)
      ctx.strokeStyle = color.background.line
      ctx.fillStyle = color.background.fill
      ctx.stroke()
      ctx.fill()

      // 底层板
      ctx.beginPath()
      ctx.moveTo(x - width / 2, y + height / 2)
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 + Math.sin((Math.PI / 180) * angle) * line
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line * 2,
        y + height / 2
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 - Math.sin((Math.PI / 180) * angle) * line
      )
      ctx.lineTo(x - width / 2, y + height / 2)
      ctx.strokeStyle = color.bottom.line
      ctx.fillStyle = color.bottom.fill
      ctx.stroke()
      ctx.fill()

      // 中层板
      ctx.beginPath()
      ctx.moveTo(x - width / 2, y + height / 2 - height * 0.4)
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 + Math.sin((Math.PI / 180) * angle) * line - height * 0.4
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line * 2,
        y + height / 2 - height * 0.4
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line * 2,
        y + height / 2 - height * 0.6
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 + Math.sin((Math.PI / 180) * angle) * line - height * 0.6
      )
      ctx.lineTo(x - width / 2, y + height / 2 - height * 0.6)
      ctx.lineTo(x - width / 2, y + height / 2 - height * 0.4)
      ctx.strokeStyle = color.middle1.line
      ctx.fillStyle = color.middle1.fill
      ctx.stroke()
      ctx.fill()

      // 中层板
      ctx.beginPath()
      ctx.moveTo(x - width / 2, y + height / 2 - height * 0.6)
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 + Math.sin((Math.PI / 180) * angle) * line - height * 0.6
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line * 2,
        y + height / 2 - height * 0.6
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 - Math.sin((Math.PI / 180) * angle) * line - height * 0.6
      )
      ctx.lineTo(x - width / 2, y + height / 2 - height * 0.6)
      ctx.strokeStyle = color.middle2.line
      ctx.fillStyle = color.middle2.fill
      ctx.stroke()
      ctx.fill()

      // 顶层板
      ctx.beginPath()
      ctx.moveTo(x - width / 2, y + height / 2 - height * 1)
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 + Math.sin((Math.PI / 180) * angle) * line - height * 1
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line * 2,
        y + height / 2 - height * 1
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 - Math.sin((Math.PI / 180) * angle) * line - height * 1
      )
      ctx.lineTo(x - width / 2, y + height / 2 - height * 1)
      ctx.strokeStyle = color.top.line
      ctx.fillStyle = color.top.fill
      ctx.stroke()
      ctx.fill()
      // 呼吸灯
      ctx.beginPath()
      ctx.moveTo(x - width / 2, y + height / 2 - height * 1)
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line,
        y + height / 2 + Math.sin((Math.PI / 180) * angle) * line - height * 1
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line * 2,
        y + height / 2 - height * 1
      )
      ctx.lineTo(
        x - width / 2 + Math.cos((Math.PI / 180) * angle) * line * 2.2,
        y - height * 2
      )
      ctx.lineTo(
        x - width / 2 - Math.cos((Math.PI / 180) * angle) * line * 0.2,
        y - height * 2
      )
      ctx.lineTo(x - width / 2, y + height / 2 - height * 1)
      ctx.strokeStyle = color.light.line
      ctx.fillStyle = color.light.fill

      const lingrad = ctx.createLinearGradient(
        x,
        y - height * 2,
        x,
        y + height / 2 + Math.sin((Math.PI / 180) * angle) * line - height * 1
      )
      // 渐变色
      lingrad.addColorStop(0, color.light.stop)
      let appha = 0
      if (parseInt(this.offset / 100) % 2 === 0) {
        appha = (this.offset % 100) / 100
      } else {
        appha = (100 - parseInt(this.offset % 100)) / 100
      }
      // function iconFont(id) {
      //     return document.getElementById(id).textContent;
      // }

      for (var p = 0; p < this.arr.length; p++) {
        var img = this.$refs[this.arr[p].img][0]
        img.onload = () => {}
        ctx.drawImage(img, this.arr[p].x, this.arr[p].y, 50, 50)
      }

      lingrad.addColorStop(1, color.light.end + appha + ')')
      ctx.fillStyle = lingrad
      ctx.fill()
      ctx.fillStyle = valuecolor
      // 数字叠加
      ctx.font = font + 'px bold'
      let w = ctx.measureText(text)
      // ctx.fillText(text, x - w.width / 2, y - height / 2);
      // 标签文字
      ctx.fillStyle = 'rgba(255, 255, 255,1)'
      ctx.font = lablefont + 'px bold'
      w = ctx.measureText(label)
      // ctx.fillText(label, x - w.width / 2, y + height * 2);
    }
  }
}
</script>

<style>
#myCanvas {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
