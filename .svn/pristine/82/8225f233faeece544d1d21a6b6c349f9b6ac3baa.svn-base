<template>
  <div class="tw-system-menu">
    <div
      class="tw-system-menu-bar"
      :class="{hover: systemMenuHover || hasTotalMenu}"
      @mouseenter.stop="handleSystemMenuMouseenter"
      @mouseleave.stop="handleSystemMenuMouseleave"
    >
      <div
        class="tw-system-menu-item tw-app-menu-item"
        @mouseenter.stop="handleSystemMenuMouseenter"
        @click="handleSystemMenuClick"
      >
        <tw-icon class="tw-icon" icon="icon-application" font-size="24px"></tw-icon>
        <span class="tw-title">所有服务</span>
        <tw-icon class="tw-suffix-icon" icon="icon-expansion-r" font-size="24px"></tw-icon>
      </div>
      <div
        class="tw-system-menu-item"
        :class="{active: hasSystemMenuActive(item)}"
        v-for="item in systemMenuList"
        :key="item.id"
        @mouseenter.stop="handleSystemMenuMouseenter"
        @click="handleSystemMenuItemClick(item)"
      >
        <tw-icon class="tw-icon" :icon="item.icon" font-size="24px"></tw-icon>
        <span class="tw-title" v-text="item.title"></span>
      </div>
    </div>
    <transition name="control-strip-fade">
      <div class="tw-secondary-menu-bar" v-show="hasDisplaySecondaryMenu">
        <div class="tw-secondary-menu-header" v-text="systemMenuActive.title"></div>
        <tw-menu
          class="tw-secondary-menu-body"
          :data="secondaryMenuList[systemMenuActive.id]"
          height="calc(100% - 50px)"
          :active="secondaryMenuActive.id"
        ></tw-menu>
      </div>
    </transition>
    <div
      class="tw-menu-control-strip iconfont"
      :class="[hasDisplaySecondaryMenu ? 'icon-collapse-left' : 'icon-collapse-right', {'system-hover': systemMenuHover || hasTotalMenu}]"
      @mouseenter.stop="handleControlStripMouseenter"
      @mouseleave.stop="handleControlStripMouseleave"
      @click="handleControlStripClick"
    ></div>
    <tw-total-menu
      class="tw-total-menu"
      :class="{active: hasTotalMenu}"
      :system-menu="systemMenuList"
      :secondary-menu="secondaryMenuList"
      @total-menu-change="handleTotalMenuChange"
      @close="handleTotalMenuClose"
    ></tw-total-menu>
  </div>
</template>

<script>
import _ from "underscore";
import TWIcon from "../TWIcon";
import TWMenu from "./TWMenu";
import TWTotalMenu from "./TWTotalMenu";

export default {
  name: "TWSystemMenu",
  data() {
    return {
      systemMenuHover: false,
      systemMenuActive: {},
      hasSecondaryMenu: true,
      secondaryMenuActive: {},
      hasTotalMenu: false
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      const systemMenuList = this.systemMenuList;
      this.systemMenuActive =
        _.filter(systemMenuList, item => {
          return this.selectRouterPath.path.indexOf(`/${item.id}`) === 0;
        })[0] ||
        systemMenuList[0] ||
        {};
      if (this.systemMenuActive.id === "home")
        this.$emit("display-state", false);
      else this.$emit("display-state", true);
    });
  },
  computed: {
    selectRouterPath() {
      return this.$route;
    },
    systemMenuList() {
      return this.data.systemMenu || [];
    },
    secondaryMenuList() {
      return this.data.secondaryMenu || {};
    },
    hasDisplaySecondaryMenu() {
      const { id } = this.systemMenuActive,
        flag = !!this.secondaryMenuList[id] && this.hasSecondaryMenu;
      this.$emit("display-state", flag);
      return flag;
    }
  },
  methods: {
    handleSystemMenuMouseenter() {
      this.systemMenuHover = true;
    },
    handleSystemMenuMouseleave() {
      setTimeout(() => {
        this.systemMenuHover = false;
      }, 300);
    },
    handleSystemMenuClick() {
      this.hasTotalMenu = !this.hasTotalMenu;
    },
    handleSystemMenuItemClick(item) {
      this.systemMenuActive = item;
      this.systemMenuHover = false;
      this.hasSecondaryMenu = true;
      this.hasTotalMenu = false;
      this.$emit("system-item-click", item);
      this.$emit("display-state", true);
    },
    handleControlStripMouseenter() {
      if (this.systemMenuHover) {
        setTimeout(() => {
          this.systemMenuHover = true;
        }, 300);
      }
    },
    handleControlStripMouseleave() {
      this.systemMenuHover = false;
    },
    handleControlStripClick() {
      const flag = (this.hasSecondaryMenu = !this.hasSecondaryMenu);
      this.$emit("display-state", flag);
    },
    handleTotalMenuChange(item) {
      this.systemMenuActive = item.systemMenuItem;
      this.secondaryMenuActive = item.secondaryMenuItem;
      this.hasSecondaryMenu = true;
      this.$emit("display-state", true);
    },
    handleTotalMenuClose() {
      this.hasTotalMenu = false;
    },
    hasSystemMenuActive(item) {
      return this.systemMenuActive.id === item.id;
    }
  },
  components: {
    "tw-icon": TWIcon,
    "tw-menu": TWMenu,
    "tw-total-menu": TWTotalMenu
  }
};
</script>

