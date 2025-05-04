<script setup lang="ts">
import CustomizeNode from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeNode.vue'
import { Position } from '@vue-flow/core'
import CustomizeHandle from '@renderer/components/ProSettingComponent/editor/Nodes/CustomizeHandle.vue'
</script>

<template>
	<CustomizeNode>
		<a-select :options="['风扇转速', 'CPU温度', 'GPU温度']" :style="{ width: '160px' }"> </a-select>
		<a-input-number :style="{ width: '160px' }" />
	</CustomizeNode>
	<CustomizeHandle type="source" :x="0" :y="25" color="#ffadd5" :position="Position.Left" />
</template>

<style scoped></style>
