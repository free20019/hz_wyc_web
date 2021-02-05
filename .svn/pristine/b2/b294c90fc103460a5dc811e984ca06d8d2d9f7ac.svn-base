<!--
 * @Descripttion: 
 * @version: 
 * @Author: CFQ
 * @Date: 2020-03-26 14:13:31
 * @LastEditors: CFQ
 * @LastEditTime: 2020-04-02 10:45:38
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
      label-width="100px"
      ref="platformBaseInfo"
    >
      <el-form-item label="姓名">
        <el-input :value="(selectRow && selectRow.NAME) || ''" readonly></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input :value="(selectRow && selectRow.ID_NUMBER) || ''" readonly></el-input>
      </el-form-item>
      <el-form-item label="资格证号">
        <el-input readonly></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input :value="sexFormatter(selectRow.SEX)" readonly></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-input :value="timeFormatter(selectRow.BIRTHDAY)" readonly></el-input>
      </el-form-item>
      <el-form-item label="民族">
        <el-input :value="selectRow.NATION" readonly></el-input>
      </el-form-item>
      <el-form-item label="档案号">
        <el-input :value="selectRow.FILE_NUMBER" readonly></el-input>
      </el-form-item>
      <el-form-item label="所在行政区划">
        <el-input :value="selectRow.DISTRICT" readonly></el-input>
      </el-form-item>
      <el-form-item label="暂住证号码">
        <el-input readonly></el-input>
      </el-form-item>
      <el-form-item label="身份证地址">
        <el-input :value="selectRow.ID_ADDR" readonly></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input :value="selectRow.PHONE" readonly></el-input>
      </el-form-item>
      <el-form-item label="现住地址">
        <el-input :value="selectRow.LIVING_ADDR" readonly></el-input>
      </el-form-item>
    </el-form>
    <div class="tw-dialog-title" style="margin-top:10px">
      <div>资格信息</div>
    </div>
    <el-form
      class="tw-form"
      label-position="right"
      :inline="true"
      size="small"
      label-width="100px"
      ref="platformBaseInfo"
    >
      <el-form-item label="证件编号">
        <el-input :value="selectRow.DRIVER_NUM" readonly></el-input>
      </el-form-item>
      <el-form-item label="从业资格类别">
        <el-input :value="selectRow.CERTI_SUB_CODE" readonly></el-input>
      </el-form-item>
      <el-form-item label="证件状态">
        <el-input :value="statusFormatter('', '', selectRow.STATUS)" readonly></el-input>
      </el-form-item>
      <el-form-item label="发证机关">
        <el-input :value="selectRow.ORGAN_CODE" readonly></el-input>
      </el-form-item>
      <el-form-item label="有效期起">
        <el-input :value="timeFormatter(selectRow.VALID_DATE_BEGIN)" readonly></el-input>
      </el-form-item>
      <el-form-item label="有效期止">
        <el-input :value="timeFormatter(selectRow.VALID_DATE_END)" readonly></el-input>
      </el-form-item>
      <el-form-item label="初领日期">
        <el-input :value="timeFormatter(selectRow.CERTI_EARLY_DATE)" readonly></el-input>
      </el-form-item>
      <el-form-item label="核发日期">
        <el-input :value="timeFormatter(selectRow.PRINT_DATE)" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'IdCard',
  props: {
    selectRow: Object
  },
  methods: {
    //颜色状态
    statusFormatter(item, col, value) {
      if (value == '0') {
        return '正常'
      } else if (value == '1') {
        return '老系统(弃用)'
      } else if (value == '0') {
        return '注销'
      } else {
        return value
      }
    },
    //性别状态
    sexFormatter(value = '') {
      if (value == '2') {
        return '女'
      } else if (value == '1') {
        return '男'
      } else {
        return value
      }
    },
    timeFormatter(value) {
      if (value != null) {
        return moment(value).format('YYYY-MM-DD')
      }
    }
  }
}
</script>

<style></style>
