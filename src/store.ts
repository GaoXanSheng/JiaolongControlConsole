import {createStore} from 'vuex';
import {GetCpuInfo, GetCpuTemperature, GetGraphics} from "./tools/OsInfo.ts";
import {
    GetCpuCurrentSpeedModels,
    GetCpuInfoModels,
    GetCpuTemperatureModels,
    GetGraphicsModels
} from "../electron/Models/OSInfoModels.ts";

export enum HomeTab {
    HOME,
    CPU,
    Keyboard,
    PerformaceMode,
    Fan
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
                Temperature: GetCpuTemperatureModels,
                Info:GetCpuInfoModels
            },
            GPU: GetGraphicsModels
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
            CPU: {},
            GPU: {}
        }
    },
}
const store = createStore(storeModels);
setInterval(async () => {
    store.state.OS.CPU.Info = await GetCpuInfo()
    store.state.OS.CPU.Temperature = await GetCpuTemperature()
    store.state.OS.GPU = await GetGraphics()
}, 5000)
export default store;
