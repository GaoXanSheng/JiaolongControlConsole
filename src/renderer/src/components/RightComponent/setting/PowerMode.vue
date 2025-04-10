<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import WMIOperation, { PerformaceMode } from '@renderer/tools/WMIOperation'
import SettingCardComponent from '@renderer/components/RightComponent/setting/SettingCardComponent.vue'

async function PowerMode_handleClick(PowerMode: PerformaceMode) {
	const result = await WMIOperation.PerformaceMode.Set(PowerMode)
	if (result == '拒绝访问') {
		Message.error(result)
	} else {
		Message.success('应用成功')
	}
}
</script>

<template>
	<setting-card-component title="模式切换">
		<template #extra>
			<a-space size="large">
				<a-dropdown>
					<a-button>选择</a-button>
					<template #content>
						<a-doption @click="PowerMode_handleClick(PerformaceMode.OfficeMode)"
							>办公模式
						</a-doption>
						<a-doption @click="PowerMode_handleClick(PerformaceMode.GamingMode)"
							>性能模式
						</a-doption>
						<a-doption @click="PowerMode_handleClick(PerformaceMode.RampageMode)"
							>狂飙模式
						</a-doption>
					</template>
				</a-dropdown>
			</a-space>
		</template>
	</setting-card-component>
</template>

<style scoped></style>
