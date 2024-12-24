<template></template>
<script setup lang="ts">
import { onMounted } from "vue";
import TypeIt from "typeit";

onMounted(() => {
  new TypeIt(".tagline", {
    strings: [
      "C 是一种高效的通用编程语言，适合底层开发。",
      "C++ 是 C 的扩展，支持面向对象编程，适用于复杂系统和高性能应用。",
    ],
    speed: 200,
  }).go();
});
</script>
