<script setup lang='ts'>
import wmiOperation from '../../tools/WMIOperation/WMIOperation'
import { ref } from 'vue'
import IpcAlert from '../tools/IpcAlert'

const Data = ref({
  red: 0,
  blue: 0,
  green: 0,
  LightBrightness: 1
})
wmiOperation.Keyboard.GetRGBKeyboardColor().then(res => {
  Data.value.red = Number(res[0])
  Data.value.green = Number(res[1])
  Data.value.blue = Number(res[2])
})
wmiOperation.Keyboard.GetkeyboardLightBrightness().then(res => {
  Data.value.LightBrightness = Number(res.split('_')[1])

})

async function aPay() {
  const data = [
    await wmiOperation.Keyboard.SetRGBKeyboardColor(Data.value.red, Data.value.green, Data.value.blue),
    await wmiOperation.Keyboard.SetkeyboardLightBrightness(Data.value.LightBrightness)
  ]
  IpcAlert(data)
}
</script>

<template>
  <div class='Keyboard mdui-center'>
    <div class='keys' :style='{ backgroundColor: `rgb(${Data.red}, ${Data.green}, ${Data.blue})` }'></div>
    <div class='mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty'>
      <label class='mdui-textfield-label'>Red</label>
      <input class='mdui-textfield-input' type='number' max='255' v-model='Data.red' />
    </div>
    <div class='mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty'>
      <label class='mdui-textfield-label'>green</label>
      <input class='mdui-textfield-input' type='number' max='255' v-model='Data.green' />
    </div>
    <div class='mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty'>
      <label class='mdui-textfield-label'>blue</label>
      <input class='mdui-textfield-input' type='number' max='255' v-model='Data.blue' />
    </div>
    <div class='mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty'>
      <label class='mdui-textfield-label'>LightBrightness</label>
      <input class='mdui-textfield-input' type='number' max='3' v-model='Data.LightBrightness' />
    </div>
    <!--    <input type="color" name="colorPicker">-->
    <button class='mdui-btn mdui-btn-raised mdui-color-theme-accent mdui-btn-block' @click='aPay'>应用</button>
  </div>
</template>

<style scoped>
.keys {
  width: 600px;
  height: 200px;
}

.Keyboard {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 600px;
}
</style>
