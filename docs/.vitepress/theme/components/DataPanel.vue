<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  // 检查是否已有加载的 script，避免重复加载
  if (!document.getElementById("LA-DATA-WIDGET")) {
    const script = document.createElement("script");
    script.id = "LA-DATA-WIDGET";
    script.crossOrigin = "anonymous";
    script.charset = "UTF-8";
    script.src = "https://v6-widget.51.la/v6/3Ki1BsybBJG95owJ/quote.js?theme=0&f=12";
    document.body.appendChild(script);
  }
});
</script>

<template></template>

<style>
span.la-widget.la-data-widget__container {
  position: relative;
  bottom: 2px;
  display: flex;
  padding-bottom: 20px;
  justify-content: center;
  gap: 10px;
}
</style>
