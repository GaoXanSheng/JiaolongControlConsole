<script setup lang="ts">
import wmiOperation from "../../WMIOperation/WMIOperation.ts";
import store from "../../store.ts";
import {ResultState} from "../../../electron/Models/IPCModels.ts";
import IpcAlert from "../tools/IpcAlert.ts";

const PerformaceModeData = {
  QuietMode: {
    Msg: {content: "LongPower -> 35\n ShortPower -> 35\n TempWall -> 80"},
  },
  PerformanceMode: {
    Msg: {content: "LongPower -> 60\n ShortPower -> 70\n TempWall -> 90"},
  },
  FullSpeed: {
    Msg: {content: "LongPower -> 140\n ShortPower -> 140\n TempWall -> 99"},
  }
}

async function aPay(CpuLongPower: number, SetCpuShortPower: number, CPUTempWall: number) {
  const data = [
    await wmiOperation.System.OpenCustomMode(ResultState.ON),
    await wmiOperation.Cpu.SetCpuLongPower(CpuLongPower),
    await wmiOperation.Cpu.SetCpuShortPower(SetCpuShortPower),
    await wmiOperation.Cpu.SetCPUTempWall(CPUTempWall)
  ]
  IpcAlert(data)
}

</script>

<template>

  <div class="PerformaceMode mdui-center">
    <div class="echarts">
      <div>
        <div class="mdui-typo">

          <h3>CPU 温度探针 <small>{{ store.state.OS.CPU.temperature }} °C</small></h3>
        </div>
        <div class="mdui-progress">
          <div class="mdui-progress-determinate" :style="{width:`${store.state.OS.CPU.Temperature.main}%`}"></div>
        </div>
      </div>
      <div>
        <div class="mdui-typo">
          <h3>GPU 温度探针 <small>{{ store.state.OS.GPU.temperatureGpu }} °C</small></h3>
        </div>
        <div class="mdui-progress">
          <div class="mdui-progress-determinate" :style="{width:`${store.state.OS.GPU.temperatureGpu}%`}"></div>
        </div>
      </div>
    </div>
    <div class="mdui-typo">
      <hr/>
    </div>
    <div class="mdui-typo">
      <h2>预设参数</h2>
      <button @click="aPay(35,35,80)"
              class="mdui-btn mdui-btn-raised mdui-ripple"
              :mdui-tooltip="JSON.stringify(PerformaceModeData.QuietMode.Msg)">
        安静模式
      </button>
      <button
          @click="aPay(60,70,90)"
          class="mdui-btn mdui-btn-raised mdui-ripple"
          :mdui-tooltip="JSON.stringify(PerformaceModeData.PerformanceMode.Msg)">
        性能模式
      </button>
      <button
          @click="aPay(140,140,99)"
          class="mdui-btn mdui-btn-raised mdui-ripple"
          :mdui-tooltip="JSON.stringify(PerformaceModeData.FullSpeed.Msg)">
        狂飙模式
      </button>
    </div>
  </div>
</template>

<style scoped>
.PerformaceMode {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 600px;
}
</style>