import {exec} from 'child_process'
import {ipcMain} from 'electron';
import {ClientSendIPCExecCmdData, ServerSendIPCExecCmdData} from "../Models/IPCModels.ts";

class WMIOperation {
    private isInit = false;
    private JiaoLongWMIFilePath: string = "";

    constructor() {
        ipcMain.handle('custom-event-execCmd', async (_event, args: ClientSendIPCExecCmdData) => {
            const {stderr, stdout} = await this.execCMD(args.execCmd)
            const callback: ServerSendIPCExecCmdData = {
                execCmd: args.execCmd,
                serverTimeCounter: Date.now(),
                callback: true,
                msg: {stderr, stdout},
                timeCounter: args.timeCounter
            }
            return callback
        })
    }

    public init(assemblyFilePathJiaoLongWMI: string) {
        this.isInit = true;
        this.JiaoLongWMIFilePath = assemblyFilePathJiaoLongWMI;
    }

    public execCMD(CMD: string): Promise<string | any> {
        return new Promise((resolve, reject) => {
            if (!this.isInit) return reject("False")
            console.log(CMD)
            exec(`chcp 65001 && "${this.JiaoLongWMIFilePath}" ${CMD}`, {encoding: "utf8"}, (error, stdout, stderr) => {
                if (error) reject(error)
                resolve({
                    stdout,
                    stderr
                })
            })
        })
    }
}

const wMIOperation = new WMIOperation()
export default wMIOperation

