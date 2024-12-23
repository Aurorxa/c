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
  <div class="panel">
    <div class="container">
      <section class="grid">
        <div id="la-data-widget-container"></div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.panel {
  margin-top: 12px;
  margin-bottom: 8px;
}

.container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  width: 100%;
  min-height: 32px;
  max-width: 1152px;
  margin-left: auto;
  margin-right: auto;
}

.grid {
  font-weight: 500;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: 12px;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  display: grid;
}

.text {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
