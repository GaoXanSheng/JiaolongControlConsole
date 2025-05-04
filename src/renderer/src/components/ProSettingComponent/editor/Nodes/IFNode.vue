<script setup lang="ts">
import { type Node, Position } from '@vue-flow/core'
import { CustomNode } from '@renderer/components/ProSettingComponent/editor/CustomNodes'
import CustomizeHandle from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeHandle.vue'
import CustomizeNode from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeNode.vue'
const props = defineProps<Node<CustomNode>>()
</script>

<template>
	<CustomizeNode>
		<a-input-group>
			<a-select :options="['大于', '小于', '等于']" :style="{ width: '160px' }"> </a-select>
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
