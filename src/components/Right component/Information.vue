<script setup lang="ts">

// import {showTemperature} from "../tools/Information";
// import {onMounted} from "vue";
// import store from "../../store";
// onMounted(() => {
//   const CpuTemperatureDom = showTemperature(document.getElementsByClassName("CpuTemperatureDom").item(0),"CPU {value} °C",100)
//   const GpuTemperatureDom = showTemperature(document.getElementsByClassName("GpuTemperatureDom").item(0),"GPU {value} °C",100)
//   const CPUFanSpeedDom = showTemperature(document.getElementsByClassName("CPUFanSpeedDom").item(0),"CPU Fan {value}",5800)
//   const GPUFanSpeedDom = showTemperature(document.getElementsByClassName("GPUFanSpeedDom").item(0),"GPU Fan {value}",5800)
//   setInterval(function () {
//     CpuTemperatureDom(store.state.OS.CPU.temperature)
//     GpuTemperatureDom(store.state.OS.GPU.temperature)
//     CPUFanSpeedDom(store.state.OS.CPU.CPUFanSpeed)
//     GPUFanSpeedDom(store.state.OS.GPU.GPUFanSpeed)
//   }, 2000);
// })
// TODO
// CPU 温度 频率 核心数量 使用率
// GPU 温度 频率 显存 使用率
// RAM 总大小 容量 使用率
// 风扇 使用率 转速
// 自定义功能 一键模式 独显直连设定 logo灯设定






import CPUGraphicalInterface from "./Information/CPUGraphicalInterface.vue";
import GPUGraphicalInterface from "./Information/GPUGraphicalInterface.vue";
</script>

<template>
  <div class="Information">
    <div class="Segmentation">
      <CPUGraphicalInterface></CPUGraphicalInterface>
      <GPUGraphicalInterface class="margin-top-10"></GPUGraphicalInterface>
    </div>
    <div class="Segmentation margin-left-10">
      <div class="InformationPanel">
          内存
      </div>
      <div class="InformationPanel margin-top-10">
          风扇
      </div>
      <div class="InformationPanel margin-top-10">
        Customize
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Information {
  padding-top: 20px;
  width: 800px;
  display: flex;
  .Segmentation{
    width: 400px;
    .InformationPanel{
      width: 380px;
      height: 200px;
      background-color: red;
    }
    .GPUAdditionalInformation{
      width: 400px;
      height: 210px;
      background-color: red;
    }
    .CPUGraphicalInterface{
      height: 400px;
      width: 400px;
      background-color: red;
    }
  }
}
</style>