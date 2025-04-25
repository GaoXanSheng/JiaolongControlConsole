<script setup lang="ts">
import { Handle, Position, type Node, useNodeConnections, useNodesData } from '@vue-flow/core'
import { CustomNode } from '@renderer/components/ProSettingComponent/editor/CustomNodes'

const props = defineProps<Node<CustomNode>>()

const inputConnections = useNodeConnections({
	handleType: 'target'
})
const outputConnections = useNodeConnections({
	handleType: 'source'
})

const inputConnectionsData = useNodesData(() => inputConnections.value[0]?.source)
const outputConnectionsData = useNodesData(() => outputConnections.value[0]?.target)
</script>

<template>
	<div class="custom-node">
		<div>{{ props.data }}</div>
		<div>{{ inputConnectionsData }}</div>
		<div>{{ outputConnectionsData }}</div>
		<Handle type="source" :position="Position.Right" />
		<Handle type="target" :position="Position.Left" />
	</div>
</template>

<style lang="scss" scoped>
.custom-node {
	padding: 10px 20px;
	border: 1px solid #1e88e5; /* Blue border */
	background-color: #bbdefb; /* Light blue background */
	border-radius: 8px;
	min-width: 100px;
	text-align: center;
	font-family: sans-serif;
	font-size: 12px;
	color: #1a237e; /* Dark blue text */
}
</style>
