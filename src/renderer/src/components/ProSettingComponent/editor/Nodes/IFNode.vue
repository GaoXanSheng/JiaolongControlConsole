<script setup lang="ts">
import { type Node, Position, useVueFlow } from '@vue-flow/core'
import { CustomNode } from '@renderer/components/ProSettingComponent/editor/CustomNodes'
import CustomizeHandle from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeHandle.vue'
import CustomizeNode from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeNode.vue'
import { nextTick } from 'vue'
const props = defineProps<Node<CustomNode>>()
const { updateNode } = useVueFlow()

const list = ['大于', '小于', '等于']
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
		<a-input-group>
			<a-select
				:options="list"
				:value="props.data?.options?.value"
				:style="{ width: '160px' }"
				@change="(value) => handleChange('value', value)"
			/>
		</a-input-group>
		<CustomizeHandle
			id="target1"
			type="target"
			:x="0"
			:y="10"
			color="#ffadd5"
			:position="Position.Left"
		/>
		<CustomizeHandle
			id="target2"
			type="target"
			:x="0"
			:y="40"
			color="#ffadd5"
			:position="Position.Left"
		/>
		<CustomizeHandle type="source" :x="200" :y="25" color="#85edff" :position="Position.Right" />
	</CustomizeNode>
</template>

<style lang="scss" scoped></style>
