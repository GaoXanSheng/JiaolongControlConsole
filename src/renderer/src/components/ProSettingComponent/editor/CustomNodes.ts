import DeBugNode from '@renderer/components/ProSettingComponent/editor/Nodes/DeBugNode.vue'
import { NodeComponent, NodeTypesObject } from '@vue-flow/core'
import { markRaw } from 'vue'
import IFNode from '@renderer/components/ProSettingComponent/editor/Nodes/IFNode.vue'
import SetFunctionNode from '@renderer/components/ProSettingComponent/editor/Nodes/SetFunctionNode.vue'
import OutputNumberNode from '@renderer/components/ProSettingComponent/editor/Nodes/OutputNumberNode.vue'
import GetFunctionNode from '@renderer/components/ProSettingComponent/editor/Nodes/GetFunctionNode.vue'

export interface CustomNode {
	id?: string
	position?: { x: number; y: number }
	Component?: NodeComponent
	type: string
	data: CustomNodeData
	options?: CustomNodeOptions
}
export interface CustomNodeOptions extends Record<string, unknown> {}
export interface CustomNodeData {
	label: string
	config: { type: string }
	title?: string
}

export function getNodeTypes(): NodeTypesObject {
	const temp = {}
	nodes.map((node) => {
		if (node.Component) {
			temp[node.type] = node.Component
		}
	})
	return temp
}

const nodes: CustomNode[] = [
	{
		type: 'DeBug',
		Component: markRaw(DeBugNode) as NodeComponent,
		data: {
			title: 'DeBug',
			label: 'DeBug',
			config: {
				type: 'DeBug'
			}
		}
	},
	{
		type: 'IF',
		Component: markRaw(IFNode) as NodeComponent,
		data: {
			title: '如果',
			label: '如果',
			config: {
				type: 'IF'
			}
		}
	},
	{
		type: 'SetFunctionNode',
		Component: markRaw(SetFunctionNode) as NodeComponent,
		data: {
			title: '设置功能',
			label: '设置功能',
			config: {
				type: 'SetFunctionNode'
			}
		}
	},
	{
		type: 'OutputNumber',
		Component: markRaw(OutputNumberNode) as NodeComponent,
		data: {
			title: '输出数字',
			label: '输出数字',
			config: {
				type: 'OutputNumber'
			}
		}
	},
	{
		type: 'GetFunctionNode',
		Component: markRaw(GetFunctionNode) as NodeComponent,
		data: {
			title: '获取功能数值',
			label: '获取功能数值',
			config: {
				type: 'GetFunctionNode'
			}
		}
	}
]
export default nodes
