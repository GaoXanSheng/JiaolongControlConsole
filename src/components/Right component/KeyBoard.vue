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
  Data.value.red = Number(res[0])
  Data.value.green = Number(res[1])
  Data.value.blue = Number(res[2])
})
wmiOperation.Keyboard.GetkeyboardLightBrightness().then(res=>{
  Data.value.LightBrightness = Number(res.split("_")[1])

})
// TODO Windows在托盘最小化中严格限制应用运行时长，所以托盘最小化无法使用渐变颜色
// async function applyBreathingLightEffect() {
//   const minBrightness = 0;    // Minimum brightness level
//   const maxBrightness = 3;    // Maximum brightness level
//   const delay = 500;          // Delay in milliseconds between each brightness step
//
//   while (true) {
//     // Increase brightness
//     for (let brightness = minBrightness; brightness <= maxBrightness; brightness++) {
//       await wmiOperation.Keyboard.SetkeyboardLightBrightness(brightness);
//
//       // Wait for the specified delay
//       await new Promise(resolve => setTimeout(resolve, delay));
//     }
//
//     // Decrease brightness
//     for (let brightness = maxBrightness; brightness >= minBrightness; brightness--) {
//       await wmiOperation.Keyboard.SetkeyboardLightBrightness(brightness);
//
//       // Wait for the specified delay
//       await new Promise(resolve => setTimeout(resolve, delay));
//     }
//   }
// }
// const running = ref(true); // Control variable to manage the loop
//
// function getGradientColor(startColor, endColor, percent) {
//   const interpolate = (start, end, percent) => Math.round(start + (end - start) * percent);
//
//   const r = interpolate(startColor.r, endColor.r, percent);
//   const g = interpolate(startColor.g, endColor.g, percent);
//   const b = interpolate(startColor.b, endColor.b, percent);
//
//   return { r, g, b };
// }
//
// async function applyLoopingGradientColor() {
//   const colors = [
//     { r: 255, g: 0, b: 0 },   // Red
//     { r: 0, g: 255, b: 0 },   // Green
//     { r: 0, g: 0, b: 255 }    // Blue
//   ];
//   const steps = 100;
//   const delay = 50; // Milliseconds
//
//   running.value = true; // Ensure the loop runs when started
//
//   while (running.value) {
//     for (let i = 0; i < colors.length && running; i++) {
//       const startColor = colors[i];
//       const endColor = colors[(i + 1) % colors.length];
//       for (let j = 0; j <= steps && running; j++) {
//         const percent = j / steps;
//         const color = getGradientColor(startColor, endColor, percent);
//
//         await wmiOperation.Keyboard.SetRGBKeyboardColor(color.r, color.g, color.b);
//
//         // Wait for the specified delay
//         await new Promise(resolve => setTimeout(resolve, delay));
//       }
//     }
//   }
// }
//
// function stopLoopingGradientColor() {
//   running.value = false; // Set the control variable to false to stop the loop
// }

async function aPay() {
  // await applyLoopingGradientColor();
  // await applyBreathingLightEffect()
  const data = [
    await wmiOperation.Keyboard.SetRGBKeyboardColor(Data.value.red,Data.value.green,Data.value.blue),
    await wmiOperation.Keyboard.SetkeyboardLightBrightness(Data.value.LightBrightness)
  ]
  IpcAlert(data)
}
</script>

<template>
  <div class="Keyboard mdui-center">
    <div class="keys" :style="{ backgroundColor: `rgb(${Data.red}, ${Data.green}, ${Data.blue})` }"></div>
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
.keys{
    width: 600px;
    height: 200px;
}
.Keyboard {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 600px;
}
</style>