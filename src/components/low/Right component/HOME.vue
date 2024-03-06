<script setup lang="ts">
import InputSwitch from 'primevue/inputswitch';
import {ref, watch} from "vue";
// import {ipcRenderer} from "electron";
import store from "../../../store.ts";



const data= ref({
  SetLogoLight:0
})
watch(data,(value, oldValue, onCleanup)=>{
  if (value.SetLogoLight!=oldValue.SetLogoLight){
    console.log(value)
    store.state.HomeTab.SetLogoLight = !!value.SetLogoLight
  }
})
</script>

<template>
<div class="HOME">
  <div class="SetLogoLight">
    <InputSwitch v-model="data.SetLogoLight" />
  </div>
</div>
</template>

<style scoped>
.HOME{
  width: 100%;
  height: 100%;
}
</style>