import {SmartData} from "systeminformation";

interface GraphicsData {
    controllers: GraphicsControllerData[];
    displays: GraphicsDisplayData[];
}

interface GraphicsControllerData {
    vendor: string;
    subVendor?: string;
    vendorId?: string;
    model: string;
    deviceId?: string;
    bus: string;
    busAddress?: string;
    vram: number | null;
    vramDynamic: boolean;
    external?: boolean;
    cores?: number;
    metalVersion?: string;
    subDeviceId?: string;
    driverVersion?: string;
    name?: string;
    pciBus?: string;
    pciID?: string;
    fanSpeed?: number;
    memoryTotal?: number;
    memoryUsed?: number;
    memoryFree?: number;
    utilizationGpu?: number;
    utilizationMemory?: number;
    temperatureGpu?: number;
    temperatureMemory?: number;
    powerDraw?: number;
    powerLimit?: number;
    clockCore?: number;
    clockMemory?: number;
}

interface GraphicsDisplayData {
    vendor: string;
    vendorId: string | null;
    model: string;
    productionYear: number | null;
    serial: string | null;
    deviceName: string | null;
    displayId: string | null;
    main: boolean;
    builtin: boolean;
    connection: string | null;
    sizeX: number | null;
    sizeY: number | null;
    pixelDepth: number | null;
    resolutionX: number | null;
    resolutionY: number | null;
    currentResX: number | null;
    currentResY: number | null;
    positionX: number;
    positionY: number;
    currentRefreshRate: number | null;
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
interface BiosData {
    vendor: string;
    version: string;
    releaseDate: string;
    revision: string;
    serial?: string;
    language?: string;
    features?: string[];
}
interface MemData {
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
}
interface MemLayoutData {
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
}
interface DiskLayoutData {
    device: string;
    type: string;
    name: string;
    vendor: string;
    size: number;
    bytesPerSector: number;
    totalCylinders: number;
    totalHeads: number;
    totalSectors: number;
    totalTracks: number;
    tracksPerCylinder: number;
    sectorsPerTrack: number;
    firmwareRevision: string;
    serialNum: string;
    interfaceType: string;
    smartStatus: string;
    temperature: null | number;
    smartData?: SmartData;
}
export interface ProbeData {
    cpu:{
        model:string,
        cors:number
    },
    gpu:GraphicsData,
    battery:BatteryData,
    system:{
        version:string,
        release:string,
        arch:string
    },
    bios:BiosData,
    ram:{
        mem:MemData,
        memLayout:MemLayoutData[]
    },
    disk:DiskLayoutData[]
}