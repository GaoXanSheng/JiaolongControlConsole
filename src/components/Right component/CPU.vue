<script setup lang="ts">
import {ref} from "vue";
import wmiOperation from "../../WMIOperation/WMIOperation.ts";
import {CPUBuild, SystemBuild} from "../../../electron/Models/CmdBuild.ts";

const CPUData = ref({
  isTrue: false,
  longPower:45,
  tempWall:80,
  shortPower:45,
  outMsg:[]
})

function aPay(){
    if (CPUData.value.isTrue){
      wmiOperation.System(SystemBuild.OpenCustomMode, 0).then(r=>{
        CPUData.value.outMsg.push(r)
      })
      wmiOperation.Cpu(CPUBuild.SetCpuLongPower, CPUData.value.longPower).then(r=>{
        CPUData.value.outMsg.push(r)
      })
      wmiOperation.Cpu(CPUBuild.SetCPUTempWall, CPUData.value.tempWall).then(r=>{
        CPUData.value.outMsg.push(r)
      })
    }
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
    <div class="mdui-textfield mdui-textfield-floating-label">
      <label class="mdui-textfield-label">ShortPower</label>
      <input class="mdui-textfield-input" type="number" v-model="CPUData.shortPower" />
    </div>
    <div class="mdui-textfield mdui-textfield-floating-label">
      <label class="mdui-textfield-label">LongPower</label>
      <input class="mdui-textfield-input" type="number" v-model="CPUData.longPower" />
    </div>
    <div class="mdui-textfield mdui-textfield-floating-label">
      <label class="mdui-textfield-label">TempWall</label>
      <input class="mdui-textfield-input" type="number" v-model="CPUData.tempWall" />
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