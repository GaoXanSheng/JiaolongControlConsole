<script setup lang="ts">
import index from "../../store";
import {eumCPUPower, ResultState} from "../../tools/WMIOperation/Models/IPCModels";
import wmiOperation from "../../tools/WMIOperation/WMIOperation";
import InformationInfo from '../tools/InformationInfo'

// TODO
// CPU 温度 频率 核心数量 使用率
// GPU 温度 频率 显存 使用率
// RAM 总大小 容量 使用率
// 风扇 使用率 转速
// 自定义功能 一键模式 独显直连设定 logo灯设定

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
    <a-table :pagination='false' :columns="InformationInfo.CpuInfo.columns" :data="InformationInfo.CpuInfo.data" />
    <a-table :pagination='false' :columns="InformationInfo.CpuTemperatureInfo.columns" :data="InformationInfo.CpuTemperatureInfo.data" />
    <a-table :pagination='false' :columns="InformationInfo.GpuInfo.columns" :data="InformationInfo.GpuInfo.data" />
    <a-table :pagination='false' :columns="InformationInfo.GpuTemperatureInfo.columns" :data="InformationInfo.GpuTemperatureInfo.data" />
    <a-table :pagination='false' :columns="InformationInfo.RamInfo.columns" :data="InformationInfo.RamInfo.data" />
    <a-table :pagination='false' :columns="InformationInfo.BiosInfo.columns" :data="InformationInfo.BiosInfo.data" />
    <a-table :pagination='false' :columns="InformationInfo.OSInfo.columns" :data="InformationInfo.OSInfo.data" />
  </div>
</template>

<style lang="scss" scoped>

</style>
