import { BrowserWindow, Menu, Tray } from 'electron'
import { uninstallDriver } from '../tools/uninstallDriver'
import JiaoLongWMI from '../tools/JiaoLongWMI'

export default async function (win: BrowserWindow, icon: string): Promise<void> {
	const tray = new Tray(icon)
	const wmi = await JiaoLongWMI()
	const contextMenu = Menu.buildFromTemplate([
		{
			label: '显示界面',
			click: () => win.show()
		},
		{
			label: '退出',
			click: () => {
				if (wmi) wmi.kill('SIGINT')
				uninstallDriver('R0JiaoLongWMI')
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
