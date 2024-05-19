import {createStore} from 'vuex';
import wmiOperation from "./WMIOperation/WMIOperation.ts";

export enum HomeTab {
    HOME,
    CPU,
    EventLoop,
    PerformaceMode,
    Fan,
    Keyboard
}

interface JiaoLongStore {
    state: {
        SwitchPages: HomeTab
        CpuPage: {
            longPower: number,
            tempWall: number,
            shortPower: number
        }
        FanPage: {
            isTrue: boolean,
            SetFanSpeed: number
        }
        OS: {
            CPU: {
                temperature:number
            },
            GPU: {
                temperature:number,
                gpuUsage:number,
                gpuFreq:number,

            }
        },
        EventLoopPage:{
            STC:number[][],
            LTC:number[][],
            TFS:number[][]
        }
    }
}

const storeModels: JiaoLongStore = {
    state: {
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
            CPU: {
                temperature:0,
            },
            GPU: {
                temperature:0,
                gpuUsage:0,
                gpuFreq:0,
            }
        },
        EventLoopPage:{
            STC: [
                [45, 100],[55, 80],[65, 70],[85, 60],[140, 55],
            ],
            // Temperature long-term power consumption scheduling
            LTC:[
                [45, 100],[55, 80],[65, 70],[85, 60],[140, 55],
            ],
            // Temperature and speed
            TFS:[
                [3500, 60],[3600, 70],[3800, 80 ],[4800, 90],[5800, 100]
            ]
        }
    },
}
const store = createStore(storeModels);
setInterval(async () => {
    const {gpuUsage,gpuTemp,gpuFreq,cpuTemp} = await wmiOperation.System.GetInfo()
    store.state.OS.CPU.temperature = cpuTemp
    store.state.OS.GPU.temperature = gpuTemp
    store.state.OS.GPU.gpuUsage = gpuUsage
    store.state.OS.GPU.gpuFreq = gpuFreq
}, 5000)
export default store;
