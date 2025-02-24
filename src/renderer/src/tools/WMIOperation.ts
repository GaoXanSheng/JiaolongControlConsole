import axios from 'axios'
import { Message } from '@arco-design/web-vue'

export enum GPUMode {
	DiscreteMode,
	HybridMode,
	Unknow = 255
}

export enum ResultState {
	ON,
	OFF,
	Unknow = 255
}

export enum PerformaceMode {
	GamingMode,
	RampageMode,
	OfficeMode,
	Unknow = 255
}

async function http<T>(data: T) {
	const res = await axios.post('http://localhost:9871/', data)
	if (res.data.msg) {
		Message.error(res.data.msg)
	}
	return res.data.result
}

const WMIOperation = {
	CPU: {
		SetCpuShortPower(watte: number) {
			return http({
				type: 'CPU',
				method: 'SetCpuShortPower',
				args: [watte]
			})
		},
		SetCpuLongPower(watte: number) {
			return http({
				type: 'CPU',
				method: 'SetCpuLongPower',
				args: [watte]
			})
		},
		OpenCustomMode(Open: boolean) {
			return http({
				type: 'CPU',
				method: 'OpenCustomMode',
				args: [Open]
			})
		},
		SetCPUTempWall(centigrade: number) {
			return http({
				type: 'CPU',
				method: 'SetCPUTempWall',
				args: [centigrade]
			})
		}
	},
	Keyboard: {
		Color: {
			Set(Red: number, Green: number, Blue: number) {
				return http({
					type: 'Keyboard',
					method: 'ColorSet',
					args: [Red, Green, Blue]
				})
			},
			async Get() {
				const { red, green, blue } = await http({
					type: 'Keyboard',
					method: 'ColorGet',
					args: []
				})
				return {
					red,
					green,
					blue
				}
			}
		},
		Mode: {
			//Mode_RGBFixedMode
			Set() {
				return http({
					type: 'Keyboard',
					method: 'ModeSet',
					args: []
				})
			},
			Get() {
				return http({
					type: 'Keyboard',
					method: 'ModeGet',
					args: []
				})
			}
		},
		LightBrightness: {
			/**
			 * @param Brightness 0-4
			 * @constructor
			 */
			Set(Brightness: number) {
				return http({
					type: 'Keyboard',
					method: 'LightBrightnessSet',
					args: [Brightness]
				})
			},
			async Get() {
				const res = await http({
					type: 'Keyboard',
					method: 'LightBrightnessGet',
					args: []
				})
				switch (res) {
					case 'Level_0':
						return 0
					case 'Level_1':
						return 1
					case 'Level_2':
						return 2
					case 'Level_3':
						return 3
					default:
						return 255
				}
			}
		}
	},
	LogoLight: {
		/**
		 *
		 * @param On 0-1
		 * @constructor
		 */
		Set(On: ResultState) {
			return http({
				type: 'LogoLight',
				method: 'Set',
				args: [On]
			})
		},
		Get() {
			return http({
				type: 'LogoLight',
				method: 'Get',
				args: []
			})
		}
	},
	GPUMode: {
		Set(mode: GPUMode) {
			return http({
				type: 'GPUMode',
				method: 'Set',
				args: [mode]
			})
		},
		Get() {
			return http({
				type: 'GPUMode',
				method: 'Get',
				args: []
			})
		}
	},
	PerformaceMode: {
		Set(Mode: PerformaceMode) {
			return http({
				type: 'PerformaceMode',
				method: 'Set',
				args: [Mode]
			})
		},
		Get() {
			return http({
				type: 'PerformaceMode',
				method: 'Get',
				args: []
			})
		}
	},
	Fan: {
		async Get() {
			const { CPUFanSpeed, GPUFanSpeed } = await http({
				type: 'Fan',
				method: 'Get',
				args: []
			})
			return {
				CPUFanSpeed,
				GPUFanSpeed
			}
		}
	}
}

const wmiOperation = WMIOperation
export default wmiOperation
