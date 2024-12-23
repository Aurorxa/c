<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const script = document.createElement("script");
  script.id = "LA-DATA-WIDGET";
  script.crossOrigin = "anonymous";
  script.charset = "UTF-8";
  script.src = "https://v6-widget.51.la/v6/3Ki1BsybBJG95owJ/quote.js?theme=0&f=12";
  document.body.appendChild(script);
});
</script>

<template>
  <div id="la-data-widget-container"></div>
</template>

<style scoped>
#la-data-widget-container {
  display: flex;
  justify-content: center;
}
</style>
