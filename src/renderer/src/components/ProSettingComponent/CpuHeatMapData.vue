<script setup lang="ts">
import Heatmap from '@renderer/components/ProSettingComponent/Heatmap.vue'
import { HardwareMonitorInfo } from '@renderer/store/interfaces'
const props = defineProps<{
	data: HardwareMonitorInfo
}>()
function CpuHeatMapData() {
	const data = props.data.Cpu
	const CCD1 = {
		name: 'CCD1',
		values: data.Load.filter((item) => item.Name.includes('CPU Core #'))
			.map((item) => item.Value)
			.slice(0, 16)
	}
	const CCD2 = {
		name: 'CCD2',
		values: data.Load.filter((item) => item.Name.includes('CPU Core #'))
			.map((item) => item.Value)
			.slice(16)
	}
	if (data.Load.length > 32) {
		return [CCD1, CCD2]
	} else {
		return [CCD1]
	}
}
</script>

<template>
	<div class="cpuMap">
		<heatmap :title="props.data.Cpu.Name" :data="CpuHeatMapData()"></heatmap>
	</div>
</template>

<style scoped>
.cpuMap {
	width: 650px;
	height: 250px;
}
</style>
