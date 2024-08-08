import { app, BrowserWindow, ipcMain } from 'electron'

import { electronApp, optimizer } from '@electron-toolkit/utils'
import createWindow from './tools/createWindow'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('top.yunmouren')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
