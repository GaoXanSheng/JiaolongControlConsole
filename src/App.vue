<script setup lang="ts">
// import LeftSide from "./components/leftSide.vue";
// import RightSide from "./components/rightSide.vue";

import store from "./store.ts";
import {eumPerformaceMode} from "./IPCRenderer.ts";
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
  store.state.IpcRenderer.SetRGBKeyboardColor(randomRGB().r,randomRGB().g,randomRGB().b)
  store.state.IpcRenderer.SetkeyboardLightBrightness(randomIntFrom1To4)
},1000)
</script>

<template>
  <div class="main">
    <div class="background"></div>
    <div class="container mdui-container">
<!--      Keyboard breathing light-->
<!--      <label class="mdui-switch">-->
<!--        <input value="1" type="checkbox"/>-->
<!--        <i class="mdui-switch-icon"></i>-->
<!--      </label>-->
<!--      <div class="title">-->
<!--        <h2>蛟龙16PRO工具箱 <small>JiaoLong-Control-Console</small></h2>-->
<!--        <div class="mdui-typo">-->
<!--          <blockquote>-->
<!--            <p>Thaumaturgy... which giveth certain order to make strange works, of the sense to be perceived and of men-->
<!--              greatly to be wondered at.MathematicallPraeface.</p>-->
<!--            <footer>John Dee(1570) ——《Euclid's Elements》</footer>-->
<!--          </blockquote>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="miscellaneous">-->
<!--        <h3>杂项 <small>杂项</small></h3>-->
<!--        <p class="menu">-->
<!--          LOGO灯开关-->
<!--          <label class="mdui-switch">-->
<!--            <input type="checkbox"/>-->
<!--            <i class="mdui-switch-icon"></i>-->
<!--          </label>-->
<!--        </p>-->
<!--      </div>-->
<!--      <div class="cpu">-->
<!--        <h3>CPU <small>中央处理器</small></h3>-->
<!--        <p class="menu">-->
<!--          处理器温控墙-->
<!--          <label class="mdui-slider  mdui-slider-discrete">-->
<!--            <input type="range" step="1" min="65" max="98"/>-->
<!--          </label>-->
<!--        </p>-->
<!--        <p class="menu">-->
<!--          长时功耗-->
<!--          <label class="mdui-slider mdui-slider-discrete">-->
<!--            <input type="range" step="1" min="45" max="120"/>-->
<!--          </label>-->
<!--        </p>-->
<!--        <p class="menu">-->
<!--          短时功耗-->
<!--          <label class="mdui-slider mdui-slider-discrete">-->
<!--            <input type="range" step="1" min="45" max="120"/>-->
<!--          </label>-->
<!--        </p>-->
<!--      </div>-->
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
