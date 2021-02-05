/*
 * @Descripttion:
 * @version:
 * @Author: CFQ
 * @Date: 2020-03-26 10:02:42
 * @LastEditors: CFQ
 * @LastEditTime: 2020-04-23 10:41:23
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import './plugins/element.js'
import echarts from 'echarts'
import ECharts from 'vue-echarts'
import '@/assets/icons'



Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.prototype.$echarts = echarts
// Vue.prototype.baseURL = 'http://172.18.30.1:9090/hzjgpt/'
// Vue.prototype.baseURL = 'http://192.168.14.104:8080/hzjgpt/'
// Vue.prototype.baseURL = 'http://192.168.11.238:8080/hzjgpt/'
Vue.prototype.baseURL = ''
Vue.component('v-chart', ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
