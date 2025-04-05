import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import JiaoLongWMI from '../../../resources/JiaoLongWMI.exe?asset&asarUnpack'

function initWMI(): ChildProcessWithoutNullStreams {
	const process = spawn(JiaoLongWMI, ['SocketServer', 'true', '9871', '127.0.0.1'])
	process.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`)
	})

	process.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`)
	})

	process.on('close', (code) => {
		console.log(`子进程退出，退出码：${code}`)
	})
	console.log('Server run')
	return process
}
export default initWMI
