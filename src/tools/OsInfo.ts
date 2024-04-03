import IpcRenderer from "../WMIOperation/IPCRenderer";
import {
    GetBatteryModels,
    GetCpuInfoModels,
    GetCpuTemperatureModels,
    GetGraphicsModels,
    GetMemoryModels
} from "../../electron/Models/OSInfoModels.ts";

export async function GetCpuTemperature(): Promise<GetCpuTemperatureModels> {
    return IpcRenderer.CustomParameters("custom-event-run-Function","GetCpuTemperature")
}
export async function GetMemory(): Promise<GetMemoryModels> {
    return IpcRenderer.CustomParameters("custom-event-run-Function","GetMemory")
}
export async function GetCpuInfo(): Promise<GetCpuInfoModels> {
    return IpcRenderer.CustomParameters("custom-event-run-Function","GetCpuInfo")
}
export async function GetBattery(): Promise<GetBatteryModels> {
    return IpcRenderer.CustomParameters("custom-event-run-Function","GetBattery")
}
export async function GetGraphics(): Promise<GetGraphicsModels> {
    return IpcRenderer.CustomParameters("custom-event-run-Function","GetGraphics")
}