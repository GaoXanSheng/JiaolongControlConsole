<script setup lang='ts'>
import index, { HomeTab } from '../store'
import HOME from './Right component/HOME.vue'
import CPU from './Right component/CPU.vue'
import EventLoop from './Right component/EventLoop.vue'
import Information from './Right component/Information.vue'
import Fan from './Right component/Fan.vue'
import Keyboard from './Right component/KeyBoard.vue'
// import Debug from './Right component/Debug.vue'
import Seting from './Right component/Seting.vue'

</script>

<template>
  <div class='rightSide'>
    <HOME v-if='index.state.SwitchPages==HomeTab.HOME'></HOME>
    <CPU v-if='index.state.SwitchPages==HomeTab.CPU'></CPU>
    <EventLoop v-if='index.state.SwitchPages==HomeTab.EventLoop'></EventLoop>
    <Information v-if='index.state.SwitchPages==HomeTab.Information'></Information>
    <Fan v-if='index.state.SwitchPages==HomeTab.Fan'></Fan>
    <Keyboard v-if='index.state.SwitchPages==HomeTab.Keyboard'></Keyboard>
    <Seting v-if='index.state.SwitchPages==HomeTab.Settings'></Seting>
<!--    <Debug v-if='index.state.SwitchPages==HomeTab.Debug'></Debug>-->
  </div>
</template>

<style scoped>
.rightSide {
  width: 100%;
  height: 100%;
}
</style>
