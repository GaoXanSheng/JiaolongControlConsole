import {
    ClientSendIPCExecCmdData,
    custom_event_execCmd,
    eumPerformaceMode,
    ResultState,
    ServerSendIPCExecCmdData
} from "../electron/Models/IPCModels.ts";

export class IPCRenderer {
    private tempArgs: ServerSendIPCExecCmdData[] = [];

    constructor() {
        window.ipcRenderer.on('custom-event-NodeJS-Debug', (_event, args: string) => {
            console.log(args)
        })
        window.ipcRenderer.on('custom-event-execCmd-callback', (_event, args) => {
            this.tempArgs.push(args)
        })
    }

    private sendIPC(CMD: string): Promise<custom_event_execCmd> {
        const SendData: ClientSendIPCExecCmdData = {
            execCmd: CMD, timeCounter: Date.now()
        }
        window.ipcRenderer.send("custom-event-execCmd", SendData)
        return new Promise((resolve) => {
            setTimeout(() => {
                const temp = []
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
            }, 50)
        })
    }

    public SetCpuLongPower(input: number) {
        return this.sendIPC(`SetCpuLongPower-${input}`)
    }

    public SetCpuShortPower(input: number) {
        return this.sendIPC(`SetCpuShortPower-${input}`)
    }

    public SetCPUTempWall(input: number) {
        return this.sendIPC(`SetCPUTempWall-${input}`)
    }

    /**
     * 在cli中已经做好防呆
     * @param r 小于255
     * @param g 小于255
     * @param b 小于255
     * @constructor
     */
    public SetRGBKeyboardColor(r: number, g: number, b: number) {
        return this.sendIPC(`SetRGBKeyboardColor-${r}-${g}-${b}`)


    }

    public SetLogoLight(State: ResultState) {
        return this.sendIPC(`SetLogoLight-${State}`)

    }

    public SetGpuMode(State: ResultState) {
        return this.sendIPC(`SetGpuMode-${State}`)

    }

    public SetPerformaceMode(State: eumPerformaceMode) {
        return this.sendIPC(`SetPerformaceMode-${State}`)

    }

    public SetkeyboardLightBrightness(State: number) {
        return this.sendIPC(`SetkeyboardLightBrightness-${State}`)

    }

    public SwitchMaxFanSpeed(State: ResultState) {
        return this.sendIPC(`SwitchMaxFanSpeed-${State}`)
    }

    public SetFanSpeed(State: number) {
        return this.sendIPC(`SetFanSpeed-${State}`)
    }

    public testFalse() {
        return this.sendIPC(``)
    }


}

const IpcRenderer = new IPCRenderer()


export default IpcRenderer