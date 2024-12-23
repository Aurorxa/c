<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  // 检查是否已有加载的 script，避免重复加载
  if (!document.getElementById("LA-DATA-WIDGET")) {
    const script = document.createElement("script");
    script.id = "LA-DATA-WIDGET";
    script.crossOrigin = "anonymous";
    script.charset = "UTF-8";
    script.src =
      "https://v6-widget.51.la/v6/3Ki1BsybBJG95owJ/quote.js?theme=0&col=true&f=12&badge=icon_0&icon=center&la-data-widget-container";
    document.body.appendChild(script);
  }
});
</script>

<template>
  <div id="la-data-widget-container"></div>
</template>

<style>
#la-data-widget-container {
  padding-top: 40px;
  display: flex;
  justify-content: center;
}
</style>
