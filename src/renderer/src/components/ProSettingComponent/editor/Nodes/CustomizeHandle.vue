<script setup lang="ts">
import { Handle } from '@vue-flow/core'
import type { Position } from '@vue-flow/core'

const props = defineProps<{
	type: 'source' | 'target'
	x: number
	y: number
	color: string
	position: Position
	id?: string
}>()
</script>

<template>
	<div
		class="color-handle"
		:style="{
			position: 'absolute',
			left: `${x}px`,
			top: `${y}px`
		}"
	>
		<Handle
			:id="props.id"
			:type="props.type"
			:position="props.position"
			:style="{
				background: props.color,
				width: '8px',
				height: '16px',
				borderRadius: '2px'
			}"
		/>
	</div>
</template>

<style lang="scss" scoped>
.color-handle {
	position: relative;
	display: flex;
	align-items: center;
	font-size: 12px;
	.handle-label {
		margin: 0 4px;
		white-space: nowrap;
		pointer-events: auto;
	}
}
</style>
