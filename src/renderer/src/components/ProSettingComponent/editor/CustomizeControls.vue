<script setup lang="ts">
import { Panel, useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import useDragAndDrop from '@renderer/components/ProSettingComponent/editor/useDnD'
import customNodes from '@renderer/components/ProSettingComponent/editor/CustomNodes'
const NodeAddition = ref(false)
const flowKey = 'vue-flow--save-restore'
const { toObject, fromObject } = useVueFlow()

function onSave() {
	localStorage.setItem(flowKey, JSON.stringify(toObject()))
}

function onRestore() {
	const res = localStorage.getItem(flowKey)
	if (!res) {
		return
	}
	const flow = JSON.parse(res)
	if (flow) {
		fromObject(flow)
	}
}

function onOpenNodeAddition() {
	NodeAddition.value = !NodeAddition.value
}
const { onDragStart } = useDragAndDrop()
</script>

<template>
	<Panel position="bottom-center">
		<div class="customControls">
			<a-space size="mini">
				<a-button title="保存配置文件" @click="onSave"><icon-save /></a-button>
				<a-button title="重置配置文件" @click="onRestore"><icon-refresh /></a-button>
				<a-button title="打开节点添加" @click="onOpenNodeAddition">
					<icon-up v-if="!NodeAddition" />
					<icon-down v-else />
				</a-button>
			</a-space>
		</div>
		<div v-if="NodeAddition" class="custom-node-addition">
			<a-scrollbar style="overflow: auto">
				<a-space class="custom-node">
					<div
						v-for="(node, key) in customNodes"
						:key="key"
						:draggable="true"
						@dragstart="
							onDragStart($event, node.type, {
								label: node.title
							})
						"
					>
						{{ node.title }}
					</div>
				</a-space>
			</a-scrollbar>
		</div>
	</Panel>
</template>

<style lang="scss" scoped>
.customControls {
	padding: 5px;
}
.custom-node-addition {
	background-color: #efefef;
	height: 80px;
	width: 800px;
	.custom-node {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		div {
			height: 80px;
			width: 80px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #f5f7fa;
			border: 1px solid #d9d9d9;
			padding: 8px 12px;
			cursor: pointer;
			border-radius: 4px;
			&:hover {
				background-color: #e6f7ff;
				border-color: #40a9ff;
			}
		}
	}
}
</style>
