import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import icon from '../../../resources/MECHREVO_LOGO.png?asset'
import { is } from '@electron-toolkit/utils'
export default class OpenProSettings {
	private window: BrowserWindow | null = null
	public getWindow() {
		return this.window
	}
	constructor() {
		this.window = new BrowserWindow({
			icon,
			autoHideMenuBar: true,
			frame: true,
			transparent: false,
			// 设置窗口形状
			height: 900,
			width: 1600,
			minHeight: 900,
			minWidth: 1600,
			resizable: false,
			...(process.platform === 'linux' ? { icon } : {}),
			webPreferences: {
				preload: join(__dirname, '../preload/index.js'),
				backgroundThrottling: true,
				sandbox: false,
				autoplayPolicy: 'no-user-gesture-required'
			}
		})
		this.window.webContents.setWindowOpenHandler((details) => {
			shell.openExternal(details.url)
			return { action: 'deny' }
		})
		if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
			this.window.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/OpenProSettings')
			this.window.webContents.openDevTools()
		} else {
			this.window.loadFile(join(__dirname, '../renderer/index.html'), { hash: '/OpenProSettings' })
		}
	}
}
