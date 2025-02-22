import { defineStore } from 'pinia'
import { HomeTab } from '../doc/HomeTab'

const useStore = defineStore('store', {
	state: () => {
		return {
			Debug: false,
			SwitchPages: HomeTab.HOME
		}
	}
})

export default useStore
