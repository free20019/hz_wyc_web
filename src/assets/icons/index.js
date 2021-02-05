/*
 * @Descripttion:
 * @version:
 * @Author: CFQ
 * @Date: 2020-04-22 16:40:10
 * @LastEditors: CFQ
 * @LastEditTime: 2020-04-23 08:51:57
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('./svg', false, /.svg$/)
// requireAll(req)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
export default req
