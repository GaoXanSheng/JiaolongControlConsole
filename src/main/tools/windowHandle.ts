import Probe from './Probe'
import { app, ipcMain } from 'electron'

const ProbeData = () => {
  ipcMain.handle('custom-event-ProbeData', async (_event, _args: string) => {
    return await Probe()
  })
}

const setLoginItemSettings = () => {
  ipcMain.handle('custom-event-setLoginItemSettings', async (_event, args: {
    openAtLogin: boolean,
    openAsHidden: boolean
  }) => {
    app.setLoginItemSettings({
      openAtLogin: args.openAtLogin,
      openAsHidden: args.openAsHidden,
      enabled: args.openAsHidden,
      name: 'JiaolongControlConsole'
    })
    return args.openAtLogin
  })
}


export default function() {
  ProbeData()
  setLoginItemSettings()
}
