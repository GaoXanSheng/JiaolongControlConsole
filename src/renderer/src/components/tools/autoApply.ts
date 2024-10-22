import { config } from '../../store/Config'
import wmiOperation from '../../tools/WMIOperation'
import successful from './successful'
import { Message } from '@arco-design/web-vue'
import { ResultState } from '../../doc/IPCModels'
import useStore from '../../store'
function ConvertParameters(v: number) {
	return Number(String(v)[0] + String(v)[1])
}
export default async function () {
	const autoApply = {
		enabled: await config.get('autoApply.enabled'),
		autoApplyFan: await config.get('autoApply.autoApplyFan'),
		autoApplyCpu: await config.get('autoApply.autoApplyCpu')
	}

	if (autoApply.enabled) {
		if (autoApply.autoApplyFan) {
			const store = useStore()
			const FanSpeed = await config.get<number>('Setting.FanSpeed')
			if (store.OS.SwitchMaxFanSpeed == ResultState.OFF) {
				await wmiOperation.Fan.SwitchMaxFanSpeed(ResultState.ON)
			}
			const data = [await wmiOperation.Fan.SetFanSpeed(ConvertParameters(FanSpeed))]
			const callback = successful(data)
			if (callback) {
				await config.set('Setting.FanSpeed', FanSpeed)
				Message.success('Fan设置成功')
			} else {
				Message.error(JSON.stringify(data))
			}
		}
		if (autoApply.autoApplyCpu) {
			const CPUData = {
				shortPower: await config.get<number>('Setting.CPU.shortPower'),
				longPower: await config.get<number>('Setting.CPU.longPower'),
				tempWall: await config.get<number>('Setting.CPU.tempWall')
			}
			const data = [
				await wmiOperation.Cpu.SetCpuLongPower(CPUData.longPower),
				await wmiOperation.Cpu.SetCpuShortPower(CPUData.shortPower),
				await wmiOperation.Cpu.SetCPUTempWall(CPUData.tempWall)
			]
			const callback = successful(data)
			if (callback) {
				Message.success('CPU设置成功')
			} else {
				Message.error(JSON.stringify(data))
			}
		}
	}
}
