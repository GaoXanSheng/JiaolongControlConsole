export enum ResultState {
    OFF,
    ON
}
export interface IpcBackInfo {
    successful:boolean,
    deCode:number[],
    outMsg:string[]
}
export enum IpcBackInfoDeCode {
    message,
    data
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
    data: IpcBackInfo
}