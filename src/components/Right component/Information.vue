<script setup lang="ts">

import {showTemperature} from "../tools/Information";
import {onMounted} from "vue";
import store from "../../store";
onMounted(() => {
  const CpuTemperatureDom = showTemperature(document.getElementsByClassName("CpuTemperatureDom").item(0),"CPU {value} °C",100)
  const GpuTemperatureDom = showTemperature(document.getElementsByClassName("GpuTemperatureDom").item(0),"GPU {value} °C",100)
  const CPUFanSpeedDom = showTemperature(document.getElementsByClassName("CPUFanSpeedDom").item(0),"CPU Fan {value}",5800)
  const GPUFanSpeedDom = showTemperature(document.getElementsByClassName("GPUFanSpeedDom").item(0),"GPU Fan {value}",5800)
  setInterval(function () {
    CpuTemperatureDom(store.state.OS.CPU.temperature)
    GpuTemperatureDom(store.state.OS.GPU.temperature)
    CPUFanSpeedDom(store.state.OS.CPU.CPUFanSpeed)
    GPUFanSpeedDom(store.state.OS.GPU.GPUFanSpeed)
  }, 2000);
})

</script>

<template>
  <div class="Information mdui-center">
<!--    <p>{{store.state.OS.CPU.temperature}}</p>-->
      <p>
        <div class="CpuTemperatureDom Dashboard"></div>
        <div class="GpuTemperatureDom Dashboard"></div>
      </p>
    <p>
      <div class="CPUFanSpeedDom Dashboard"></div>
      <div class="GPUFanSpeedDom Dashboard"></div>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.Information {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 600px;
  p{
    display: flex;
    .Dashboard{
      width: 300px;
      height: 300px;
    }
  }

}
</style>