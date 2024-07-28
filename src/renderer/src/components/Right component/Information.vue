<script setup lang="ts">
import index from "../../store";
import {ProbeData} from "../../../electron/ProbeModels";
import {eumCPUPower, ResultState} from "../../WMIOperation/Models/IPCModels.ts";
import wmiOperation from "../../WMIOperation/WMIOperation.ts";

// TODO
// CPU 温度 频率 核心数量 使用率
// GPU 温度 频率 显存 使用率
// RAM 总大小 容量 使用率
// 风扇 使用率 转速
// 自定义功能 一键模式 独显直连设定 logo灯设定


const info = index.state.ProbeData as ProbeData
const gpuInfo = info.gpu.controllers[info.gpu.controllers.findIndex((value) => {
  if (value.vendor == "NVIDIA") return value
})]
const ramInfo = info.ram.memLayout.map(layout => {
  return {
    size: {
      text: "内存大小",
      data: layout.size
    },
    type: {
      text: "类型",
      data: layout.type
    },
    clockSpeed: {
      text: "时钟速度",
      data: layout.clockSpeed
    },
    formFactor: {
      text: "插槽",
      data: layout.formFactor
    },
    manufacturer: {
      text: "制造商",
      data: layout.formFactor
    },
    serialNum: {
      text: "序列号",
      data: layout.serialNum
    }
  }
})

async function setLogoLight() {
  if (index.state.OS.LogoLight != ResultState.ON) {
    await wmiOperation.SetLogoLight(ResultState.ON)
  } else {
    await wmiOperation.SetLogoLight(ResultState.OFF)
  }
  index.state.OS.LogoLight = await wmiOperation.GetLogoLight()
}
async function setSwitchMaxFanSpeed() {
  if (index.state.OS.SwitchMaxFanSpeed != ResultState.ON) {
    await wmiOperation.Fan.SwitchMaxFanSpeed(ResultState.ON)
  } else {
    await wmiOperation.Fan.SwitchMaxFanSpeed(ResultState.OFF)
  }
  index.state.OS.SwitchMaxFanSpeed = await wmiOperation.Fan.GetSwitchMaxFanSpeed()
}
async function setCpuCustomize() {
  if (index.state.OS.Customize!=eumCPUPower.OpenState){
    await wmiOperation.System.OpenCustomMode(eumCPUPower.OpenState)
  }else {
    await wmiOperation.System.OpenCustomMode(eumCPUPower.CloseState)
  }
  index.state.OS.Customize = await wmiOperation.Cpu.GetCPUPower();
}
</script>

<template>
  <div class="Information">
    <div class="mdui-table-fluid">
      <table class="mdui-table mdui-table-hoverable">
        <tbody>
        <tr>
          <td>CPU</td>
          <td>{{ info.cpu.model }}</td>
          <td>核心数量</td>
          <td>{{ info.cpu.cors }}</td>
        </tr>
        </tbody>
      </table>
      <table class="mdui-table mdui-table-hoverable">
        <tbody>
        <tr>
          <td>GPU</td>
          <td>{{ gpuInfo.name }}</td>
          <td>驱动版本</td>
          <td>{{ gpuInfo.driverVersion }}</td>
        </tr>
        </tbody>
      </table>
      <table class="mdui-table mdui-table-hoverable">
        <tbody>
        <tr>
          <td>BIOS版本</td>
          <td>{{ info.bios.version }}</td>
          <td>发行日期</td>
          <td>{{ info.bios.releaseDate }}</td>
        </tr>
        <tr>
          <td>序列码</td>
          <td>{{ info.bios.serial }}</td>
          <td>供应商</td>
          <td>{{ info.bios.vendor }}</td>
        </tr>
        </tbody>
      </table>
      <table class="mdui-table mdui-table-hoverable">
        <tbody>
        <tr v-for="i in ramInfo">
          <td>{{ i.formFactor.text }}</td>
          <td>{{ i.formFactor.data }}</td>
          <td>{{ i.type.text }}</td>
          <td>{{ i.type.data }}</td>
          <td>{{ i.clockSpeed.text }}</td>
          <td>{{ i.clockSpeed.data }}</td>
          <td>{{ i.size.text }}</td>
          <td>{{ i.size.data }}</td>
        </tr>
        </tbody>
      </table>
      <table class="mdui-table mdui-table-hoverable">
        <tbody>
        <tr>
          <td>系统模式</td>
          <td>{{ index.state.OS.PerformaceMode }}</td>
          <td>CPU增压</td>
          <td>
            <div @click="setCpuCustomize">
              <label class="mdui-switch">
                <input :checked="Number(index.state.OS.Customize)" type="checkbox"/>
                <i class="mdui-switch-icon"></i>
              </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>风扇控制模式</td>
          <td>
            <div @click="setSwitchMaxFanSpeed">
              <label class="mdui-switch">
                <input :checked="Number(index.state.OS.SwitchMaxFanSpeed)" type="checkbox"/>
                <i class="mdui-switch-icon"></i>
              </label>
            </div>
          </td>
          <td>Logo灯</td>
          <td>
            <div @click="setLogoLight">
              <label class="mdui-switch">
                <input :checked="index.state.OS.LogoLight" type="checkbox"/>
                <i class="mdui-switch-icon"></i>
              </label>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <table class="mdui-table mdui-table-hoverable">
        <tbody>
        <tr >
          <td>CPU温度</td>
          <td>{{ index.state.OS.CPU.temperature }} °C</td>
          <td>CPU风扇转速</td>
          <td>{{ index.state.OS.CPU.CPUFanSpeed }}</td>
        </tr>
        <tr >
          <td>GPU温度</td>
          <td>{{ index.state.OS.GPU.temperature }} °C</td>
          <td>GPU风扇转速</td>
          <td>{{ index.state.OS.GPU.GPUFanSpeed }}</td>
        </tr>
        <tr >
          <td>GPU使用率</td>
          <td>{{ index.state.OS.GPU.GpuUsage }} %</td>
          <td>GPU模式</td>
          <td> {{ index.state.OS.GPU.GpuMode ? "DiscreteMode" : "HybridMode" }}</td>
        </tr>
        <tr >
          <td>键盘模式</td>
          <td>{{ index.state.OS.KeyboardMode }}</td>
          <td>电源接口</td>
          <td> {{ index.state.OS.AcType }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <button class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple" @click="index.state.Debug=true">
      <p>DevTools</p>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.Information {
  margin-top: 20px;
  width: 740px;
}
</style>
