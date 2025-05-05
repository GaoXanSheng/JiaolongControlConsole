<script setup lang="ts">
import CustomizeNode from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeNode.vue'
import { type Node, Position, useVueFlow } from '@vue-flow/core'
import CustomizeHandle from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeHandle.vue'
import { CustomNode } from '@renderer/components/ProSettingComponent/editor/CustomNodes'
import { ref } from 'vue'
const props = defineProps<Node<CustomNode>>()
const { updateNode } = useVueFlow()

const options = ref({
	value: 0
})
</script>

<template>
	<CustomizeNode>
		<a-input-number
			:min="0"
			:style="{ width: '160px' }"
			:model-value="options.value"
			@change="() => updateNode(props.id, { data: { ...props.data, options } })"
		/>
		<CustomizeHandle type="source" :x="200" :y="25" color="#85edff" :position="Position.Right" />
	</CustomizeNode>
</template>

<style scoped></style>
