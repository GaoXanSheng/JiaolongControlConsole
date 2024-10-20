import { exec } from 'child_process'
import { ipcMain } from 'electron'

type OBSHandle = {
	type: 'start' | 'stop' | 'query'
}

class OSD {
	private OSDServiceName = 'BLDHotKeyService'

	constructor() {
		ipcMain.handle('custom-event-OBS', async (_event, args: OBSHandle) => {
			switch (args.type) {
				case 'start':
					return await this.start()
				case 'stop':
					return await this.stop()
				case 'query':
					return await this.query()
			}
		})
	}

	async query(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			exec('net start', (err, stdout) => {
				if (err) reject(err)
				resolve(stdout.includes('BLD Hot Key Service'))
			})
		})
	}

	async stop(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			exec(`net stop ${this.OSDServiceName}`, async (err) => {
				if (err) reject(err)
				resolve(await this.query())
			})
		})
	}

	async start(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			exec(`net start ${this.OSDServiceName}`, async (err) => {
				if (err) reject(err)
				resolve(await this.query())
			})
		})
	}
}

export default OSD
