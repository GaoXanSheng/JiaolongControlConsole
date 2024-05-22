<script setup lang="ts">

import store from "../../store.ts";
</script>

<template>
<pre>
  {{ JSON.stringify(store.state,null,2) }}
</pre>
</template>

<style scoped>

</style>