import { exec } from 'child_process'

export function uninstallDriver(serviceName: string) {
	exec(`sc stop ${serviceName}`, (err, stdout, stderr) => {
		if (err) {
			console.error(`停止驱动失败: ${err.message}`)
			return
		}
		console.log(`驱动已停止: ${stdout || stderr}`)
	})
	exec(`sc delete ${serviceName}`, (err, stdout, stderr) => {
		if (err) {
			console.error(`卸载驱动失败: ${err.message}`)
			return
		}
		console.log(`驱动卸载成功: ${stdout || stderr}`)
	})
}
