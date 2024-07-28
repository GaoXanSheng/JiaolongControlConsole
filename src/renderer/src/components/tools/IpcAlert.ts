export default function IpcAlert(data: string[]) {
  for (const dataKey of data) {
    if (dataKey.toLowerCase() != 'true') {
      // @ts-ignore
      mdui.alert('应用失败')
      return
    }
  }
  // @ts-ignore
  mdui.alert(`应用成功`)
  return
}
