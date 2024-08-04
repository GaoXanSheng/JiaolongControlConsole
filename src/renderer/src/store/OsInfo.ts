import wmiOperation from '../tools/WMIOperation/WMIOperation'

export default async function() {
  const { gpuTemp, cpuTemp, gpuUsage, gpuFreq } = await wmiOperation.System.GetInfo()
  const { CPUFanSpeed, GPUFanSpeed } = await wmiOperation.Fan.GetFanSpeed()
  return {
    KeyboardMode: await wmiOperation.Keyboard.GetKeyboardMode(),
    AcType: await wmiOperation.System.GetACType(),
    PerformaceMode: await wmiOperation.PerformaceMode.GetPerformaceMode(),
    LogoLight: await wmiOperation.GetLogoLight(),
    Customize: await wmiOperation.Cpu.GetCPUPower(),
    SwitchMaxFanSpeed: await wmiOperation.Fan.GetSwitchMaxFanSpeed(),
    CPU: {
      temperature: cpuTemp,
      CPUFanSpeed,
      tempWall: await wmiOperation.Cpu.GetCPUTempWall()
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
