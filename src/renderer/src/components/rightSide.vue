<script setup lang="ts">
import useStore from '../store'
import HOME from './Right component/HOME.vue'
import CPU from './Right component/CPU.vue'
import { HomeTab } from '../doc/HomeTab'
// import EventLoop from './Right component/EventLoop.vue'
import Information from './Right component/Information.vue'
import Fan from './Right component/Fan.vue'
import Keyboard from './Right component/KeyBoard.vue'
// import Debug from './Right component/Debug.vue'
import Seting from './Right component/Seting.vue'

const store = useStore()
</script>

<template>
	<div class="rightSide">
		<HOME v-if="store.SwitchPages == HomeTab.HOME"></HOME>
		<CPU v-if="store.SwitchPages == HomeTab.CPU"></CPU>
		<!--		<EventLoop v-if="store.SwitchPages == HomeTab.EventLoop"></EventLoop>-->
		<Information v-if="store.SwitchPages == HomeTab.Information"></Information>
		<Fan v-if="store.SwitchPages == HomeTab.Fan"></Fan>
		<Keyboard v-if="store.SwitchPages == HomeTab.Keyboard"></Keyboard>
		<Seting v-if="store.SwitchPages == HomeTab.Settings"></Seting>
		<!--		<Debug v-if="store.SwitchPages == HomeTab.Debug"></Debug>-->
	</div>
</template>

<style scoped>
.rightSide {
	width: 100%;
	height: 100%;
}
</style>
