import {exec} from 'child_process'
import {ipcMain} from 'electron';
import {ClientSendIPCExecCmdData, IpcBackInfoDeCode, ServerSendIPCExecCmdData} from "../Models/IPCModels.ts";

class WMIOperation {
    private isInit = false;
    private JiaoLongWMIFilePath: string = "";

    constructor() {
        ipcMain.handle('custom-event-execCmd', async (_event, args: ClientSendIPCExecCmdData) => {
            const {stdout, successful} = await this.execCMD(args.execCmd)
            const callback: ServerSendIPCExecCmdData = {
                execCmd: args.execCmd,
                serverTimeCounter: Date.now(),
                callback: true,
                data: {
                    successful,
                    deCode: [],
                    outMsg: []
                },
                timeCounter: args.timeCounter
            }

            stdout.replace(/\r/g, '').split("\n").forEach(x => {
                if (x.length > 0) {
                    callback.data.outMsg.push(x)
                }
            })

            if (callback.data.outMsg.length > 2) {
                callback.data.outMsg[IpcBackInfoDeCode.data].split("-").forEach(x => {
                    if (!isNaN(Number(x))) {
                        callback.data.deCode.push(Number(x))
                    }
                })
            }

            return callback
        })
    }

    public init(assemblyFilePathJiaoLongWMI: string) {
        this.isInit = true;
        this.JiaoLongWMIFilePath = assemblyFilePathJiaoLongWMI;
    }

    public execCMD(CMD: string): Promise<{
        successful: boolean,
        stdout: string,
        stderr: string
    }> {
        return new Promise((resolve, reject) => {
            if (!this.isInit) return reject("False")
            console.log(CMD)
            exec(`chcp 65001 && "${this.JiaoLongWMIFilePath}" ${CMD}`, {encoding: "utf8"}, (error, stdout, stderr) => {
                if (error) resolve({
                    successful: false,
                    stdout: "",
                    stderr: error.message
                })
                resolve({
                    successful: true,
                    stdout,
                    stderr
                })
            })
        })
    }
}

const wMIOperation = new WMIOperation()
export default wMIOperation

