import {ipcMain} from 'electron';
const edge = require("electron-edge-js");
interface ResultState {
    ON:1,
    OFF:0
}
enum eumPerformaceMode
{
    BalanceMode,
    PerformanceMode,
    QuietMode,
    Unknow = 255
}
class WMIOperation {
    private isInit = false;
    private JiaoLongWMIFilePath: string = "";
    private dotnetFunction:any;
    constructor() {
        ipcMain.on('custom-event-execCmd',async (event, args)=>{
            event.sender.send('custom-event-execCmd-callback',  await this.execCMD(args));
        })
    }

    private execDLL (parameter:any) {
        this.dotnetFunction  = edge.func(this.JiaoLongWMIFilePath);
        if (this.dotnetFunction !== null) {
            return this.dotnetFunction(parameter, true)
        } else {
            return 'dotnetFunction is null'
        }
    }

    public init(assemblyFilePathJiaoLongWMI: string) {
        this.isInit = true;
        this.JiaoLongWMIFilePath = assemblyFilePathJiaoLongWMI;
    }
    public async SetCpuLongPower(input:number) {
        return await this.execCMD(`SetCpuLongPower-${input}`)
    }
    public async SetCpuShortPower(input:number) {
        return await this.execCMD(`SetCpuShortPower-${input}`)
    }
    public async SetCPUTempWall(input:number) {
        return await this.execCMD(`SetCPUTempWall-${input}`)
    }
    public async SetRGBKeyboardColor(r:number,g:number,b:number) {
        return await this.execCMD(`SetRGBKeyboardColor-${r}-${g}-${b}`)
    }
    public async SetLogoLight(State:ResultState) {
        return await this.execCMD(`SetLogoLight-${State}`)
    }
    public async SetGpuMode(State:ResultState) {
        return await this.execCMD(`SetGpuMode-${State}`)
    }
    public async SetPerformaceMode(State:eumPerformaceMode) {
        return await this.execCMD(`SetPerformaceMode-${State}`)
    }
    public async SetkeyboardLightBrightness(State:number) {
        return await this.execCMD(`SetkeyboardLightBrightness-${State}`)
    }
    public async isAdmin() {
        return await this.execCMD(`isAdmin`)
    }
    private execCMD(CMD: string): Promise<string | any> {
        return new Promise((resolve, reject) => {
            resolve(this.execDLL(CMD))
            if (!this.isInit) return reject("False")
        })
    }
}

export const wMIOperation = new WMIOperation()