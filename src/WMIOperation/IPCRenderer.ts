import {
    ClientSendIPCExecCmdData, IpcBackInfo, IpcBackInfoDeCode,
    ServerSendIPCExecCmdData
} from "../../electron/Models/IPCModels.ts";

class IPCRenderer {
    constructor() {
        window.ipcRenderer.on('custom-event-NodeJS-Debug', (_event, args: string) => {
            console.log(args)
        })
    }

    public async sendIPC(CMD: string) {
        const SendData: ClientSendIPCExecCmdData = {
            execCmd: CMD, timeCounter: Date.now()
        }
        const BackInfo: IpcBackInfo = {
            successful: false,
            deCode: [],
            outMsg: []
        }
        const callback = await window.ipcRenderer.invoke("custom-event-execCmd", SendData) as ServerSendIPCExecCmdData
        if (callback.msg) {
            const BackMsgs = callback.msg.stdout.replace(/\r/g, '').split("\n")
            BackMsgs.pop()
            if (BackMsgs[IpcBackInfoDeCode.message] == "Active code page: 65001") {
                BackInfo.successful = true
                BackInfo.outMsg.push(BackMsgs[0])
                BackMsgs[IpcBackInfoDeCode.data].split("-").forEach(x => {
                    BackInfo.deCode.push(Number(x))
                })
                if (!isNaN(BackInfo.deCode[0])) {
                    return BackInfo
                }else {
                    return callback
                }
            } else {
                BackInfo.outMsg = BackMsgs
                return BackInfo
            }
        }

    };

    public CustomParameters(hande: string, data: string) {
        return window.ipcRenderer.invoke(hande, data)
    }

}

const IpcRenderer = new IPCRenderer()


export default IpcRenderer