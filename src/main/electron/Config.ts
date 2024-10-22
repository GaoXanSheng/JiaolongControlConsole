import SystemInfo from '../tools/SystemInfo'

const InitializeConfiguration = {
	Version: '8.1',
	Window: {
		minimize: false
	},
	PowerBoot: {
		openAtLogin: false,
		openAsHidden: false,
		enabled: false
	},
	Setting: {
		CPU: {
			longPower: 45,
			tempWall: 99,
			shortPower: 65
		},
		FanSpeed: 3500
	},
	KeyBoard: {
		red: 0,
		blue: 0,
		green: 0,
		LightBrightness: 0
	}
}

class Config {
	private store
	/**
	 * defaultConfigurationFile
	 * @constructor
	 * @private
	 */
	private ConfigInit(): void {
		if (!this.has('global.Version')) {
			this.set('global', InitializeConfiguration)
		}
		SystemInfo().then((info) => {
			this.set('global.SystemInfo', info)
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
