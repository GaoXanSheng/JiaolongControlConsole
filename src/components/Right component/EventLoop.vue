<script setup lang="ts">
// 狂飙 5000 - 5800
// 游戏 3500 - 5000
// 办公 2200 - 3200

import wmiOperation from "../../WMIOperation/WMIOperation";
// TODO ... EvnetLoop
</script>

<template>

  <div class="EventLoop mdui-center">
    <h3>正曲线 随着温度升高，会增加风扇转速，提升CPU功耗 起始功耗 65W 最大功耗 120W 起始风扇转速 3500 最大风扇转速 5800 </h3>
    <button class="mdui-btn mdui-btn-raised mdui-color-theme-accent">启动</button>
    <h3>负曲线 随着温度升高，会降低风扇转速，降低CPU功耗 起始功耗 65W 最小功耗 35W 起始风扇转速 3500 最小风扇转速 2200 </h3>
    <button class="mdui-btn mdui-btn-raised mdui-color-theme-accent">启动</button>
  </div>
</template>

<style scoped>
.EventLoop {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 600px;
}
</style>