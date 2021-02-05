<!--
 * @Descripttion: 
 * @version: 
 * @Author: CFQ
 * @Date: 2019-12-09 11:58:35
 * @LastEditors: CFQ
 * @LastEditTime: 2020-04-13 15:16:07
 -->
<template>
  <div class="tw-menu-item" :class="{ active: hasActive(data) }">
    <router-link tag="div" class="tw-menu-link" :to="data.href">
      <tw-icon :icon="data.icon"></tw-icon>
      <span>{{ data.title }}</span>
    </router-link>
  </div>
</template>

<script>
import TWIcon from '../TWIcon'

export default {
  name: 'TWMenuItem',
  props: {
    data: Object,
    active: String,
    open: {}
  },
  methods: {
    hasActive(item) {
      const active = this.active
      const openItem = this.open
      return (
        active === item.href &&
        (Object.prototype.toString.call(openItem).indexOf('Object') === -1 ||
          active.indexOf(openItem.fullPath) === -1)
      )
      // return Object.prototype.toString.call(openItem).indexOf('Object') === -1 ? active === item.href : active.indexOf(openItem.fullPath) === 0;
    }
  },
  components: {
    'tw-icon': TWIcon
  }
}
</script>

<style lang="scss" scoped>
@import './tw-menu-variable';

.tw-menu {
  &-item {
    height: $tw-menu-itemHeight;
    font-size: $tw-menu-fontSize_default;
    line-height: $tw-menu-itemHeight;
    cursor: pointer;
    box-sizing: border-box;
    color: #9db7d0;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      /*right: 0;*/
      width: 0;
      height: 100%;
      transition: width 0.5s ease;
    }
    &:hover,
    &.active {
      color: #6bacfb;
      // border-bottom: 1px solid #6aa7f8;
      // border-top: 1px solid #6aa7f8;
    }

    &.active {
      position: relative;
    }
  }

  &-link {
    padding-left: $margin;
    padding-right: $margin;
  }
}
.tw-icon {
  width: $tw-menu-totalWidth - 10px;
  text-align: center;
}
</style>
