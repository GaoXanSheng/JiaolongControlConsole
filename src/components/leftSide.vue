<script setup lang="ts">
import store, {HomeTab} from "../store.ts";
import CPU from '../assets/CPU.png'
import HOME from '../assets/HOME.png'
import Event from '../assets/Event.png'
import Information from '../assets/Information.png'
import Fan from '../assets/Fan.png'
import Keyboard from "../assets/Keyboard.png";
import Settings from "../assets/Settings.png";
import Dev from '../assets/Dev.png'
const HomeCardType = [
  {
    title: "主页",
    icon: HOME,
    eum: HomeTab.HOME
  },
  {
    title: "中央处理器",
    icon: CPU,
    eum: HomeTab.CPU
  },
  {
    title: "事件循环",
    icon: Event,
    eum: HomeTab.EventLoop
  },
  {
    title: "仪表盘",
    icon: Information,
    eum: HomeTab.Information
  },
  {
    title: "风扇",
    icon: Fan,
    eum: HomeTab.Fan
  },
  {
    title: "键盘",
    icon: Keyboard,
    eum: HomeTab.Keyboard
  },
  // {
  //   title: "设置",
  //   icon: Settings,
  //   eum: HomeTab.Settings
  // }
]

function setStoreData(data:number) {
  store.state.SwitchPages = data
}

</script>

<template>
  <div class="mdui-drawer mdui-drawer-open">
    <ul class="mdui-list">
      <li d class="mdui-list-item mdui-ripple" v-for="i of HomeCardType" @click="setStoreData(i.eum)" :key="i.eum">
        <img class="mdui-list-item-icon mdui-icon material-icons" :src="i.icon" draggable="false" alt="">
        <div class="mdui-list-item-content">{{ i.title }}</div>
      </li>
    </ul>
    <ul class="mdui-list" v-if="store.state.Debug">
    <li class="mdui-list-item mdui-ripple"  @click="setStoreData(HomeTab.Debug)">
      <img class="mdui-list-item-icon mdui-icon material-icons" :src="Dev" draggable="false" alt="">
      <div class="mdui-list-item-content">Debug</div>
    </li>
  </ul>

  </div>
</template>

<style lang="scss" scoped>
.mdui-drawer{
  width: 220px;
  box-shadow: none;
}
</style>