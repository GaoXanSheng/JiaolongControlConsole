<script setup lang="ts">
import { onMounted, ref } from 'vue'
import WMIOperation from '@renderer/tools/WMIOperation'
import { Message } from '@arco-design/web-vue'

const LogoLight = ref(false)
onMounted(async () => {
	const result = await WMIOperation.LogoLight.Get()
	LogoLight.value = result == 0
})
async function LogoLight_handleClick() {
	const result = await WMIOperation.LogoLight.Set(LogoLight.value ? 1 : 0)
	if (result == '拒绝访问') {
		LogoLight.value = false
		Message.error(result)
	} else {
		Message.success('应用成功')
	}
}
</script>

<template>
	<a-col :span="16">
		<a-input disabled placeholder="Logo灯" allow-clear>
			<template #append>
				<a-switch v-model="LogoLight" @change="LogoLight_handleClick">
					<template #checked-icon>
						<icon-check />
					</template>
					<template #unchecked-icon>
						<icon-close />
					</template>
				</a-switch>
			</template>
		</a-input>
	</a-col>
</template>

<style scoped></style>
