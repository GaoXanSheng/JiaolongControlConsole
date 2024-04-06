import IpcRenderer from "./IPCRenderer";
import {
    CPUBuild,
    enumBuildType,
    FanBuild,
    GPUBuild,
    KeyboardBuild,
    LogoLightBuild, PerformaceModeBuild, SystemBuild
} from "../../electron/Models/CmdBuild"
import {eumPerformaceMode, IpcBackInfo, ResultState} from "../../electron/Models/IPCModels.ts";
class WMIOperation {
    public Cpu = {
        SetCpuShortPower:async (value:number)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${CPUBuild.SetCpuShortPower}-${value}`)
        },
        SetCpuLongPower:async (value:number)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${CPUBuild.SetCpuLongPower}-${value}`)
        },
        SetCPUTempWall:async (value:number)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${CPUBuild.SetCPUTempWall}-${value}`)
        },
        GetCPUTempWall:async (value:number=1)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${CPUBuild.GetCPUTempWall}-${value}`)
        },
        GetCPUThermometer:async (value:number=1)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${CPUBuild.GetCPUThermometer}-${value}`)
        }
    }
    public Gpu ={
        SetGpuMode:async (value:ResultState)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.GPU}-${GPUBuild.SetGpuMode}-${value}`)
        },
        GetGpuMode:async ()=>{
            return IpcRenderer.sendIPC(`${enumBuildType.GPU}-${GPUBuild.GetGpuMode}-${1}`)
        }
    }
    public Fan = {
        SwitchMaxFanSpeed:async (value:ResultState)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.Fan}-${FanBuild.SwitchMaxFanSpeed}-${value}`)
        },
        SetFanSpeed:async (value:number)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.Fan}-${FanBuild.SetFanSpeed}-${value}`)
        },
        GetFanSpeed:async (value:number=1)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.Fan}-${FanBuild.GetFanSpeed}-${value}`)
        },
        GetFanInfo:async (value:number=1)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.Fan}-${FanBuild.GetFanInfo}-${value}`)
        }
    }
    public Keyboard = {
        GetRGBKeyboardColor:async ()=>{
            return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${KeyboardBuild.GetRGBKeyboardColor}-${1}`)
        },
        GetkeyboardLightBrightness:async ()=>{
            return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${KeyboardBuild.GetkeyboardLightBrightness}-${1}`)
        },
        GetKeyboardMode:async ()=>{
            return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${KeyboardBuild.GetKeyboardMode}-${1}`)
        },
        SetkeyboardLightBrightness:async (value:number)=>{
            if (value>4) return;
            return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${KeyboardBuild.SetkeyboardLightBrightness}-${value}`)
        },
        SetRGBKeyboardColor:async (r:number,g:number,b:number)=>{
            if (r<255&&g<255&&b<255) {
                return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${KeyboardBuild.SetRGBKeyboardColor}-${r}-${g}-${b}`)
            }
            return false
        }
    }
    public PerformaceMode = {
        SetPerformaceMode:async (value:eumPerformaceMode)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.PerformaceMode}-${PerformaceModeBuild.SetPerformaceMode}-${value}`)
        }
    }
    public System = {
        OpenCustomMode:async (value: 1)=>{
            return IpcRenderer.sendIPC(`${enumBuildType.System}-${SystemBuild.OpenCustomMode}-${value}`)
        },
        GetACType:async ()=>{
            return IpcRenderer.sendIPC(`${enumBuildType.System}-${SystemBuild.GetACType}-${1}`)
        },
        GetInfo:async ()=>{
            const backData = await IpcRenderer.sendIPC(`${enumBuildType.System}-${SystemBuild.GetInfo}-${1}`) as IpcBackInfo
            if (backData && backData.successful) {
                return {
                    gpuUsage:backData.deCode[0],
                    gpuTemp:backData.deCode[1],
                    gpuFreq:backData.deCode[2],
                    rate:backData.deCode[3],
                    speed:backData.deCode[4],
                    cpuTemp:backData.deCode[5]
                }
            }
        }
    }
    async SetLogoLight(value:ResultState){
        return IpcRenderer.sendIPC(`${enumBuildType.LogoLight}-${LogoLightBuild.SetLogoLight}-${value}`)
    }
}

const wmiOperation = new WMIOperation();
export default wmiOperation