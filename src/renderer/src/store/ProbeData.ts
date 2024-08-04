import store from './index'
import { ProbeData } from '../tools/WMIOperation/Models/ProbeModels'
import electron from '../tools/electron'


export default async function(): Promise<ProbeData> {
  window['Debug'] = function() {
    store.state.Debug = true
  }
  if (null != localStorage.getItem('ProbeData')) {
    return JSON.parse(localStorage.getItem('ProbeData') as string)
  } else {
    const ProbeData = await electron.ipcRenderer.invoke('custom-event-ProbeData', '')
    localStorage.setItem('ProbeData', JSON.stringify(ProbeData))
    return ProbeData
  }
}
