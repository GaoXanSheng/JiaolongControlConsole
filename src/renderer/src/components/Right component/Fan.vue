<script setup lang="ts">
import wmiOperation from "../../WMIOperation/WMIOperation";
import index from "../../store";
import {ResultState} from "../../WMIOperation/Models/IPCModels";
import IpcAlert from "../tools/IpcAlert";
import ConvertParameters from "../tools/ConvertParameters";

const fanData = index.state.FanPage

async function aPay() {
  if (index.state.OS.SwitchMaxFanSpeed == ResultState.OFF){
    await wmiOperation.Fan.SwitchMaxFanSpeed(ResultState.ON)
  }
  IpcAlert([await wmiOperation.Fan.SetFanSpeed(ConvertParameters(fanData.SetFanSpeed))])
}
</script>

<template>
  <div class="Fan mdui-center">
    <label class="mdui-switch">
      我知道我在做什么
      <input v-model="fanData.isTrue" type="checkbox"/>
      <i class="mdui-switch-icon"></i>
    </label>
    <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty">
      <label class="mdui-textfield-label">FanSpeed 设置风扇最大转速</label>
      <input class="mdui-textfield-input" type="number" v-model="fanData.SetFanSpeed"/>

    </div>
    <button v-if="fanData.isTrue" class="mdui-btn mdui-btn-raised mdui-color-theme-accent" @click="aPay">应用</button>
  </div>
</template>

<style scoped>
.Fan {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 600px;
}
</style>
