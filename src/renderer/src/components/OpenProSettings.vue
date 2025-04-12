<script async setup lang="ts">
import { onMounted, ref } from 'vue'
import wmiOperation from '@renderer/tools/WMIOperation'
import { HardwareMonitorInfo } from '@renderer/store/interfaces'
import CpuHeatMapData from '@renderer/components/ProSettingComponent/CpuHeatMapData.vue'
import FanSpeedData from '@renderer/components/ProSettingComponent/FanSpeedData.vue'
import GpuAmd from '@renderer/components/ProSettingComponent/GpuAmd.vue'

const MonitorInfo = ref<HardwareMonitorInfo>(await wmiOperation.GetHardwareMonitorInfo())
onMounted(async () => {
	setInterval(async () => {
		MonitorInfo.value = await wmiOperation.GetHardwareMonitorInfo()
	}, 5000)
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
		</div>
		<div class="right">
			<!-- 右侧区域 -->
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
	background: rgb(243, 244, 246);
	.left-top {
		position: absolute;
		top: 0;
		left: 0;
		width: 20vw;
		height: 80vh;
		background: rgb(225, 229, 232);
	}
	.left-bottom {
		position: absolute;
		top: 80vh;
		left: 0;
		width: 20vw;
		height: 20vh;
		background: rgb(225, 229, 232);
	}
	.center-top {
		position: absolute;
		top: 0;
		left: 20vw;
		width: 60vw;
		height: 80vh;
	}
	.center-bottom {
		position: absolute;
		top: 75vh;
		left: 20vw;
		width: 60vw;
		height: 25vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.right {
		position: absolute;
		top: 0;
		left: 80vw;
		width: 20vw;
		height: 100vh;
	}
}
</style>
