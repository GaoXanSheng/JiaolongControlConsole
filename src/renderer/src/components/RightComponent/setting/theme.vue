<script setup lang="ts">
import useStore from '@renderer/store'
import { ref } from 'vue'
import SettingCardComponent from '@renderer/components/RightComponent/setting/SettingCardComponent.vue'
import { Message } from '@arco-design/web-vue'
import { electronAPI } from '@electron-toolkit/preload'
import electron from '@renderer/tools/electron'

const store = useStore()
const theme = ref(store.$state.theme != 'light')
const loading = ref(false)
function setTheme() {
	loading.value = true
	if (theme.value) {
		store.$state.theme = 'dark'
	} else {
		store.$state.theme = 'light'
	}
	document.body.setAttribute('arco-theme', store.$state.theme)
	loading.value = false
}
async function setCustomVideo() {
	loading.value = true
	const path = await electron.ipcRenderer.invoke('dialog:openFile')
	if (path) {
		store.$state.customVideo = path
		Message.success(`设置成功`)
	}
	loading.value = false
}
</script>

<template>
	<setting-card-component title="暗色主题">
		<template #extra>
			<a-switch v-model="theme" :loading="loading" @click="setTheme">
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</setting-card-component>
	<setting-card-component title="自定义主页视频">
		<template #extra>
			<a-button :loading="loading" @click="setCustomVideo">选择</a-button>
		</template>
	</setting-card-component>
</template>

<style scoped></style>
