<template>
  <div class="tw-template-wrapper">
    <div class="tw-login-title">杭州网约车监管服务平台</div>
    <div class="tw-login-box">
      <div class="tw-login-item">
        <el-input v-model="login.username" placeholder="用户名" :prefix-icon="iconClassName('icon-user')" type="text"></el-input>
      </div>
      <div class="tw-login-item">
        <el-input v-model="login.password" placeholder="密码" :prefix-icon="iconClassName('icon-key')" type="text"></el-input>
      </div>
      <div class="tw-login-item">
        <el-button class="tw-btn-block" type="primary" @click="loginClick">登&emsp;录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {iconClassName} from '../assets/js/util'
  export default {
    name: 'Login',
    data() {
      return {
        login: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      iconClassName
    }
  }
</script>

<style lang="scss" scoped>
  .tw-template-wrapper {
    background-color: #e8fdff;
    background-image: url(../assets/analyze_data.svg);
    background-position: calc(100% - 120px) calc(50% + 40px);
    background-size: 40% auto;
    background-repeat: no-repeat;
  }
</style>
