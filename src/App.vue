<script setup lang="ts">


import LeftSide from "./components/leftSide.vue";
import RightSide from "./components/rightSide.vue";
import store from "./store.ts";

</script>

<template>
  <div class="main">
    <LeftSide></LeftSide>
    <RightSide></RightSide>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
