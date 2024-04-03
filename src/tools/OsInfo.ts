import IpcRenderer from "../WMIOperation/IPCRenderer";
import {GetCpuTemperature, GetMemory, GetBattery, GetGraphics} from '../../electron/Models/OSInfoModels'

export async function GetCpuTemperature(): Promise<GetCpuTemperature> {
    return IpcRenderer.CustomParameters("custom-event-run-Function","GetCpuTemperature")
}
export async function GetMemory(): Promise<GetMemory> {
    return IpcRenderer.CustomParameters("custom-event-run-Function","GetMemory")
}
export async function GetBattery(): Promise<GetBattery> {
    return IpcRenderer.CustomParameters("custom-event-run-Function","GetBattery")
}
export async function GetGraphics(): Promise<GetGraphics> {
    return IpcRenderer.CustomParameters("custom-event-run-Function","GetGraphics")
}