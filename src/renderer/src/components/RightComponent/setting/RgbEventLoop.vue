<script setup lang="ts">
import electron from '@renderer/tools/electron'
import useStore from '@renderer/store'
import SettingCardComponent from '@renderer/components/RightComponent/setting/SettingCardComponent.vue'
import { ref } from 'vue'
const store = useStore()
const loading = ref(false)
async function RGB_handleClick() {
	loading.value = true
	await electron.ipcRenderer.invoke('RgbEventLoop', store.$state.RgbEventLoop)
	loading.value = false
}
</script>

<template>
	<setting-card-component title="RGB键盘灯">
		<template #extra>
			<a-switch v-model="store.$state.RgbEventLoop" :loading="loading" @click="RGB_handleClick">
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
