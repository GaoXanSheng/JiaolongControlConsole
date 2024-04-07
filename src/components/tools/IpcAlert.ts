import {ServerSendIPCExecCmdData} from "../../../electron/Models/IPCModels.ts";


export default function IpcAlert(data:ServerSendIPCExecCmdData[]) {
    let counter = 0
    console.log(data)
    data.map(x => {
       if (x.data.successful){
           counter++
       }
    })
    if (counter==data.length){
        mdui.alert(`应用成功`)
    }else {
        mdui.alert("应用失败")
    }

}