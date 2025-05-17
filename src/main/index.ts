import { app, BrowserWindow, ipcMain } from 'electron'
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
app.whenReady().then(async () => {
	// 拉起wmi
	await getWmi()
	electronApp.setAppUserModelId('top.yunmouren')
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})
	await Tray(createWindow(icon), icon)
	ipcMain.handle('RgbEventLoop', async (_event, args: boolean) => {
		return await RgbEventLoop(args)
	})
	ipcMain.handle(
		'ServiceOption',
		async (
			_event,
			serviceType: {
				type: 'start' | 'stop' | 'status'
			}
		) => {
			if (serviceType.type === 'status') {
				return await isServiceRunning('JiaoLongWMI')
			}
			console.log(serviceType.type)
			// 参数为启动 且 服务未启动 默认为命令行启动 结束WMI命令行进程
			if (serviceType.type === 'start') {
				await killWmi()
				// 安装为服务并启动
				await installJiaoLongWMIService()
				return true
			}
			if (serviceType.type === 'stop') {
				await uninstallJiaoLongWMIService()
				await getWmi()
				return true
			}
			return false
		}
	)
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
