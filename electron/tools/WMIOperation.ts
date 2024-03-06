import {exec} from 'child_process'
import {ipcMain} from 'electron';

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
    constructor() {
        ipcMain.on('custom-event-execCmd',async (event, args)=>{
            event.sender.send('custom-event-execCmd-callback',  await this.execCMD(args));
        })
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
    public execCMD(CMD: string): Promise<string | any> {
        return new Promise((resolve, reject) => {
            if (!this.isInit) return reject("False")
            exec(`"${this.JiaoLongWMIFilePath}" ${CMD}`, {encoding: "utf8"}, (error, stdout, stderr) => {
                if (error) reject(error)
                resolve(stdout)
            })
        })
    }
}

export const wMIOperation = new WMIOperation()

