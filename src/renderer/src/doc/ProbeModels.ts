interface SmartData {
	json_format_version: number[]
	smartctl: {
		version: number[]
		platform_info: string
		build_info: string
		argv: string[]
		exit_status: number
	}
	device: {
		name: string
		info_name: string
		type: string
		protocol: string
	}
	model_family?: string
	model_name?: string
	serial_number?: string
	firmware_version?: string
	smart_status: {
		passed: boolean
	}
	trim?: {
		supported: boolean
	}
	ata_smart_attributes?: {
		revision: number
		table: {
			id: number
			name: string
			value: number
			worst: number
			thresh: number
			when_failed: string
			flags: {
				value: number
				string: string
				prefailure: boolean
				updated_online: boolean
				performance: boolean
				error_rate: boolean
				event_count: boolean
				auto_keep: boolean
			}
			raw: {
				value: number
				string: string
			}
		}[]
	}
	ata_smart_error_log?: {
		summary: {
			revision: number
			count: number
		}
	}
	ata_smart_self_test_log?: {
		standard: {
			revision: number
			table: {
				type: {
					value: number
					string: string
				}
				status: {
					value: number
					string: string
					passed: boolean
				}
				lifetime_hours: number
			}[]
			count: number
			error_count_total: number
			error_count_outdated: number
		}
	}
	nvme_pci_vendor?: {
		id: number
		subsystem_id: number
	}
	nvme_smart_health_information_log?: {
		critical_warning?: number
		temperature?: number
		available_spare?: number
		available_spare_threshold?: number
		percentage_used?: number
		data_units_read?: number
		data_units_written?: number
		host_reads?: number
		host_writes?: number
		controller_busy_time?: number
		power_cycles?: number
		power_on_hours?: number
		unsafe_shutdowns?: number
		media_errors?: number
		num_err_log_entries?: number
		warning_temp_time?: number
		critical_comp_time?: number
		temperature_sensors?: number[]
	}
	user_capacity?: {
		blocks: number
		bytes: number
	}
	logical_block_size?: number
	temperature: {
		current: number
	}
	power_cycle_count: number
	power_on_time: {
		hours: number
	}
}
interface GraphicsData {
	controllers: GraphicsControllerData[]
	displays: GraphicsDisplayData[]
}

interface GraphicsControllerData {
	vendor: string
	subVendor?: string
	vendorId?: string
	model: string
	deviceId?: string
	bus: string
	busAddress?: string
	vram: number | null
	vramDynamic: boolean
	external?: boolean
	cores?: number
	metalVersion?: string
	subDeviceId?: string
	driverVersion?: string
	name?: string
	pciBus?: string
	pciID?: string
	fanSpeed?: number
	memoryTotal?: number
	memoryUsed?: number
	memoryFree?: number
	utilizationGpu?: number
	utilizationMemory?: number
	temperatureGpu?: number
	temperatureMemory?: number
	powerDraw?: number
	powerLimit?: number
	clockCore?: number
	clockMemory?: number
}

interface GraphicsDisplayData {
	vendor: string
	vendorId: string | null
	model: string
	productionYear: number | null
	serial: string | null
	deviceName: string | null
	displayId: string | null
	main: boolean
	builtin: boolean
	connection: string | null
	sizeX: number | null
	sizeY: number | null
	pixelDepth: number | null
	resolutionX: number | null
	resolutionY: number | null
	currentResX: number | null
	currentResY: number | null
	positionX: number
	positionY: number
	currentRefreshRate: number | null
}
interface BatteryData {
	hasBattery: boolean
	cycleCount: number
	isCharging: boolean
	voltage: number
	designedCapacity: number
	maxCapacity: number
	currentCapacity: number
	capacityUnit: string
	percent: number
	timeRemaining: number
	acConnected: boolean
	type: string
	model: string
	manufacturer: string
	serial: string
	additionalBatteries?: BatteryData[]
}
interface BiosData {
	vendor: string
	version: string
	releaseDate: string
	revision: string
	serial?: string
	language?: string
	features?: string[]
}
interface MemData {
	total: number
	free: number
	used: number
	active: number
	available: number
	buffcache: number
	buffers: number
	cached: number
	slab: number
	swaptotal: number
	swapused: number
	swapfree: number
	writeback: number | null
	dirty: number | null
}
interface MemLayoutData {
	size: number
	bank: string
	type: string
	ecc?: boolean | null
	clockSpeed: number | null
	formFactor: string
	manufacturer?: string
	partNum: string
	serialNum: string
	voltageConfigured: number | null
	voltageMin: number | null
	voltageMax: number | null
}
interface DiskLayoutData {
	device: string
	type: string
	name: string
	vendor: string
	size: number
	bytesPerSector: number
	totalCylinders: number
	totalHeads: number
	totalSectors: number
	totalTracks: number
	tracksPerCylinder: number
	sectorsPerTrack: number
	firmwareRevision: string
	serialNum: string
	interfaceType: string
	smartStatus: string
	temperature: null | number
	smartData?: SmartData
}
export interface ProbeData {
	cpu: {
		model: string
		cors: number
	}
	gpu: GraphicsData
	battery: BatteryData
	system: {
		version: string
		release: string
		arch: string
	}
	bios: BiosData
	ram: {
		mem: MemData
		memLayout: MemLayoutData[]
	}
	disk: DiskLayoutData[]
}
