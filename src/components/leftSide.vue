<script setup lang="ts">
import store, {HomeTab} from "../store.ts";
import CPU from '../assets/CPU.png'
import HOME from '../assets/HOME.png'
import Keyboard from '../assets/Keyboard.png'
import PerformaceMode from '../assets/PerformaceMode.png'
import Fan from '../assets/Fan.png'

const HomeCardType = [
  {
    title: "HOME",
    icon: HOME,
    eum: HomeTab.HOME
  },
  {
    title: "CPU",
    icon: CPU,
    eum: HomeTab.CPU
  },
  {
    title: "Keyboard",
    icon: Keyboard,
    eum: HomeTab.Keyboard
  },
  {
    title: "PerformaceMode",
    icon: PerformaceMode,
    eum: HomeTab.PerformaceMode
  },
  {
    title: "Fan",
    icon: Fan,
    eum: HomeTab.Fan
  }
]

function setStoreData(data) {
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
  </div>
</template>

<style lang="scss" scoped>
.mdui-drawer{
  width: 220px;

}
</style>