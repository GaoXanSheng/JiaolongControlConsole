export enum enumBuildType {
	CPU = 'CPU',
	Fan = 'Fan',
	GPU = 'GPU',
	Keyboard = 'Keyboard',
	LogoLight = 'LogoLight',
	PerformaceMode = 'PerformaceMode',
	System = 'System'
}

export enum CPUBuild {
	SetCpuShortPower = 'SetCpuShortPower',
	SetCpuLongPower = 'SetCpuLongPower',
	SetCPUTempWall = 'SetCPUTempWall'
}

export enum FanBuild {
	SwitchMaxFanSpeed = 'SwitchMaxFanSpeed',
	SetFanSpeed = 'SetFanSpeed',
	GetFanSpeed = 'GetFanSpeed',
	GetSwitchMaxFanSpeed = 'GetSwitchMaxFanSpeed'
}
export enum GPUBuild {
	SetGpuMode = 'SetGpuMode',
	GetGpuMode = 'GetGpuMode'
}
export enum KeyboardBuild {
	GetRGBKeyboardColor = 'GetRGBKeyboardColor',
	GetkeyboardLightBrightness = 'GetkeyboardLightBrightness',
	GetKeyboardMode = 'GetKeyboardMode',
	SetRGBKeyboardColor = 'SetRGBKeyboardColor',
	SetkeyboardLightBrightness = 'SetkeyboardLightBrightness',
	SetKeyboardMode = 'SetKeyboardMode'
}
export enum LogoLightBuild {
	SetLogoLight = 'SetLogoLight',
	GetLogoLight = 'GetLogoLight'
}
export enum PerformaceModeBuild {
	SetPerformaceMode = 'SetPerformaceMode',
	GetPerformaceMode = 'GetPerformaceMode'
}

export enum SystemBuild {
	OpenCustomMode = 'OpenCustomMode',
	GetACType = 'GetACType',
	GetInfo = 'GetInfo'
}
