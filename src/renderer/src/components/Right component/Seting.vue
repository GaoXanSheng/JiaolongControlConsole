<script setup lang="ts">
import Self_starting from './settings/self_starting.vue'
import logolight from './settings/logolight.vue'
import Minimize from './settings/minimize.vue'
</script>

<template>
	<div class="setting">
		<a-row justify="center">
			<a-col :span="16">
				<a-typography-title class="title"> Settings </a-typography-title>
			</a-col>
			<a-col :span="16">
				<self_starting></self_starting>
			</a-col>
			<a-col :span="16">
				<minimize></minimize>
			</a-col>
			<a-col :span="16">
				<logolight></logolight>
			</a-col>
		</a-row>
	</div>
</template>

<style scoped>
.setting {
	padding-top: 20px;

	.title {
		text-align: left;
	}
}
</style>
