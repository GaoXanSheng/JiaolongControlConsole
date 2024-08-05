<script setup lang='ts'>
// 狂飙 5000 - 5800
// 游戏 3500 - 5000
// 办公 2200 - 3200

import { h, onMounted, ref } from 'vue'
import EchartsInit from '../tools/EventLoopTools'
import store from '../../store'
import wmiOperation from '../../tools/WMIOperation/WMIOperation'
import { eumPerformaceMode } from '../../tools/WMIOperation/Models/IPCModels'
import { Button, Message, Modal } from '@arco-design/web-vue'

let STC = ref(null)
let LTC = ref(null)
let TFS = ref(null)
onMounted(() => {
  Init()
})

function Init() {
  EchartsInit(STC.value, store.state.EventLoopPage.STC, {
    title: '短时功耗动态曲线',
    xAxis: {
      min: 35,
      max: 140,
      name: '短时功耗'
    },
    yAxis: {
      min: 0,
      max: 110,
      name: '温度'
    }
  }, (data: number[], index: number) => {
    let x = Number(data[0].toFixed(0))
    let y = Number(data[1].toFixed(0))
    store.state.EventLoopPage.STC[index] = [x, y]
  })
  EchartsInit(LTC.value, store.state.EventLoopPage.LTC, {
    title: '长时功耗曲线',
    xAxis: {
      min: 35,
      max: 140,
      name: '长时功耗'
    },
    yAxis: {
      min: 0,
      max: 110,
      name: '温度'
    }
  }, (data: number[], index: number) => {
    let x = Number(data[0].toFixed(0))
    let y = Number(data[1].toFixed(0))
    store.state.EventLoopPage.LTC[index] = [x, y]
  })
  EchartsInit(TFS.value, store.state.EventLoopPage.TFS, {
    title: '转速曲线',
    xAxis: {
      min: 3500,
      max: 5800,
      name: '转速'
    },
    yAxis: {
      min: 0,
      max: 110,
      name: '温度'
    }
  }, (data: number[], index: number) => {
    let x = Number(data[0].toFixed(0))
    let y = Number(data[1].toFixed(0))
    store.state.EventLoopPage.TFS[index] = [x, y]
  })
}

function removeLoop() {
  clearInterval(store.state.EventLoopPage.eventLoop)
  store.state.EventLoopPage.isRun = false
}

function Closest(array: number[][], CpuTemperature: number) {
  let minDiff = Infinity
  let closestArray: number[] = []
  // 遍历 array 计算差值
  for (const iteration of array) {
    const tempDiff = Math.abs(Number(iteration[1]) - CpuTemperature)
    if (tempDiff < minDiff) {
      minDiff = tempDiff
      closestArray = iteration
    }
  }
  return closestArray[0]
}

async function handleClick() {
  removeLoop()
  store.state.EventLoopPage.eventLoop = setInterval(async () => {
    const CpuTemperature = store.state.OS.CPU.temperature
    // 初始化最小差值和最近接的数组
    const STC = Closest(store.state.EventLoopPage.STC, CpuTemperature)
    const LTC = Closest(store.state.EventLoopPage.LTC, CpuTemperature)
    let TFS = Closest(store.state.EventLoopPage.TFS, CpuTemperature)
    await wmiOperation.Cpu.SetCpuShortPower(STC)
    await wmiOperation.Cpu.SetCpuLongPower(LTC)
    if (TFS > 2200 && TFS < 3200) {
      await wmiOperation.PerformaceMode.SetPerformaceMode(eumPerformaceMode.OfficeMode)
    } else if (TFS > 3500 && TFS < 5000) {
      await wmiOperation.PerformaceMode.SetPerformaceMode(eumPerformaceMode.GamingMode)
    } else if (TFS > 5000 && TFS < 5900) {
      await wmiOperation.PerformaceMode.SetPerformaceMode(eumPerformaceMode.RampageMode)
    } else {
      TFS = 58
    }
    await wmiOperation.Fan.SetFanSpeed(Number(String(TFS)[0] + String(TFS)[1]))
  }, 5000)
  store.state.EventLoopPage.isRun = true
}

async function shareConfig() {
  const config = {
    STC: store.state.EventLoopPage.STC,
    LTC: store.state.EventLoopPage.LTC,
    TFS: store.state.EventLoopPage.TFS
  }
  const base64 = btoa(JSON.stringify(config))
  await navigator.clipboard.writeText(base64)
  Message.success('已复制到剪切板')
}

const importConfigVisible = ref(false)
const importConfigValue = ref('')

function importConfigHandleCancel() {
  importConfigValue.value = ''
}

function importConfigHandleBeforeOk() {
  try {
    const iConfig = JSON.parse(atob(importConfigValue.value)) as {
      STC: any,
      LTC: any,
      TFS: any
    }
    store.state.EventLoopPage.STC = iConfig.STC
    store.state.EventLoopPage.LTC = iConfig.LTC
    store.state.EventLoopPage.TFS = iConfig.TFS
    Message.success('导入成功')
    Init()
  } catch (e) {
    Message.error(JSON.stringify(e))
  }
  importConfigHandleCancel()
  return true
}
</script>

<template>

  <div class='EventLoop'>
    <a-modal
      v-model:visible='importConfigVisible'
      title='导入配置文件'
      @cancel='importConfigHandleCancel'
      @before-ok='importConfigHandleBeforeOk'
    >
      <a-input v-model='importConfigValue' />
    </a-modal>
    <a-row justify='center'>
      <a-col :span='16' style='margin-bottom: 20px'>
        <a-typography-title class='title'>
          EvnetLoop
        </a-typography-title>
      </a-col>
      <div class='STC' ref='STC'></div>
      <div class='LTC' ref='LTC'></div>
      <div class='TFS' ref='TFS'></div>
      <a-col :span='16' class='item'>
        <a-button type='primary' v-if='!store.state.EventLoopPage.isRun' @click='handleClick'>启动</a-button>
        <a-button type='primary' v-else @click='removeLoop'>停止</a-button>
      </a-col>
      <a-col :span='16' class='item'>
        <a-button style='margin: 5px' type='primary' @click='importConfigVisible =!importConfigVisible'>导入配置
        </a-button>
        <a-button style='margin: 5px' type='primary' @click='shareConfig'>分享配置</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style lang='scss' scoped>
.EventLoop {
  padding-top: 20px;

  .title {
    text-align: left;
  }

  .STC {
    width: 300px;
    height: 200px;
    display: inline-block;
  }

  .LTC {
    width: 300px;
    height: 200px;
    display: inline-block;
  }

  .TFS {
    width: 700px;
    height: 200px;
    display: inline-block;
  }
}
</style>
