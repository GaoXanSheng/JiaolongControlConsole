<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted} from "vue";

onMounted(()=>{
  const chartDom = document.getElementsByClassName("CPUGraphicalInterface").item(0)
  const myChart = echarts.init(chartDom);
  const option= {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'CPU',
        type: 'pie',
        radius: ['60%', '70%'],
        data: [
          { value: 1048, name: '运行频率' },
          { value: 5400 - 1048, name: '剩余频率' }
        ]
      }
    ]
  };

  option && myChart.setOption(option);
  let num = 100
  setInterval(()=>{
    myChart.setOption({
      series:{
        data:[
          { value: num+=100, name: '运行频率' },
          { value: 5400 - 1048, name: '剩余频率' }
        ]
      }
    })
  },1000)
})
</script>

<template>
<div class="CPUGraphicalInterface"></div>
</template>

<style scoped>

</style>