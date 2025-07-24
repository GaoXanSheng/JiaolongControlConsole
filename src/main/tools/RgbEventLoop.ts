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
			running.process = spawn(WmiExe, ['RGBBreathingLightEffect', 'Start', '--parameter', ''])
		} else {
			if (running.process) running.process.kill()
		}
		resolve({ msg: '执行成功' })
	})
}
