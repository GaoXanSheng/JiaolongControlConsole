<script setup lang="ts">
import Self_starting from './settings/self_starting.vue'
import logolight from './settings/logolight.vue'
import Minimize from './settings/minimize.vue'
import selfStartingApplication from './settings/selfStartingApplication.vue'
const list = [Self_starting, logolight, Minimize, selfStartingApplication]
</script>

<template>
	<div class="setting">
		<a-row justify="center">
			<a-col :span="16">
				<a-typography-title class="title"> Settings </a-typography-title>
			</a-col>
			<a-col v-for="component in list" :span="16"> <component :is="component"></component> </a-col>
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
