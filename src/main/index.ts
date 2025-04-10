import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import createWindow from './electron/createWindow'
import JiaoLongWMI from './tools/JiaoLongWMI'
import RgbEventLoop from './tools/RgbEventLoop'
import OpenProSettings from './electron/OpenProSettings'

const wmi = JiaoLongWMI()
let proSettingsWindow: BrowserWindow | null = null

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
	ipcMain.handle('RgbEventLoop', async (_event, args: boolean) => {
		return await RgbEventLoop(args)
	})
	ipcMain.handle('OpenProSettings', async () => {
		if (proSettingsWindow && !proSettingsWindow.isDestroyed()) {
			proSettingsWindow.focus()
			return
		}
		proSettingsWindow = new OpenProSettings().getWindow()
		proSettingsWindow!.on('closed', () => {
			proSettingsWindow = null
		})
	})
})
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		wmi.kill()
		app.quit()
	}
})
