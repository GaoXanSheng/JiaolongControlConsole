<script setup lang="ts">
import electron from '@renderer/tools/electron'
import useStore from '@renderer/store'
import { onMounted, ref } from 'vue'
import WMIOperation from '@renderer/tools/WMIOperation'
import { Message } from '@arco-design/web-vue'
const store = useStore()
async function RGB_handleClick() {
	console.log(store.$state.RgbEventLoop)
	await electron.ipcRenderer.invoke('RgbEventLoop', store.$state.RgbEventLoop)
}
const FanSpeedSwitch = ref(false)
onMounted(async () => {
	const result = await WMIOperation.Fan.GetMaxFanSpeedSwitch()
	console.log((FanSpeedSwitch.value = result == 1))
})
async function FanSpeedSwitch_handleClick() {
	const msg: string | boolean = await WMIOperation.Fan.SetMaxFanSpeedSwitch(FanSpeedSwitch.value)
	if (msg == '拒绝访问') {
		Message.error(msg)
		FanSpeedSwitch.value = false
	} else {
		Message.success('应用成功')
	}
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
			<a-col :span="16">
				<a-input disabled placeholder="风扇自动控速开关" allow-clear>
					<template #append>
						<a-switch v-model="FanSpeedSwitch" @change="FanSpeedSwitch_handleClick">
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
