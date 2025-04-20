<script setup lang="ts">
import { onMounted } from 'vue'
import useStore from '@renderer/store'
const store = useStore()
onMounted(() => {
	document.body.setAttribute('arco-theme', store.$state.theme)
	const loader = document.getElementsByClassName('loader').item(0)
	if (loader) {
		loader.remove()
	}
})

function LoadConfig() {
	console.log('LoadConfig')
	Object.keys(store.$state).map((key) => {
		const value = localStorage.getItem(key)
		if (value) store.$state[key] = JSON.parse(value)
	})
	store.$state.RgbEventLoop = false
	store.$subscribe(() => {
		Object.keys(store.$state).map((key) => {
			localStorage.setItem(key, JSON.stringify(store.$state[key]))
		})
	})
}
LoadConfig()
</script>

<template>
	<Suspense> <router-view style="user-select: none"></router-view> </Suspense>
</template>
