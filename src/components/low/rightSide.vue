<script setup lang="ts">
import store, {HomeTab} from "../../store.ts";
import HOME from "./Right component/HOME.vue";
import CPU from "./Right component/CPU.vue";
import Keyboard from "./Right component/Keyboard.vue";
import PerformaceMode from "./Right component/PerformaceMode.vue";
import Fan from "./Right component/Fan.vue";

</script>

<template>
<div class="rightSide">
    <HOME v-if="store.state.SwitchPages==HomeTab.HOME"></HOME>
    <CPU  v-if="store.state.SwitchPages==HomeTab.CPU"></CPU>
    <Keyboard v-if="store.state.SwitchPages==HomeTab.Keyboard" ></Keyboard>
    <PerformaceMode v-if="store.state.SwitchPages==HomeTab.PerformaceMode"></PerformaceMode>
    <Fan v-if="store.state.SwitchPages==HomeTab.Fan"></Fan>
</div>
</template>

<style scoped>
.rightSide{
   width: 600px;
}
</style>