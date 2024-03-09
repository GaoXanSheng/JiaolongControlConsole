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
export interface custom_event_execCmd {
    timeCounter:number,
    callback:boolean,
    msg?: {
        stdout:string,
        stderr:string
    }
}

export interface ClientSendIPCExecCmdData{
    execCmd:string,
    timeCounter:number
}

export interface ServerSendIPCExecCmdData{
    timeCounter:number,
    callback:boolean,
    msg?: {
        stdout:string,
        stderr:string
    }
}