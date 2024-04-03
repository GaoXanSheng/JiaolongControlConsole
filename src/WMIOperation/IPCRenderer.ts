import {
    ClientSendIPCExecCmdData,
    ServerSendIPCExecCmdData
} from "../../electron/Models/IPCModels.ts";

class IPCRenderer {
    constructor() {
        window.ipcRenderer.on('custom-event-NodeJS-Debug', (_event, args: string) => {
            console.log(args)
        })
    }

    public sendIPC(CMD: string): Promise<ServerSendIPCExecCmdData> {
        const SendData: ClientSendIPCExecCmdData = {
            execCmd: CMD, timeCounter: Date.now()
        }
          return window.ipcRenderer.invoke("custom-event-execCmd", SendData)
    };
    public CustomParameters(hande: string,data:string){
        return window.ipcRenderer.invoke(hande,data)
    }

}

const IpcRenderer = new IPCRenderer()


export default IpcRenderer