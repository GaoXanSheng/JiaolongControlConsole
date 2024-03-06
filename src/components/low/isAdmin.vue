<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "isAdmin"
})
setTimeout(()=>{
  window.close()
},3000)
</script>

<template>
  <div class="isAdmin">
    <h1>😓请使用管理员权限打开</h1>
  </div>
</template>

<style scoped>
.isAdmin{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 将元素的中心点移动到父容器的中心点 */
}
</style>