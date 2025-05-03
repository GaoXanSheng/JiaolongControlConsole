import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import { HardwareMonitorInfo } from '@renderer/store/interfaces'

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
		async GetCustomMode() {
			const res = await http({
				type: 'CPU',
				method: 'GetCustomMode',
				args: []
			})
			return res == 'True'
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
		async Get() {
			const res = await http({
				type: 'LogoLight',
				method: 'Get',
				args: []
			})
			if (res == 'ON') {
				return ResultState.ON
			} else if (res == 'OFF') {
				return ResultState.OFF
			} else {
				return ResultState.Unknow
			}
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
		async Get() {
			const res = await http({
				type: 'GPUMode',
				method: 'Get',
				args: []
			})
			if (res == 'DiscreteMode') {
				return GPUMode.DiscreteMode
			} else if (res == 'HybridMode') {
				return GPUMode.HybridMode
			} else {
				return GPUMode.Unknow
			}
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
		async GetMaxFanSpeedSwitch() {
			return http({
				type: 'Fan',
				method: 'GetMaxFanSpeedSwitch',
				args: []
			})
		},
		async SetMaxFanSpeedSwitch(b: boolean) {
			let state = 0
			if (b) {
				state = 1
			}
			return http({
				type: 'Fan',
				method: 'SetMaxFanSpeedSwitch',
				args: [state]
			})
		},
		async SetFanSpeed(FanSpeed: number) {
			const speed = FanSpeed.toString().slice(0, 2)
			if (parseInt(speed) <= 58) {
				return http({
					type: 'Fan',
					method: 'SetFanSpeed',
					args: [parseInt(speed)]
				})
			} else {
				return '风扇转速超出范围'
			}
		},
		async GetFanSpeed() {
			const { CPUFanSpeed, GPUFanSpeed } = await http({
				type: 'Fan',
				method: 'GetFanSpeed',
				args: []
			})
			return {
				CPUFanSpeed,
				GPUFanSpeed
			}
		}
	},
	async GetHardwareMonitorInfo(): Promise<HardwareMonitorInfo> {
		return await http({
			type: 'GetHardwareMonitorInfo',
			method: 'GetHardwareMonitorInfo',
			args: [1]
		})
	}
}

export default WMIOperation