<style lang="scss" scoped>
@import "./tw-menu-variable";

.tw-system {
  &-menu {
    position: relative;
    height: 100%;

    &-bar {
      position: relative;
      width: $tw-menu-totalWidth;
      height: 100%;
      background-color: $tw-menu-bgColor;
      z-index: 2;
      transition: all 0.5s ease;

      &.hover {
        width: $tw-menu-totalWidth_active;
      }
    }

    &-item {
      position: relative;
      overflow: hidden;
      height: $tw-menu-totalWidth;
      color: $tw-menu-color_default;
      cursor: pointer;
      transition: background-color 0.6s ease;

      &:hover,
      &.active {
        background-color: $tw-menu-totalItemColor;
      }

      &.active {
        // text-shadow: inset 0 0 6px #65c6c4;
        background-color: $tw-menu-bgColor_action;
      }

      &.tw-app-menu-item {
      }

      .tw-icon,
      .tw-suffix-icon {
        display: inline-block;
        width: $tw-menu-totalWidth;
        height: $tw-menu-totalItemHeight;
        line-height: $tw-menu-totalItemHeight;
        text-align: center;
      }

      .tw-title {
        position: absolute;
        top: 0;
        left: $tw-menu-totalWidth;
        overflow: hidden;
        width: calc(100% - #{$tw-menu-totalWidth});
        height: 100%;
        font-size: $tw-menu-fontSize;
        line-height: $tw-menu-totalItemHeight;
        text-indent: 5px;
        white-space: nowrap;
      }

      .tw-suffix-icon {
        position: absolute;
        top: 0;
        left: calc(#{$tw-menu-totalWidth_active} - #{$tw-menu-totalWidth});
      }
    }
  }
}

.tw-secondary {
  &-menu {
    &-bar {
      position: absolute;
      top: 0;
      left: $tw-menu-totalWidth;
      width: $tw-menu-totalWidth_active - $tw-menu-totalWidth;
      height: 100%;
      background-color: $tw-menu-bgColor_action;
      z-index: 1;
    }

    &-header {
      height: $tw-menu-totalItemHeight;
      border-bottom: 1px solid $tw-menu-bColor;
      box-sizing: border-box;
      font-size: $tw-menu-header-fontSize;
      line-height: $tw-menu-totalItemHeight;
      text-align: center;
      white-space: nowrap;
      color: $tw-menu-color_default;
    }

    &-body {
      overflow-y: auto;
      height: calc(100% - #{$tw-menu-totalItemHeight});
    }
  }
}

.tw-menu {
  &-control {
    &-strip {
      position: absolute;
      top: calc(50% - 25px);
      left: 100%;
      height: 40px;
      font-size: $tw-menu-fontSize;
      color: $tw-menu-stripColor;
      z-index: 11;
      cursor: pointer;
      transform: translateY(-50%);
      transition: all 0.5s ease;

      &:before {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: all 0.5s ease;
      }

      &.system-hover {
        left: $tw-menu-totalWidth_active;
      }

      &.icon-collapse-left {
        left: calc(100% - 18px);
        border-bottom: 9px solid transparent;
        border-left: none;
        border-right: 18px solid $tw-menu-bColor;
        border-top: 9px solid transparent;

        &:before {
          left: 0;
          transform: translateY(-50%);
        }
        &:hover {
          left: calc(100% - 22px);
          border-right: 22px solid $tw-menu-bColor;
          &:before {
            left: 2px;
          }
        }
      }

      &.icon-collapse-right {
        border-bottom: 9px solid transparent;
        border-left: 18px solid $tw-menu-bColor;
        border-right: none;
        border-top: 9px solid transparent;

        &:before {
          left: 0;
          transform: translate(-100%, -50%);
        }
        &:hover {
          border-left: 22px solid $tw-menu-bColor;
          &:before {
            left: -1px;
          }
        }
      }
    }
  }
}

.control-strip-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s;
  }
  &-enter,
  &-leave-to {
    left: -$tw-menu-totalWidth_active;
    opacity: 0;
  }
}

.tw-total-menu {
  display: none;
  &.active {
    display: block;
  }
  &-panel {
    left: $tw-menu-totalWidth_active;
  }
}
</style>