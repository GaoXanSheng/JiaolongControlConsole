<script setup lang="ts">
import SparkLine from '@renderer/components/ProSettingComponent/SparkLine.vue'
import { ref } from 'vue'
import wmiOperation from '@renderer/tools/WMIOperation'
type VueUiSparklineDatasetItem = {
	period: string
	value: number
}
const CPUFanSpeedData = ref<VueUiSparklineDatasetItem[]>([
	{
		period: 'CPUFanSpeedData',
		value: 0
	}
])
const GPUFanSpeedData = ref<VueUiSparklineDatasetItem[]>([
	{
		period: 'GPUFanSpeed',
		value: 0
	}
])
setInterval(async () => {
	const MonitorInfo = await wmiOperation.GetHardwareMonitorInfo()
	console.log(MonitorInfo)
}, 5000)
</script>

<template>
	<SparkLine title="CPUFan" :data="CPUFanSpeedData"></SparkLine>
	<SparkLine title="GPUFan" :data="GPUFanSpeedData"></SparkLine>
</template>

<style scoped></style>
