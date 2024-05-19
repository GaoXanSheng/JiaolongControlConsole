export default function IpcAlert(data:string[]) {
    console.log(data)
    for (const dataKey of data) {
        console.log(dataKey.toLowerCase()!="true")
        if (dataKey.toLowerCase()!="true"){
            mdui.alert("应用失败")
            return;
        }
    }
    mdui.alert(`应用成功`)
    return;
}