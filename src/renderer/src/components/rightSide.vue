<script setup lang="ts">
import useStore from '../store'
import HOME from '@renderer/components/RightComponent/HOME.vue'
import CPU from '@renderer/components/RightComponent/CPU.vue'
import Fan from '@renderer/components/RightComponent/Fan.vue'
import Keyboard from '@renderer/components/RightComponent/KeyBoard.vue'
import Settings from '@renderer/components/RightComponent/settings.vue'
import { HomeTab } from '@renderer/store/HomeTab'

const store = useStore()
</script>

<template>
	<div class="rightSide">
		<HOME v-if="store.SwitchPages == HomeTab.HOME"></HOME>
		<CPU v-if="store.SwitchPages == HomeTab.CPU"></CPU>
		<Fan v-if="store.SwitchPages == HomeTab.Fan"></Fan>
		<Keyboard v-if="store.SwitchPages == HomeTab.Keyboard && !store.$state.RgbEventLoop"></Keyboard>
		<a-row
			v-if="store.SwitchPages == HomeTab.Keyboard && store.$state.RgbEventLoop"
			justify="center"
		>
			<a-col :span="16">
				<a-typography-title class="title"> 开启RGB时不可用 </a-typography-title>
			</a-col>
		</a-row>
		<Settings v-if="store.SwitchPages == HomeTab.Settings"></Settings>
	</div>
</template>

<style scoped>
.rightSide {
	width: 100%;
	height: 100%;
}
</style>
