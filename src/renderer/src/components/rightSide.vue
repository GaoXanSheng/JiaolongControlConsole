<script setup lang="ts">
import useStore from '../store'
import HOME from './Right component/HOME.vue'
import CPU from './Right component/CPU.vue'
import { HomeTab } from '../doc/HomeTab'
import Fan from './Right component/Fan.vue'
import Keyboard from './Right component/KeyBoard.vue'

const store = useStore()
</script>

<template>
	<div class="rightSide">
		<HOME v-if="store.SwitchPages == HomeTab.HOME"></HOME>
		<CPU v-if="store.SwitchPages == HomeTab.CPU"></CPU>
		<Fan v-if="store.SwitchPages == HomeTab.Fan"></Fan>
		<Keyboard v-if="store.SwitchPages == HomeTab.Keyboard"></Keyboard>
	</div>
</template>

<style scoped>
.rightSide {
	width: 100%;
	height: 100%;
}
</style>
