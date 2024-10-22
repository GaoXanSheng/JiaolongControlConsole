<script async setup lang="ts">
import { ref } from 'vue'
import { config } from '../../../store/Config'

const PageData = ref({
	loading: false,
	switchValue: await config.get('Window.minimize')
})

async function minimize_func() {
	PageData.value.loading = true
	await config.set('Window.minimize', PageData.value.switchValue)
	PageData.value.loading = false
}
</script>

<template>
	<a-input disabled placeholder="关闭替换为最小化" allow-clear>
		<template #append>
			<a-switch v-model="PageData.switchValue" :onclick="minimize_func" :loading="PageData.loading">
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
