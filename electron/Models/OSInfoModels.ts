export interface GetCpuTemperature {
    main: number;
    cores: number[];
    max: number;
    socket?: number[];
    chipset?: number;
}
interface BatteryData {
    hasBattery: boolean;
    cycleCount: number;
    isCharging: boolean;
    voltage: number;
    designedCapacity: number;
    maxCapacity: number;
    currentCapacity: number;
    capacityUnit: string;
    percent: number;
    timeRemaining: number;
    acConnected: boolean;
    type: string;
    model: string;
    manufacturer: string;
    serial: string;
    additionalBatteries?: BatteryData[];
}
export interface GetGraphics {
    vendor: string,
    model: string,
    bus: string,
    vram: number,
    vramDynamic: boolean,
    subDeviceId: string,
    driverVersion: string,
    name: string,
    pciBus: string,
    memoryTotal: number,
    memoryUsed: number,
    memoryFree: number,
    utilizationGpu: number,
    utilizationMemory: number,
    temperatureGpu: number,
    powerDraw: number,
    clockCore: number,
    clockMemory: number
}

export interface GetBattery {
    hasBattery: boolean;
    cycleCount: number;
    isCharging: boolean;
    voltage: number;
    designedCapacity: number;
    maxCapacity: number;
    currentCapacity: number;
    capacityUnit: string;
    percent: number;
    timeRemaining: number;
    acConnected: boolean;
    type: string;
    model: string;
    manufacturer: string;
    serial: string;
    additionalBatteries?: BatteryData[];
}

export interface GetMemory {
    MemoryInfo: {
        total: number;
        free: number;
        used: number;
        active: number;
        available: number;
        buffcache: number;
        buffers: number;
        cached: number;
        slab: number;
        swaptotal: number;
        swapused: number;
        swapfree: number;
        writeback: number | null;
        dirty: number | null;
    }[],
    MemoryLayout: {
        size: number;
        bank: string;
        type: string;
        ecc?: boolean | null;
        clockSpeed: number | null;
        formFactor: string;
        manufacturer?: string;
        partNum: string;
        serialNum: string;
        voltageConfigured: number | null;
        voltageMin: number | null;
        voltageMax: number | null;
    }[]
}