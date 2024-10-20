import icon from '../../../resources/icon.png?asset'

import { join } from 'path'
import { shell, BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'
import Tray from './Tray'
export default function () {
	const mainWindow = new BrowserWindow({
		icon,
		autoHideMenuBar: true,
		frame: true,
		transparent: false,
		// 设置窗口形状
		height: 700,
		width: 1000,
		minHeight: 700,
		minWidth: 1000,
		resizable: false,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			backgroundThrottling: true,
			sandbox: false,
			autoplayPolicy: 'no-user-gesture-required'
		}
	})
	mainWindow.on('ready-to-show', () => {
		mainWindow.show()
	})
	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
		mainWindow.webContents.openDevTools()
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
	}
	Tray(mainWindow, icon)

	return mainWindow
}
