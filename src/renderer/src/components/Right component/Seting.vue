<script setup lang='ts'>
import { ref } from 'vue'
import electron from '../../tools/electron'

const self_starting = ref({
  loading: false
})
const self_starting_function =async () => {
  self_starting.value.loading = true
  await electron.ipcRenderer.invoke('custom-event-setLoginItemSettings',{
    openAtLogin:true,
    openAsHidden:false,
  })
  self_starting.value.loading = false
}
</script>

<template>
  <div class='setting'>
    <a-row justify='center'>
      <a-col :span='16'>
        <a-typography-title class='title'>
          Settings
        </a-typography-title>
      </a-col>
      <a-col :span='16'>
        <a-input disabled placeholder='设置开机启动' allow-clear>
          <template #append>
            <a-switch :onclick='self_starting_function' :loading='self_starting.loading'>
              <template #checked-icon>
                <icon-check />
              </template>
              <template #unchecked-icon>
                <icon-close />
              </template>
            </a-switch>
          </template>
        </a-input>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.setting {
  padding-top: 20px;

  .title {
    text-align: left;
  }
}
</style>
