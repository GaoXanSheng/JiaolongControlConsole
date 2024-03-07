

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

class ObservableArray extends Array {
    constructor(...args) {
        super(...args);
        this.events = {};
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(...args);
            });
        }
    }

    push(...items) {
        super.push(...items);
        this.emit('change', 'push', items);
        return this.length;
    }

    pop() {
        const item = super.pop();
        this.emit('change', 'pop', item);
        return item;
    }

    // 其他数组方法的重写...
}

export class IPCRenderer {

    private ObservableChange() {
        return new Promise((resolve) => {
            window.ipcRenderer.once('custom-event-execCmd-callback', (_event, args: string) => {
                resolve(args)
            })
        })
    }

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
        return this.ObservableChange()

    }

    public SetLogoLight(State: ResultState) {
        this.sendIPC(`SetLogoLight-${State}`)
        return this.ObservableChange()
    }

    public SetGpuMode(State: ResultState) {
        this.sendIPC(`SetGpuMode-${State}`)
        return this.ObservableChange()
    }

    public SetPerformaceMode(State: eumPerformaceMode) {
        this.sendIPC(`SetPerformaceMode-${State}`)
        return this.ObservableChange()
    }

    public async SetkeyboardLightBrightness(State: number) {
        this.sendIPC(`SetkeyboardLightBrightness-${State}`)
        return this.ObservableChange()
    }
    public async testFalse() {
        this.sendIPC(``)
        return this.ObservableChange()
    }
    public async isAdmin() {
        this.sendIPC(`isAdmin`)
        return this.ObservableChange()
    }

    constructor() {


    }

    private sendIPC(CMD: string) {
        window.ipcRenderer.send("custom-event-execCmd", CMD)
    }
}