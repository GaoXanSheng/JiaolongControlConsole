import JiaoLongWMI from '../tools/JiaoLongWMI'
import { ChildProcessWithoutNullStreams } from 'child_process'

let wmiInstance: ChildProcessWithoutNullStreams | null = null

async function getWmi() {
	if (!wmiInstance) {
		wmiInstance = await JiaoLongWMI()
	}
	return wmiInstance
}
async function killWmi() {
	if (wmiInstance) {
		wmiInstance.kill('SIGINT')
		wmiInstance = null
	}
}
export { getWmi, killWmi }
