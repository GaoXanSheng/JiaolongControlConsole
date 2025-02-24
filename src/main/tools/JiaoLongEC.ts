import { spawn } from 'child_process'
import WmiExe from '../../../resources/EC.exe?asset&asarUnpack'

function FanController(speed: number) {
	return new Promise((resolve) => {
		const process = spawn(WmiExe, [Number(speed.toString()[0] + speed.toString()[1]).toString(16)])
		process.on('close', (code) => {
			if (code == 0) {
				resolve({ msg: '成功执行' })
			}
			if (code == 230) {
				resolve({
					msg: '操作系统不兼容，无法初始化'
				})
			}
			if (code == 231) {
				resolve({
					msg: 'EC控制器故障'
				})
			}
			if (code == 232) {
				resolve({
					msg: '执行参数错误'
				})
			}
			if (code == 233) {
				resolve({
					msg: '输入参数无效'
				})
			}
			if (code == 233) {
				resolve({
					msg: '执行异常'
				})
			}
		})
	})
}
export { FanController }
