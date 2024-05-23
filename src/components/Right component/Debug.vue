<script setup lang="ts">

import store from "../../store.ts";
</script>

<template>
  <div class="mdui-textfield">
    <textarea class="mdui-textfield-input"  placeholder="Description">{{JSON.stringify(store.state,null,2)}}</textarea>
  </div>

</template>

<style scoped>

</style>