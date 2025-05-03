<script setup lang="ts">
import RgbEventLoop from '@renderer/components/RightComponent/setting/RgbEventLoop.vue'
import FanSpeedSwitch from '@renderer/components/RightComponent/setting/FanSpeedSwitch.vue'
import GPUDirectConnection from '@renderer/components/RightComponent/setting/GPUDirectConnection.vue'
import LogoLight from '@renderer/components/RightComponent/setting/LogoLight.vue'
import Theme from '@renderer/components/RightComponent/setting/theme.vue'
import PowerMode from '@renderer/components/RightComponent/setting/PowerMode.vue'
import CpuBoost from '@renderer/components/RightComponent/setting/CPUBoost.vue'
</script>

<template>
	<div class="setting">
		<a-row justify="center">
			<a-col :span="16">
				<a-typography-title class="title"> Settings </a-typography-title>
			</a-col>
			<rgb-event-loop></rgb-event-loop>
			<FanSpeedSwitch></FanSpeedSwitch>
			<GPUDirectConnection></GPUDirectConnection>
			<LogoLight></LogoLight>
			<CpuBoost></CpuBoost>
			<theme></theme>
			<power-mode></power-mode>
		</a-row>
	</div>
</template>

<style lang="scss" scoped>
.setting {
	padding-top: 20px;

	.title {
		text-align: left;
	}
}
</style>
