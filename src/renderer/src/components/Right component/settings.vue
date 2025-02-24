<script setup lang="ts">
import electron from '@renderer/tools/electron'
import useStore from '@renderer/store'
const store = useStore()
async function RGB_handleClick() {
	console.log(store.$state.RgbEventLoop)
	await electron.ipcRenderer.invoke('RgbEventLoop', store.$state.RgbEventLoop)
}
</script>

<template>
	<div class="setting">
		<a-row justify="center">
			<a-col :span="16">
				<a-typography-title class="title"> Settings </a-typography-title>
			</a-col>
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
		</a-row>
	</div>
</template>

<style scoped>
.setting {
	padding-top: 20px;

	.title {
		text-align: left;
	}
}
</style>
