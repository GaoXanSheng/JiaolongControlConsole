<script setup lang="ts">
import CustomizeNode from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeNode.vue'
import CustomizeHandle from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeHandle.vue'
import { Position, useVueFlow } from '@vue-flow/core'
import { CustomNode } from '@renderer/components/ProSettingComponent/editor/CustomNodes'
import { nextTick } from 'vue'

const props = defineProps<CustomNode>()

const { updateNode } = useVueFlow()
const list = ['风扇转速', 'CPU功耗']
// 监听 change 事件，并更新 props.options
function handleChange<T>(key: string, value: T) {
	// 使用 `nextTick` 确保更新后的 options 被正确渲染
	nextTick(() => {
		updateNode(
			props.id!,
			{
				data: { ...props.data, options: { [key]: value } }
			},
			{ replace: false }
		)
	})
}
</script>

<template>
	<CustomizeNode>
		<a-select
			:options="list"
			:style="{ width: '160px' }"
			@change="(value) => handleChange('label', value)"
		></a-select>
		<a-input-number :style="{ width: '160px' }" @change="(value) => handleChange('value', value)" />
		<CustomizeHandle type="source" :x="0" :y="25" color="#ffadd5" :position="Position.Left" />
	</CustomizeNode>
</template>

<style scoped></style>
