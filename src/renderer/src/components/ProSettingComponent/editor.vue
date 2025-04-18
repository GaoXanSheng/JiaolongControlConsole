<script async lang="ts" setup>
import { ref } from 'vue'
import { Connection, useVueFlow, VueFlow } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
const { addEdges } = useVueFlow()
import DropzoneBackground from '@renderer/components/nodes/DropzoneBackground.vue'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/minimap/dist/style.css'
import '@vue-flow/controls/dist/style.css'

const nodes = ref([])
const edges = ref([])
</script>

<template>
	<div class="editor">
		<VueFlow :nodes="nodes" :edges="edges" @connect="(event: Connection) => addEdges(event)">
			<Controls />
			<MiniMap pannable zoomable />
			<DropzoneBackground> </DropzoneBackground>
		</VueFlow>
	</div>
</template>
<style scoped>
.editor {
	width: 100%;
	height: 100%;
}
</style>
