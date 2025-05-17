<script async setup lang="ts">
import SettingCardComponent from '@renderer/components/RightComponent/setting/SettingCardComponent.vue'
import electron from '@renderer/tools/electron'
import useStore from '@renderer/store'

const store = useStore()

async function handleClick() {
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
}
</script>

<template>
	<setting-card-component title="InstallService">
		<template #extra>
			<a-switch v-model="store.$state.ServiceOption" @change="handleClick">
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
