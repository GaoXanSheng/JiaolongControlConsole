<script setup lang="ts">
import CPU from './assets/CPU.png'
import HOME from './assets/HOME.png'
import Information from './assets/Information.png'
import Event from './assets/Event.png'
import Fan from './assets/Fan.png'
import Keyboard from './assets/Keyboard.png'
import Settings from './assets/Settings.png'
import RightSide from './components/rightSide.vue'
import { onMounted } from 'vue'
import { HomeTab } from './doc/HomeTab'
import useStore from './store'
const store = useStore()
onMounted(() => {
	const loader = document.getElementsByClassName('loader').item(0)
	if (loader) loader.remove()
})
const HomeCardType = [
	{
		title: '主页',
		icon: HOME,
		eum: HomeTab.HOME
	},
	{
		title: '中央处理器',
		icon: CPU,
		eum: HomeTab.CPU
	},
	// {
	// 	title: '调度控制',
	// 	icon: Event,
	// 	eum: HomeTab.EventLoop
	// },
	// {
	// 	title: '信息报表',
	// 	icon: Information,
	// 	eum: HomeTab.Information
	// },
	{
		title: '风扇',
		icon: Fan,
		eum: HomeTab.Fan
	},
	{
		title: '键盘',
		icon: Keyboard,
		eum: HomeTab.Keyboard
	},
	{
		title: '设置',
		icon: Settings,
		eum: HomeTab.Settings
	}
]

function onClickMenuItem(key: number) {
	store.SwitchPages = key
}
</script>

<template>
	<Suspense>
		<a-layout class="layout">
			<a-layout-sider collapsible breakpoint="xl">
				<a-menu :style="{ width: '200px', height: '100%' }" @menu-item-click="onClickMenuItem">
					<a-menu-item v-for="item in HomeCardType" :key="item.eum">
						<template #icon>
							<a-image
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
				<a-layout style="padding: 2px">
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
</style>
