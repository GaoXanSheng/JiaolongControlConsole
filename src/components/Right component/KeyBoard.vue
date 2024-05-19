<script setup lang="ts">
import wmiOperation from "../../WMIOperation/WMIOperation";
import {ref} from "vue";
import IpcAlert from "../tools/IpcAlert";
const Data = ref({
  red:0,
  blue:0,
  green:0,
  LightBrightness:1,
})
wmiOperation.Keyboard.GetRGBKeyboardColor().then(res=>{
  Data.value.red = res[0]
  Data.value.green = res[1]
  Data.value.blue = res[2]
})
wmiOperation.Keyboard.GetkeyboardLightBrightness().then(res=>{
  Data.value.LightBrightness = res.split("_")[1]

})
async function aPay() {
  // setInterval(async ()=>{
  //   await wmiOperation.Keyboard.SetkeyboardLightBrightness(1)
  //   await delay(100)
  //   await wmiOperation.Keyboard.SetkeyboardLightBrightness(2)
  //   await delay(100)
  //   await wmiOperation.Keyboard.SetkeyboardLightBrightness(3)
  //   await delay(100)
  //   await wmiOperation.Keyboard.SetkeyboardLightBrightness(3)
  //   await delay(100)
  //   await wmiOperation.Keyboard.SetkeyboardLightBrightness(2)
  //   await delay(100)
  //   await wmiOperation.Keyboard.SetkeyboardLightBrightness(1)
  //   await delay(100)
  // },600)
  const data = [
    await wmiOperation.Keyboard.SetRGBKeyboardColor(Data.value.red,Data.value.blue,Data.value.green),
    await wmiOperation.Keyboard.SetkeyboardLightBrightness(Data.value.LightBrightness)
  ]
  IpcAlert(data)
}
</script>

<template>
  <div class="Keyboard mdui-center">
    <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty">
      <label class="mdui-textfield-label">Red</label>
      <input class="mdui-textfield-input" type="number" max="255" v-model="Data.red"/>
    </div>
    <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty">
      <label class="mdui-textfield-label">blue</label>
      <input class="mdui-textfield-input" type="number" max="255" v-model="Data.blue"/>
    </div>
    <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty">
      <label class="mdui-textfield-label">green</label>
      <input class="mdui-textfield-input" type="number" max="255" v-model="Data.green"/>
    </div>
    <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-not-empty">
      <label class="mdui-textfield-label">LightBrightness</label>
      <input class="mdui-textfield-input" type="number" max="3"  v-model="Data.LightBrightness"/>
    </div>
<!--    <input type="color" name="colorPicker">-->
    <button class="mdui-btn mdui-btn-raised mdui-color-theme-accent" @click="aPay">应用</button>
  </div>
</template>

<style scoped>
.keyboard {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 600px;
}
</style>