<script async setup lang="ts">
import wmiOperation from '@renderer/tools/WMIOperation'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import useStore from '@renderer/store'
const store = useStore()

const loading = ref(false)
const _thisCpu = wmiOperation.CPU
async function handleClick() {
	loading.value = true
	const result = [
		await _thisCpu.SetCpuLongPower(store.$state.CPUData.longPower),
		await _thisCpu.SetCpuShortPower(store.$state.CPUData.shortPower),
		await _thisCpu.SetCPUTempWall(store.$state.CPUData.tempWall)
	]
	result.map((item) => {
		if (item.toLowerCase() == 'true') {
			Message.success('应用成功')
		} else {
			Message.error('应用失败')
		}
	})
	loading.value = false
}
</script>

<template>
	<div class="CPU">
		<a-row justify="center">
			<a-col :span="16">
				<a-typography-title class="title"> CPU Settings </a-typography-title>
			</a-col>
			<a-col :span="16" class="item">
				<a-input-number
					v-model="store.$state.CPUData.shortPower"
					placeholder="ShortPower"
					:min="30"
					:max="255"
					model-event="input"
				>
					<template #append> 短时CPU功耗 </template>
				</a-input-number>
			</a-col>
			<a-col :span="16" class="item">
				<a-input-number
					v-model="store.$state.CPUData.longPower"
					placeholder="LongPower"
					:min="30"
					:max="255"
					model-event="input"
				>
					<template #append> 长时CPU功耗 </template>
				</a-input-number>
			</a-col>
			<a-space direction="vertical" size="large"> </a-space>
			<a-col :span="16" class="item">
				<a-input-number
					v-model="store.$state.CPUData.tempWall"
					placeholder="TempWall"
					:min="1"
					:max="100"
					model-event="input"
				>
					<template #append> 温度墙 </template>
				</a-input-number>
			</a-col>
			<a-col :span="16" class="item">
				<a-button type="primary" :loading="loading" @click="handleClick">确认</a-button>
			</a-col>
		</a-row>
	</div>
</template>

<style scoped>
.CPU {
	padding-top: 20px;
	.title {
		text-align: left;
	}
	.item {
		margin-top: 10px;
	}
}
</style>
