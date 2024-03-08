export interface ResultState {
    ON: 1,
    OFF: 0
}

export enum eumPerformaceMode {
    BalanceMode,
    PerformanceMode,
    QuietMode,
    Unknow = 255
}
interface custom_event_execCmd {
    callback:boolean,
    msg?: {
        stdout:string,
        stderr:string
    }
}
export class IPCRenderer {
    private tempArgs: {
        to: string, from: string
    }[] = [];

    constructor() {
        window.ipcRenderer.on('custom-event-NodeJS-Debug', (_event, args: string) => {
            console.log(args)
        })
        window.ipcRenderer.on('custom-event-execCmd-callback', (_event, args) => {
            this.tempArgs.push(JSON.parse(args))
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

    private sendIPC(CMD: string):Promise<custom_event_execCmd> {
        window.ipcRenderer.send("custom-event-execCmd", CMD)
        return new Promise((resolve) => {
            setTimeout(() => {
                const temp = []
                for (let i of this.tempArgs) {
                    if (i.to == CMD) {
                        resolve({callback: true, msg: JSON.parse(i.from)})
                        break
                    } else {
                        temp.push(i)
                    }
                }
                this.tempArgs = temp
                resolve({callback: false})
            }, 50)
        })


    }
}

const IpcRenderer = new IPCRenderer()


export default IpcRenderer