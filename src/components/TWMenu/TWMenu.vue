<template>
  <div class="tw-menu">
    <template v-for="item in data">
      <tw-menu-group
        :key="item.id"
        :data="item"
        :active="selectRouterPath"
        :open="openPanel"
        @change-open="changeOpenPanel"
        @menu-click="menuClick"
        v-if="hasPathChildren(item)"
      ></tw-menu-group>
      <tw-menu-item
        :key="item.id"
        :data="item"
        :active="selectRouterPath"
        :open="openPanel"
        @click.native="handlerMenuTitleClick(item)"
        v-else
      ></tw-menu-item>
    </template>
  </div>
</template>

<script>
import _ from 'underscore'
import TWMenuGroup from './TWMenuGroup'
import TWMenuItem from './TWMenuItem'

export default {
  name: 'TWMenu',
  data() {
    return {
      active: '',
      openPanel: {}
    }
  },
  props: {
    data: Array,
    height: String
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        const menuList = this.data
        this.openPanel =
          _.map(
            _.filter(menuList, item => {
              return item.fullPath && this.selectRouterPath.indexOf(`${item.fullPath}`) === 0
            }),
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
    init() {
      setTimeout(() => {
        const menuList = this.data
        this.openPanel =
          _.map(
            _.filter(menuList, item => {
              return item.fullPath && this.selectRouterPath.indexOf(`${item.fullPath}`) === 0
            }),
            item => {
              return {
                id: item.id,
                title: item.title,
                fullPath: item.fullPath
              }
            }
          )[0] || {}
      }, 0)
    },
    changeOpenPanel(item) {
      this.active = ''
      this.openPanel = item
    },
    handlerMenuTitleClick(item) {
      this.openPanel = {}
      this.$emit('menu-click', item)
    },
    menuClick(val) {
      this.$emit('menu-click', val)
    },
    hasPathChildren(item) {
      return item.children && item.children.length > 0
    }
  },
  watch: {
    $route(value) {
      this.active = value.path
    }
  },
  components: {
    'tw-menu-group': TWMenuGroup,
    'tw-menu-item': TWMenuItem
  }
}
</script>

<style lang="scss" scoped>
@import './tw-menu-variable';
.tw-menu {
  height: 100%;
  color: $tw-menu-secondaryColor;
}
</style>
