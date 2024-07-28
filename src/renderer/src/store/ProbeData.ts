import store from './index'

export default async function() {
  window['Debug'] = function() {
    store.state.Debug = true
  }
  if (null != localStorage.getItem('ProbeData')) {
    return JSON.parse(localStorage.getItem('ProbeData') as string)
  } else {
    const ProbeData = await window.electron.ipcRenderer.invoke('custom-event-ProbeData', '')
    localStorage.setItem('ProbeData', JSON.stringify(ProbeData))
    return ProbeData
  }
}
