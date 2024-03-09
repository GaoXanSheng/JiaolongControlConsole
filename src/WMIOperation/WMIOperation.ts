import IpcRenderer from "./IPCRenderer";
import {
    CPUBuild,
    enumBuildType,
    FanBuild,
    GPUBuild,
    KeyboardBuild,
    LogoLightBuild, PerformaceModeBuild, SystemBuild
} from "../../electron/Models/CmdBuild"


class WMIOperation {

    Cpu(type: CPUBuild, value: number) {
        return IpcRenderer.sendIPC(`${enumBuildType.CPU}-${type}-${value}`)
    }

    Fan(type: FanBuild, value: number) {
        return IpcRenderer.sendIPC(`${enumBuildType.Fan}-${type}-${value}`)
    }

    GPU(type: GPUBuild, value: number) {
        return IpcRenderer.sendIPC(`${enumBuildType.GPU}-${type}-${value}`)
    }

    Keyboard(type: KeyboardBuild, value: number | { R:number,G:number,B:number }) {
        if (type == KeyboardBuild.SetRGBKeyboardColor && typeof value != "number") {
            return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${type}-${value.R}-${value.G}-${value.B}`)
        } else {
            return IpcRenderer.sendIPC(`${enumBuildType.Keyboard}-${type}-${value}`)
        }
    }

    LogoLight(type: LogoLightBuild, value: number) {
        return IpcRenderer.sendIPC(`${enumBuildType.LogoLight}-${type}-${value}`)
    }

    PerformaceMode(type: PerformaceModeBuild, value: number) {
        return IpcRenderer.sendIPC(`${enumBuildType.PerformaceMode}-${type}-${value}`)
    }

    System(type: SystemBuild, value: number) {
        return IpcRenderer.sendIPC(`${enumBuildType.System}-${type}-${value}`)
    }
}

const wmiOperation = new WMIOperation();
export default wmiOperation