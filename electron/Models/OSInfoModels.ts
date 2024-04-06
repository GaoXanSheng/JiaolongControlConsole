export interface GetCpuTemperatureModels {
    main: number;
    cores: number[];
    max: number;
    socket?: number[];
    chipset?: number;
}

export interface GetCpuInfoModels {
    manufacturer: string;
    brand: string;
    vendor: string;
    family: string;
    model: string;
    stepping: string;
    revision: string;
    voltage: string;
    speed: number;
    speedMin: number;
    speedMax: number;
    governor: string;
    cores: number;
    physicalCores: number;
    efficiencyCores?: number;
    performanceCores?: number;
    processors: number;
    socket: string;
    flags: string;
    virtualization: boolean;
    cache: CpuCacheData;
}

interface CpuCacheData {
    l1d: number;
    l1i: number;
    l2: number;
    l3: number;
}

interface BatteryDataModels {
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
    additionalBatteries?: BatteryDataModels[];
}

export interface GetGraphicsModels {
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
    clockMemory: number,
    fanSpeed: number
}

export interface GetBatteryModels {
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
    additionalBatteries?: BatteryDataModels[];
}

export interface GetMemoryModels {
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