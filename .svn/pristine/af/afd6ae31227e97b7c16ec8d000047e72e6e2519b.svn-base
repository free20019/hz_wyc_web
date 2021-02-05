<template>
  <div class="tw-layout">
    <div class="tw-layout-header">
      <div class="tw-title">杭州市约租车监管平台</div>
      <div class="tw-toolbar">
        <div
          class="tw-toolbar-item"
          :class="{ active: activeMenu(item) }"
          v-for="item in headMenu"
          :key="item.id"
          @click="handleMenuItemClick(item)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="tw-toolbar-item tw-toolbar__controller">
        <span class=" tw-user-text">当前用户：{{ titleName }}</span>
        <tw-icon class="tw-logout " icon="icon-close" font-size="24px" @click.native="logout"></tw-icon>
      </div>
    </div>
    <div class="tw-layout-left" ref="layMenu" style="z-index: 2000;">
      <t-menu
        class="tw-secondary-menu-body"
        :data="menu.list"
        height="calc(100% - 50px)"
        ref="menu"
        @menu-click="menuClick"
      ></t-menu>
    </div>
    <div class="tw-layout-body" ref="layContent">
      <el-tabs
        class="tw-index-tabs"
        type="card"
        closable
        @tab-remove="removeTab"
        v-model="activeName"
        @tab-click="handleTabClick"
      >
        <el-tab-pane v-for="item in tabList" :key="item.href" :label="item.title" :name="item.href"> </el-tab-pane>
      </el-tabs>
      <keep-alive>
        <router-view @jump-event="handleJump"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import TMenu from '../components/TWMenu/TWMenu.vue'
import { secondMenu, headMenu } from '../assets/js/menu.comfig2'
import TWIcon from '../components/TWIcon'
import axios from 'axios'
import _ from 'underscore'
import warterMark from '../assets/js/warterMark'
export default {
  name: 'Index2',
  data() {
    return {
      titleName: '',
      headMenu: headMenu,
      secondMenu: secondMenu,
      menu: {
        list: [],
        active: ''
      },
      activeName: '',
      systemMenuList: [],
      username: '',
      tabList: [],
      activeItem: {},
      interval: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.interval = setInterval(this.getLogin, 3000)
      const baseURL = this.baseURL
      this.getQx()
      this.$store.dispatch('getCompanyList', baseURL)
    })
  },
  methods: {
    // 营运总览 跳转 日常监测预警
    handleJump(path) {
      this.$router.push({ path })
      setTimeout(() => {
        this.getMenu(path)
      })
    },
    getLogin() {
      const baseURL = this.baseURL
      const params = new URLSearchParams()
      axios.post('map/xt',params, { baseURL }).then(res => {
        if(!this.$route.path == '/login'){
          if(res.data.code == 510) {
            this.$alert('您长时间未操作，请重新登录！','提示',{
              confirmButtonText: '确定',
              callback: () => {
                clearInterval(this.interval)
                this.$router.push({
                  name: 'Login'
                })
              }
            })
        }
        }
      })
    },
    menuClick(val) {
      let list = _.filter(this.tabList, item => {
        return item.id == val.id
      })
      if (list.length == 0) {
        this.tabList.push(val)
      }
      this.activeName = val.href
    },
    getTabs() {
      this.activeName = this.activeItem.href
      let list = _.filter(this.tabList, item => {
        return item.href == this.activeItem.href
      })
      if (list.length == 0) {
        this.tabList.push(this.activeItem)
      }
    },
    removeTab(targetName) {
      if (this.tabList.length > 1) {
        this.tabList = _.filter(this.tabList, item => {
          return item.href != targetName
        })
        if (this.activeName == targetName) {
          this.$router.push({ path: this.tabList[0].href })
          this.activeName = this.tabList[0].href
          this.getMenu(this.tabList[0].href)
        }
      }
    },
    handleTabClick(tab, event) {
      if (tab.name != this.$route.path) {
        this.$router.push({ path: tab.name })
        this.getMenu(tab.name)
      }
    },
    getMenu(href) {
      if (href.indexOf('yingyunzonglan') > -1) {
        this.$refs.layMenu.style.width = '0px'
        this.$refs.layContent.style.width = '100%'
        this.$refs.layContent.style.marginLeft = '0px'
      } else {
        this.$refs.layMenu.style.width = '260px'
        this.$refs.layContent.style.width = 'calc(100% - 260px)'
        this.$refs.layContent.style.marginLeft = '260px'
      }
      this.menu.list = []
      let list = _.filter(this.secondMenu, item => {
        return href.indexOf(item.id) > -1
      })[0].children
      this.menu.list = list
      this.formatterSecondMenu(href, list)
      this.getTabs()
    },
    formatterSecondMenu(href, list) {
      if (list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].children) {
            this.formatterSecondMenu(href, list[i].children)
          } else {
            if (href == list[i].href) {
              this.activeItem = list[i]
              // this.$refs.menu.open = list[i]
              this.$refs.menu.active = list[i].href
              setTimeout(() => {
                this.$refs.menu.init()
              }, 100)
            }
          }
        }
      }
      if (href == '/yingyunzonglan') {
        this.activeItem = {
          id: 'yingyunzonglan',
          title: '营运总览',
          icon: 'icon-dtjk',
          href: '/yingyunzonglan'
        }
      }
    },
    handleMenuItemClick(item) {
      if (item.id == 'yingyunzonglan') {
        this.$refs.layMenu.style.width = '0px'
        this.$refs.layContent.style.width = '100%'
        this.$refs.layContent.style.marginLeft = '0px'
      } else {
        this.$refs.layMenu.style.width = '260px'
        this.$refs.layContent.style.width = 'calc(100% - 260px)'
        this.$refs.layContent.style.marginLeft = '260px'
      }

      this.$router.push({ path: item.fullPath })
      this.getMenu(item.fullPath)
    },
    activeMenu(item) {
      return this.$route.path.indexOf(item.id) === 1
    },
    logout() {
      const baseURL = this.baseURL
      axios.post('user/loginOut', '', { baseURL }).then(() => {
        this.$router.push({ path: '/login' })
      })
    },

    getQx() {
      const baseURL = this.baseURL
      this.secondMenu = []
      this.headMenu = []
      const params = new URLSearchParams()
      this.username = this.$cookies.get('username')
      if (!this.$cookies.get('username')) this.username = this.$store.state.username
      console.info('success', this.username)
      let qxList = ''
      params.append('username', this.username)
      // params.append('username', 'gly')
      axios.post('user/getUserPower', params, { baseURL }).then(res => {
        this.titleName = res.data.length > 0 ? res.data[0].XM : ''
        if (res.data.length == 0) {
          this.$router.push({ path: '/login' })
        } else {
          qxList = res.data[0].QX
          warterMark.set(res.data[0].XM)
          let list = this.formateMenu(JSON.parse(JSON.stringify(secondMenu)), qxList)
          let head = this.formateHeadMenu(list)
          console.info(list)
          this.secondMenu = list
          this.headMenu = head
          this.getMenu(this.$route.path)
        }
        // warterMark.set('超级管理员')
        // this.formateMenu(qxList)
      })
    },
    formateHeadMenu(list) {
      console.info(_.pluck(list, 'id').join())
      let str = _.pluck(list, 'id').join()
      return _.filter(JSON.parse(JSON.stringify(headMenu)), item => {
        return str.indexOf(item.id) > -1
      })
    },
    formateMenu(arr, tempMenuId) {
      return _.filter(arr, item => {
        if (item.children && item.children.length > 0) {
          let menu = this.formateMenu(item.children, tempMenuId)
          if (menu.length > 0) {
            item.children = menu
            return true
          }
          return false
        } else {
          return tempMenuId.indexOf(item.id) >= 0
        }
      })
    }
  },
  components: { TMenu, 'tw-icon': TWIcon }
}
</script>

