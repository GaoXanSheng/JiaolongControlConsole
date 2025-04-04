<script setup lang="ts">
import electron from '@renderer/tools/electron'
import useStore from '@renderer/store'
const store = useStore()
async function RGB_handleClick() {
	await electron.ipcRenderer.invoke('RgbEventLoop', store.$state.RgbEventLoop)
}
</script>

<template>
	<a-col :span="16">
		<a-input disabled placeholder="RGB键盘灯" allow-clear>
			<template #append>
				<a-switch v-model="store.$state.RgbEventLoop" @change="RGB_handleClick">
					<template #checked-icon>
						<icon-check />
					</template>
					<template #unchecked-icon>
						<icon-close />
					</template>
				</a-switch>
			</template>
		</a-input>
	</a-col>
</template>

<style scoped></style>
