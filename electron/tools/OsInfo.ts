import {GetBattery, GetCpuTemperature} from "../Models/OSInfoModels.ts";
import {ipcMain} from "electron";
import * as si from 'systeminformation'


class OsInfo {
    constructor() {
        ipcMain.handle('custom-event-run-Function', async (_event, args:string) => {
            return this[args]()
        })
    }
    init(){
        return "init"
    }
    async GetCpuTemperature():Promise<GetCpuTemperature> {
        return si.cpuTemperature()
    }
    async GetMemory(){
        return {
            MemoryInfo:await si.mem(),
            MemoryLayout:await si.memLayout()
        }
    }
    async GetCpuInfo(){
        return si.cpu()
    }
    async GetBattery():Promise<GetBattery>{
        return si.battery()
    }
    async GetGraphics(){
        const graphics =  await si.graphics()
        for (const graphicsKey of graphics.controllers) {
            if (graphicsKey.vendor=="NVIDIA"){
                return graphicsKey
            }
        }
    }
}

const osInfo = new OsInfo()


export default osInfo