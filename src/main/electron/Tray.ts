import { app, BrowserWindow, Menu, Tray } from 'electron'
import { config } from './Config'

export default function (win: BrowserWindow, icon: string): void {
	const tray = new Tray(icon) // 请确保这里有一个图标文件
	let isQuitting = false
	const contextMenu = Menu.buildFromTemplate([
		{
			label: '显示界面',
			click: function (): void {
				win.show()
			}
		},
		{
			label: '退出',
			click: function (): void {
				isQuitting = false
				app.quit()
			}
		}
	])

	tray.setToolTip('JiaolongControlConsole')
	tray.on('click', () => {
		win.show()
	})
	tray.setContextMenu(contextMenu)
	// 最小化到托盘
	win.on('close', function (event) {
		isQuitting = config.get<boolean>('minimize')
		if (!isQuitting) {
			event.preventDefault()
			win.hide()
		}
	})
}
