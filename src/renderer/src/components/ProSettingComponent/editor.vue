<script async lang="ts" setup>
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/minimap/dist/style.css'
import '@vue-flow/controls/dist/style.css'

import { nextTick, ref } from 'vue'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { EdgeChange, NodeChange, useVueFlow, VueFlow } from '@vue-flow/core'
import DropzoneBackground from '@renderer/components/ProSettingComponent/editor/DropzoneBackground.vue'
import Dialog from '@renderer/components/ProSettingComponent/editor/Dialog.vue'
import CustomizeControls from '@renderer/components/ProSettingComponent/editor/CustomizeControls.vue'
import useDragAndDrop from '@renderer/components/ProSettingComponent/editor/useDnD'
import { getNodeTypes } from '@renderer/components/ProSettingComponent/editor/CustomNodes'

const { addEdges, onNodesChange, applyNodeChanges, onEdgesChange, applyEdgeChanges, findNode } =
	useVueFlow()

const { onDragOver, onDrop, onDragLeave } = useDragAndDrop()
const nodes = ref([])
const edges = ref([])
const modalRef = ref<InstanceType<typeof Dialog>>()

// 普通节点删除事件 添加个弹窗确认是否删除
async function handleChanges<T extends { type: string; id?: string }>(
	changes: T[],
	findLabel: (id: string) => string | undefined,
	confirmMessage: (label: string) => string,
	applyChanges: (changes: T[]) => void
) {
	const nextChanges: T[] = []

	for (const change of changes) {
		if (change.type === 'remove') {
			const label = change.id ? (findLabel(change.id) ?? '') : ''
			const confirmed = await modalRef.value?.show('提示', confirmMessage(label))
			if (confirmed) {
				nextChanges.push(change)
			}
		} else {
			nextChanges.push(change)
		}
	}

	// Use nextTick to avoid triggering reactivity in the same cycle
	await nextTick(() => {
		applyChanges(nextChanges)
	})
}

onNodesChange((changes) => {
	handleChanges<NodeChange>(
		changes,
		(id) => findNode(id)?.data.label,
		(label) => `你确定要删除 ${label} 这个组件吗？`,
		applyNodeChanges
	)
})

onEdgesChange((changes) => {
	handleChanges<EdgeChange>(
		changes,
		() => '', // 连线没有 label
		() => '你确定要删除连线吗？',
		applyEdgeChanges
	)
})
</script>

<template>
	<div class="editor" @drop="onDrop">
		<VueFlow
			:nodes="nodes"
			:edges="edges"
			:apply-default="false"
			:node-types="getNodeTypes()"
			@connect="addEdges"
			@dragover="onDragOver"
			@dragleave="onDragLeave"
		>
			<Controls />
			<MiniMap pannable zoomable position="top-right" />
			<DropzoneBackground></DropzoneBackground>
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

	[selected='true'] {
		animation: rgb-border 2s linear infinite;
	}
}
</style>
