<script async setup lang="ts">
import { onMounted, ref } from 'vue'
import wmiOperation from '@renderer/tools/WMIOperation'
import { HardwareMonitorInfo } from '@renderer/store/interfaces'
import CpuHeatMapData from '@renderer/components/ProSettingComponent/CpuHeatMapData.vue'
import FanSpeedData from '@renderer/components/ProSettingComponent/FanSpeedData.vue'

const MonitorInfo = ref<HardwareMonitorInfo>(await wmiOperation.GetHardwareMonitorInfo())
onMounted(async () => {
	setInterval(async () => {
		MonitorInfo.value = await wmiOperation.GetHardwareMonitorInfo()
	}, 5000)
})
</script>

<template>
	<FanSpeedData></FanSpeedData>
	<CpuHeatMapData :data="MonitorInfo"></CpuHeatMapData>
</template>

<style scoped></style>
