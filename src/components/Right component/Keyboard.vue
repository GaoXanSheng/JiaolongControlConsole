<script setup lang="ts">
// import wmiOperation from "../../WMIOperation/WMIOperation.ts";
// import {KeyboardBuild} from "../../../electron/Models/CmdBuild.ts";
//
// let i = 1
// setInterval(() => {
//   if (i>255 || i==255){
//     i--
//   }else {
//     i++
//   }
//   wmiOperation.Keyboard(KeyboardBuild.SetRGBKeyboardColor, {R: i, G: i, B: i})
// }, 200)
</script>

<template>
  <div class="Keyboard">
    <ColorPicker format="rgb" inline/>
  </div>
</template>

<style scoped>
.Keyboard {
  width: 100%;
  height: 100%;
}
</style>