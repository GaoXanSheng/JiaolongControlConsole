<script setup lang="ts">
import RightSide from './components/rightSide.vue'

import useStore, { HomeCardType } from './store'
import { onMounted } from 'vue'
import { HomeTab } from '@renderer/store/HomeTab'

const store = useStore()

function onClickMenuItem(key: HomeTab) {
	store.$state.SwitchPages = key
}

onMounted(() => {
	const loader = document.getElementsByClassName('loader').item(0)
	if (loader) loader.remove()
	document.body.setAttribute('arco-theme', store.$state.theme)
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
	<Suspense>
		<a-layout class="layout">
			<a-layout-sider collapsible breakpoint="xl">
				<a-menu :style="{ width: '200px', height: '100%' }" @menu-item-click="onClickMenuItem">
					<a-menu-item v-for="item in HomeCardType" :key="item.eum">
						<template #icon>
							<a-image
								class="theme"
								width="16"
								shape="square"
								:src="item.icon"
								:preview-visible="false"
							></a-image>
						</template>
						{{ item.title }}
					</a-menu-item>
				</a-menu>
				<template #trigger="{ collapsed }">
					<IconCaretRight v-if="collapsed"></IconCaretRight>
					<IconCaretLeft v-else></IconCaretLeft>
				</template>
			</a-layout-sider>
			<a-layout>
				<a-layout class="content">
					<a-layout-content>
						<RightSide></RightSide>
					</a-layout-content>
				</a-layout>
			</a-layout>
		</a-layout>
	</Suspense>
</template>

<style lang="scss" scoped>
.layout {
	width: 100vw;
	height: 100vh;
	background: var(--color-fill-2);

	:deep(.arco-layout-content) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: var(--color-white);
		font-size: 16px;
		font-stretch: condensed;
		text-align: center;
		font-weight: 400;
		background: var(--color-bg-3);
	}
}

body[arco-theme='dark'] {
	.content {
		padding-left: 0;
	}
	.theme {
		filter: invert(100%);
	}
}

body[arco-theme='light'] {
	.theme {
		filter: invert(0);
	}
	.content {
		padding-left: 2px;
	}
}
</style>
