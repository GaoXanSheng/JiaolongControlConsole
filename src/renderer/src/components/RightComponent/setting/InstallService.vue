<script async setup lang="ts">
import SettingCardComponent from '@renderer/components/RightComponent/setting/SettingCardComponent.vue'
import electron from '@renderer/tools/electron'
import useStore from '@renderer/store'
import { ref } from 'vue'

const store = useStore()
const loading = ref(false)
async function handleClick() {
	loading.value = true
	if (!store.$state.ServiceOption) {
		await electron.ipcRenderer.invoke('ServiceOption', {
			type: 'stop'
		})
	} else {
		await electron.ipcRenderer.invoke('ServiceOption', {
			type: 'start'
		})
	}
	store.$state.ServiceOption = await electron.ipcRenderer.invoke('ServiceOption', {
		type: 'status'
	})
	loading.value = false
}
</script>

<template>
	<setting-card-component title="InstallService">
		<template #extra>
			<a-switch v-model="store.$state.ServiceOption" :loading="loading" @click="handleClick">
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
