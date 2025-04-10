<script setup lang="ts">
import electron from '@renderer/tools/electron'
import useStore from '@renderer/store'
import SettingCardComponent from '@renderer/components/RightComponent/setting/SettingCardComponent.vue'
const store = useStore()
async function RGB_handleClick() {
	await electron.ipcRenderer.invoke('RgbEventLoop', store.$state.RgbEventLoop)
}
</script>

<template>
	<setting-card-component title="RGB键盘灯">
		<template #extra>
			<a-switch v-model="store.$state.RgbEventLoop" @change="RGB_handleClick">
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</setting-card-component>
</template>

<style scoped></style>
