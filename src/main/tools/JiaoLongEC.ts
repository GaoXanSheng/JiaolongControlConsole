import { spawn } from 'child_process'
import WmiExe from '../../../resources/EC.exe?asset&asarUnpack'

function FanController(speed: number) {
	const process = spawn(WmiExe, [Number(speed.toString()[0] + speed.toString()[1]).toString(16)])
	process.stdout.on('data', (data) => {
		console.log(`FanController: ${data}`)
	})

	process.stderr.on('data', (data) => {
		console.error(`FanController: ${data}`)
	})

	process.on('close', (code) => {
		console.log(`FanController: ${code}`)
	})
	return process
}
export { FanController }
