<script setup lang="ts">
import wmiOperation from "../../WMIOperation/WMIOperation.ts";
import store from "../../store.ts";
// import {GetCpuInfoModels} from "../../../electron/Models/OSInfoModels.ts";
import {ResultState} from "../../../electron/Models/IPCModels.ts";

const CPUData = store.state.CpuPage
// const cpuInfo = store.state.OS.CPU.Info as GetCpuInfoModels
async function aPay() {
  const data = [
    await wmiOperation.System.OpenCustomMode(ResultState.ON),
    await wmiOperation.Cpu.SetCpuLongPower(CPUData.longPower),
    await wmiOperation.Cpu.SetCpuShortPower(CPUData.shortPower),
    await wmiOperation.Cpu.SetCPUTempWall(CPUData.tempWall),
  ]
  let msg = ''
  data.map(x => {
    msg += x.msg?.stdout
  })
  mdui.alert(msg)
}
</script>

<template>
  <div class="CPU mdui-center">
    <label class="mdui-switch">
      我知道我在做什么
      <input v-model="CPUData.isTrue" type="checkbox"/>
      <i class="mdui-switch-icon"></i>
    </label>
    <label class="mdui-slider mdui-slider-discrete">
      <input type="range" step="1" min="0" max="100">
    </label>
<!--    <div class="mdui-typo">-->
<!--     <h4>{{ `${cpuInfo.manufacturer} ${cpuInfo.brand} ${cpuInfo.speedMax}GHz`  }}</h4>-->
<!--      <h4>{{ `Cores:${cpuInfo.cores} PhysicalCores:${cpuInfo.physicalCores}`  }}</h4>-->
<!--    </div>-->

    <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty">
      <label class="mdui-textfield-label">ShortPower 短时CPU功耗</label>
      <input class="mdui-textfield-input" type="number" v-model="CPUData.shortPower"/>
    </div>
    <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty">
      <label class="mdui-textfield-label">LongPower 长时CPU功耗</label>
      <input class="mdui-textfield-input" type="number" v-model="CPUData.longPower"/>
    </div>
    <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty">
      <label class="mdui-textfield-label">TempWall 温度墙</label>
      <input class="mdui-textfield-input" type="number" v-model="CPUData.tempWall"/>
    </div>
    <button v-if="CPUData.isTrue" class="mdui-btn mdui-btn-raised mdui-color-theme-accent" @click="aPay">应用</button>
  </div>
</template>

<style scoped>
.CPU {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 600px;
}
</style>