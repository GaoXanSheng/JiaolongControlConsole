import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import WmiExe from '../../../resources/JiaoLongWMI.exe?asset&asarUnpack'
const running: {
	process: null | ChildProcessWithoutNullStreams
} = {
	process: null
}
export default async function RgbEventLoop(run: boolean) {
	return new Promise((resolve) => {
		if (run) {
			running.process = spawn(WmiExe, ['RGBBreathingLightEffect', 'Start'])
		} else {
			process.kill(0)
		}
		resolve({ msg: '执行成功' })
	})
}
