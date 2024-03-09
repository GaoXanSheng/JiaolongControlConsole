import {
    ClientSendIPCExecCmdData,
    custom_event_execCmd,
    ServerSendIPCExecCmdData
} from "../../electron/Models/IPCModels.ts";

class IPCRenderer {
    private tempArgs: ServerSendIPCExecCmdData[] = [];

    constructor() {
        window.ipcRenderer.on('custom-event-NodeJS-Debug', (_event, args: string) => {
            console.log(args)
        })
        window.ipcRenderer.on('custom-event-execCmd-callback', (_event, args) => {
            this.tempArgs.push(args)
        })
    }

    public sendIPC(CMD: string): Promise<custom_event_execCmd> {
        const SendData: ClientSendIPCExecCmdData = {
            execCmd: CMD, timeCounter: Date.now()
        }
        window.ipcRenderer.send("custom-event-execCmd", SendData)
        return new Promise((resolve) => {
            const temp:ServerSendIPCExecCmdData[] = []
            setTimeout(() => {
                for (let i of this.tempArgs) {
                    if (i.timeCounter == SendData.timeCounter && i.callback) {
                        resolve(
                            {timeCounter: SendData.timeCounter, callback: true, msg: i.msg}
                        )
                        break
                    } else {
                        temp.push(i)
                    }
                }
                this.tempArgs = temp
                resolve({timeCounter: SendData.timeCounter, callback: false})
            }, 30)

        })
    }

}

const IpcRenderer = new IPCRenderer()


export default IpcRenderer