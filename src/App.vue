<script setup lang="ts">


import RightSide from "./components/rightSide.vue";
import LeftSide from "./components/leftSide.vue";
import wmiOperation from "./WMIOperation/WMIOperation.ts";
import {KeyboardBuild} from "../electron/Models/CmdBuild.ts";

wmiOperation.Keyboard(KeyboardBuild.GetRGBKeyboardColor, 0).then(r=>{
  console.log(r)
})
</script>

<template>
  <div class="main">
    <div class="LOGO"></div>
    <LeftSide></LeftSide>
    <RightSide></RightSide>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 48px;

  .miscellaneous {
    .menu{
      h5{
        display:inline;
      }
      display:flex;
    }
  }

  div {
    margin-bottom: 50px;
  }
}

.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  .background{
    position: fixed;
    right: 15px;
    bottom: 15px;
    width: 32px;
    height: 36px;
    background-image: url(assets/LogoLight.png);
    background-position: center;
    object-fit: cover;
  }

}
</style>
