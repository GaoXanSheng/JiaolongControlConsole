import {exec} from 'child_process'
import {ipcMain} from 'electron';
import {ClientSendIPCExecCmdData, ServerSendIPCExecCmdData} from "../Models/IPCModels.ts";

class WMIOperation {
    private isInit = false;
    private JiaoLongWMIFilePath: string = "";

    constructor() {
        ipcMain.on('custom-event-execCmd', async (event, args: ClientSendIPCExecCmdData) => {
            const {stderr, stdout} = await this.execCMD(args.execCmd)
            const callback: ServerSendIPCExecCmdData = {
                execCmd: args.execCmd,
                serverTimeCounter: Date.now(),
                callback: true,
                msg: {stderr, stdout},
                timeCounter: args.timeCounter
            }
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
            console.log(CMD)
            exec(`"${this.JiaoLongWMIFilePath}" ${CMD}`, {encoding: "utf8"}, (error, stdout, stderr) => {
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

