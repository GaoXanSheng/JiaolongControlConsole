<script async setup lang="ts">
import wmiOperation from '../../tools/WMIOperation'
import successful from '../tools/successful'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { config } from '../../store/Config'
const { shortPower, longPower, tempWall } = await config.get<{
	shortPower: number
	longPower: number
	tempWall: number
}>('Setting.CPU')
const CPUData = ref({
	shortPower,
	longPower,
	tempWall
})
const loading = ref(false)

async function handleClick() {
	loading.value = true
	const data = [
		await wmiOperation.Cpu.SetCpuLongPower(CPUData.value.longPower),
		await wmiOperation.Cpu.SetCpuShortPower(CPUData.value.shortPower),
		await wmiOperation.Cpu.SetCPUTempWall(CPUData.value.tempWall)
	]
	const callback = successful(data)
	if (callback) {
		Message.success('CPU设置成功')
	} else {
		Message.error(JSON.stringify(data))
	}
	loading.value = false
	await config.set('Setting.CPU', {
		shortPower: CPUData.value.shortPower,
		longPower: CPUData.value.longPower,
		tempWall: CPUData.value.tempWall
	})
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
					v-model="CPUData.shortPower"
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
					v-model="CPUData.longPower"
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
					v-model="CPUData.tempWall"
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
