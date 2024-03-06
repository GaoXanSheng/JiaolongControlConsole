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

export class IPCRenderer {
    public SetCpuLongPower(input: number) {
        this.sendIPC(`SetCpuLongPower-${input}`)
    }

    public SetCpuShortPower(input: number) {
        this.sendIPC(`SetCpuShortPower-${input}`)
    }

    public SetCPUTempWall(input: number) {
        this.sendIPC(`SetCPUTempWall-${input}`)
    }

    /**
     * 在cli中已经做好防呆
     * @param r 小于255
     * @param g 小于255
     * @param b 小于255
     * @constructor
     */
    public SetRGBKeyboardColor(r: number, g: number, b: number) {
        this.sendIPC(`SetRGBKeyboardColor-${r}-${g}-${b}`)
    }

    public SetLogoLight(State: ResultState) {
        this.sendIPC(`SetLogoLight-${State}`)
    }

    public SetGpuMode(State: ResultState) {
        this.sendIPC(`SetGpuMode-${State}`)
    }

    public SetPerformaceMode(State: eumPerformaceMode) {
        console.log(1)
        this.sendIPC(`SetPerformaceMode-${State}`)
    }
    public async SetkeyboardLightBrightness(State:number) {
        this.sendIPC(`SetkeyboardLightBrightness-${State}`)
    }
    public async isAdmin() {
        this.sendIPC(`isAdmin`)
    }
    constructor() {
        window.ipcRenderer.on('custom-event-execCmd-callback',(_event, args)=>{
            console.log(args)
        })
    }

    private sendIPC(CMD: string) {
        console.log(CMD)
        window.ipcRenderer.send("custom-event-execCmd", CMD)
    }
}