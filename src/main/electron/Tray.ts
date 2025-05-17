import { BrowserWindow, Menu, Tray } from 'electron'
import { isServiceRunning, uninstallService } from '../tools/ServiceDriver'
import { killWmi } from './store'

export default async function (win: BrowserWindow, icon: string): Promise<void> {
	const tray = new Tray(icon)
	const contextMenu = Menu.buildFromTemplate([
		{
			label: '显示界面',
			click: () => win.show()
		},
		{
			label: '退出',
			click: async () => {
				await killWmi()
				if (await isServiceRunning('R0JiaoLongWMI')) {
					await uninstallService('R0JiaoLongWMI')
				}
				process.exit(0)
			}
		}
	])

	tray.setToolTip('JiaolongControlConsole')
	tray.on('click', () => win.show())
	tray.setContextMenu(contextMenu)

	// 拦截关闭事件，实现最小化到托盘
	win.on('close', (event) => {
		event.preventDefault()
		win.hide()
	})
}
