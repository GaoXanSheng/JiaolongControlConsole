// 单个项目的数据结构
type MetricItem = {
	Name: string
	Value: number
}

// 完整的 CPU 数据结构类型
export type CpuData = {
	Load: MetricItem[]
	Power: MetricItem[]
	Clock: MetricItem[]
	Factor: MetricItem[]
	Voltage: MetricItem[]
	Temperature: MetricItem[]
	Name: string
}
export type Memory = {
	Data: MetricItem[]
	Load: MetricItem[]
	Name: string
}
export type GpuAmd = {
	Name: string
	SmallData: MetricItem[]
	Factor: MetricItem[]
	Load: MetricItem[]
	Clock: MetricItem[]
	Temperature: MetricItem[]
	Voltage: MetricItem[]
	Power: MetricItem[]
}
export type GpuNvidia = {
	Name: string
	Temperature: MetricItem[]
	Clock: MetricItem[]
	Load: MetricItem[]
	SmallData: MetricItem[]
	Power: MetricItem[]
	Throughput: MetricItem[]
}
export type Storage = {
	Name: string
	Temperature: MetricItem[]
	Level: MetricItem[]
	Data: MetricItem[]
	Load: MetricItem[]
}
export type Network = {
	Name: string
	Data: MetricItem[]
	Throughput: MetricItem[]
	Load: MetricItem[]
}
export type Battery = {
	Name: string
	Energy: MetricItem[]
	Level: MetricItem[]
	Voltage: MetricItem[]
	Current: MetricItem[]
	Power: MetricItem[]
}
// 总数据结构类型（如果你后续还有其他硬件也可以放在这里）
export interface HardwareMonitorInfo {
	CPU: CpuData
	Memory: Memory
	GpuAmd: GpuAmd
	GpuNvidia: GpuNvidia
	Storage: Storage
	Network: Network
	Battery: Battery
}
