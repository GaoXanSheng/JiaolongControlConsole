import IpcRenderer from "./IPCRenderer";
import {
    CPUBuild,
    enumBuildType,
    FanBuild,
    GPUBuild,
    KeyboardBuild,
    LogoLightBuild, PerformaceModeBuild, SystemBuild
} from "../../electron/Models/CmdBuild"
import {eumPerformaceMode, ResultState} from "../../electron/Models/IPCModels.ts";

class WMIOperation {
    public Cpu = {
        SetCpuShortPower: async (value: number) => {
            return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${CPUBuild.SetCpuShortPower}-${value.toFixed(0)}`)
        },
        SetCpuLongPower: async (value: number) => {
            return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${CPUBuild.SetCpuLongPower}-${value.toFixed(0)}`)
        },
        SetCPUTempWall: async (value: number) => {
            return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${CPUBuild.SetCPUTempWall}-${value.toFixed(0)}`)
        },
        GetCPUTempWall: async (value: number = 1) => {
            return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${CPUBuild.GetCPUTempWall}-${value}`)
        },
        GetCPUThermometer: async (value: number = 1) => {
            return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${CPUBuild.GetCPUThermometer}-${value}`)
        }
    }
    public Gpu = {
        SetGpuMode: async (value: ResultState) => {
            return IpcRenderer.sendIPC(`${enumBuildType.GPU}-${GPUBuild.SetGpuMode}-${value}`)
        },
        GetGpuMode: async () => {
            return IpcRenderer.sendIPC(`${enumBuildType.GPU}-${GPUBuild.GetGpuMode}-${1}`)
        }
    }
    public Fan = {
        SwitchMaxFanSpeed: async (value: ResultState) => {
            return IpcRenderer.sendIPC(`${enumBuildType.Fan}-${FanBuild.SwitchMaxFanSpeed}-${value}`)
        },
        SetFanSpeed: async (value: number) => {
            return IpcRenderer.sendIPC(`${enumBuildType.Fan}-${FanBuild.SetFanSpeed}-${value}`)
        },
        GetFanSpeed: async (value: number = 1) => {
            return IpcRenderer.sendIPC(`${enumBuildType.Fan}-${FanBuild.GetFanSpeed}-${value}`)
        },
        GetFanInfo: async (value: number = 1) => {
            return IpcRenderer.sendIPC(`${enumBuildType.Fan}-${FanBuild.GetFanInfo}-${value}`)
        }
    }
    public Keyboard = {
        GetRGBKeyboardColor: async () => {
            return (await IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${KeyboardBuild.GetRGBKeyboardColor}-${1}`)).split("-")
        },
        GetkeyboardLightBrightness: async () => {
            return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${KeyboardBuild.GetkeyboardLightBrightness}-${1}`)
        },
        GetKeyboardMode: async () => {
            return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${KeyboardBuild.GetKeyboardMode}-${1}`)
        },
        SetkeyboardLightBrightness: async (value: number) => {
            if (value == 0 || value > 3) return "false"
            return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${KeyboardBuild.SetkeyboardLightBrightness}-${value}`)
        },
        SetRGBKeyboardColor: async (r: number, g: number, b: number) => {
            if (r > 255 || g > 255 || b > 255) return "false"
            return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${KeyboardBuild.SetRGBKeyboardColor}-${r}-${g}-${b}`)
        }
    }
    public PerformaceMode = {
        SetPerformaceMode: async (value: eumPerformaceMode) => {
            return IpcRenderer.sendIPC(`${enumBuildType.PerformaceMode}-${PerformaceModeBuild.SetPerformaceMode}-${value}`)
        }
    }
    public System = {
        OpenCustomMode: async (value: ResultState) => {
            return IpcRenderer.sendIPC(`${enumBuildType.System}-${SystemBuild.OpenCustomMode}-${value}`)
        },
        GetACType: async () => {
            return IpcRenderer.sendIPC(`${enumBuildType.System}-${SystemBuild.GetACType}-${1}`)
        },
        // 缝缝补补
        GetInfo: async () => {
            const backData = (await IpcRenderer.sendIPC(`${enumBuildType.System}-${SystemBuild.GetInfo}-${1}`)).split("-")
            return {
                gpuUsage: backData[0],
                gpuTemp: backData[1],
                gpuFreq: backData[2],
                rate: backData[3],
                speed: backData[4],
                cpuTemp: backData[5]
            }
        }
    }

    async SetLogoLight(value: ResultState) {
        return IpcRenderer.sendIPC(`${enumBuildType.LogoLight}-${LogoLightBuild.SetLogoLight}-${value}`)
    }
}

const wmiOperation = new WMIOperation();
export default wmiOperation