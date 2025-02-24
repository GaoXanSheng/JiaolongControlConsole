import { BrowserWindow, Menu, Tray } from 'electron'

export default function (win: BrowserWindow, icon: string): void {
	const tray = new Tray(icon) // 请确保这里有一个图标文件
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
				process.kill(0)
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
		event.preventDefault()
		win.hide()
	})
}
