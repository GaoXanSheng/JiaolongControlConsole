<script setup lang="ts">
// import LeftSide from "./components/leftSide.vue";
// import RightSide from "./components/rightSide.vue";

import IpcRenderer from "./IPCRenderer.ts";
function randomRGB() {
  const r = Math.floor(Math.random() * 256); // 生成 0 到 255 之间的随机整数
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return {
    r,g,b
  }
}
function randomIntFrom1To4() {
  return Math.floor(Math.random() * 4) + 1; // 生成 1 到 4 之间的随机整数
}
setInterval(()=>{
  IpcRenderer.SetRGBKeyboardColor(randomRGB().r,randomRGB().g,randomRGB().b).then(r=>{
    console.log(r)
  })
  // IpcRenderer.testFalse().then(r=>{
  //   // console.log(r)
  // })
},100)
</script>

<template>
  <div class="main">
    <div class="background"></div>
    <div class="container mdui-container">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 48px;

  .cpu {

  }

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
