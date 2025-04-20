<script async lang="ts" setup>
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/minimap/dist/style.css'
import '@vue-flow/controls/dist/style.css'

import { ref } from 'vue'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { NodeChange, useVueFlow, VueFlow } from '@vue-flow/core'
const { addEdges, onNodesChange, applyNodeChanges, onEdgesChange, applyEdgeChanges, findNode } =
	useVueFlow()

import DropzoneBackground from '@renderer/components/ProSettingComponent/editor/DropzoneBackground.vue'
import Dialog from '@renderer/components/ProSettingComponent/editor/Dialog.vue'
import CustomizeControls from '@renderer/components/ProSettingComponent/editor/CustomizeControls.vue'
import useDragAndDrop from '@renderer/components/ProSettingComponent/editor/useDnD'
import { nodeTypes } from '@renderer/components/ProSettingComponent/editor/CustomNodes'
const { onDragOver, onDrop, onDragLeave } = useDragAndDrop()
const nodes = ref([
	{ id: '1', type: 'input', data: { label: 'Start' }, position: { x: 0, y: 0 } },
	{
		id: '2',
		type: 'output',
		data: { label: `End` },
		position: { x: 0, y: 100 }
	}
])
const edges = ref([])
const modalRef = ref<InstanceType<typeof Dialog>>()
// 普通节点删除事件 添加个弹窗确认是否删除
onNodesChange(async (changes) => {
	const nextChanges: NodeChange[] = []
	for (const change of changes) {
		if (change.type === 'remove') {
			const label = findNode(change.id)?.data.label
			const confirmed = await modalRef.value?.show('提示', `你确定要删除${label}这个组件吗？`)
			if (confirmed) {
				nextChanges.push(change)
			}
		} else {
			nextChanges.push(change)
		}
	}
	applyNodeChanges(nextChanges)
})
// 连线节点事件，因为默认行为被apply-default禁用了，所以需要手动添加
onEdgesChange(applyEdgeChanges)
</script>

<template>
	<div class="editor" @drop="onDrop">
		<VueFlow
			:nodes="nodes"
			:edges="edges"
			:apply-default="false"
			:node-types="nodeTypes"
			@connect="addEdges"
			@dragover="onDragOver"
			@dragleave="onDragLeave"
		>
			<Controls />
			<MiniMap pannable zoomable position="top-right" />
			<DropzoneBackground> </DropzoneBackground>
			<CustomizeControls></CustomizeControls>
		</VueFlow>
		<Dialog ref="modalRef" />
	</div>
</template>
<style lang="scss">
@keyframes rgb-border {
	0% {
		border-color: red;
	}
	16% {
		border-color: orange;
	}
	33% {
		border-color: yellow;
	}
	50% {
		border-color: green;
	}
	66% {
		border-color: #48ff00;
	}
	83% {
		border-color: indigo;
	}
	100% {
		border-color: violet;
	}
}
.editor {
	width: 100%;
	height: 100%;
	.selected {
		animation: rgb-border 2s linear infinite;
	}
}
</style>
