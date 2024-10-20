<script async setup lang="ts">
import electron from '../../../tools/electron'
import { ref } from 'vue'
import { config } from '../../../store/Config'

const loading = ref(false)
const self_starting_function = async () => {
	loading.value = true
	await electron.ipcRenderer.invoke('custom-event-PowerBoot', {
		openAtLogin: powerBoot.value.openAtLogin,
		openAsHidden: powerBoot.value.openAsHidden,
		enabled: powerBoot.value.enabled
	})
	loading.value = false
}
const powerBoot = ref({
	openAtLogin: false,
	openAsHidden: false,
	enabled: false
})
if (!config.has('PowerBoot')) {
	powerBoot.value = await config.get('PowerBoot')
}
</script>

<template>
	<a-input disabled placeholder="设置开机启动" allow-clear>
		<template #append>
			<a-switch v-model="powerBoot.enabled" :onclick="self_starting_function" :loading="loading">
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</a-input>
	<a-input v-if="powerBoot.enabled" disabled placeholder="登录时打开" allow-clear>
		<template #append>
			<a-switch
				v-model="powerBoot.openAtLogin"
				:onclick="self_starting_function"
				:loading="loading"
			>
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</a-input>
	<a-input v-if="powerBoot.enabled" disabled placeholder="开机时隐藏" allow-clear>
		<template #append>
			<a-switch
				v-model="powerBoot.openAsHidden"
				:onclick="self_starting_function"
				:loading="loading"
			>
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</a-input>
</template>

<style scoped></style>
