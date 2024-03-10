import {
    ClientSendIPCExecCmdData,
    ServerSendIPCExecCmdData
} from "../../electron/Models/IPCModels.ts";

class IPCRenderer {
    private tempArgs: ServerSendIPCExecCmdData[] = [];
    private delayTime: number = 100;

    constructor() {
        window.ipcRenderer.on('custom-event-NodeJS-Debug', (_event, args: string) => {
            console.log(args)
        })
        window.ipcRenderer.on('custom-event-execCmd-callback', (_event, args) => {
            this.tempArgs.push(args)
        })
    }

    public sendIPC(CMD: string): Promise<ServerSendIPCExecCmdData> {
        const SendData: ClientSendIPCExecCmdData = {
            execCmd: CMD, timeCounter: Date.now()
        }
        window.ipcRenderer.send("custom-event-execCmd", SendData)
        return new Promise((resolve) => {
            const temp: ServerSendIPCExecCmdData[] = []
            setTimeout(() => {
                for (let i of this.tempArgs) {
                    if (i.timeCounter == SendData.timeCounter && i.callback) {
                        this.delayTime = (i.serverTimeCounter - SendData.timeCounter) + 100
                        resolve(
                            i
                        )
                        break
                    } else {
                        temp.push(i)
                    }
                }
                this.tempArgs = temp
            }, this.delayTime)

        })
    }

}

const IpcRenderer = new IPCRenderer()


export default IpcRenderer