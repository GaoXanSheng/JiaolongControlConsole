import { exec } from 'child_process'
import JiaoLongWMI from '../../../resources/JiaoLongWMI.exe?asset&asarUnpack'
import { decode } from 'iconv-lite'
// 基础的 exec 封装，返回 Promise，方便复用
function execPromise(command: string): Promise<string> {
	return new Promise((resolve, reject) => {
		exec(command, { encoding: 'buffer' }, (err, stdout, stderr) => {
			const outStr = iconvDecode(stdout)
			const errStr = iconvDecode(stderr)
			if (err) {
				reject(new Error(errStr || outStr))
			} else {
				resolve(outStr)
			}
		})
	})
}
function iconvDecode(buffer: Buffer) {
	return decode(buffer, 'cp936')
}
// 停止并删除指定服务
export async function uninstallService(serviceName: string): Promise<void> {
	const stopResult = await execPromise(`sc stop "${serviceName}"`)
	console.log(`服务停止成功: ${stopResult}`)

	const deleteResult = await execPromise(`sc delete "${serviceName}"`)
	console.log(`服务删除成功: ${deleteResult}`)
}

// 安装并启动 JiaoLongWMI 服务
export async function installJiaoLongWMIService(): Promise<void> {
	const installResult = await execPromise(`"${JiaoLongWMI}" JiaoLongWMIService install`)
	console.log(`服务安装成功: ${installResult}`)

	const startResult = await execPromise(`"${JiaoLongWMI}" JiaoLongWMIService start`)
	console.log(`服务启动成功: ${startResult}`)
}

// 停止并卸载 JiaoLongWMI 服务
export async function uninstallJiaoLongWMIService(): Promise<void> {
	const stopResult = await execPromise(`"${JiaoLongWMI}" JiaoLongWMIService stop`)
	console.log(`服务停止成功: ${stopResult}`)
	const uninstallResult = await execPromise(`"${JiaoLongWMI}" JiaoLongWMIService uninstall`)
	console.log(`服务卸载成功: ${uninstallResult}`)
	await new Promise((resolve) => setTimeout(resolve, 1000))
}

// 判断服务是否运行
export async function isServiceRunning(serviceName: string): Promise<boolean> {
	try {
		const res = await execPromise(`sc query "${serviceName}"`)
		return res.includes('RUNNING')
	} catch (e) {
		return false
	}
}
