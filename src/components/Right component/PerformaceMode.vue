<script setup lang="ts">
import wmiOperation from "../../WMIOperation/WMIOperation.ts";
import {CPUBuild, SystemBuild} from "../../../electron/Models/CmdBuild.ts";

const PerformaceModeData = {
  QuietMode: {
    Msg: {content: "LongPower -> 35\n ShortPower -> 35\n TempWall -> 80"},
  },
  PerformanceMode: {
    Msg: {content: "LongPower -> 60\n ShortPower -> 70\n TempWall -> 90"},
  },
  FullSpeed:{
    Msg: {content: "LongPower -> 140\n ShortPower -> 140\n TempWall -> 99"},
  }
}

async function aPay(CpuLongPower: number, SetCpuShortPower: number, CPUTempWall: number) {
  const data = [await wmiOperation.System(SystemBuild.OpenCustomMode, 1), await wmiOperation.Cpu(CPUBuild.SetCpuLongPower, CpuLongPower), await wmiOperation.Cpu(CPUBuild.SetCpuShortPower, SetCpuShortPower), await wmiOperation.Cpu(CPUBuild.SetCPUTempWall, CPUTempWall)]
  let msg = ''
  data.map(x => {
    msg +=x.msg?.stdout
  })
  mdui.alert(msg)
}

</script>

<template>
  <div class="PerformaceMode mdui-center">
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
</template>

<style scoped>
.PerformaceMode {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 600px;
}
</style>