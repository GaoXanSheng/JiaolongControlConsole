import DeBugNode from '@renderer/components/ProSettingComponent/editor/Nodes/DeBugNode.vue'
import { NodeComponent, NodeTypesObject } from '@vue-flow/core'
import { markRaw } from 'vue'

export interface CustomNode {
	id?: string
	position?: { x: number; y: number }
	Component?: NodeComponent
	type: string
	data: CustomNodeData
}
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
		type: 'input',
		data: {
			label: 'Start',
			title: '开始节点',
			config: {
				type: 'start'
			}
		}
	},
	{
		type: 'output',

		data: {
			label: 'End',
			title: '结束节点',
			config: {
				type: 'end'
			}
		}
	},
	{
		type: 'default',
		data: {
			label: 'Default',
			title: '默认节点',
			config: {
				type: 'default'
			}
		}
	},
	{
		type: 'test',
		Component: markRaw(DeBugNode) as NodeComponent,
		data: {
			title: '测试节点',
			label: 'test',
			config: {
				type: 'test'
			}
		}
	}
]
export default nodes
