<script setup lang="ts">
import store, {HomeTab} from "../store.ts";
import HOME from "./Right component/HOME.vue";
import CPU from "./Right component/CPU.vue";
import EventLoop from "./Right component/EventLoop.vue";
import Information from "./Right component/Information.vue";
import Fan from "./Right component/Fan.vue";
import Keyboard from "./Right component/KeyBoard.vue";
import Debug from "./Right component/Debug.vue";
import Seting from "./Right component/Seting.vue";

</script>

<template>
  <div class="rightSide">
    <HOME v-if="store.state.SwitchPages==HomeTab.HOME"></HOME>
    <CPU v-if="store.state.SwitchPages==HomeTab.CPU"></CPU>
    <EventLoop v-if="store.state.SwitchPages==HomeTab.EventLoop"></EventLoop>
    <Information v-if="store.state.SwitchPages==HomeTab.Information && store.state.ProbeData.cpu!=undefined"></Information>
    <div v-if="store.state.SwitchPages==HomeTab.Information && store.state.ProbeData.cpu==undefined">
      <div class="mdui-progress">
        <div class="mdui-progress-indeterminate"></div>

      </div>
      <h1>正在收集数据载入中</h1>
    </div>
    <Fan v-if="store.state.SwitchPages==HomeTab.Fan"></Fan>
    <Keyboard v-if="store.state.SwitchPages==HomeTab.Keyboard"></Keyboard>
    <Seting v-if="store.state.SwitchPages==HomeTab.Settings"></Seting>
    <Debug v-if="store.state.SwitchPages==HomeTab.Debug"></Debug>
  </div>
</template>

<style scoped>
.rightSide {
  padding-left: 200px;
  width: calc(100vw - 200px);
  height: 100%;
}
</style>