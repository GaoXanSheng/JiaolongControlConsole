<script setup lang="ts">
import store, {HomeTab} from "../store.ts";
import HOME from "./Right component/HOME.vue";
import CPU from "./Right component/CPU.vue";
import EventLoop from "./Right component/EventLoop.vue";
import PerformaceMode from "./Right component/PerformaceMode.vue";
import Fan from "./Right component/Fan.vue";
import Keyboard from "./Right component/KeyBoard.vue";

</script>

<template>
<div class="rightSide">
    <HOME v-if="store.state.SwitchPages==HomeTab.HOME"></HOME>
    <CPU  v-if="store.state.SwitchPages==HomeTab.CPU"></CPU>
    <EventLoop v-if="store.state.SwitchPages==HomeTab.EventLoop" ></EventLoop>
    <PerformaceMode v-if="store.state.SwitchPages==HomeTab.PerformaceMode"></PerformaceMode>
    <Fan v-if="store.state.SwitchPages==HomeTab.Fan"></Fan>
    <Keyboard v-if="store.state.SwitchPages==HomeTab.Keyboard"></Keyboard>
</div>
</template>

<style scoped>
.rightSide{
  padding-left: 220px;
  width: calc(100vw - 220px);
  height: 100%;
}
</style>