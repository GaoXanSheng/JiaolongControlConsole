<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const resolveFn = ref<((value: boolean) => void) | null>(null)
const pageData = ref({
	title: '',
	message: ''
})

const show = (title: string, message: string): Promise<boolean> => {
	pageData.value.title = title
	pageData.value.message = message
	visible.value = true
	return new Promise((resolve) => {
		resolveFn.value = resolve
	})
}

const handleOk = () => {
	visible.value = false
	resolveFn.value?.(true)
}

const handleCancel = () => {
	visible.value = false
	resolveFn.value?.(false)
}

defineExpose({ show })
</script>

<template>
	<a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
		<template #title>{{ pageData.title }}</template>
		<div>{{ pageData.message }}</div>
	</a-modal>
</template>

<style scoped></style>
