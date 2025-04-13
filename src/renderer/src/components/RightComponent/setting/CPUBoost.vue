<script async setup lang="ts">
import SettingCardComponent from '@renderer/components/RightComponent/setting/SettingCardComponent.vue'
import { ref } from 'vue'
import WMIOperation from '@renderer/tools/WMIOperation'

const cpuboost = ref(await WMIOperation.CPU.GetCustomMode())

async function CpuBoost_handleClick() {
	await WMIOperation.CPU.OpenCustomMode(cpuboost.value)
}
</script>

<template>
	<setting-card-component title="CPU增压">
		<template #extra>
			<a-switch v-model="cpuboost" @change="CpuBoost_handleClick">
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</setting-card-component>
</template>

<style scoped></style>
