<script setup lang="ts">
import { Background } from '@vue-flow/background'
</script>

<template>
	<div class="dropzone-background">
		<Background class="editor-background" :size="2" :gap="20" pattern-color="#BDBDBD" />
		<div class="overlay">
			<slot />
		</div>
	</div>
</template>

<style scoped>
.editor-background {
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>
