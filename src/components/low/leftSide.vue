<script setup lang="ts">
// import LogoLightPng from '../assets/LogoLight.png'
import store, {HomeTab} from "../../store.ts";
import CPU from '../../assets/CPU.png'
// import HOME from '../assets/HOME.png'
import Keyboard from '../../assets/Keyboard.png'
import PerformaceMode from '../../assets/PerformaceMode.png'
import Fan from '../../assets/Fan.png'
const HomeCardType = [
  {
    title:"HOME",
    icon:"",
    eum:HomeTab.HOME
  },
  {
    title:"CPU",
    icon:CPU,
    eum:HomeTab.CPU
  },
  {
    title:"Keyboard",
    icon:Keyboard,
    eum:HomeTab.Keyboard
  },
  {
    title:"PerformaceMode",
    icon:PerformaceMode,
    eum:HomeTab.PerformaceMode
  },
  {
    title:"Fan",
    icon:Fan,
    eum:HomeTab.Fan
  }
]

function setStoreData(data) {
  store.state.HomeTab = data
}
</script>

<template>
  <div class="leftSide">
    <div class="leftCard" v-for="i of HomeCardType" @click="setStoreData(i.eum)" :key="i.eum">
      <div class="logo">
        <img :src="i.icon" draggable="false" alt="">
      </div>
      <div class="title">{{i.title}}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.leftSide {
  :hover{
    background-color: #ededfd;
  }
  width: 200px;
  .leftCard {
    width: 100%;
    height: 70px;
    display: flex;
    .logo{
      width: 50%;
      height: 100%;
      img{
        width:40px;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        object-fit: cover;
        display: block;
      }
    }
    .title {
      width: 50%;
      height: 100%;
      word-break: break-all;
    }
  }
}
</style>