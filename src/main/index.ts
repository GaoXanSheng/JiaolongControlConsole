import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import createWindow from './electron/createWindow'
import RgbEventLoop from './tools/RgbEventLoop'
import OpenProSettings from './electron/OpenProSettings'
import Tray from './electron/Tray'
import icon from '../../resources/icon.png?asset'
let proSettingsWindow: BrowserWindow | null = null

const isFirstInstance = app.requestSingleInstanceLock()
if (!isFirstInstance) {
	app.quit()
	process.exit()
}
app.whenReady().then(async () => {
	electronApp.setAppUserModelId('top.yunmouren')
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})
	await Tray(createWindow(icon), icon)
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
