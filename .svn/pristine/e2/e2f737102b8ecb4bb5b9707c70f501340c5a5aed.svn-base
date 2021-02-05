import { Loading } from 'element-ui'
import _ from 'underscore'

export function iconClassName(icon) {
  if (icon.indexOf('icon-') === 0) return `iconfont ${icon}`
  else if (icon.indexOf('el-icon-') === 0) return icon
  else return ''
}
export function formatTemplateHeight(elements) {
  let height = 0
  if (!(elements instanceof Array) && !elements.offsetHeight) return ''
  if (elements instanceof Array)
    _.each(elements, item => {
      try {
        height += parseInt(item.offsetHeight)
      } catch (e) {
        console.error(e)
      }
    })
  else height = parseInt(elements.offsetHeight)
  return `calc(100% - ${height}px)`
}
export function templateHeight(content, element, cb) {
  if (cb) cb()
  content.style.height = formatTemplateHeight(element)
  window.addEventListener('resize', () => {
    content.style.height = formatTemplateHeight(element)
    if (cb) cb()
  })
}

/**
 * 前端分页
 * @param data
 * @param pageSize
 * @param currentPage
 * @returns {Array}
 */
export function filterTablePage({ data, pageSize, currentPage }) {
  const pageIndex = currentPage - 1
  return _.filter(data, (item, index) => {
    return index >= pageIndex * pageSize && index < currentPage * pageSize
  })
}

export function changeHeight(elements) {
  let height = 0
  if (!(elements instanceof Array) && !elements.offsetHeight) return ''
  if (elements instanceof Array)
    _.each(elements, item => {
      try {
        height += parseInt(item.offsetHeight)
      } catch (e) {
        console.error(e)
      }
    })
  else height = elements.offsetHeight
  return `calc(100% - ${height}px)`
}
export function templateBodyHeight(center, elements) {
  window.onresize = () => {
    center.style.height = changeHeight(elements)
  }
  center.style.height = changeHeight(elements)
}

export function listUnique(array) {
  let temp = [] //一个新的临时数组
  for (let i = 0; i < array.length; i++) {
    if (temp.indexOf(array[i]) == -1) {
      temp.push(array[i])
    }
  }
  return temp
}

export function loading() {
  return Loading.service({
    lock: true,
    text: '加载中',
    target: document.getElementById('right') // 设置加载动画区域
  })
}
