import {exec} from 'child_process'
import {ipcMain} from 'electron';
import {
    ClientSendIPCExecCmdData,
    eumPerformaceMode,
    ResultState,
    ServerSendIPCExecCmdData
} from "../Models/IPCModels.ts";

class WMIOperation {
    private isInit = false;
    private JiaoLongWMIFilePath: string = "";
    constructor() {
        ipcMain.on('custom-event-execCmd',async (event, args:ClientSendIPCExecCmdData)=>{
            const {stderr,stdout} = await this.execCMD(args.execCmd)
            const callback:ServerSendIPCExecCmdData={callback: false, msg: {stderr, stdout}, timeCounter: 0}
            event.sender.send('custom-event-execCmd-callback', callback);
        })
    }
    public init(assemblyFilePathJiaoLongWMI: string) {
        this.isInit = true;
        this.JiaoLongWMIFilePath = assemblyFilePathJiaoLongWMI;
    }
    public execCMD(CMD: string): Promise<string | any> {
        return new Promise((resolve, reject) => {
            if (!this.isInit) return reject("False")
            exec(`"${this.JiaoLongWMIFilePath}" ${CMD}`, {encoding: "utf8"}, (error, stdout, stderr) => {
                if (error) reject(error)
                resolve({
                    stdout,
                    stderr
                })
            })
        })
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
    public async SwitchMaxFanSpeed(State:ResultState) {
        return await this.execCMD(`SwitchMaxFanSpeed-${State}`)
    }
    public async SetFanSpeed(State:number) {
        return await this.execCMD(`SetFanSpeed-${State}`)
    }
}
const wMIOperation = new WMIOperation()
export default wMIOperation

