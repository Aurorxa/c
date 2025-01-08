<template>
  <div id="comments"></div>
</template>

<script setup>
import { onMounted } from "vue";
import Artalk from "artalk";
import "artalk/Artalk.css";

onMounted(() => {
  new Artalk({
    el: "#comments",
    server: "https://artalk.weiweixu.cn/",
    site: "你的站点名称",
    pageKey: location.pathname,
    placeholder: "快来留下你的评论吧！",
    lang: "zh-CN",
  });
});
</script>

<style></style>
