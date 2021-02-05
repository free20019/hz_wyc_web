<!-- 数据接入检测 -->
<template>
  <div class="tw-template-wrapper clearfix">
    <img src="../../assets/img/com/yccx.svg" style="display:none" alt="" />
    <img src="../../assets/img/com/ttyx.svg" style="display:none" alt="" />
    <img src="../../assets/img/com/yd.svg" style="display:none" alt="" />
    <img src="../../assets/img/com/bycx.svg" style="display:none" alt="" />
    <img src="../../assets/img/com/laile.svg" style="display:none" alt="" />
    <div class="tw-company" :class="{ success: item.FLAG == '1' }" v-for="(item, index) in companyData" :key="index">
      <img class="tw-img" width="40" height="40" :src="item.imgUrl" />
      <div class="tw-title">平台名称：{{ item.ABB_NAME }}</div>
      <div class="tw-title">今日上报：{{ item.DATAFLOW }}（条）</div>
      <div class="tw-title">更新时间：{{ formatterTime(item.DBTIME) }}</div>
      <div class="tw-title">
        状态：<span :class="{ success: item.FLAG == '1' }">{{ formatterFlag(item.FLAG) }}</span>
      </div>
    </div>
    <div class="tw-refresh" :class="{ donghua: cssFlag }"><i @click="getData" class="el-icon-refresh"></i></div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'underscore'
