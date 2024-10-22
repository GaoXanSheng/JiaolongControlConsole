import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import createWindow from './electron/createWindow'
import Event from './electron/Event'
import JiaoLongWMI from './tools/JiaoLongWMI'

const wmi = new JiaoLongWMI()
app.whenReady().then(() => {
	electronApp.setAppUserModelId('top.yunmouren')
	Event()
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})
	createWindow()
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		wmi.kill()
		app.quit()
	}
})
