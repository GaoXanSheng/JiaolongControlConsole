import * as OS from 'os'
import * as si from 'systeminformation'
import { Systeminformation } from 'systeminformation'

export default async function (): Promise<{
	disk: Systeminformation.DiskLayoutData[]
	system: { release: string; arch: string; version: string }
	bios: Systeminformation.BiosData
	cpu: { cors: number; model: string }
	battery: Systeminformation.BatteryData
	gpu: Systeminformation.GraphicsData
	ram: { mem: Systeminformation.MemData; memLayout: Systeminformation.MemLayoutData[] }
}> {
	return {
		cpu: {
			model: OS.cpus()[0].model,
			cors: OS.cpus().length
		},
		gpu: await si.graphics(),
		battery: await si.battery(),
		system: {
			version: OS.version(),
			release: OS.release(),
			arch: OS.arch()
		},
		bios: await si.bios(),
		ram: {
			mem: await si.mem(),
			memLayout: await si.memLayout()
		},
		disk: await si.diskLayout()
	}
}
