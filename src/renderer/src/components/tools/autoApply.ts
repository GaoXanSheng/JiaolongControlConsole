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
	const { enabled, autoApplyFan, autoApplyCpu } = await config.get<{
		enabled: boolean
		autoApplyFan: boolean
		autoApplyCpu: boolean
	}>('autoApply')
	if (enabled) {
		if (autoApplyFan) {
			const store = useStore()
			const FanSpeed = await config.get<number>('Setting.FanSpeed')
			if (store.OS.SwitchMaxFanSpeed == ResultState.OFF) {
				await wmiOperation.Fan.SwitchMaxFanSpeed(ResultState.ON)
			}
			const data = [await wmiOperation.Fan.SetFanSpeed(ConvertParameters(FanSpeed))]
			const callback = successful(data)
			if (callback) {
				await config.set('Setting.FanSpeed', FanSpeed)
				Message.success('自动应用风扇设置成功')
			} else {
				Message.error(JSON.stringify(data))
			}
		}
		if (autoApplyCpu) {
			const { shortPower, longPower, tempWall } = await config.get<{
				shortPower: number
				longPower: number
				tempWall: number
			}>('Setting.CPU')
			const data = [
				await wmiOperation.Cpu.SetCpuLongPower(longPower),
				await wmiOperation.Cpu.SetCpuShortPower(shortPower),
				await wmiOperation.Cpu.SetCPUTempWall(tempWall)
			]
			const callback = successful(data)
			if (callback) {
				Message.success('自动应用CPU设置成功')
			} else {
				Message.error(JSON.stringify(data))
			}
		}
	}
}
