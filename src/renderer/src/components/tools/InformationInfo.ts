import { config } from '../../store/Config'
import useStore from '../../store'

const info = await config.get('SystemInfo')
const store = useStore()
const gpuInfo =
	info.gpu.controllers[
		info.gpu.controllers.findIndex((value) => {
			if (value.vendor == 'NVIDIA') return value
		})
	]
const RamInfo = {
	columns: [
		{
			title: '内存大小',
			dataIndex: 'size'
		},
		{
			title: '类型',
			dataIndex: 'type'
		},
		{
			title: '时钟速度',
			dataIndex: 'clockSpeed'
		},
		{
			title: '插槽',
			dataIndex: 'formFactor'
		},
		{
			title: '编号',
			dataIndex: 'partNum'
		},
		{
			title: '序列号',
			dataIndex: 'serialNum'
		}
	],
	data: info.ram.memLayout.map((layout) => {
		return {
			size: layout.size,
			type: layout.type,
			clockSpeed: layout.clockSpeed,
			formFactor: layout.formFactor,
			partNum: layout.partNum,
			serialNum: layout.serialNum
		}
	})
}
const CpuInfo = {
	columns: [
		{
			title: 'CPU',
			dataIndex: 'model'
		},
		{
			title: '核心数量',
			dataIndex: 'cors'
		}
	],
	data: [
		{
			model: info.cpu.model,
			cors: info.cpu.cors
		}
	]
}

const BiosInfo = {
	columns: [
		{
			title: 'BIOS版本',
			dataIndex: 'version'
		},
		{
			title: '发行日期',
			dataIndex: 'releaseDate'
		},
		{
			title: '序列码',
			dataIndex: 'serial'
		},
		{
			title: '供应商',
			dataIndex: 'vendor'
		}
	],
	data: [
		{
			version: info.bios.version,
			releaseDate: info.bios.releaseDate,
			serial: info.bios.serial,
			vendor: info.bios.vendor
		}
	]
}
const CpuTemperatureInfo = {
	columns: [
		{
			title: 'CPU温度',
			dataIndex: 'CpuTemperature'
		},
		{
			title: 'CPU风扇转速',
			dataIndex: 'CPUFanSpeed'
		}
	],
	data: [
		{
			CpuTemperature: store.OS.CPU.temperature,
			CPUFanSpeed: store.OS.CPU.CPUFanSpeed
		}
	]
}
const GpuTemperatureInfo = {
	columns: [
		{
			title: 'GPU温度',
			dataIndex: 'GpuTemperature'
		},
		{
			title: 'GPU风扇转速',
			dataIndex: 'GPUFanSpeed'
		}
	],
	data: [
		{
			GpuTemperature: store.OS.GPU.temperature,
			GPUFanSpeed: store.OS.GPU.GPUFanSpeed
		}
	]
}

const GpuInfo = {
	columns: [
		{
			title: 'GPU',
			dataIndex: 'name'
		},
		{
			title: '驱动版本',
			dataIndex: 'driverVersion'
		},
		{
			title: 'GPU使用率',
			dataIndex: 'GpuUsage'
		},
		{
			title: 'GPU模式',
			dataIndex: 'GpuMode'
		}
	],
	data: [
		{
			name: gpuInfo.name,
			driverVersion: gpuInfo.driverVersion,
			GpuUsage: store.OS.GPU.GpuUsage,
			GpuMode: store.OS.GPU.GpuMode ? 'DiscreteMode' : 'HybridMode'
		}
	]
}

const OSInfo = {
	columns: [
		{
			title: '键盘模式',
			dataIndex: 'KeyboardMode'
		},
		{
			title: '电源接口',
			dataIndex: 'AcType'
		}
	],
	data: [
		{
			KeyboardMode: store.OS.KeyboardMode,
			AcType: store.OS.AcType
		}
	]
}

export default {
	RamInfo,
	CpuInfo,
	BiosInfo,
	CpuTemperatureInfo,
	GpuTemperatureInfo,
	GpuInfo,
	OSInfo
}
