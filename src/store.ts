import {createStore} from 'vuex';
import wmiOperation from "./WMIOperation/WMIOperation.ts";
import {eumCPUPower, eumGPUMode, eumPerformaceMode, ResultState} from "./WMIOperation/Models/IPCModels.ts";

export enum HomeTab {
    HOME,
    CPU,
    EventLoop,
    Information,
    Fan,
    Keyboard,
    Settings,
    Debug = 255
}

const storeModels = {
    state: {
        Debug: false,
        SwitchPages: HomeTab.HOME,
        CpuPage: {
            longPower: 45,
            tempWall: 80,
            shortPower: 45,
        },
        FanPage: {
            isTrue: false,
            SetFanSpeed: 3500,
        },
        OS: {
            KeyboardMode:"",
            AcType:"",
            PerformaceMode: eumPerformaceMode.Unknow,
            LogoLight: ResultState.OFF,
            Customize: eumCPUPower.Unknow,
            SwitchMaxFanSpeed: ResultState.OFF,
            CPU: {
                temperature: 0,
                CPUFanSpeed: 0,
                tempWall: 0
            },
            GPU: {
                temperature: 0,
                GPUFanSpeed: 0,
                GpuUsage: 0,
                GpuFreq: 0,
                GpuMode: eumGPUMode.Unknow
            }
        },
        EventLoopPage: {
            isRun: false,
            eventLoop: null,
            STC: [
                [35, 100], [45, 90], [55, 80], [65, 70], [75, 50], [85, 40], [95, 30], [100, 20], [110, 10], [120, 0]
            ],
            // Temperature long-term power consumption scheduling
            LTC: [
                [35, 100], [45, 90], [55, 80], [65, 70], [75, 50], [85, 40], [95, 30], [100, 20], [110, 10], [120, 0]
            ],
            // Temperature and speed
            TFS: [
                [3500, 60], [3600, 65], [3700, 70], [3800, 75], [4000, 80], [4500, 90], [4800, 95], [5000, 98], [5500, 99], [5800, 100]
            ]
        },
        ProbeData: {}
    },
}

const store = createStore(storeModels);
async function initStore() {
    store.state.OS.LogoLight = await wmiOperation.GetLogoLight()
    store.state.OS.KeyboardMode = await wmiOperation.Keyboard.GetKeyboardMode()
    store.state.OS.GPU.GpuMode = await wmiOperation.Gpu.GetGpuMode()
    store.state.OS.AcType = await wmiOperation.System.GetACType()
    if (localStorage.getItem("ProbeData")!=null){
        store.state.ProbeData = JSON.parse(localStorage.getItem("ProbeData") as string)
    }
    window.ipcRenderer.invoke("custom-event-ProbeData", "").then(e=>{
        store.state.ProbeData = e
        localStorage.setItem("ProbeData",JSON.stringify(e))
    })
    window["Debug"] = function () {
        store.state.Debug = true
    }
}
setInterval(async () => {
    const {gpuTemp, cpuTemp, gpuUsage, gpuFreq} = await wmiOperation.System.GetInfo()
    const {CPUFanSpeed, GPUFanSpeed} = await wmiOperation.Fan.GetFanSpeed()
    store.state.OS.PerformaceMode = await wmiOperation.PerformaceMode.GetPerformaceMode()
    store.state.OS.Customize = await wmiOperation.Cpu.GetCPUPower();
    store.state.OS.SwitchMaxFanSpeed = await wmiOperation.Fan.GetSwitchMaxFanSpeed()

    store.state.OS.CPU.CPUFanSpeed = CPUFanSpeed
    store.state.OS.CPU.temperature = cpuTemp
    store.state.OS.CPU.tempWall = await wmiOperation.Cpu.GetCPUTempWall()

    store.state.OS.GPU.GPUFanSpeed = GPUFanSpeed
    store.state.OS.GPU.temperature = gpuTemp
    store.state.OS.GPU.GpuUsage = gpuUsage
    store.state.OS.GPU.GpuFreq = gpuFreq

}, 5000)

initStore()
export default store;
