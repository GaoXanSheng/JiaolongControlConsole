import { useVueFlow, type XYPosition } from '@vue-flow/core'
import { ref, type Ref, watch } from 'vue'
import { CustomNodeData } from '@renderer/components/ProSettingComponent/editor/CustomNodes'

let id = 0

/**
 * @returns {string} - A unique id.
 */
function getId(): string {
	return `node_${id++}`
}

// 避免 global ref 的风险，类型上加注释
const state: {
	draggedType: Ref<string | undefined>
	isDragOver: Ref<boolean>
	isDragging: Ref<boolean>
} = {
	draggedType: ref<string | undefined>(undefined),
	isDragOver: ref(false),
	isDragging: ref(false)
}

interface CustomDragPayload {
	type: string
	label?: string
	config?: Record<string, unknown> // 可根据需要改得更精细
}

function isCustomDragPayload(obj: unknown): obj is CustomDragPayload {
	if (typeof obj === 'object' && obj !== null && 'type' in obj) {
		const o = obj as Record<string, unknown>
		return typeof o.type === 'string'
	}
	return false
}

export default function useDragAndDrop() {
	const { draggedType, isDragOver, isDragging } = state

	const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

	watch(isDragging, (dragging) => {
		document.body.style.userSelect = dragging ? 'none' : ''
	})

	function onDragStart<T extends object>(event: DragEvent, type: string, customData?: T): void {
		if (event.dataTransfer) {
			const payload = JSON.stringify({
				type,
				...customData
			})

			event.dataTransfer.setData('application/vueflow', payload)
			event.dataTransfer.effectAllowed = 'move'
		}

		draggedType.value = type
		isDragging.value = true
		document.addEventListener('drop', onDragEnd)
	}

	function onDragOver(event: DragEvent): void {
		event.preventDefault()

		if (draggedType.value) {
			isDragOver.value = true

			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = 'move'
			}
		}
	}

	function onDragLeave(): void {
		isDragOver.value = false
	}

	function onDragEnd(): void {
		isDragging.value = false
		isDragOver.value = false
		draggedType.value = undefined
		document.removeEventListener('drop', onDragEnd)
	}

	function onDrop(event: DragEvent): void {
		event.preventDefault()

		const rawData = event.dataTransfer?.getData('application/vueflow')
		if (!rawData) return

		let payload: CustomNodeData
		try {
			payload = JSON.parse(rawData)
		} catch (err) {
			console.error('Invalid drag data:', rawData)
			return
		}

		if (!isCustomDragPayload(payload)) {
			console.error('Drag data does not match expected structure:', payload)
			return
		}

		const position = screenToFlowCoordinate({
			x: event.clientX,
			y: event.clientY
		}) as XYPosition

		const nodeId = getId()

		const newNode = {
			id: nodeId,
			label: payload.label || 'New Node',
			type: payload.type || 'default',
			position,
			data: {
				...payload
			}
		}
		const { off } = onNodesInitialized(() => {
			updateNode(nodeId, (node) => ({
				position: {
					x: node.position.x - (node.dimensions?.width ?? 0) / 2,
					y: node.position.y - (node.dimensions?.height ?? 0) / 2
				}
			}))
			off()
		})

		addNodes(newNode)
	}

	return {
		draggedType,
		isDragOver,
		isDragging,
		onDragStart,
		onDragLeave,
		onDragOver,
		onDrop
	}
}
