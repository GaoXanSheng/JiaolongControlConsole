<script setup lang="ts">
import RgbEventLoop from '@renderer/components/RightComponent/setting/RgbEventLoop.vue'
import FanSpeedSwitch from '@renderer/components/RightComponent/setting/FanSpeedSwitch.vue'
import GPUDirectConnection from '@renderer/components/RightComponent/setting/GPUDirectConnection.vue'
import LogoLight from '@renderer/components/RightComponent/setting/LogoLight.vue'
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
		</a-row>
	</div>
</template>

<style scoped>
.setting {
	padding-top: 20px;

	.title {
		text-align: left;
	}
}
</style>
