import { defineStore } from 'pinia'
import OsInfo from './OsInfo'
import { HomeTab } from '../doc/HomeTab'
import wmiOperation from '../tools/WMIOperation'

const useStore = defineStore('store', {
	state: () => {
		return {
			Debug: false,
			SwitchPages: HomeTab.HOME,
			OS: {
				LogoLight: 0,
				KeyboardMode: '',
				AcType: '',
				CPU: {
					CPUFanSpeed: 0,
					temperature: 0
				},
				GPU: {
					GPUFanSpeed: 0,
					temperature: 0,
					GpuUsage: 0,
					GpuFreq: 0,
					GpuMode: 0
				},
				PerformaceMode: '',
				SwitchMaxFanSpeed: 0
			}
		}
	}
})

setTimeout(async () => {
	const store = useStore()
	const { KeyboardMode, AcType, PerformaceMode, SwitchMaxFanSpeed, CPU, GPU } = await OsInfo()
	store.OS.KeyboardMode = KeyboardMode
	store.OS.AcType = AcType
	store.OS.PerformaceMode = PerformaceMode
	store.OS.SwitchMaxFanSpeed = SwitchMaxFanSpeed
	store.OS.CPU = CPU
	store.OS.GPU = GPU
}, 0)
setInterval(async () => {
	const store = useStore()
	const { gpuTemp, cpuTemp, gpuUsage, gpuFreq } = await wmiOperation.System.GetInfo()
	const { CPUFanSpeed, GPUFanSpeed } = await wmiOperation.Fan.GetFanSpeed()
	store.OS.PerformaceMode = await wmiOperation.PerformaceMode.GetPerformaceMode()
	store.OS.SwitchMaxFanSpeed = await wmiOperation.Fan.GetSwitchMaxFanSpeed()
	store.OS.CPU.CPUFanSpeed = CPUFanSpeed
	store.OS.CPU.temperature = cpuTemp
	store.OS.GPU.GPUFanSpeed = GPUFanSpeed
	store.OS.GPU.temperature = gpuTemp
	store.OS.GPU.GpuUsage = gpuUsage
	store.OS.GPU.GpuFreq = gpuFreq
}, 5000)
export default useStore
