<script async setup lang="ts">
import { onMounted, ref } from 'vue'
import wmiOperation from '@renderer/tools/WMIOperation'
import { HardwareMonitorInfo } from '@renderer/store/interfaces'
import CpuHeatMapData from '@renderer/components/ProSettingComponent/CpuHeatMapData.vue'
import FanSpeedData from '@renderer/components/ProSettingComponent/FanSpeedData.vue'
import GpuAmd from '@renderer/components/ProSettingComponent/GpuAmd.vue'
import GpuNvidia from '@renderer/components/ProSettingComponent/GpuNvidia.vue'
import CenterTop from '@renderer/components/ProSettingComponent/CenterTop.vue'

const MonitorInfo = ref<HardwareMonitorInfo>(await wmiOperation.GetHardwareMonitorInfo())
onMounted(async () => {
	setInterval(async () => {
		MonitorInfo.value = await wmiOperation.GetHardwareMonitorInfo()
	}, 3000)
	// 避免全局样式污染
	document.body.setAttribute('arco-theme', 'light')
})
</script>

<template>
	<div class="dashboard">
		<div class="left-top">
			<!-- 左上区域 -->
			<GpuAmd :data="MonitorInfo"></GpuAmd>
		</div>
		<div class="center-top">
			<!-- 中上区域 -->
			<CenterTop></CenterTop>
		</div>
		<div class="right">
			<GpuNvidia :data="MonitorInfo"></GpuNvidia>
		</div>
		<div class="left-bottom">
			<!-- 左下区域 -->
			<FanSpeedData></FanSpeedData>
		</div>
		<div class="center-bottom">
			<!-- 中下区域 -->
			<CpuHeatMapData :data="MonitorInfo"></CpuHeatMapData>
		</div>
	</div>
</template>

<style scoped>
.dashboard {
	position: relative;
	width: 100vw;
	height: 100vh;
	background-color: #f3f4f6ff;
	.left-top {
		position: absolute;
		top: 0;
		left: 0;
		width: 20vw;
		height: 80vh;
	}
	.left-bottom {
		position: absolute;
		top: 80vh;
		left: 0;
		width: 20vw;
		height: 20vh;
	}
	.center-top {
		position: absolute;
		top: 0;
		left: 20vw;
		width: 55vw;
		height: 75vh;
		background-color: white;
		border-radius: 5px;
	}
	.center-bottom {
		position: absolute;
		top: 75vh;
		left: 20vw;
		width: 55vw;
		height: 25vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.right {
		position: absolute;
		top: 0;
		left: 75vw;
		width: 25vw;
		height: 100vh;
	}
}
</style>
