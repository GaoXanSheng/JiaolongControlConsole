<script setup lang="ts">
import { onMounted, ref } from 'vue'
import WMIOperation from '@renderer/tools/WMIOperation'
import { Message } from '@arco-design/web-vue'
const GPUDirectConnection = ref(false)
onMounted(async () => {
	const result = await WMIOperation.GPUMode.Get()
	GPUDirectConnection.value = result == 0
})
async function GPUDirectConnection_handleClick() {
	const result = await WMIOperation.GPUMode.Set(GPUDirectConnection.value ? 0 : 1)
	if (result == '拒绝访问') {
		GPUDirectConnection.value = false
		Message.error(result)
	} else {
		Message.success('应用成功')
		Message.info('独显直连应用后需重启')
	}
}
</script>

<template>
	<a-col :span="16">
		<a-input disabled placeholder="独显直连" allow-clear>
			<template #append>
				<a-switch v-model="GPUDirectConnection" @change="GPUDirectConnection_handleClick">
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
