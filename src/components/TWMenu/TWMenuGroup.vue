<template>
  <div class="tw-menu-group">
    <div
      class="tw-menu-title"
      :class="{
        active: hasActiveMenuPanel(data),
        open: hasOpenMenuPanel(data)
      }"
      @click="handlerMenuTitleClick(data)"
    >
      <tw-icon :icon="data.icon"></tw-icon>
      <span>{{ data.title }}</span>
      <tw-icon class="tw-suffix-icon" icon="el-icon-arrow-down"></tw-icon>
    </div>
    <div class="tw-menu-panel" :class="{ open: hasOpenMenuPanel(data) }">
      <template v-for="item in data.children">
        <t-w-menu-group
          :key="item.id"
          :data="item"
          :active.sync="active"
          :open="openPanelItem"
          @change-open="changeOpenPanel"
          v-if="item.children"
        ></t-w-menu-group>
        <tw-menu-item
          :key="item.id"
          :data="item"
          :active.sync="active"
          @click.native="handlerMenuItemClick(item)"
          v-else
        ></tw-menu-item>
      </template>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import TWMenuItem from './TWMenuItem'
import TWIcon from '../TWIcon'

export default {
  name: 'TWMenuGroup',
  data() {
    return {
      openPanelItem: {}
    }
  },
  props: {
    data: Object,
    active: String,
    open: {}
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        const menuList = this.data
        this.openPanelItem =
          _.map(
            _.filter(
              menuList.children,
              item =>
                item.fullPath &&
                this.selectRouterPath.indexOf(`${item.fullPath}`) === 0
            ),
            item => {
              return {
                id: item.id,
                title: item.title,
                fullPath: item.fullPath
              }
            }
          )[0] || {}
      }, 0)
    })
  },
  computed: {
    selectRouterPath() {
      return this.$route.path
    }
  },
  methods: {
    changeOpenPanel(item) {
      this.openPanelItem = item
      console.info('TWMenuGroup-changeOpenPanel:', item)
    },
    handlerMenuItemClick(item) {
      this.openPanelItem = {}
      this.$emit('menu-click', item)
    },
    handlerMenuTitleClick(item) {
      if (this.open.id && this.open.fullPath === item.fullPath)
        this.$emit('change-open', {})
      else
        this.$emit('change-open', {
          id: item.id,
          title: item.title,
          fullPath: item.fullPath
        })
    },
    hasActiveMenuPanel(item) {
      const routerPath = this.selectRouterPath
      return routerPath.indexOf(item.fullPath) === 0
    },
    hasOpenMenuPanel(item) {
      const active = this.active
      const openPanelItem = this.open
      return openPanelItem
        ? openPanelItem.fullPath === item.fullPath
        : active.indexOf(item.fullPath) === 0
    }
  },
  components: {
    'tw-menu-item': TWMenuItem,
    'tw-icon': TWIcon
  }
}
</script>

<style lang="scss" scoped>
@import './tw-menu-variable';

.tw-menu {
  &-group {
    font-size: $tw-menu-fontSize_default;
  }
  &-title {
    position: relative;
    height: $tw-menu-itemHeight;
    padding-left: $margin;
    padding-right: $margin;
    line-height: $tw-menu-itemHeight;
    cursor: pointer;

    &:hover {
      color: $tw-menu-itemColor_active;
      background-color: $tw-menu-itemBgColor_active;
    }

    &.open {
      color: $tw-menu-openColor;
      background-color: $tw-menu-itemBgColor_active;
      &.active {
        // background-color: #336e90;
        /*background-color: rgba(0, 0, 0, 0.2);*/
      }
      .tw-suffix-icon {
        transform: translateY(-50%) rotateZ(180deg);
      }
    }
    .tw-suffix-icon {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      transition: all 0.3s ease;
    }
  }

  &-panel {
    display: none;
    background-color: $tw-menu-panelBgColor;
    transition: all 0.5s ease;
    @mixin innerShadow_tb() {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      box-shadow: 0 0 8px $tw-menu-panelShadowColor,
        0 0 6px $tw-menu-panelShadowColor;
    }
    &.open {
      position: relative;
      overflow: hidden;
      display: block;
      &:before,
      &:after {
        //@include innerShadow_tb;
      }
      &:before {
        top: -1px;
      }
      &:after {
        bottom: -1px;
      }
      .tw-menu-item.active {
        &:first-child,
        &:last-child {
          position: relative;
          &:after {
            //@include innerShadow_tb;
          }
        }
        &:first-child {
          &:after {
            top: -1px;
          }
        }
        &:last-child {
          &:after {
            bottom: -1px;
          }
        }
      }
    }

    .tw-menu {
      &-title {
        height: $tw-menu-itemHeight;
      }
      &-item {
        padding-left: $margin * 1.5;
        &:hover {
          /*color: #ffffff;*/
          /*background-color: rgba(255, 255, 255, 0.2);*/
          /*background-color: #0a5380;*/
        }
        &.active {
          /*color: #ffffff;*/
          /*background-color: rgba(255, 255, 255, 0.2);*/
        }
      }
      &-panel {
        .tw-menu {
          &-item {
            padding-left: 25px;
          }
        }
      }
    }
  }
}

.tw-icon {
  width: $tw-menu-itemHeight;
  text-align: center;
}
</style>
