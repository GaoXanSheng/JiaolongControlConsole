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

export interface ClientSendIPCExecCmdData{
    execCmd:string,
    timeCounter:number
}

export interface ServerSendIPCExecCmdData extends ClientSendIPCExecCmdData {
    serverTimeCounter:number,
    callback:boolean,
    msg?: {
        stdout:string,
        stderr:string
    }
}