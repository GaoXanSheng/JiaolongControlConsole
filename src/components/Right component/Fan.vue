<script setup lang="ts">
import {ref} from "vue";
import wmiOperation from "../../WMIOperation/WMIOperation.ts";
import {FanBuild} from "../../../electron/Models/CmdBuild.ts";

const fanData = ref({
  isTrue: false,
  SetFanSpeed: 3500,
  outMsg: []
})

function aPay() {
  if (fanData.value.isTrue) {
    wmiOperation.Fan(FanBuild.SwitchMaxFanSpeed, 1).then(r => {
      fanData.value.outMsg.push(r)
    })
    wmiOperation.Fan(FanBuild.SetFanSpeed, Number(String(fanData.value.SetFanSpeed)[0] + String(fanData.value.SetFanSpeed)[1])).then(r => {
      fanData.value.outMsg.push(r)
    })
  }
}
</script>

<template>
  <div class="Fan mdui-center">
    <label class="mdui-switch">
      我知道我在做什么
      <input v-model="fanData.isTrue" type="checkbox"/>
      <i class="mdui-switch-icon"></i>
    </label>
    <div class="mdui-textfield mdui-textfield-floating-label">
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