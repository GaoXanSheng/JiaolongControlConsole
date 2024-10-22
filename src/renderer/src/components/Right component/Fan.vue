<script async setup lang="ts">
import wmiOperation from '../../tools/WMIOperation'
import { ResultState } from '../../doc/IPCModels'
import successful from '../tools/successful'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import useStore from '../../store'
import { config } from '../../store/Config'

const store = useStore()
const loading = ref(false)
const FanSpeed = ref(await config.get<number>('Setting.FanSpeed'))
function ConvertParameters(v: number) {
	return Number(String(v)[0] + String(v)[1])
}

async function handleClick() {
	loading.value = true
	if (store.OS.SwitchMaxFanSpeed == ResultState.OFF) {
		await wmiOperation.Fan.SwitchMaxFanSpeed(ResultState.ON)
	}
	const data = [await wmiOperation.Fan.SetFanSpeed(ConvertParameters(FanSpeed.value))]
	const callback = successful(data)
	if (callback) {
		await config.set('Setting.FanSpeed', FanSpeed.value)
		Message.success('Fan设置成功')
	} else {
		Message.error(JSON.stringify(data))
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
					v-model="FanSpeed"
					placeholder="ShortPower"
					:min="3500"
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
