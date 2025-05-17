import { defineStore } from 'pinia'
import { HomeTab } from '@renderer/store/HomeTab'
import HOME from '@renderer/assets/HOME.png'
import CPU from '@renderer/assets/CPU.png'
import Fan from '@renderer/assets/Fan.png'
import Keyboard from '@renderer/assets/Keyboard.png'
import Settings from '@renderer/assets/Settings.png'

const useStore = defineStore('store', {
	state: () => {
		return {
			Debug: false,
			SwitchPages: HomeTab.HOME,
			FanSpeed: 1500,
			CPUData: {
				shortPower: 65,
				longPower: 45,
				tempWall: 88
			},
			RgbEventLoop: false,
			theme: 'light',
			ServiceOption: false,
			customVideo: ''
		}
	}
})
export const HomeCardType = [
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

export default useStore
