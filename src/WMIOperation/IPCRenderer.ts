import {
    ClientSendIPCExecCmdData, ServerSendIPCExecCmdData
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
        return await window.ipcRenderer.invoke("custom-event-execCmd", SendData) as ServerSendIPCExecCmdData
    };

    public CustomParameters(hande: string, data: string) {
        return window.ipcRenderer.invoke(hande, data)
    }

}

const IpcRenderer = new IPCRenderer()


export default IpcRenderer