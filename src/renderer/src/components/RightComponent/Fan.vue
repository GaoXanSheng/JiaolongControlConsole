<script async setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import useStore from '@renderer/store'
import wmiOperation from '@renderer/tools/WMIOperation'
const store = useStore()
const loading = ref(false)
const _thisFan = wmiOperation.Fan
async function handleClick() {
	loading.value = true
	await _thisFan.SetMaxFanSpeedSwitch(true)
	const msg = await _thisFan.SetFanSpeed(store.$state.FanSpeed)
	if (msg != 'Fan Speed Set OK') {
		Message.error(msg)
	} else {
		Message.success(msg)
	}
	loading.value = false
}
</script>

<template>
	<div class="Fan">
		<a-row justify="center">
			<a-col :span="16">
				<a-typography-title class="title"> Fan Settings </a-typography-title>
			</a-col>
			<a-col :span="16" class="item">
				<a-input-number
					v-model="store.$state.FanSpeed"
					placeholder="FanSpeed"
					:min="1500"
					:max="5800"
					model-event="input"
				>
					<template #append> 风扇转速 </template>
				</a-input-number>
			</a-col>
			<a-col :span="16" class="item">
				<a-button type="primary" :loading="loading" @click="handleClick">确认</a-button>
			</a-col>
		</a-row>
	</div>
</template>

<style scoped>
.Fan {
	padding-top: 20px;

	.title {
		text-align: left;
	}

	.item {
		margin-top: 10px;
	}
}
</style>
