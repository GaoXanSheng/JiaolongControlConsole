import { app, ipcMain } from 'electron'
import { config } from './Config'
interface custom_event_Config {
	func: 'set' | 'get' | 'has'
	key: string
	data?: object
}
export default function () {
	ipcMain.handle(
		'custom-event-PowerBoot',
		async (_event, arg: { openAtLogin; openAsHidden; enabled }) => {
			const { openAtLogin, openAsHidden, enabled } = arg
			app.setLoginItemSettings({
				openAtLogin,
				openAsHidden,
				enabled,
				name: 'JiaolongControlConsole'
			})
			config.set('PowerBoot', {
				openAtLogin,
				openAsHidden,
				enabled,
				name: 'JiaolongControlConsole'
			})
			return true
		}
	)
	ipcMain.handle('custom-event-Config', (_event, args: custom_event_Config) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (args.data == void 0) return config[args.func](args.key)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return config[args.func](args.key, args.data)
	})
}