import { data as test } from '../../assets/js/test2'
export default {
  name: 'DataAccessMonitoring',
  data() {
    return {
      cssFlag: false,
      companyData: [
        {
          ABB_NAME: '去哪儿专车',
          COMPANYID: 'TJHT',
          DATAFLOW: 310117,
          DATETIME: 1591027200000,
          DBTIME: 1591074000000,
          FLAG: '1'
        },
        {
          ABB_NAME: '去哪儿专车',
          COMPANYID: 'TJHT',
          DATAFLOW: 310117,
          DATETIME: 1591027200000,
          DBTIME: 1591074000000,
          FLAG: '1'
        },
        {
          ABB_NAME: '去哪儿专车',
          COMPANYID: 'TJHT',
          DATAFLOW: 310117,
          DATETIME: 1591027200000,
          DBTIME: 1591074000000,
          FLAG: '0'
        },
        {
          ABB_NAME: '去哪儿专车',
          COMPANYID: 'TJHT',
          DATAFLOW: 310117,
          DATETIME: 1591027200000,
          DBTIME: 1591074000000,
          FLAG: '1'
        },
        {
          ABB_NAME: '去哪儿专车',
          COMPANYID: 'TJHT',
          DATAFLOW: 310117,
          DATETIME: 1591027200000,
          DBTIME: 1591074000000,
          FLAG: '1'
        },
        {
          ABB_NAME: '去哪儿专车',
          COMPANYID: 'TJHT',
          DATAFLOW: 310117,
          DATETIME: 1591027200000,
          DBTIME: 1591074000000,
          FLAG: '1'
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
    formatterTime(data) {
      return (data && moment(data).format('YYYY-MM-DD HH:mm:ss')) || ''
    },
    formatterFlag(flag) {
      return flag == '0' ? '警告' : flag == '1' ? '正常' : ''
    },
    getData() {
      this.cssFlag = !this.cssFlag
      this.companyData = []
      const baseURL = this.baseURL
      axios
        .get('data/getCompanyDataFlow', {
          baseURL
        })
        .then(res => {
          this.formatterData(res.data.datas)
        })
      // this.formatterData(test[0].datas)
    },
    formatterData(data) {
      this.companyData = _.map(data, item => {
        if (item.COMPANYID == 'aa')
          return {
            ...item,
            imgUrl: 'img/aazc.a3ff9f5b.svg'
          }
        else if (item.COMPANYID == 'didi')
          return {
            ...item,
            imgUrl: 'img/ddzc.450d7dcb.svg'
          }
        else if (item.COMPANYID == 'TJHT')
          return {
            ...item,
            imgUrl: 'img/xcyc.a6468b4e.svg'
          }
        else if (item.COMPANYID == 'shenzhou')
          return {
            ...item,
            imgUrl: 'img/szzc.47927ac9.svg'
          }
        else if (item.COMPANYID == 'tmcx')
          return {
            ...item,
            imgUrl: 'img/tmcx.8b4fc437.svg'
          }
        else if (item.COMPANYID == 'weixing')
          return {
            ...item,
            imgUrl: 'img/ycx.b2da81f8.svg'
          }
        else if (item.COMPANYID == 'xiangdao')
          return {
            ...item,
            imgUrl: 'img/xiangdao.d15e5d96.svg'
          }
        else if (item.COMPANYID == 'wanshun')
          return {
            ...item,
            imgUrl: 'img/wszc.845df5fb.svg'
          }
        else if (item.COMPANYID == 'yangguangchedao')
          return {
            ...item,
            imgUrl: 'img/ygzc.266075ad.svg'
          }
        else if (item.COMPANYID == 'dccx')
          return {
            ...item,
            imgUrl: 'img/dccx.2b7e5c50.svg'
          }
        else if (item.COMPANYID == 'shouyue')
          return {
            ...item,
            imgUrl: 'img/sqzc.d261b8f1.svg'
          }
        else if (item.COMPANYID == 'tongcheng')
          return {
            ...item,
            imgUrl: 'img/mzdc.c8d98929.svg'
          }
        else if (item.COMPANYID == 'caocao')
          return {
            ...item,
            imgUrl: 'img/cczc.115a64cd.svg'
          }
        else if (item.COMPANYID == 'xiehua')
          return {
            ...item,
            imgUrl: 'img/xiehua.81c09aee.svg'
          }
        else if (item.COMPANYID == 'hhyc')
          return {
            ...item,
            imgUrl: 'img/hhdc.fce5ae04.svg'
          }
        else if (item.COMPANYID == 'lvcheng')
          return {
            ...item,
            imgUrl: 'img/lcyc.3dbae791.svg'
          }
        else if (item.COMPANYID == 'T3')
          return {
            ...item,
            imgUrl: 'img/t3cx.9ce43b6e.svg'
          }
        else if (item.COMPANYID == 'jbyy')
          return {
            ...item,
            imgUrl: 'img/jbyy.07982317.svg'
          }
        else if (item.COMPANYID == 'tfcx')
          return {
            ...item,
            imgUrl: 'img/tfcx.bbd59ccf.svg'
          }
        else if (item.COMPANYID == 'yicheng')
          return {
            ...item,
            imgUrl: 'img/yccx.f266ceab.svg'
          }
        else if (item.COMPANYID == 'tuotuo')
          return {
            ...item,
            imgUrl: 'img/ttyx.fdb55516.svg'
          }
        else if (item.COMPANYID == 'gscx' || item.ABB_NAME === '格上出行')
          return {
            ...item,
            imgUrl: 'img/gscx.74b3d6ee.svg'
          }
        else if (item.COMPANYID == 'yd' || item.ABB_NAME === '易到用车')
          return {
            ...item,
            imgUrl: 'img/yd.60c2d6f5.svg'
          }
        else if (item.COMPANYID == 'zhongche' || item.ABB_NAME === '众车出行')
          return {
            ...item,
            imgUrl: 'img/zccx.b2fea293.svg'
          }
        else if (item.COMPANYID == 'jishi' || item.ABB_NAME === '及时用车')
          return {
            ...item,
            imgUrl: 'img/jsyc.617c084c.svg'
          }
        else if (item.COMPANYID == 'wanglu' || item.ABB_NAME === '网路出行')
          return {
            ...item,
            imgUrl: 'img/wlcx.e9b3026a.svg'
          }
        else if (item.COMPANYID == 'jike' || item.ABB_NAME === '吉刻上车')
          return {
            ...item,
            imgUrl: 'img/jksc.a413bca2.svg'
          }
        else if (item.COMPANYID == 'leili' || item.ABB_NAME === '雷利出行')
          return {
            ...item,
            imgUrl: 'img/llcx.306c1df3.svg'
          }
        else if (item.COMPANYID == 'didihxz' || item.ABB_NAME === '花小猪')
          return {
            ...item,
            imgUrl: 'img/hxz.36693ca7.svg'
          }
        else if (item.COMPANYID == 'oula' || item.ABB_NAME === '福瑞出行')
          return {
            ...item,
            imgUrl: 'img/frcx.a3ba8923.svg'
          }
        else if (item.COMPANYID == 'shaodianbao' || item.ABB_NAME === '捎点宝')
          return {
            ...item,
            imgUrl: 'img/sdb.1a919eb0.svg'
          }
        else if (item.ABB_NAME === '来了出行')
          return {
            ...item,
            imgUrl: 'img/laile.8a0adc17.svg'
          }
        else if (item.ABB_NAME === '博约出行')
          return {
            ...item,
            imgUrl: 'img/bycx.87913a0c.svg'
          }
        else
          return {
            ...item
          }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-template-wrapper {
  overflow-y: auto;
  position: relative;
}
.tw-company {
  float: left;
  width: 255px;
  height: 200px;
  margin: 15px 35px;
  box-shadow: 3px 3px 9px red;
  border-radius: 20px;
  box-sizing: border-box;
  border: 1px solid red;
  &.success {
    box-shadow: 1px 3px 9px #64ba36;
    border: 1px solid #64ba36;
  }
  .tw-img {
    padding: 5px;
  }
  .tw-title {
    line-height: 20px;
    padding: 5px 0;
    margin: 0 10px;
    font-size: 15px;
    border-bottom: 1px solid #eeeeee;
    span {
      color: red;
      font-weight: 600;
      &.success {
        color: #64ba36;
      }
    }
  }
}
.tw-refresh {
  position: fixed;
  bottom: 30px;
  right: 30px;
  font-size: 40px;
  // transform: rotate(360deg);
  animation: spin 2s 1;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  &.donghua {
    animation: spin 2s 1;
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
