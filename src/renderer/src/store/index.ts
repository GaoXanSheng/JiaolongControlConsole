import { createStore } from 'vuex'
import wmiOperation from '../tools/WMIOperation/WMIOperation'
import CpuPage from './CpuPage'
import FanPage from './FanPage'
import OsInfo from './OsInfo'
import ProbeData from './ProbeData'
import EventLoopPage from './EventLoopPage'

export enum HomeTab {
  HOME=1,
  CPU,
  EventLoop,
  Information,
  Fan,
  Keyboard,
  Settings,
  Debug = 255
}

const storeModels = async () => {
  return {
    state: {
      Debug: false,
      SwitchPages: HomeTab.HOME,
      CpuPage: await CpuPage(),
      FanPage: await FanPage(),
      OS: await OsInfo(),
      EventLoopPage:EventLoopPage(),
      ProbeData:await ProbeData()
    }
  }
}
const index = createStore(await storeModels())

/**
 * 信息采集
 */
setInterval(async () => {
  const { gpuTemp, cpuTemp, gpuUsage, gpuFreq } = await wmiOperation.System.GetInfo()
  const { CPUFanSpeed, GPUFanSpeed } = await wmiOperation.Fan.GetFanSpeed()
  index.state.OS.PerformaceMode = await wmiOperation.PerformaceMode.GetPerformaceMode()
  index.state.OS.Customize = await wmiOperation.Cpu.GetCPUPower()
  index.state.OS.SwitchMaxFanSpeed = await wmiOperation.Fan.GetSwitchMaxFanSpeed()

  index.state.OS.CPU.CPUFanSpeed = CPUFanSpeed
  index.state.OS.CPU.temperature = cpuTemp
  index.state.OS.CPU.tempWall = await wmiOperation.Cpu.GetCPUTempWall()

  index.state.OS.GPU.GPUFanSpeed = GPUFanSpeed
  index.state.OS.GPU.temperature = gpuTemp
  index.state.OS.GPU.GpuUsage = gpuUsage
  index.state.OS.GPU.GpuFreq = gpuFreq
}, 5000)


export default index
