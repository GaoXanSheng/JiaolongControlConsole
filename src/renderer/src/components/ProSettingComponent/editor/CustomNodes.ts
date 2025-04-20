import BaseCustomNode from '@renderer/components/ProSettingComponent/editor/Nodes/BaseCustomNode.vue'
import { NodeComponent, NodeTypesObject } from '@vue-flow/core'

interface CustomNode {
	type: string
	title: string
	data: { label: string; config: { type: string } }
}

export const nodeTypes: NodeTypesObject = {
	test: BaseCustomNode as NodeComponent
}
const nodes: CustomNode[] = [
	{
		type: 'input',
		title: '开始节点',
		data: {
			label: 'Start',
			config: {
				type: 'start'
			}
		}
	},
	{
		type: 'output',
		title: '结束节点',
		data: {
			label: 'End',
			config: {
				type: 'end'
			}
		}
	},
	{
		type: 'default',
		title: '默认节点',
		data: {
			label: 'Default',
			config: {
				type: 'default'
			}
		}
	},
	{
		type: 'test',
		title: '测试节点',
		data: {
			label: 'test',
			config: {
				type: 'test'
			}
		}
	}
]
export default nodes
