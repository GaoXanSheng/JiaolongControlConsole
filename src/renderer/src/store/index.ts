import { defineStore } from 'pinia'
import { HomeTab } from '@renderer/doc/HomeTab'

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
			RgbEventLoop: false
		}
	}
})

export default useStore
