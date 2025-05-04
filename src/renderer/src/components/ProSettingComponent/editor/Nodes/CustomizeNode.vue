<script setup lang="ts">
defineEmits(['updateNodeInternals'])
</script>
<template>
	<div class="custom-node">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.custom-node {
	min-width: 200px;
	min-height: 50px;
	padding: 10px 20px;
	border: 1px solid #1e88e5; /* Blue border */
	background-color: #fefefe; /* Light blue background */
	border-radius: 3px;
	text-align: center;
	font-family: sans-serif;
	font-size: 12px;
	color: #1a237e; /* Dark blue text */
}
</style>
