<script setup lang="ts">
import store, {HomeTab} from "../store.ts";
import CPU from '../assets/CPU.png'
import HOME from '../assets/HOME.png'
import Event from '../assets/Event.png'
import Information from '../assets/Information.png'
import Fan from '../assets/Fan.png'
import Keyboard from "../assets/Keyboard.png";

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
    title: "Event Loop",
    icon: Event,
    eum: HomeTab.EventLoop
  },
  {
    title: "Information",
    icon: Information,
    eum: HomeTab.Information
  },
  {
    title: "Fan",
    icon: Fan,
    eum: HomeTab.Fan
  },
  {
    title: "Keyboard",
    icon: Keyboard,
    eum: HomeTab.Keyboard
  }
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
  </div>
</template>

<style lang="scss" scoped>
.mdui-drawer{
  width: 220px;
  box-shadow: none;
}
</style>