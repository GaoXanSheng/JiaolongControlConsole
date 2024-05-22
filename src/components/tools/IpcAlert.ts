export default function IpcAlert(data:string[]) {
    for (const dataKey of data) {
        if (dataKey.toLowerCase()!="true"){
            mdui.alert("应用失败")
            return;
        }
    }
    mdui.alert(`应用成功`)
    return;
}