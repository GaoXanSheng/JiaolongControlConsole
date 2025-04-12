<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueUiSparklineDatasetItem } from 'vue-data-ui'
import SparkLine from '@renderer/components/ProSettingComponent/SparkLine.vue'
import wmiOperation from '@renderer/tools/WMIOperation'

const CPUFanSpeedData = ref<VueUiSparklineDatasetItem[]>([
	{
		period: 'CPUFanSpeed',
		value: 0
	}
])
const GPUFanSpeedData = ref<VueUiSparklineDatasetItem[]>([
	{
		period: 'GPUFanSpeed',
		value: 0
	}
])
async function GetFanSpeed() {
	if (CPUFanSpeedData.value.length > 20) {
		CPUFanSpeedData.value.shift()
	}
	if (GPUFanSpeedData.value.length > 20) {
		GPUFanSpeedData.value.shift()
	}
	const { CPUFanSpeed, GPUFanSpeed } = await wmiOperation.Fan.GetFanSpeed()
	CPUFanSpeedData.value.push({
		period: 'CPUFanSpeed',
		value: CPUFanSpeed
	})
	GPUFanSpeedData.value.push({
		period: 'GPUFanSpeed',
		value: GPUFanSpeed
	})
}
onMounted(async () => {
	await GetFanSpeed()
	setInterval(() => GetFanSpeed(), 1000)
})
</script>

<template>
	<div class="fanSpeed">
		<SparkLine title="CPUFan" :data="CPUFanSpeedData"></SparkLine>
		<SparkLine title="GPUFan" :data="GPUFanSpeedData"></SparkLine>
	</div>
</template>

<style scoped>
.fanSpeed {
	width: 650px;
	height: 280px;
}
</style>
