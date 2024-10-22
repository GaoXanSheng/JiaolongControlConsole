import {
	CPUBuild,
	enumBuildType,
	FanBuild,
	GPUBuild,
	KeyboardBuild,
	LogoLightBuild,
	PerformaceModeBuild,
	SystemBuild
} from '../doc/CmdBuild'
import { eumCPUPower, eumGPUMode, eumPerformaceMode, ResultState } from '../doc/IPCModels'

const http = {
	post: function (CMD: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const url = 'http://localhost:9871/'
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: CMD
			})
				.then((response) => response.text())
				.then((r) => {
					resolve(r)
				})
				.catch((e) => {
					reject(e)
				})
		})
	}
}

class WMIOperation {
	public Cpu = {
		SetCpuShortPower: async (value: number) => {
			return http.post(`${enumBuildType.CPU}-${CPUBuild.SetCpuShortPower}-${value.toFixed(0)}`)
		},
		SetCpuLongPower: async (value: number) => {
			return http.post(`${enumBuildType.CPU}-${CPUBuild.SetCpuLongPower}-${value.toFixed(0)}`)
		},
		SetCPUTempWall: async (value: number) => {
			return http.post(`${enumBuildType.CPU}-${CPUBuild.SetCPUTempWall}-${value.toFixed(0)}`)
		}
	}
	public Gpu = {
		SetGpuMode: async (value: eumGPUMode) => {
			return http.post(`${enumBuildType.GPU}-${GPUBuild.SetGpuMode}-${value}`)
		},
		GetGpuMode: async (): Promise<eumGPUMode> => {
			switch (await http.post(`${enumBuildType.GPU}-${GPUBuild.GetGpuMode}-1`)) {
				case 'HybridMode':
					return eumGPUMode.HybridMode
				case 'DiscreteMode':
					return eumGPUMode.DiscreteMode
				default:
					return eumGPUMode.Unknow
			}
		}
	}
	public Fan = {
		SwitchMaxFanSpeed: async (value: ResultState) => {
			return await http.post(`${enumBuildType.Fan}-${FanBuild.SwitchMaxFanSpeed}-${value}`)
		},
		GetSwitchMaxFanSpeed: async (): Promise<number> => {
			return Number(await http.post(`${enumBuildType.Fan}-${FanBuild.GetSwitchMaxFanSpeed}-1`))
		},
		SetFanSpeed: async (value: number): Promise<string> => {
			return await http.post(`${enumBuildType.Fan}-${FanBuild.SetFanSpeed}-${value}`)
		},
		GetFanSpeed: async () => {
			const backData = (await http.post(`${enumBuildType.Fan}-${FanBuild.GetFanSpeed}-1`)).split(
				'-'
			)
			return {
				CPUFanSpeed: Number(backData[1]),
				GPUFanSpeed: Number(backData[3])
			}
		}
	}
	public Keyboard = {
		GetRGBKeyboardColor: async () => {
			return (
				await http.post(`${enumBuildType.Keyboard}-${KeyboardBuild.GetRGBKeyboardColor}-1`)
			).split('-')
		},
		GetkeyboardLightBrightness: async () => {
			return (
				await http.post(`${enumBuildType.Keyboard}-${KeyboardBuild.GetkeyboardLightBrightness}-1`)
			).split('_')[1]
		},
		GetKeyboardMode: async () => {
			return http.post(`${enumBuildType.Keyboard}-${KeyboardBuild.GetKeyboardMode}-1`)
		},
		SetKeyboardMode: async () => {
			return http.post(`${enumBuildType.Keyboard}-${KeyboardBuild.SetKeyboardMode}-1`)
		},
		SetkeyboardLightBrightness: async (value: number) => {
			if (value == 0 || value > 3) return 'false'
			return http.post(
				`${enumBuildType.Keyboard}-${KeyboardBuild.SetkeyboardLightBrightness}-${value}`
			)
		},
		SetRGBKeyboardColor: async (r: number, g: number, b: number) => {
			if (r > 255 || g > 255 || b > 255) return 'false'
			return http.post(
				`${enumBuildType.Keyboard}-${KeyboardBuild.SetRGBKeyboardColor}-${r}-${g}-${b}`
			)
		}
	}
	public PerformaceMode = {
		SetPerformaceMode: async (value: eumPerformaceMode): Promise<eumPerformaceMode> => {
			switch (
				await http.post(
					`${enumBuildType.PerformaceMode}-${PerformaceModeBuild.SetPerformaceMode}-${value}`
				)
			) {
				case 'BalanceMode':
					return eumPerformaceMode.GamingMode
				case 'PerformanceMode':
					return eumPerformaceMode.RampageMode
				case 'QuietMode':
					return eumPerformaceMode.OfficeMode
				default:
					return eumPerformaceMode.Unknow
			}
		},
		GetPerformaceMode: async () => {
			return http.post(`${enumBuildType.PerformaceMode}-${PerformaceModeBuild.GetPerformaceMode}-1`)
		}
	}
	public System = {
		OpenCustomMode: async (value: eumCPUPower) => {
			return http.post(`${enumBuildType.System}-${SystemBuild.OpenCustomMode}-${value}`)
		},
		GetACType: async () => {
			return http.post(`${enumBuildType.System}-${SystemBuild.GetACType}-${1}`)
		},
		// 缝缝补补
		GetInfo: async (): Promise<{
			gpuUsage: number
			gpuTemp: number
			gpuFreq: number
			rate: number
			speed: number
			cpuTemp: number
		}> => {
			const backData = (
				await http.post(`${enumBuildType.System}-${SystemBuild.GetInfo}-${1}`)
			).split('-')
			return {
				gpuUsage: Number(backData[0]),
				gpuTemp: Number(backData[1]),
				gpuFreq: Number(backData[2]) * 1000,
				rate: Number(backData[3]),
				speed: Number(backData[4]),
				cpuTemp: Number(backData[5])
			}
		}
	}

	async GetLogoLight(): Promise<ResultState> {
		switch (await http.post(`${enumBuildType.LogoLight}-${LogoLightBuild.GetLogoLight}-1`)) {
			case 'ON':
				return ResultState.ON
			default:
				return ResultState.OFF
		}
	}

	async SetLogoLight(value: ResultState) {
		return http.post(`${enumBuildType.LogoLight}-${LogoLightBuild.SetLogoLight}-${value}`)
	}
}

const wmiOperation = new WMIOperation()
export { http }
export default wmiOperation
