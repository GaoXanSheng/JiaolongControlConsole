<script setup lang="ts">
// 狂飙 5000 - 5800
// 游戏 3500 - 5000
// 办公 2200 - 3200

// import wmiOperation from "../../WMIOperation/WMIOperation";
// TODO ... EvnetLoop

import {onMounted, ref} from "vue";
import EchartsInit from "../tools/EventLoopTools.ts";
import store from "../../store";

let STC = ref(null)
let LTC = ref(null)
let TFS = ref(null)
onMounted(() => {
  EchartsInit(STC.value,store.state.EventLoopPage.STC,{
    title:"短时功耗动态曲线",
    xAxis:{
      min:35,
      max:140,
      name:"短时功耗"
    },
    yAxis:{
      min:0,
      max:100,
      name:"温度"
    }
  },(data:number[],index:number)=>{
    const x = Number(data[0].toFixed(0))
    const y = Number(data[1].toFixed(0))
    if (x > 140 || x < 35) return;
    if (y > 100 || y < 0) return;
    store.state.EventLoopPage.STC[index] = [x,y]
  })
  EchartsInit(LTC.value,store.state.EventLoopPage.LTC,{
    title:"长时功耗曲线",
    xAxis:{
      min:35,
      max:140,
      name:"长时功耗"
    },
    yAxis:{
      min:0,
      max:100,
      name:"温度"
    }
  },(data:number[],index:number)=>{
    const x = Number(data[0].toFixed(0))
    const y = Number(data[1].toFixed(0))
    if (x > 140 || x < 35) return;
    if (y > 100 || y < 0) return;
    store.state.EventLoopPage.LTC[index] = [x,y]
  })
  EchartsInit(TFS.value,store.state.EventLoopPage.TFS,{
    title:"转速曲线",
    xAxis:{
      min:3500,
      max:5800,
      name:"转速"
    },
    yAxis:{
      min:0,
      max:100,
      name:"温度"
    }
  },(data:number[],index:number)=>{
    const x = Number(data[0].toFixed(0))
    const y = Number(data[1].toFixed(0))
    if (x > 5800 || x < 3500) return;
    if (y > 100 || y < 0) return;
    store.state.EventLoopPage.TFS[index] = [x,y]
  })
})

</script>

<template>

  <div class="EventLoop mdui-center">
    <div class="STC" ref="STC"></div>
    <div class="LTC" ref="LTC"></div>
    <div class="TFS" ref="TFS"></div>
<!--    <h3>正曲线 随着温度升高，会增加风扇转速，提升CPU功耗 起始功耗 65W 最大功耗 120W 起始风扇转速 3500 最大风扇转速 5800 </h3>-->
<!--    <button class="mdui-btn mdui-btn-raised mdui-color-theme-accent">启动</button>-->
<!--    <h3>负曲线 随着温度升高，会降低风扇转速，降低CPU功耗 起始功耗 65W 最小功耗 35W 起始风扇转速 3500 最小风扇转速 2200 </h3>-->
<!--    <button class="mdui-btn mdui-btn-raised mdui-color-theme-accent">启动</button>-->
  </div>
</template>

<style scoped>
.STC{
  width: 300px;
  height: 300px;
  display: inline-block;
}
.LTC{
  width: 300px;
  height: 300px;
  display: inline-block;
}
.TFS{
  width: 600px;
  height: 300px;
  display: inline-block;
}
.EventLoop {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 600px;
}
</style>