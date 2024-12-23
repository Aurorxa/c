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
@media (min-width: 1024px) {
  /* 针对桌面设备 */
  .la-widget {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 15%;
  }
}

@media (max-width: 1023px) {
  /* 针对平板和手机设备 */
  .la-widget {
    display: none;
  }
}
</style>
