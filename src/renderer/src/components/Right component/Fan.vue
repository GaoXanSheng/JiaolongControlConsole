<script async setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import electron from '@renderer/tools/electron'

const loading = ref(false)
const FanSpeed = ref(1500)
async function handleClick() {
	loading.value = true
	await electron.ipcRenderer.invoke('FanController', FanSpeed.value)
	Message.success('Fan设置成功')
	loading.value = false
}
</script>

<template>
	<div class="Fan">
		<a-row justify="center">
			<a-col :span="16">
				<a-typography-title class="title"> Fan Settings </a-typography-title>
				<a-typography-title class="title" code>
					警告：该功能会损害硬件，请谨慎使用
				</a-typography-title>
			</a-col>
			<a-col :span="16" class="item">
				<a-input-number
					v-model="FanSpeed"
					placeholder="ShortPower"
					:min="1500"
					:max="5800"
					model-event="input"
				>
					<template #append> 风扇转速 </template>
				</a-input-number>
			</a-col>
			<a-col :span="16" class="item">
				<a-button type="primary" :loading="loading" @click="handleClick">确认</a-button>
			</a-col>
		</a-row>
	</div>
</template>

<style scoped>
.Fan {
	padding-top: 20px;

	.title {
		text-align: left;
	}

	.item {
		margin-top: 10px;
	}
}
</style>
