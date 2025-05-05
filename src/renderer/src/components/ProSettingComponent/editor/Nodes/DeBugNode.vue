<script setup lang="ts">
import { Handle, Position, useNodeConnections, useNodesData } from '@vue-flow/core'
import CustomizeNode from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeNode.vue'

const inputConnections = useNodeConnections({
	handleType: 'target'
})
const outputConnections = useNodeConnections({
	handleType: 'source'
})

const inputConnectionsData = useNodesData(() =>
	inputConnections.value.map((connection) => connection.source)
)
const outputConnectionsData = useNodesData(() =>
	outputConnections.value.map((connection) => connection.target)
)
</script>

<template>
	<CustomizeNode>
		<div>DEBUG</div>
		<div>{{ inputConnectionsData }}</div>
		<div>{{ outputConnectionsData }}</div>
		<Handle type="source" :position="Position.Right" />
		<Handle type="target" :position="Position.Left" />
	</CustomizeNode>
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
