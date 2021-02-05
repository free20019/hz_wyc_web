<!--
 * @Descripttion: 
 * @version: 
 * @Author: CFQ
 * @Date: 2020-03-26 14:35:42
 * @LastEditors: CFQ
 * @LastEditTime: 2020-04-02 10:48:28
 -->
<template>
  <div class="tw-template-wrapper">
    <div class="tw-dialog-title">
      <div>基本信息</div>
    </div>
    <el-form
      class="tw-form"
      label-position="right"
      :inline="true"
      size="small"
      label-width="150px"
      ref="platformBaseInfo"
    >
      <el-form-item label="车牌号码">
        <el-input :value="selectRow.AUTO_NUM" readonly></el-input>
      </el-form-item>
      <el-form-item label="车牌颜色">
        <el-input :value="colorFormatter('', '', selectRow.LICENSE_PLATE_COLOR)" readonly></el-input>
      </el-form-item>
      <el-form-item label="车辆类型">
        <el-input readonly></el-input>
      </el-form-item>
      <el-form-item label="业户名称">
        <el-input :value="selectRow.OWNER" readonly></el-input>
      </el-form-item>
      <el-form-item label="经营许可证号">
        <el-input readonly></el-input>
      </el-form-item>
      <el-form-item label="经营许可证有效期止">
        <el-input readonly></el-input>
      </el-form-item>
      <el-form-item label="所在行政区划">
        <el-input :value="selectRow.DISTRICT" readonly></el-input>
      </el-form-item>
      <el-form-item label="业户经营范围">
        <el-input :value="selectRow.AREA" readonly></el-input>
      </el-form-item>
      <el-form-item label="核定载客">
        <el-input :value="selectRow.SEATS" readonly></el-input>
      </el-form-item>
      <el-form-item label="行驶证初次登记日期">
        <el-input :value="selectRow.LICENSE_REGISTER_DATE" readonly></el-input>
      </el-form-item>
      <el-form-item label="厂牌">
        <el-input :value="selectRow.FACTORY_PLATE" readonly></el-input>
      </el-form-item>
      <el-form-item label="型号">
        <el-input :value="selectRow.BRAND" readonly></el-input>
      </el-form-item>
      <el-form-item label="车身颜色">
        <el-input readonly></el-input>
      </el-form-item>
      <el-form-item label="车长(毫米)">
        <el-input :value="selectRow.BUS_LENGTH" readonly></el-input>
      </el-form-item>
      <el-form-item label="车宽(毫米)">
        <el-input :value="selectRow.BUS_WIDTH" readonly></el-input>
      </el-form-item>
      <el-form-item label="车高(毫米)">
        <el-input :value="selectRow.BUS_HEIGHT" readonly></el-input>
      </el-form-item>
      <el-form-item label="所属平台">
        <el-input readonly></el-input>
      </el-form-item>
      <el-form-item label="车辆经营范围">
        <el-input :value="selectRow.AREA" readonly></el-input>
      </el-form-item>
      <el-form-item label="燃料消耗">
        <el-input :value="selectRow.FUEL_USAGE" readonly></el-input>
      </el-form-item>
      <el-form-item label="计税价格">
        <el-input :value="selectRow.TAX_PRICE" readonly></el-input>
      </el-form-item>
      <el-form-item label="车主姓名">
        <el-input :value="selectRow.OWNER" readonly></el-input>
      </el-form-item>
      <el-form-item label="车主手机号">
        <el-input :value="selectRow.OWNER_TEL" readonly></el-input>
      </el-form-item>
      <el-form-item label="车主地址">
        <el-input readonly></el-input>
      </el-form-item>
      <el-form-item label="车主身份证号">
        <el-input readonly></el-input>
      </el-form-item>
    </el-form>
    <div class="tw-dialog-title" style="margin-top:10px">
      <div>道路运输证信息</div>
    </div>
    <el-form
      class="tw-form"
      label-position="right"
      :inline="true"
      size="small"
      label-width="150px"
      ref="platformBaseInfo"
    >
      <el-form-item label="道路运输证号">
        <el-input :value="selectRow.LICENSE_NUMBER" readonly></el-input>
      </el-form-item>
      <el-form-item label="道路运输证字号">
        <el-input :value="selectRow.LICENSE_KEY" readonly></el-input>
      </el-form-item>
      <el-form-item label="发证机关">
        <el-input :value="selectRow.ISSUING_AGENCY" readonly></el-input>
      </el-form-item>
      <el-form-item label="有效期起">
        <el-input :value="timeFormatter(selectRow.START_DATE)" readonly></el-input>
      </el-form-item>
      <el-form-item label="有效期止">
        <el-input :value="timeFormatter(selectRow.END_DATE)" readonly></el-input>
      </el-form-item>
      <el-form-item label="核发日期">
        <el-input :value="timeFormatter(selectRow.ISSUING_DATE)" readonly></el-input>
      </el-form-item>
      <el-form-item label="年审有效期止">
        <el-input :value="timeFormatter(selectRow.ANNUAL_END_DATE)" readonly></el-input>
      </el-form-item>
      <el-form-item label="初次发证时间">
        <el-input :value="timeFormatter(selectRow.FIRST_ISSUING_DATE)" readonly></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input :value="statusFormatter('', '', selectRow.STATUS)" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'CarInfo',
  props: {
    selectRow: Object
  },
  methods: {
    //颜色状态
    colorFormatter(item, col, value) {
      if (value == '2600') {
        return '蓝色'
      } else if (value == '2603') {
        return '渐变绿'
      } else {
        return value
      }
    },
    //颜色状态
    statusFormatter(item, col, value) {
      if (value == '10') {
        return '正常'
      } else if (value == '80') {
        return '注销'
      } else if (value == '35') {
        return '过户'
      } else {
        return value
      }
    },
    timeFormatter(value) {
      console.info(value)
      if (value != null) {
        return moment(value).format('YYYY-MM-DD')
      }
    }
  }
}
</script>

<style></style>
