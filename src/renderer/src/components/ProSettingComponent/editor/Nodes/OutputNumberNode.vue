<script setup lang="ts">
import CustomizeNode from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeNode.vue'
import { Position } from '@vue-flow/core'
import CustomizeHandle from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeHandle.vue'
</script>

<template>
	<CustomizeNode>
		<a-input-number :min="0" :style="{ width: '160px' }" />
		<CustomizeHandle type="source" :x="200" :y="25" color="#85edff" :position="Position.Right" />
	</CustomizeNode>
</template>

<style scoped></style>
