<template>
  <div class="tw-layout">
    <div class="tw-layout-header">
      <div class="tw-title">杭州市约租车监管平台</div>
      <tw-icon class="tw-logout" icon="icon-close" font-size="24px" @click.native="logout"></tw-icon>
    </div>
    <div
      class="tw-layout-left"
      :class="{hover: hasHoverLeftBar || hasSecondaryMenu}"
      style="z-index: 2500;"
    >
      <tw-system-menu
        :data="{systemMenu: systemMenuList, secondaryMenu: menuLists}"
        @system-item-click="handleSystemItemClick"
        @display-state="handleSecondaryDisplayState"
        @mouseenter="handleLeftBarMouseenter"
        @mouseleave="handleLeftBarMouseleave"
      ></tw-system-menu>
    </div>
    <div class="tw-layout-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import _ from 'underscore';
import TWIcon from "../components/TWIcon";
import TWSystemMenu from "../components/TWMenu/TWSystemMenu";
import { systemMenu, secondaryMenu } from "../assets/js/menu.comfig";

export default {
  name: "Index",
  data() {
    return {
      hasHoverLeftBar: false,
      hasSecondaryMenu: false,
      systemMenuList: [],
      menuLists: {},
      systemMenuList2: [],
      menuLists2: {}
    };
  },
  created() {
    this.$nextTick(() => {
      const baseURL = this.baseURL;
      this.systemMenuList = JSON.parse(JSON.stringify(systemMenu));
      this.menuLists = JSON.parse(JSON.stringify(secondaryMenu));
      this.$store.dispatch('getCompanyList', baseURL)
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.getQx();
    });
  },
  methods: {
    logout(){
      const baseURL = this.baseURL;
      axios.post('user/loginOut','',{baseURL}).then(() =>{
        this.$router.push({ path: "/login" });
      })
    },
    getQx(){
      const baseURL = this.baseURL;
      const params = new URLSearchParams();
      let username = this.$cookies.get('username');
      let qxList = '';
      params.append('username',username);
      axios.post('user/getUserPower',params,{baseURL}).then(res =>{
        console.log(res)
        qxList = res.data[0].QX;
        this.formatterSysMenu(qxList);
      });
    },
    formatterSysMenu(qxList){
      let list =[];
      _.each(this.systemMenuList , (item,index) =>{
        if(qxList.indexOf(item.id) >= 0){
          list.push(item)
        }
        this.systemMenuList = list;
      });
      _.each(list , i =>{
        this.menuLists[i.id] = this.formatterSecondeMenu(this.menuLists[i.id] , qxList);
      })
    },
    formatterSecondeMenu(arr,qxList){
      return _.filter(arr, item => {
        if (item.children) {
          let menu = this.formatterSecondeMenu(item.children, qxList);
          if (menu.length > 0) {
            item.children = menu;
            return true;
          }
          return false;
        } else {
          return qxList.indexOf(item.id) >= 0;}
      });
    },
    handleLeftBarMouseenter() {
      this.hasHoverLeftBar = true;
    },
    handleLeftBarMouseleave() {
      this.hasHoverLeftBar = false;
    },
    handleSecondaryDisplayState(state) {
      // console.info("handleSecondaryDisplayState:", state);
      this.hasSecondaryMenu = state;
      this.$store.commit('setSecondary', state)
    },
    handleSystemItemClick(item) {
      console.info("handleSystemItemClick-----1:", item);
    }
  },
  components: {
    "tw-icon": TWIcon,
    "tw-system-menu": TWSystemMenu
  }
};
</script>

<style lang="scss" scoped>
.tw-layout {
  $leftWidth: 50px;
  $leftWidth__hover: 300px;
  &-header {
    border-bottom: 2px solid #0596a2;
    box-sizing: border-box;
    background-color: #013470;
    .tw-title {
      padding: 0 10px;
      font-size: 28px;
      line-height: 50px;
      color: #ffffff;
      float: left;
    }
  }
  &-left {
    width: $leftWidth;
    background-color: #113f67;

    & + .tw-layout-body {
      width: calc(100% - #{$leftWidth});
      margin-left: $leftWidth;
    }
    &.hover,
    &.active {
      width: $leftWidth__hover;

      & + .tw-layout-body {
        width: calc(100% - #{$leftWidth__hover});
        margin-left: $leftWidth__hover;
      }
    }
  }
}
  .tw-logout{
    float: right;
    line-height: 50px;
    margin-right: 15px;
    color: #ffffff;
  }
</style>
