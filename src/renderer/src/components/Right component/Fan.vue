<script setup lang='ts'>
import wmiOperation from '../../tools/WMIOperation/WMIOperation'
import index from '../../store'
import { ResultState } from '../../tools/WMIOperation/Models/IPCModels'
import successful from '../tools/successful'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'

const fanData = index.state.FanPage
const loading = ref(false)

function ConvertParameters(v: number) {
  return Number(String(v)[0] + String(v)[1])
}

async function handleClick() {
  loading.value = true
  if (index.state.OS.SwitchMaxFanSpeed == ResultState.OFF) {
    await wmiOperation.Fan.SwitchMaxFanSpeed(ResultState.ON)
  }
  const data = [await wmiOperation.Fan.SetFanSpeed(ConvertParameters(fanData.SetFanSpeed))]
  const callback = successful(data)
  if (callback) {
    Message.success('Fan设置成功')
  } else {
    Message.error(JSON.stringify(data))
  }
  loading.value = false
}
</script>

<template>
  <div class='Fan'>
    <a-row justify='center'>
      <a-col :span='16'>
        <a-typography-title class='title'>
          Fan Settings
        </a-typography-title>
      </a-col>
      <a-col :span='16' class='item'>
        <a-input-number v-model='fanData.SetFanSpeed' placeholder='ShortPower' :min='3500' :max='5800' model-event='input'>
          <template #append>
            风扇转速
          </template>
        </a-input-number>
      </a-col>
      <a-col :span='16' class='item'>
        <a-button type='primary' :loading='loading' @click='handleClick'>确认</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.Fan {
  padding-top: 20px;

  .title {
    text-align: left;
  }

  .item {
    margin-top: 10px;
  }
}
</style>