<style lang="scss" scoped>
.tw-layout-header {
  display: flex;
  .tw-title {
    padding: 0 10px;
    font-size: 25px;
    line-height: 50px;
    color: #ffffff;
    float: left;
    letter-spacing: 0.2em;
  }
  .tw-title,
  .tw-toolbar {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .tw-toolbar {
    flex: 1;
    justify-content: center;
    padding-right: 10px;
    &-item {
      position: relative;
      display: flex;
      align-items: center;
      height: 50px;
      padding-left: 20px;
      padding-right: 20px;
      cursor: pointer;
      color: #ffffff;
      transition: background-color 0.3s ease-in-out;
      font-size: 16px;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 0;
      }
      &::after {
        width: 0;
        height: 4px;
        background-color: #ffffff;
        transition: width 0.3s ease-in-out;
      }

      &:hover,
      &.active {
        background-color: #7cb0f0;
        &::after {
          width: 100%;
        }
      }

      &.active {
        font-weight: 600;
      }
    }
    &__controller {
      // width: 200px;
      cursor: default;

      &::after {
        display: none;
      }

      &:hover {
        background-color: transparent;
      }

      .tw-button {
        &__icon {
          margin-right: 15px;
          cursor: pointer;

          &:hover {
            text-shadow: 0 0 4px #000000;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
.tw-layout {
  $leftWidth: 260px;
  $leftWidth__hover: 300px;
  &-header {
    box-sizing: border-box;
    background-color: #084aa1;
  }
  &-left {
    width: $leftWidth;
    background-color: #113f67;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &-body {
    width: calc(100% - #{$leftWidth});
    margin-left: $leftWidth;
    overflow-y: hidden;
  }
}
.tw-logout {
  float: right;
  line-height: 50px;
  margin-right: 15px;
  color: #ffffff;
  cursor: pointer;
}
.tw-user-text {
  float: right;
  line-height: 50px;
  font-size: 16px;
  color: #ffffff;
  margin-right: 10px;
}
</style>
