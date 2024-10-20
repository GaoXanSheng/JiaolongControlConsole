import wmiOperation from '../tools/WMIOperation'

export default async function () {
	const { gpuTemp, cpuTemp, gpuUsage, gpuFreq } = await wmiOperation.System.GetInfo()
	const { CPUFanSpeed, GPUFanSpeed } = await wmiOperation.Fan.GetFanSpeed()
	return {
		KeyboardMode: await wmiOperation.Keyboard.GetKeyboardMode(),
		AcType: await wmiOperation.System.GetACType(),
		PerformaceMode: await wmiOperation.PerformaceMode.GetPerformaceMode(),
		SwitchMaxFanSpeed: await wmiOperation.Fan.GetSwitchMaxFanSpeed(),
		CPU: {
			temperature: cpuTemp,
			CPUFanSpeed
		},
		GPU: {
			temperature: gpuTemp,
			GPUFanSpeed: GPUFanSpeed,
			GpuUsage: gpuUsage,
			GpuFreq: gpuFreq,
			GpuMode: await wmiOperation.Gpu.GetGpuMode()
		}
	}
}
