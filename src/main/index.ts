import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import createWindow from './electron/createWindow'
import JiaoLongWMI from './tools/JiaoLongWMI'
import { FanController } from './tools/JiaoLongEC'
import RgbEventLoop from './tools/RgbEventLoop'

const wmi = JiaoLongWMI()

const isFirstInstance = app.requestSingleInstanceLock()
if (!isFirstInstance) {
	app.quit()
	process.exit()
}
app.whenReady().then(() => {
	electronApp.setAppUserModelId('top.yunmouren')
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})
	createWindow()
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
	ipcMain.handle('FanController', async (_event, args) => {
		return await FanController(args)
	})
	ipcMain.handle('RgbEventLoop', async (_event, args: boolean) => {
		return await RgbEventLoop(args)
	})
})
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		wmi.kill()
		app.quit()
	}
})
