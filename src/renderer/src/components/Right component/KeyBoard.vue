<script async setup lang="ts">
import wmiOperation from '../../tools/WMIOperation'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'

const KeyboardColorData = await wmiOperation.Keyboard.Color.Get()
const Data = ref({
	red: KeyboardColorData.red,
	green: KeyboardColorData.green,
	blue: KeyboardColorData.blue,
	LightBrightness: await wmiOperation.Keyboard.LightBrightness.Get()
})
const loading = ref(false)

async function handleClick() {
	loading.value = true
	// const data = [
	const ColorRes = await wmiOperation.Keyboard.Color.Set(
		Data.value.red,
		Data.value.green,
		Data.value.blue
	)
	const LightBrightnessRes = await wmiOperation.Keyboard.LightBrightness.Set(
		Data.value.LightBrightness
	)
	if (ColorRes && LightBrightnessRes) {
		Message.success('应用成功')
	} else {
		Message.error('应用失败')
	}
	loading.value = false
}
</script>

<template>
	<div class="Keyboard">
		<a-row justify="center">
			<a-col :span="16">
				<a-typography-title class="title"> KeyBoard Settings</a-typography-title>
			</a-col>
			<div
				class="keys"
				:style="{ backgroundColor: `rgb(${Data.red}, ${Data.green}, ${Data.blue})` }"
			>
				<p
					class="Preview"
					:style="{ color: `rgb(${255 - Data.blue}, ${255 - Data.green}, ${255 - Data.red})` }"
				>
					Preview
				</p>
			</div>
			<a-col :span="16" class="item">
				<a-input-number
					v-model="Data.red"
					placeholder="Red"
					:min="0"
					:max="255"
					model-event="input"
				>
					<template #append> Red</template>
				</a-input-number>
			</a-col>
			<a-col :span="16" class="item">
				<a-input-number
					v-model="Data.green"
					placeholder="Green"
					:min="0"
					:max="255"
					model-event="input"
				>
					<template #append> Green</template>
				</a-input-number>
			</a-col>
			<a-space direction="vertical" size="large"></a-space>
			<a-col :span="16" class="item">
				<a-input-number
					v-model="Data.blue"
					placeholder="Blue"
					:min="0"
					:max="255"
					model-event="input"
				>
					<template #append> Blue</template>
				</a-input-number>
			</a-col>
			<a-col :span="16" class="item">
				<a-input-number
					v-model="Data.LightBrightness"
					:min="0"
					placeholder="LightBrightness"
					:max="3"
					model-event="input"
				>
					<template #append> LightBrightness</template>
				</a-input-number>
			</a-col>
			<a-col :span="16" class="item">
				<a-button type="primary" :loading="loading" @click="handleClick">确认</a-button>
			</a-col>
		</a-row>
	</div>
</template>

<style scoped>
.Keyboard {
	padding-top: 20px;

	.title {
		text-align: left;
	}

	.keys {
		width: 600px;
		height: 200px;

		.Preview {
			top: 45%;
			position: relative;
			text-align: center;
		}
	}

	.item {
		margin-top: 10px;
	}
}
</style>
