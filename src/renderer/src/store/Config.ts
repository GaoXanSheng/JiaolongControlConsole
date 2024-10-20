import electron from '../tools/electron'

function configAPI<T>(args: { func: string; data?: any; key: string }): Promise<T> {
	return electron.ipcRenderer.invoke('custom-event-Config', args)
}

export const config = {
	get: async function <T>(key: string): Promise<T> {
		return configAPI<T>({ func: 'get', key })
	},
	set: async function <T>(key: string, value): Promise<void> {
		return configAPI({ func: 'set', key, data: value })
	},
	/**
	 * 如果没有这个 key 返回 true
	 * @param key
	 */
	has: async function (key: string): Promise<boolean> {
		return configAPI<boolean>({ func: 'has', key })
	}
}
