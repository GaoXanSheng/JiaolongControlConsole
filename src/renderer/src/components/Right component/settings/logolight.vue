<script async setup lang="ts">
import { ref } from 'vue'
import wmiOperation from '../../../tools/WMIOperation'
import { ResultState } from '../../../doc/IPCModels'

const loading = ref(false)
const logoLigth = ref(await wmiOperation.GetLogoLight())

const logoLigth_function = async () => {
	loading.value = true
	if (logoLigth.value) {
		await wmiOperation.SetLogoLight(ResultState.OFF)
	} else {
		await wmiOperation.SetLogoLight(ResultState.ON)
	}
	loading.value = false
}
</script>

<template>
	<a-input disabled placeholder="设置LOGO灯" allow-clear>
		<template #append>
			<a-switch v-model="logoLigth" :onclick="logoLigth_function" :loading="loading">
				<template #checked-icon>
					<icon-check />
				</template>
				<template #unchecked-icon>
					<icon-close />
				</template>
			</a-switch>
		</template>
	</a-input>
</template>

<style scoped></style>
