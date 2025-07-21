import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import createWindow from './electron/createWindow'
import RgbEventLoop from './tools/RgbEventLoop'
import OpenProSettings from './electron/OpenProSettings'
import Tray from './electron/Tray'
import icon from '../../resources/icon.png?asset'
import {
	installJiaoLongWMIService,
	isServiceRunning,
	uninstallJiaoLongWMIService
} from './tools/ServiceDriver'
import { getWmi, killWmi } from './electron/store'

let proSettingsWindow: BrowserWindow | null = null

const isFirstInstance = app.requestSingleInstanceLock()
if (!isFirstInstance) {
	app.quit()
	process.exit()
}

async function setupApp() {
	try {
		// 初始化 WMI
		await getWmi()

		electronApp.setAppUserModelId('top.yunmouren')

		app.on('browser-window-created', (_, window) => {
			optimizer.watchWindowShortcuts(window)
		})

		await Tray(createWindow(icon), icon)

		registerIpcHandlers()
	} catch (err) {
		console.error('应用启动异常:', err)
		app.quit()
	}
}

function registerIpcHandlers() {
	ipcMain.handle('RgbEventLoop', async (_event, enabled: boolean) => {
		try {
			return await RgbEventLoop(enabled)
		} catch (err) {
			console.error('RgbEventLoop 错误:', err)
			return false
		}
	})

	ipcMain.handle(
		'ServiceOption',
		async (_event, { type }: { type: 'start' | 'stop' | 'status' }): Promise<boolean> => {
			try {
				if (type === 'status') {
					return await isServiceRunning('JiaoLongWMI')
				}

				if (type === 'start') {
					await killWmi()
					await installJiaoLongWMIService()
					return true
				}

				if (type === 'stop') {
					await uninstallJiaoLongWMIService()
					await getWmi()
					return true
				}
			} catch (err) {
				console.error(`ServiceOption ${type} 错误:`, err)
				return false
			}
			return false
		}
	)

	ipcMain.handle('OpenProSettings', async () => {
		if (proSettingsWindow?.isDestroyed() === false) {
			proSettingsWindow.focus()
			return
		}

		proSettingsWindow = new OpenProSettings().getWindow()

		proSettingsWindow?.on('closed', () => {
			proSettingsWindow = null
		})
	})

	ipcMain.handle('dialog:openFile', async () => {
		try {
			const { canceled, filePaths } = await dialog.showOpenDialog({
				properties: ['openFile'],
				filters: [{ name: 'Videos', extensions: ['mp4', 'avi', 'mkv'] }]
			})
			if (canceled) return null
			return filePaths[0]
		} catch (err) {
			console.error('dialog:openFile 异常:', err)
			return null
		}
	})
}

app.whenReady().then(setupApp)
