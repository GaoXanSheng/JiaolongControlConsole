import { is } from '@electron-toolkit/utils'
import SystemInfo from '../tools/SystemInfo'

class Config {
	private store
	/**
	 * defaultConfigurationFile
	 * @constructor
	 * @private
	 */
	private ConfigInit(): void {
		if (!this.has('Version') || (is.dev && process.env['ELECTRON_RENDERER_URL'])) {
			this.set('Window', {
				minimize: false
			})
			this.set('PowerBoot', {
				openAtLogin: false,
				openAsHidden: false,
				enabled: false
			})
			this.set('Version', '8.1')
			this.set('Setting', {
				CPU: {
					longPower: 45,
					tempWall: 99,
					shortPower: 65
				},
				FanSpeed: 3500
			})
			this.set('KeyBoard', {
				red: 0,
				blue: 0,
				green: 0,
				LightBrightness: 0
			})
		}
		SystemInfo().then((info) => {
			this.set('SystemInfo', info)
		})
	}

	constructor() {
		import('electron-store').then(({ default: Store }) => {
			this.store = new Store({
				name: 'JiaolongControlConsoleConfig'
			})
			this.ConfigInit()
		})
	}

	public get<T>(key: string): T {
		return this.store.get(key)
	}

	public set<T>(key: string, value: T): void {
		return this.store.set(key, value)
	}

	public delete(key: string): void {
		return this.store.delete(key)
	}

	public clear(): void {
		return this.store.clear()
	}

	public has(key: string): boolean {
		return this.store.has(key)
	}
}

export const config = new Config()
