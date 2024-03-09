export enum enumBuildType {
    CPU = "CPU",
    Fan = "Fan",
    GPU = "GPU",
    Keyboard = "Keyboard",
    LogoLight = "LogoLight",
    PerformaceMode = "PerformaceMode",
    System = "System"
}


export enum CPUBuild {
    SetCpuShortPower="SetCpuShortPower",
    SetCpuLongPower="SetCpuLongPower",
    SetCPUTempWall="SetCPUTempWall",
    GetCPUTempWall="GetCPUTempWall",
    GetCPUThermometer="GetCPUThermometer"
}

export enum FanBuild {
    SwitchMaxFanSpeed="SwitchMaxFanSpeed",
    SetFanSpeed="SetFanSpeed"
}
export enum GPUBuild {
    SetGpuMode="SetCpuShortPower",
    GetGpuMode="SetCpuLongPower"
}
export enum KeyboardBuild {
    GetRGBKeyboardColor="GetRGBKeyboardColor",
    GetkeyboardLightBrightness="GetkeyboardLightBrightness",
    GetKeyboardMode="GetKeyboardMode",
    SetRGBKeyboardColor="SetRGBKeyboardColor",
    SetkeyboardLightBrightness="SetkeyboardLightBrightness",
}
export enum LogoLightBuild {
    SetLogoLight="SetLogoLight",
}
export enum PerformaceModeBuild {
    SetPerformaceMode="SetPerformaceMode",
}

export enum SystemBuild {
    OpenCustomMode="OpenCustomMode",
    GetACType="GetACType",
}
