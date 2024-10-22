<script async setup lang="ts">
import { ref } from 'vue'
import { config } from '../../../store/Config'
const pageConfig = ref({
	enabled: false,
	autoApplyCpu: false,
	autoApplyFan: false
})
if (await config.has('Window.autoApply.enabled')) {
	const { enabled, autoApplyCpu, autoApplyFan } = await config.get<{
		enabled: boolean
		autoApplyCpu: boolean
		autoApplyFan: boolean
	}>('Window.autoApply')
	pageConfig.value.enabled = enabled
	pageConfig.value.autoApplyCpu = autoApplyCpu
	pageConfig.value.autoApplyFan = autoApplyFan
}
const loading = ref(false)
async function apply() {
	loading.value = true
	await config.set('Window.autoApply', {
		autoApplyCpu: pageConfig.value.autoApplyCpu,
		autoApplyFan: pageConfig.value.autoApplyFan,
		enabled: pageConfig.value.enabled
	})
	loading.value = false
}
</script>

<template>
	<a-input disabled placeholder="实验性功能" allow-clear>
		<template #append>
			<a-switch v-model="pageConfig.enabled">
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</a-input>
	<a-input
		v-if="pageConfig.enabled"
		disabled
		placeholder="启动应用时自动应用CPU参数"
		:loading="loading"
		:onclick="apply"
		allow-clear
	>
		<template #append>
			<a-switch>
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</a-input>
	<a-input
		v-if="pageConfig.enabled"
		disabled
		placeholder="启动应用时自动应用风扇参数"
		allow-clear
		:onclick="apply"
		:loading="loading"
	>
		<template #append>
			<a-switch>
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</a-input>
</template>

<style scoped></style>
