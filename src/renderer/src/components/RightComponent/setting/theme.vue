<script setup lang="ts">
import useStore from '@renderer/store'
import { ref } from 'vue'
import SettingCardComponent from '@renderer/components/RightComponent/setting/SettingCardComponent.vue'

const store = useStore()
const theme = ref(store.$state.theme != 'light')

function setTheme() {
	if (theme.value) {
		store.$state.theme = 'dark'
	} else {
		store.$state.theme = 'light'
	}
	document.body.setAttribute('arco-theme', store.$state.theme)
}
</script>

<template>
	<setting-card-component title="暗色主题">
		<template #extra>
			<a-switch v-model="theme" @change="setTheme">
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</setting-card-component>
</template>

<style scoped></style>
