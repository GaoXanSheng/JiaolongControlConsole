<script setup lang="ts">
import { onMounted, ref } from 'vue'
import WMIOperation from '@renderer/tools/WMIOperation'
import { Message } from '@arco-design/web-vue'
import SettingCardComponent from '@renderer/components/RightComponent/setting/SettingCardComponent.vue'

const FanSpeedSwitch = ref(false)
onMounted(async () => {
	const result = await WMIOperation.Fan.GetMaxFanSpeedSwitch()
	FanSpeedSwitch.value = result == 1
})

async function FanSpeedSwitch_handleClick() {
	const msg: string | boolean = await WMIOperation.Fan.SetMaxFanSpeedSwitch(FanSpeedSwitch.value)
	if (msg == '拒绝访问') {
		Message.error(msg)
		FanSpeedSwitch.value = false
	} else {
		Message.success('应用成功')
	}
}
</script>

<template>
	<setting-card-component title="风扇自动控速开关">
		<template #extra>
			<a-switch v-model="FanSpeedSwitch" @change="FanSpeedSwitch_handleClick">
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
