<script setup lang="ts">

import index from "../../store";
</script>

<template>
  <div class="mdui-textfield">
    <textarea class="mdui-textfield-input"  placeholder="Description">{{JSON.stringify(index.state,null,2)}}</textarea>
  </div>

</template>

<style scoped>

</style>
